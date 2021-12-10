<template>
  <div class="fs_list">
    <div class="fs_list_hd flex_item">
      <p>医院</p>
      <p>指标</p>
      <p>实际</p>
      <p>达成率</p>
    </div>
    <div class="fs_list_bd">
      <div class="fs_list_item flex_item"
        v-for="(item,index) in hosList"
        @click="goToAgentInfo(item.user_yyid)"
        :key="index">
        <div class="hos_name flex_item">
          <span>{{index+1}}</span>
          <div>{{item.hospital_name}}<p class="agent_name">{{item.true_name}}</p></div>
        </div>
        <p class="target">{{item.target}}</p>
        <p class="sales">0</p>
        <p class="rate green">0%</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['hosList','areaId','rpAuth'],
    data(){
      return {

      }
    },
    mounted() {
    },
    methods:{
      goToAgentInfo(yyid){
        if(yyid == undefined || yyid == ''|| yyid == null){
          this.$vux.toast.text('暂无代表服务','top');
          return
        }
        if(this.areaId == 'all'&&this.rpAuth.length!== 0){
          this.$router.push({
            path:'/agentReport',
            query:{
              u_yyid:yyid,
              node_yyid:this.rpAuth[0].node_yyid
            }
          })
        } else {
          this.$router.push({
            path:'/agentReport',
            query:{
              u_yyid:yyid,
              node_yyid:this.areaId
            }
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped="scoped">
.fs_list{
  color: #666666;
  .fs_list_hd{
    padding: 13px 20px 13px 30px;
    text-align: left;
    p{
      flex: 1;
    }
    p:nth-of-type(1){
      flex-basis: 130px;
    }
    p:nth-of-type(4){
      text-align: right;
    }
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
        flex-basis: 146px;
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
          margin-top: 4px;
          font-weight: normal;
          color: #999999;
        }
      }
      p{
        text-align: left;
        flex: 1;
      }
      .sales{
        span{
          display: block;
          font-size: 12PX;
          color: #5870FE;
          margin-top: 4px;
        }
      }
      .rate{
        text-align: right;
        font-weight: bold;
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
