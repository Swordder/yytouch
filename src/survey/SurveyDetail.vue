<template>
    <div class="survey_detail">
        <div class="detail_data">
            <div class="detail_hd flex_item">
                <h1>{{name}}</h1>
                <router-link :to="{path:'/surveyInvite',query:{paper_yyid:this.$route.query.paper_yyid}}" v-show="invite_more == 1">发起邀请</router-link>
            </div>
            <div class="detail_bd">
                <p class="m_b">总计 {{nums.invite_quota}}个</p>
                <p class="m_b">已作答 {{nums.answered}}个</p>
                <p>作废 {{nums.invalid}}个</p>
                <p>未邀请 {{nums.rest_invite}}个</p>
            </div>
        </div>
        <div class="list">
            <x-table :cell-bordered="false" style="background-color:#fff;">
                <thead>
                    <tr>
                        <th>微信名称</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.invitee_openid">
                        <td>{{item.wechat_name}}</td>
                        <td v-if="item.status == 1" class="red">未作答</td>
                        <td v-else-if="item.status == 2" class="green">已作答</td>
                        <td v-else class="green">已作废</td>
                        <td>
                            <button v-if="item.status == 1" class="btn_common" @click="getNoticeAn(item.invitee_openid)">提醒作答</button>
                            <button v-else-if="item.status == 3" class="btn_common" @click="reInvite(item.invitee_openid)">重新邀请</button>
                        </td>
                    </tr>
                </tbody>
            </x-table>
            <div v-show="list.length === 0" class="item_empty_status">
                <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
                <p>暂无数据</p>
            </div>
        </div>
    </div>
</template>
<script>
import { XTable } from 'vux';
import { getQuInviteList,noticeAn,reinvite } from '../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            list:[],
            nums:{},
            name:'',
            invite_more:''
        }
    },
    components:{
        XTable
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getList();
    },
    methods:{
        async getList(){
            let res = await getQuInviteList(this.user_info.yyid,this.user_info.user_token,this.$route.query.paper_yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.invite_more = res.data.invite_more;
            this.name = res.data.paper_name;
            this.list = [...res.data.list];
            this.nums = {...res.data.statistical};
        },
        async getNoticeAn(yyid){
            let res = await noticeAn(this.user_info.yyid,this.user_info.user_token,this.$route.query.paper_yyid,yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            } else {
                this.$vux.toast.text('提醒成功','top');
                this.getList();
            }
        },
        async reInvite(yyid){
            let res = await reinvite(this.user_info.yyid,this.user_info.user_token,this.$route.query.paper_yyid,yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            } else {
                this.$vux.toast.text('重新邀请发送成功','top');
                this.getList();
            }
        },
    }
}
</script>
<style lang="less">
    .survey_detail{
        .detail_data{
            width: 100%;
            height: 176px;
            padding: 22px 15px;
            background-color: #5870FE;
            border-bottom: 56px solid #F5F5F5;
            // margin-bottom: 46px;
            .detail_hd{
                h1{
                    line-height: 36px;
                    font-size: 16PX;
                    color: #ffffff;
                }
                a{
                    border: none;
                    background-color: #ffffff;
                    border-radius: 18px;
                    color: #5870FE;
                    line-height: 36px;
                    padding: 0 12px;
                }
            }
            .detail_bd{
                padding: 20px;
                margin-top: 15px;
                background-color: #ffffff;
                overflow: hidden;
                p{
                    width: 50%;
                    padding-left: 18px;
                    position: relative;
                    // margin-bottom: 10px;
                    float: left;
                    &::before{
                        content: '';
                        position: absolute;
                        top: 5px;
                        left: 0;
                        width: 10px;
                        height: 10px;
                        border: 3px solid #5870FE;
                        border-radius: 50%;
                    }
                }
            }
        }
        .list{
            table{
                tr{
                    th{
                        color: #666666;
                        padding: 7px 0;
                        &::before{
                            border-bottom: none;
                        }
                    }
                    td:nth-of-type(1),
                    th:nth-of-type(1){
                        text-align: left;
                        padding-left: 15px;
                    }
                    td:nth-of-type(3),
                    th:nth-of-type(3){
                        text-align: right;
                        padding-right: 15px;
                    }
                    td{
                        padding: 7px 0;
                        &::before{
                            border-bottom: none;
                        }
                    }
                    .red{
                        color: #F65B6A;
                    }
                    .green{
                        color: #4ED79C;
                    }
                    .yellow{
                        color: #FF9D34;
                    }

                }
                tbody{
                    tr:nth-of-type(2n+1){
                        background-color: #F2F4FF;
                    }
                    button{
                        line-height: 30px;
                        color: #ffffff;
                        padding: 0 12px;
                        background-color: #5870FE;
                    }
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
    }
</style>
