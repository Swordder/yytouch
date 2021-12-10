<template>
  <div class="no_prods" data-name = "page_cal_empty">
    <div class="empty_status">
      <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
      <p>您当前没有正在服务中的产品<br />无法使用奖金计算功能</p>
    </div>
    <div class="agent_btn">
    	<a href="javascript:;" @click="applySub">申请服务</a>
    </div>
  </div>

</template>

<script>

  export default {
    data(){
      return {

      }
    },

    methods: {
      applySub() {
        this.$router.push({path:'/'});
      }
    },
  }
</script>

<style lang="less">
  .no_prods{
    .empty_status{
      width: 100%;
      color: #666666;
      font-size: 12PX;
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%,-50%);
      text-align: center;
      padding:30px 0 20px 0;
      color: #999999;
      img{
        width: 88px;
        margin-bottom: 10px;
      }
    }
  }

</style>
