<template>
    <div class="visit_list" data-name="visit_dep_add">
        <div class="search_bar">
            <search 
            placeholder="搜索科室" 
            v-model.trim="search_value" 
            auto-scroll-to-top ref="search"
            @on-change="change"
            ></search>
        </div>
        <div class="deps">
            <checklist label-position="left" required :options="dep_list" v-model="checklist"></checklist>
            <p class="empty_show" v-show="result_flag">无符合条件的结果哦~</p>
        </div>
        <div class="cer_btn flex_item" @click="backLast">
            <button class="btn_common">确定</button>
        </div>
    </div>
</template>
<script>
import { Checklist, Search } from 'vux';
import { getSessionStore } from '../../config/util.js';
import { depList,addDepServe } from '../../api/sendRequest';
import { mapState,mapMutations } from 'vuex';
import _ from 'lodash';
export default {
    data(){
        return {
            dep_list:[],
            search_arr:[],
            checklist:[],
            search_value:'',
            result_flag:false
        }
    },
    computed:{
        ...mapState([
            'user_info',
            'visit_data'
        ]),
    },
    mounted(){
        let obj = JSON.parse(getSessionStore('yy_visit_data'));
        if(obj){
            this.INIT_VISTI(2,obj)
            this.checklist = obj.v_dep_id;
        } 
    },
    components:{
        Checklist,
        Search
    },
    methods:{
        ...mapMutations([
            'INIT_VISTI',
            'SET_VISIT',
        ]),
        async searchDep(){
            let res = await depList(this.user_info.yyid,this.user_info.user_token,this.search_value);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            let arr = res.data.list;
            if(arr.length === 0){
                result_flag = true;
                this.dep_list = [];
                return
            }
            for (var i = 0; i < arr.length; i++) {
                this.dep_list.push({
                    key:arr[i].id,
                    value:arr[i].name
                })
            };
        },
        change:_.debounce(function(){
            this.searchDep()
        },1000),
        // getResult (val) {
        //     let arr = [];
        //     let reg =  new RegExp(val);
        //     if(val === ''){
        //         this.search_arr = [];
        //         this.result_flag = false;
        //         return
        //     }
        //     for (var i = 0; i < this.dep_list.length; i++) {
        //         if (reg.test(this.dep_list[i].value)) {
        //             arr.push(this.dep_list[i]);
        //         }
        //     }
        //     if(arr.length === 0){
        //         this.result_flag = true;
        //     } else {
        //         this.result_flag = false;
        //     }
        //     this.search_arr = [...arr]
        // },
        async backLast(){
            let hos_id = this.visit_data.v_hos_id;
            // let type = 3;
            let _this = this;
            let value = this.checklist;
            let res = await addDepServe(this.user_info.yyid,this.user_info.user_token,hos_id,JSON.stringify(value));
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            // this.SET_VISIT({type,value});
            setTimeout(function(){
                _this.$router.go(-1);
            },500);
        }
    }
}
</script>
<style lang="less">
    .visit_list{
        .search_bar{
            width: 100%;
            height: 48px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
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
                width: 100%;
                background-color: #5870FE;
                color: #ffffff;
            }
        }
    }
    .weui-cell__bd{
        font-size: 14px;
    }
    .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
        color: #5870FE !important;
    }
    .deps{
        padding: 44px 0 60px;
        .empty_show{
            text-align: center;
            line-height: 40px;
        }
    }
    
</style>