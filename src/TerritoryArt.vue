<template>
    <div class="territory_art" data-name="territory_art">
        <group>
            <div class="territory_list" :class="{active_list:type_id == item.id}" v-for="item in list" :key="item.id">
                <cell
                :title="item.name"
                is-link
                :border-intent="false"
                class="title"
                :value="item.childAreas.length"
                :arrow-direction="type_id == item.id ? 'up' : 'down'"
                @click.native="showCurrent(item.id)"></cell>
                <template v-if="type_id == item.id">
                    <cell-box
                    :border-intent="false"
                    v-for="item2 in item.childAreas"
                    :key="item2.child_id"
                    class="sub-item"
                    is-link :link="{path:'/territoryDetail',query:{child_id:item2.child_id}}">
                        {{item2.name}}
                    </cell-box>
                </template>
            </div>
        </group>
    </div>
</template>
<script>
import { therapeutic } from '../api/sendRequest';
import { Cell, CellBox, Group } from 'vux';
export default {
    data(){
        return {
            showContent:true,
            list:[],
            type_id:''
        }
    },
    components:{
        Cell,
        CellBox,
        Group,
    },
    mounted(){
        this.getTherapeutic()
    },
    methods:{
        async getTherapeutic(){
            let res = await therapeutic(1);
            this.list = [...res.data];
        },
        showCurrent(yyid){
            if(this.type_id === yyid){
                this.type_id = ''
            } else {
                this.type_id = yyid;
            }
        },
    }
}
</script>
<style lang="less">
    .territory_art{
        padding: 15px;
        .vux-no-group-title{
            margin-top: 0;
        }
        .weui-cells{
            .territory_list{
                margin-bottom: 15px;
                background-color: #F3F4F5;
                border-radius: 4px;
            }
            .active_list{
                background-color: #E9ECFF;
            }
            .vux-cell-bd.vux-cell-primary{
              padding-left: 15px;
            }
            .vux-tap-active.title{
                border-bottom:1PX solid #ffffff;
            }
            font-size: 14PX;
            margin-top: 0;
            &::before{
                border-top: none 0;
            }
            &::after{
                border-bottom: none;
            }
            .weui-cell{
                padding-right: 20px;
                &::before{
                    border: none;
                }
            }
            .vux-label{
                font-size: 16PX;
                font-weight: bold;
            }
            .sub-item{
                margin-left: 10px;
                padding-left: 5px;
            }
            .weui-cell_access.vux-cell-box{
                margin-right: 10px;
                &::after{
                    width: 9px;
                    height: 9px;
                }
            }
            .weui-cell__ft{
                margin-right: 10px;
                width: 24px;
                height: 24px;
                line-height: 24px;
                background-color: #484FEA;
                border-radius: 50%;
                color: #ffffff;
                text-align: center;
                padding-right: 0;
                &::after{
                    width: 9px;
                    height: 9px;
                    right: -20px;
                }
            }
        }
    }
</style>
