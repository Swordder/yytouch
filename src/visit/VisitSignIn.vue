<template>
    <div class="visit" data-name="visit_signin">
        <div class="v_item bd_bt">
            <p>拜访类型<i class="iconfont">&#xe603;</i></p>
            <popup-radio class="hos_select" :options="visit_ways" v-model="visit_check_in.v_way" @on-hide="setValue(1,visit_check_in.v_way)">
                <p slot="popup-header" class="vux-1px-b demo3-slot">请选择</p>
            </popup-radio>
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item visit_hos bd_bt">
            <p>拜访医院<i v-show="visit_check_in.v_way == 1||visit_check_in.v_way ==2" class="iconfont">&#xe603;</i></p>
            <router-link :to="{path:'/visitHos',query:{type:1}}">{{visit_check_in.v_hos_id?(visit_check_in.v_hos_name == "请选择"?'请选择':visit_check_in.v_hos_name):'请选择'}}</router-link>
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item bd_bt">
            <p>拍照<i class="iconfont">&#xe603;</i></p>
            <van-uploader v-model="visit_check_in.v_pics" capture="camera" :before-delete="beforeDelete"  :after-read="afterRead" />
        </div>
        <div class="v_item bd_bt gps">
            <div class="flex_item">
                <p>所在位置<i class="iconfont">&#xe603;</i></p>
                <div class="position" @click="getLocal(4)"> <i class="iconfont">&#xe79e;</i>{{visit_check_in.v_pos?'重新定位':"获取地理位置"}}</div>
            </div>
            <div class="flex_item">
                <p>{{visit_check_in.v_pos?visit_check_in.v_pos:'请选择定位打卡'}}</p>
            </div>
        </div>
        <div class="bottom_btn">
            <button class="btn_common" @click="checkIn">提交</button>
        </div>
        <!-- 位置类型的判断 -->
        <VisitPopover :geo_tag="geo_tag" :list="config_list" @show="showGeo"></VisitPopover>
    </div>
</template>
<script>
import { getWxConfig, visitGetToken, visitUpload, visitGeo, checkGeo, visitConfig,visitDetail, visitCheckIn, visitCheckinEdit } from '../../api/sendRequest';
import { setSessionStore,getSessionStore } from '../../config/util';
import VisitPopover from '../components/VisitPopover';
import wx from 'weixin-js-sdk';
import { Group, PopupRadio  } from 'vux';
import { Uploader  } from 'vant';
import { mapState, mapMutations } from 'vuex';
import * as qiniu from 'qiniu-js';
export default {
    data(){
        return {
            hos_name:'请选择',
            visit_ways: [{
                key: 1,
                value: '面对面拜访'
            }, {
                key: 2,
                value: '线上拜访'
            }, {
                key: 3,
                value: '内部会议'
            }, {
                key: 4,
                value: '外部会议'
            }, {
                key: 5,
                value: '行政类工作'
            }],
            visit_way:'所有',
            // hos_id:'',
            fileList:[],
            config:{},
            lat:'',
            lng:'',
            geo_tag:false,
            config_list:[],
            img_state:false
        }
    },
    computed:{
        ...mapState([
            'user_info',
            'visit_check_in'
        ]),
    },
    components:{
        Group, PopupRadio ,Uploader,VisitPopover
    },
    mounted(){
        this.getToken();
        this.locationCon();
        // 判断是编辑还是新增
        let obj = JSON.parse(getSessionStore('yy_visit_check_in'));
        let cur_id = this.$route.query.id;
        let type = 1; 
        // 判断是否有本地存储
        if (cur_id) {
            if (obj && obj.v_yyid == cur_id) {
                this.INIT_VISTI({type,obj});
                this.fileList = [...obj.v_pics];
                return
            } else {
                this.getCiDetail();
            }
            return    
        } else {
            if (obj&&obj.v_yyid) {
                let obj = {
                    v_way:"请选择",
                    v_hos_name:"请选择",
                    v_hos_id:"",
                    v_pics:[],
                    v_pos:'',
                    v_lat:'',
                    v_lng:'',
                    v_yyid:''
                };
                this.INIT_VISTI({type,obj});
                return
            } else {
                this.INIT_VISTI({type,obj});
            }
        }
    },
    methods:{
        ...mapMutations([
			'SET_VISIT_CI',
            'SET_VISIT_IMG',
            'INIT_VISTI',
            'CLEAR_VISIT_CI'
		]),
        // 获取详情
        async getCiDetail(){
            let type = 1;
            let id = this.$route.query.id;
            let obj = {
                v_way:"请选择",
                v_hos_name:"请选择",
                v_hos_id:"",
                v_pics:[],
                v_pos:'',
                v_lat:'',
                v_lng:''
            };
            let res = await visitDetail(this.user_info.yyid,this.user_info.user_token,id);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            let info = res.data.info;
            // 遍历读取数据，并写入本地缓存
            obj.v_way = info.visit_type;
            if (info.hospital) {
                obj.v_hos_name = info.hospital.name;
                obj.v_hos_id = info.hospital.id;
            }
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
                })
            }
            obj.v_pos = info.position;
            obj.v_lat = info.lat;
            obj.v_lng = info.lng;
            obj.v_yyid = info.id;
            setSessionStore('v_geo_con',info.geo_comment);
            setSessionStore('v_geo_id',info.geo_opt);
            this.INIT_VISTI({type,obj})
        },
        // 设置state
        setValue(type,value){
            this.SET_VISIT_CI({type,value});
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
            // console.log(href)
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
            let visit_check_in = this.visit_check_in;
            wx.ready(function(){
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: async function (res) {
                        _this.lat = res.latitude; 
                        _this.lng = res.longitude;
                        {
                            let type = 5,value = res.latitude; 
                            _this.SET_VISIT_CI({type,value});
                        }
                        {
                            let type = 6,value = res.longitude; 
                            _this.SET_VISIT_CI({type,value});
                        }
                        let res2 = await visitGeo(_this.user_info.yyid,_this.user_info.user_token,_this.lat,_this.lng);
                        let value = res2.data.desc;
                        _this.SET_VISIT_CI({type,value});
                        
                        // 检查是否需要调用位置检验
                        if(visit_check_in.v_way == 1){
                            let hos_id = visit_check_in.v_hos_id?visit_check_in.v_hos_id:0;
                            let res3 = null;
                            if (hos_id != 0) {
                                res3 = await checkGeo(_this.user_info.yyid,_this.user_info.user_token,hos_id,_this.lat,_this.lng);
                            }
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
                    fail:function(res){
                        _this.$vux.toast.text('请检查是否开启微信定位','top');
                    },
                    cancel: function (res) {
                        _this.$vux.toast.text('用户拒绝授权获取地理位置');
                    }
                });    
            })
        },
        // 判断是否显示弹层
        showGeo(){
            this.geo_tag = !this.geo_tag;
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
            const next = () => {}
            const error = err => this.uploadError(err)
            const complete = res => {
                this.uploadSuccess(res)
            }
            const observable = qiniu.upload(file, key, config.token, putExtra, uploadConfig);
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
            // this.$vux.loading.show({ text: 'uploading' })
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
                };
                // this.$vux.loading.hide()
                this.fileList.push(data);
                let type = 1;
                let file_list = [...this.fileList];
                this.SET_VISIT_IMG({type,file_list});
                me.$emit('uploadSuccess', data);
            })
        },
        uploadError(err) {
            this.$vux.toast.text('数据错误，请重新上传')
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            this.uploadFile(file);
        },
        beforeDelete(file){
            this.visit_check_in.v_pics.map((item,index) => {
                if(item.id == file.id){
                    this.fileList.splice(index,1);
                    let type = 1;
                    let file_list = [...this.fileList];
                    this.SET_VISIT_IMG({type,file_list});
                }
            });
        },
        // 添加拜访记录
        async checkIn(){
            let visit_check_in = this.visit_check_in;
            let hos_id = visit_check_in.v_hos_id?visit_check_in.v_hos_id:0;
            let geo_opt = getSessionStore('v_geo_id');
            let geo_con = getSessionStore('v_geo_con');
            let img_id = [];
            let cur_lat = this.lat?this.lat:(visit_check_in.v_lat?visit_check_in.v_lat:'');
            let cur_lng = this.lng?this.lng:(visit_check_in.v_lng?visit_check_in.v_lng:'');
            visit_check_in.v_pics.length === 0?[]:visit_check_in.v_pics.map(item => {
                img_id.push(item.id);
            })
            if(visit_check_in.v_way == "请选择"){
                this.$vux.toast.text('请选择拜访类型');
                return
            }
            if((visit_check_in.v_way == 1 || visit_check_in.v_way == 2)&&visit_check_in.v_hos=="请选择"){
                this.$vux.toast.text('请选择拜访医院');
                return
            }
            if(visit_check_in.v_pics.length === 0){
                this.$vux.toast.text('请选拍照上传');
                return
            }
            if(visit_check_in.v_pos == ''){
                this.$vux.toast.text('请选获取定位');
                return
            }
            if(!cur_lat || !cur_lng){
                this.$vux.toast.text('请重新获取定位');
                return
            }
            let _this = this;
            // 判断新增还是修改
            if (this.$route.query.id) {
                let res = await visitCheckinEdit(
                    this.user_info.yyid,
                    this.user_info.user_token,
                    hos_id,
                    visit_check_in.v_way,
                    JSON.stringify(img_id),
                    visit_check_in.v_lat,
                    visit_check_in.v_lng,
                    visit_check_in.v_pos,
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
                let res = await visitCheckIn(
                    this.user_info.yyid,
                    this.user_info.user_token,
                    hos_id,
                    visit_check_in.v_way,
                    JSON.stringify(img_id),
                    cur_lat,
                    cur_lng,
                    visit_check_in.v_pos,
                    geo_opt?geo_opt:'',
                    geo_con?geo_con:''
                );
                if(res.errcode != 0){
                    this.$vux.toast.text(res.errmsg,'top');
                    return
                };
                setTimeout(function(){
                    _this.$vux.toast.text('添加成功');
                },500)    
            }
            
            let type = 1, obj = {
                            v_way:"请选择",
                            v_hos_name:"请选择",
                            v_hos_id:"",
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
    .visit_hos{
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