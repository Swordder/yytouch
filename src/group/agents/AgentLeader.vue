<template>
    <div class="agent_gp_member" data-name="agent_gp_member">
        <template v-if="data_list.length === 0">
            <div class="item_empty_status">
                <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
          </div>
        </template>
        <template v-else>
            <ul>
                <li
                class="flex_item" 
                v-for="item in data_list" 
                :key="item.member_yyid"
                @click="checkList(item.member_yyid)">
                    <i v-if="check_yyid == item.member_yyid" class="iconfont blue">&#xe620;</i>
                    <i v-else class="iconfont">&#xe69c;</i>
                    <div class="staff_info flex_item bd_bt">
                        <div class="avatar">
                            <img :src="item.headimgurl" alt="">
                        </div>
                        <div class="staff_name">
                            <p>{{item.name == null?item.nickname:item.name}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="btns flex_item">
                <button class="btn_common" @click="changeLeader()">确定</button>
            </div>
        </template>
    </div>
</template>
<script>
import { agentGpMemberList,agentGpChangeLeader } from '../../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            data_list:[],
            check_yyid:'',
        }
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
            let res = await agentGpMemberList(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.data_list = [...res.data];
        },
        checkList(yyid){
            this.check_yyid = yyid;
        },
        async changeLeader(){
            if(this.check_yyid == ''){
                this.$vux.toast.text('请选择人员','top');
                return
            };
            let res = await agentGpChangeLeader(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid,this.check_yyid);
            let _this = this;
            if(res.errcode == 0){
                _this.$vux.toast.text('群主已更换成功','top');
                setTimeout(function(){
                    _this.$router.go(-1);
                },1500);
            } else {
                this.$vux.toast.text(res.errmsg,'top');
                return
            }
        },
    }
}
</script>
<style lang="less" scoped>
.agent_gp_member{
    padding-bottom: 80px;
    .item_empty_status{
        text-align: center;
        padding:30px 0 20px 0;
        color: #999999;
        img{
            width: 88px;
        }
    }
    .check_all{
        line-height: 44px;
        padding: 0 15px;
        border-bottom: 10px solid #F5F5F5;
        .iconfont{
            color: #C4C9D2;
        }
        .blue{
            color: #5870FE;
        }
    }
    .iconfont{
        font-size: 16PX;
        margin-right: 15px;
    }
    ul{
        li{
            vertical-align: middle;
            padding:0 15px;
            justify-content: flex-start;
            .iconfont{
                color: #C4C9D2;
                line-height: 67px;
            }
            .blue{
                color: #5870FE;
            }
            .staff_info{
                padding: 10px 0;
                flex: 1;
                justify-content: flex-start;
                align-items: center;
                .avatar{
                    width: 44px;
                    height: 44px;
                    border-radius: 8px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 8px;
                    }
                }
                .staff_name{
                    margin-left: 10px;
                    p:nth-of-type(2){
                        color: #ffffff;
                        background-color: #4ED79C;
                        padding: 2px 5px;
                        border-radius: 2px;
                        transform-origin: left;
                        margin-top: 4px;
                    }
                }
            }
        }
    }
    .btns{
        width: 100%;
        padding: 18px 15px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #ffffff;
        button{
            width: 100%;
            line-height: 44px;
            background-color: #5870FE;
            color: #ffffff;
        }
    }
}
</style>