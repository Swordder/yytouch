<template>
    <div class="progress">
        <div class="progress_title flex_item">
            <p>{{hosData.item.area}}</p>
            <p>{{hosData.item.type}}总数：{{hosData.item.hospital_totals}}{{hosData.item.type_1}}</p>
        </div>
        <box class="progress_bd">
            <x-progress
                ref="progress_bg"
                :percent="hosData.item.percent >= 100? 100: hosData.item.percent"
                :show-cancel="false">
            </x-progress>
        </box>
        <div class="progress_ft">
            <p>无销量{{hosData.item.type}}数：{{hosData.item.zero_hospital_totals}}{{hosData.item.type_1}}</p>
        </div>
    </div>
</template>

<script>
import { XProgress, Box } from 'vux'
export default {
    props:['hosData','bgColor'],
    data(){
        return {

        }
    },
    components:{
      XProgress,
      Box
    },
    mounted(){
      // 修改进度条的样式
      let elems = this.$refs.progress_bg.$el;
      let children = elems.children;
      children[0].children[0].style.backgroundColor=this.bgColor;
    },
    methods:{
    }
}
</script>
<style lang="less">
    .progress{
        box-shadow:0px 2px 10px 0px rgba(204,213,224,0.5);
        border-radius:8px;
        padding: 14px 20px;
        margin: 10px 0;
        .progress_title{
            p:nth-of-type(1){
                font-weight: bold;
            }
            p:nth-of-type(2){
                color: #666666;
            }
        }
        .progress_bd{
            margin: 10px 0;
            .weui-progress{
                height: 4px;
                border-radius: 2px;
            }
            .weui-progress__bar{
                height: 4px;
                border-radius: 2px;
            }
            .progress_e{
                .weui-progress__inner-bar{
                    background-color: #FFA114;
                }
            }
            .progress_s{
                .weui-progress__inner-bar{
                    background-color: #5870FE;
                }
            }
            .progress_n{
                .weui-progress__inner-bar{
                    background-color: #24D0BF;
                }
            }
            .weui-progress__inner-bar{
                border-radius: 2px;
            }
        }
        .progress_ft{
            font-size: 12PX;
            p{
                padding: 2px 10px;
                border-radius:4px;
                text-align: right;
                color: #F65B6A;
            }
        }
    }
</style>
