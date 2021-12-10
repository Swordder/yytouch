<template>
    <div class="invite_doc_list" data-name="invite_doc_list">
        <div class="search_bar">
            <search 
            placeholder="搜索关键字" 
            v-model.trim="search_value" 
            auto-scroll-to-top ref="search"
            @on-change="change"
            ></search>
        </div>
        <div class="list">
            <ul>
                <li class="bd_bt flex_item" v-for="(item,index) in list" :key="index">
                    <p>{{item.name}}</p>
                    <i v-if="item.is_followed == 1" @click="sendMsg(item.openid)" class="iconfont">&#xe637;</i>
                    <p v-else>未关注</p>
                </li>
            </ul>
            <p v-show="list.length === 0" class="empty_show">无符合条件的结果哦~</p>
        </div>
    </div>
</template>
<script>
import { Search } from 'vux';
import { getQuDocList,sendInvite } from '../../api/sendRequest';
import _ from 'lodash';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            search_value:'',
            list:[],
        }
    },
    mounted(){
        this.getList()
    },
    computed:{
        ...mapState([
            'user_info',
        ]),
    },
    components:{
        Search
    },
    methods:{
        async getList(){
            let res = await getQuDocList(this.user_info.yyid,this.user_info.user_token,this.$route.query.paper_yyid,this.search_value);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.list = [...res.data];
        },
        // 搜索input防抖
        change:_.debounce(function(){
            this.getList()
        },1000),
        async sendMsg(openid){
            let res = await sendInvite(this.user_info.yyid,this.user_info.user_token,this.$route.query.paper_yyid,openid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            } else {
                this.getList();
                this.$vux.toast.text('邀请发送成功','top');
            }
        }
    }
}
</script>
<style lang="less">
    .invite_doc_list{
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
                    .weui-search-bar__cancel-btn{
                        color: #5870FE;
                    }
                }
            }
        }
        .list{
            padding: 44px 15px 60px;
            .empty_show{
                text-align: center;
                line-height: 40px;
            }
            ul{
                li{
                    line-height: 44px;
                    .iconfont{
                        font-size: 24PX;
                        color: #5870FE;
                    }
                }
            }
        }
    }
</style>