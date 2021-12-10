<template>
  <div class="caculate_page fs_caculate" data-name = "page_fs_bonus">
    <header></header>
    <div class="form">
      <CalForm ref="calform" @dataHandle = "dataHandle"></CalForm>
      <div class="form_item">
        <p>您所负责区域的<span class="font_bold">去年全年月均</span>销量 (数量)</p>
        <div class="labal">
          <input type="text" v-model.trim="ly_month_sale" @input="onlyNum" placeholder="请输入您的月均销量">
        </div>
      </div>
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
           <span>增长率</span>
        </div>
        <div class="re_num res_blue">
          <span> {{add_rate}} %</span>
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
      <div class="re_item flex_item">
        <div class="re_type">
          <i class="iconfont">&#xe6fa;</i>
           <span>奖金系数</span>
        </div>
        <div class="re_num res_blue">
          <span>{{bonus_index}}</span>
        </div>
      </div>
    </div>
    <BonusNum :get_bonus="getBonus" :month="month"></BonusNum>
  </div>
</template>

<script>
  import CalForm from '../../components/calculate/CalForm.vue'
  import BonusNum from '../../components/calculate/BonusNum.vue'
  import {calStrategies,fsStrategies} from '../../config/calculate.js'
  import { hideMenu } from '../../config/share.js'
  export default{
    data(){
      return{
        achieve_rate:'- -',
        add_rate:'- -',
        bonus_standard:'- -',
        bonus_index:'- -',
        ly_month_sale:null,
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
    computed:{
      getBonus(){
        if(this.bonus_standard!= '- -' && this.bonus_index!= '- -'){
          return (this.bonus_standard*this.bonus_index).toFixed(2);
        } else {
          return '— —'
        }

      }
    },
    methods:{
      onlyNum(e){
        var achieve_point = '',
            add_point = '',
            reg = /^[+-]?(0|[1-9]+\d*)?\.?\d*$/;

        if(reg.test(e.target.value)){
          this.ly_month_sale = e.target.value;
        } else {
          this.ly_month_sale = null;
        }

        var sales = this.$refs.calform.data.sales;      //获取子组件的数值
        var target = this.$refs.calform.data.target;
        // 增长率的计算监听去年月均
        add_point = this.calAddPoint(sales,this.ly_month_sale)
        // 监听奖金系数，同时相当于监听个人达成率，增长率，和月平均
        // 个人达成率
        achieve_point = this.calAchievePoint(sales,target);
        // 奖金系数与达成率，月平均，和增长率有关，即确保他们都是数字
        if(achieve_point === '' || add_point === ''){
          this.bonus_index = '- -';
          return;
        }
        this.calBonusIndex(achieve_point,sales,add_point)
      },
      dataHandle(val){

        var achieve_point = '',
            add_point = '';  //验证所输入的是不是数字
        // 计算个人达成率
        achieve_point = this.calAchievePoint(val.sales,val.target);
        // 增长率的计算，指本季度月均与去年全年的月均对比(this.ly_month_sale != null && this.ly_month_sale != '')
        add_point = this.calAddPoint(val.sales,this.ly_month_sale);

        if(achieve_point === '' || add_point === ''){
          this.bonus_index = '- -';
          return;
        }
        // 奖金系数与达成率，月平均，和增长率有关，即确保他们都是数字
        this.calBonusIndex(achieve_point,val.sales,add_point);
      },
      // 计算达成率
      calAchievePoint(sales,target){
        var reg = /^[+-]?(0|[1-9]+\d*)?\.?\d*$/;
        var achieve_point = '';

        if((reg.test(sales)&&sales != ''&&sales != '-'&&sales != '+') && (reg.test(target)&&target != ''&&target != '-'&&target != '+')){

            if(target != 0 && sales != 0){
              achieve_point = calStrategies.achievePoint(sales,target);
              // this.achieve_rate = Math.round(achieve_point*100);
              // 2019/11/07
              this.achieve_rate = (achieve_point*100).toFixed(3);
              this.achieve_rate = this.achieve_rate.substring(0,this.achieve_rate.length-1);
              // 2019/11/07
              this.bonus_standard = fsStrategies.baseBonus(achieve_point,sales/3);
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
      // 计算增长率
      calAddPoint(sales,ly_month_sale){
        var reg = /^[+-]?(0|[1-9]+\d*)?\.?\d*$/;
        var add_point = '';
        if((reg.test(sales)&&sales != ''&&sales != '-'&&sales != '+')&&(reg.test(ly_month_sale)&&ly_month_sale != ''&&ly_month_sale != '-'&&ly_month_sale != '+')){

          if(ly_month_sale != 0){
            add_point = fsStrategies.addPoint(sales/3,ly_month_sale);
            this.add_rate = (add_point*100).toFixed(3);
            this.add_rate = this.add_rate.substring(0,this.add_rate.length-1)
          } else {
            add_point = Number(0);
            this.add_rate = Number(0);
          }

        } else {
          add_point = '';
          this.add_rate = '- -';
        }
        return add_point;
      },

      calBonusIndex(achieve_point,sales,add_point){
        var reg = /^[+-]?(0|[1-9]+\d*)?\.?\d*$/;
        if(reg.test(achieve_point) && (reg.test(sales)&&sales != ''&&sales != '-'&&sales != '+')&&reg.test(add_point)){
          this.bonus_index = fsStrategies.bonusIndex(achieve_point,sales/3,add_point);
        } else {
          this.bonus_index = '- -';
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../assets/css/calculate.less';
</style>
