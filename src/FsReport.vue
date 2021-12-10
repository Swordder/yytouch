<template>
	<div class="report" data-name="fs_report">
		<header>
			<h2 class="update_time">该数据报表每日11:30更新</h2>
			<div class="header_wrap">
				<div class="hd num_item">
					<p>{{getMonth}}月全国销量 (套)</p>
					<div class="num flex_item">
						<h1>{{data_1.total_trans}}</h1>
						<p class="num_statu"><i class="iconfont">&#xe6a7;</i> 昨日 {{parseInt(data_1.today_trans) > 0?'+'+data_1.today_trans:data_1.today_trans}}</p>
					</div>
				</div>
				<div class="bd flex_item">
					<div class="num_item">
						<p>{{getMonth}}月全国指标 (套)</p>
						<div class="num flex_item">
							<p class="font_24">{{data_1.month_target}}</p>
						</div>
					</div>
					<div class="num_item">
						<p>{{getMonth}}月全国指标达成率</p>
						<div class="num flex_item">
							<p class="font_24">{{data_1.total_trans_pre}}%</p>
							<p v-if="data_1.today_trans_pre > 0" class="num_statu font_10 pecent"><i class="iconfont">&#xe6a7;</i> 昨日 +{{data_1.today_trans_pre}}%</p>
							<p v-else class="num_statu font_10 pecent"><i class="iconfont">&#xe6a7;</i> 昨日 {{data_1.today_trans_pre}}%</p>
						</div>
					</div>
				</div>
			</div>
		</header>
		<section>
			<div class="base_data_list">
				<div class="tb_hd flex_item">
					<p class="area_name"></p>
					<p>{{getMonth}}月指标</p>
					<p>{{getMonth}}月实际</p>
					<p>昨日新增</p>
					<p>达成率</p>
				</div>
				<div class="tb_data_item flex_item">
					<p class="area_name"><span>南区</span></p>
					<p class="target">{{data_4.SS000000.month_target}}</p>
					<p>{{data_4.SS000000.total_trans}}</p>
					<p>{{data_4.SS000000.today_trans}}</p>
					<p>{{data_4.SS000000.total_trans_pre}}%</p>
				</div>
				<div class="tb_data_item east_area flex_item">
					<p class="area_name"><span>东区</span></p>
					<p class="target">{{data_4.ES000000.month_target}}</p>
					<p>{{data_4.ES000000.total_trans}}</p>
					<p>{{data_4.ES000000.today_trans}}</p>
					<p>{{data_4.ES000000.total_trans_pre}}%</p>
				</div>
				<div class="tb_data_item flex_item">
					<p class="area_name"><span>北区</span></p>
					<p class="target">{{data_4.NS000000.month_target}}</p>
					<p>{{data_4.NS000000.total_trans}}</p>
					<p>{{data_4.NS000000.today_trans}}</p>
					<p>{{data_4.NS000000.total_trans_pre}}%</p>
				</div>
			</div>
			<div class="chart_part">
				<div class="chart_item">
					<div class="title bd_bt">
						<p class="font_12">
							{{getMonth}}月全国销量
						</p>
						<div class="num flex_item">
							<p class="font_18">{{data_1.total_trans}}</p>
							<p class="num_statu font_10"><i class="iconfont">&#xe6a7;</i> 昨日 {{parseInt(data_1.today_trans) > 0?'+'+data_1.today_trans:data_1.today_trans}}</p>
						</div>
					</div>
					<div v-if="data_2.length != 0" class="chart_bd">
						<ve-line height="280px" :data="data_2" :settings="chartSettings" :extend="chartExtends" :after-config="afterConfig"></ve-line>
					</div>
					<div v-else class="item_empty_status">
						<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
						<p>暂无数据</p>
					</div>
				</div>
				<div class="chart_item">
					<div class="title bd_bt">
						<p class="font_12">
							{{getMonth}}月全国指标达成率
						</p>
						<div class="num flex_item">
							<p class="font_18">{{data_1.total_trans_pre}}%</p>
							<p v-if="data_1.today_trans_pre > 0" class="num_statu font_10"><i class="iconfont">&#xe6a7;</i> 昨日 +{{data_1.today_trans_pre}}%</p>
							<p v-else class="num_statu font_10"><i class="iconfont">&#xe6a7;</i> 昨日 {{data_1.today_trans_pre}}%</p>
						</div>
					</div>
					<div v-if="data_3.length != 0" class="chart_bd">
						<ve-line height="280px" :data="data_3" :extend="chartExtends2" :settings="chartSettings2"></ve-line>
					</div>
					<div v-else class="item_empty_status">
						<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
						<p>暂无数据</p>
					</div>
				</div>
			</div>

			<div class="data_details_list bgc">
				<div class="data_details bgc">
					<div
						v-show="!(data_5.ES000000.length == 0&&data_5.NS000000.length == 0&&data_5.SS000000.length == 0&&data_5.all.length == 0)"
						class="sale_hos data_area_item bgcw">
						<p class="title">零销量医院</p>
						<div class="data_area_wrap">
							<ul class="flex_item data_area">
								<li
									v-for="(item,index) in area_divid"
									:key="index"
									:class="id5 == index?'active':''"
									@click="saleHosTop5(index)"
									>{{item}}</li>
							</ul>
						</div>
						<template>
							<SalesHos v-if="Object.keys(sale_hos_area).length != 0" :date="getMonth" :areadata = "sale_hos_area"></SalesHos>
							<div v-else class="item_empty_status">
								<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
								<p>暂无数据</p>
							</div>
						</template>
					</div>
					<div
						v-show="!(data_8.ES000000.length == 0&&data_8.NS000000.length == 0&&data_8.SS000000.length == 0&&data_8.all.length == 0)"
						class="agent_sale data_area_item bgcw">
						<p class="title">零销量代表</p>
						<div class="data_area_wrap">
							<ul class="flex_item data_area">
								<li
								v-for="(item,index) in area_divid"
								:key="index"
								:class="id8 == index?'active':''"
								@click="zeroSale(index)"
								>{{item}}</li>
							</ul>
						</div>
						<template>
							<ZeroSaleAgent v-if="Object.keys(zero_sale_data).length != 0" :date="getMonth" :zerosale="zero_sale_data"></ZeroSaleAgent>
							<div v-else class="item_empty_status">
								<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
								<p>暂无数据</p>
							</div>
						</template>
					</div>
					<div
						class="hos_warning data_area_item bgcw"
						v-show="!(data_6.ES000000.length == 0&&data_6.NS000000.length == 0&&data_6.SS000000.length == 0&&data_6.all.length == 0)"
						>
						<p class="title">低达成医院</p>
						<div class="data_area_wrap">
							<ul class="flex_item data_area">
								<li
								v-for="(item,index) in area_divid"
								:key="index"
								:class="id6 == index?'active':''"
								@click="hosWarning(index)"
								>{{item}}</li>
							</ul>
						</div>
						<template>
							<HosWarning v-if="Object.keys(hos_warning).length != 0" :date="getMonth" :warningdata = "hos_warning"></HosWarning>
							<div v-else class="item_empty_status">
								<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
								<p>暂无数据</p>
							</div>
						</template>
					</div>
					<div
						v-show="!(data_7.ES000000.length == 0&&data_7.NS000000.length == 0&&data_7.SS000000.length == 0&&data_7.all.length == 0)"
						class="month_sale data_area_item bgcw">
						<p class="title">低达成代表</p>
						<div class="data_area_wrap">
							<ul class="flex_item data_area">
								<li
								v-for="(item,index) in area_divid"
								:key="index"
								:class="id7 == index?'active':''"
								@click="lowRateAgent(index)"
								>{{item}}</li>
							</ul>
						</div>
						<template>
							<LowRateAgent v-if="Object.keys(low_rate_agent).length != 0" :date="getMonth" :lowrate = "low_rate_agent"></LowRateAgent>
							<div v-else class="item_empty_status">
								<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
								<p>暂无数据</p>
							</div>
						</template>
					</div>

				</div>
				<div class="line">
					<divider>没有更多了</divider>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import { reportSetting,getStore,getSessionStore } from '../config/util.js'
	import { fsData } from '../api/sendRequest.js'
	import { wxShare } from '../config/share.js'
	import { Divider, VChart, VLine, VArea, VTooltip, VLegend, VScale } from 'vux'
	import SalesHos from '../components/SalesHos.vue'
	import HosWarning from '../components/HosWarning.vue'
	import LowRateAgent from '../components/LowRateAgent.vue'
	import ZeroSaleAgent from '../components/ZeroSaleAgent.vue'
	export default {
		data(){
			reportSetting(this)
			return {
				date:'',
				data_1:{},
				data_2:{},
				data_3:{},
				data_4:{
					ES000000:{},
					NS000000:{},
					SS000000:{}
				},
				data_5:{
					ES000000:{},
					NS000000:{},
					SS000000:{},
					all:{},

				},
				data_6:{
					ES000000:{},
					NS000000:{},
					SS000000:{},
					all:{},
				},
				data_7:{
					ES000000:{},
					NS000000:{},
					SS000000:{},
					all:{},
				},
				data_8:{
					ES000000:{},
					NS000000:{},
					SS000000:{},
					all:{},
				},
				area_divid:{
					all:'全国',
					ES000000:'东区',
					SS000000:'南区',
					NS000000:'北区'
				},
				id5:'all',
				id6:'all',
				id7:'all',
				id8:'all',
				sale_hos_area:{},
				hos_warning:{},
				low_rate_agent:{},
				zero_sale_data:{}
			}
		},
		components:{
			Divider,
			VChart,
			VLine,
			VArea,
			VTooltip,
			VLegend,
			VScale,
			SalesHos,
			HosWarning,
			LowRateAgent,
			ZeroSaleAgent
		},
		computed:{
			getMonth(){
				return this.date.split('-')[1];
			}
		},
		created() {
		},
		mounted() {
			wxShare('护固莱士流向报告','每日流向、指标达成','http://img.youyao99.com/F46EC605D71D5658300304E84F16B434.jpg','fsreport',99,this.$route.query);
			this.$nextTick(function(){
				this.getAllData();
			})
		},
		methods:{
			async getAllData(){
				// this.$vux.loading.show({text: 'Loading'})
				let res = await fsData(getStore('openid'));
				if(res.errcode != 0){
					this.$router.push({path:'/fsLimitAuthor'});
					// this.$vux.loading.hide();
					return
				};
				// this.$vux.loading.hide();
				if(res.errcode == 0 && res.data.length == 0){
					this.$router.push({path:'/fsLimitAuthor'});
					return
				};
				document.title = res.data.date.split('-')[0]+`年`+res.data.date.split('-')[1]+`月-护固莱士流向报告`;
				this.date = res.data.date;
				this.data_1 = res.data.data_1;
				this.data_2 = res.data.data_2;
				this.data_3 = res.data.data_3;
				this.data_4 = res.data.data_4;
				this.data_5 = res.data.data_5;//零销售医院
				this.data_6 = res.data.data_6;//医院预警
				this.data_7 = res.data.data_7;//低达成代表
				this.data_8 = res.data.data_8;//零销售代表
				this.sale_hos_area = res.data.data_5.all;
				this.hos_warning = this.data_6.all;
				this.low_rate_agent = this.data_7.all;
				this.zero_sale_data = this.data_8.all;

			},
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
              var seriesName = data2[i].seriesName
                  res += marker + seriesName + ": " + data[1] + '<br />';
          };
          return res;
        };
        return options;
      },
			saleHosTop5(index){
				this.id5 = index;
				this.sale_hos_area = this.data_5[index];
			},
			hosWarning(index){
				this.id6 = index;
				this.hos_warning = this.data_6[index];
			},
			lowRateAgent(index){
				this.id7 = index;
				this.low_rate_agent = this.data_7[index];
			},
			zeroSale(index){
				this.id8 = index;
				this.zero_sale_data = this.data_8[index];
			}
		}
	}
</script>

<style lang="less">

	.report{
		header{
			width: 100%;
			height: 220px;
			padding-top: 0px;
			font-size: 12PX;
			color: white;
			background:linear-gradient(#5870FE,#8F7DFF);
			background:-webkit-linear-gradient(#5870FE,#8F7DFF);
			background:-o-linear-gradient(#5870FE,#8F7DFF);
			background:-moz-linear-gradient(#5870FE,#8F7DFF);
			.update_time{
				width: 100%;
				margin-bottom: 15px;
				line-height: 28px;
				text-align: center;
				font-weight: normal;
				background-color: #5761FF;
			}
			.hd{
				margin-bottom: 15px;
			}
			h1{
				font-size: 40PX;
				margin-right: 8px;
			}
			.header_wrap{
				padding: 0 40px;

			}
		}
		.num{
			justify-content: flex-start;
			.font_24{
				font-weight: bold;
			}
			.num_statu{
				height: 24px;
				line-height: 24PX;
				background-color: #5761FF;
				padding: 0 4px;
				margin-top: 20px;
				.iconfont{
					vertical-align: middle;
				}
			}
			.pecent{
				margin-top: 6px;
			}
		}
		.chart_item{
			.num{
				align-items: center;
			}
		}
		.font_12{
			font-size: 12PX;
			font-weight: bold;
		}
		.font_18{
			font-size: 24PX;
			font-weight: bold;
			color: #5870FE;
			margin-right: 10px;
		}
		.chart_part{
			padding: 20px 15px 0;
			.chart_item{
				box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
				border-radius:8px;
				margin-bottom: 20px;
				.title{
					padding: 11px 12px;
					margin-bottom: 15px;
					.num_statu{
						background-color: #DEE2FF;
						margin-top: 0;
						color: #5870FE;
					}
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
		}
		.base_data_list{
			text-align: center;
			padding-top: 10px;
			.tb_hd{
				p{
					color: #666666;
					width: 27%;
				}
				.area_name{
					width: 18%;
				}
				margin-bottom: 10px;
			}
			.tb_data_item{
				font-size: 16PX;
				padding: 13px 0;
				background-color: #F7F8FF;
				.area_name{
					width: 16%;
					font-size: 14PX;
					color: #5870FE;
					text-align: left;
					font-weight: bold;
					span{
						width: 50px;
						display: block;
						// line-height: 24PX;
						padding: 3px 0 2px 0;
						text-align: center;
						background-color: #DEE2FF;
						border-radius: 0 15px 15px 0;
					}
				}
				p{
					width: 27%;
					color: #FF6675;
				}
				.target{
					color: #333333;
				}
			}
			.east_area{
				background-color: #ffffff;
			}
		}
		.data_details_list{
			padding: 15px 0 10px;
			.data_area_item{
				padding: 20px 0px 0;
				margin-bottom: 15px;
				.title{
					color: #5870FE;
					font-size: 16PX;
					font-weight: bold;
					margin-bottom: 16px;
					text-align: center;
				}
				.data_area_wrap{
					text-align: center;
					padding: 0 15px;
				}
				.data_area{
					color: #5870FE;
					border: 1px solid #5870FE;
					border-right: none;
					text-align: center;
					li{
						width: 25%;
						line-height: 32PX;
						border-right: 1px solid #5761FF;
					}
					.active{
						color: #ffffff;
						background-color: #5870FE;
					}
				}
				.data_show_item{
					padding: 20px 15px;
					margin-bottom: 6px;
					border-bottom: 6px solid #F5F5F5;
					.service_data {
						text-align: center;
						margin-top: 20px;
						.service_data_item{
							width: 33%;
							p{
								font-size: 18PX;
								font-weight: bold;
							}
							.font_10{
								font-size: 12PX;
								transform: scale(.9);
								color: #999999;
								font-weight: normal;
							}
						}
						.service_data_item:nth-type-of(5){
							border-bottom: none;
						}
						.red_num{
							color: #FF6675;
							.font_10{
								color: #FF6675;
							}
						}
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
			}
			.agent_sale{
				// margin-bottom: 0;
			}

		}
		.line{
			padding: 0 100px;
			.vux-divider{
				padding-top: 0;
				color: #D1D3D7;
			}
		}
	}

</style>
