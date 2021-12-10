<template>
    <div class="group_detail" data-name="doc_group_detail">
        <div class="group_add_title flex_item">
            {{hos_name}}
            <p @click="showSet()"><i class="iconfont">&#xe618;</i></p>
        </div>
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
            <ul class="check_list">
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
                            <p>{{item.name == null||item.name == ''?item.nickname:item.name}}</p>
                            <p class="font_10">{{item.hospital_name==''?'无医院信息':item.hospital_name}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="btns flex_item">
                <button class="btn_common" @click="delMember">删除成员</button>
                <button class="btn_common" @click="moveToGroup()">移动到分组</button>
            </div>
        </template>
        <transition name="showcover">
			<div class="back_cover" v-show="show_cover" @click="showSetClose"></div>
		</transition>
        <Popover v-show="group_tag" :show_diff_tag="show_diff_tag" :gp_yyid="this.$route.query.group_yyid" @delGroup="delGroup()"  @showAddInput="showAddInput()"></Popover>
        <div v-show="show_del" class="del_group">
            <h3>删除分组</h3>
            <p>是否删除该分组？</p>
            <div class="del_btns flex_item">
                <button class="btn_common" @click="close">取消</button>
                <button class="btn_common" @click="delGroupShow">确定</button>
            </div>
        </div>
        <div v-show="add_group_tag" class="add_group">
            <div class="add_name">
                <h4>分组名称</h4>
                <input type="text" v-model.trim="group_name" placeholder="请输入群组名称">
            </div>
            <button class="btn_common" @click="reName">确定</button>
        </div>
    </div>
</template>
<script>
import Popover from '../../components/Popover';
import { Cell, CellBox, Group, Badge } from 'vux';
import { docGroupMember,delMember,delGroup,rename } from '../../../api/sendRequest';
import { setStore } from '../../../config/util';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            value:'',
            group_name:'',
            all_tag:false,
            show_cover:false,
            group_tag:false,
            show_diff_tag:false,
            show_del:false,
            add_group_tag:false,
            data_list:[],
            check_list:[],
            hos_name:''
        }
    },
    components:{
        Group,Cell,CellBox,Popover
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getMember()
    },
    methods:{
        async getMember(){
            let res = await docGroupMember(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.data_list = [...res.data.members];
            this.hos_name = res.data.group_name;
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
        moveToGroup(){
            if(this.check_list.length === 0){
                this.$vux.toast.text('请选择移动人员','top');
                return
            }
            setStore('member_yyid',this.check_list.toString());
            this.$router.push({
                path:'/moveMember',
                query:{
                    type:2
                }
            })
        },
        showSet(){
            this.show_cover = !this.show_cover;
            this.group_tag = !this.group_tag;
        },
        delGroup(){
            this.show_del = !this.show_del;
            this.group_tag = !this.group_tag;
        },
        close(){
            this.show_cover = !this.show_cover;
            this.show_del = !this.show_del;
        },
        showSetClose(){
            this.show_cover = !this.show_cover;
            this.group_tag = false;
            this.show_del = false;
            this.add_group_tag = false;
        },
        showAddInput(){
            this.add_group_tag = !this.add_group_tag;
            this.group_tag = !this.group_tag;
        },
        async delGroupShow(){
            let res = await delGroup(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
            if(res.errcode == 0){
                this.$router.push({
                    path:'/mgGroup',
                })
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        async reName(){
            if(this.group_name == ''){
                this.$vux.toast.text('请输入群组名称','top');
                return
            }
            let res = await rename(this.user_info.yyid,this.user_info.user_token,this.group_name,this.$route.query.group_yyid);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.show_cover = !this.show_cover;
            this.group_tag = false;
            this.add_group_tag = !this.add_group_tag;
            this.getMember()
        },
        async delMember(){
            if(this.check_list.length === 0){
                this.$vux.toast.text('请选择移除人员','top');
                return
            }
            let res = await delMember(this.user_info.yyid,this.user_info.user_token,this.check_list.toString(),this.$route.query.group_yyid)
            if(res.errcode == 0){
                this.getMember()
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        }
    }
}
</script>
<style lang="less">
    .group_detail{
        padding-bottom: 85px;
        .group_add_title{
            color: #ffffff;
            padding: 0 15px;
            line-height: 52px;
            background-color: #5870FE;
            p{
                width: 22px;
                height: 22px;
                margin-top: 12px;
                border-radius: 50%;
                background-color: #ffffff;
                position: relative;
                text-align: center;
                .iconfont{
                    position: absolute;
                    top: 8px;
                    left: 3px;
                    color: #5870FE;
                    line-height: 7px;
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
        .check_list{
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
                            display: inline-block;
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
        .back_cover{
            top: 0;
            bottom: 0;
        }
        .del_group{
            width: 285px;
            text-align: center;
            background-color: #ffffff;
            border-radius: 8px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 12;
            padding: 20px 0;
            p{
                color: #666666;
                margin-top: 10px;
            }
            .del_btns{
                margin-top: 40px;
                padding: 0 28px;
                button{
                    width: 160px;
                    margin: 0 5px;
                }
            }
        }
        .add_group{
            width: 285px;
            text-align: center;
            background-color: #ffffff;
            border-radius: 8px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 12;
            .add_name{
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
            button{
                width: 160px;
                color: #ffffff;
                background-color: #5870FE;
                margin-bottom: 20px;
            }
        }
    }
</style>