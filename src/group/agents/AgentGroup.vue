<template>
    <div class="agent_group" data-name="agent_group">
        <div class="group_title">
            <div class="group_hd flex_item">
                <h1>我的群组</h1>
                <p @click="show_popover = !show_popover"><i class="iconfont">&#xe66e;</i></p>
            </div>
            <div class="search">
                <i class="iconfont">&#xe689;</i>
                <input 
                    type="text" 
                    class="search_input"
                    placeholder="请输入群组关键字"
                    v-model.trim="value"
                    @input="change"
                >    
            </div>
        </div>
        <div class="gp_list">
            <router-link :to="{path:'/agentGpDetail',query:{'group_yyid':item.group_yyid}}" v-for="item in list" :key="item.group_yyid" class="gp_list_item">
                <div class="title flex_item bd_bt">
                    <h1>{{item.group_name}}</h1>
                    <p class="font_10">{{item.series_name?item.series_name:'暂无产品'}}</p>
                </div>
                <div class="gp_list_con">
                    {{item.notice?item.notice:'无公告内容'}}
                </div>
            </router-link>
        </div>
        <div v-show="list.length === 0" class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
        </div>
        <transition name="showcover">
			<div class="back_cover" v-show="show_popover" @click="show_popover = false"></div>
		</transition>
        <div v-show="show_popover" class="popover_item">
            <div class="group_name">
                <h4>群组名称</h4>
                <input type="text" v-model.trim="group_name" placeholder="请输入群组名称">
            </div>
            <button class="btn_common" @click="createGp">确定</button>
        </div>
    </div>
</template>
<script>
import { agentGroupList,agentGpSearch,agentGpCreate } from '../../../api/sendRequest';
import _ from 'lodash';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            value:'',
            list:[],
            group_name:'',
            show_popover:false
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
            let res = await agentGroupList(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            }
            this.list = [...res.data];
        },
        async searchGroup(){
            let res = await agentGpSearch(this.user_info.yyid,this.user_info.user_token,this.value);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.list = [...res.data];
        },
        change:_.debounce(function(){
            this.searchGroup()
        },1000),
        async createGp(){
            if(this.group_name == ''){
                this.$vux.toast.text('请输入群组名称','top');
                return
            };
            let res = await agentGpCreate(this.user_info.yyid,this.user_info.user_token,this.group_name);
            if(res.errcode == 0){
                this.show_popover = !this.show_popover;
                this.getList();
            } else {
                this.$vux.toast.text(res.errmsg,'top');
                return
            }
        }
    }
}
</script>
<style lang="less">
.agent_group{
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
    .gp_list{
        .gp_list_item{
            display: block;
            padding: 0 20px 15px;
            border-bottom: 10px solid #F5F5F5;
            .title{
                padding: 11px 0;
                h1{
                    font-size: 16PX;
                }
                p{
                    color: #ffffff;
                    background-color: #5870FE;
                    line-height: 24px;
                    padding: 0 8px;
                    border-radius: 10px 0 10px 0;
                }
            }
            .gp_list_con{
                margin-top: 15px;
                color: #999999;
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
        button{
            width: 160px;
            color: #ffffff;
            background-color: #5870FE;
            margin-bottom: 20px;
        }
    }
}
</style>