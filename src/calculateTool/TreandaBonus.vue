<template>
  <div class="caculate_page fs_caculate" data-name = "page_treanda_bonus">
    <header></header>
    <div class="form">
      <CalForm ref="calform" @dataHandle = "dataHandle"></CalForm>
    </div>
    <div class="form_result">
      <div class="re_item flex_item">
        <div class="re_type">
          <i class="iconfont">&#xe6fa;</i>
           <span>个人达成率</span>
        </div>
        <div class="re_num res_blue">
          <span> {{achieve_rate}} %</span>
        </div>
      </div>
      <div class="re_item flex_item">
        <div class="re_type">
          <i class="iconfont">&#xe6fa;</i>
           <span>奖金标准</span>
        </div>
        <div class="re_num res_blue">
          <span>{{bonus_standard}}</span>
          元
        </div>
      </div>
    </div>
    <BonusNum :get_bonus="get_bonus" :month="month"></BonusNum>
  </div>
</template>

<script>
  import CalForm from '../../components/calculate/CalForm.vue'
  import BonusNum from '../../components/calculate/BonusNum.vue'
  import {calStrategies,tdStrategies} from '../../config/calculate.js'
  import { hideMenu } from '../../config/share.js'
  export default{
    data(){
      return{
        achieve_rate:'- -',
        bonus_standard:'- -',
        get_bonus:'— —',
        month:'/月'
      }
    },
    mounted(){
      hideMenu();
    },
    components:{
      CalForm,
      BonusNum
    },
    methods:{
      dataHandle(val){

        var achieve_point = '',
            reg = /^[+-]?(0|[1-9]+\d*)?\.?\d*$/;   //验证所输入的是不是数字
        // 计算个人达成率
        achieve_point = this.calAchievePoint(val.sales,val.target);
        // 奖金系数与达成率，月平均，和增长率有关，即确保他们都是数字
        if(achieve_point == ''){
          this.bonus_standard = '- -';
          this.get_bonus = '— —';
        } else {
          this.bonus_standard = tdStrategies.baseBonus(achieve_point);
          this.get_bonus = (this.bonus_standard * val.sales/3).toFixed(2);
        }

      },
      // 计算达成率
      calAchievePoint(sales,target){
        var reg = /^[+-]?(0|[1-9]+\d*)?\.?\d*$/;
        var achieve_point = '';

        if((reg.test(sales)&&sales != ''&&sales != '-'&&sales != '+') && (reg.test(target)&&target != ''&&target != '-'&&target != '+')){

            if(target != 0 && sales != 0){
              achieve_point = calStrategies.achievePoint(sales,target);
              // this.achieve_rate = Math.round(achieve_point*100);
              this.achieve_rate = (achieve_point*100).toFixed(3);
              this.achieve_rate = this.achieve_rate.substring(0,this.achieve_rate.length-1);
              
              this.bonus_standard = tdStrategies.baseBonus(achieve_point,sales/3);
            } else {
              achieve_point = Number(0);
              this.achieve_rate = Number(0);
              this.bonus_standard = Number(0);
            }

        } else {
          achieve_point = '';
          this.achieve_rate = '- -';
          this.bonus_standard = '- -';
        }
        return achieve_point;
      },

    }
  }
</script>

<style lang="less">
  @import '../../assets/css/calculate.less';
</style>
