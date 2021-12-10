
import {
  setStore,
  setSessionStore,
  removeSessionStore
} from '../config/util'

import * as types from './mutations-type'
export default{
	[types.SET_PAGE](state,now_page){
		window.sessionStorage.setItem('last_page',now_page);
		state.now_page = now_page;
	},
	[types.GET_NOW_PAGE](state,now_page){
			state.now_page = now_page
	},
	[types.GET_LAST_PAGE](state,last_page){
			state.last_page = last_page
	},
	// 记录用户信息
	[types.RECORD_USERINFO](state,info){
		state.user_info = info;
		setStore('yy_user_info',JSON.stringify(info));
	},
	// 核查用户信息，并存入vuex
	[types.CHECK_USERINFO](state){
		setStore('yy_user_info',{});
		state.user_info = {};
	},
	// 更新用户信息
	[types.UPDATE_USER_INFO](state,res){
		setStore('yy_user_info',res);
		state.user_info = res;
	},
	// 初始化医院选择列表中的值
	[types.INIT_CART_LIST](state,{
		init_hos_list,
		init_hosid_list
	}){
		state.cart_list = init_hos_list;
		state.yyid_list = init_hosid_list;
	},
	// 添加医院
	[types.ADD_CART_LIST](state,{
		hos_id,
		hos_name,
		hos_level
	}){
		let obj = {
			'hos_id':hos_id,
			'hos_name':hos_name,
			'hos_level':hos_level,
		};
		let cartList = state.cart_list;
		let hos_id_list = state.yyid_list;
		let num = 0;
		let cartList_length = 0;
		if(cartList.length == 0){
			cartList.push(obj);
			hos_id_list.push(hos_id);
			
		} else {
			cartList_length = cartList.length;
			cartList.forEach((item,index) => {
				if(item.hos_id == hos_id){
					cartList.splice(index,1);
					hos_id_list.splice(index,1);
				} else {
					num++
				}
			});
			if(num == cartList_length){
				cartList.push(obj);
				hos_id_list.push(hos_id);
			}
		}
		setSessionStore('yy_cart_list',cartList);
		setSessionStore('yy_hosid_list',hos_id_list);
	},
	[types.DELETE_CART_LIST](state,{
		hos_id
	}){
		let cartList = state.cart_list;
		let hos_id_val = state.yyid_list;
		cartList.forEach((item,index) => {
			if(item.hos_id == hos_id){
				cartList.splice(index,1);
				hos_id_val.splice(index,1);
			}
		});
		setSessionStore('yy_cart_list',cartList);
		setSessionStore('yy_hosid_list',hos_id_val);
	},
	// 医院选择波纹状态
	[types.WAVE_STATUS](state){
		state.wave_status = true;
		setTimeout(function(){
			state.wave_status = false
		},1000)
	},
	// 认证科室的选择
	[types.GET_DEPS](state,arr){
		state.deps = arr;
		setSessionStore('yy_deps',arr);
	},
	// 曾服务的医院的列表
	[types.GET_COMPANY_LIST](state,{
		company_name,
		territory,
		territory_txt,
		indications,
		indications_txt,
		drug_name
	}){
		let company_list = state.company_list;
		let company_list_txt = state.company_list_txt;
		let com_txt_obj = {
			'company_name':company_name,
			'territory':territory_txt.toString(),
			'indications':indications_txt.toString(),
			'drug_name':drug_name,
		};
		let com_obj = {
			'company_name':company_name,
			'territory':territory.toString(),
			'indications':indications.toString(),
			'drug_name':drug_name,
		};
		company_list.push(com_obj);
		company_list_txt.push(com_txt_obj);
		setSessionStore('yy_company_list',company_list);
		setSessionStore('yy_company_list_txt',company_list_txt);
	},
	[types.DELETE_COMPANY](state,index){
		let company_list = state.company_list;
		let company_list_txt = state.company_list_txt;
		company_list.splice(index,1);
		company_list_txt.splice(index,1);
		
		setSessionStore('yy_company_list',company_list);
		setSessionStore('yy_company_list_txt',company_list_txt);
	},
	// 治疗领域ID
	[types.GET_TERRITORY](state,
		// territory,
		territoryId
	){
		state.territory_id = territoryId;
		setSessionStore('yy_com_territory_id',territoryId);
	},
	[types.GET_TERRITORY_TXT](state,
		territory
	){
		state.territory = territory;
		setSessionStore('yy_com_territory',territory);
	},
	// 治疗适应症ID
	[types.GET_INDICATION](state,
		indicationId
	){
		state.indication_id = indicationId;
		setSessionStore('yy_com_indication_id',indicationId);
	},
	[types.GET_INDICATION_TXT](state,
		indication
	){
		state.indication = indication;
		setSessionStore('yy_com_indication',indication);
	},
	[types.CLEAR_FAMILIAR_COM](state){
		state.territory = [];
		state.indication = [];
		state.territory_id = [];
		state.indication_id = [];
		state.territory = [];
		state.indication = [];
		removeSessionStore('yy_com_territory');
		removeSessionStore('yy_com_territory_id');
		removeSessionStore('yy_com_indication');
		removeSessionStore('yy_com_indication_id');
		removeSessionStore('yy_familiar_com');
        removeSessionStore('yy_drug_name');
	},
	[types.SELECTED_COMPANY](state,{
		company_id,
		company_name
	}){
		setSessionStore('yy_company_id',company_id);
		setSessionStore('yy_company_name',company_name);
	},
	// 拜访计划
	// 签入
	[types.SET_VISIT_CI](state,{
		type,
		value
	}){
		switch (type) {
			case 1:
				state.visit_check_in = { ...state.visit_check_in,'v_way':value }
				break;
			case 2:
				state.visit_check_in = { ...state.visit_check_in,'v_hos_name':value }
				break;
			case 3:
				state.visit_check_in = { ...state.visit_check_in,'v_hos_id':value }
				break;
			case 4:
				state.visit_check_in = { ...state.visit_check_in,'v_pos':value }
				break;
			case 5:
				state.visit_check_in = { ...state.visit_check_in,'v_lat':value }
				break;
			case 6:
				state.visit_check_in = { ...state.visit_check_in,'v_lng':value }
				break;
			default:
				break;
		};
		setSessionStore('yy_visit_check_in',JSON.stringify(state.visit_check_in));
	},
	[types.SET_VISIT](state,{
		type,
		value
	}){
		switch (type) {
			case 1:
				state.visit_data = { ...state.visit_data,'v_hos_id':value }
				break;
			case 2:
				state.visit_data = { ...state.visit_data,'v_hos_name':value }
				break;
			case 3:
				state.visit_data = { ...state.visit_data,'v_dep_id':[...value] }
				break;
			case 4:
				state.visit_data = { ...state.visit_data,'v_product':value }
				break;
			case 5:
				state.visit_data = { ...state.visit_data,'v_way':value }
				break;
			case 8:
				state.visit_data = { ...state.visit_data,'v_result':value }
				break;
			case 9:
				state.visit_data = { ...state.visit_data,'v_next':value }
				break;
			case 11:
				state.visit_data = { ...state.visit_data,'v_pos':value }
				break;
			case 12:
				state.visit_data = { ...state.visit_data,'v_prod_name':value }
				break;
			case 13:
				state.visit_data = { ...state.visit_data,'v_lat':value }
				break;
			case 14:
				state.visit_data = { ...state.visit_data,'v_lng':value }
				break;
			case 15:
				state.visit_data = { ...state.visit_data,'v_docs':value }
				break;
			default:
				break;
		};
		setSessionStore('yy_visit_data',JSON.stringify(state.visit_data));
	},
	[types.SET_VISIT_IMG](state,{
		type,
		file_list
	}){
		switch (type) {
			case 1:
				state.visit_check_in = { ...state.visit_check_in,v_pics:[...file_list] };
				setSessionStore('yy_visit_check_in',JSON.stringify(state.visit_check_in));
				break;
			case 2:
				state.visit_data = { ...state.visit_data,v_pics:[...file_list] };
				setSessionStore('yy_visit_data',JSON.stringify(state.visit_data));
				break;
			default:
				break;
		}
	},
	[types.DELETE_VISIT_IMG](state,file_list){
		state.visit_data = { ...state.visit_data,v_pics:[...file_list] };
		setSessionStore('yy_visit_data',JSON.stringify(state.visit_data));
	},
	[types.INIT_VISTI](state,{
		type,
		obj
	}){
		switch (type) {
			case 1:
				state.visit_check_in = { ...state.visit_check_in,...obj };
				setSessionStore('yy_visit_check_in',JSON.stringify(obj));
				break;
			case 2:
				state.visit_data = { ...state.visit_data,...obj };
				setSessionStore('yy_visit_data',JSON.stringify(obj));
				break;
			default:
				break;
		}
	},
	[types.CLEAR_VISIT_CI](state,{type,obj}){
		switch (type) {
			case 1:
				state.visit_check_in = { ...state.visit_check_in,...obj };
				break;
			case 2:
				state.visit_data = { ...state.visit_data,...obj };
				break;
			default:
				break;
		}
		window.sessionStorage && window.sessionStorage.clear(); 
	}
}