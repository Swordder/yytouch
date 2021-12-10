<template>
  <div class="fs_list">
    <div class="fs_list_hd flex_item">
      <p>医院</p>
      <p>指标</p>
      <p>实际</p>
      <p>达成率</p>
    </div>
    <div class="fs_list_bd">
      <div
        class="fs_list_item flex_item"
        v-for="(item,index) in lowHosList"
        :key="index">
        <div class="hos_name flex_item">
          <span :class="(index+1) <= 3?'red':''">{{index+1}}</span>
          <div>{{item.hospital_name}}<p class="agent_name">{{item.true_name}}</p></div>
        </div>
        <p class="target">{{item.target}}</p>
        <p class="sales">
          {{item.order_num}}
          <span v-show="item.yesterday_order_num != 0 && item.yesterday_order_num != null">昨日{{item.yesterday_order_num > 0?'+':''}}{{item.yesterday_order_num}}</span>
        </p>
        <p :class="item.pre > 0?'red rate':'green rate'">{{item.pre}}%</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['lowHosList','areaId'],
    data(){
      return {

      }
    },
    methods:{
    }
  }
</script>
<style>
  .weui-toast.weui-toast_text{
    min-height: 0;
    background-color: #F65B6A;
    width: 100% !important;
    top: 0px;
  }
  .weui-toast_text .weui-toast__content{
    width: 100%;
  }
</style>
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
    a{
      display: block;
    }
    a:nth-of-type(2n+1){
      background-color: #F2F4FF;
    }
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
