import App from '../App'
// 主页面
const Home = r => require.ensure([], () => r(require('../pages/Home')), 'Home');
const Product = r => require.ensure([], () => r(require('../pages/Product')), 'Product');
const Login = r => require.ensure([], () => r(require('../pages/Login')), 'Login');
const PersonalCenter = r => require.ensure([], () => r(require('../pages/PersonalCenter')), 'PersonalCenter');
const Helper = r => require.ensure([], () => r(require('../pages/Helper')), 'Helper');
const TerritoryArt = r => require.ensure([], () => r(require('../pages/TerritoryArt')), 'TerritoryArt');
const TerritoryArtDoc = r => require.ensure([], () => r(require('../pages/TerritoryArtDoc')), 'TerritoryArtDoc');
// 关于优药
const AboutPlatform = r => require.ensure([], () => r(require('../pages/AboutPlatform')), 'AboutPlatform');
// 我要服务
const ApplyHos = r => require.ensure([], () => r(require('../pages/agency/ApplyHos')), 'ApplyHos');
const hospitalDetail = r => require.ensure([], () => r(require('../pages/agency/HospitalDetail')), 'HospitalDetail');
// 认证流程
const UserInfo = r => require.ensure([], () => r(require('../pages/certification/UserInfo')), 'UserInfo');
const CertificateInfo = r => require.ensure([], () => r(require('../pages/certification/CertificateInfo')), 'CertificateInfo');
const SelectHos = r => require.ensure([], () => r(require('../pages/certification/SelectHos')), 'SelectHos');
const UserInfoShow = r => require.ensure([], () => r(require('../pages/certification/UserInfoShow')), 'UserInfoShow');
const CompanyList = r => require.ensure([], () => r(require('../pages/certification/CompanyList')), 'CompanyList');
const Company = r => require.ensure([], () => r(require('../pages/certification/Company')), 'Company');
const TotalCompany = r => require.ensure([], () => r(require('../pages/certification/TotalCompany')), 'TotalCompany');
const Indications = r => require.ensure([], () => r(require('../pages/certification/Indications')), 'Indications');
const Territory = r => require.ensure([], () => r(require('../pages/certification/Territory')), 'Territory');
const DepList = r => require.ensure([], () => r(require('../pages/certification/DepList')), 'DepList');
const ServiceCity = r => require.ensure([], () => r(require('../pages/certification/ServiceCity')), 'ServiceCity');
// 我服务的医院
const UserServiceHos = r => require.ensure([], () => r(require('../pages/userServiceHos/UserServiceHos')), 'UserServiceHos');
const ServiceHosDetail = r => require.ensure([], () => r(require('../pages/userServiceHos/ServiceHosDetail')), 'ServiceHosDetail');
const UpdateHosInfo = r => require.ensure([], () => r(require('../pages/userServiceHos/UpdateHosInfo')), 'UpdateHosInfo');
// 积分
const MyIntegral = r => require.ensure([], () => r(require('../pages/integral/MyIntegral')), 'MyIntegral');
const HistoryIntegral = r => require.ensure([], () => r(require('../pages/integral/HistoryIntegral')), 'HistoryIntegral');
// 服务月报
const ServiceReport = r => require.ensure([], () => r(require('../pages/serviceReport/ServiceReport')), 'ServiceReport');
const ServiceReportDetail = r => require.ensure([], () => r(require('../pages/serviceReport/ServiceReportDetail')), 'ServiceReportDetail');
// 流向提醒
const FlowWarn = r => require.ensure([], () => r(require('../pages/flowWarn/FlowWarn')), 'FlowWarn');
const FlowWarnDetail = r => require.ensure([], () => r(require('../pages/flowWarn/FlowWarnDetail')), 'FlowWarnDetail');
const HistoryFlow = r => require.ensure([], () => r(require('../pages/flowWarn/HistoryFlow')), 'HistoryFlow');
const ServiceHosRecord = r => require.ensure([], () => r(require('../pages/flowWarn/ServiceHosRecord')), 'ServiceHosRecord');
// 产品
const ProductIntro = r => require.ensure([], () => r(require('../pages/products/ProductIntro')), 'ProductIntro');
// 护固莱士产品宝典
const ProductInfo = r => require.ensure([], () => r(require('../pages/productWiki/ProductInfo')), 'ProductInfo');
const ProductOverview = r => require.ensure([], () => r(require('../pages/productWiki/ProductOverview')), 'ProductOverview');
const ClinicalAnalysis = r => require.ensure([], () => r(require('../pages/productWiki/ClinicalAnalysis')), 'ClinicalAnalysis');
const Literature = r => require.ensure([], () => r(require('../pages/productWiki/Literature')), 'Literature');
const VideoList = r => require.ensure([], () => r(require('../pages/productWiki/VideoList')), 'VideoList');
const VideoDetail = r => require.ensure([], () => r(require('../pages/productWiki/VideoDetail')), 'VideoDetail');
const ClinicalDetail = r => require.ensure([], () => r(require('../pages/productWiki/ClinicalDetail')), 'ClinicalDetail');
const LiteratureDetail = r => require.ensure([], () => r(require('../pages/productWiki/LiteratureDetail')), 'LiteratureDetail');
// 力蜚能产品宝典
const NiferexInfo = r => require.ensure([], () => r(require('../pages/niferex/NiferexInfo')), 'NiferexInfo');
const NiferexAppList = r => require.ensure([], () => r(require('../pages/niferex/NiferexAppList')), 'NiferexAppList');
const NiferexOverview = r => require.ensure([], () => r(require('../pages/niferex/NiferexOverview')), 'NiferexOverview');
// 爱尔真产品宝典AerogenUltra
const AerogenInfo = r => require.ensure([], () => r(require('../pages/aerogen/AerogenInfo')), 'AerogenInfo');
const AerogenSolo = r => require.ensure([], () => r(require('../pages/aerogen/AerogenSolo')), 'AerogenSolo');
const AerogenUltra = r => require.ensure([], () => r(require('../pages/aerogen/AerogenUltra')), 'AerogenUltra');
const AerogenController = r => require.ensure([], () => r(require('../pages/aerogen/AerogenController')), 'AerogenController');
const AerogenQa = r => require.ensure([], () => r(require('../pages/aerogen/AerogenQa')), 'AerogenQa');
const AerogenQaDetail = r => require.ensure([], () => r(require('../pages/aerogen/AerogenQaDetail')), 'AerogenQaDetail');
const AerogenAnalysis = r => require.ensure([], () => r(require('../pages/aerogen/AerogenAnalysis')), 'AerogenAnalysis');
// 我的收藏
const MyFavorites = r => require.ensure([], () => r(require('../pages/favorites/MyFavorites')), 'MyFavorites');
const FavoriteList = r => require.ensure([], () => r(require('../pages/favorites/FavoriteList')), 'FavoriteList');
const CreateNewFav = r => require.ensure([], () => r(require('../pages/favorites/CreateNewFav')), 'CreateNewFav');
const SelectFav = r => require.ensure([], () => r(require('../pages/favorites/SelectFav')), 'SelectFav');
const EditFav = r => require.ensure([], () => r(require('../pages/favorites/EditFav')), 'EditFav');
// 直播和公开课
const LiveIndex = r => require.ensure([], () => r(require('../pages/live/LiveIndex')), 'LiveIndex');
const PubClass = r => require.ensure([], () => r(require('../pages/live/PubClass')), 'PubClass');
const LiveList = r => require.ensure([], () => r(require('../pages/live/LiveList')), 'LiveList');
const LiveDetail = r => require.ensure([], () => r(require('../pages/live/LiveDetail')), 'LiveDetail');
// 管理报表
const FsReport = r => require.ensure([], () => r(require('../pages/FsReport')), 'FsReport');
const rpLimitAuthor = r => require.ensure([], () => r(require('../pages/rpLimitAuthor')), 'rpLimitAuthor');
// 奖金计算工具NiferexHosAddBonus
const FsBonus = r => require.ensure([], () => r(require('../pages/calculateTool/FsBonus')), 'FsBonus');
const NiferexBonus = r => require.ensure([], () => r(require('../pages/calculateTool/NiferexBonus')), 'NiferexBonus');
const NifereQuBonus = r => require.ensure([], () => r(require('../pages/calculateTool/NifereQuBonus')), 'NifereQuBonus');
const NifereHosAddBonus = r => require.ensure([], () => r(require('../pages/calculateTool/NifereHosAddBonus')), 'NifereHosAddBonus');
const TreandaBonus = r => require.ensure([], () => r(require('../pages/calculateTool/TreandaBonus')), 'TreandaBonus');
const CalEmpty = r => require.ensure([], () => r(require('../pages/calculateTool/CalEmpty')), 'CalEmpty');
// 团队表现FS
const FsReportHome = r => require.ensure([], () => r(require('../pages/fsReport/FsReport')), 'FsReportHome');
const FsAreaReport = r => require.ensure([], () => r(require('../pages/fsReport/FsAreaReport')), 'FsAreaReport');
const FsAgentReport = r => require.ensure([], () => r(require('../pages/fsReport/FsAgentReport')), 'FsAgentReport');
const FsRpAgentList = r => require.ensure([], () => r(require('../pages/fsReport/FsRpAgentList')), 'FsRpAgentList');
const FsRpFlowHosList = r => require.ensure([], () => r(require('../pages/fsReport/FsRpFlowHosList')), 'FsRpFlowHosList');
const FsRpHosList = r => require.ensure([], () => r(require('../pages/fsReport/FsRpHosList')), 'FsRpHosList');
// 团队表现，目前主要Niferex
const ReportHome = r => require.ensure([], () => r(require('../pages/reports/Report')), 'ReportHome');
const AreaReport = r => require.ensure([], () => r(require('../pages/reports/AreaReport')), 'AreaReport');
const AgentReport = r => require.ensure([], () => r(require('../pages/reports/AgentReport')), 'AgentReport');
const RpAgentList = r => require.ensure([], () => r(require('../pages/reports/RpAgentList')), 'RpAgentList');
const RpFlowHosList = r => require.ensure([], () => r(require('../pages/reports/RpFlowHosList')), 'RpFlowHosList');
const RpHosList = r => require.ensure([], () => r(require('../pages/reports/RpHosList')), 'RpHosList');
// 合规系统
const Compliance = r => require.ensure([], () => r(require('../pages/compliance/Compliance')), 'Compliance');
const SignCompliance = r => require.ensure([], () => r(require('../pages/compliance/SignCompliance')), 'SignCompliance');
const Knowledge = r => require.ensure([], () => r(require('../pages/compliance/Knowledge')), 'Knowledge');
const SearchCompliance = r => require.ensure([], () => r(require('../pages/compliance/SearchCompliance')), 'SearchCompliance');
const Exam = r => require.ensure([], () => r(require('../pages/compliance/Exam')), 'Exam');
const ExamStatus = r => require.ensure([], () => r(require('../pages/compliance/ExamStatus')), 'ExamStatus');
const ExamResult = r => require.ensure([], () => r(require('../pages/compliance/ExamResult')), 'ExamResult');
const ExamContent = r => require.ensure([], () => r(require('../pages/compliance/ExamContent')), 'ExamContent');
const KnowledgeDetail = r => require.ensure([], () => r(require('../pages/compliance/KnowledgeDetail')), 'KnowledgeDetail');
const KnowledgeDoc = r => require.ensure([], () => r(require('../pages/compliance/KnowledgeDoc')), 'KnowledgeDoc');
// 问卷调查
const SurveyCover = r => require.ensure([], () => r(require('../pages/survey/SurveyCover')), 'SurveyCover');
const SurveySingle = r => require.ensure([], () => r(require('../pages/survey/SurveySingle')), 'SurveySingle');
const SurveyList = r => require.ensure([], () => r(require('../pages/survey/SurveyList')), 'SurveyList');
const SurveyDetail = r => require.ensure([], () => r(require('../pages/survey/SurveyDetail')), 'SurveyDetail');
const SurveyInvite = r => require.ensure([], () => r(require('../pages/survey/SurveyInvite')), 'SurveyInvite');
// const SurveyMore = r => require.ensure([], () => r(require('../pages/survey/SurveyMore')), 'SurveyMore');
// 医生群组
const MyDocGroup = r => require.ensure([], () => r(require('../pages/group/doctor/MyDocGroup')), 'MyDocGroup');
const StaffDetail = r => require.ensure([], () => r(require('../pages/group/doctor/StaffDetail')), 'StaffDetail');
const WxCode = r => require.ensure([], () => r(require('../pages/group/WxCode')), 'WxCode');
const AddList = r => require.ensure([], () => r(require('../pages/group/doctor/AddList')), 'AddList');
const MgGroup = r => require.ensure([], () => r(require('../pages/group/doctor/MgGroup')), 'MgGroup');
const GroupDetail = r => require.ensure([], () => r(require('../pages/group/doctor/GroupDetail')), 'GroupDetail');
const MoveMember = r => require.ensure([], () => r(require('../pages/group/doctor/MoveMember')), 'MoveMember');
const AddDoc = r => require.ensure([], () => r(require('../pages/group/doctor/AddDoc')), 'AddDoc');
const ChangeInfo = r => require.ensure([], () => r(require('../pages/group/doctor/ChangeInfo')), 'ChangeInfo');
const DocHosList = r => require.ensure([], () => r(require('../pages/group/doctor/DocHosList')), 'DocHosList');
const DocDepList = r => require.ensure([], () => r(require('../pages/group/doctor/DocDepList')), 'DocDepList');
const DocTerritory = r => require.ensure([], () => r(require('../pages/group/doctor/DocTerritory')), 'DocTerritory');
// 代表群组路由AgentGpInfo
const AgentGroup = r => require.ensure([], () => r(require('../pages/group/agents/AgentGroup')), 'AgentGroup');
const AgentGpDetail = r => require.ensure([], () => r(require('../pages/group/agents/AgentGpDetail')), 'AgentGpDetail');
const AgentGpInfo = r => require.ensure([], () => r(require('../pages/group/agents/AgentGpInfo')), 'AgentGpInfo');
const AgentGpMember = r => require.ensure([], () => r(require('../pages/group/agents/AgentLeader')), 'AgentLeader');
const AgentGpList = r => require.ensure([], () => r(require('../pages/group/agents/AgentGpList')), 'AgentGpList');
const TotalAgent = r => require.ensure([], () => r(require('../pages/group/agents/TotalAgent')), 'TotalAgent');
const AgentGpDel = r => require.ensure([], () => r(require('../pages/group/agents/AgentGpDel')), 'AgentGpDel');
// 治疗领域
const TerritoryDetail = r => require.ensure([], () => r(require('../pages/TerritoryArtDetail')), 'TerritoryArtDetail');
// 群组工具入口
const News = r => require.ensure([], () => r(require('../pages/toolsEntery/News')), 'News');
const MyInvitation = r => require.ensure([], () => r(require('../pages/toolsEntery/MyInvitation')), 'MyInvitation');
const InvitationDetail = r => require.ensure([], () => r(require('../pages/toolsEntery/InvitationDetail')), 'InvitationDetail');
const CostIntegral = r => require.ensure([], () => r(require('../pages/toolsEntery/CostIntegral')), 'CostIntegral');
const CostDetail = r => require.ensure([], () => r(require('../pages/toolsEntery/CostDetail')), 'CostDetail');
const ServicePoint = r => require.ensure([], () => r(require('../pages/toolsEntery/ServicePoint')), 'ServicePoint');
// 拜访记录
const VisitIndex = r => require.ensure([], () => r(require('../pages/visit/VisitIndex')), 'VisitIndex');
const VisitSignIn = r => require.ensure([], () => r(require('../pages/visit/VisitSignIn')), 'VisitSignIn');
const VisitSiEdit = r => require.ensure([], () => r(require('../pages/visit/VisitSiEdit')), 'VisitSiEdit');
const VisitSoList = r => require.ensure([], () => r(require('../pages/visit/VisitSoList')), 'VisitSoList');
const Visit = r => require.ensure([], () => r(require('../pages/visit/Visit')), 'Visit');
const VisitEdit = r => require.ensure([], () => r(require('../pages/visit/VisitEdit')), 'VisitEdit');
const VisitDetail = r => require.ensure([], () => r(require('../pages/visit/VisitDetail')), 'VisitDetail');
const VisitDep = r => require.ensure([], () => r(require('../pages/visit/VisitDep')), 'VisitDep');
const VisitDepAdd = r => require.ensure([], () => r(require('../pages/visit/VisitDepAdd')), 'VisitDepAdd');
const VisitHos = r => require.ensure([], () => r(require('../pages/visit/VisitHos')), 'VisitHos');
const VisitRp = r => require.ensure([], () => r(require('../pages/visit/VisitRp')), 'VisitRp');
const VisitSaleRp = r => require.ensure([], () => r(require('../pages/visit/VisitSaleRp')), 'VisitSaleRp');
const VisitDoc = r => require.ensure([], () => r(require('../pages/visit/VisitDoc')), 'VisitDoc');
const VisitDocAdd = r => require.ensure([], () => r(require('../pages/visit/VisitDocAdd')), 'VisitDocAdd');
const VisitDocDep = r => require.ensure([], () => r(require('../pages/visit/VisitDocDep')), 'VisitDocDep');
// 医生积分系统
// const DocCenter = r => require.ensure([], () => r(require('../pages/doctor/DocCenter')), 'DocCenter');
//优云邀请
const InviteQrCode = r => require.ensure([], () => r(require('../pages/inviteQrCode/InviteQrCode')), 'InviteQrCode');
const Qrcode = r => require.ensure([], () => r(require('../pages/inviteQrCode/Qrcode')), 'Qrcode');
export default [{
    path: '/',
    component: App,
    children: [
      {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: '产品列表',
                requiresLogin: false
            }
        },
        {
            path: '/product',
            name: 'product',
            component: Product,
            meta: {
                title: '产品首页',
                requiresLogin: false
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                title: '登录',
            }
        },
        {
            path: '/personalCenter',
            name: 'personal_center',
            component: PersonalCenter,
            meta: {
                title: '个人中心',
                requiresLogin: false
            }
        },
        {
            path: '/aboutPlatform',
            name: 'about_platform',
            component: AboutPlatform,
            meta: {
                title: '关于优药',
                requiresLogin: false
            }
        },
        {
            path: '/fsReport',
            name: 'fs_Report',
            component: FsReport,
            meta: {
                title: '2019年月-护固莱士流向报告',
                requiresLogin: false
            }
        },
        {
            path: '/rpLimitAuthor',
            name: 'rp_limit_author',
            component: rpLimitAuthor,
            meta: {
                title: '流向报告',
                requiresLogin: false
            }
        },
        {
            path: '/helper',
            name: 'helper',
            component: Helper,
            meta: {
                title: '助手',
                requiresLogin: false
            }
        },
        {
            path: '/applyHos',
            name: 'apply_hos',
            component: ApplyHos,
            meta: {
                title: '我要服务',
                requiresLogin: true
            }
        },
        {
            path: '/hospitalDetail',
            name: 'hospital_detail',
            component: hospitalDetail,
            meta: {
                title: '我要服务',
                requiresLogin: true
            }
        },
        {
            path: '/userInfo',
            name: 'user_info',
            component: UserInfo,
            meta: {
                title: '个人资料',
                requiresLogin: true
            }
        },
        {
            path: '/territoryArt',
            name: 'territory_art',
            component: TerritoryArt,
            meta: {
                title: '治疗领域',
                requiresLogin: false
            }
        },
        {
            path: '/territoryDetail',
            name: 'territoryDetail',
            component: TerritoryDetail,
            meta: {
                title: '治疗领域',
                requiresLogin: false
            }
        },
        {
            path: '/territoryArtDoc',
            name: 'territory_art_doc',
            component: TerritoryArtDoc,
            meta: {
                title: '治疗领域',
                requiresLogin: false
            }
        },
        // 认证
        {
            path: '/certificateInfo',
            name: 'certificate_info',
            component: CertificateInfo,
            meta: {
                title: '身份认证',
                requiresLogin: true
            }
        },
        {
            path: '/company',
            name: 'company',
            component: Company,
            meta: {
                title: '近期服务的公司',
                requiresLogin: true
            }
        },
        {
            path: '/serviceCity',
            name: 'service_city',
            component: ServiceCity,
            meta: {
                title: '可服务的城市',
                requiresLogin: true
            }
        },

        {
            path: '/indications',
            name: 'indications',
            component: Indications,
            meta: {
                title: '适应症',
                requiresLogin: true
            }
        },
        {
            path: '/territory',
            name: 'territory',
            component: Territory,
            meta: {
                title: '治疗领域',
                requiresLogin: true
            }
        },
        {
            path: '/depList',
            name: 'depList',
            component: DepList,
            meta: {
                title: '科室列表',
                requiresLogin: true
            }
        },
        {
            path: '/companyList',
            name: 'company_list',
            component: CompanyList,
            meta: {
                title: '选择公司',
                requiresLogin: true
            }
        },
        {
            path:'/totalCompany',
            name:'total_company',
            component:TotalCompany,
            meta:{
                title:'选择公司',
                requiresLogin:true
            }
        },
        {
            path: '/userInfoShow',
            name: 'user_info_show',
            component: UserInfoShow,
            meta: {
                title: '身份认证',
                requiresLogin: true
            }
        },
        {
            path: '/selectHos',
            name: 'select_hos',
            component: SelectHos,
            meta: {
                title: '选择服务医院',
                requiresLogin: true
            }
        },
        {
            path: '/userServiceHos',
            name: 'user_service_hos',
            component: UserServiceHos,
            meta: {
                title: '我服务的医院',
                requiresLogin: true
            }
        },
        {
            path: '/serviceHosDetail',
            name: 'service_hos_detail',
            component: ServiceHosDetail,
            meta: {
                title: '我服务的医院',
                requiresLogin: true
            }
        },
        {
          path:'/updateHosInfo',
          name:'update_hos_info',
          component: UpdateHosInfo,
          meta:{
            title:'医院信息',
            requiresLogin:true
          }
        },
        {
            path: '/integral',
            name: 'integral',
            component: MyIntegral,
            meta: {
                title: '我的积分',
                requiresLogin: true
            }
        },
        {
            path: '/historyIntegral',
            name: 'history_integral',
            component: HistoryIntegral,
            meta: {
                title: '历史积分',
                requiresLogin: true
            }
        },
        {
            path: '/serviceReport',
            name: 'service_report',
            component: ServiceReport,
            meta: {
                title: '服务月报',
                requiresLogin: true
            }
        },
        {
            path: '/serviceReportDetail',
            name: 'service_report_detail',
            component: ServiceReportDetail,
            meta: {
                title: '服务月报',
                requiresLogin: true
            }
        },
        {
            path: '/flowWarn',
            name: 'flow_warn',
            component: FlowWarn,
            meta: {
                title: '最新流向提醒',
                requiresLogin: true
            }
        },
        {
            path: '/flowWarnDetail',
            name: 'flow_warn_detail',
            component: FlowWarnDetail,
            meta: {
                title: '最新流向提醒',
                requiresLogin: true
            }
        },
        {
            path: '/historyFlow',
            name: 'history_flow',
            component: HistoryFlow,
            meta: {
                title: '历史流向记录',
                requiresLogin: true
            }
        },
        {
            path: '/serviceHosRecord',
            name: 'service_hos_record',
            component: ServiceHosRecord,
            meta: {
                title: '服务记录',
                requiresLogin: true
            }
        },
        {
            path: '/productIntro',
            name: 'product_intro',
            component: ProductIntro,
            meta: {
                title: '产品说明书',
                requiresLogin: false
            }
        },
        {
            path: '/productInfo',
            name: 'product_info',
            component: ProductInfo,
            meta: {
                title: '护固莱士',
                requiresLogin: false
            }
        },
        {
            path: '/productOverview',
            name: 'product_overview',
            component: ProductOverview,
            meta: {
                title: '产品概述',
                requiresLogin: false
            }
        },
        {
            path: '/clinicalAnalysis',
            name: 'clinical_analysis',
            component: ClinicalAnalysis,
            meta: {
                title: '临床解读',
                requiresLogin: false
            }
        },
        {
            path: '/clinicalDetail',
            name: 'clinical_detail',
            component: ClinicalDetail,
            meta: {
                title: '临床解读',
                requiresLogin: false
            }
        },
        {
            path: '/literature',
            name: 'literature',
            component: Literature,
            meta: {
                title: '文献',
                requiresLogin: false
            }
        },
        {
            path: '/literatureDetail',
            name: 'literature_detail',
            component: LiteratureDetail,
            meta: {
                title: '文献',
                requiresLogin: false
            }
        },
        {
            path: '/videoList',
            name: 'video_list',
            component: VideoList,
            meta: {
                title: '视频',
                requiresLogin: false
            }
        },
        {
            path: '/videoDetail',
            name: 'video_detail',
            component: VideoDetail,
            meta: {
                title: '视频内容',
                requiresLogin: false
            }
        },
        // 力蜚能产品宝典NiferexAppList
        {
            path: '/niferexInfo',
            name: 'niferex_info',
            component: NiferexInfo,
            meta: {
                title: '力蜚能',
                requiresLogin: false
            }
        },
        {
            path: '/niferexAppList',
            name: 'niferex_app_list',
            component: NiferexAppList,
            meta: {
                title: '力蜚能',
                requiresLogin: false
            }
        },
        {
            path: '/niferexOverview',
            name: 'niferex_overview',
            component: NiferexOverview,
            meta: {
                title: '',
                requiresLogin: false
            }
        },

        {
            path: '/myFavorites',
            name: 'my_favorites',
            component: MyFavorites,
            meta: {
                title: '我的收藏',
                requiresLogin: true
            }
        },
        {
            path: '/favoriteList',
            name: 'favorite_list',
            component: FavoriteList,
            meta: {
                title: '收藏内容列表',
                requiresLogin: false
            }
        },
        {
            path: '/createNewFav',
            name: 'create_new_fav',
            component: CreateNewFav,
            meta: {
                title: '新建收藏夹',
                requiresLogin: true
            }
        },
        {
            path: '/selectFav',
            name: 'select_fav',
            component: SelectFav,
            meta: {
                title: '选择收藏夹',
                requiresLogin: true
            }
        },
        {
            path: '/editFav',
            name: 'edit_fav',
            component: EditFav,
            meta: {
                title: '编辑收藏夹',
                requiresLogin: true
            }
        },
        {
            path: '/live',
            name: 'live',
            component: LiveIndex,
            meta: {
                title: '优药直播',
                requiresLogin: false
            }
        },
        {
            path: '/pubClass',
            name: 'pub_class',
            component: PubClass,
            meta: {
                title: '优药公开课',
                requiresLogin: false
            }
        },
        {
            path: '/liveList',
            name: 'live_list',
            component: LiveList,
            meta: {
                title: '回放列表',
                requiresLogin: false
            }
        },
        {
            path: '/liveDetail',
            name: 'live_detail',
            component: LiveDetail,
            meta: {
                title: '回放详情',
                requiresLogin: false
            }
        },
        {
            path: '/fsBonus',
            name: 'fs_bonus',
            component: FsBonus,
            meta: {
                title: 'FS奖金计算',
                requiresLogin: true
            }
        },
        // NiferexQuBonus
        {
            path: '/niferexBonus',
            name: 'niferex_bonus',
            component: NiferexBonus,
            children:[
                {
                    path: '/',
                    name: 'nifere_qu_bonus',
                    component: NifereQuBonus,
                    meta: {
                        title: '达成增长奖',
                        requiresLogin: true
                    }
                },
                {
                    path: '/nifereHosAddBonus',
                    name: 'nifere_hos_add_bonus',
                    component: NifereHosAddBonus,
                    meta: {
                        title: '策略医院增长奖',
                        requiresLogin: true
                    }
                },
            ],
            meta: {
                title: '力蜚能奖金计算',
                requiresLogin: true
            }
        },
        {
            path: '/treandaBonus',
            name: 'treanda_bonus',
            component: TreandaBonus,
            meta: {
                title: '存达奖金计算',
                requiresLogin: true
            }
        },
        {
            path: '/calEmpty',
            name: 'cal_empty',
            component: CalEmpty,
            meta: {
                title: '奖金计算',
                requiresLogin: true
            }
        },
        // 爱尔真产品宝典AerogenAnalysis
        {
            path: '/aerogenInfo',
            name: 'aerogen_info',
            component: AerogenInfo,
            meta: {
                title: 'Aerogen',
                requiresLogin: false
            }
        },
        {
            path: '/aerogenSolo',
            name: 'aerogen_solo',
            component: AerogenSolo,
            meta: {
                title: 'Aerogen Solo产品解读',
                requiresLogin: false
            }
        },
        {
            path: '/aerogenUltra',
            name: 'aerogen_ultra',
            component: AerogenUltra,
            meta: {
                title: 'Aerogen Ultra产品解读',
                requiresLogin: false
            }
        },
        {
            path: '/aerogenController',
            name: 'aerogen_controller',
            component: AerogenController,
            meta: {
                title: 'Aerogen控制器产品解读',
                requiresLogin: false
            }
        },
        {
            path: '/aerogenQa',
            name: 'aerogen_qa',
            component: AerogenQa,
            meta: {
                title: 'Q&A',
                requiresLogin: false
            }
        },
        {
            path: '/aerogenQaDetail',
            name: 'aerogen_qa_detail',
            component: AerogenQaDetail,
            meta: {
                title: 'Q&A',
                requiresLogin: false
            }
        },
        {
            path: '/aerogenAnalysis',
            name: 'aerogen_analysis',
            component: AerogenAnalysis,
            meta: {
                title: 'Aerogen 竞品分析',
                requiresLogin: false
            }
        },
        // FS使用报告
        {
            path: '/fsReportHome',
            name: 'fs_report_home',
            component: FsReportHome,
            meta: {
                title: '团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/fsAreaReport',
            name: 'fs_area_report',
            component: FsAreaReport,
            meta: {
                title: '团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/fsAgentReport',
            name: 'fs_agent_report',
            component: FsAgentReport,
            meta: {
                title: '团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/fsRpAgentList',
            name: 'fsRp_agent_list',
            component: FsRpAgentList,
            meta: {
                title: '团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/fsRpFlowHosList',
            name: 'fsRp_flow_hos_list',
            component: FsRpFlowHosList,
            meta: {
                title: '团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/fsRpHosList',
            name: 'fsRp_hos_list',
            component: FsRpHosList,
            meta: {
                title: '团队表现',
                requiresLogin: true
            }
        },
        // 使用报告(力蜚能)
        {
            path: '/reportHome',
            name: 'report_home',
            component: ReportHome,
            meta: {
                title: '力蜚能团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/areaReport',
            name: 'area_report',
            component: AreaReport,
            meta: {
                title: '力蜚能团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/agentReport',
            name: 'agent_report',
            component: AgentReport,
            meta: {
                title: '力蜚能团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/rpAgentList',
            name: 'rp_agent_list',
            component: RpAgentList,
            meta: {
                title: '力蜚能团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/rpFlowHosList',
            name: 'rp_flow_hos_list',
            component: RpFlowHosList,
            meta: {
                title: '力蜚能团队表现',
                requiresLogin: true
            }
        },
        {
            path: '/rpHosList',
            name: 'rp_hos_list',
            component: RpHosList,
            meta: {
                title: '力蜚能团队表现',
                requiresLogin: true
            }
        },
        // 合规系统
        {
            path: '/compliance',
            name: 'compliance',
            component: Compliance,
            meta: {
                title: '合规中心',
                requiresLogin: true
            }
        },
        {
            path: '/signCompliance',
            name: 'sign_compliance',
            component: SignCompliance,
            meta: {
                title: '考试结果',
                requiresLogin: true
            }
        },
        // SearchCompliance
        {
            path: '/knowledge',
            name: 'knowledge',
            component: Knowledge,
            meta: {
                title: '知识库',
                requiresLogin: true
            }
        },
        {
            path: '/searchCompliance',
            name: 'search_compliance',
            component: SearchCompliance,
            meta: {
                title: '知识库',
                requiresLogin: true
            }
        },
        {
            path: '/knowledgeDetail',
            name: 'knowledge_detail',
            component: KnowledgeDetail,
            meta: {
                title: '知识详情',
                requiresLogin: true
            }
        },
        {
            path: '/knowledgeDoc',
            name: 'knowledge_doc',
            component: KnowledgeDoc,
            meta: {
                title: '知识详情',
                requiresLogin: true
            }
        },
        {
            path: '/exam',
            name: 'exam',
            component: Exam,
            meta: {
                title: '考试',
                requiresLogin: true
            }
        },
        {
            path: '/examStatus',
            name: 'exam_status',
            component: ExamStatus,
            meta: {
                title: '考试',
                requiresLogin: true
            }
        },
        {
            path: '/examResult',
            name: 'exam_result',
            component: ExamResult,
            meta: {
                title: '考试结果',
                requiresLogin: true
            }
        },
        {
            path: '/examContent',
            name: 'exam_content',
            component: ExamContent,
            meta: {
                title: '考试内容',
                requiresLogin: true
            }
        },
        // 问卷
        {
            path: '/surveySingle',
            name: 'survey_single',
            component: SurveySingle,
            meta: {
                title: '问卷',
                requiresLogin: true
            }
        },
        {
            path: '/surveyCover',
            name: 'survey_cover',
            component: SurveyCover,
            meta: {
                title: '问卷',
                requiresLogin: true
            }
        },
        {
            path: '/surveyList',
            name: 'survey_list',
            component: SurveyList,
            meta: {
                title: '问卷',
                requiresLogin: true
            }
        },
        {
            path: '/surveyDetail',
            name: 'survey_detail',
            component: SurveyDetail,
            meta: {
                title: '问卷',
                requiresLogin: true
            }
        },
        {
            path: '/surveyInvite',
            name: 'survey_invite',
            component: SurveyInvite,
            meta: {
                title: '问卷',
                requiresLogin: true
            }
        },
        // 医生群组SurveyInvite
        {
            path: '/myDocGroup',
            name: 'my_doc_group',
            component: MyDocGroup,
            meta: {
                title: '群组',
                requiresLogin: true
            }
        },
        {
            path: '/staffDetail',
            name: 'staff_detail',
            component: StaffDetail,
            meta: {
                title: '个人资料',
                requiresLogin: true
            }
        },
        {
            path: '/wxCode',
            name: 'wx_code',
            component: WxCode,
            meta: {
                title: '二维码',
                requiresLogin: true
            }
        },
        {
            path: '/yyInvite',
            name: 'yyInvite',
            component: InviteQrCode,
            meta: {
                title: '优云邀请',
                requiresLogin: true
            }
        },
        {
            path: '/addList',
            name: 'add_list',
            component: AddList,
            meta: {
                title: '待加入群组',
                requiresLogin: true
            }
        },
        {
            path: '/mgGroup',
            name: 'mg_group',
            component: MgGroup,
            meta: {
                title: '管理群组',
                requiresLogin: true
            }
        },
        {
            path: '/groupDetail',
            name: 'group_detail',
            component: GroupDetail,
            meta: {
                title: '群组管理',
                requiresLogin: true
            }
        },
        {
            path: '/moveMember',
            name: 'move_member',
            component: MoveMember,
            meta: {
                title: '我的分组',
                requiresLogin: true
            }
        },
        {
            path: '/addDoc',
            name: 'add_doctor',
            component: AddDoc,
            meta: {
                title: '医生列表',
                requiresLogin: true
            }
        },
        {
            path: '/changeInfo',
            name: 'change_info',
            component: ChangeInfo,
            meta: {
                title: '修改医生信息',
                requiresLogin: true
            }
        },
        {
            path: '/docHosList',
            name: 'docHosList',
            component: DocHosList,
            meta: {
                title: '选择医院',
                requiresLogin: true
            }
        },
        {
            path: '/docDepList',
            name: 'docDepList',
            component: DocDepList,
            meta: {
                title: '选择科室',
                requiresLogin: true
            }
        },
        // 代表群组
        {
            path: '/agentGroup',
            name: 'agentGroup',
            component: AgentGroup,
            meta: {
                title: '我的群组',
                requiresLogin: true
            }
        },
        {
            path: '/agentGpDetail',
            name: 'agentGpDetail',
            component: AgentGpDetail,
            meta: {
                title: '我的群组详情',
                requiresLogin: true
            }
        },
        {
            path: '/agentGpInfo',
            name: 'agentGpInfo',
            component: AgentGpInfo,
            meta: {
                title: '我的群组详情',
                requiresLogin: true
            }
        },
        {
            path: '/agentGpMember',
            name: 'agentGpMember',
            component: AgentGpMember,
            meta: {
                title: '我的群组成员',
                requiresLogin: true
            }
        },
        {
            path: '/agentGpList',
            name: 'agentGpList',
            component: AgentGpList,
            meta: {
                title: '成员列表',
                requiresLogin: true
            }
        },
        {
            path: '/totalAgent',
            name: 'totalAgent',
            component: TotalAgent,
            meta: {
                title: '成员列表',
                requiresLogin: true
            }
        },
        {
            path: '/agentGpDel',
            name: 'agentGpDel',
            component: AgentGpDel,
            meta: {
                title: '成员列表',
                requiresLogin: true
            }
        },
        {
            path: '/news',
            name: 'news',
            component: News,
            meta: {
                title: '我的消息',
                requiresLogin: true
            }
        },
        {
            path: '/myInvitation',
            name: 'my_invitation',
            component: MyInvitation,
            meta: {
                title: '我的邀请',
                requiresLogin: true
            }
        },
        {
            path: '/costIntegral',
            name: 'cost_integral',
            component: CostIntegral,
            meta: {
                title: '我的消费积分',
                requiresLogin: true
            }
        },
        {
            path: '/costDetail',
            name: 'cost_detail',
            component: CostDetail,
            meta: {
                title: '积分明细',
                requiresLogin: true
            }
        },
        {
            path: '/servicePoint',
            name: 'service_point',
            component: ServicePoint,
            meta: {
                title: '服务积分',
                requiresLogin: true
            }
        },
        {
            path: '/invitationDetail',
            name: 'invitation_detail',
            component: InvitationDetail,
            meta: {
                title: '我的邀请',
                requiresLogin: true
            }
        },
        {
            path: '/docTerritory',
            name: 'doc_territory',
            component: DocTerritory,
            meta: {
                title: '擅长领域',
                requiresLogin: true
            }
        },
        // 拜访系统
        {
            path: '/visitIndex',
            name: 'visit_index',
            component: VisitIndex,
            meta: {
                title: '客户拜访',
                requiresLogin: true
            }
        },
        {
            path: '/visitSignIn',
            name: 'visit_signIn',
            component: VisitSignIn,
            meta: {
                title: '签入',
                requiresLogin: true
            }
        },
        {
            path: '/visitSiEdit',
            name: 'visit_si_edit',
            component: VisitSiEdit,
            meta: {
                title: '签入修改',
                requiresLogin: true
            }
        },
        {
            path: '/visitSoList',
            name: 'visit_so_list',
            component: VisitSoList,
            meta: {
                title: '已签入未签出列表',
                requiresLogin: true
            }
        },
        {
            path: '/visit',
            name: 'visit',
            component: Visit,
            meta: {
                title: '添加拜访记录',
                requiresLogin: true
            }
        },
        {
            path: '/visitDep',
            name: 'visit_dep',
            component: VisitDep,
            meta: {
                title: '选择科室',
                requiresLogin: true
            }
        },
        {
            path: '/visitDepAdd',
            name: 'visit_dep_add',
            component: VisitDepAdd,
            meta: {
                title: '新增科室',
                requiresLogin: true
            }
        },
        {
            path: '/visitDoc',
            name: 'visit_doc',
            component: VisitDoc,
            meta: {
                title: '选择医生',
                requiresLogin: true
            }
        },
        {
            path: '/visitDocAdd',
            name: 'visit_doc_add',
            component: VisitDocAdd,
            meta: {
                title: '新增医生',
                requiresLogin: true
            }
        },
        {
            path: '/visitDocDep',
            name: 'visit_doc_dep',
            component: VisitDocDep,
            meta: {
                title: '新增医生科室选择',
                requiresLogin: true
            }
        },
        {
            path: '/visitHos',
            name: 'visit_hos',
            component: VisitHos,
            meta: {
                title: '选择拜访医院',
                requiresLogin: true
            }
        },
        {
            path: '/visitDetail',
            name: 'visit_detail',
            component: VisitDetail,
            meta: {
                title: '历史拜访记录',
                requiresLogin: true
            }
        },
        {
            path: '/visitEdit',
            name: 'visit_edit',
            component: VisitEdit,
            meta: {
                title: '编辑拜访记录',
                requiresLogin: true
            }
        },
        {
            path: '/visitRp',
            name: 'visit_rp',
            component: VisitRp,
            meta: {
                title: '拜访报告',
                requiresLogin: true
            }
        },
        {
            path: '/visitSaleRp',
            name: 'visit_salerp',
            component: VisitSaleRp,
            meta: {
                title: '销售报告',
                requiresLogin: true
            }
        },
        {
            path: '/qrcode',
            name: 'qrcode',
            component: Qrcode,
            meta: {
                title: '优云邀请码',
                requiresLogin: true
            }
        },
        // 医生积分VisitSaleRp
        // {
        //     path: '/docCenter',
        //     name: 'doc_center',
        //     component: DocCenter,
        //     meta: {
        //         title: '个人中心',
        //         requiresLogin: true
        //     }
        // },
        // {DocCenter
        //     path: '/wlogin',
        //     name: 'wlogin',
        //     component: Wlogin,
        //     meta: {
        //         title: '功能登录',
        //         requiresLogin: false
        //     }
        // },
    ]
}]
