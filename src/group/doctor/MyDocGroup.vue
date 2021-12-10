<template>
    <div class="doc_group" data-name="doc_group">
        <div class="group_title">
            <div class="group_hd flex_item">
                <h1>我的医生服务组</h1>
                <p @click="showSet()"><i class="iconfont">&#xe66e;</i></p>
            </div>
            <div class="search">
                <i class="iconfont">&#xe689;</i>
                <input 
                    type="text" 
                    class="search_input"
                    placeholder="请输入群组关键字"
                    v-model.trim="group_value"
                    @input="change"
                >    
            </div>
        </div>
        <div class="group_list">
            <group>
                <div class="bd_bt_8" v-for="item in data_list" :key="item.group_yyid">
                    <cell
                    :title="item.group_name"
                    :value="'('+item.group_num+')'"
                    is-link
                    :border-intent="false"
                    :arrow-direction="group_yyid == item.group_yyid ? 'up' : 'down'"
                    @click.native="showCurrent(item.group_yyid)"></cell>
                    <template v-if="group_yyid == item.group_yyid">
                        <cell-box 
                        v-for="(item2,index2) in item.members" 
                        :key="index2"
                        :border-intent="false" 
                        @click.native="goDetail(item2.member_yyid,item.group_yyid,item2.doctor_id)" 
                        class="sub-item pd_15">
                            <div class="avatar">
                                <img :src="item2.headimgurl" width="44px" alt="">
                            </div>
                            <div class="staff_info">
                                <p>{{item2.true_name?item2.true_name:item2.nickname}}</p>
                                <p class="font_10">{{item2.hospital_name?item2.hospital_name:'无医院信息'}}</p>
                            </div>
                        </cell-box>
                    </template>
                </div>
            </group>
        </div>
        <transition name="showcover">
			<div class="back_cover" v-show="show_cover" @click="close"></div>
		</transition>
        <Popover v-show="group_tag" :show_diff_tag="show_diff_tag" @showAddInput="showAddInput()"></Popover>
        <div v-show="add_group_tag" class="add_group">
            <div class="add_name">
                <h4>分组名称</h4>
                <input type="text" v-model.trim="group_name" placeholder="请输入群组名称">
            </div>
            <button class="btn_common" @click="addGroup">确定</button>
        </div>
    </div>
</template>
<script>
import Popover from '../../components/Popover'
import { docGroupList, createGroup } from '../../../api/sendRequest';
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
import _ from 'lodash';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            value:'',
            group_name:'',
            data_list:[],
            group_yyid:'',
            group_name:'',
            group_value:'',
            show_cover:false,
            group_tag:false,
            add_group_tag:false,
            show_diff_tag:true
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    components:{
        Group,Cell,CellBox,Popover
    },
    mounted(){
        this.getGroupList()
    },
    methods:{
        async getGroupList(){
            let res = await docGroupList(this.user_info.yyid,this.user_info.user_token,this.group_value);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            }
            this.data_list = [...res.data];
        },
        showCurrent(yyid){
            if(this.group_yyid === yyid){
                this.group_yyid = ''
            } else {
                this.group_yyid = yyid;
            }
        },
        showSet(){
            this.show_cover = !this.show_cover;
            this.group_tag = !this.group_tag;
        },
        close(){
            this.show_cover = !this.show_cover;
            this.add_group_tag = false;
            this.group_tag = false;
        },
        showAddInput(){
            this.add_group_tag = !this.add_group_tag;
            this.group_tag = !this.group_tag;
        },
        async addGroup(){
            if(this.group_name == ''){
                this.$vux.toast.text('请输入群组名称','top');
                return
            }
            let res = await createGroup(this.user_info.yyid,this.user_info.user_token,this.group_name);
            if(res.errcode == 0){
                this.show_cover = !this.show_cover;
                this.group_tag = false;
                this.add_group_tag = !this.add_group_tag;
                this.getGroupList();
                return
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        
        // input框防抖
        change:_.debounce(function(){
            this.getGroupList()
        },1000),
        goDetail(yyid,gp_yyid,doc_id){
            this.$router.push({
                path:'/staffDetail',
                query:{
                    'member_yyid':yyid,
                    'group_yyid':gp_yyid,
                    'doctor_id':doc_id
                }
            })
        }
    }
}
</script>
<style lang="less">
    .doc_group{
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        bottom: 0px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #F5F5F5;
        .group_title{
            padding: 15px 15px 20px;
            background-color: #5870FE;
            .group_hd{
                margin-bottom: 15px;
                color: #ffffff;
                h1{
                    font-size: 16PX;
                }
                p{
                    width: 22px;
                    height: 22px;
                    line-height: 22px;
                    background-color: #ffffff;
                    border-radius: 50%;
                    text-align: center;
                    .iconfont{
                        color: #5870FE;
                        font-size: 14PX;
                    }
                }
            }
            .search{
                position: relative;
                input{
                    width: 100%;
                    line-height: 30px;
                    border-radius: 15px;
                    padding: 0px 12px 0 36px;
                    border: none 0;
                    outline-style: none;
                }
                .iconfont{
                    color: #999999;
                    position: absolute;
                    top: 2px;
                    left: 12px;
                }    
            }
        }
        .group_list{
            .vux-no-group-title,
            .weui-cells{
                margin-top: 0;
                font-size: 14PX;
            }
            .weui-cells{
                &::after{
                    border-bottom: 10px solid #F5F5F5;
                }
                .vux-cell-bd{
                    position: relative;
                    &::before{
                        content: '';
                        position: absolute;
                        left: -10px;
                        top: 2px;
                        bottom: 0px;
                        width: 4px;
                        height: 14px;
                        border-radius: 2px;
                        background-color: #5870FE;
                    }
                }
            }
            .weui-cell{
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
                .staff_info{
                    flex: 1;
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
            .sub-item.pd_15{
                padding: 10px 15px;
            }
            .weui-cell_access{
                padding: 12px 15px 12px 24px;
                border-top: 10px solid #F5F5F5;
                .weui-cell__ft{
                    padding-right: 20px;
                    &:after{
                        width: 10px;
                        height: 10px;
                        border-color: #aaaaaa;
                    }
                }    
            }
            .weui-cell_access:nth-of-type(1){
                border-top: 0;
            }
        }
        .back_cover{
            top: 0;
            bottom: 0;
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