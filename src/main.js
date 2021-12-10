// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import { beforeEach } from './router/beforeEach'
import i18n from './language/index.js'
import store from './vuex/index'
import FastClick from 'fastclick'
import 'lib-flexible'
// import animate from 'animate.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI);
// 图标插件引入
import VCharts from 'v-charts'
Vue.use(VCharts)
    // 引入格式化样式
import './assets/css/reset.less'
import './assets/css/common.less'
Vue.config.productionTip = false

//引入iconfont
import './assets/iconfont/iconfont.css'

// 引入vantUI库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)
// 全局注册
import {
    ToastPlugin
} from 'vux'
Vue.use(ToastPlugin)
import {
    LoadingPlugin
} from 'vux'
Vue.use(LoadingPlugin)
    // 或者umd方式
    // 引入构建的js文件
    // 解决300ms延迟问题
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
// 解决引入fastclick后IOS多次点击才能聚焦的问题
FastClick.prototype.focus = function(targetElement) {
  targetElement.focus(); //加入这一句话就OK了
};

// 路由配置
Vue.use(VueRouter)
let router = new VueRouter({
    routes,
    mode: 'history',
    base: 'v2wx',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
});
router.beforeEach(beforeEach)
/* eslint-disable no-new */
new Vue({
    router,
    store,
    i18n
}).$mount('#app')
