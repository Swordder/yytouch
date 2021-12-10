import { setStore, getStore } from '../config/util'
import { baseUrl,httpUrl } from '../config/env'
import { getAuthorUserInfo,getAuthorUrl } from "../api/sendRequest";
// import store from "../vuex/index"
import i18n from '../language/index.js'
const querystring = require('querystring');

const beforeEach = (to, from, next) => {
    // 判断是IOS还是安卓
    if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
        window.entryUrl = window.location.href;
    }
    // 英文版中文版判断2019/11/11
    let lan = getStore('lan');
    if (to.query.lan) {
        if (to.query.lan == 'en') {
            i18n.locale = 'en';
            setStore('lan', 'en');
        } else {
            i18n.locale = 'cn';
            setStore('lan', 'cn');
        }
    } else if (lan) {
        i18n.locale = lan;
    } else {
        i18n.locale = 'cn';
        setStore('lan', 'cn');
    }
    // 伪登录判断
    let wei = 0;
    let localStorage_wei = getStore('wei');
    if (localStorage_wei != undefined) {

    } else {
        setStore('wei', wei)
    }
    // 伪登录判断结束
    // 添加百度统计
    setTimeout(function() {
        let _hm = _hm || [];
        (function() {
            document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
            let hm = document.createElement('script');
            hm.src = 'https://hm.baidu.com/hm.js?064d219cd7b4b99abbf4b902ee684f3a';
            hm.id = 'baidu_tj';
            let s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }, 50);
    // 添加百度统计结束
    // id_type开始
    setStore('id_type', '');
    let user_info = getStore('yy_user_info');
    // let openId = getStore('openid');

    let openId = 'obHVp0y3n9Pzyvq0Cbezg4DyixWQ'
    
    // 判断本地存储是否有openid
    if (!openId || openId=='undefined') {
        // 首先判断URL上是否有openid
        let href = window.location;
        let search = href.search.substr(1);
        let state = querystring.parse(search).state;
        let code = querystring.parse(search).code;
        
        if (search.indexOf(state) != -1 && search.indexOf(code) !=-1) {
            // 2021/01/08 获取网页授权开始
            getAuthorUserInfo(1,state,code).then(res => {
                if(res.data.openid){
                    setStore('openid', res.data.openid);
                }
            })
        } else {
            getAuthorUrl(1,0,'',`${httpUrl}v2wx${to.fullPath}`).then(res => {
                window.location = res.data.url;
            })
            return
        }
    };
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    // 进行判断登录之前，对奖金工具在QA的开放权限进行判断,在QA环境中，不需要登录就可以看得到
    if ((to.path === '/fsBonus' || to.path === '/niferexBonus' || to.path === '/treandaBonus') && (baseUrl === 'http://wx.qa.youyao99.com/apibeta')) {
        to.meta.requiresLogin = false;
    }
    // 判断是否需要登录
    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (JSON.parse(user_info) && JSON.parse(user_info).yyid) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }

}

export {
    beforeEach
}
