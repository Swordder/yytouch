<template>
    <div class="visit_list" data-name="visit_dep">
        <div class="search_bar">
            <search 
            placeholder="搜索科室" 
            v-model.trim="search_value" 
            auto-scroll-to-top ref="search"
            @on-change="change"
            ></search>
        </div>
        <div class="deps">
            <checklist label-position="left" :max=1 required :options="dep_list" v-model="checklist"></checklist>
            <p class="empty_show" v-show="result_flag">暂无科室可选择，请新增~</p>
        </div>
        <div class="cer_btn flex_item">
            <button @click="backLast" class="btn_common">确定</button>
        </div>
    </div>
</template>
<script>
import { Checklist, Search } from 'vux';
import { setSessionStore,getSessionStore } from '../../config/util.js';
import { depList,depServe } from '../../api/sendRequest';
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
        ]),
    },
    mounted(){
        this.getDepList();
    },
    computed:{
        ...mapState([
            'user_info',
            // 'visit_data',
        ]),
    },
    components:{
        Checklist,
        Search
    },
    methods:{
        // 获取当前服务的科室列表
        async getDepList(){
            this.dep_list = [];
            let res = await depList(this.user_info.yyid,this.user_info.user_token,this.search_value);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            let arr = res.data.list;
            if(arr.length === 0){
                this.result_flag = true;
                return
            } else {
                this.result_flag = false;
            }
            arr.map((item) => {
                this.dep_list.push({
                    key:item.id,
                    value:item.name
                })
            });
            let obj = JSON.parse(getSessionStore('doc_dep'));
            if(obj){
                this.checklist = [obj.key];
            } 
        },
        change:_.debounce(function(){
            this.getDepList()
        },1000),
        backLast(){
            if (this.checklist.length === 0) {
                this.$vux.toast.text('请选择科室','top');
                return
            }
            if(this.checklist.length !== 0){
                this.dep_list.map((item,index) => {
                    if (this.checklist[0] == this.dep_list[index].key) {
                        setSessionStore('doc_dep',{...this.dep_list[index]});
                    }
                })
            }
            this.$router.go(-1);
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
    .deps{
        padding: 44px 0 60px;
        .empty_show{
            text-align: center;
            line-height: 40px;
        }
    }
    
</style>