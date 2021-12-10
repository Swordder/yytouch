<template>
    <div class="mg_group" data-name="doc_group">
        <template v-if="data_list.length === 0">
            <div class="item_empty_status">
                <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
          </div>
        </template>
        <template v-else>
            <div class="group_list">
                <group>
                    <template>
                        <cell
                        :title="item.group_name"
                        :value="'('+item.group_num+')'"
                        is-link
                        v-for="item in data_list"
                        :key="item.group_yyid"
                        :border-intent="false" :link="{path:'/groupDetail',query:{group_yyid:item.group_yyid}}"></cell>
                    </template>
                </group>
            </div>
        </template>
    </div>
</template>
<script>
import { Cell, CellBox, Group } from 'vux';
import { myDocGroup } from '../../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            data_list:[]
        }
    },
    components:{
        Group,Cell,CellBox
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
            let res = await myDocGroup(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.data_list = [...res.data];
        }
    }
}
</script>
<style lang="less">
    .mg_group{
        .item_empty_status{
            text-align: center;
            padding:30px 0 20px 0;
            color: #999999;
            img{
                width: 88px;
            }
        }
        .group_list{
            .vux-no-group-title,
            .weui-cells{
                margin-top: 0;
                font-size: 14PX;
            }
            .weui-cells{
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
                padding: 12px 15px 12px 24px;
            }
            .weui-cell_access{
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
    }
</style>