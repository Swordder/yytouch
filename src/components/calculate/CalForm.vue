<template>
  <div class="inform">
    <div class="form_item margin_top">
      <p>个人季度指标（数量）</p>
      <div class="labal">
        <input type="text" data-name="target" v-model.trim="data.target" @input="justNum" placeholder="请输入您的个人季度指标">
      </div>
    </div>
    <div class="form_item">
      <div class="month_avg_show flex_item">
        <p>个人季度总销量 (数量)</p>
        <div class="avg_num res_blue">
          月均：<span v-if="month_avg == ''|| month_avg == 0 && data.sales != 0 || data.sales == '' ">- -</span><span v-else>{{month_avg}}</span>
             /月
        </div>
      </div>
      <div class="labal ">
        <input type="text" data-name="sales" v-model.trim="data.sales" @input="justNum" placeholder="请输入您的个人季度总销量">
      </div>
    </div>
  </div>
</template>

<script>
  import {calStrategies} from '../../config/calculate.js'
  export default{
    data(){
      return {
        data:{
          target:null,
          sales:null
        }
      }
    },
    computed:{
      month_avg(){
        if(isNaN(this.data.sales/3)){
          return '';
        }
        return (this.data.sales/3).toFixed(2);
      }
    },
    methods:{
      justNum(e){
        var reg = /^[+-]?(0|[1-9]+\d*)?\.?\d*$/;

        if(e.target.getAttribute('data-name') == 'target'){
          if(reg.test(e.target.value)){
            this.data.target = e.target.value;
          } else {
            this.data.target = null;
          }
        } else {
          if(reg.test(e.target.value)){
            this.data.sales = e.target.value;
          } else {
            this.data.sales = null;
          }
        }
        this.$emit('dataHandle',this.data);
      },
    }
  }
</script>

<style lang="less">
</style>
