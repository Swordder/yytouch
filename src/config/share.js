import wx from 'weixin-js-sdk'
import Vue from 'vue'
import { getWxConfig,getShareCount } from '../api/sendRequest'
import { getStore,getSessionStore } from '../config/util'

const wxShare = async (title, desc_con, imgUrl, resource_yyid, resource_type,params) => {
  // 微信分享配置
  // 配置link，添加share_yyid，判断分享来源
	let href = window.location.href;
  let config_res = await getWxConfig(1,href,JSON.stringify([]));
  if(config_res.errcode != 0){
    Vue.$vux.toast.text(config_res.errmsg,'top');
    return
  };
  let link = window.location.origin;
	let user_info = JSON.parse(getStore('yy_user_info'));
  let user_yyid = '';
    // 判断是否登录了，并获取user_yyid
  if (user_info&&Object.keys(user_info).length != 0) {
      user_yyid = user_info.yyid;
  } else {
      user_yyid = 's_' + getSessionStore('yy_singleMark');
  };
  if (Object.keys(params).length == 0  ) {
      link = link + window.location.pathname + '?share_yyid=' + user_yyid
  } else {
      if (params.hasOwnProperty('share_yyid')) {

          let ch = 'share_yyid=' + params.share_yyid;
          let reg = "/" + ch + "/g";

          href = href.replace(eval(reg), 'share_yyid=' + user_yyid);
          link = href;
      } else {
          link = href + '&share_yyid=' + user_yyid
      }
  }

  wx.config({
      debug: false,
      appId: config_res.data.appId,
      timestamp: config_res.data.timestamp,
      nonceStr: config_res.data.nonceStr,
      signature: config_res.data.signature,
      jsApiList: [
          'scanQRCode',
          'onMenuShareAppMessage',
          'onMenuShareTimeline'
      ] // 所有要调用的 API 都要加到这个列表中
  });

  wx.ready(function(){
    // 微信分享的数据
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc_con, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            getShareCount(user_yyid,resource_yyid, resource_type, getSessionStore('yy_now_page'));
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function () {
            getShareCount(user_yyid,resource_yyid, resource_type, getSessionStore('yy_now_page'));
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    //
  })
}

// 禁止分享按钮
const hideMenu = async function(){

  let href = window.location.href;
  let config_res = await getWxConfig(1,href,[]);
  if(config_res.errcode != 0){
    Vue.$vux.toast.text(res.errmsg,'top');
    return
  };

  wx.config({
      debug: false,
      appId: config_res.data.appId,
      timestamp: config_res.data.timestamp,
      nonceStr: config_res.data.nonceStr,
      signature: config_res.data.signature,
      jsApiList: [
          'hideMenuItems',
      ] // 所有要调用的 API 都要加到这个列表中
  });

  wx.ready(function(){
    wx.hideMenuItems({
      menuList: [
        "menuItem:share:appMessage",
        "menuItem:share:timeline",
        "menuItem:share:qq",
        "menuItem:share:weiboApp",
        "menuItem:share:facebook",
        "menuItem:share:QZone",
        "menuItem:copyUrl",
        "menuItem:openWithQQBrowser",
        "menuItem:openWithSafari",
        "menuItem:share:email"
      ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
  })
};
// 预览图片，即点击放大
const previewImg = function(cur_img_src,src_list){
	wx.previewImage({
    current: cur_img_src, // 当前显示图片的http链接
    urls: src_list // 需要预览的图片http链接列表
	});
}
// 调取微信相机
const getCa = function(){
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    }
  });
}
// 获取地理位置
const getLocations = async function(lat,lng){
  let href = window.location.href;
  let config_res = await getWxConfig(1,href,[]);
  wx.config({
    debug: false,
    appId: config_res.data.appId,
    timestamp: config_res.data.timestamp,
    nonceStr: config_res.data.nonceStr,
    signature: config_res.data.signature,
    jsApiList: [
        'scanQRCode',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'getLocation'
      ] // 所有要调用的 API 都要加到这个列表中
  });
  wx.getLocation({
    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
      lat = res.latitude; 
      lng = res.longitude;
      
    }
  });
}


export {
  wxShare,
  hideMenu,
  previewImg,
  getLocation,
  getCa
}
