import axiosFn from "../config/index"
import { statisticsObj } from '../config/statistics.js'
// 微信分享获取配置参数接口
// author:MTT    Time:2021/01/08
// 微信公众号配置
export const getAuthorUrl = (type, is_silent, state, redirect) => axiosFn('/newapi/wechat/get-oauth-redirect-url', {
    'type': type,
    'is_silent': is_silent,
    'state': state,
    'redirect': redirect
}, 'POST');
export const getAuthorUserInfo = (type, state, code) => axiosFn('/newapi/wechat/get-oauth-user-info', {
    'type': type,
    'state': state,
    'code': code
}, 'POST');
// 微信分享获取配置参数接口
export const getWxConfig = (type, url, apis) => axiosFn('/newapi/wechat/signpage/get', {
    'type': type,
    'url': url,
    'apis': apis
}, 'POST');
export const getShareConfig = (url) => axiosFn('/wechat/signpage/get', {
    'url': url
}, 'POST');
// 发送分享统计接口
export const getShareCount = (user_yyid, resource_yyid, resource_type, page_name) => axiosFn('/youyao/resource/share/count', {
    'user_yyid': user_yyid,
    'resource_yyid': resource_yyid,
    'resource_type': resource_type,
    'page_name': page_name
}, 'POST');
// 用户统计接口
export const statisticsInfo = function(params) {
    let data = statisticsObj.getAllData(params);
    axiosFn('/statistic/wap', data, 'POST');
};
// export const statisticsInfo = function(){
// 	let data = statisticsObj.getAllData();
// 	axiosFn('/youyao/user/count',data,'POST');
// };
// 统计计数
export const viewCount = (user_yyid, resource_yyid, share_user_yyid, resource_type, trace_yyid) => axiosFn('/youyao/resource/view/count', {
    'user_yyid': user_yyid,
    'resource_yyid': resource_yyid,
    'share_user_yyid': share_user_yyid,
    'resource_type': resource_type,
    'trace_yyid': trace_yyid
}, 'POST');
// 登录获取公众号来源接口
export const getUserResource = (openid, user_yyid, souree_type, user_reason) => axiosFn('/user/souree', {
    'openid': openid,
    'user_yyid': user_yyid,
    'souree_type': souree_type,
    'user_reason': user_reason
}, 'POST');
// 登录发送验证码
export const getCode = phone_num => axiosFn('/user/send/smscode', {
    'phone_num': phone_num
}, 'POST');
// 登录接口调用
export const loginPlat = (phone_num, code, openid) => axiosFn('/user/login', {
    'phone_num': phone_num,
    'code': code,
    'openid': openid,
}, 'POST');

// 个人中心更新用户信息
export const updateUserInfo = (user_yyid, user_token) => axiosFn('/user/info', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');

// 代表信息接口
export const getAgentInfo = (user_yyid, user_token) => axiosFn('/agent/info', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');

// 代表认证
export const agentAdd = (user_yyid, user_token, truename, hospital_yyid, region_yyid, company_yyid, other_company_name, working_age, familiar_company, familiar_offices, serve_direction) => axiosFn('/agent/add', {
        'user_yyid': user_yyid,
        'user_token': user_token,
        'truename': truename,
        'hospital_yyids': hospital_yyid,
        'region_yyid': region_yyid,
        'company_yyid': company_yyid,
        'other_company_name': other_company_name,
        'working_age': working_age,
        'familiar_company': familiar_company,
        'familiar_offices': familiar_offices,
        'serve_direction': serve_direction
    }, 'POST')
    // 公司选择接口
export const companyList = (user_yyid, user_token, keywords, action, page, page_size) => axiosFn('/company/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'keywords': keywords,
    'action': action,
    'page': page,
    'page_size': page_size
}, 'POST');
export const companyTotal = (user_yyid, user_token, keywords) => axiosFn('/company/search', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'keywords': keywords,
}, 'POST');
// 个人基础信息
export const getUserBaseInfo = (user_yyid, user_token) => axiosFn('/user/Getinfo', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');

// 助手里的流向提醒
export const tranRemind = (user_yyid, user_token) => axiosFn('/msg/youyao/transaction', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');

// 医院搜索
export const hospitalList = (s_yyid, keywords, level, pro_id, city_id, have_transaction, can_apply, page, user_yyid) => axiosFn('/hospital/search', {
    'series_yyid': s_yyid,
    'keywords': keywords,
    'level': level,
    'pro_yyid': pro_id,
    'city_yyid': city_id,
    'have_transaction': have_transaction,
    'can_apply': can_apply,
    'page': page,
    'user_yyid': user_yyid
}, 'POST');

// 医院详情
export const hospitalDetail = (series_yyid, hos_yyid) => axiosFn('/hospital/info', {
    'series_yyid': series_yyid,
    'hospital_yyid': hos_yyid
}, 'POST');

// 我服务的医院
export const userHosList = (keywords, user_yyid, user_token) => axiosFn('/agent/hospital/list', {
    'keywords': keywords,
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
// 医院信息接口
export const hospitalInfo = (hospital_yyid, user_yyid, user_token) => axiosFn('/hospital/info', {
    'hospital_yyid': hospital_yyid,
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
// 我服务的医院详情
export const userHosDetail = (hospital_yyid, user_yyid, user_token) => axiosFn('/agent/hospital/detail', {
    'hospital_yyid': hospital_yyid,
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
// 解除服务接口
export const offService = (serve_yyid, user_yyid, user_token) => axiosFn('/agent/remove/serve/apply', {
    'serve_yyid': serve_yyid,
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');
// 更新医院信息
export const updateHosInfo = (user_yyid, user_token, hospital_yyid, hospital_name, level) => axiosFn('/hospital/update_info', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_yyid': hospital_yyid,
    'hospital_name': hospital_name,
    'level': level
}, 'POST');
// 更新服务药品的医院状态
export const updateTrack = (user_yyid, user_token, hospital_yyid, series_yyid, track_type) => axiosFn('/hospital/update_track', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_yyid': hospital_yyid,
    'series_yyid': series_yyid,
    'track_type': track_type
}, 'POST');
// 纠错接口
export const errCorrect = (user_yyid, user_token, content, type, email) => axiosFn('/user/submit/help', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'content': content,
    'type': type,
    'email': email
}, 'POST');

// 产品首页
// 系列接口
export const seriesInfo = (series_yyid, user_yyid, user_token) => axiosFn('/series/info', {
    'series_yyid': series_yyid,
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');
// 申请医院的接口
export const serviceApply = (series_yyid, hospital_yyid, user_yyid, user_token) => axiosFn('/agent/submit/serve/apply', {
    'series_yyid': series_yyid,
    'hospital_yyid': hospital_yyid,
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');

// 我的积分
export const getPoint = (user_yyid, user_token) => axiosFn('/agent/point/info', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');
export const getHistoryPoint = (user_yyid, user_token) => axiosFn('/agent/history/point', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'Post');

// 流向
export const dailyFlowList = (user_yyid, user_token) => axiosFn('/msg/agent/dailytrans/list', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');
export const dailyFlowDetail = (user_yyid, user_token, msy_yyid) => axiosFn('/msg/agent/dailytrans/detail', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'msg_yyid': msy_yyid
}, 'POST');

export const historyFlowList = (user_yyid, user_token, product_yyid, hospital_yyid, trend_search_month, type, action, keywords, trend_month) => axiosFn('/agent/trans/detail', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'product_yyid': product_yyid,
    'hospital_yyid': hospital_yyid,
    'trend_search_month': trend_search_month,
    'type': type,
    'action': action,
    'keywords': keywords,
    'trend_month': trend_month
}, 'POST');

// 服务月报
export const agentFlowList = (user_yyid, user_token) => axiosFn('/agent/trans/list', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');
// 服务月报详情
// 药品信息
export const productInfo = (user_yyid, product_yyid) => axiosFn('/product/info', {
    'user_yyid': user_yyid,
    'product_yyid': product_yyid
}, 'POST');
// 月报基础数据
export const reportData = (user_yyid, user_token, product_yyid) => axiosFn('/trend/product/report/data', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'product_yyid': product_yyid
}, 'POST');
// 月报图表
export const reportChart = (user_yyid, user_token, product_yyid) => axiosFn('/trend/product/report/chart', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'product_yyid': product_yyid
}, 'POST');
// 月报医院排名
export const reportRank = (user_yyid, user_token, product_yyid, page) => axiosFn('/trend/product/report/rank', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'product_yyid': product_yyid,
    'page': page
}, 'POST');
// 产品
export const proManualList = (user_yyid, product_yyid) => axiosFn('/product/manual/list', {
    'user_yyid': user_yyid,
    'product_yyid': product_yyid
}, 'POST');
// 产品宝典
// 宝典首页临床解读
export const clinicalList = (user_yyid, product_yyid, page, page_size, tags) => axiosFn('/product/interpret/list', {
    'user_yyid': user_yyid,
    'product_yyid': product_yyid,
    'page': page,
    'page_size': page_size,
    'tags': tags
}, 'POST');
// 文献
export const literatureList = (user_yyid, product_yyid, page, page_size, tags) => axiosFn('/product/document/list', {
    'user_yyid': user_yyid,
    'product_yyid': product_yyid,
    'page': page,
    'page_size': page_size,
    'tags': tags
}, 'POST');
// 文献详情
export const literatureDetail = (user_yyid, document_yyid) => axiosFn('/product/document/detail', {
    'user_yyid': user_yyid,
    'document_yyid': document_yyid
}, 'POST');

// 视频列表
export const videoList = (user_yyid, product_yyid, page, page_size, tags) => axiosFn('/product/video/list', {
    'user_yyid': user_yyid,
    'product_yyid': product_yyid,
    'page': page,
    'page_size': page_size,
    'tags': tags
}, 'POST');
// 视频详情
export const videoDetail = (user_yyid, video_yyid) => axiosFn('/product/video/detail', {
    'user_yyid': user_yyid,
    'video_yyid': video_yyid
}, 'POST');
// 临床解读详情
export const clinicalDetail = (user_yyid, interpret_yyid) => axiosFn('/product/interpret/detail', {
    'user_yyid': user_yyid,
    'interpret_yyid': interpret_yyid
}, 'POST');
// 是否收藏
export const favStatus = (user_yyid, resource_yyid) => axiosFn('/fav/resource/has', {
    'user_yyid': user_yyid,
    'resource_yyid': resource_yyid
}, 'POST');
// 收藏夹列表
export const favList = (user_yyid, user_token, resource_yyid) => axiosFn('/fav/get/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'resource_yyid': resource_yyid,
}, 'POST');
// 添加收藏夹
export const addFav = (user_yyid, user_token, name) => axiosFn('/fav/add', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'name': name,
}, 'POST');
// 编辑收藏夹
export const editFav = (fav_yyid, name) => axiosFn('/fav/update', {
    'fav_yyid': fav_yyid,
    'name': name
}, 'POST');
// 删除收藏夹
export const delFav = fav_yyid => axiosFn('/fav/delete', {
    'fav_yyid': fav_yyid
}, 'POST');
// 变换收藏夹
export const changeFav = (user_yyid, user_token, resource_yyid, resource_type, last_fav_yyids, new_fav_yyids) => axiosFn('/fav/resource/change', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'resource_yyid': resource_yyid,
    'resource_type': resource_type,
    'last_fav_yyids': last_fav_yyids,
    'new_fav_yyids': new_fav_yyids
}, 'POST');
// 获取收藏夹详情
export const favListDetail = (user_yyid, fav_yyid) => axiosFn('/fav/get/detail', {
    'user_yyid': user_yyid,
    'fav_yyid': fav_yyid
}, 'POST');
// 删除单个收藏内容
export const delFavCon = (fav_yyid, resource_yyid) => axiosFn('/fav/resource/delete', {
    'fav_yyid': fav_yyid,
    'resource_yyid': resource_yyid
}, 'POST');
// 获取评论内容
export const commentsList = (user_yyid, resource_yyid, trace_yyid, share_user_yyid) => axiosFn('/comment/get', {
    'user_yyid': user_yyid,
    'resource_yyid': resource_yyid,
    'trace_yyid': trace_yyid,
    'share_user_yyid': share_user_yyid
}, 'POST');
// 发送评论
export const sendComment = (user_yyid, user_token, resource_yyid, resource_type, father_yyid, content) => axiosFn('/comment/send', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'resource_yyid': resource_yyid,
    'resource_type': resource_type,
    'father_yyid': father_yyid,
    'content': content,
}, 'POST');
// 删除评论
export const delComment = (user_yyid, user_token, com_yyid) => axiosFn('/comment/delete', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'com_yyid': com_yyid
}, 'POST');
// 直播和公开课
// banner
export const liveBanner = (user_yyid, user_token, type) => axiosFn('/live/banner_list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'type': type
}, 'POST');
// 直播预告
export const liveAdvance = (user_yyid, user_token, type) => axiosFn('/live/advance', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'type': type
}, 'POST');
// 公开课或专家讲座
export const liveVideoList = (user_yyid, user_token, recommend, type) => axiosFn('/live/videolist', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'recommend': recommend,
    'type': type
}, 'POST');
// 回放详情
export const liveDetail = video_yyid => axiosFn('/youyao/playback/detail', {
    'video_yyid': video_yyid
}, 'POST');
// 是否关注
export const focusStatus = (openid, yyid) => axiosFn('/live/focus', {
    'openid': openid,
    'yyid': yyid
}, 'POST');
// 团队表现
export const rpData = openid => axiosFn('/data/fsreportv2', {
    'openid': openid
}, 'POST');
export const zeroSalesData = (openid, type) => axiosFn('/data/fszero', {
    'openid': openid,
    'type': type
}, 'POST');
export const areaData = (openid, area) => axiosFn('/data/fsareareport', {
    'openid': openid,
    'area': area
}, 'POST');
export const hosFlowData = (openid, area) => axiosFn('/data/fsareaflow', {
    'openid': openid,
    'area': area
}, 'POST');
export const repData = (openid, user_yyid) => axiosFn('/data/fsrep', {
    'openid': openid,
    'user_yyid': user_yyid
}, 'POST');
// FS报表接口
export const fsData = openid => axiosFn('/data/fsreport', {
    'openid': openid
}, 'POST');
// 报表，力蜚能，助手权限
export const rpAuthority = (user_yyid, user_token) => axiosFn('../oaaapi/report/accessible', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');
// 全国
export const rpHomeData = (user_yyid, user_token, node_yyid) => axiosFn('../oaaapi/report/nationwide', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'node_yyid': node_yyid
}, 'POST');
// 获取所有的区域
export const getArea = (user_yyid, user_token, node_yyid) => axiosFn('../oaaapi/report/getArea', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'node_yyid': node_yyid
}, 'POST');
// 地区报表
export const areaDataRp = (user_yyid, user_token, node_yyid) => axiosFn('../oaaapi/report/area', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'node_yyid': node_yyid
}, 'POST');
// 医院0销量
export const hosZero = (user_yyid, user_token, node_yyid, type) => axiosFn('../oaaapi/report/zero', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'node_yyid': node_yyid,
    'type': type
}, 'POST');
// 代表主页/report/aeraflow
export const rpAgentInfo = (user_yyid, user_token, node_yyid, u_yyid) => axiosFn('../oaaapi/report/rep', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'node_yyid': node_yyid,
    'u_yyid': u_yyid
}, 'POST');
// 流向主页/report/aeraflow
export const rpHosAreaflow = (user_yyid, user_token, node_yyid) => axiosFn('../oaaapi/report/areaflow', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'node_yyid': node_yyid,
}, 'POST');
// 奖金计算工具判断服务产品的入口
export const servicePro = (user_yyid, user_token) => axiosFn('/agent/series/list', {
    'user_yyid': user_yyid,
    'user_token': user_token
}, 'POST');
// 合规知识库列表
export const knowledgeList = (user_yyid, user_token, keywords, knowledge_dir, page, page_size) => axiosFn('/knowledge/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'keywords': keywords,
    'knowledge_dir': knowledge_dir,
    'page': page,
    'page_size': page_size
}, 'POST');
// 合规知识库详情
export const knowledgeInfo = (user_yyid, user_token, knowledge_yyid) => axiosFn('/knowledge/info', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'knowledge_yyid': knowledge_yyid,
}, 'POST');
// 知识库树状结构
export const comKnowledges = (user_yyid, user_token, dir_id) => axiosFn('/newapi/compliance/knowledges', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'dir_id': dir_id
}, 'POST');
// 搜索
export const knowledgeSearch = (user_yyid, user_token, keywords) => axiosFn('/newapi/compliance/knowledges/search', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'keywords': keywords
}, 'POST');
// 顶级目录
export const knowledgeDir = (user_yyid, user_token) => axiosFn('/newapi/compliance/knowledges/top-dirs', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
// 树结构
export const knowledDir = (user_yyid, user_token) => axiosFn('/knowledge/dir', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
// 合规知情同意书
export const complianceAgree = (user_yyid, user_token, exam_yyid) => axiosFn('/compliance/agreement', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'exam_yyid': exam_yyid,
}, 'POST');
export const complianceSign = (user_yyid, user_token, exam_yyid, sign_img = undefined) => axiosFn('/newapi/compliance/agree', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'exam_yyid': exam_yyid,
    'sign_img': sign_img,
}, 'POST');
// 开始考试
export const startTest = (user_yyid, user_token, exam_yyid) => axiosFn('/compliance/start_test', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'exam_yyid': exam_yyid,
}, 'POST');
// 考试列表
export const testList = (user_yyid, user_token, keywords) => axiosFn('/compliance/test_list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'keywords': keywords,
}, 'POST');
// 考试状态与结果
export const testInfo = (user_yyid, user_token, exam_yyid) => axiosFn('/compliance/test_info', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'exam_yyid': exam_yyid,
}, 'POST');
// 考试回顾
export const testReview = (user_yyid, user_token, exam_yyid) => axiosFn('/compliance/review', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'exam_yyid': exam_yyid,
}, 'POST');
// 提交考试
export const submintTest = (user_yyid, user_token, exam_yyid, answer) => axiosFn('/compliance/submit', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'exam_yyid': exam_yyid,
    'answer': answer,
}, 'POST');
// 医生服务组
export const docGroupList = (user_yyid, user_token, key_word) => axiosFn('/agent/dg/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'key_word': key_word
}, 'POST');
export const docDetail = (user_yyid, user_token, member_yyid, doctor_id) => axiosFn('/agent/dg/userinfo/detail', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'member_yyid': member_yyid,
    'doctor_id': doctor_id
}, 'POST');
export const wxCode = (user_yyid, user_token) => axiosFn('/agent/dg/myqrcode', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const personCode = (user_yyid, user_token) => axiosFn('/agent/qrcode', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');

export const joinList = (user_yyid, user_token) => axiosFn('/agent/dg/joinlist', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const addDgList = (user_yyid, user_token, member_yyids) => axiosFn('/agent/dg/join/approve', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'member_yyids': member_yyids
}, 'POST');
export const rejectDg = (user_yyid, user_token, member_yyids) => axiosFn('/agent/dg/join/reject', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'member_yyids': member_yyids
}, 'POST');
export const myDocGroup = (user_yyid, user_token) => axiosFn('/agent/dg/mygroup', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const docGroupMember = (user_yyid, user_token, group_yyid) => axiosFn('/agent/dg/memberlist', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid
}, 'POST');
export const delMember = (user_yyid, user_token, member_yyids, group_yyid) => axiosFn('/agent/dg/member/delete', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'member_yyids': member_yyids,
    "group_yyid": group_yyid
}, 'POST');
export const changeGroup = (user_yyid, user_token, member_yyids, group_yyid) => axiosFn('/agent/dg/member/changegroup', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'member_yyids': member_yyids,
    'group_yyid': group_yyid,
}, 'POST');
export const createGroup = (user_yyid, user_token, group_name) => axiosFn('/agent/dg/create', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_name': group_name
}, 'POST');
export const delGroup = (user_yyid, user_token, group_yyid) => axiosFn('/agent/dg/delete', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid
}, 'POST');
export const rename = (user_yyid, user_token, group_name, group_yyid) => axiosFn('/agent/dg/rename', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_name': group_name,
    'group_yyid': group_yyid
}, 'POST');
export const docList = (user_yyid, user_token) => axiosFn('/agent/dg/doctorlist', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const addDocList = (user_yyid, user_token, group_yyid, member_yyids) => axiosFn('/agent/dg/member/add', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'member_yyids': member_yyids
}, 'POST');
export const updateDocInfo = (user_yyid, user_token, member_yyid, true_name, gender, mobile_num, hospital_yyid, hospital_name, depart_id, position, job_title, group_yyid, field_id, clinic_type, clinic_rota, doctor_id) => axiosFn('/agent/dg/userinfo/update', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'member_yyid': member_yyid,
    'true_name': true_name,
    'gender': gender,
    'mobile_num': mobile_num,
    'hospital_yyid': hospital_yyid,
    'hospital_name': hospital_name,
    'depart_id': depart_id,
    'position': position,
    'job_title': job_title,
    'group_yyid': group_yyid,
    'field_id': field_id,
    'clinic_type': clinic_type,
    'clinic_rota': clinic_rota,
    'doctor_id': doctor_id
}, 'POST');
// 代表工作群组
export const agentGroupList = (user_yyid, user_token) => axiosFn('/agent/wg/group/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const agentGpSearch = (user_yyid, user_token, keyword) => axiosFn('/agent/wg/group/search', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'keyword': keyword
}, 'POST');
export const agentGpDetail = (user_yyid, user_token, group_yyid) => axiosFn('/agent/wg/group/detail', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid
}, 'POST');
export const agentGpVote = (user_yyid, user_token, group_yyid, vote_yyid, agree) => axiosFn('/agent/wg/votetax', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'vote_yyid': vote_yyid,
    'agree': agree
}, 'POST');
export const agentGpMbList = (user_yyid, user_token, group_yyid) => axiosFn('/agent/wg/member/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid
}, 'POST');
export const agentGpChangeName = (user_yyid, user_token, group_yyid, group_name) => axiosFn('/agent/wg/group/rename', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'group_name': group_name
}, 'POST');
export const agentGpCode = (user_yyid, user_token, group_yyid) => axiosFn('/agent/wg/qrcode', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
}, 'POST');
export const agentGpVoteCreate = (user_yyid, user_token, group_yyid, tax) => axiosFn('/agent/wg/vote/create', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'tax': tax
}, 'POST');
export const agentGpVoteDetail = (user_yyid, user_token, group_yyid, vote_yyid) => axiosFn('/agent/wg/vote/detail', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'vote_yyid': vote_yyid
}, 'POST');
export const agentGpProduct = (user_yyid, user_token, group_yyid) => axiosFn('/agent/wg/series', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
}, 'POST');
export const agentGpChangeProd = (user_yyid, user_token, group_yyid, series_yyid) => axiosFn('/agent/wg/serieschange', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'series_yyid': series_yyid
}, 'POST');
export const agentGpVoteClose = (user_yyid, user_token, vote_yyid) => axiosFn('/agent/wg/vote/close', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'vote_yyid': vote_yyid,
}, 'POST');
export const agentGpNotice = (user_yyid, user_token, group_yyid, content) => axiosFn('/agent/wg/group/notice', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'content': content,
}, 'POST');
export const agentGpDelete = (user_yyid, user_token, group_yyid) => axiosFn('/agent/wg/group/delete', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
}, 'POST');
export const agentGpQuit = (user_yyid, user_token, group_yyid) => axiosFn('/agent/wg/group/quit', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
}, 'POST');
export const agentGpMemberList = (user_yyid, user_token, group_yyid) => axiosFn('/agent/wg/member/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
}, 'POST');
export const agentGpChangeLeader = (user_yyid, user_token, group_yyid, member_yyid) => axiosFn('/agent/wg/choosenewleader', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'member_yyid': member_yyid
}, 'POST');
export const agentGpJoinList = (user_yyid, user_token, group_yyid) => axiosFn('/agent/wg/join/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
}, 'POST');
export const agentGpJoinAdd = (user_yyid, user_token, group_yyid, member_yyids, approve) => axiosFn('/agent/wg/join/add', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'member_yyids': member_yyids,
    'approve': approve
}, 'POST');
export const agentGpMyagents = (user_yyid, user_token, group_yyid) => axiosFn('/agent/wg/myagents', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
}, 'POST');
export const agentGpAddAgents = (user_yyid, user_token, group_yyid, add_user_yyids) => axiosFn('/agent/wg/member/add', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'add_user_yyids': add_user_yyids
}, 'POST');
export const agentGpDeleteAgents = (user_yyid, user_token, group_yyid, del_user_yyids) => axiosFn('/agent/wg/member/delete', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_yyid': group_yyid,
    'del_user_yyids': del_user_yyids
}, 'POST');
export const agentGpCreate = (user_yyid, user_token, group_name) => axiosFn('/agent/wg/group/create', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'group_name': group_name,
}, 'POST');
// 治疗领域入口
export const therapeutic = (s) => axiosFn('/therapeutic/areas', {
    's': s
}, 'POST');
export const therapeuticDetail = (child_id) => axiosFn('/therapeutic/area/detail', {
    'child_id': child_id,
}, 'POST');
// 个人中心和助手的工具页
export const inviteUsers = (user_yyid, user_token) => axiosFn('/agent/invite/users', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const inviteUsersDetail = (user_yyid, user_token, member_yyid) => axiosFn('/agent/invite/userdetail', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'member_yyid': member_yyid
}, 'POST');
export const inviteUsersUpdate = (user_yyid, user_token, member_yyid, user_type) => axiosFn('/agent/invite/userupdate', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'member_yyid': member_yyid,
    'user_type': user_type
}, 'POST');
export const msgList = (user_yyid, user_token) => axiosFn('/msg/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const msgGpDetail = (user_yyid, user_token, msg_yyid) => axiosFn('/msg/workgroup/detail', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'msg_yyid': msg_yyid
}, 'POST');
// 助手消息
export const messageList = (user_yyid, user_token, user_type) => axiosFn('/newapi/message/index', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'user_type': user_type
}, 'POST');
export const messageListDetail = (user_yyid, user_token, user_type, msg_yyid) => axiosFn('/newapi/message/show', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'user_type': user_type,
    'msg_yyid': msg_yyid
}, 'POST');
export const msgGpInvite = (user_yyid, user_token, msg_yyid, agree) => axiosFn('/msg/workgroup/invite', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'msg_yyid': msg_yyid,
    'agree': agree
}, 'POST');
export const navCode = (user_yyid, user_token) => axiosFn('/agent/qrcode', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const myPoint = (user_yyid, user_token) => axiosFn('/newapi/user/points', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const exchangePoint = (user_yyid, user_token, goods_yyid, goods_num) => axiosFn('/newapi/user/exchange/goods', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'goods_yyid': goods_yyid,
    'goods_num': goods_num
}, 'POST');
export const pointDetail = (user_yyid, user_token, type, page, page_size) => axiosFn('/newapi/user/point/details', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'type': type,
    'page': page,
    'page_size': page_size,
    'fetchService': 0,
}, 'POST');
export const servicePointDetail = (user_yyid, user_token, type, page, page_size) => axiosFn('/newapi/user/point/details', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'type': type,
    'page': page,
    'page_size': page_size,
    'fetchService': 1,
}, 'POST');
// 问卷系统
export const question = (paper_yyid) => axiosFn('/newapi/compliance/questionnaire/start', {
    'paper_yyid': paper_yyid,
}, 'POST');
export const getPerQuestion = (paper_yyid, question_yyid, pos) => axiosFn('/newapi/compliance/questionnaire/get', {
    'paper_yyid': paper_yyid,
    'question_yyid': question_yyid,
    'pos': pos
}, 'POST');
export const getPerAnswer = (paper_yyid, question_yyid, option_yyids, content, pos) => axiosFn('/newapi/compliance/questionnaire/answer', {
    'paper_yyid': paper_yyid,
    'question_yyid': question_yyid,
    'option_yyids': option_yyids,
    'content': content,
    'pos': pos
}, 'POST');
export const getQuList = (user_yyid, user_token, status) => axiosFn('/newapi/compliance/questionnaire/list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'status': status,
}, 'POST');
export const getQuInviteList = (user_yyid, user_token, paper_yyid) => axiosFn('/newapi/compliance/questionnaire/invitees-list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'paper_yyid': paper_yyid,
}, 'POST');
export const getQuDocList = (user_yyid, user_token, paper_yyid, keywords) => axiosFn('/newapi/compliance/questionnaire/doctor-list', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'paper_yyid': paper_yyid,
    'keywords': keywords
}, 'POST');
export const sendInvite = (user_yyid, user_token, paper_yyid, openid) => axiosFn('/newapi/compliance/questionnaire/invite', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'paper_yyid': paper_yyid,
    'openid': openid
}, 'POST');
export const noticeAn = (user_yyid, user_token, paper_yyid, invitee_openid) => axiosFn('/newapi/compliance/questionnaire/notice-answer', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'paper_yyid': paper_yyid,
    'invitee_openid': invitee_openid
}, 'POST');
export const reinvite = (user_yyid, user_token, paper_yyid, invitee_openid) => axiosFn('/newapi/compliance/questionnaire/reinvite', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'paper_yyid': paper_yyid,
    'invitee_openid': invitee_openid
}, 'POST');
// 拜访模块
export const visitHos = (user_yyid, user_token, keywords) => axiosFn('/newapi/hospital/serve', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'keywords': keywords
}, 'POST');
export const visitSeriesServe = (user_yyid, user_token) => axiosFn('/newapi/series/serve', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');

export const visitAims = (user_yyid, user_token) => axiosFn('/newapi/agent/visits/aims', {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const visitGetToken = (user_yyid, user_token, type, business) => axiosFn('/newapi/upload/token', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'type': type,
    'business': business
}, 'POST');
export const visitUpload = (user_yyid, user_token, bucket, key, name, url) => axiosFn('/newapi/upload', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'bucket': bucket,
    'key': key,
    'name': name,
    'url': url,
}, 'PUT');
export const visitGeo = (user_yyid, user_token, lat, lng) => axiosFn('/newapi/geo', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'lat': lat,
    'lng': lng,
}, 'POST');
export const addVisit = (
    user_yyid,
    user_token,
    date,
    hospital_id,
    office_id,
    series_ids,
    visit_type,
    visit_aim,
    main_purpose,
    result,
    next,
    comment,
    pics,
    lat,
    lng,
    position
) => axiosFn('/newapi/agent/visits', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'date': date,
    'hospital_id': hospital_id,
    'office_id': office_id,
    'series_ids': series_ids,
    'visit_type': visit_type,
    'visit_aim': visit_aim,
    'main_purpose': main_purpose,
    'result': result,
    'next': next,
    'comment': comment,
    'pics': pics,
    'lat': lat,
    'lng': lng,
    'position': position,
}, 'PUT');

export const visitList = (user_yyid, user_token, check_in_start_at, check_in_end_at, check_out_start_at, check_out_end_at, hospital_id, office_id, check_type, visit_type, current, limit) => axiosFn('/newapi/agent/visits', {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'check_in_start_at': check_in_start_at,
    'check_in_end_at': check_in_end_at,
    'check_out_start_at': check_out_start_at,
    'check_out_end_at': check_out_end_at,
    'hospital_id': hospital_id,
    'office_id': office_id,
    'check_type': check_type,
    'visit_type': visit_type,
    'current': current,
    'limit': limit,
}, 'POST');
// 签出新增时获取拜访记录详情
export const newCoDetail = (user_yyid, user_token, id) => axiosFn(`/newapi/agent/visits/new-check-out-info/${id}`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
// 签入或签出修改时获取拜访记录详情
export const visitDetail = (user_yyid, user_token, id) => axiosFn(`/newapi/agent/visits/info/${id}`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
// 签出新增时获取拜访记录详情
export const visitEditDetail = (user_yyid, user_token, id) => axiosFn(`/newapi/agent/visits/new-check-out-info/${id}`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const visitCheckinEdit = (
    user_yyid,
    user_token,
    hospital_id,
    visit_type,
    pics,
    lat,
    lng,
    position,
    geo_opt,
    geo_comment,
    id
) => axiosFn(`/newapi/agent/visits/edit-check-in/${id}`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_id': hospital_id,
    'visit_type': visit_type,
    'pics': pics,
    'lat': lat,
    'lng': lng,
    'position': position,
    'geo_opt': geo_opt,
    'geo_comment': geo_comment,
    'id': id
}, 'POST');
export const visitCheckIn = (
    user_yyid,
    user_token,
    hospital_id,
    visit_type,
    pics,
    lat,
    lng,
    position,
    geo_opt,
    geo_comment,
) => axiosFn(`/newapi/agent/visits/check-in`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_id': hospital_id,
    'visit_type': visit_type,
    'pics': pics,
    'lat': lat,
    'lng': lng,
    'position': position,
    'geo_opt': geo_opt,
    'geo_comment': geo_comment,
}, 'PUT');
export const visitCheckout = (
    user_yyid,
    user_token,
    hospital_id,
    visit_type,
    depart_ids,
    doctor_ids,
    series_ids,
    result,
    next,
    pics,
    lat,
    lng,
    position,
    geo_opt,
    geo_comment,
    id
) => axiosFn(`/newapi/agent/visits/check-out/${id}`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_id': hospital_id,
    'visit_type': visit_type,
    'depart_ids': depart_ids,
    'doctor_ids': doctor_ids,
    'series_ids': series_ids,
    'result': result,
    'next': next,
    'pics': pics,
    'lat': lat,
    'lng': lng,
    'position': position,
    'geo_opt': geo_opt,
    'geo_comment': geo_comment,
    'id': id
}, 'POST');
export const visitCheckOutEdit = (
    user_yyid,
    user_token,
    hospital_id,
    visit_type,
    depart_ids,
    doctor_ids,
    series_ids,
    result,
    next,
    pics,
    lat,
    lng,
    position,
    geo_opt,
    geo_comment,
    id
) => axiosFn(`/newapi/agent/visits/edit-check-out/${id}`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_id': hospital_id,
    'visit_type': visit_type,
    'depart_ids': depart_ids,
    'doctor_ids': doctor_ids,
    'series_ids': series_ids,
    'result': result,
    'next': next,
    'pics': pics,
    'lat': lat,
    'lng': lng,
    'position': position,
    'geo_opt': geo_opt,
    'geo_comment': geo_comment,
}, 'POST');

// 拜访添加医生
export const getDocList = (user_yyid, user_token, hospital_id, keywords) => axiosFn(`/newapi/agent/visits/doctors`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_id': hospital_id,
    'keywords': keywords
}, 'POST');
export const addDoc = (user_yyid, user_token, name, sex, mobile, position, job_title, field_id, hospital_id, depart_id, clinic_type, clinic_rota) => axiosFn(`/newapi/agent/visits/doctors/add`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'name': name,
    'sex': sex,
    'mobile': mobile,
    'position': position,
    'job_title': job_title,
    'field_id': field_id,
    'hospital_id': hospital_id,
    'depart_id': depart_id,
    'clinic_type': clinic_type,
    'clinic_rota': clinic_rota
}, 'POST');
export const vdocDetail = (user_yyid, user_token, id) => axiosFn(`/newapi/doctor/${id}/info`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
// 编辑医生
export const vdocEdit = (user_yyid, user_token, name, sex, mobile, hospital_id, depart_id, job_title, position, field_id, clinic_type, clinic_rota, id) => axiosFn(`/newapi/doctor/${id}/edit`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'name': name,
    'sex': sex,
    'mobile': mobile,
    'hospital_id': hospital_id,
    'depart_id': depart_id,
    'job_title': job_title,
    'position': position,
    'field_id': field_id,
    'clinic_type': clinic_type,
    'clinic_rota': clinic_rota
}, 'POST');
// 群组根据手机号查询医生
export const searchDoc = (user_yyid, user_token, mobile, id) => axiosFn(`/newapi/doctor/${id}/valid-merge`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'mobile': mobile
}, 'POST');
export const mergeDoc = (user_yyid, user_token, id, from_doctor_id) => axiosFn(`/newapi/doctor/${id}/merge/${from_doctor_id}`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');

export const deleteDoc = (user_yyid, user_token, id) => axiosFn(`/newapi/doctor/${id}/delete`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
// 科室的动态请求
export const depList = (user_yyid, user_token, keywords) => axiosFn(`/newapi/departs`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'keywords': keywords
}, 'POST');
export const depServe = (user_yyid, user_token, hospital_id, keywords) => axiosFn(`/newapi/departs/serve`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_id': hospital_id,
    'keywords': keywords
}, 'POST');
export const addDepServe = (user_yyid, user_token, hospital_id, depart_ids) => axiosFn(`/newapi/departs/serve`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_id': hospital_id,
    'depart_ids': depart_ids
}, 'PUT');
// geo check
export const checkGeo = (user_yyid, user_token, hospital_id, lat, lng) => axiosFn(`/newapi/agent/visits/check-geo`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'hospital_id': hospital_id,
    'lat': lat,
    'lng': lng
}, 'POST');
export const visitConfig = (user_yyid, user_token, type) => axiosFn(`/newapi/agent/visits/config`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'type': type
}, 'POST');
// 拜访报告
export const visitRp = (user_yyid, user_token) => axiosFn(`/newapi/report/visit`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const visitBiRp = (user_yyid, user_token) => axiosFn(`/newapi/report/sales`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
}, 'POST');
export const srpMail = (user_yyid, user_token, type, email) => axiosFn(`/newapi/report/sendSalesMail`, {
    'user_yyid': user_yyid,
    'user_token': user_token,
    'type': type,
    'email': email
}, 'POST');

//优云呼吸医生邀请码
export const getDrQrCode = (platform_type, agent_yyid, link_doctor_id) => axiosFn('/invite/qrcode/doctor', {
    platform_type,
    agent_yyid,
    link_doctor_id
}, 'POST')

//获取医生列表
export const getDoctorList = (platform_type, user_yyid, user_token) => axiosFn('/invite/doctor/list', {
    platform_type,
    user_yyid,
    user_token
}, 'POST')

//获取药店列表
export const getDrugStoreList = (platform_type, user_yyid, user_token) => axiosFn('/invite/drugstore/list', {
    platform_type,
    user_yyid,
    user_token
}, 'POST')

//获取药店药品列表
export const getProductList = (platform_type, user_yyid, user_token) => axiosFn('/invite/product/list', {
    platform_type,
    user_yyid,
    user_token
}, 'POST')

//获取优云分享jsapi配置
export const getYyConfig = (type, url, apis) => axiosFn('/invite/wechat/signpage/get', {
    type,
    url,
    apis
}, 'POST')