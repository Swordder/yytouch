
import {
    getOnlyMark,
    getOnceMark,
	getStore,
    date
} from './util'
// import {
// 	statisticsInfo
// } from '../api/sendRequest.js'

let userAgentInfo = navigator.userAgent;
export const statisticsObj = {
    equipmentSystem(){
        //isMac 
        let isWin = (navigator.platform == 'Win32') || (navigator.platform == 'Win64') || (navigator.platform == 'Windows'),
          isMac = (navigator.platform == 'Mac68K') || (navigator.platform == 'MacPPC') || (navigator.platform == 'Macintosh') || (navigator.platform == 'MacIntel');
        if (isMac) return 'Mac';
        //isUnix
        let isUnix = (navigator.platform == 'X11') && !isWin && !isMac;
        if (isUnix) return 'Unix';
        //isLinux
        let isLinux = (String(navigator.platform).indexOf('Linux') > -1);
        if (isLinux) return 'Linux';
        // idAndroid
        let isAndroid = (userAgentInfo.toLowerCase().match(/android/i) == "android");
        if (isAndroid) return 'Android';
        // isIphone
        let isIphone = (userAgentInfo.toLowerCase().match(/ipad/i) == 'ipad') || (userAgentInfo.toLowerCase().match(/iphone os/i) == 'iphone os');
        if (isIphone) return 'iphone';
        // isWin
        if (isWin) {
          let isWin2K = userAgentInfo.indexOf("Windows NT 5.0") > -1 || userAgentInfo.indexOf("Windows 2000") > -1;
          if (isWin2K) return "Win2000";
          let isWinXP = userAgentInfo.indexOf("Windows NT 5.1") > -1 || userAgentInfo.indexOf("Windows XP") > -1;
          if (isWinXP) return "WinXP";
          let isWin2003 = userAgentInfo.indexOf("Windows NT 5.2") > -1 || userAgentInfo.indexOf("Windows 2003") > -1;
          if (isWin2003) return "Win2003";
          let isWinVista = userAgentInfo.indexOf("Windows NT 6.0") > -1 || userAgentInfo.indexOf("Windows Vista") > -1;
          if (isWinVista) return "WinVista";
          let isWin7 = userAgentInfo.indexOf("Windows NT 6.1") > -1 || userAgentInfo.indexOf("Windows 7") > -1;
          if (isWin7) return "Win7";
          return 'windows';
        }
        return 'other';
    },
    browserType:function(){
        let isOpera = userAgentInfo.indexOf('Opera') > -1,
            isFF = userAgentInfo.indexOf('Firefox') > -1,
            isChrome = userAgentInfo.indexOf("Chrome") > -1 && userAgentInfo.indexOf("Safari") > -1,
            isSafari = userAgentInfo.indexOf("Safari") > -1 && userAgentInfo.indexOf("Chrome") == -1,

            isEdge = userAgentInfo.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE,
            isIE = userAgentInfo.indexOf("compatible") > -1 && userAgentInfo.indexOf("MSIE") > -1 && !isOpera,
            
            isUC = userAgentInfo.indexOf("UCBrowser") > -1,
            isBD = userAgentInfo.indexOf("BIDUBrowser") > -1,
            isWX = userAgentInfo.indexOf("MicroMessenger") > -1;

        if(isWX) return 'Wechat Browser';
        if(isIE || isEdge) return 'IE';
        if(isOpera) return 'Opera';
        if(isFF) return 'Firefox';
        if(isSafari) return 'Safari';
        if (isChrome) return 'Chrome';
        if (isUC) return 'UCBrowser';
        if (isBD) return 'BIDUBrowser';
    },
    screenInfo(){
        let screen_height = window.screen.height,
            screen_width = window.screen.width,
            screen_ratio = screen_height + '*' + screen_width;
        return screen_ratio
    },
    setLastPage(now_page){
        window.sessionStorage.setItem('yy_last_page', now_page);
        return now_page;
    },
	setNowPage(now_page){
		window.sessionStorage.setItem('yy_now_page', now_page);
		return now_page;
	},
    getNowPage() {
        let now_page = window.sessionStorage.getItem('yy_now_page');
        if (!now_page) {
            return '';
        }
        return now_page;
    },
    getLastPgae() {
      let last_page = window.sessionStorage.getItem('yy_last_page');
      if (!last_page) {
        return "";
      }
      return last_page;
    },
    getAllData(params){
        let data = {}, location = window.location;
        data.source_type = 1;
        if(JSON.parse(getStore('yy_user_info'))&&(JSON.parse(getStore('yy_user_info')).yyid)){
			data.user_id = JSON.parse(getStore('yy_user_info')).yyid;
            data.user_yyid = JSON.parse(getStore('yy_user_info')).yyid;
            data.user_token = JSON.parse(getStore('yy_user_info')).user_token;
		} else {
			data.user_id = '';
            data.user_yyid = '';
            data.user_token = '';
		};
        data.browser  = this.browserType();
        data.os = this.equipmentSystem();
		data.screen = this.screenInfo();
        data.ip = '';
        data.host_name = location.hostname;
        data.browser_ua = userAgentInfo;
        data.last_page_name = this.getLastPgae();
        data.current_page_name = this.getNowPage();
        data.api_request_params = params? JSON.stringify(params) :'';
        data.page_url = location.href;
        data.is_pretend_login = getStore('wei');
        data.gen_data_time = date().date;
        data.gen_data_date = date().total_date;
        data.business_id = '';
        data.event_id = 1;
        data.cookie_id = getOnceMark();
        data.trace_id = getOnlyMark();
        return data;
    }
}

