<template>
    <div class="ni_qu_bonus">
        <div class="form">
            <div class="form_item margin_top">
                <p>当年考核月数</p>
                <div class="labal">
                <input type="number" v-model.trim="month" @input="inputCal($event,1)" data-name="target" placeholder="请输入大于0的值">
                </div>
            </div>
            <div class="form_item">
                <div class="month_avg_show flex_item">
                <p>截至当月累计指标</p>
                </div>
                <div class="labal ">
                    <input type="number" v-model.trim="standard" @input="inputCal($event,2)" data-name="sales" placeholder="请输入">
                </div>
            </div>
            <div class="form_item">
                <p>截至当月累计销售</p>
                <div class="labal">
                <input type="number" v-model.trim="sales" @input="inputCal($event,3)" placeholder="请输入">
                </div>
            </div>
            <div class="form_item">
                <p>截至上月累计指标</p>
                <div class="labal">
                <input type="number" v-model.trim="lsat_standard" @input="inputCal($event,4)" placeholder="请输入">
                </div>
            </div>
            <div class="form_item">
                <p>截至上月累计销售</p>
                <div class="labal">
                <input type="number" v-model.trim="lsat_sales" @input="inputCal($event,5)" placeholder="请输入">
                </div>
            </div>
            <div class="form_item">
                <p>2020年4月-2020年12月月均销售</p>
                <div class="labal">
                <input type="number" v-model.trim="month_avg" @input="inputCal($event,6)" placeholder="请输入">
                </div>
            </div>
        </div>
        <div class="form_result">
            <div class="re_item flex_item">
                <div class="re_type">
                    <i class="iconfont">&#xe6fa;</i>
                    <span>奖金基数</span>
                    </div>
                    <div class="re_num res_blue">
                    <span>{{base_bonus}}元</span>
                </div>
            </div>
            <div class="re_item flex_item">
                <div class="re_type">
                    <i class="iconfont">&#xe6fa;</i>
                    <span>达成率/达成系数</span>
                    </div>
                    <div class="re_num res_blue">
                    <span> {{achieve_rate != null?achieve_rate:null}} % / {{achieve_index==null?null : achieve_index}}</span>
                </div>
            </div>
            <div class="re_item flex_item">
                <div class="re_type">
                    <i class="iconfont">&#xe6fa;</i>
                    <span>增长率/增长系数</span>
                    </div>
                    <div class="re_num res_blue">
                    <span> {{growth_rate != null?growth_rate:null}} % / {{growth_index == null?null : growth_index}}</span>
                </div>
            </div>
            <div class="re_item flex_item">
                <div class="re_type">
                    <i class="iconfont">&#xe6fa;</i>
                    <span>YTD应发奖金</span>
                    </div>
                    <div class="re_num res_blue">
                    <span>{{ytd_bonus}}</span>
                    元
                </div>
            </div>
            <p class="font_10 note">注：若当月应发奖金为负值，则显示为0;<br />达成率、增长率等所有涉及百分比的数据按照四舍五入百分比保留两位小数计算<br /></p>
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
import CalForm from '../../components/calculate/CalForm.vue'
import BonusNum from '../../components/calculate/BonusNum.vue'
import {niStrategies} from '../../config/calculate.js'
import { hideMenu } from '../../config/share.js'
export default {
    data(){
        return {
            month:null,
            standard:null,
            sales:null,
            lsat_standard:null,
            lsat_sales:null,
            month_avg:null,
            his_base_bonus:null,
            his_achieve_rates:null,
            his_achieve_index:null,

            history_bonus:null,
            base_bonus:null,
            achieve_rate:null,
            achieve_index:null,
            growth_rate:null,
            growth_index:null,
            // month_bonus:null,
            ytd_bonus:null,
        }
    },
    mounted(){
      hideMenu();
    },
    components:{
      CalForm,
      BonusNum
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
          let bonus = Math.round((this.ytd_bonus - this.history_bonus)*100)/100;
          if(bonus < 0){
            return 0
          } else  {
            return bonus
          }
        } else {
          return 0
        }
        // if(this.ytd_bonus != null && this.history_bonus != null){
        //   let bonus = Math.round((this.ytd_bonus - this.history_bonus)*100)/100;
        //   if(bonus < 0){
        //     return 0
        //   } else  {
        //     return bonus
        //   }
        // } else {
        //   return 0
        // }
      }
    },
    methods:{
      inputCal(e,type){
        switch (type) {
          case 1:
            this.month = e.target.value;
            break;
          case 2:
            this.standard = e.target.value;
            break;
          case 3:
            this.sales = e.target.value;
            break;
          case 4:
            this.lsat_standard = e.target.value;
            break;
          case 5:
            this.lsat_sales = e.target.value;
            break;
          case 6:
            this.month_avg = e.target.value;
            break;
          default:
            break;
        }
        // 计算奖金基数
        if(this.sales != null && this.month != null){
          this.base_bonus = niStrategies.bonusBase(this.sales,this.month);
        } else {
          this.base_bonus = null;
        };
        // 达成率和达成系数计算
        if(this.sales != null&&this.standard != null){
          this.achieve_rate = niStrategies.totalAchieveRate(this.sales,this.standard);
        } else {
          this.achieve_rate = null;
        };
        if(this.sales != null && this.month != null && this.achieve_rate != null){
          let month_avg = Number(this.sales)/Number(this.month);
          this.achieve_index = niStrategies.totalAchieveIndex(this.achieve_rate,month_avg);
        } else {
          this.achieve_index = null;
        };
        // 增长率/增长系数
        if(this.sales != null && this.month != null && this.month_avg != null){
          let month_avg = Math.abs(this.month_avg);
          this.growth_rate = niStrategies.growthRate(this.sales,this.month,month_avg);
        } else {
          this.growth_rate = null;
        };
        if(this.sales != null && this.month != null && this.growth_rate != null){
          let month_avg = Number(this.sales)/Number(this.month);
          this.growth_index = niStrategies.growthRateIndex(this.growth_rate,month_avg);
        } else {
          this.growth_index = null;
        };
        // YTD
        if(this.base_bonus != null && this.achieve_index != null && this.growth_index != null && this.month){
          this.ytd_bonus = Math.round(Number(this.base_bonus)*Number(this.achieve_index)*Number(this.growth_index)*Number(this.month)*100)/100;
        } else {
          this.ytd_bonus = null;
        };
        // 历史奖金计算
        if(this.month == 1){
          return
        }
        // 历史奖金基数
        if(this.lsat_sales != null && this.month != null){
          this.his_base_bonus = niStrategies.hisBonusBase(this.lsat_sales,this.month);
        } else {
          this.his_base_bonus = null;
        };
        // 历史达成率
        if(this.lsat_sales != null && this.lsat_standard != null){
          this.his_achieve_rates = niStrategies.hisAchRate(this.lsat_sales,this.lsat_standard);
        } else {
          this.his_achieve_rate = null;
        };
        // 历史达成系数
        if(this.lsat_sales != null && this.month != null && this.his_achieve_rates != null){
          let month_avg = Number(this.lsat_sales)/(Number(this.month)-1);
          this.his_achieve_index = niStrategies.totalAchieveIndex(this.his_achieve_rates,month_avg);
        } else {
          this.his_achieve_index = null;
        };
        // 历史增长率
        if(this.lsat_sales != null && this.month != null && this.month_avg != null){
          this.his_add_rate = niStrategies.hisAddRate(this.lsat_sales,this.month,this.month_avg);
        } else {
          this.his_add_rate = null;
        };
        // 历史增长系数
        if(this.lsat_sales != null && this.month != null && this.his_add_rate != null){
          let month_avg = Number(this.lsat_sales)/(Number(this.month)-1);
          this.his_add_index = niStrategies.growthRateIndex(this.his_add_rate,month_avg);
        } else {
          this.his_add_index = null;
        };
        console.log(this.his_base_bonus)
        console.log(this.his_achieve_index)
        console.log(this.his_add_index)
        console.log(this.month)
        // 历史奖金
        if(this.his_base_bonus != null && this.his_achieve_index != null && this.his_add_index != null && this.month != null){
          this.history_bonus = Number(this.his_base_bonus)*Number(this.his_achieve_index)*Number(this.his_add_index)*(Number(this.month)-1);
        } else {
          this.history_bonus = null;
        };
        console.log(this.history_bonus)
      },
    }
}
</script>
<style lang="less">
.ni_qu_bonus{
  .form_result{
    .note{
      // color: red;
      margin-top: 5px;
      // transform-origin: ;
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