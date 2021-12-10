<template>
  <div class="bonus_result">
    <div class="bonus_num">
      <p class="title">应得奖金(元{{month}})</p>
      <h1>{{get_bonus}}</h1>
      <p class="tip font_10">该奖金仅供参考，最终结果以公司实际发放为准</p>
    </div>
  </div>
</template>

<script>
  export default{
    props:['get_bonus','month'],
    data(){
      return {

      }
    },
    mounted() {
    }
  }
</script>

<style lang="less">
  .bonus_result{
    width: 100%;
    padding: 0 30px;
    margin-top: 28px;
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
</style>
