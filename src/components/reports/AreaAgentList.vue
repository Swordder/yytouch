<template>
  <div class="fs_list agent_list">
    <div class="fs_list_hd flex_item">
        <p>代表</p>
        <p>医院数</p>
        <p>指标</p>
        <p>实际</p>
        <p>达成率</p>
    </div>
    <div class="area_agent" v-for="(item, index) in totalData" :key="index">
        <p class="province">{{item.area_name}} ({{item.reps_count}})名</p>
        <div class="fs_list_bd">
          <router-link class="fs_list_item_wrap" :to="{path:'/agentReport',query:{u_yyid:item2.user_yyid,node_yyid:$route.query.node_yyid}}" v-for="(item2,index2) in item.reps" :key="index2">
            <div class="fs_list_item flex_item">
              <div class="hos_name flex_item">
                <div><p class="agent_name">{{item2.rep_name}}</p></div>
              </div>
              <p class="hos_num">{{item2.hospital_count}}</p>
              <p class="target">{{item2.target}}</p>
              <p class="sales">{{item2.order_num}}<span v-show="item2.yesterday_order_num > 0">昨日+{{item2.yesterday_order_num}}</span></p>
              <p :class="item2.pre > 0?'red rate':'green rate'">{{item2.pre}}%</p>
            </div>
          </router-link>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['totalData'],
    data(){
      return {
      }
    },
    mounted() {
    }
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
      line-height: 28px;
      font-size: 16PX;
      font-weight: bold;
  }
  .fs_list_bd{
    .fs_list_item_wrap:nth-of-type(2n+1){
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
