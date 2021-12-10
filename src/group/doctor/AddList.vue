<template>
    <div class="add_list" data-name="doc_add_list">
        <div class="group_add_title">我的医生服务组</div>
        <template v-if="data_list.length === 0">
            <div class="item_empty_status">
                <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
          </div>
        </template>
        <template v-else>
            <div class="check_all" @click="checkAll()">
                <i v-if="!all_tag" class="iconfont">&#xe69c;</i>
                <i v-else class="iconfont blue">&#xe620;</i>
                全选
            </div>
            <ul>
                <li
                class="flex_item" 
                v-for="item in data_list" 
                :key="item.member_yyid"
                @click="checkList(item.member_yyid)">
                    <i v-show="check_list.indexOf(item.member_yyid) == -1" class="iconfont">&#xe69c;</i>
                    <i v-show="check_list.indexOf(item.member_yyid) != -1" class="iconfont blue">&#xe620;</i>
                    <div class="staff_info flex_item bd_bt">
                        <div class="avatar">
                            <img :src="item.headimgurl" alt="">
                        </div>
                        <div class="staff_name">
                            <p>{{item.nickname?item.nickname:item.name}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="btns flex_item">
                <button class="btn_common" @click="rejectMember()">拒绝</button>
                <button class="btn_common" @click="addMember()">通过</button>
            </div>
        </template>
    </div>
</template>
<script>
import { joinList, addDgList, rejectDg } from '../../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            data_list:[],
            check_list:[],
            all_tag:false
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getJoinList();
    },
    methods:{
        async getJoinList(){
            let res = await joinList(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.data_list = [...res.data];
        },
        checkAll(){
            this.all_tag = !this.all_tag;
            if(this.check_list.length === this.data_list.length){
                this.check_list = [];
                return
            } 
            this.check_list = [];
            this.data_list.map((item,index) => {
                this.check_list.push(item.member_yyid)
            }); 
        },
        checkList(yyid){
            if(this.check_list.indexOf(yyid) != -1){
                this.check_list.splice(this.check_list.indexOf(yyid),1);
            } else {
                this.check_list.push(yyid)
            };
            if(this.check_list.length === this.data_list.length){
                this.all_tag = true
            } else {
                this.all_tag = false;
            }
        },
        async addMember(){
            if(this.check_list.length === 0){
                this.$vux.toast.text('请选择人员','top');
                return
            };
            let res = await addDgList(this.user_info.yyid,this.user_info.user_token,this.check_list.toString());
            if(res.errcode == 0){
                this.$router.push({
                    path:'/myDocGroup'
                })
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        async rejectMember(){
            if(this.check_list.length === 0){
                this.$vux.toast.text('请选择人员','top');
                return
            };
            let res = await rejectDg(this.user_info.yyid,this.user_info.user_token,this.check_list.toString());
            if(res.errcode == 0){
                this.getJoinList();
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        }
    }
}
</script>
<style lang="less">
    .add_list{
        padding-bottom: 85px;
        .group_add_title{
            color: #ffffff;
            padding: 0 15px;
            line-height: 52px;
            background-color: #5870FE;
        }
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
            button{
                line-height: 44px;
            }
            button:nth-of-type(1){
                width: 95px;
                margin-right: 10px;
            }
            button:nth-of-type(2){
                flex: 1;
                color: #ffffff;
                background-color: #5870FE;
            }
        }
    }
</style>