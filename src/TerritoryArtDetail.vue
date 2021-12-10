<template>
    <div class="territory_detail">
        <div class="prod_list">
            <h2 v-show="prod_list.length !== 0" class="bd_bt">适应产品</h2>
            <template v-for="item in prod_list">
                <router-link
                v-if="item.series_yyid == 'CE99604C72FCA1B4FF0FD255E611D431'"
                class="flex_item bgcw"
                :key="item.series_yyid"
                :to="{
                    path:'/aerogenInfo',
                    query:{
                    series_yyid:item.series_yyid,
                    product_yyid:item.product_yyid
                    }
                }" >
                    <div class="prod_pic">
                        <img :src="item.list_pic" alt="">
                    </div>
                    <div class="prod_intro flex_item">
                    <p class="title">{{item.series_name}}</p>
                    <p class="sub_title">{{item.sub_series_name}}</p>
                    </div>
                    <div class="icon"><i class="iconfont">&#xe661;</i></div>
                </router-link>
                <router-link
                v-else
                class="flex_item bgcw"
                :key="item.series_yyid"
                :to="{
                    path:'/product',
                    query:{
                    series_yyid:item.series_yyid,
                    product_yyid:item.product_yyid
                    }
                }" >
                    <div class="prod_pic">
                        <img :src="item.list_pic" alt="">
                    </div>
                    <div class="prod_intro flex_item">
                    <p class="title">{{item.series_name}}</p>
                    <p class="sub_title">{{item.sub_series_name}}</p>
                    </div>
                    <div class="icon"><i class="iconfont">&#xe661;</i></div>
                </router-link>
            </template>
        </div>
        <div class="art_list">
            <h2 class="bd_bt">相关文献</h2>
            <group>
                <cell-box
                    :border-intent="false"
                    v-for="item in arts"
                    :key="item.id"
                    class="sub-item"
                    is-link :link="{path:'/territoryArtDoc',query:{yyid:item.link}}">
                    {{item.name}}
                </cell-box>
            </group>
        </div>
    </div>
</template>
<script>
import { therapeuticDetail } from '../api/sendRequest';
import { Group,CellBox } from 'vux';
export default {
    data(){
        return {
            prod_list:[],
            arts:[]
        }
    },
    components:{
        Group,
        CellBox
    },
    mounted(){
        this.getData();
    },
    methods:{
        async getData(){
            let res = await therapeuticDetail(this.$route.query.child_id);
            this.prod_list = [...res.data.series];
            this.arts = [...res.data.articles];
        }
    }
}
</script>
<style lang="less">
.territory_detail{
    .prod_list{
        h2{
            margin-left: 15px;
            line-height: 40px;
            font-size: 16PX;
        }
        a{
            width: 100%;
            height: 80px;
            padding: 10px 15px;
            margin-bottom: 10px;
            justify-content: flex-start;
            align-items: center;
            .prod_pic{
                width: 60px;
                height: 60px;
                margin-right: 15px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .prod_intro{
                width: 70%;
                height: 100%;
                flex-wrap: wrap;
                align-content: space-between;
                .sub_title{
                    width: 100%;
                    font-size: 12PX;
                    color: #666666;
                    line-height: 16px;
                }
            }
            .icon{
                text-align: right;
                width: 30px;
                .iconfont{
                    color: #AAAAAA;
                }
            }

        }
    }
    .art_list{
        h2{
            margin-left: 15px;
            line-height: 40px;
            font-size: 16PX;
        }
        .weui-cells{
            margin-top: 0;
        }
        .weui-cell_access.vux-cell-box{
            font-size: 14PX;
            padding-left: 13px;
        }
    }
}
</style>
