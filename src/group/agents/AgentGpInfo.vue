<template>
    <div class="agent_gp_info" data-name="agent_gp_info">
        <div v-if="detail_data.is_leader == 1" class="profile bgcw">
            <div class="flex_item bd_bt" @click="showModal('change_gp_name')">
                <div class="p_title">群名</div>
                <div class="p_con">{{detail_data.group_name}}<i class="iconfont">&#xe661;</i></div>
            </div>
            <router-link :to="{path:'/wxCode',query:{'group_yyid':this.$route.query.group_yyid,type_yyid:'531B7BD0B32FA6A56A6C520593BA675D'}}" class="flex_item bd_bt">
                <div class="p_title">群组二维码</div>
                <div class="p_con"><i class="iconfont">&#xe661;</i></div>
            </router-link>
            <div class="flex_item bd_bt" @click="showModal('notice')">
                <div class="p_title">群公告</div>
                <div class="p_con">{{detail_data.notice}}<i class="iconfont">&#xe661;</i></div>
            </div>
            <router-link :to="{path:'/agentGpMember',query:{'group_yyid':this.$route.query.group_yyid}}" class="flex_item bd_bt">
                <div class="p_title">群组长</div>
                <div class="p_con">{{detail_data.leader_name}}<i class="iconfont">&#xe661;</i></div>
            </router-link>
            <div class="flex_item bd_bt" @click="showModal('product')">
                <div class="p_title">负责的产品</div>
                <div class="p_con product">{{detail_data.series_name}}<i class="iconfont">&#xe661;</i></div>
            </div>
            <div class="flex_item bd_bt" @click="showModal('vote')">
                <div class="p_title">贡献消费积分设定</div>
                <div class="p_con">{{detail_data.current_tax_rate}}<i class="iconfont">&#xe661;</i></div>
            </div>
            <template>
              <div v-if="detail_data.vote_status == -1" class="flex_item bd_bt">
                <div class="p_title">投票</div>
                <div class="p_con">贡献积分投票未开始<i class="iconfont">&#xe661;</i></div>
              </div>
              <div v-else-if="detail_data.vote_status == 0" class="flex_item bd_bt" @click="showModal('vote_detail')">
                <div class="p_title">投票</div>
                <div class="p_con">贡献积分投票进行中<i class="iconfont">&#xe661;</i></div>
              </div>
              <div v-else-if="detail_data.vote_status == 1" class="flex_item bd_bt" @click="showModal('vote_detail')">
                <div class="p_title">投票</div>
                <div class="p_con">贡献积分投票已通过<i class="iconfont">&#xe661;</i></div>
              </div>
              <div v-else-if="detail_data.vote_status == 2" class="flex_item bd_bt" @click="showModal('vote_detail')">
                <div class="p_title">投票</div>
                <div class="p_con">贡献积分投票未通过<i class="iconfont">&#xe661;</i></div>
              </div>
              <div v-else-if="detail_data.vote_status == 3" class="flex_item bd_bt" @click="showModal('vote_detail')">
                <div class="p_title">投票</div>
                <div class="p_con">贡献积分投票已过期<i class="iconfont">&#xe661;</i></div>
              </div>
              <div v-else-if="detail_data.vote_status == 4" class="flex_item bd_bt" @click="showModal('vote_detail')">
                <div class="p_title">投票</div>
                <div class="p_con">贡献积分投票已停止<i class="iconfont">&#xe661;</i></div>
              </div>
            </template>

            <router-link :to="{path:'/agentGpList',query:{'group_yyid':this.$route.query.group_yyid,'type':1}}" class="flex_item bd_bt">
                <div class="p_title">待加入列表</div>
                <div class="p_con yellow_color">{{detail_data.join_num}}人<i class="iconfont">&#xe661;</i></div>
            </router-link>
        </div>
        <div v-else class="profile bgcw">
            <div class="flex_item bd_bt">
                <div class="p_title">群名</div>
                <div class="p_con">{{detail_data.group_name}}</div>
            </div>
            <router-link :to="{path:'/wxCode',query:{'group_yyid':this.$route.query.group_yyid,type_yyid:'531B7BD0B32FA6A56A6C520593BA675D'}}" class="flex_item bd_bt">
                <div class="p_title">群组二维码</div>
                <div class="p_con"><i class="iconfont">&#xe661;</i></div>
            </router-link>
            <div class="flex_item bd_bt">
                <div class="p_title">群公告</div>
                <div class="p_con">{{detail_data.notice}}</div>
            </div>
            <div class="flex_item bd_bt">
                <div class="p_title">群组长</div>
                <div class="p_con">{{detail_data.leader_name}}</div>
            </div>
            <div class="flex_item bd_bt">
                <div class="p_title">负责的产品</div>
                <div class="p_con">{{detail_data.series_name}}</div>
            </div>
            <div class="flex_item bd_bt">
                <div class="p_title">贡献消费积分设定</div>
                <div class="p_con">{{detail_data.current_tax_rate}}</div>
            </div>
        </div>
        <div class="member_btn flex_item">
            <router-link :to="{path:'/totalAgent',query:{'group_yyid':this.$route.query.group_yyid}}" class="btn_item add_member">
                <i class="iconfont">&#xe66e;</i>
                <p>添加成员</p>
            </router-link>
            <router-link :to="{path:'/agentGpDel',query:{'group_yyid':this.$route.query.group_yyid}}" v-show="detail_data.is_leader == 1" class="btn_item remove_member">
                <i class="iconfont">&#xe62d;</i>
                <p>移除成员</p>
            </router-link>
        </div>
        <div class="bottom_btn">
            <button v-if="detail_data.is_leader == 1" class="btn_common" @click="showModal('delete_group')">解散群组</button>
            <button v-else class="btn_common" @click="showModal('quit_group')">退出群组</button>
        </div>
        <transition name="showcover">
			<div class="back_cover" v-show="modal_type" @click="showModal('')"></div>
		</transition>
        <div v-show="modal_type == 'change_gp_name'" class="popover_item">
            <div class="group_name">
                <h4>群组名称</h4>
                <input type="text" v-model.trim="group_name" placeholder="请输入群组名称">
            </div>
            <button class="btn_common" @click="changeName">确定</button>
        </div>
        <div v-show="modal_type == 'notice'" class="popover_item">
            <div class="group_name">
                <h4>修改群公告</h4>
                <input type="text" v-model.trim="notice_value" placeholder="请输入群公告内容">
            </div>
            <button class="btn_common" @click="changeNotice">确定</button>
        </div>
        <div v-show="modal_type == 'vote'" class="popover_item digit_item">
            <div class="group_name">
                <h4>发起更改贡献消费积分投票</h4>
                <div class="digit">
                    当前贡献比例<input type="number" pattern="^[1-9][0-9]?$" v-model.trim="digit" placeholder="请输入比例">
                    <span>%</span>
                </div>
            </div>
            <button class="btn_common" @click="createVote">确定</button>
        </div>
        <div v-show="modal_type == 'vote_detail'" class="popover_item">
            <div class="group_name digit_status">
                <h4>贡献消费积分投票详情</h4>
                <div class="flex_item digit_type">
                    <div :style="{width:rate_data.agree_rate+'%'}" class="digit_type_item agree">
                        <p></p>
                    </div>
                    <div :style="{width:rate_data.disagree_rate+'%'}" class="digit_type_item disagree">
                        <p></p>
                    </div>
                    <div :style="{width:rate_data.abstain_rate+'%'}" class="digit_type_item other">
                        <p></p>
                    </div>
                </div>
                <div class="flex_item digit_tip">
                    <p class="font_10"><span></span>同意{{rate_data.agree_rate}}%</p>
                    <p class="font_10"><span></span>不同意{{rate_data.disagree_rate}}%</p>
                    <p class="font_10"><span></span>未投票{{rate_data.abstain_rate}}%</p>
                </div>
            </div>
            <button v-if="detail_data.vote_status == 0" class="btn_common digit_status_btn" @click="voteClose">终止投票</button>
            <button v-else class="btn_common digit_status_btn">投票已终止</button>
        </div>
        <div v-show="modal_type == 'product'" class="popover_item popover_product">
            <div class="group_name">
                <h4>产品列表</h4>
                <ul>
                    <li @click="selectProd(item.series_yyid)" v-for="item in prod_list" :key="item.series_yyid" :class="{'active':prod_yyid == item.series_yyid}">
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <button class="btn_common" @click="changeProd">确定</button>
        </div>
        <div v-show="modal_type == 'delete_group'" class="popover_item delete_group">
            <div class="group_name">
                <h4>群组</h4>
                <p>你确定要解散群组吗？</p>
            </div>
            <button class="btn_common" @click="deleteGp">确定</button>
        </div>
        <div v-show="modal_type == 'quit_group'" class="popover_item delete_group">
            <div class="group_name">
                <h4>群组</h4>
                <p>你确定要退出群组吗？</p>
            </div>
            <button class="btn_common" @click="quitGp">确定</button>
        </div>
    </div>
</template>
<script>
import { agentGpDetail,agentGpChangeName,agentGpVoteCreate,agentGpVoteDetail,agentGpProduct,agentGpVoteClose,agentGpNotice,agentGpChangeProd,agentGpDelete,agentGpQuit } from '../../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            group_manager:true,
            show_cover:false,
            modal_type:'',
            group_name:'',
            digit:'',
            detail_data:{},
            rate_data:{},
            prod_list:[],
            prod_yyid:'',
            notice_value:''
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getDetail();
    },
    methods:{
        async getDetail(){
            let res = await agentGpDetail(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
            if(res.errcode == 0){
                this.detail_data = {...res.data};
                this.group_name = res.data.group_name;
                if(this.detail_data.vote_yyid != ''){
                    this.getVoteDetail();
                }
                this.getProduct();
                return
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        showModal(type){
            this.modal_type = type;
            switch (type) {
                case 'change_gp_name':
                    this.group_name = this.detail_data.group_name;
                    break;
                case 'notice':
                    this.notice_value = this.detail_data.notice;
                    break;
                case 'vote':
                    this.digit = parseInt(this.detail_data.current_tax_rate);
                    break;
                case 'product':
                    this.prod_yyid = this.detail_data.series_yyid;
                    break;
                case 'delete_group':
                    
                    break;
                case 'quit_group':
                    
                    break;
                default:
                    break;
            }
        },
        async changeName(){
            if(this.group_name == ''){
                this.$vux.toast.text('请输入群组名称','top');
                return
            }
            let res = await agentGpChangeName(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid,this.group_name);
            if(res.errcode == 0){
                this.getDetail();
                this.showModal('');
                return
            }  else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        async createVote(){
            if(this.digit == ''){
                this.$vux.toast.text('请输入贡献比例','top');
                return
            }
            if(this.digit > 100){
                this.$vux.toast.text('贡献比例不能超过100','top');
                return
            }
            if(this.digit == 0){
                this.$vux.toast.text('贡献比例不能为0','top');
                return
            }
            let res = await agentGpVoteCreate(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid,this.digit);
            if(res.errcode == 0){
                this.getDetail();
                this.showModal('');
                return
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        async getVoteDetail(){
            let res = await agentGpVoteDetail(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid,this.detail_data.vote_yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.rate_data = {...res.data};
        },
        async getProduct(){
            let res = await agentGpProduct(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.prod_list = [...res.data];
        },
        async voteClose(){
            let res = await agentGpVoteClose(this.user_info.yyid,this.user_info.user_token,this.detail_data.vote_yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.getDetail();
            this.showModal('');
        },
        selectProd(yyid){
            this.prod_yyid = yyid;
        },
        async changeProd(){
            if(this.prod_yyid == ''){
                this.$vux.toast.text('请选择产品','top');
                return
            }
            let res = await agentGpChangeProd(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid,this.prod_yyid);
            if(res.errcode == 0){
                this.getDetail();
                this.showModal('');
                return
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        async changeNotice(){
            if(this.notice_value == ''){
                this.$vux.toast.text('请输入群公告','top');
                return
            };
            let res = await agentGpNotice(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid,this.notice_value);
            if(res.errcode == 0){
                this.getDetail();
                this.showModal('');
                return
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        async deleteGp(){
            let res = await agentGpDelete(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
            if(res.errcode == 0){
                this.showModal('');
                this.$router.push({
                    path:'/agentGroup'
                })
                return
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        async quitGp(){
            let res = await agentGpQuit(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
            if(res.errcode == 0){
                this.showModal('');
                this.$router.push({
                    path:'/agentGroup'
                })
                return
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },

    }
}
</script>
<style lang="less">
.agent_gp_info{
    padding-bottom: 80px;
    .vux-no-group-title{
        margin-top: 0;
    }
    .weui-cell{
        padding: 8px 0;
        font-size: 14PX;
        .vux-cell-value{
            color: #999999;
            margin-right: 5px;
        }
        .weui-cell__ft{
            &::after{
                width: 7px;
                height:7px;
                border-width:2px 2px 0 0;
                border-color: #999999;
                right: 3px;
            }
        }
    }
    .weui-cells{
        &::before{
            border-top: none;
        }
    }
    .profile{
        padding: 0px 15px 0 15px;
        .flex_item{
            height: 44px;
            line-height: 44px;
            .p_title{
                min-width: 130px;
            }
            .p_con{
                color: #999999;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                .iconfont{
                    font-size: 14PX;
                    color: #aaaaaa;
                    margin-left: 5px;
                    line-height: 20px;
                }
            }
            .yellow_color{
                color: #FF982A;
            }
            .product{
                color: #5870FE;
            }
        }
        .avatar{
            height: auto;
            .p_con{
                width: 40px;
                height: 40px;
                margin-bottom: 8px;
                border-radius: 50%;
                border: 1PX solid #CCCCCC;
                img{
                    width: 100%;
                    border-radius: 50%;
                }

            }
        }
    }
    .member_btn{
        margin: 20px;
        justify-content: space-between;
        .btn_item{
            flex: 1;
            background-color: #E5E8FF;
            color: #999999;
            text-align: center;
            padding: 12px 0;
        }
        .btn_item:nth-of-type(1){
            margin-right: 15px;
        }
    }
    .bottom_btn{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px 15px;
        button{
            width: 100%;
            border-color: #FF982A;
            color: #FF982A;
        }
    }
    .back_cover{
        top: 0;
        bottom: 0;
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
            color: #ffffff;
            background-color: #5870FE;
            border-radius: 8px 8px 0 0;
            padding: 20px 27px;
            margin-bottom: 20px;
            h4{
                font-size: 14PX;
            }
            input{
                width: 100%;
                margin-top: 15px;
                padding: 0 10px;
                outline-style: none;
                line-height: 44px;
            }
        }
        .digit_status{
            color: #333333;
            background-color: #ffffff;
            margin-bottom: 0;
            .digit_type{
                margin: 30px auto 0px;
                .digit_type_item{
                    color: #5870FE;
                    text-align: left;
                    margin-right: 2px;
                    p{
                        height: 14px;
                        border-radius: 2px;
                        background-color:#5870FE;
                    }
                    span{
                        font-size: 12PX;
                    }
                }
                .disagree{
                    color: #FF982A;
                    p{
                        background-color: #FF982A;
                    }
                }
                .other{
                    color: #C4C9D2;
                    p{
                        background-color: #C4C9D2;
                    }
                }
            }
            .digit_tip{
                margin-top: 15px;
                span{
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 3px;
                    background-color: #5870FE;
                    margin-right: 5px;
                }
                p:nth-of-type(2){
                    span{
                        background-color: #FF982A;
                    }
                }
                p:nth-of-type(3){
                    span{
                        background-color: #C4C9D2;
                    }
                }
            }
        }
        button{
            width: 160px;
            color: #ffffff;
            background-color: #5870FE;
            margin-bottom: 20px;
        }
        .digit_status_btn{
            background-color: #ffffff;
            width: 80%;
            color: #FF982A;
            border-color: #FF982A;
        }
    }
    .digit_item{
        .group_name{
            .digit{
                position: relative;
                input{
                    width: 120px;
                    margin-left: 10px;
                }
                span{
                    color: #999999;
                    position: absolute;
                    right: 10px;
                    top: 28px;
                }
            }
        }
    }
    .popover_product{
        .group_name{
            background-color: #ffffff;
            margin-bottom: 0;
            h4{
                color: #333333;
            }
            ul{
                margin-top: 15px;
                li{
                    border: 1px solid #C4C9D2;
                    line-height: 30px;
                    color: #666666;
                    border-radius: 4px;
                    margin-bottom: 6px;
                }
                .active{
                    color: #5870FE;
                    border-color: #5870FE;
                    background-color: #E9ECFF;
                }
            }
        }
    }
    .delete_group{
        .group_name{
            color: #333333;
            background-color: #ffffff;
            margin-bottom: 0;
        }
        h4{
            color: #333333;
            margin-bottom: 10px;
        }
    }
}
</style>
