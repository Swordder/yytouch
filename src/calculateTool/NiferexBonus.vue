<template>
  <div class="caculate_page ni_caculate" data-name = "page_ni_bonus">
    <header class="tab_link">
      <router-link to="/niferexBonus">达成增长奖</router-link>
      <router-link to="/nifereHosAddBonus" style="margin-right:0">策略医院增长奖</router-link>  
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  import { hideMenu } from '../../config/share.js'
  export default{
    data(){
      return{
      }
    },
    mounted(){
      hideMenu();
    },
  }
</script>

<style lang="less">
  @import '../../assets/css/calculate.less';
  .ni_caculate{
    .tab_link{
      height: 110px;
      text-align: center;
      a{
        display: inline-block;
        margin: 15px 30px 0 0;
        color: #ffffff;
      }
      .router-link-active{
        position: relative;
        &::after{
          content: '';
          position: absolute;
          left: 50%;
          bottom: -4px;
          transform: translateX(-50%);
          width: 24px;
          height: 4px;
          border-radius: 3px;
          background-color: #ffffff;
        }
      }
    }
  }
</style>
