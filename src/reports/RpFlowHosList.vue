<template>
    <div class="fs_flow_hos_rp" data-name="rp_flow_hoslist">
      <HeadNav></HeadNav>
        <div class="area_rp_list">
            <div class="area_rp_list_hd flex_item bd_bt">
                <h4><span></span>最新流向医院</h4>
                <p class="update_tiem">更新于{{date.split('-').join('.')}}</p>
            </div>
            <template v-if="area_flow_list.length != 0">
              <HosList :lowHosList='area_flow_list' :areaId="$route.query.node_yyid"></HosList>
            </template>
            <div v-else class="item_empty_status">
              <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
              <p>暂无数据</p>
            </div>
        </div>
        <divider>我是有底线的</divider>
    </div>
</template>
<script>
import HeadNav from '../../components/reports/HeadNav.vue'
import HosList from '../../components/reports/HosList.vue'
import { getStore } from '../../config/util.js'
import { rpHosAreaflow ,getArea} from '../../api/sendRequest.js'
import { Divider } from 'vux'
import { mapState,mapMutations,mapActions} from 'vuex'
export default{
    data(){
      return {
        date:'',
        area_flow_list:[],
        all_areas:[]
      }
    },
    components:{
      HeadNav,
      HosList,
      Divider
    },
    computed: {
      ...mapState([
          'user_info',
      ]),
    },
    mounted() {
      this.getAllAreas();
      this.getFlowData()
    },
    methods:{
      // 获取所有大区
      async getAllAreas(){
        let res = await getArea(this.user_info.yyid,this.user_info.user_token,this.$route.query.total_id);
        if(res.data.length === 0){
          return
        }
        this.all_areas = [...res.data];
        this.areas_id = this.all_areas[0].area_node_yyid;
      },
      async getFlowData(){
        let res = await rpHosAreaflow(this.user_info.yyid,this.user_info.user_token,this.$route.query.node_yyid);
        if(res.errcode == -1){
        	this.$router.push({path:'/rpLimitAuthor'});
        	return
        };
        this.date = res.data.date;
        this.area_flow_list = res.data.area_flow_data;
      }
    }
}
</script>
<style lang="less">
    .fs_flow_hos_rp{
        .area_rp_list{
            // border-top: 10px solid #F5F5F5;
            .area_rp_list_hd{
                padding: 15px 15px 10px;
                h4{
                    font-size: 16PX;
                    font-weight: bold;
                    span{
                        display: inline-block;
                        width: 4px;
                        height: 14px;
                        background-color: #5870FE;
                        border-radius:3px;
                        margin-right: 6px;
                    }
                }
                .update_tiem{
                    color: #5870FE;
                    font-size: 12PX;
                }
            }
            .item_empty_status{
            	text-align: center;
            	padding:30px 0 20px 0;
            	color: #999999;
            	img{
            		width: 88px;
            	}
            }
            .total_hos_btn{
                text-align: center;
                padding: 22px 0;
                border-top: 1PX solid #F3F3F3;

                a{
                    width: 200px;
                    background-color: #5870FE;
                    color: #ffffff;
                    border-radius: 18px;
                    line-height: 36px;
                    display: inline-block;
                }
            }
        }
    }

</style>
