<template>
  <header class="fs_header bd_bt">
    <router-link :to="{path:'/fsReportHome',query:{area:'all'}}">
      <i class="iconfont">&#xe629;</i>
    </router-link>
    <popover placement="bottom">
      <div slot="content" class="popover-demo-content">
        <router-link :to="{path:'/fsReportHome',query:{area:'all'}}">
          全国
        </router-link>
        <router-link :to="{path:'/fsAreaReport',query:{area:'ES000000'}}">
          东区
        </router-link>
        <router-link  :to="{path:'/fsAreaReport',query:{area:'SS000000'}}">
          南区
        </router-link>
        <router-link :to="{path:'/fsAreaReport',query:{area:'NS000000'}}">
          北区
        </router-link>
      </div>
      <div class="flex_item">
        <span v-if="$route.query.area == 'all'||$route.query.area == undefined">全国</span>
        <span v-else-if="$route.query.area == 'ES000000'">东区</span>
        <span v-else-if="$route.query.area == 'SS000000'">南区</span>
        <span v-else-if="$route.query.area == 'NS000000'">北区</span>
        <i class="iconfont">&#xe645;</i>
      </div>
    </popover>
  </header>
</template>
<script>
  import { Popover } from 'vux'
  export default {
    data(){
      return {
      }
    },
    components:{
      Popover
    },
  }
</script>

<style lang="less">
  .fs_header{
    height: 36px;
    padding: 0 20px;
    line-height: 36px;
    display: -webkit-box;
    display: flex;
    justify-content: space-between;
    color: #5870FE;
    span{
      font-size: 12PX;
    }
  }
  .vux-popover{
    width: 60px;
    box-shadow:0px 2px 12px 0px rgba(0,0,0,0.1);
    .popover-demo-content{
      border-radius: 4px;
      a{
        text-align: center;
        display: block;
        color: #ffffff;
        padding: 2px 0;
        border-bottom: 1PX solid #F3F3F3;
        line-height: 20px;
        border-radius: 4px;
      }
    }
  }

</style>
