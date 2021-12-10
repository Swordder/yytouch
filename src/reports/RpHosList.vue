<template>
    <div data-name="rp_area_hoslist">
      <HeadNav></HeadNav>
        <TabBtns @changeAreaData="changeAgentArea" :allAreas ='all_areas' :initId="areas_id"></TabBtns>
        <template>
          <ZeroSaleHos v-if="Object.keys(hos_list).length != 0" :hosList="hos_list" :areaId="areas_id" :rpAuth="rp_auth"></ZeroSaleHos>
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
import ZeroSaleHos from '../../components/reports/ZeroSaleHos.vue'
import { getStore, getSessionStore } from '../../config/util.js'
import { rpAuthority,hosZero,getArea } from '../../api/sendRequest.js'
import { Divider } from 'vux'
  import { mapState,mapMutations,mapActions} from 'vuex'
export default{
    data(){
        return {
          all_areas:[],
          areas_id:'',
          hos_list:[],
          list:{},
          rp_auth:[]
        }
    },
    components:{
      HeadNav,
      TabBtns,
      ZeroSaleHos,
      Divider
    },
    computed: {
      ...mapState([
          'user_info',
      ]),
    },
    mounted() {
      this.getAuth()
    },
    methods:{
      // 获取所有大区
      async getAllAreas(){
        let res = await getArea(this.user_info.yyid,this.user_info.user_token,this.$route.query.total_id);
        this.all_areas = [...res.data];
      },
      async getAuth() {
        // 获取对应账号区的权限，并判断有没有全国权限
        let res = await rpAuthority(this.user_info.yyid,this.user_info.user_token);
        this.rp_auth = res.data.filter(item => item.report_type == 1);
        // 极端情况，当只有大区权限，突然开通了全国权限时，对Tab显示和tabitem对应的医院进行重新获取
        if(this.rp_auth.length === 0){
          let area_res = await getArea(this.user_info.yyid,this.user_info.user_token,this.$route.query.node_yyid);
          this.all_areas = [...area_res.data];
          this.getZeroHosData();
          return
        } else {
          let area_res = await getArea(this.user_info.yyid,this.user_info.user_token,this.rp_auth[0].node_yyid);
          this.all_areas = [...area_res.data];
          this.getZeroHosData();
        }
      },
      async getZeroHosData(){
        let total_id = this.rp_auth.length !== 0?this.rp_auth[0].node_yyid:this.$route.query.node_yyid;
        let res = await hosZero(this.user_info.yyid,this.user_info.user_token,total_id,'hospital');
        if(res.errcode == -1){
        	this.$router.push({path:'/rpLimitAuthor'});
        	return
        };
        let areaid = this.$route.query.node_yyid;
        if (areaid) {
          this.hos_list = res.data[areaid];
        }
        this.areas_id = areaid;
        this.list = res.data;
      },
      changeAgentArea(index){
        this.hos_list = this.list[index];
        this.areas_id = index;
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
