<template>
    <div>
        <HeadNav></HeadNav>
        <TabBtns @changeAreaData="changeAgentArea"></TabBtns>
        <template>
          <ZeroAgentList v-if="Object.keys(agent_list).length != 0" :agentList="agent_list"></ZeroAgentList>
          <div v-else class="item_empty_status">
          	<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
          	<p>暂无数据</p>
          </div>
        </template>
    </div>
</template>
<script>
import HeadNav from '../../components/fsReport/HeadNav.vue'
import TabBtns from '../../components/fsReport/TabBtns.vue'
import ZeroAgentList from '../../components/fsReport/ZeroAgentList.vue'
import { getStore, getSessionStore } from '../../config/util.js'
import { zeroSalesData } from '../../api/sendRequest.js'
export default{
    data(){
        return {
          agent_list:[],
          list:{},
        }
    },
    components:{
      HeadNav,
      ZeroAgentList,
      TabBtns,
    },
    mounted() {
      this.getAgentList();
    },
    methods:{
      async getAgentList(){
        let res = await zeroSalesData(getStore('openid'),'rep');
        let areaid = this.$route.query.areaid;
        if (areaid) {
          this.agent_list = res.data[areaid];
        }else{
          this.agent_list = res.data.all;
        }
        this.list = res.data;
      },
      changeAgentArea(index){
        this.agent_list = this.list[index]
      }
    }
}
</script>
<style lang="less">
  .item_empty_status{
  	text-align: center;
  	padding:30px 0 20px 0;
  	color: #999999;
  	img{
  		width: 88px;
  	}
  }
</style>
