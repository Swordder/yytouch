<template>
  <div class="con_top">
    <h1>{{date.split('-')[0]}}年{{date.split('-')[1]}}月-护固莱士流向报告</h1>
    <div class="top_num">代表总数 <span>{{dataCon.data_1.total_reps}} 人</span></div>
    <div class="top_num">服务医院总数 <span>{{dataCon.data_1.total_hospital}} 家</span></div>
  </div>
</template>

<script>
export default{
  props:['date','dataCon'],
  data(){
    return {

    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped="scoped">
  .con_top{
    height: 155px;
    padding: 28px 20px 0;
    background-color: #5870FE;
    color: #ffffff;
    h1{
      font-size: 16PX;
      margin-bottom: 8px;
    }
    .top_num{
      font-size: 12PX;
      margin-bottom: 7px;
      span{
        padding: 2px 8px;
        background-color: #3956FF;
        font-size: 14PX;
        border-radius: 15px;
        margin-left: 4px;
      }
    }
  }
</style>
