<template>
    <div class="total_company" data-name="total_company">
        <div class="search_bar">
            <search 
            placeholder="搜索公司" 
            v-model.trim="search_value" 
            auto-scroll-to-top ref="search"
            @on-change="getResult"
            ></search>
        </div>
        <radio :options="radio_list" v-model="value" @on-change="change"></radio>
        <div class="empty_show">
            <p v-show="result_flag">未检索到您所在的公司~，请重新搜索</p>
        </div>
        <div class="cer_btn" @click="backLast">
            <button class="btn_common">确定</button>
        </div>
    </div>
</template>
<script>
import { Checklist, Search, Radio } from 'vux';
import { companyTotal } from '../../api/sendRequest';
import { setSessionStore } from '../../config/util.js';
import _ from 'lodash';
import { mapState } from 'vuex'
export default {
    data(){
        return {
            search_value:'',
            radio_list:[],
            value:'',
            result_flag:false
        }
    },
    computed:{
        ...mapState([
            'user_info',
            'company_list'
        ])
    },
    components:{
        Radio,
        Search
    },
    methods:{
        change (val, label) {
            this.value = val;
            if(this.$route.query.type == 1){
                setSessionStore('yy_other_com',val)
            } else {
                setSessionStore('yy_familiar_com',val)
            }
        },
        async getCompany(){
            let res = await companyTotal(this.user_info.yyid,this.user_info.user_token,this.search_value);
            if(res.data.length === 0){
                this.result_flag = true;
            } 
            if( this.search_value == ''){
                this.result_flag = false;
            }
            this.radio_list = [...res.data];
        },
        getResult:_.debounce(function(){
            this.getCompany()
        },1000),
        backLast(){
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
    .total_company{
        padding: 48px 0 60px;
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
                .weui-search-bar__cancel-btn{
                    color: #5870FE;
                }  
            }
        }
        .weui-cells_radio{
            .weui-cell{
                padding: 10px 15px;
            }
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
        .empty_show{
            text-align: center;
            line-height: 40px;
        }
    }
    .weui-cell__bd{
        font-size: 14px;
    }
    .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
        color: #5870FE !important;
    }
</style>