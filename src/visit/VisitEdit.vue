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
            <p>拜访时间<i class="iconfont">&#xe603;</i></p>
            <datetime :class="time_value == '请选择'?'gray time_show':'time_show'" v-model="visit_data.v_time" format=" YYYY-MM-DD HH:mm " @on-change="setValue(1,visit_data.v_time)"></datetime>    
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item bd_bt">
            <p>拜访医院<i class="iconfont">&#xe603;</i></p>
            <popup-radio class="hos_select" :options="hos_list" v-model="visit_data.v_hos" @on-hide="setValue(2,visit_data.v_hos)">
                <p slot="popup-header" class="vux-1px-b demo3-slot">请选择</p>
            </popup-radio>
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item bd_bt v_dep">
            <p>拜访科室<i class="iconfont">&#xe603;</i></p>
            <router-link to="/visitDep">{{visit_data.v_dep_id == "请选择"?'请选择':dep_name}}</router-link>
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item bd_bt">
            <p>相关产品<i class="iconfont">&#xe603;</i></p>
            <p class="show_prod" @click="prod_tag  = !prod_tag">{{products_id.length === 0?'请选择':products_name.toString()}}</p>
            <!-- <popup-radio class="hos_select" :options="products" v-model="visit_data.v_product" @on-hide="setValue(4,visit_data.v_product)">
                <p slot="popup-header" class="vux-1px-b demo3-slot">请选择</p>
            </popup-radio> -->
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item bd_bt">
            <p>拜访方式<i class="iconfont">&#xe603;</i></p>
            <popup-radio class="hos_select" :options="visit_ways" v-model="visit_data.v_way" @on-hide="setValue(5,visit_data.v_way)">
                <p slot="popup-header" class="vux-1px-b demo3-slot">请选择</p>
            </popup-radio>
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item bd_bt">
            <p>拜访目的<i class="iconfont">&#xe603;</i></p>
            <popup-radio class="hos_select" :options="aims" v-model="visit_data.v_aims" @on-hide="setValue(6,visit_data.v_aims)">
                <p slot="popup-header" class="vux-1px-b demo3-slot">请选择</p>
            </popup-radio>
            <i class="iconfont r_icon">&#xe661;</i>
        </div>
        <div class="v_item bd_bt">
            <p>主要事宜<i class="iconfont">&#xe603;</i></p>
            <textarea name="" id="" v-model="visit_data.v_main" @change="writeContent($event,7)" placeholder="请输入"></textarea>
        </div>
        <div class="v_item bd_bt">
            <p>拜访结果<i class="iconfont">&#xe603;</i></p>
            <textarea name="" id="" v-model="visit_data.v_result" @change="writeContent($event,8)" placeholder="请输入"></textarea>
        </div>
        <div class="v_item bd_bt">
            <p>后续跟进事项</p>
            <textarea name="" id="" v-model="visit_data.v_next" @change="writeContent($event,9)" placeholder="请输入"></textarea>
        </div>
        <div class="v_item bd_bt">
            <p>备注</p>
            <textarea name="" id="" v-model="visit_data.v_mark" @change="writeContent($event,10)" placeholder="请输入"></textarea>
        </div>
        <div class="v_item bd_bt">
            <p>拍照</p>
            <van-uploader v-model="visit_data.v_pics" capture="camera" :before-delete="beforeDelete" :after-read="afterRead" />
        </div>
        <div class="v_item bd_bt gps">
            <p>所在位置</p>
            <div class="flex_item">
                <p>{{visit_data.v_pos?visit_data.v_pos:'请选择定位打卡'}}</p>
                <p class="position" @click="getLocal(11)"> <i class="iconfont">&#xe79e;</i>{{visit_data.v_pos?'重新定位':"获取地理位置"}}</p>
            </div>
        </div>
        <div class="bottom_btn">
            <button class="btn_common" @click="addNewVisit">提交</button>
            <router-link to="/visitDetail">查看历史记录<i class="iconfont">&#xe661;</i></router-link>
        </div>
    </div>
</template>
<script>
// import { getLocation,getCa } from '../../config/share';
import { visitHos, visitSeriesServe,visitAims, visitGetToken, addVisit, visitUpload, visitGeo } from '../../api/sendRequest';
import { depList } from '../../api/staticRequest';
import { Datetime, Group, PopupRadio  } from 'vux';
import { Uploader  } from 'vant';
import { mapState, mapMutations } from 'vuex';
import * as qiniu from 'qiniu-js';
export default {
    data(){
        return {
            time_value:'请选择',
            hos_list: [],
            hos_id:'请选择',
            dep_name:'',
            products: [],
            products_name:[],
            products_id:[],
            prod_tag:false,
            product:'请选择',
            visit_ways: [{
                key: '1',
                value: '电话拜访'
            }, {
                key: '2',
                value: '当面拜访'
            }, {
                key: '3',
                value: '聊天软件拜访'
            }, {
                key: '4',
                value: '其他'
            }],
            visit_way:'当面拜访',
            aims: [],
            aim:'请选择',
            fileList:[],
            config:{},
        }
    },
    computed:{
        ...mapState([
            'user_info',
            'visit_data'
        ]),
    },
    components:{
        Datetime, Group, PopupRadio ,Uploader
    },
    mounted(){
        this.getServeHos();
        this.getServeProducts();
        this.getVisitAims();
        this.getToken();
        // 科室名字
        depList.then(res => {
            res.depList.map((item,index) => {
                if(this.visit_data.v_dep_id == item.id){
                    this.dep_name = item.depName;
                }
            })
        });
        // 初始化相册列表
        this.fileList = [...this.visit_data.v_pics];
    },
    methods:{
        ...mapMutations([
			'SET_VISIT',
            'SET_VISIT_IMG',
            'DELETE_VISIT_IMG'
		]),
        // 设置state
        setValue(type,value){
            this.SET_VISIT({type,value});
        },
        async getLocal(type){
            let res = await visitGeo(this.user_info.yyid,this.user_info.user_token,'39.912567','116.445677');
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            let value = res.data.desc;
            this.SET_VISIT({type,value});
        },
        // 获取服务医院
        async getServeHos(){
            let res = await visitHos(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            if(res.data.list.length !== 0){
                res.data.list.map(item => {
                    this.hos_list.push({
                        key:item.id,
                        value:item.name
                    })
                })
            };
        },
        // 获取服务产品
        async getServeProducts(){
            let res = await visitSeriesServe(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.products = [...res.data.list];
            this.products.map((item,index) => {
                if(this.visit_data.v_product[index] == item.id){
                    this.products_name.push(item.name);
                    this.products_id.push(item.id);
                }
            })
        },
        // 拜访目的
        async getVisitAims(){
            let res = await visitAims(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            if(res.data.aims.length !== 0){
                res.data.aims.map(item => {
                    this.aims.push({
                        key:item.id,
                        value:item.name
                    })
                })
            };
        },
        // 选产品
        selectProd(id,name){
            if(this.products_id.length === 0){
                this.products_name.push(name);
                this.products_id.push(id)
            } else {
                if(this.products_id.indexOf(id) == -1){
                    this.products_name.push(name);
                    this.products_id.push(id)
                } else {
                    this.products_name.splice(this.products_name.indexOf(name),1);
                    this.products_id.splice(this.products_id.indexOf(id),1);
                }
            }
        },
        completeProd(){
            let type = 4;
            let value = this.products_id;
            this.SET_VISIT({type,value});
            this.prod_tag = false;
        },
        async getToken(){
            let res = await visitGetToken(this.user_info.yyid,this.user_info.user_token,2,'visit');
            this.config = { ...res.data.config };
        },
        uploadFile(obj){
            const config = this.config
            const { file } = obj
            let key = config.path
            const fileName = file.name
            key = key + fileName;

            const uploadConfig = {
                useCdnDomain: true, // 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                region: qiniu.region.z0,
                uphost: config.uploadUrl
            };
            const putExtra = {}
            const observable = qiniu.upload(file, key, config.token, putExtra, uploadConfig);
            const next = () => {}
            const error = err => this.uploadError(err)
            const complete = res => this.uploadSuccess(res)
            const subscription = observable.subscribe(next, error, complete)
            return subscription
        },
        uploadSuccess(res){
            const bucket = this.$data.config.bucket
            const url = this.$data.config.baseUri
            const key = res.key
            const fileName = res.key.split('/').pop()
            const fileUrl = `${url}/${key}`
            const me = this
            visitUpload(this.user_info.yyid,this.user_info.user_token,bucket,key, fileName, fileUrl).then(resp => {
                const id = resp.data.info.id
                const data = {
                    id: id,
                    name: fileName,
                    url: fileUrl
                }
                this.fileList.push(data);
                this.SET_VISIT_IMG(this.fileList);
                me.$emit('uploadSuccess', data);
            })
        },
        uploadError(err) {
            this.$emit('uploadFail', err)
        },
        afterRead(file) {
        // 此时可以自行将文件上传至服务器
            this.uploadFile(file);
            // console.log(file)
        },
        beforeDelete(file){
            this.visit_data.v_pics.map((item,index) => {
                if(item.id == file.id){
                    this.visit_data.v_pics.splice(index,1);
                    this.DELETE_VISIT_IMG(this.visit_data.v_pics);
                }
            })
        },
        // 写入事项
        writeContent(e,type){
            let value = e.target.value;
            this.SET_VISIT({type,value});
        },
        // 添加拜访记录
        async addNewVisit(){
            let visit_data = this.visit_data;
            let img_id = [];
            visit_data.v_pics.length === 0?[]:visit_data.v_pics.map(item => {
                img_id.push(item.id);
            })
            if(visit_data.v_time == "请选择"){
                this.$vux.toast.text('请选择拜访时间');
                return
            }
            if(visit_data.v_hos == "请选择"){
                this.$vux.toast.text('请选择拜访医院');
                return
            }
            if(visit_data.v_dep_id == "请选择"){
                this.$vux.toast.text('请选择拜访科室');
                return
            }
            if(visit_data.v_product.length == 0){
                this.$vux.toast.text('请选择相关产品');
                return
            }
            if(visit_data.v_way == "请选择"){
                this.$vux.toast.text('请选择拜访方式');
                return
            }
            if(visit_data.v_way == "请选择"){
                this.$vux.toast.text('请选择拜访目的');
                return
            }
            if(visit_data.v_main == ""){
                this.$vux.toast.text('请输入主要事宜');
                return
            }
            if(visit_data.v_result == ""){
                this.$vux.toast.text('请输入拜访结果');
                return
            }
            let res = await addVisit(
                this.user_info.yyid,
                this.user_info.user_token,
                visit_data.v_time,
                visit_data.v_hos,
                visit_data.v_dep_id,
                JSON.stringify(visit_data.v_product),
                visit_data.v_way,
                visit_data.v_aims,
                visit_data.v_main,
                visit_data.v_result,
                visit_data.v_next,
                visit_data.v_mark,
                JSON.stringify(img_id),
                '39.912567',
                '116.445677',
                visit_data.v_pos,
            );
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            window.sessionStorage && window.sessionStorage.removeItem('visit_data');
            this.$router.push({
                path:'/helper'
            })
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
    .v_dep{
        a{
            color: #BBBBBB;
        }
    }
    .gps{
        .flex_item{
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