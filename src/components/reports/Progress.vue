<template>
    <div class="progress">
        <div class="progress_title flex_item">
            <p>{{eData.item.area}}</p>
            <p>{{eData.item.sales}}套</p>
        </div>
        <box class="progress_bd">
          <x-progress
            class="progress_bg"
            :percent="eData.item.percent >= 100? 100: eData.item.percent"
            :show-cancel="false">
          </x-progress>
        </box>
        <div class="progress_ft flex_item">
            <p class="sales_num">{{eData.item.now_num}}套(昨日+{{eData.item.y_num}}套)</p>
            <p class="percent_bg">{{eData.item.percent}}%</p>
        </div>
    </div>
</template>

<script>
import { XProgress, Box } from 'vux'
export default {
    props:['eData'],
    data(){
        return {
        }
    },
    components:{
      XProgress,
      Box
    },
}
</script>
<style lang="less">
    .progress{
        background-color: #ffffff;
        box-shadow:0px 2px 10px 0px rgba(204,213,224,0.5);
        border-radius:8px;
        padding: 14px 20px;
        margin: 10px 0;
        .progress_title{
          font-size: 16PX;
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
            .weui-progress__inner-bar{
                border-radius: 2px;
                background-color: #5870FE;
            }
        }
        .progress_ft{
            color: #666666;
            font-size: 14PX;
            .sales_num{
                padding: 0;
                color: #666666;
            }
            .percent_bg{
                color: #5870FE;
                background-color: #DEE2FF;
            }
            p:nth-of-type(2){
                padding: 2px 10px;
                border-radius:4px;
            }
        }
    }

</style>
