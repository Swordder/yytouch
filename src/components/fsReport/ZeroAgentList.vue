<template>
  <div class="fs_list agent_list">
    <div class="fs_list_hd flex_item">
      <p>&nbsp;&nbsp;&nbsp;代表</p>
      <p>医院数</p>
      <p>指标</p>
      <p>实际</p>
      <p>达成率</p>
    </div>
    <div class="fs_list_bd">
      <router-link :to="{path:'/fsAgentReport',query:{u_yyid:item.u_yyid}}" v-for="(item,index) in agentList" :key="index">
        <div class="fs_list_item flex_item">
          <div class="hos_name flex_item">
            <span class="red">{{index+1}}</span>
            <div><p class="agent_name">{{item.true_name}}</p></div>
          </div>
          <p class="hos_num">{{item.hospital_nums}}</p>
          <p class="target">{{item.target}}</p>
          <p class="sales">{{item.order_num}}</p>
          <p class="rate green">{{item.pre}}%</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    props:['agentList'],
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
  .fs_list_bd{
    a:nth-of-type(2n+1){
      display: block;
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
            color: #999999;
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
      .sales{
        span{
            display: block;
            color: #5870FE;
            font-size: 12PX;
        }
      }
      .rate{
          text-align: right;
      }

      .green{
        font-weight: bold;
        color: #4ED79C;
      }
    }
  }
}

</style>
