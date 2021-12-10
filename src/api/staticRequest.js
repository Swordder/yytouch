import axios from "axios"

// 所有省份
export const totalProvince = axios.get('http://static.youyao99.com/china.json').then(res => {
	return res.data;
});
// 所有市
export const totalCity = (province_id) => axios.get('http://static.youyao99.com/'+province_id+'.json').then(res => {
	return res.data
})
// 科室
export const totalDepartment = axios.get('http://static.youyao99.com/department.json').then(res => {
	return res.data
})
// 产品首页固定内容
export const productBaseInfo = axios.get('http://static.youyao99.com/productInfo.json?t=13').then(res => {
	return res.data;
});
// 所有科室和应用
export const totalSummaryData = (str_type) => axios.get('http://static.youyao99.com/'+str_type+'.json?t=12').then(res =>{
	return res.data;
})
// 认证流程修改内容
export const depList = axios.get('http://static.youyao99.com/depsList.json?t=1').then(res => {
	return res.data;
});
export const adaptations = axios.get('http://static.youyao99.com/adaptationList.json').then(res => {
	return res.data;
});