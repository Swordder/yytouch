<template>
  <div class="fs_area_rp" data-name="rp_area_home">
    <HeadNav></HeadNav>
    <div class="con_top">
      <p class="con_update_time">数据于{{total_data.date}}更新</p>
      <h1>{{total_data.date.split('-')[0]}}年{{total_data.date.split('-')[1]}}月-力蜚能流向报告</h1>
      <div class="top_num">本区域代表数 <span>{{total_data.total_rep_num}} 人</span></div>
      <div class="top_num">本区域目标医院数 <span>{{total_data.total_hospital_num}} 家</span></div>
    </div>
    <div class="area_rp_progress">
        <Progress :eData='{item}'></Progress>
    </div>
    <div class="area_rp_list">
        <div class="area_rp_list_hd flex_item bd_bt">
            <h4><span></span>最新流向医院</h4>
            <p class="update_tiem">更新于{{total_data.date.split('-').join('.')}}</p>
        </div>
        <template>
          <HosList v-if="Object.keys(area_flow_data).length != 0" :lowHosList='area_flow_data' :areaId="$route.query.node_yyid"></HosList>
          <div v-else class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
          </div>
        </template>
        <div class="total_hos_btn">
            <router-link :to="{path:'/rpFlowHosList',query:{area:$route.query.area,node_yyid:$route.query.node_yyid,total_id:$route.query.total_id}}">查看全部医院</router-link>
        </div>
    </div>
    <div class="area_rp_list margin_top_0">
        <div class="area_rp_list_hd flex_item bd_bt">
            <h4><span></span>0销量代表</h4>
        </div>
        <template>
          <ZeroAgentList v-if="Object.keys(area_zero_rep).length != 0" :agentList="area_zero_rep" :areaId="$route.query.node_yyid"></ZeroAgentList>
          <div v-else class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
          </div>
        </template>
    </div>
    <div class="area_rp_list margin_top_0">
        <div class="area_rp_list_hd flex_item bd_bt">
            <h4><span></span>0销量医院</h4>
        </div>
        <template>
          <ZeroSaleHos v-if="Object.keys(area_zero_hospital).length != 0" :hosList="area_zero_hospital" :areaId="$route.query.node_yyid"></ZeroSaleHos>
          <div v-else class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
          </div>
        </template>
        <div class="total_hos_btn">
            <router-link :to="{path:'/rpHosList',query:{area:$route.query.area,node_yyid:$route.query.node_yyid,total_id:$route.query.total_id}}">全部0销量医院</router-link>
        </div>
    </div>
    <div class="area_rp_list margin_top_0">
        <div class="area_rp_list_hd flex_item bd_bt">
            <h4><span></span>代表名单</h4>
        </div>
        <AreaAgentList :totalData="total_data.area_data"></AreaAgentList>
    </div>
    <divider>我是有底线的</divider>
  </div>
</template>
<script>
import HeadNav from '../../components/reports/HeadNav.vue'
import ConTop from '../../components/reports/ConTop.vue'
import Progress from '../../components/reports/Progress.vue'
import HosList from '../../components/reports/HosList.vue'
import ZeroAgentList from '../../components/reports/ZeroAgentList.vue'
import ZeroSaleHos from '../../components/reports/ZeroSaleHos.vue'
import AreaAgentList from '../../components/reports/AreaAgentList.vue'
import { getStore } from '../../config/util.js'
import { areaDataRp,getArea } from '../../api/sendRequest.js'
import { Divider  } from 'vux'
 import { mapState,mapMutations,mapActions} from 'vuex'
export default{
    data(){
      return {
        total_data:{
          date:'',
          total_rep_num:'',
          total_hospital_num:'',
          target:{},
          area_zero_hospital:[],
          area_zero_rep:[],
          area_flow_data:[]
        },
        item:{},
        area_flow_data:[],
        area_zero_rep:[],
        area_zero_hospital:[]
      }
    },
    watch:{
      '$route'(to,from){
        if (to.fullPath != from.fullPath ) {
          this.getAreaData()
        } else{
          return
        }

      }
    },
    computed: {
      ...mapState([
          'user_info',
      ]),
    },
    components:{
        HeadNav,
        ConTop,
        Progress,
        HosList,
        ZeroAgentList,
        ZeroSaleHos,
        AreaAgentList,
        Divider
    },
    created(){
      this.$nextTick(function(){
        this.getAreaData()
      })
    },
    methods:{
      async getAreaData(){
        let res = await areaDataRp(this.user_info.yyid,this.user_info.user_token,this.$route.query.node_yyid);
        if(res.errcode == -1){
        	this.$router.push({path:'/rpLimitAuthor'});
        	return
        };
        this.total_data = {...res.data};
        this.area_flow_data = res.data.area_flow_data;
        this.area_zero_rep = res.data.area_zero_rep;
        this.area_zero_hospital = res.data.area_zero_hospital;
        this.item = {
          id: this.$route.query.node_yyid,
          color: this.$route.query.color,
          area: this.$route.query.area,
          sales: res.data.target.month_target,
          now_num: res.data.target.total_trans,
          y_num: res.data.target.today_trans,
          percent: res.data.target.total_trans_pre
        }
      }
    }
}
</script>
<style lang="less">
    .fs_area_rp{
        .area_rp_progress{
            margin: -38px 15px;
            position: relative;
            z-index: 0;
        }
        .con_top{
          height: 180px;
          padding: 52px 20px 20px;
          background-color: #5870FE;
          color: #ffffff;
          position: relative;
          .con_update_time{
            background-color: #697EFE;
            font-size: 12PX;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
            line-height: 24px;
            z-index: 2;
          }
          h1{
            font-size: 18PX;
            margin-bottom: 8px;
          }
          .top_num{
            font-size: 16PX;
            margin-bottom: 7px;
            span{
              padding: 2px 8px;
              background-color: #3956FF;
              font-size: 14PX;
              border-radius: 15px;
              margin-left: 4px;
            }
          }
        }
        .area_rp_list{
            margin-top: 55px;
            border-top: 10px solid #F5F5F5;
            .item_empty_status{
            	text-align: center;
            	padding:30px 0 20px 0;
            	color: #999999;
            	img{
            		width: 88px;
            	}
            }
            .area_rp_list_hd{
                padding: 15px 15px 10px;
                h4{
                    font-size: 18PX;
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
                    font-size: 14PX;
                    line-height: 24px;
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
        .margin_top_0{
            margin-top: 0;
        }
    }

</style>
