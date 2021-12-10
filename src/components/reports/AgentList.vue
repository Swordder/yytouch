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
      <router-link :to="{path:'/agentReport',query:{u_yyid:item.user_yyid,node_yyid:areaId}}" v-for="(item,index) in lowAgentList" :key="index">
        <div class="fs_list_item flex_item">
          <div class="hos_name flex_item">
            <span :class="(index+1) <= 3?'red':''">{{index+1}}</span>
            <div><p class="agent_name">{{item.true_name}}</p></div>
          </div>
          <p class="hos_num">{{item.hospital_nums}}</p>
          <p class="target">{{item.target}}</p>
          <p class="sales red">
            {{item.order_num}}
            <span v-show="item.yesterday_order_num != 0 && item.yesterday_order_num != null">昨日{{item.yesterday_order_num>0?'+':''}}{{item.yesterday_order_num}}</span>
          </p>
          <p :class="item.pre > 0?'red rate':'green rate'">{{item.pre}}%</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    props:['lowAgentList','areaId'],
    data(){
      return {

      }
    },
  }
</script>
<style lang="less" scoped="scoped">
.agent_list{
  color: #666666;
  p:nth-of-type(5){
    text-align: right;
  }
  .fs_list_hd{
    padding: 13px 20px 13px 14px;
    text-align: left;
    p{
      flex: 1;
    }
    p:nth-of-type(3){
      text-align: center;
    }
    p:nth-of-type(4){
      text-align: right;
    }
  }
  .fs_list_bd{
    a{
      display: block;
    }
    a:nth-of-type(2n+1){
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
          color: #999999;
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
      .target{
          text-align: center;
      }
      .rate{
        text-align: right;
      }
      .sales{
        text-align: right;
        font-weight: bold;
        span{
            display: block;
            font-weight: normal;
            color: #5870FE;
            font-size: 12PX;
        }
      }

      .red{
        color: #FF6675 !important;
        font-weight: bold !important;
      }
      .green{
        color: #4ED79C;
      }
    }
  }
}

</style>
