/*
 *   create:2018/12/11
 *   author:MTT
 *
 *   baseUrl: api请求地址
 *   baseToken: 校验戳
 *   appId： 微信的appid
 *   callbackUrl: 微信跳转的回调
 *   httpUrl: 域名,
 *   routerMode: 路由模式
 *
 */

let baseUrl = '';
let baseToken = '';
let appId = '';
let callbackUrl = '';
let httpUrl = '';
let aerogenUrl = '';
// let routerMode = 'history';

if (process.env.NODE_ENV === 'development') {
    // qa 环境
    baseUrl = 'http://wx.qa.youyao99.com/apibeta';
    baseToken = '&QA:8F86727E527411E79E6C68F728954D54188D51B5534511E79E6C68F728954D54';
    appId = 'wx61985e60730ea1e7';
    callbackUrl = 'api.qa.youyao99.com'; 
    httpUrl = 'http://wx.qa.youyao99.com/';
    aerogenUrl = 'http://aerogen.qa.yyimgs.com'
} else if (process.env.NODE_ENV === 'testing') {
    // qa2 环境  添加多域名的支持
    baseUrl = 'http://wx.qa2.youyao99.com/v2api';
    baseToken = '&QA:6F86727E527411E79E6C68F728954D54188D51B5534511E79E6C68F728954D54';
    appId = 'wx3d474ed4079354db';
    callbackUrl = 'api.qa2.youyao99.com'; 
    httpUrl = 'http://wx.qa2.youyao99.com/';
    aerogenUrl = 'http://aerogen.qa2.yyimgs.com'
} else if (process.env.NODE_ENV === 'production') {
    // 线上环境 添加多域名的支持
    baseToken = '&QA:6F86727E527411E79E6C68F728954D54188D51B5534511E79E6C68F728954D54';
    appId = 'wxcebf3d664a7c9004';
    aerogenUrl = 'http://aerogen.yyimgs.com'
	var localhost_origin = document.location.origin;
	if(localhost_origin=='http://wxbackup.youyao99.com')
	{
		baseUrl = 'http://wxbackup.youyao99.com/v2api';
		httpUrl = 'http://wxbackup.youyao99.com/';
		callbackUrl = 'wxbackup.youyao99.com';
	}
	else
	{		
		baseUrl = 'http://wx.youyao99.com/v2api';
		httpUrl = 'http://wx.youyao99.com/';
		callbackUrl = 'wx.youyao99.com';
        
	}
}

export {
    baseUrl,
    baseToken,
    appId,
    callbackUrl,
    httpUrl,
    // routerMode
    aerogenUrl
}