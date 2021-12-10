<template>
    <div class="sear_compliance" data-name="doc_dep_list">
        <div class="search_bar bd_bt">
            <i class="iconfont search_icon">&#xe689;</i>
            <input 
                type="text" 
                class="search_input"
                v-model.trim="search_value" 
                placeholder="请输入关键字"
                @input="change"
            >    
            <span @click="cancel">取消</span>
        </div>
        <div class="compliance_con">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <router-link class="bd_bt" :to="{path:'/knowledgeDetail',query:{knowledge_yyid:item.id}}"><i class="iconfont">&#xe6fa;</i> <span>{{item.name}}</span></router-link>   
                </li>
            </ul>
            <p class="empty_show" v-show="result_flag">无符合条件的结果哦~</p>
        </div>
    </div>
</template>
<script>
import { Checklist, Search } from 'vux';
import { knowledgeSearch } from '../../api/sendRequest';
import _ from 'lodash';
import { mapState } from 'vuex'
export default {
    data(){
        return {
            list:[],
            search_value:'',
            result_flag:false
        }
    },
    mounted(){
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    components:{
        Checklist,
        Search
    },
    methods:{
        async getData(){
            if(this.search_value == ''){
                return
            };
            let res = await knowledgeSearch(this.user_info.yyid,this.user_info.user_token,this.search_value);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.list = [...res.data.list];
            if(this.list.length === 0){
                this.result_flag = true;
            } else {
                this.result_flag = false;
            }
        },
        // 搜索input防抖
        change:_.debounce(function(){
            this.getData()
        },1000),
        cancel(){
            this.list = [];
            this.search_value = [];
            this.result_flag = false;
        }
    }
}
</script>
<style lang="less">
    .sear_compliance{
        .search_bar{
            width: 100%;
            // height: 48px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            padding: 10px 15px;
            input{
                width: 85%;
                background-color: #F4F4F4;
                border: none;
                outline-style: none;
                line-height: 32px;
                border-radius: 16px;
                padding: 0 30px;
            }
            span,
            .iconfont{
                position: absolute;
                top: 12px;
                left: 20px;
                color: #cccccc;
            }
            span{
                left: auto;
                right: 15px;
                color: #546DFF;
            }
            // .vux-search-box{
            //     height: 48px;
            //     padding-bottom: 0;
            //     border-bottom: 0;
            //     .weui-search-bar{
            //         background-color: #ffffff;
            //         .weui-search-bar__form{
            //             border-radius: 18px;
            //             &:after{
            //                 border: none 0;
            //             }
            //             .weui-search-bar__box,
            //             .weui-search-bar__label{
            //                 background-color: #F4F4F4;
            //                 border-radius: 18px;
            //                 line-height: 24px;
            //             }
            //         }
            //         .weui-search-bar__cancel-btn{
            //             color: #5870FE;
            //         }
            //     }
            // }
        }
        .compliance_con{
            padding: 60px 15px 60px;
            .empty_show{
                text-align: center;
                line-height: 40px;
            }
            ul{
                li{
                    a{
                        display: block;
                        line-height: 44px;
                        .iconfont{
                            color: #DEE2E6;
                            font-size: 16PX;
                        }
                        display: block;
                    }
                }
            }
        }
    }
</style>