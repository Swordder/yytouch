<template>
    <div class="visit">
        <transition name="showcover">
			<div class="back_cover" @click="prod_tag = false" v-show="prod_tag"></div>
		</transition>
        <div v-show="prod_tag" class="prod_list bgcw">
            <div class="prod_head flex_item">
                <p @click="prod_tag = false">取消</p>
                <p @click="completeProd">完成</p>
            </div>
            <ul>
                <li 
                :class="products_id.indexOf(item.id) != -1?'bd_bt active':'bd_bt' " 
                v-for="item in products" :key="item.id"
                @click="selectProd(item.id,item.name)"
                >
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="v_item bd_bt">
            <p>拜访类型</p>
            <span>{{visit_way}}</span>
        </div>
        <div class="v_item bd_bt">
            <p>拜访医院</p>
            <span>{{visit_data.v_hos_name}}</span>
        </div>
        <div v-show="visit_data.v_hos_type == 1" class="v_item bd_bt v_dep">
            <p>拜访科室<i v-show="visit_data.v_way == 1 || visit_data.v_way == 2" class="iconfont">&#xe603;</i></p>
            <router-link :to="{path:'/visitDep',query:{check_type:1,hos_id:hos_id}}">{{visit_data.v_dep_id.length ==0?'请选择':dep_name.toString()}}</router-link>
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div v-show="visit_data.v_hos_type == 1" class="v_item bd_bt v_dep">
            <p>拜访医生</p>
            <router-link :to="{path:'/visitDoc',query:{check_type:1,hos_id:hos_id}}">{{visit_data.v_docs.length === 0?'请选择':doc_name.toString()}}</router-link>
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item bd_bt">
            <p>沟通产品<i v-show="visit_data.v_way == 1 || visit_data.v_way == 2 || visit_data.v_way == 4 " class="iconfont">&#xe603;</i></p>
            <p class="show_prod" @click="prod_tag  = !prod_tag">{{products_id.length === 0?'请选择':visit_data.v_prod_name.toString()}}</p>
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item bd_bt">
            <p>拜访结果<i v-show="visit_data.v_way == 1 || visit_data.v_way == 2 || visit_data.v_way == 4 " class="iconfont">&#xe603;</i></p>
            <textarea name="" id="" v-model="visit_data.v_result" @change="writeContent($event,8)" placeholder="请输入"></textarea>
        </div>
        <div class="v_item bd_bt">
            <p>后续计划<i v-show="visit_data.v_way == 1 || visit_data.v_way == 2 " class="iconfont">&#xe603;</i></p>
            <textarea name="" id="" v-model="visit_data.v_next" @change="writeContent($event,9)" placeholder="请输入"></textarea>
        </div>
        <div class="v_item bd_bt">
            <p>拍照<i class="iconfont">&#xe603;</i></p>
            <van-uploader v-model="visit_data.v_pics" capture="camera" :before-delete="beforeDelete"  :after-read="afterRead" />
        </div>
        <div class="v_item bd_bt gps">
            <div class="flex_item">
                <p>所在位置<i class="iconfont">&#xe603;</i></p>
                <div class="position" @click="getLocal(11)"> <i class="iconfont">&#xe79e;</i>{{visit_data.v_pos?'重新定位':"获取地理位置"}}</div>
            </div>
            <div class="flex_item">
                <p>{{visit_data.v_pos?visit_data.v_pos:'请选择定位打卡'}}</p>
            </div>
        </div>
        <div class="bottom_btn">
            <button class="btn_common" @click="addNewVisit">签出</button>
        </div>
        <!-- 位置类型的判断 -->
        <VisitPopover :geo_tag="geo_tag" :list="config_list" @show="showGeo"></VisitPopover>
    </div>
</template>
<script>
import { getWxConfig, newCoDetail,visitDetail, visitSeriesServe, visitGetToken,visitCheckout, checkGeo, visitConfig, visitUpload, visitGeo, visitCheckOutEdit } from '../../api/sendRequest';
import VisitPopover from '../components/VisitPopover';
import { depList } from '../../api/staticRequest';
import { setSessionStore,getSessionStore } from '../../config/util';
import wx from 'weixin-js-sdk';
import { Datetime, Group, PopupRadio } from 'vux';
import { Uploader } from 'vant';
import { mapState, mapMutations } from 'vuex';
import * as qiniu from 'qiniu-js';
export default {
    data(){
        return {
            hos_info:{},
            dep_name:[],
            doc_name:[],
            products: [],
            products_name:[],
            products_id:[],
            prod_tag:false,
            product:'请选择',
            visit_way:'',
            hos_id:'',
            fileList:[],
            config:{},
            lat:'',
            lng:'',
            geo_tag:false,
            config_list:[]
        }
    },
    computed:{
        ...mapState([
            'user_info',
            'visit_data'
        ]),
    },
    components:{
        Datetime, Group, PopupRadio ,Uploader,VisitPopover
    },
    mounted(){
        this.getServeProducts();
        this.getToken();
        this.locationCon();
        // this.doc_name = getSessionStore('docs_name')?JSON.parse(getSessionStore('docs_name')).toString():'';
        // 判断是编辑还是新增
        let obj = JSON.parse(getSessionStore('yy_visit_data'));
        let cur_id = this.$route.query.id;
        let type = 2;
        if (obj) {
            if (obj.v_yyid == cur_id) {
                this.visitType(obj.v_way);
                this.INIT_VISTI({type,obj});
                this.fileList = [...obj.v_pics];
                this.hos_id = obj.v_hos_id;
                // 科室
                {
                    let type = 3;
                    let value = obj.v_dep_id;
                    this.SET_VISIT({type,value});
                    depList.then(res => {
                        res.depList.map((item) => {
                            if(obj.v_dep_id.indexOf(item.id) != -1){
                                this.dep_name.push(item.depName);
                            }
                        })
                    });
                }
                // 医生
                {
                    let type = 15;
                    let value = obj.v_docs;
                    this.SET_VISIT({type,value});
                    value.map((item) => {
                        this.doc_name.push(item.name);
                    })
                }
                // 产品
                {
                    if (obj.v_product.length !== 0) {
                        this.products_id = [...obj.v_product];
                        this.products.map((item) => {
                            if (obj.v_product.indexOf(item.id) != -1) {
                                this.products_name.push(item.name);
                            }
                        })
                        
                    };
                }
                return
            } else {
                this.getCoDetail();
            }
            return
        } else {
            this.getCoDetail();
        }
    },
    methods:{
        ...mapMutations([
			'SET_VISIT',
            'SET_VISIT_IMG',
            'DELETE_VISIT_IMG',
            'INIT_VISTI',
            'CLEAR_VISIT_CI'
		]),
        // 获取基础信息
        async getCoDetail(){
            let type = 2;
            let obj = {
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
            };
            let res = await visitDetail(this.user_info.yyid,this.user_info.user_token,this.$route.query.id);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            let info = res.data.info;
            this.hos_info = {...res.data.info.hospital};
            this.hos_id = res.data.info.hospital.id;
            this.visitType(info.visit_type);
            obj.v_way = info.visit_type;
            obj.v_yyid = info.id;
            obj.v_hos_type = info.hospital.org_type;
            // 医院
            if (info.hospital.length !== 0) {
                obj.v_hos_name = info.hospital.name;
                obj.v_hos_id = info.hospital.id;
            }
            // 判断是新增还是编辑
            if (this.$route.query.edit_type) {
                // 科室
                if (info.departs.length !== 0) {
                    info.departs.map((item,index) => {
                        this.dep_name.push(item.name);
                        obj.v_dep_id.push(item.id);
                    })
                }
                // 医生
                if (info.doctors.length !== 0) {
                    obj.v_docs = [...info.doctors];
                    info.doctors.map(item => {
                        this.doc_name.push(item.name);
                    })
                }
                // 产品
                if (info.series_ids.length !== 0) {
                    info.series_ids.map((item,index) => {
                        this.products_name.push(item.name);
                        this.products_id.push(item.id);
                        obj.v_product.push(item.id);
                        obj.v_prod_name = this.products_name.toString();
                    })
                };
                obj.v_result = info.result;
                obj.v_next = info.next;
                // 照片
                if (info.pics.length !== 0) {
                    info.pics.map(item => {
                        obj.v_pics.push({
                            id:item.id,
                            name:item.name,
                            url:item.url+'?imageView2/2/w/200'
                        })
                        this.fileList.push({
                            id:item.id,
                            name:item.name,
                            url:item.url+'?imageView2/2/w/200'
                        })
                    });
                }
                obj.v_pos = info.position;
                obj.v_lat = info.lat;
                obj.v_lng = info.lng;
            }
            this.INIT_VISTI({type,obj})
        },
        // 获取拜访类型
        visitType(type_id){
            let visit_tp = '';
            switch (type_id) {
                case 1:
                    visit_tp = '面对面拜访';
                    break;
                case 2:
                    visit_tp = '线上拜访';
                    break;
                case 3:
                    visit_tp = '内部会议';
                    break;
                case 4:
                    visit_tp = '外部会议';
                    break;
                case 5:
                    visit_tp = '行政类工作';
                    break;
                default:
                    break;
            }
            this.visit_way = visit_tp;
        },
        // 设置state
        setValue(type,value){
            this.SET_VISIT({type,value});
        },
        async locationCon(){
            // 对IOS和安卓进行判断
            let u = navigator.userAgent;
            let href;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isIOS) {
                href = window.entryUrl
            }else{
                href = window.location.href;
            }
            let config_res = await getWxConfig(1,href,JSON.stringify([
                    'scanQRCode',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'getLocation'
                ]));
            if(config_res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
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
        },
        async getLocal(type){
            // 点击的时候获取经纬度
            let _this = this;
            let visit_datas = this.visit_data;
            let visit_id = visit_datas.v_way;

            // 初始化经纬度
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: async function (res) {
                    _this.lat = res.latitude; 
                    _this.lng = res.longitude;
                    {
                        let type = 13,value = res.latitude; 
                        _this.SET_VISIT({type,value});
                    }
                    {
                        let type = 14,value = res.longitude; 
                        _this.SET_VISIT({type,value});
                    }
                    let res2 = await visitGeo(_this.user_info.yyid,_this.user_info.user_token,_this.lat,_this.lng);
                    let value = res2.data.desc;
                    _this.SET_VISIT({type,value});
                    // 检查是否需要调用位置检验
                    if(visit_id == 1){
                        let hos_id = visit_datas.v_hos_id?visit_datas.v_hos_id:0;
                        let res3 = await checkGeo(_this.user_info.yyid,_this.user_info.user_token,hos_id,_this.lat,_this.lng);
                        if(res3.errcode != 0){
                            _this.$vux.toast.text(res.errmsg,'top');
                            return
                        };
                        if(res3.data.result == 1){
                            setSessionStore('v_geo_id','');
                            setSessionStore('v_geo_con','');
                            return
                        };
                        let res4 = await visitConfig(_this.user_info.yyid,_this.user_info.user_token,2);
                        _this.config_list = [...res4.data.config];
                        _this.geo_tag = true;
                    }
                },
                fail:function(){
                    _this.$vux.toast.text('请检查是否开启微信定位','top');
                },
                cancel: function (res) {
					_this.$vux.toast.text('用户拒绝授权获取地理位置');
				}
            });
        },
        // 判断是否显示弹层
        showGeo(){
            this.geo_tag = !this.geo_tag;
        },
        // 获取服务产品
        async getServeProducts(){
            let res = await visitSeriesServe(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.products = [...res.data.list];
        },
        // 选产品
        selectProd(id,name){
            let type = 12;
            if(this.products_id.length === 0){
                this.products_name.push(name);
                this.products_id.push(id);

            } else {
                if(this.products_id.indexOf(id) == -1){
                    this.products_name.push(name);
                    this.products_id.push(id)
                } else {
                    this.products_name.splice(this.products_name.indexOf(name),1);
                    this.products_id.splice(this.products_id.indexOf(id),1);
                }
            }
            let value = this.products_name.toString();
            this.SET_VISIT({type,value});
        },
        completeProd(){
            let type = 4;
            let value = this.products_id;
            this.SET_VISIT({type,value});
            this.prod_tag = false;
        },
        async getToken(){
            let res = await visitGetToken(this.user_info.yyid,this.user_info.user_token,2,'visit');
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.config = { ...res.data.config };
        },
        uploadFile(obj){
            const config = this.config
            const { file } = obj
            let key = config.path
            const fileName = file.name + new Date().getTime();
            key = key + fileName;

            const uploadConfig = {
                useCdnDomain: true, // 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                region: qiniu.region.z0,
                uphost: config.uploadUrl
            };
            // this.$vux.loading.show({ text: 'uploading' })
            const putExtra = {};
            const observable = qiniu.upload(file, key, config.token, putExtra, uploadConfig);
            const next = () => {}
            const error = err => this.uploadError(err);
            const complete = res => this.uploadSuccess(res);
            const subscription = observable.subscribe(next, error, complete) // 上传开始
            return subscription
            
        },
        uploadSuccess(res){
            const bucket = this.config.bucket
            const url = this.config.baseUri
            const key = res.key
            const fileName = res.key.split('/').pop()
            const fileUrl = `${url}/${key}`
            const me = this;
            this.$vux.loading.show({ text: 'uploading' })
            visitUpload(this.user_info.yyid,this.user_info.user_token,bucket,key, fileName, fileUrl).then(resp => {
                if(resp.errcode != 0){
                    this.$vux.toast.text(resp.errmsg,'top');
                    return
                };
                const id = resp.data.info.id
                const data = {
                    id: id,
                    name: fileName,
                    url: fileUrl+'?imageView2/2/w/200'
                }
                this.fileList.push(data);
                let type = 2;
                let file_list = [...this.fileList];
                this.SET_VISIT_IMG({type,file_list});
                me.$emit('uploadSuccess', data);
            })
        },
        uploadError(err) {
            this.$vux.toast.text('数据错误，请重新上传');
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            this.uploadFile(file);
        },
        beforeDelete(file){
            this.visit_data.v_pics.map((item,index) => {
                if(item.id == file.id){
                    this.fileList.splice(index,1);
                    let type = 2;
                    let file_list = [...this.fileList];
                    this.SET_VISIT_IMG({type,file_list});
                }
            });
        },
        // 写入事项
        writeContent(e,type){
            let value = e.target.value;
            this.SET_VISIT({type,value});
        },
        // 添加或修改拜访记录
        async addNewVisit(){
            let visit_data = this.visit_data;
            let doc_ids = visit_data.v_docs.length !== 0?visit_data.v_docs.map(item => {
                return item.id
            }):[];
            let geo_opt = getSessionStore('v_geo_id');
            let geo_con = getSessionStore('v_geo_con');
            let v_way_id = visit_data.v_way;
            let img_id = [];
            visit_data.v_pics.length === 0?[]:visit_data.v_pics.map(item => {
                img_id.push(item.id);
            })
            if(this.hos_info.org_type == 1){
                if(this.hos_id&&visit_data.v_dep_id.length === 0&&(v_way_id == 1 || v_way_id == 2)){
                    this.$vux.toast.text('请选择拜访科室');
                    return
                }
            }
            if((v_way_id == 1 || v_way_id == 2 || v_way_id == 4)&&visit_data.v_product.length == 0){
                this.$vux.toast.text('请选择相关产品');
                return
            }
            if((v_way_id == 1 || v_way_id == 2 || v_way_id == 4)&&visit_data.v_result == ""){
                this.$vux.toast.text('请输入拜访结果');
                return
            }
            if((v_way_id == 1 || v_way_id == 2)&&visit_data.v_next == ""){
                this.$vux.toast.text('请输入后续计划');
                return
            }
            // 判断是否必须提交定位
            if(img_id.length === 0){
                this.$vux.toast.text('请选拍照上传');
                return
            }
            if(visit_data.v_pos == ''){
                this.$vux.toast.text('请选获取定位');
                return
            }
            // if(!geo_con){
            //     this.$vux.toast.text('请选输入范围外的原因');
            //     return
            // }
            if(!visit_data.v_lat){
                this.$vux.toast.text('请重新获取定位');
                return
            }
            let _this = this;
            // 判断新增还是修改visitCheckOutEdit
            if (this.$route.query.edit_type&&this.$route.query.edit_type == 1) {
                let res = await visitCheckOutEdit(
                    this.user_info.yyid,
                    this.user_info.user_token,
                    visit_data.v_hos_id?visit_data.v_hos_id:0,
                    v_way_id,
                    JSON.stringify(visit_data.v_dep_id),
                    JSON.stringify(doc_ids),
                    JSON.stringify(visit_data.v_product),
                    visit_data.v_result,
                    visit_data.v_next,
                    JSON.stringify(img_id),
                    visit_data.v_lat,
                    visit_data.v_lng,
                    visit_data.v_pos,
                    geo_opt?geo_opt:'',
                    geo_con?geo_con:'',
                    this.$route.query.id
                );
                if(res.errcode != 0){
                    this.$vux.toast.text(res.errmsg,'top');
                    return
                };
                setTimeout(function(){
                    _this.$vux.toast.text('修改成功');
                },500)    
            } else {
                let res = await visitCheckout(
                    this.user_info.yyid,
                    this.user_info.user_token,
                    visit_data.v_hos_id?visit_data.v_hos_id:0,
                    v_way_id,
                    JSON.stringify(visit_data.v_dep_id),
                    JSON.stringify(doc_ids),
                    JSON.stringify(visit_data.v_product),
                    visit_data.v_result,
                    visit_data.v_next,
                    JSON.stringify(img_id),
                    visit_data.v_lat,
                    visit_data.v_lng,
                    visit_data.v_pos,
                    geo_opt?geo_opt:'',
                    geo_con?geo_con:'',
                    this.$route.query.id
                );
                if(res.errcode != 0){
                    this.$vux.toast.text(res.errmsg,'top');
                    return
                };
                setTimeout(function(){
                    _this.$vux.toast.text('添加成功');
                },500)    
            }
            
            let type = 2, obj = {
                            v_hos:"签入时未选择医院",
                            v_hos_id:"",
                            v_dep_id:[],
                            v_docs:[],
                            v_product:[],
                            v_way:"",
                            v_result:'',
                            v_next:'',
                            v_pics:[],
                            v_pos:'',
                            v_lat:'',
                            v_lng:'',
                            v_yyid:''
                        };
            this.CLEAR_VISIT_CI({type,obj});
            setTimeout(function(){
                _this.$router.push({
                    path:'/visitIndex'
                })    
            },1500);
        }
    }
}
</script>
<style lang="less">
.visit{
    padding: 0px 15px;
    .v_item{
        padding: 10px 0;
        position: relative;
        p{
            margin-bottom: 8px;
            .iconfont{
                color: #FF5252;
            }    
        }
        span{
            color: #BBBBBB;
        }
        .show_prod{
            margin-bottom: 0;
            color: #BBBBBB;
        }
        .gray{
            .vux-cell-value{
                color: #BBBBBB;
            }
        }
        .r_icon{
            position: absolute;
            right: -3px;
            bottom: 8px;
            color: #BBBBBB;
        }
        textarea{
            padding: 10px 0;
            resize: none;
            width: 100%;
            border: none;
            outline-style: none;
            height: 60px;
        }
        .weui-cell{
            padding: 0;
            .vux-cell-value{
                color: #BBBBBB;
            }
            &:before{
                border-top: none;
            }
            .weui-cell__ft{
                text-align: left;
                &::after{
                    height: 0;
                    width: 0;
                    border-color: transparent;
                }
            }
            
        }
        .hos_select{
            .vux-cell-primary{
                flex: 0;
            }
        }
    }
    .v_dep{
        a{
            display: block;
            color: #BBBBBB;
        }
    }
    .gps{
        .flex_item{
            line-height: 30px;
            color: #BBBBBB;   
        }
        .position{
            color: #5870FE;
            .iconfont{
                margin-right: 10px;
                color: #5870FE;
                font-size: 16PX;
            }
        }
    }
    .back_cover{
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .prod_list{
        position: fixed;
        z-index: 200;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        .prod_head{
            padding: 15px 15px 0;
            p:nth-of-type(1){
                color: #BBBBBB;
            }
        }
        ul{
            padding: 15px;
            li{
                line-height: 36px;
            }
            .active{
                color: #5870FE;
            }
        }
    }
    .bottom_btn{
        padding: 40px 0 30px;
        button{
            display: block;
            width: 100%;
            background-color: #5870FE;
            color: #ffffff;
        }
        a{
            display: block;
            margin-top: 10px;
            text-align: center;
            color: #999999;
            .iconfont{
                font-size: 16PX;
            }
        }
    }
}
.demo3-slot {
    text-align: center;
    padding: 10px 0;
    color: #888;
}
</style>