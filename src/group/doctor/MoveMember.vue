<template>
    <div class="move_group" data-name="doc_move_group">
        <div class="move_list">
            <div
            class="list_item flex_item bd_bt"
            v-for="item in data_list"
            :key="item.group_yyid"
            @click="selectGroup(item.group_yyid)">
                <div class="left">
                    <i v-if="group_yyid != item.group_yyid" class="iconfont">&#xe668;</i>
                    <i v-else class="iconfont blue">&#xe601;</i>
                    {{item.group_name}}
                </div>
                <p>（{{item.group_num}}）</p>
            </div>
        </div>
        <div v-show="data_list.length === 0" class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
        </div>
        <div v-show="data_list.length !== 0" class="btn">
            <button class="btn_common" @click="changeGp">确定</button>
        </div>
    </div>
</template>
<script>
import { myDocGroup,changeGroup,updateDocInfo } from '../../../api/sendRequest';
import { getStore } from '../../../config/util';
import { mapState } from 'vuex';
import { Checklist } from 'vux'
export default {
    data(){
        return {
            data_list:[],
            group_yyid:'',
            id_tag:false
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    components:{
        Checklist
    },
    mounted(){
        this.getDocList();
    },
    methods:{
        async getDocList(){
            let res = await myDocGroup(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.data_list = [...res.data];
        },
        selectGroup(yyid){
            this.group_yyid = yyid;
        },
        async changeGp(){
            if(this.group_yyid == ''){
                this.$vux.toast.text('请选择目标分组','top');
                return
            };
            // let res = await changeGroup(this.user_info.yyid,this.user_info.user_token,this.$route.query.member_yyid,this.group_yyid);
            // if(res.errcode == 0){
            //     this.$router.push({
            //         path:'/myDocGroup'
            //     })
            // } else {
            //     this.$vux.toast.text(res.errmsg,'top');
            // };
            if(this.$route.query.type == '2'){
                let mem_yyids = getStore('member_yyid');
                let res = await changeGroup(this.user_info.yyid,this.user_info.user_token,mem_yyids,this.group_yyid);
                if(res.errcode == 0){
                    this.$router.push({
                        path:'/myDocGroup'
                    })
                } else {
                    this.$vux.toast.text(res.errmsg,'top');
                };
                window.localStorage.removeItem('member_yyid');
                return
            }
            else {
                let res = await changeGroup(this.user_info.yyid,this.user_info.user_token,this.$route.query.member_yyid,this.group_yyid);
                if(res.errcode == 0){
                    this.$router.go(-1);
                    return
                } else {
                    this.$vux.toast.text(res.errmsg,'top');
                };
            }
        }
    }
}
</script>
<style lang="less">
    .move_group{
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        bottom: 0px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #F5F5F5;
        .move_list{
            .list_item{
                padding: 12px 15px;
                background-color: #ffffff;
                .iconfont{
                    font-size: 20PX;
                    margin-right: 6px;
                    line-height: 18px;
                    color: #C4C9D2;
                }
                .blue{
                    color: #5870FE;
                }
                p{
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
        .btn{
            width: 100%;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 15px;
            button{
                width: 100%;
                line-height: 44px;
                color: #ffffff;
                background-color:#5870FE;
            }
        }
    }
</style>
