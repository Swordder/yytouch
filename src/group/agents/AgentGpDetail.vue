<template>
    <div class="agent_gp_detail" data-name="agent_gp_detail">
        <div class="detail_top " :class="{detail_top_height:(detail_data.vote_status == 0&&detail_data.has_voted == 0&&detail_data.is_leader !=1)}">
            <div class="gp_name flex_item">
                <h1>{{detail_data.group_name}}</h1>
                <router-link :to="{path:'/agentGpInfo',query:{group_yyid:this.$route.query.group_yyid}}"><i class="iconfont">&#xe618;</i></router-link>
            </div>
            <div class="prod">负责产品：<span class="font_10">{{detail_data.series_name?detail_data.series_name:'无数据'}}</span></div>
        </div>
        <div v-show="(detail_data.vote_status == 0&&detail_data.has_voted == 0&&detail_data.is_leader !=1)" class="vote">
            <h2>投票</h2>
            <p>你是否同意贡献{{detail_data.vote_tax_rate}}的积分用于群组的日常管理使用?</p>
            <div class="btns flex_item">
                <button class="btn_common" @click="voteState(2)">不同意</button>
                <button class="btn_common" @click="voteState(1)">同意</button>
            </div>
        </div>
        <div class="member_list">
            <div class="member_list_item flex_item bd_bt" v-for="item in list" :key="item.openid">
                <div class="wrap_avatar flex_item">
                    <div class="avatar">
                        <img :src="item.headimgurl" alt="">
                    </div>
                    <span>{{item.name}}</span>
                </div>
                <div class="note">
                    服务的医院个数
                    <span v-if="Number(item.hospital_num) > 99">99+</span>
                    <span v-else>{{item.hospital_num}}</span>
                </div>
            </div>
        </div>
        <div v-show="list.length === 0" class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
        </div>
    </div>
</template>
<script>
import { agentGpDetail,agentGpVote,agentGpMbList } from '../../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            list:[],
            detail_data:{}
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getList();
        this.getDetail();
    },
    methods:{
        async getList(){
            let res = await agentGpMbList(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.list = [...res.data];
        },
        async getDetail(){
            let res = await agentGpDetail(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.detail_data = {...res.data};
        },
        async voteState(type){
            let res = await agentGpVote(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid,this.detail_data.vote_yyid,type);
            if(res.errcode == 0){
                this.getDetail();
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
    }
}
</script>
<style lang="less">
.agent_gp_detail{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #F5F5F5;
    .detail_top{
        padding: 15px;
        background-color: #5870FE;
        color: #ffffff;
        .prod{
            span{
                background-color: #465FF4;
                padding: 3px 8px;
                border-radius: 10px 0 10px 0;
            }
        }
        .gp_name{
            margin-bottom: 4px;
            h1{
                font-size: 16PX;
                line-height: 30px;
            }
            a{
                text-align: center;
                display: inline-block;
                width: 22px;
                height: 22px;
                line-height: 22px;
                border-radius: 50%;
                background-color: #ffffff;
                color: #5870FE;
            }
        }
    }
    .detail_top_height{
        height: 200px;
    }
    .vote{
        padding: 15px 20px 20px;
        margin: -120px 15px 10px;
        border-radius: 8px;
        background-color: #ffffff;
        color: #5870FE;
        h2{
            text-align: center;
            font-size: 16PX;
            color: #5870FE;
        }
        p{
            margin: 10px 0;
        }
        .btns{
            .btn_common{
                flex: 1;
                color: #ffffff;
                border:none;
            }
            .btn_common:nth-of-type(1){
                background-color: #FF982A;
                margin-right: 25px;
            }
            .btn_common:nth-of-type(2){
                background-color: #5870FE;
            }
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
            }
            .note{
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