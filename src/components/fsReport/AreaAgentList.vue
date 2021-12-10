<template>
  <div class="fs_list agent_list">
    <div class="fs_list_hd flex_item">
        <p>代表</p>
        <p>医院数</p>
        <p>指标</p>
        <p>实际</p>
        <p>达成率</p>
    </div>
    <div class="area_agent">
        <p class="province">上海4名</p>
        <div class="fs_list_bd">
            <div class="fs_list_item flex_item">
                <div class="hos_name flex_item">
                <div><p class="agent_name">张三才</p></div>
                </div>
                <p class="hos_num">500</p>
                <p class="target">87</p>
                <p class="sales">232<span>昨日+34</span></p>
                <p class="rate green">0%</p>
            </div>
            <div class="fs_list_item flex_item">
                <div class="hos_name flex_item">
                    <div><p class="agent_name">张三才</p></div>
                </div>
                <p class="hos_num">500</p>
                <p class="target">87</p>
                <p class="sales">920<span>昨日+34</span></p>
                <p class="rate red">10%</p>
            </div>
        </div>
    </div>
    <div class="area_agent">
        <p class="province">浙江4名</p>
        <div class="fs_list_bd">
            <div class="fs_list_item flex_item">
                <div class="hos_name flex_item">
                <div><p class="agent_name">张三才</p></div>
                </div>
                <p class="hos_num">500</p>
                <p class="target">87</p>
                <p class="sales">232<span>昨日+34</span></p>
                <p class="rate green">0%</p>
            </div>
            <div class="fs_list_item flex_item">
                <div class="hos_name flex_item">
                <div><p class="agent_name">张三才</p></div>
                </div>
                <p class="hos_num">500</p>
                <p class="target">87</p>
                <p class="sales">920<span>昨日+34</span></p>
                <p class="rate red">10%</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:[],
    data(){
      return {

      }
    },
  }
</script>
<style lang="less" scoped="scoped">
.agent_list{
  color: #666666;
  .fs_list_hd{
    padding: 13px 20px 13px 14px;
    text-align: left;
    p{
      flex: 1;
    }
    
    p:nth-of-type(5){
      text-align: right;
    }
  }
  .province{
      background-color: #DEE2FF;
      color: #5870FE;
      border-top: 2px solid #5870FE;
      text-align: center;
      line-height: 26px;
      font-size: 12PX;
      font-weight: bold;
  }
  .fs_list_bd{
    .fs_list_item:nth-of-type(2n+1){
      background-color: #F2F4FF;
    }
    .fs_list_item{
      padding: 14px 20px 14px 14px;
      .hos_name{
        flex: 1;
        justify-content: flex-start;
        color: #333333;
        font-weight: bold;
        span{
          margin-right: 8px;
          font-weight: normal;
        }
        p{
          text-align: left;
          font-size: 12PX;
          margin-top: 2px;
        }
      }
      p{
        text-align: left;
        flex: 1;
      }
      .rate{
          text-align: right;
      }
      .sales{
        span{
            display: block;
            color: #5870FE;
            font-size: 12PX;
        }
      }
      .red{
        color: #FF6675;
      }
      .green{
        color: #4ED79C;
      }
    }
  }
}

</style>
