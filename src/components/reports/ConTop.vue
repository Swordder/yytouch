<template>
  <div class="con_top">
	<p class="con_update_time">数据于{{date}}更新</p>
    <h1>{{date.split('-')[0]}}年{{date.split('-')[1]}}月-力蜚能流向报告</h1>
    <div class="top_num">代表总数 <span>{{dataCon.data_1.total_reps}} 人</span></div>
    <div class="top_num">目标医院总数 <span>{{dataCon.data_1.total_hospital}} 家</span></div>
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
    height: 180px;
    padding: 52px 20px 20px;
    background-color: #5870FE;
    color: #ffffff;
    position: relative;
    z-index: 0;
    .con_update_time{
      background-color: #697EFE;
      font-size: 12PX;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
      line-height: 24px;
      z-index: 2;
    }
    h1{
      font-size: 18PX;
      margin-bottom: 8px;
    }
    .top_num{
      font-size: 16PX;
      margin-bottom: 7px;
      span{
        padding: 2px 8px;
        background-color: #3956FF;
        font-size: 16PX;
        border-radius: 15px;
        margin-left: 4px;
      }
    }
  }
</style>
