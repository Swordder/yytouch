<template>
  <div class="fs_area_rp">
    <HeadNav></HeadNav>
    <div class="con_top">
      <h1>{{total_data.date.split('-')[0]}}年{{total_data.date.split('-')[1]}}月-护固莱士流向报告</h1>
      <div class="top_num">本区域代表数 <span>{{total_data.total_rep_num}} 人</span></div>
      <div class="top_num">本区域服务医院数 <span>{{total_data.total_hospital_num}} 家</span></div>
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
          <HosList v-if="Object.keys(area_flow_data).length != 0" :lowHosList='area_flow_data'></HosList>
          <div v-else class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
          </div>
        </template>
        <div class="total_hos_btn">
            <router-link :to="{path:'/fsRpFlowHosList',query:{area:$route.query.area}}">查看全部医院</router-link>
        </div>
    </div>
    <div class="area_rp_list margin_top_0">
        <div class="area_rp_list_hd flex_item bd_bt">
            <h4><span></span>0销量代表</h4>
        </div>
        <template>
          <ZeroAgentList v-if="Object.keys(area_zero_rep).length != 0" :agentList="area_zero_rep"></ZeroAgentList>
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
          <ZeroSaleHos v-if="Object.keys(area_zero_hospital).length != 0" :hosList="area_zero_hospital"></ZeroSaleHos>
          <div v-else class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
          </div>
        </template>
    </div>
    <!-- <div class="area_rp_list margin_top_0">
        <div class="area_rp_list_hd flex_item bd_bt">
            <h4><span></span>代表名单</h4>
        </div>
        <AreaAgentList></AreaAgentList>
    </div> -->
  </div>
</template>
<script>
import HeadNav from '../../components/fsReport/HeadNav.vue'
import ConTop from '../../components/fsReport/ConTop.vue'
import Progress from '../../components/fsReport/Progress.vue'
import HosList from '../../components/fsReport/HosList.vue'
import ZeroAgentList from '../../components/fsReport/ZeroAgentList.vue'
import ZeroSaleHos from '../../components/fsReport/ZeroSaleHos.vue'
import AreaAgentList from '../../components/fsReport/AreaAgentList.vue'
import { getStore } from '../../config/util.js'
import { areaData } from '../../api/sendRequest.js'
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
    components:{
        HeadNav,
        ConTop,
        Progress,
        HosList,
        ZeroAgentList,
        ZeroSaleHos,
        AreaAgentList
    },
    mounted() {
      this.getAreaData()
    },
    methods:{
      async getAreaData(){
        let res = await areaData(getStore('openid'),this.$route.query.area);
        this.total_data = res.data;
        this.area_flow_data = res.data.area_flow_data;
        this.area_zero_rep = res.data.area_zero_rep;
        this.area_zero_hospital = res.data.area_zero_hospital;
        this.item = {
          id: this.$route.query.area,
          area: this.$route.query.area == 'ES000000'?'东区':(this.$route.query.area == 'NS000000'?'北区':'南区'),
          sales: res.data.target.month_target,
          now_num: res.data.target.total_trans,
          y_num: res.data.target.today_trans,
          percent: res.data.target.today_trans_pre
        }
      }
    }
}
</script>
<style lang="less">
    .fs_area_rp{
        .area_rp_progress{
            margin: -38px 15px;
        }
        .con_top{
          height: 155px;
          padding: 28px 20px 0;
          background-color: #5870FE;
          color: #ffffff;
          h1{
            font-size: 16PX;
            margin-bottom: 8px;
          }
          .top_num{
            font-size: 12PX;
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
