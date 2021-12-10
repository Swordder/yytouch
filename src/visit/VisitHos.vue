<template>
    <div class="visit_list" data-name="visit_hos_list">
        <div class="search_bar">
            <search 
            placeholder="搜索医院" 
            v-model.trim="search_value" 
            auto-scroll-to-top ref="search"
            @on-change="change"
            ></search>
        </div>
        <div class="deps">
            <checklist label-position="left" :max="1" required :options="hos_list" v-model="checklist"></checklist>
            <p class="empty_show" v-show="result_flag">无符合条件的结果哦~</p>
        </div>
        <div class="cer_btn flex_item" @click="backLast">
            <button class="btn_common">确定</button>
        </div>
    </div>
</template>
<script>
import { visitHos } from '../../api/sendRequest';
import { Checklist, Search } from 'vux';
import { setSessionStore,getSessionStore } from '../../config/util.js';
import _ from 'lodash';
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {
            hos_list:[],
            hos_id:'',
            checklist:[],
            search_value:'',
            result_flag:false
        }
    },
    mounted(){
        
        this.getHosList();
    },
    computed:{
        ...mapState([
            'user_info',
            'visit_check_in',
        ]),
    },
    components:{
        Checklist,
        Search
    },
    methods:{
        ...mapMutations([
            'SET_VISIT_CI',
            
        ]),
        async getHosList(){
            let res = await visitHos(this.user_info.yyid,this.user_info.user_token,this.search_value);

            res.data?res.data.list.map((item) => {
                this.hos_list.push({
                    key:item.id,
                    value:item.name
                })
            }):this.hos_list = [];
            if (this.hos_list.length === 0) {
                this.result_flag = true;
            } else {
                this.result_flag = false;
            }
            this.hos_id = this.visit_check_in.v_hos_id?this.visit_check_in.v_hos_id:'';
            if(this.hos_id){
                this.checklist.splice(0,1,this.hos_id);
            } else {
                this.checklist = [];
            }
        },

        change:_.debounce(function(){
            this.hos_list = [];
            this.getHosList()
        },1000),
        backLast(){
            
            // setSessionStore('v_hos_id',this.checklist.toString());
            if(this.checklist.length === 0){
                {
                    let type = 2;
                    let value = '请选择';
                    this.SET_VISIT_CI({type,value})    
                }
                {
                    let type = 3;
                    let value = '';
                    this.SET_VISIT_CI({type,value})    
                }
            } else {
                this.hos_list.map(item => {
                    if(item.key == this.checklist.toString()){
                        {
                            let type = 2;
                            let value = item.value;
                            this.SET_VISIT_CI({type,value})
                        }
                        {
                            let type = 3;
                            let value = item.key;
                            this.SET_VISIT_CI({type,value})
                        }
                        
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