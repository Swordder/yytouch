import {
  updateUserInfo,
  fsData,
  rpAuthority
} from '../api/sendRequest'
import {getStore} from '../config/util.js'
import router from '../router/index'
import {
	CHECK_USERINFO,
	UPDATE_USER_INFO,
} from './mutations-type.js'

export default{
	// 核对用户信息
    async checkUserInfo({
        commit,
        state
    }){
		let info = JSON.parse(getStore('yy_user_info'));
		if(info && info.yyid){
			let res = await updateUserInfo(info.yyid,info.user_token);
			commit(UPDATE_USER_INFO,Object.assign(info,res.data))
// 			if(res.errcode == 4003){
// 				commit(CHECK_USERINFO);
// 			} else if(res.errcode == 0){
// 				commit(UPDATE_USER_INFO,Object.assign(info,res.data))
// 			}
		} else {
			commit(CHECK_USERINFO);
			return;
		}
    },
	// 报表获取权限
  async getRpAuthor(){
    let info = JSON.parse(getStore('yy_user_info'));
    let res = await rpAuthority(info.yyid,info.user_token);
    return res
  },
  // 拜访获取详情
//   async getVisitDetail(router_id){
//     let info = JSON.parse(getStore('yy_user_info'));
//     let res = await visitDetail(info.yyid,info.user_token,router_id);
//     if(res.errcode != 0){
//         this.$vux.toast.text(res.errmsg,'top');
//         return
//     };
//     this.lat = res.data.info.lat;
//     this.lng = res.data.info.lng;
//     let obj = {
//         v_time:res.data.info.date,
//         v_hos:res.data.info.hospital_id,
//         v_dep_id:res.data.info.office_id,
//         v_product:res.data.info.series_ids,
//         v_way:res.data.info.visit_type,
//         v_aims:res.data.info.visit_aim,
//         v_main:res.data.info.main_purpose,
//         v_result:res.data.info.result,
//         v_next:res.data.info.next,
//         v_mark:res.data.info.comment,
//         v_pics:res.data.info.pics,
//         // v_lat:'',
//         // v_lng:'',
//         v_pos:res.data.info.position,
//     };
//     // setSessionStore('visit_data',JSON.stringify(obj));
//     // this.visit_data = { ...obj };
//     this.INIT_VISTI({obj})
// },

}
