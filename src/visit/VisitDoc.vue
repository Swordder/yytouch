<template>
    <div class="visit_doc" data-name="visit_doc">
        <div class="search_bar">
            <search 
            placeholder="搜索医生" 
            v-model.trim="search_value" 
            auto-scroll-to-top ref="search"
            @on-change="change"
            ></search>
        </div>
        <div class="docs">
            <swipeout>
                <swipeout-item :threshold=".5" @click.native="checkDoc(item.id)" underlay-color="#ccc" v-for="item in doc_list" :key="item.id">
                    <div slot="right-menu">
                        <swipeout-button @click.native="onButtonClick('edit',item.id)" background-color="#5870FE">编辑</swipeout-button>
                        <swipeout-button @click.native="deleteShow(item.id)" background-color="#F65B6A">删除</swipeout-button>
                        <!-- <swipeout-button @click.native="onButtonClick('delete',item.id)" background-color="#F65B6A">删除</swipeout-button> -->
                    </div>
                    <div slot="content" class="demo-content vux-1px-tb">
                        <i v-if="checklist.indexOf(item.id) == -1" class="iconfont">&#xe69c;</i>
                        <i v-else class="iconfont blue">&#xe620;</i>
                        <div class="staff_info flex_item bd_bt">
                            <div class="avatar">
                                <img :src="item.head_img_url" alt="">
                            </div>
                            <div class="staff_name">
                                <p>{{item.name}}</p>
                                <p class="font_10">{{item.hospital_name}}</p>
                            </div>
                        </div>
                        <!-- <checklist label-position="left" required :options="doc_list" v-model="checklist"></checklist> -->
                    </div>
                </swipeout-item>
            </swipeout>
            <p class="empty_show" v-show="result_flag">暂无医生可选择，请新增~</p>
        </div>
        <transition name="showcover">
			<div class="back_cover" v-show="show_cover" @click="show_cover = false"></div>
		</transition>
        <div v-show="show_cover" class="popover_item">
			<h2>确定删除该医生吗？</h2>
            <div class="doc_btns flex_item">
                <button class="btn_common" @click="show_cover = false">取消</button>
                <button class="btn_common" @click="onButtonClick('delete',delete_id)">确定</button>
            </div>
        </div>
        <div class="cer_btn flex_item">
            <router-link :to="{path:'/visitDocAdd',query:{hos_id:this.$route.query.hos_id,dep_id:this.$route.query.dep_id}}" class="btn_common add_btn">+新增</router-link>
            <button @click="backLast" class="btn_common">确定</button>
        </div>
    </div>
    
</template>
<script>
import { Checklist, Search, Swipeout, SwipeoutItem, SwipeoutButton, } from 'vux';
import { getSessionStore } from '../../config/util.js';
import { getDocList,deleteDoc } from '../../api/sendRequest';
import { mapState,mapMutations } from 'vuex';
import _ from 'lodash';
export default {
    data(){
        return {
            doc_list:[],
            search_arr:[],
            checklist:[],
            search_value:'',
            result_flag:false,
            show_cover:false,
            delete_id:'',
        }
    },
    computed:{
        ...mapState([
            'user_info',
            'visit_data'
        ]),
    },
    mounted(){
        this.getDocs();
        let obj = JSON.parse(getSessionStore('yy_visit_data'));
        if(obj&&obj.v_docs.length !== 0){
            let type = 15;
            let value = obj.v_docs;
            this.SET_VISIT({type,value});
            obj.v_docs.map(item => {
                this.checklist.push(item.id);
            })
        } 
        // this.checklist = this.visit_data.v_dep_id;
        
        // if(!this.$route.query.v_dep_type){
        //     let type = 3;
        //     let value = this.visit_data.v_dep_id;
        //     this.SET_VISIT({type,value});
        //     this.checklist = [this.visit_data.v_dep_id];
        // } else {
        //     this.checklist = []
        // }
        // depList.then(res => {
        //     res.depList.map((item,index) => {
        //         this.dep_list.push({
        //             key:item.id,
        //             value:item.depName
        //         })
        //     })
        // })
    },
    computed:{
        ...mapState([
            'user_info',
            'visit_data',
        ]),
    },
    components:{
        Checklist,
        Search,
        Swipeout, 
        SwipeoutItem, 
        SwipeoutButton
    },
    methods:{
        ...mapMutations([
            'INIT_VISTI',
            'SET_VISIT',
        ]),
        // 获取当前服务的医生列表
        async getDocs(){
            this.doc_list = [];
            let res = await getDocList(this.user_info.yyid,this.user_info.user_token,this.$route.query.hos_id,this.search_value);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            if(res.data.length === 0){
                this.doc_list = [];
                this.result_flag = true;
                return
            } else {
                this.doc_list = [...res.data];
                this.result_flag = false;
            }
        },
        // 选择医生
        async checkDoc(id){
            if (this.checklist.length === 0) {
                this.checklist.push(id);
            } else {
                if (this.checklist.indexOf(id) != -1) {
                    this.checklist.splice(this.checklist.indexOf(id),1);
                } else {
                    this.checklist.push(id);
                }
            }
        },
        // 操作
        async onButtonClick(type,id){
            if (type === 'delete') {
                let res = await deleteDoc(this.user_info.yyid,this.user_info.user_token,id);
                if(res.errcode != 0){
                    this.$vux.toast.text(res.errmsg,'top');
                    return
                };
                this.show_cover = false;
                this.getDocs();
            } else if (type === 'edit') {
                this.$router.push({
                    path:'/visitDocAdd',
                    query:{
                        hos_id:this.$route.query.hos_id,
                        dep_id:this.$route.query.dep_id,
                        doctor_id:id,
                        type:'edit'
                    }
                })
            }
        },
        change:_.debounce(function(){
            this.getDocs()
        },1000),
        deleteShow(id){
            this.delete_id = id;
            this.show_cover = true;
        },
        backLast(){
            let docs_str = [];
            if (this.checklist.length !== 0) {
                for(let i = 0; i < this.doc_list.length; i++){
                    if (this.checklist.indexOf(this.doc_list[i].id) != -1 ) {
                        docs_str.push({
                            id:this.doc_list[i].id,
                            name:this.doc_list[i].name
                        })
                    }
                }
            }
            let type = 15;
            let value = docs_str;
            this.SET_VISIT({type,value});
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
    .visit_doc{
        .search_bar{
            width: 100%;
            height: 48px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 8;
            background-color: #ffffff;
            .vux-search-box{
                height: 48px;
                padding-bottom: 0;
                border-bottom: 0;
                .weui-search-bar{
                    background-color: #ffffff;
                    border-bottom: 1px solid #f5f5f5;
                    .weui-search-bar__form{
                        border-radius: 18px;
                        &:after{
                            border: none 0;
                        }
                        .weui-search-bar__box,
                        .weui-search-bar__label{
                            background-color: #F4F4F4;
                            border-radius: 18px;
                            line-height: 24px;
                        }
                    }
                }
            }
        }
        .weui-cells{
            .weui-cell{
                padding: 10px 15px;
            }
        }
        .weui-search-bar__cancel-btn{
            color: #5870FE;
        }
        .cer_btn{
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            padding: 10px 15px;
            background-color: #ffffff;
            button{
                flex: 1;
                background-color: #5870FE;
                color: #ffffff;
            }
            .add_btn{
                width: 125px;
                background-color: #ffffff;
                color: #5870FE;
                margin-right: 10px;
            }
        }
    }
    .weui-cell__bd{
        font-size: 14px;
    }
    .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
        color: #5870FE !important;
    }
    .back_cover{
        top: 0;
        bottom: 0;
        z-index: 9;
    }
    .popover_item{
        width: 285px;
        padding-top: 20px;
        text-align: center;
        background-color: #ffffff;
        border-radius: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 10;
        h2{
            font-size: 18PX;
            line-height: 30px;
        }
        .doc_btns{
            padding: 0 20px;
            button:nth-of-type(1){
                background-color: #ffffff;
                border-color: #5870FE;
                color: #5870FE;
                margin-right: 10px;
            }
        }
        button{
            width: 160px;
            color: #ffffff;
            background-color: #5870FE;
            margin-bottom: 20px;
            margin-top: 20px;
        }
    }
    .docs{
        padding: 52px 0 60px;
        .empty_show{
            text-align: center;
            line-height: 40px;
        }
        .demo-content{
            display: flex;
            vertical-align: middle;
            padding:0 15px;
            justify-content: flex-start;
            .iconfont{
                color: #C4C9D2;
                line-height: 64px;
            }
            .blue{
                color: #5870FE;
            }
            .staff_info{
                padding: 4px 0;
                flex: 1;
                justify-content: flex-start;
                align-items: center;
                .avatar{
                    width: 44px;
                    height: 44px;
                    border-radius: 8px;
                    margin-left: 14px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 8px;
                    }
                }
                .staff_name{
                    margin-left: 10px;
                    p:nth-of-type(2){
                        display: inline-block;
                        color: #ffffff;
                        background-color: #4ED79C;
                        padding: 2px 5px;
                        border-radius: 2px;
                        transform-origin: left;
                        margin-top: 4px;
                    }
                }
            }
        }
    }
    
</style>