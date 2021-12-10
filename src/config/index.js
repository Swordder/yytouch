import {
    baseUrl,
    baseToken
} from './env'
import {
    getStore,
    getOnlyMark,
    getOnceMark
} from './util'
import {
    statisticsObj
} from './statistics'
import Vue from 'vue'
import Axios from 'axios'
const md5 = require('md5');

let loadingCount = 0;
// 添加请求拦截器
Axios.interceptors.request.use(function(config) {
    loadingCount++
    Vue.$vux.loading.show({ text: 'Loading' })
    return config;
}, function(error) {
    loadingCount--
    if (!loadingCount) {
        Vue.$vux.loading.hide();
        Vue.$vux.toast.text('加载超时', 'top');
    }
    return Promise.reject(error)
});
// 添加响应拦截器
Axios.interceptors.response.use(function(response) {
    loadingCount--
    if (!loadingCount) {
        Vue.$vux.loading.hide();
    }
    if (response.data.errcode == 4003) {
        window.sessionStorage&&window.sessionStorage.clear();
        window.localStorage && window.localStorage.clear();
        window.location.href = `${window.location.origin}/v2wx/login`;
        return;
    } else if (response.data.errcode == 4002) {
        Vue.$vux.toast.text(response.data.errmsg, 'top');
        return
    }
    return response;
}, function(error) {
    loadingCount--
    if (!loadingCount) {
        Vue.$vux.loading.hide();
    }
    Vue.$vux.toast.text('请求失败', 'top');
    return Promise.reject(error)
});

export default async(apiApiont = '', data = {}, type = 'GET') => {

    type = type.toUpperCase();
    let now_time = new Date().getTime();

    data.v = 1;
    data.t = now_time; //接口请求的时间
    data.os = statisticsObj.equipmentSystem(); //获取设备信息
    data.single_id = getOnceMark(); //单次会话标识
    data.session_id = getOnlyMark(); //唯一会话标识
    if(!data.openid && getStore('openid') != undefined){
        data.openid = getStore('openid');   
    }

    let formData = new FormData();
    let data_str = '';

    Object.keys(data).sort().forEach(val => {
        data_str += val + '=' + data[val] + '&';
        formData.append(val, data[val])
    });

    data_str = data_str.substr(0, data_str.lastIndexOf('&'));
    let sig = data_str + baseToken;
    sig = md5(md5(sig));

    let reUrl = '';
    if (type == 'GET') {
        reUrl = apiApiont + '?' + data_str;
    } else if (type == 'POST' || type == 'PUT') {
        reUrl = apiApiont
    } 

    // 用于请求的配置
    let requestConfig = {
        url: reUrl,
        method: type,
        baseURL: baseUrl,
        headers: {
            'SIG': sig,
        },
        withCredentials: false
    }

    if (type == 'POST' || type == 'PUT') {
        Object.defineProperty(requestConfig, 'data', {
            enumerable: true,
            value: formData
        })
    };

    try {

        let response = await Axios(requestConfig);
        let responseData = await response.data;
        return responseData;

    } catch (error) {
        throw new Error(error)
    }

}