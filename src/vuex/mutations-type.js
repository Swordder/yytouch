// 页面to,from记录
export const SET_PAGE = 'SET_PAGE';    //设置页面名称
export const GET_NOW_PAGE = 'GET_NOW_PAGE';    //获取当前页面名称
export const GET_LAST_PAGE = 'GET_LAST_PAGE';  //获取上个页面名称
export const RECORD_USERINFO = 'RECORD_USERINFO'; //记录用户信息
export const CHECK_USERINFO = 'CHECK_USERINFO';		//核查用户信息是否正确
export const GET_USERINFO = 'GET_USERINFO';			//获取用户信息，并存入vuex
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'; //更新本地存储信息

// 完善信息，添加医院流程
export const INIT_CART_LIST = 'INIT_CART_LIST';//初始化医院购物车的值
export const ADD_CART_LIST = 'ADD_CART_LIST';//添加医院
export const DELETE_CART_LIST = 'DELETE_CART_LIST';//删除已添加的医院
export const WAVE_STATUS = 'WAVE_STATUS';			//意愿选择波纹状态
export const SELECTED_COMPANY = 'SELECTED_COMPANY'; //选择单位
// 认证信息修改
export const GET_DEPS = 'GET_DEPS';//初始化科室的选择
export const GET_COMPANY_LIST = 'GET_COMPANY_LIST'; //曾服务的公司的列表
export const DELETE_COMPANY = 'DELETE_COMPANY'; //删除曾服务的公司
export const GET_TERRITORY = 'GET_TERRITORY';//获取治疗领域ID
export const GET_TERRITORY_TXT = 'GET_TERRITORY_TXT';//获取治疗领域名称
export const GET_INDICATION = 'GET_INDICATION';//获取适应症ID
export const GET_INDICATION_TXT = 'GET_INDICATION_TXT';//获取适应症名称
export const CLEAR_FAMILIAR_COM = 'CLEAR_FAMILIAR_COM';//清空已发布的最近服务的公司的数据

// 拜访计划
// 签入计划
export const SET_VISIT_CI = 'SET_VISIT_CI';
export const CLEAR_VISIT_CI = 'CLEAR_VISIT_CI';
export const SET_VISIT = 'SET_VISIT';
export const SET_VISIT_IMG = 'SET_VISIT_IMG';
export const DELETE_VISIT_IMG = 'DELETE_VISIT_IMG';
export const INIT_VISTI = 'INIT_VISTI';



