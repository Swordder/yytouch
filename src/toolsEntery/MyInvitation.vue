<template>
    <div class="invitation">
        <ul class="tabs flex_item">
            <li 
            v-for="(item,index) in tab_list" 
            :key="index" 
            @click="changeTabs(item.value)"
            :class="{active:tab_type == item.value}">
                {{item.value}}({{item.key}})
            </li>
        </ul>
        <div class="member_list">
            <router-link :to="{path:'/invitationDetail',query:{member_yyid:item.member_yyid}}" class="member_list_item flex_item bd_bt" v-for="item  in invite_list" :key="item.member_yyid">
                <div class="wrap_avatar flex_item">
                    <div class="avatar">
                        <img :src="item.headimgurl?item.headimgurl:'http://img.youyao99.com/380C836AA106AFDB997D582D284EBF66.png'" alt="">
                    </div>
                    <span>{{item.name}}</span>
                    <span v-if="item.user_type == 0" class="status font_10 status_y">未认证</span>
                    <span v-else-if="item.user_type == 1" class="status font_10">代表</span>
                    <span v-else-if="item.user_type == 2" class="status font_10">医生</span>
                </div>
                <div class="note">{{item.created_time?item.created_time.split(' ')[0]:''}}</div>
            </router-link>
        </div>
        <div v-show="invite_list.length == 0" class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
        </div>
    </div>
</template>
<script>
import { inviteUsers } from '../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            tab_list:[],
            all_list:[],
            invite_list:[],
            doctor_list:[],
            agent_list:[],
            unknowns:[],
            tab_type:'全部'
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getInviteList()
    },
    methods:{
        async getInviteList(){
            let res = await inviteUsers(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.tab_list = [
                {
                    key:res.data.all.num,
                    value:'全部'
                },
                {
                    key:res.data.doctors.num,
                    value:'医生'
                },
                {
                    key:res.data.agents.num,
                    value:'代表'
                },
                {
                    key:res.data.unknowns.num,
                    value:'未认证'
                },
            ];
            this.all_list = [...res.data.all.members];
            this.invite_list = [...res.data.all.members];
            this.doctor_list = [...res.data.doctors.members];
            this.agent_list = [...res.data.agents.members];
            this.unknowns = [...res.data.unknowns.members];
        },
        changeTabs(type){
            switch (type) {
                case '全部':
                    this.invite_list = [...this.all_list];
                    this.tab_type = '全部';
                    break;
                case '医生':
                    this.invite_list = [...this.doctor_list];
                    this.tab_type = '医生';
                    break;
                case '代表':
                    this.invite_list = [...this.agent_list];
                    this.tab_type = '代表';
                    break;
                case '未认证':
                    this.invite_list = [...this.unknowns];
                    this.tab_type = '未认证';
                    break;
                default:
                    this.invite_list = [...this.all_list];
                    this.tab_type = '全部';
                    break;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.invitation{
    .tabs{
        margin: 15px 15px 0;
        background-color: #F7F7F7;
        border-radius: 18px;
        text-align: center;
        li{
            color: #999999;
            line-height: 36px;
            flex: 1;
            border-radius: 18px;
        }
        .active{
            background-color: #5870FE;
            color: #ffffff;
        }
    }
    .member_list{
        background-color: #ffffff;
        padding: 0 15px;
        .member_list_item{
            padding: 10px 0;
            .wrap_avatar{
                line-height: 30px;
                .avatar{
                    width: 30px;
                    height: 30px;
                    border-radius: 4px;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 4px;
                    }
                }  
                .status{
                    height: 20px;
                    line-height: 20px;
                    margin-top: 5px;
                    border-radius: 2px;
                    color: #ffffff;
                    margin-left: 10px;
                    background-color: #5870FE;
                    padding: 0 5px;
                }
                .status_y{
                    background-color: #FF982A;
                }
            }
            .note{
                text-align: right;
                margin-top: 5px;
                color: #999999;
                span{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    margin-left: 6px;
                    border-radius: 50%;
                    background-color: #5870FE;
                    color: #ffffff;
                }
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
</style>