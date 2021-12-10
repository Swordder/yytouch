<template>
    <div class="ni_qu_hos_bonus">
        <div class="form">
            <p class="note">注：个人区域及单家医院YTD达成85%方可计奖</p>
            <div class="form_item margin_top">
                <p>当年考核月数</p>
                <div class="labal">
                    <input type="number" v-model.trim="month" @input="inputCal($event,1)" data-name="target" placeholder="请输入大于0的值">
                </div>
            </div>
            <div class="form_item">
                <div class="month_avg_show flex_item">
                <p>单家医院截至当月累计销售</p>
                </div>
                <div class="labal ">
                    <input type="number" v-model.trim="hos_sales" @input="inputCal($event,2)" data-name="sales" placeholder="请输入">
                </div>
            </div>
            <div class="form_item">
                <p>单家医院截至上月累计销售</p>
                <div class="labal">
                    <input type="number" v-model.trim="last_mon_hos_sales" @input="inputCal($event,3)" placeholder="请输入">
                </div>
            </div>
            <div class="form_item">
                <p>2020年4月-2020年12月单家医院月均销售</p>
                <div class="labal">
                    <input type="number" v-model.trim="month_avg" @input="inputCal($event,4)" placeholder="请输入">
                </div>
            </div>
        </div>
        <div class="form_result">
            <div class="re_item flex_item">
                <div class="re_type">
                    <i class="iconfont">&#xe6fa;</i>
                    <span>YTD月均增量</span>
                </div>
                <div class="re_num res_blue">
                    <span>{{ytd_mon_sales != null?ytd_mon_sales:null}}盒</span>
                </div>
            </div>
            <div class="re_item flex_item">
                <div class="re_type">
                    <i class="iconfont">&#xe6fa;</i>
                    <span>单盒奖金</span>
                </div>
                <div class="re_num res_blue">
                    <span>{{single_bonus}}元</span>
                </div>
            </div>
            <div class="re_item flex_item">
                <div class="re_type">
                    <i class="iconfont">&#xe6fa;</i>
                    <span>YTD应发奖金</span>
                </div>
                <div class="re_num res_blue">
                    <span>{{ytd_bonus != null?ytd_bonus:null}}元</span>
                </div>
            </div>
            <p class="font_10 note">注：若当月应发奖金为负值，则显示为0;<br />数据按照四舍五入保留两位小数计算</p>
        </div>
        <div class="bonus_result">
            <div class="bonus_num">
                <p class="title">当月应发奖金(元)</p>
                <h1>{{getBonus}}</h1>
                <p class="tip font_10">该奖金仅供参考，最终结果以财务部数据为准</p>
            </div>
        </div>
    </div>
</template>
<script>
import { strategyHosAddBonus } from '../../config/calculate';
export default {
    data(){
        return {
            month:null,
            hos_sales:null,
            last_mon_hos_sales:null,
            month_avg:null,
            single_bonus:null,
            ytd_mon_sales:null,
            ytd_bonus:null,
            his_single_bonus:null,
            his_ytd_mon_sales:null,
            his_ytd_bonus:null,
        }
    },
    computed:{
        getBonus(){
            if(this.month == 1){
                return this.ytd_bonus;
            };
            if(this.ytd_bonus != null){
                if(this.history_bonus == null){
                    this.history_bonus = 0;
                };
                let bonus = Math.round((this.ytd_bonus - this.his_ytd_bonus)*100)/100;
                if(bonus < 0){
                    return 0
                } else  {
                    return bonus
                }
            } else {
                return 0;
            }
        }
    },
    methods:{
        inputCal(e,type){
            switch (type) {
                case 1:
                    this.month = e.target.value;
                    break;
                case 2:
                    this.hos_sales = e.target.value;
                    break;
                case 3:
                    this.last_mon_hos_sales = e.target.value;
                    break;
                case 4:
                    this.month_avg = e.target.value;
                    break;
                default:
                    break;
            };
            // YTD月均增量
            if(this.hos_sales != null && this.month != null && this.month_avg != null){
                this.ytd_mon_sales = strategyHosAddBonus.ytdMonAdd(this.hos_sales,this.month,this.month_avg);
            } else {
                this.ytd_mon_sales = null;
            };
            // 单盒奖金计算
            if(this.ytd_mon_sales != null){
                this.single_bonus = strategyHosAddBonus.singleBonus(this.ytd_mon_sales);
            } else {
                this.single_bonus = null;
            };
            // YTD应发奖金
            if(this.ytd_mon_sales != null && this.single_bonus != null && this.month != null){
                this.ytd_bonus = strategyHosAddBonus.ytdBonus(this.ytd_mon_sales,this.single_bonus,this.month);
            } else {
                this.ytd_bonus = null;
            };
            // 历史YTD月均增量
            if(this.last_mon_hos_sales != null && this.month != null && this.month_avg != null){
                this.his_ytd_mon_sales = strategyHosAddBonus.hisYtdMonAdd(this.last_mon_hos_sales,this.month,this.month_avg);
            } else {
                this.his_ytd_mon_sales = null;
            };
            // // 历史单盒奖金
            if(this.his_ytd_mon_sales != null){
                this.his_single_bonus = strategyHosAddBonus.singleBonus(this.his_ytd_mon_sales);
            } else {
                this.his_single_bonus = null;
            };
            // 历史应发奖金
            if(this.his_ytd_mon_sales != null && this.his_single_bonus != null && this.month != null){
                this.his_ytd_bonus = Math.round((Number(this.his_ytd_mon_sales)*Number(this.his_single_bonus)*(Number(this.month) -1))*100)/100;
            } else {
                this.his_ytd_bonus = null;
            };
        }
    }
}
</script>
<style lang="less">
.ni_qu_hos_bonus{
    .note{
        color: red;
        margin-bottom: 10px;
    }
    .form_result{
        .font_10{
            color: #333333;
            margin-top: 5px;
        }
    }
    .bonus_result{
      width: 100%;
      padding: 0 30px;
      margin-top: 20px;
      .bonus_num{
        width: 100%;
        height: 116px;
        background: url('../../assets/images/bonus.png') left top no-repeat;
        background-size: cover;
        color: #5870FE;
        text-align: center;
        .title{
          padding-top: 22px;
        }
        h1{
          font-size: 24PX;
        }
        .tip{
          color: #999999;
        }
      }
    } 
}
</style>