<template>
    <div class="progress">
        <div class="progress_title flex_item">
            <p>{{eData.item.area}}</p>
            <p>{{eData.item.sales}}套</p>
        </div>
        <box class="progress_bd">
            <x-progress
                :class="eData.item.id == 'ES000000'?'progress_e':(eData.item.id == 'NS000000'?'progress_n':'progress_s')"
                :percent="eData.item.percent"
                :show-cancel="false">
            </x-progress>
        </box>
        <div class="progress_ft flex_item">
            <p class="sales_num">{{eData.item.now_num}}套(昨日+{{eData.item.y_num >= 0?'+'+eData.item.y_num:'-'+eData.item.y_num}}套)</p>
            <p
                :class="eData.item.id == 'ES000000'?'percent_e':(eData.item.id == 'NS000000'?'percent_n':'percent_s')"
            >{{eData.item.percent}}%</p>
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
    mounted(){
    },
    methods:{
    }
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
            color: #666666;
            font-size: 12PX;
            .sales_num{
                padding: 0;
                color: #666666;
            }
            .percent_e{
                color: #FFA114;
                background-color: rgba(255,161,20,0.2);
            }
            .percent_s{
                color: #5870FE;
                background-color: rgba(88,112,254,0.2);
            }
            .percent_n{
                color: #24D0BF;
                background-color: rgba(36,208,191,0.2);
            }
            p:nth-of-type(2){
                padding: 2px 10px;
                border-radius:4px;
            }
        }
    }

</style>
