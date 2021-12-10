<template>
  <div class="fs_home">
    <HeadNav></HeadNav>
    <ConTop :date='date' :dataCon='{data_1}'></ConTop>
    <div class="month_total_data">
      <div class="mtd_item">{{date.split('-')[1]}}月全国销量（套）<span class="mtd_num">{{data_1.total_trans}}</span><span class="font_10">昨日 {{data_1.today_trans > 0?'+':'-'}}{{data_1.today_trans}}</span></div>
      <div class="mtd_item">{{date.split('-')[1]}}月全国指标达成率<span class="mtd_num">{{data_1.total_trans_pre}}%</span><span class="font_10">昨日 {{data_1.today_trans_pre > 0?'+':'-'}}{{data_1.today_trans_pre}}%</span></div>
    </div>
    <div class="area_progress">
      <h2>各区达成进度</h2>
      <router-link :to="{path:'/fsAreaReport',query:{area:item.id}}" v-for="(item,index) in areas" :key="index">
        <Progress :eData='{item}'></Progress>
      </router-link>
      <div class="line"></div>
    </div>
    <div v-show="data_2.length != 0" class="charts chart_line">
      <div class="chart_hd bd_bt">
        <h3>{{date.split('-')[1]}}月全国销量</h3>
        <div class="chart_hd_num">
          <p class="flex_item">{{data_1.total_trans}} <span class="font_10"><i class="iconfont">&#xe6a7;</i> 昨日 {{data_1.today_trans > 0?'+':'-'}}{{data_1.today_trans}}</span></p>
        </div>
      </div>
      <ve-line height="280px" :data="data_2" :settings="chartSettings" :after-config="afterConfig" :extend="chartExtends"></ve-line>
    </div>
    <div v-show="data_3.length != 0" class="charts chart_line">
      <div class="chart_hd bd_bt">
        <h3>{{date.split('-')[1]}}月全国指标达成率</h3>
        <div class="chart_hd_num">
          <p class="flex_item">{{data_1.total_trans_pre}}% <span class="font_10"><i class="iconfont">&#xe6a7;</i> 昨日 {{data_1.today_trans_pre > 0?'+':'-'}}{{data_1.today_trans_pre}}%</span></p>
        </div>
      </div>
      <ve-line height="260px" :data="data_3" :extend="chartExtends2" :settings="chartSettings2"></ve-line>
    </div>
    <div v-show="data_5.length != 0" class="chart_ring">
      <div class="chart_ring_hd"><h5 class="flex_item"><p></p>0销量医院预警</h5></div>
      <grid>
        <grid-item :label='data_5.total_hospital' key="1">
          全国服务医院总数(家)
        </grid-item>
        <grid-item :label="data_5.total_zero_hospital" key="2" class="pink">
          全国无销量医院(家)
        </grid-item>
      </grid>
      <div class="chart_ring_bd">
        <ve-ring height="260px" :data="data_5.pie" :settings="chartSettings3" :extend="chartExtends3"></ve-ring>
      </div>
      <div class="sales_progress">
        <router-link :to="{path:'/fsRpHosList',query:{areaid:item.id}}" v-for="(item,index) in hosData" :key="index" >
          <HosSaleProgress :hosData='{item}'></HosSaleProgress>
        </router-link>
      </div>
    </div>
    <div v-show="data_8.length != 0" class="chart_ring">
      <div class="chart_ring_hd"><h5 class="flex_item"><p></p>0销量代表预警</h5></div>
      <grid>
        <grid-item :label="data_8.total_reps" key="1">
          全国服务代表总数(人)
        </grid-item>
        <grid-item :label="data_8.total_zero_reps" key="2" class="pink">
          全国无销量代表数(人)
        </grid-item>
      </grid>
      <div class="chart_ring_bd">
        <ve-ring height="260px" :data="data_8.pie" :settings="chartSettings3"  :extend="chartExtends3"></ve-ring>
      </div>
      <div class="sales_progress">
        <router-link :to="{path:'/fsRpAgentList',query:{areaid:item.id}}" v-for="(item,index) in agentData" :key="index" >
          <HosSaleProgress :hosData='{item}'></HosSaleProgress>
        </router-link>
      </div>
    </div>
    <div class="low_yield_rate">
      <div class="low_yied_rate_hd bd_bt"><h5 class="flex_item"><p></p>低达成医院TOP10</h5></div>
      <TabBtns @changeAreaData="changeArea"></TabBtns>
      <template>
        <HosList v-if="Object.keys(low_hos_list).length != 0" :lowHosList='low_hos_list'></HosList>
        <div v-else class="item_empty_status">
          <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
          <p>暂无数据</p>
        </div>
      </template>
    </div>
    <div class="low_yield_rate">
      <div class="low_yied_rate_hd bd_bt"><h5 class="flex_item"><p></p>低达成代表TOP5</h5></div>
      <TabBtns @changeAreaData="changeAgentArea"></TabBtns>
      <template>
        <AgentList v-if="Object.keys(low_agent_list).length != 0" :lowAgentList='low_agent_list'></AgentList>
        <div v-else class="item_empty_status">
          <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
          <p>暂无数据</p>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import ConTop from '../../components/fsReport/ConTop.vue'
  import HeadNav from '../../components/fsReport/HeadNav.vue'
  import Progress from '../../components/fsReport/Progress.vue'
  import HosSaleProgress from '../../components/fsReport/HosSaleProgress.vue'
  import TabBtns from '../../components/fsReport/TabBtns.vue'
  import HosList from '../../components/fsReport/HosList.vue'
  import AgentList from '../../components/fsReport/AgentList.vue'
  import { reportSetting,ringReportSetting, getStore, getSessionStore } from '../../config/util.js'
  import { rpData } from '../../api/sendRequest.js'
  import { Grid, GridItem, GroupTitle } from 'vux'
  export default {
    data(){
      reportSetting(this)
      return {
        date:'',
        areas:[],
        data_1:{},
        data_2:{},
        data_3:{},
        data_4:{},
        data_5: {},
        data_6:{
          ES000000:{},
          SS000000:{},
          NS000000:{}
        },
        low_hos_list:{},
        data_7:{
          ES000000:{},
          SS000000:{},
          NS000000:{}
        },
        low_agent_list:{},
        data_8:{},
        hosData:[],
        agentData:[],
        zero_hos_list:{},
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
      GroupTitle
    },
    mounted(){
      this.$nextTick(function(){
      	this.getAllData();
      })
    },
    methods:{
      afterConfig(options){
        var data2 = this.data_2;
        options.legend.data = ['东区','南区','北区'];
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
      async getAllData(){
        let res = await rpData(getStore('openid'));
        if(res.errcode != 0){
        	this.$router.push({path:'/rpLimitAuthor'});
        	return
        };

        this.date = res.data.date;
        this.areas = res.data.data_4.areas;
        this.data_1 = res.data.data_1;
        this.data_2 = res.data.data_2;
        this.data_3 = res.data.data_3;
        this.data_5 = res.data.data_5;
        this.data_6 = res.data.data_6;
        this.data_7 = res.data.data_7;
        this.data_8 = res.data.data_8;
        this.low_hos_list = res.data.data_6.all;
        this.low_agent_list = res.data.data_7.all;
        // 0销量医院预警的pie图
        res.data.data_5.pie.rows = this.orderAreaPie(res.data.data_5.pie.rows);
        this.hosData = this.orderAreaPie(res.data.data_5.data);
        this.hosData.map((item,index) => {
          item.type = "医院";
          item.type_1 = '家';
        });
        // 0销量代表预警
        res.data.data_8.pie.rows = this.orderAreaPie(res.data.data_8.pie.rows);
        this.agentData = this.orderAreaPie(res.data.data_8.data);
        this.agentData.map((item,index) => {
          item.hospital_totals = item.reps_totals;
          item.zero_hospital_totals = item.zero_reps_totals;
          item.type = "代表";
          item.type_1 = '人';
        });
      },
      changeArea(index){
      	this.low_hos_list = this.data_6[index];
      },
      changeAgentArea(index){
        this.low_agent_list = this.data_7[index];
      },
      orderAreaPie(arr){
        const rowArr = [];
        arr.map((item,index) => {
          if (item.区域) {
            switch (item.区域){
              case '东区':
                rowArr[0] = item;
              break;
              case '南区':
                rowArr[1] = item;
              break;
              case '北区':
                rowArr[2] = item;
              break;
              case '有销量':
                rowArr[3] = item;
              break;
              default:
                break;
            }
          } else if(item.area){
            switch (item.area){
              case '东区':
                rowArr[0] = item;
              break;
              case '南区':
                rowArr[1] = item;
              break;
              case '北区':
                rowArr[2] = item;
              break;
              case '有销量':
                rowArr[3] = item;
              break;
              default:
                break;
            }
          }
          return rowArr
        })
        return rowArr;
      },
    }
  }
</script>

<style lang="less">
  .month_total_data{
    margin: -36px 15px;
    background-color: #ffffff;
    box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
    border-radius:8px;
    padding: 20px 15px 10px;
    color: #666666;
    .mtd_item{
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
    padding: 0 15px;
    margin-top: 56px;
    h2{
      font-size: 14PX;
    }
    .line{
      margin-top: 20px;
      border-bottom: 1PX solid #E9E9E9;
    }
  }
  .charts{
    margin: 20px 15px;
    box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
    border-radius:8px;
    .chart_hd{
      padding: 10px 20px 5px;
      margin-bottom: 12px;
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
    padding: 15px;
    border-top: 10px solid #F5F5F5;
    .chart_ring_hd{
      h5{
        font-size: 16px;
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
        font-size: 16px;
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
