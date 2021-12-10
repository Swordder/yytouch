<template>
    <div class="member_list" data-name="doc_member_list">
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
                <button class="btn_common" @click="addDoc">批量加入</button>
            </div>
        </template>
    </div>
</template>
<script>
import { docList,addDocList } from '../../../api/sendRequest';
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
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getDocList();
    },
    methods:{
        async getDocList(){
            let res = await docList(this.user_info.yyid,this.user_info.user_token);
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
        async addDoc(){
            if(this.check_list.length === 0){
                this.$vux.toast.text('请选择医生','top');
                return
            }
            let res = await addDocList(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid,this.check_list.toString());
            if(res.errcode == 0){
                this.$router.push({
                    path:'/groupDetail',
                    query:{
                        group_yyid:this.$route.query.group_yyid
                    }
                })
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        }
    }
}
</script>
<style lang="less">
    .member_list{
        padding-bottom: 84px;
        position: relative;
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
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
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
            margin-top: 64px;
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