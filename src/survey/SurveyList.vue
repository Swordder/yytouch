<template>
    <div class="survey_list">
        <tab :line-width="1" :custom-bar-width="getBarWidth">
            <tab-item selected @on-item-click="getList(1)">进行中</tab-item>
            <tab-item @on-item-click="getList(2)">已结束</tab-item>
        </tab>
        <div class="list">
            <div class="list_item flex_item">
                <h1>问卷名称</h1>
                <p>已邀请/可用/总量</p>
                <a href="javascript:;">操作</a>
            </div>
            <div class="list_item flex_item" v-for="item in list" :key="item.yyid">
                <h1>{{item.name}}</h1>
                <p>{{item.invited}} / {{item.rest_invite}} / {{item.invite_quota}}</p>
                <router-link class="btn_common" :to="{path:'/surveyDetail',query:{paper_yyid:item.yyid}}">查看</router-link>
            </div>
            <div v-show="list.length === 0" class="item_empty_status">
                <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
                <p>暂无数据</p>
            </div>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem } from 'vux';
import { getQuList } from '../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            list:[],
            getBarWidth: function (index) {
                return (index + 1) * 22 + 'px'
            }
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    components:{
        Tab, TabItem
    },
    mounted(){
        this.getList(1)
    },
    methods:{
        async getList(status){
            let res = await getQuList(this.user_info.yyid,this.user_info.user_token,status);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.list = [...res.data];
        },
        
    }
}
</script>
<style lang="less">
    .survey_list{
        .vux-tab .vux-tab-item.vux-tab-selected{
            color: #5870FE;
            border-bottom: #5870FE;
        }
        .vux-tab-bar-inner{
            background-color: #5870FE;
        }
        .list{
            .list_item{
                padding: 15px;
                line-height: 26px;
                // h1{
                //     font-weight: normal;
                // }
                p{
                    color: #666666;
                }
                a{
                    color: #ffffff;
                    background-color: #5870FE;
                    line-height: 26px;
                    padding: 0 12px;
                }
            }
            .list_item:nth-of-type(1){
                color: #666666;
                h1{
                    font-weight: normal;
                }
                a{
                    background: none;
                    color: #666666;
                }
            }
            .list_item:nth-of-type(2n){
                background-color: #F2F4FF;
            }
        }
        .item_empty_status{
            text-align: center;
            padding:30px 0 20px 0;
            color: #999999;
            img{
                width: 88px;
            }
        }
    }
</style>