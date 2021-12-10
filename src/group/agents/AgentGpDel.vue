<template>
    <div class="agent_gp_del" data-name="agent_gp_del">
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
                :key="item.openid"
                @click="checkList(item.openid)">
                    <i v-show="check_list.indexOf(item.openid) == -1" class="iconfont">&#xe69c;</i>
                    <i v-show="check_list.indexOf(item.openid) != -1" class="iconfont blue">&#xe620;</i>
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
                <button class="btn_common" @click="showModal">确定删除？</button>
            </div>
        </template>
        <transition name="showcover">
			<div class="back_cover" v-show="modal_type" @click="showModal('')"></div>
		</transition>
        <div v-show="modal_type" class="popover_item delete_group">
            <div class="group_name">
                <h4>删除成员</h4>
                <p>你确定要删除成员吗？</p>
            </div>
            <button class="btn_common" @click="delMember">确定</button>
        </div>
    </div>
</template>
<script>
import { agentGpMemberList,agentGpDeleteAgents } from '../../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            data_list:[],
            check_list:[],
            all_tag:false,
            modal_type:false
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
            }
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
                this.check_list.push(item.openid)
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
        async delMember(){
            
            let res = await agentGpDeleteAgents(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid,this.check_list.toString());
            let _this = this;
            if(res.errcode == 0){
                _this.$vux.toast.text('移除成功','top');
                _this.showModal();
                setTimeout(function(){
                    _this.$router.go(-1);
                },1500);
            } else {
                this.$vux.toast.text(res.errmsg,'top');
                return
            }
        },
        showModal(){
            if(this.check_list.length === 0){
                this.$vux.toast.text('请选择人员','top');
                return
            };
            this.modal_type = !this.modal_type;
        }
    }
}
</script>
<style lang="less">
    .agent_gp_del{
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
            background-color: #ffffff;
            button{
                width: 100%;
                line-height: 44px;
                background-color: #5870FE;
                color: #ffffff;
            }
        }
        .back_cover{
            top: 0;
        }
        .popover_item{
            width: 285px;
            text-align: center;
            background-color: #ffffff;
            border-radius: 8px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 12;
            .group_name{
                border-radius: 8px 8px 0 0;
                padding: 20px 27px;
                margin-bottom: 10px;
                h4{
                    font-size: 14PX;
                    margin-bottom: 10px;
                }
                p{
                    color: #666666;
                }
            }
            button{
                width: 160px;
                color: #ffffff;
                background-color: #5870FE;
                margin-bottom: 20px;
            }
        }
    }
</style>