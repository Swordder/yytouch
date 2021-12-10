<template>
    <div data-name="rp_area_agent_list">
      <HeadNav></HeadNav>
        <TabBtns @changeAreaData="changeAgentArea" :allAreas ='all_areas' :initId="areas_id"></TabBtns>
        <template>
          <ZeroAgentList v-if="Object.keys(agent_list).length != 0" :agentList="agent_list" :areaId="areas_id"></ZeroAgentList>
          <div v-else class="item_empty_status">
          	<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
          	<p>暂无数据</p>
          </div>
        </template>
        <divider>我是有底线的</divider>
    </div>
</template>
<script>
import HeadNav from '../../components/reports/HeadNav.vue'
import TabBtns from '../../components/reports/TabBtns.vue'
import ZeroAgentList from '../../components/reports/ZeroAgentList.vue'
import { getStore, getSessionStore } from '../../config/util.js'
import { hosZero,getArea } from '../../api/sendRequest.js'
import { Divider } from 'vux'
import { mapState,mapMutations,mapActions} from 'vuex'
export default{
    data(){
        return {
          all_areas:[],
          agent_list:[],
          areas_id:'',
          list:{},
        }
    },
    computed: {
      ...mapState([
          'user_info',
      ]),
    },
    components:{
      HeadNav,
      ZeroAgentList,
      TabBtns,
      Divider
    },
    mounted() {
      this.getAllAreas();
      this.getAgentList();
    },
    methods:{
      // 获取所有大区
      async getAllAreas(){
        let res = await getArea(this.user_info.yyid,this.user_info.user_token,this.$route.query.total_id);
        this.all_areas = [...res.data];
      },
      async getAgentList(){
        let res = await hosZero(this.user_info.yyid,this.user_info.user_token,this.$route.query.total_id,'rep');
        if(res.errcode == -1){
        	this.$router.push({path:'/rpLimitAuthor'});
        	return
        };
        let areaid = this.$route.query.node_yyid;
        if (areaid) {
          this.agent_list = res.data[areaid];
        }
        this.areas_id = areaid;
        this.list = res.data;
      },
      changeAgentArea(index){
        this.agent_list = this.list[index];
        if(index == 'all'){
          this.areas_id = this.$route.query.total_id;
        } else {
          this.areas_id = index;
        }
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
