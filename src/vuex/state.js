import { getStore,getSessionStore } from "../config/util"

export default {
  user_info: JSON.parse(getStore('yy_user_info') || '{}'),
  now_page :'',
  last_page:'',
	cart_list:getSessionStore('yy_cart_list')?JSON.parse(getSessionStore('yy_cart_list')):[],
	yyid_list:getSessionStore('yy_hosid_list')?JSON.parse(getSessionStore('yy_hosid_list')):[],
	wave_status:false,
	company_id : getSessionStore('yy_company_id')?getSessionStore('yy_company_id'):'',
  company_name: getSessionStore('yy_company_name')?getSessionStore('yy_company_name'):'',
  // 认证的修改2020/09/09
  deps:getSessionStore('yy_deps')?JSON.parse(getSessionStore('yy_deps')):[],
  // 填写曾服务的公司
  company_list:getSessionStore('yy_company_list')?JSON.parse(getSessionStore('yy_company_list')):[],
  company_list_txt:getSessionStore('yy_company_list_txt')?JSON.parse(getSessionStore('yy_company_list_txt')):[],
  territory:getSessionStore('yy_com_territory')?JSON.parse(getSessionStore('yy_com_territory')):[],
  territory_id:getSessionStore('yy_com_territory_id')?JSON.parse(getSessionStore('yy_com_territory_id')):[],
  indication:getSessionStore('yy_com_indication')?JSON.parse(getSessionStore('yy_com_indication')):[],
  indication_id:getSessionStore('yy_com_indication_id')?JSON.parse(getSessionStore('yy_com_indication_id')):[],
  // 拜访计划
  // 拜访签入
  visit_check_in: JSON.parse(getSessionStore('yy_visit_check_in')) ||{
    v_way:"请选择",
    v_hos_name:"请选择",
    v_hos_id:"",
    v_pics:[],
    v_pos:'',
    v_lat:'',
    v_lng:'',
    v_yyid:''
  },
  visit_data: JSON.parse(getSessionStore('yy_visit_data')) || {
    v_hos_name:"签入时未选择医院",
    v_hos_id:"",
    v_hos_type:'',
    v_dep_id:[],
    v_docs:[],
    v_prod_name:'',
    v_product:[],
    v_way:"",
    v_result:'',
    v_next:'',
    v_pics:[],
    v_pos:'',
    v_lat:'',
    v_lng:'',
    v_yyid:''
  },
  // 报表颜色
  color: [
    '#24D0BF', 
    '#4577FF', 
    '#FFA114', 
    '#DE7E7b', 
    '#C23531',
    '#2F4554',
    '#547B95',
    '#8DCAEA',
    '#37A2DA',
    '#FF9F7F',
    '#E7BCF3',
    '#FB7293',
    '#9D96F5',
    '#E062AE',
    '#8378EA',
    '#96BFFF'
  ],
}
