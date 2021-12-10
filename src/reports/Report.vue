<template>
  <div class="fs_home" data-name="rp_home">
    <HeadNav></HeadNav>
    <ConTop :date='date' :dataCon='{data_1}'></ConTop>
    <div class="month_total_data">
      <div class="mtd_item">{{date.split('-')[1]}}月全国销量(套)<span class="mtd_num">{{data_1.total_trans}}</span><span class="font_10">昨日 {{data_1.today_trans > 0?'+':'-'}}{{data_1.today_trans}}</span></div>
      <div class="mtd_item">{{date.split('-')[1]}}月全国指标达成率<span class="mtd_num">{{data_1.total_trans_pre}}%</span><span class="font_10">昨日 {{data_1.today_trans_pre > 0?'+':'-'}}{{data_1.today_trans_pre}}%</span></div>
    </div>
    <div class="area_progress x_table">
      <h2>各区达成进度</h2>
      <x-table :cell-bordered="false">
        <thead>
          <tr>
            <th>名称</th>
            <th>实际/指标</th>
            <th>达成率</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in areas"
            @click="goToArea('/areaReport',item,index)"
            :key="index">
            <td>
              <p class="area_name">{{item.area}}</p>
              <p class="rep_name font_12">{{item.rep_name}}</p>
            </td>
            <td>
              <p class="target">{{item.now_num}}<span class="font_12"> (昨日{{item.y_num >= 0?'+'+item.y_num:'-'+item.y_num}})</span></p>
              <p class="font_12">{{item.sales}}</p>
            </td>
            <td>
              <p :class="item.percent > 0?'red':'green'">{{item.percent}}%</p>
            </td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <div v-show="data_2.length != 0" class="charts chart_line">
      <div class="chart_hd bd_bt">
        <h3>{{date.split('-')[1]}}月全国销量</h3>
        <div class="chart_hd_num">
          <p class="flex_item">{{data_1.total_trans}} <span class="font_10"><i class="iconfont">&#xe6a7;</i> 昨日 {{data_1.today_trans > 0?'+':'-'}}{{data_1.today_trans}}</span></p>
        </div>
      </div>
      <ve-line
        height="280px"
        :data="data_2"
        :extend="chartExtends"
        >
      </ve-line>
    </div>
    <div v-show="data_3.length != 0" class="charts chart_line">
      <div class="chart_hd bd_bt">
        <h3>{{date.split('-')[1]}}月全国指标达成率</h3>
        <div class="chart_hd_num">
          <p class="flex_item">{{data_1.total_trans_pre}}% <span class="font_10"><i class="iconfont">&#xe6a7;</i> 昨日 {{data_1.today_trans_pre > 0?'+':'-'}}{{data_1.today_trans_pre}}%</span></p>
        </div>
      </div>
      <ve-line
        height="260px"
        :data="data_3"
        :extend="chartExtends2"
        :settings="chartSettings2"
        >
        </ve-line>
    </div>
    <div v-show="data_5.length != 0" class="chart_ring">
      <div class="chart_ring_hd"><h5 class="flex_item"><p></p>0销量医院预警</h5></div>
      <grid>
        <grid-item :label='data_5.total_hospital' key="1">
          全国目标医院总数(家)
        </grid-item>
        <grid-item :label="data_5.total_zero_hospital" key="2" class="pink">
          全国无销量医院(家)
        </grid-item>
      </grid>
      <div class="sales_progress x_table">
        <x-table :cell-bordered="false">
          <thead>
            <tr>
              <th>名称</th>
              <th>目标医院总数(家)</th>
              <th>无销量目标医院数(家)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in hosData"
              @click="goToArea('/rpHosList',item,index)"
              :key="index">
              <td>
                <p class="area_name">{{item.area}}</p>
                <p class="rep_name font_12">{{item.rep_name}}</p>
              </td>
              <td>
                <p class="font_bold">{{item.hospital_totals}}</p>
              </td>
              <td>
                <p class="red font_bold">{{item.zero_hospital_totals}}</p>
              </td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
    <div v-show="data_8.length != 0" class="chart_ring">
      <div class="chart_ring_hd"><h5 class="flex_item"><p></p>0销量代表预警</h5></div>
      <grid>
        <grid-item :label="data_8.total_reps === null?0:data_8.total_reps" key="1">
          全国代表总数(人)
        </grid-item>
        <grid-item :label="data_8.total_zero_reps" key="2" class="pink">
          全国无销量代表数(人)
        </grid-item>
      </grid>
      <div class="sales_progress x_table">
        <x-table :cell-bordered="false">
          <thead>
            <tr>
              <th>名称</th>
              <th>代表总数(人)</th>
              <th>无销量代表数(人)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in agentData"
              @click="goToArea('/rpAgentList',item,index)"
              :key="index">
              <td>
                <p class="area_name">{{item.area}}</p>
                <p class="rep_name font_12">{{item.rep_name}}</p>
              </td>
              <td>
                <p class="font_bold">{{item.reps_totals}}</p>
              </td>
              <td>
                <p class="red font_bold">{{item.zero_reps_totals}}</p>
              </td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
    <div  v-show="data_6.length !== 0" class="low_yield_rate">
      <div class="low_yied_rate_hd bd_bt"><h5 class="flex_item"><p></p>低达成医院TOP10</h5></div>
      <TabBtns @changeAreaData="changeArea" :allAreas ='all_areas' :initId="init_area_id"></TabBtns>
      <template>
        <HosList v-if="Object.keys(low_hos_list).length != 0" :lowHosList='low_hos_list' :areaId="rep_area_id == 'all'?$route.query.node_yyid:rep_area_id"></HosList>
        <div v-else class="item_empty_status">
          <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
          <p>暂无数据</p>
        </div>
      </template>
    </div>
    <div v-show="data_7.length !== 0" class="low_yield_rate">
      <div class="low_yied_rate_hd bd_bt"><h5 class="flex_item"><p></p>低达成代表TOP10</h5></div>
      <TabBtns @changeAreaData="changeAgentArea" :allAreas ='all_areas' :initId="init_area_id"></TabBtns>
      <template>
        <AgentList v-if="Object.keys(low_agent_list).length != 0" :lowAgentList='low_agent_list' :areaId="rep_area_id == 'all'?$route.query.node_yyid:rep_area_id"></AgentList>
        <div v-else class="item_empty_status">
          <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
          <p>暂无数据</p>
        </div>
      </template>
    </div>
    <divider>我是有底线的</divider>
  </div>
</template>
<script>
  import ConTop from '../../components/reports/ConTop.vue'
  import HeadNav from '../../components/reports/HeadNav.vue'
  import Progress from '../../components/reports/Progress.vue'
  import HosSaleProgress from '../../components/reports/HosSaleProgress.vue'
  import TabBtns from '../../components/reports/TabBtns.vue'
  import HosList from '../../components/reports/HosList.vue'
  import AgentList from '../../components/reports/AgentList.vue'
  import { reportConSetting,ringReportSetting, getStore, getSessionStore } from '../../config/util.js'
  import { rpData, rpHomeData, getArea } from '../../api/sendRequest.js'
  import { Grid, GridItem, GroupTitle, XTable, Divider  } from 'vux'
  import { mapState,mapMutations,mapActions} from 'vuex'
  export default {
    data(){
      reportConSetting(this);
      return {
        date:'',
        areas:[],
        areas_arr:[],
        chartSettings:{
          stack: {
            '用户': [],
          },
          area: false
        },
        chartSettings2:{
          yAxisType: ['percent'],
          digit: 0,
        },
        all_areas:[],
        rep_area_id:'',
        init_area_id:'',
        data_1:{},
        data_2:{},
        data_3:{},
        data_4:{},
        data_5: {},
        data_6:{},
        low_hos_list:{},
        data_7:{},
        low_agent_list:{},
        data_8:{},
        hosData:[],
        agentData:[],
        zero_hos_list:{},
        color_arr:[],
      }
    },
    components:{
      ConTop,
      HeadNav,
      Progress,
      HosSaleProgress,
      HosList,
      AgentList,
      TabBtns,
      Grid,
      GridItem,
      GroupTitle,
      XTable,
      Divider
    },
    computed: {
      ...mapState([
          'user_info',
          'color'
      ]),
    },
    mounted(){
      this.$nextTick(function(){
        this.getAllAreas()
        this.getHomeData();
      })
    },
    methods:{
      afterConfig(options){
        var data2 = this.data_2;
        options.legend.data = [...this.areas_arr];
        options.tooltip.formatter = function(data2){
          var res = null;
          if(data2.length > 0) {
              var areaname = data2[0].name;
              res = areaname+'<br />';
          }
          for(var i = (data2.length - 1); i >= 0; i--) {
              var marker = data2[i].marker;
              var data = data2[i].data;
              var seriesName = data2[i].seriesName;
              res += marker + seriesName + ": " + data[1] + '<br />';
          };
          return res;
        };
        return options;
      },
      // table跳转
      goToArea(path,item,index){
        this.$router.push({
          path:path,
          query:{
            node_yyid:item.id,
            area:item.area,
            bgcolor:this.color[index],
            total_id:this.$route.query.node_yyid,
          },
        })
      },
      // 获取所有大区
      async getAllAreas(){
        let res = await getArea(this.user_info.yyid,this.user_info.user_token,this.$route.query.node_yyid);
        this.all_areas = [...res.data];
        if(res.data.length !== 0){
          this.areas_arr = res.data.map(item => {
            return item.area_name
          })
          this.color_arr = this.color.slice(0,res.data.length);
          this.chartSettings = {
            stack: {
              '用户': [...this.areas_arr] ,
            },
            area: false
          }
          this.chartExtends.color = [...this.color_arr];
          this.chartExtends2.color = [...this.color_arr];
          this.chartExtends3.color = [...this.color_arr];
        }
      },
      async getHomeData() {
        let res = await rpHomeData(this.user_info.yyid,this.user_info.user_token,this.$route.query.node_yyid);
        if(res.errcode == -1){
        	this.$router.push({path:'/rpLimitAuthor'});
        	return
        };
        this.init_area_id = 'all';
        this.date = res.data.date;
        this.data_1 = {...res.data.data_1};
        this.data_2 = {...res.data.data_2};
        this.data_3 = {...res.data.data_3};
        this.areas = [...res.data.data_4.areas];
        this.data_5 = {...res.data.data_5};
        this.data_6 = {...res.data.data_6};
        this.data_7 = {...res.data.data_7};
        this.data_8 = {...res.data.data_8};
        this.low_hos_list = [...res.data.data_6.all];
        this.low_agent_list = [...res.data.data_7.all];
        this.rep_area_id = this.init_area_id;
        // 0销量医院预警的pie图
        this.hosData = res.data.data_5.data;
        this.hosData.map((item,index) => {
          item.type = "目标医院";
          item.type_1 = '家';
        });
        // 0销量代表预警
        this.agentData = res.data.data_8.data;
        this.agentData.map((item,index) => {
          item.hospital_totals = item.reps_totals;
          item.zero_hospital_totals = item.zero_reps_totals;
          item.type = "代表";
          item.type_1 = '人';
        });
      },
      changeArea(index){
      	this.low_hos_list = this.data_6[index];
        this.rep_area_id = index;
      },
      changeAgentArea(index){
        this.low_agent_list = this.data_7[index];
        this.rep_area_id = index;
      },
    }
  }
</script>

<style lang="less">
  .month_total_data{
    margin: -30px 15px;
    background-color: #ffffff;
    box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
    border-radius:8px;
    padding: 20px 15px 10px;
    color: #666666;
    position: relative;
    z-index: 1;
    .mtd_item{
      font-size: 16PX;
      margin-bottom: 10px;
      span{
        color: #4577FF;
      }
      .mtd_num{
        margin: 0 4px 0px 10px;
      }
      .font_10{
        background-color: #DEE2FF;
        padding: 2px 8px;
        line-height: 20px;
      }
    }
  }
  .area_progress{
    margin-top: 56px;
    h2{
      font-size: 18PX;
      padding: 0 15px;
    }
    .line{
      margin-top: 20px;
      border-bottom: 1PX solid #E9E9E9;
    }
  }
  .x_table{
    .vux-table{
      thead{
        font-size: 12PX;
        color: #999999;
        tr{
          // border-bottom: 1px solid #E9E9E9;
        }
        th{
          text-align: left;
          /* &::before{
            border-bottom: none 0;
          } */
        }
        th:nth-of-type(1){
          width: 130px;
          text-align: left;
          padding-left: 15px;
          box-sizing: border-box;
        }
        th:nth-of-type(3){
          text-align: right;
          padding-right: 15px;
          box-sizing: border-box;
        }
      }
      tbody{
        line-height: 20px;
        color: #666666;
        font-size: 16PX;
        /* tr{
          border-bottom: 1px solid #E9E9E9;
        } */
        td{
          padding: 6px 0;
          text-align: left;
          &::before{
            // border-bottom: none;
          }
          .font_12{
            font-size: 12PX;
            transform-origin: left;
          }
          .font_bold{
            font-weight: bold;
          }
          .area_name{
            color: #333333;
            font-weight: bold;
          }
          .target{
            color: #5870FE;
            font-weight: bold;
            span{
              font-weight: normal;
            }
          }
        }
        td:nth-of-type(1){
          width: 120px;
          text-align: left;
          padding-left: 15px;
          box-sizing: border-box;
          &::before{
            left: 15px;
          }
        }
        td:nth-of-type(3){
          text-align: right;
          padding-right: 15px;
          box-sizing: border-box;
          color: #FFFFFF;
          &::before{
            right: 15px;
          }
          p{
            font-weight: bold;
            padding: 2px 7px;
          }
          .red{
            color: #F65B6A;
          }
          .green{
            color: #4ED79C;
          }
        }
      }
      &::after{
        border-top: none;
      }
    }
  }

  .charts{
    margin: 20px 15px;
    box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
    border-radius:8px;
    .chart_hd{
      padding: 10px 20px 5px;
      margin-bottom: 12px;
      h3{
        font-size: 18PX;
      }
      .chart_hd_num{
        p{
          font-size: 24PX;
          color: #5870FE;
          font-weight: bold;
          align-items: center;
          justify-content: flex-start;
          .font_10{
            margin-left: 10px;
            background-color: #DEE2FF;
            padding: 2px 4px;
            font-weight: normal;
            .iconfont{
              font-size: 14PX;
            }
          }
        }
      }

    }
  }
  .chart_ring{
    padding: 15px 0;
    border-top: 10px solid #F5F5F5;
    .chart_ring_hd{
      h5{
        padding:0 15px;
        font-size: 18PX;
        font-weight: bold;
        justify-content: flex-start;
        align-items: center;
        p{
          display: inline-block;
          width: 4px;
          height: 14px;
          border-radius: 2px;
          border-left: 4px solid #5870FE;
          margin-right: 6px;
          vertical-align: middle;
        }
      }
    }
    .weui-grids{
      padding:0 15px;
      &:before{
        border-top: none;
      }
      &:after{
        border-left: none;
      }
    }
    .weui-grid{
      color: #999999;
      text-align: center;
      padding-left: 0;
      padding-right: 0;
      &:before{
        border-right: none;
      }
      &:after{
        border-bottom: none;
      }
      .weui-grid__label{
        font-size: 18PX;
        font-weight: bold;
        color: #333333;
      }
    }
    .pink{
      .weui-grid__label{
        color: #F65B6A;
      }
    }
    .chart_ring_bd{
      // padding: 15px;
      box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
      border-radius:8px;
    }
    .sales_progress{
      a{
        display: block;
      }
    }
    .sales_progress.x_table{
      .vux-table{
        thead{
          th:nth-of-type(1){
            width: 110px;
          }
          th:nth-of-type(2){
            text-align: right;
          }
        }
        tbody{
          td:nth-of-type(1){
            width: 110px;
          }
          td:nth-of-type(2){
            text-align: right;
          }
        }
      }
    }
  }
  .low_yield_rate{
    border-top: 10px solid #F5F5F5;
    .item_empty_status{
    	text-align: center;
    	padding:30px 0 20px 0;
    	color: #999999;
    	img{
    		width: 88px;
    	}
    }
    .low_yied_rate_hd{
      padding: 15px 15px 10px;
      h5{
        font-size: 18PX;
        font-weight: bold;
        justify-content: flex-start;
        align-items: center;
        p{
          display: inline-block;
          width: 4px;
          height: 14px;
          border-radius: 2px;
          border-left: 4px solid #5870FE;
          margin-right: 6px;
          vertical-align: middle;
        }
      }
    }

  }
</style>
