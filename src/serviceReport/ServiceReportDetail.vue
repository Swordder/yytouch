<template>
	<div class="service_report_detail" data-name="page_service_re_detail">
		<div class="s_list_hd flex_item bd_bt">
			<h4>{{product_info.name}}</h4>
			<div class="leaf_type font_10">{{date}}月服务月报</div>
		</div>
		<div class="sr_bd">
			<div class="data_status">
				<div class="graph_wrap">
					<h2>近6个月流向走势图</h2>
					<ve-line :data="product_chart" height="240px" :settings="chartSettings" :extend="chartExtends"></ve-line>
				</div>
				<div class="data_bd">
					<div class="prod_bd">
						<div class="data_show">
							<p class="data_title">{{date}}月数据</p>
							<div class="base_data flex_item bd_bt">
								<div class="data_item target_data">
									<p class="val">{{product_data.month_target}}</p>
									<p class="val_type font_10">潜力</p>
								</div>
								<div class="data_item other_data flex_item">
									<div class="val_item">
										<p class="val">{{product_data.month_total}}</p>
										<p class="val_type font_10">流向</p>
									</div>
									<div class="val_item">
										<p v-if="product_data.month_mom < 0" class="val green">
											<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(product_data.month_mom))}}<span class="font_10">%</span>
										</p>
										<p v-else-if="product_data.month_mom > 0" class="val red">
											<span class="iconfont">&#xe651;</span>{{parseInt(product_data.month_mom)}}<span class="font_10">%</span>
										</p>
										<p v-else class="val">
											--
										</p>
										<p class="val_type font_10">环比</p>
									</div>
									<div class="val_item">
										<p v-if="product_data.month_an < 0" class="val green">
											<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(product_data.month_an))}}<span class="font_10">%</span>
										</p>
										<p v-else-if="product_data.month_an > 0" class="val red">
											<span class="iconfont">&#xe651;</span>{{parseInt(product_data.month_an)}}<span class="font_10">%</span>
										</p>
										<p v-else class="val">
											--
										</p>
										<p class="val_type font_10">同比</p>
									</div>
								</div>
							</div>
						</div>
						<div class="data_show">
							<p class="data_title">{{product_data.last_three}}数据汇总</p>
							<div class="base_data flex_item bd_bt">
								<div class="data_item target_data">
									<p class="val">{{product_data.three_month_target}}</p>
									<p class="val_type font_10">潜力</p>
								</div>
								<div class="data_item other_data flex_item">
									<div class="val_item">
										<p class="val">{{product_data.three_total}}</p>
										<p class="val_type font_10">流向</p>
									</div>
									<div class="val_item">
										<p v-if="product_data.three_mom < 0" class="val green">
											<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(product_data.three_mom))}}<span class="font_10">%</span>
										</p>
										<p v-else-if="product_data.three_mom > 0" class="val red">
											<span class="iconfont">&#xe651;</span>{{parseInt(product_data.three_mom)}}<span class="font_10">%</span>
										</p>
										<p v-else class="val">
											--
										</p>
										<p class="val_type font_10">环比</p>
									</div>
									<div class="val_item">
										<p v-if="product_data.three_an < 0" class="val green">
											<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(product_data.three_an))}}<span class="font_10">%</span>
										</p>
										<p v-else-if="product_data.three_an > 0" class="val red">
											<span class="iconfont">&#xe651;</span>{{parseInt(product_data.three_an)}}<span class="font_10">%</span>
										</p>
										<p v-else class="val">
											--
										</p>
										<p class="val_type font_10">同比</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="data_ft">
					<h3><i class="iconfont">&#xe662;</i>{{$t('hos_rank')}}</h3>
					<div class="hos_rank">
						<mu-paper :z-depth="1" class="demo-loadmore-wrap search_list">
							<mu-container ref="container" class="demo-loadmore-content">
								<mu-load-more :loading="loading" :loaded-all="loaded_all" @load="getProductRank" >
									<template>
										<div class="flex_item hos_rank_item" v-for="(item,index) in product_rank" :key="index">
											<p class="rank">{{Number(index)+1}}</p>
											<p class="hos_name">{{item.hospital_name}}</p>
											<p class="num">{{item.sum}}</p>
											<div v-if="item.rate < 0" class="range green">
												<!-- <i class="iconfont">&#xe605;</i> -->
												<span>{{item.rate}}%</span>
											</div>
											<div v-else-if="item.rate > 0" class="range red">
												<!-- <i class="iconfont">&#xe651;</i> -->
												<span>{{item.rate}}%</span>
											</div>
											<div v-else class="range">
												<span>--</span>
											</div>
										</div>
									</template>
								</mu-load-more>
							</mu-container>
						</mu-paper>
					</div>
					<div v-show="empty_status" class="empty_status">
						<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
						<p>暂无医院排名</p>
					</div>
				</div>
			</div>
		</div>
		<transition name="showcover">
			<div class="back_cover" v-show="mod_type"></div>
		</transition>
		<div class="com_btn bgcw">
			<OperaBtns :modtype="mod_type" :proyyid = "this.$route.query.product_yyid"  @correctMod = 'chooseModType'></OperaBtns>
		</div>
		<ErrCorrectMod :modtype = 'mod_type' :userinfo = 'user_info' @closeMod="closeBtn"></ErrCorrectMod>
	</div>
</template>

<script>
	import {hosDetailChartSet} from '../../config/util.js'
	import OperaBtns from '../../components/OperaBtns.vue'
	import ErrCorrectMod from '../../components/ErrCorrectMod.vue'
	import { setStore } from '../../config/util.js'
	import {productInfo,reportData,reportChart,reportRank} from '../../api/sendRequest.js'
	import {mapState,mapActions} from 'vuex'
	export default{
		data(){
			hosDetailChartSet(this);
			return {
				date:'',
				product_info:{},
				product_chart:{},
				product_data: {},
				product_rank:[],
				loading: false,
				loaded_all:false,
				empty_status:false,
				page:1,
				mod_type:'',
			}
		},
		created(){
			setStore('id_type',this.$route.query.product_yyid);
		},
		mounted(){
			this.checkUserInfo();
			if(this.user_info&&this.user_info.yyid){
				this.getData();
			}
			this.getProductRank();
		},
		computed: {
			...mapState([
				'user_info'
			])
		},
		components:{
			OperaBtns,
			ErrCorrectMod
		},
		methods: {
			...mapActions([
				'checkUserInfo'
			]),
			async getData(){
				// this.$vux.loading.show({text: 'Loading'})
				let res1 = productInfo(this.user_info.yyid,this.$route.query.product_yyid);
				let res2 = reportChart(this.user_info.yyid,this.user_info.user_token,this.$route.query.product_yyid);
				let res3 = reportData(this.user_info.yyid,this.user_info.user_token,this.$route.query.product_yyid);
				
				let res = await Promise.all([res1,res2,res3]);
				// this.$vux.loading.hide();
				this.product_info = res[0].data;
				this.product_chart = res[1].data.chart_one;
				this.date = res[2].data.date.split('-')[1];
				this.product_data = res[2].data;
			},
			async getProductRank(){
				this.loading = true;
				let _this = this;
				let page = this.page;
				setTimeout(async () => {
					
					let res = await reportRank(this.user_info.yyid,this.user_info.user_token,this.$route.query.product_yyid,page);
					if(res.data.list == ''){
						this.empty_status = true;
					} else {
						this.empty_status = false;
					}
					_this.page ++;
					if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) >= Number(res.data.page)){
						_this.loading = false;
						_this.product_rank  = _this.product_rank.concat(res.data.list);
						if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) == Number(res.data.page)){
							_this.loading = false;
							_this.loaded_all = true;
						}	
					} else {
						_this.loading = false;
						_this.loaded_all = true;
						_this.product_rank = [];
					}
				}, 150);
			},
			chooseModType(type,id){
				if(this.mod_type != type){
					this.mod_type = type;
				} else {
					this.mod_type = '';
				}
				this.ser_yyid = id;
			},
			closeBtn(){
				this.mod_type = '';
			},
		},
	}
</script>

<style lang="less" scoped>
	.mu-paper {
		background-color: #FFFFFF;
	}
	.service_report_detail{
		.s_list_hd{
			align-items: center;
			padding: 18px 20px 10px;
			h4{
				font-size: 16PX;
			}
			.leaf_type{
				line-height: 24px;
				background-color: #F2F3FF;
				padding: 2px 10px;
				border-radius: 15px 0 15px 0;
				color: #5870FE;
			}
		}
		.sr_bd{
			padding: 0 20px 80px 20px;
		}
		.graph_wrap{
			height: 280PX;
			overflow: hidden;
			border-bottom: 1px solid #F5F5F5;
			h2{
				margin-top: 20px;
				font-weight: normal;
			}
		}
		.prod_bd{
			.data_show{
				.data_title{
					color: #999999;
					margin: 20px 0 15px 0;
					.iconfont{
						font-size: 18PX;
						color: #FF982A;
						font-weight: normal;
						margin-right: 6px;
						vertical-align: middle;
					}
					.font_10{
						color: #999999;
						margin-left: 4px;
					}
				}
				.base_data{
					padding-bottom: 20px;
				}
				.data_item{
					text-align: center;
					height: 60px;
					background-color: #F7F8FF;
					.val{
						font-size: 18PX;
						font-weight: bold;
						.iconfont{
							font-size: 12PX;
							font-weight: normal;
							vertical-align: text-top;
							margin-right: 2px;
						}
					}
					.val_type{
						color: #999999;
						margin-top: -3px;
					}
				}
				.target_data{
					width: 24%;
					vertical-align: middle;
					.val{
						margin-top: 9px;
					}
				}
				.other_data{
					width: 74%;
					align-items: center;
					.val_item{
						flex:1;
						.green{
							color: #4ED79C;
							span{
								transform: rotateY(90deg);
							}
						}
						.red{
							color: #F65B6A;
						}
					}
				}
			}
			.history_data{
				text-align: center;
				padding-bottom: 15px;
				.data_title{
					margin-bottom: 10px;
				}
				.data_item{
					background-color: #FFFFFF;
					.val_item{
						flex: 1;
					}
				}
				.btn_common{
					padding: 8px 38px;
				}
				.total_num{
					text-align: center;
					margin-bottom: 10px;
					.val{
						font-size: 22PX;
						font-weight: bold;
						color: #5870FE;
					}
					.val_type{
						margin-top: -3px;
						color: #999999;
					}
				}
			}
		}
		.data_ft{
			h3{
				text-align: center;
				margin: 15px 0 15px 0;
				.iconfont{
					color: #5870FE;
					font-weight: normal;
					margin-right: 8px;
				}
			}
			.mu-elevation-1{
				box-shadow: none !important;
			}
			.mu-infinite-scroll{
				background-color: #FFFFFF;
			}
			.mu-load-more{
				margin-top: 10px;
			}
			.container{
				padding: 0;
			}
			.hos_rank{
				// height: 190px;
				.hos_rank_item{
					justify-content: space-between;
					margin-bottom: 10px;
					align-items: center;
					.rank{
						color: #5870FE;
						width: 18px;
						height: 18px;
						line-height: 18px;
						border-radius: 50%;
						background-color: #E5E9FF;
						text-align: center;
						font-size: 12PX;
						margin-right: 5px;
					}
					.hos_name{
						width: 60%;
					}
					.num{
						width: 15%;
						text-align: right;
						color: #5870FE;
					}
					.range{
						width: 22%;
						text-align: right;
						.iconfont{
							font-size: 12PX;
						}
					}
					.red{
						color: #F65B6A;
					}
					.green{
						color: #4ED79C;
					}
				}
			}
			.empty_status{
				text-align: center;
				position: absolute;
				top: 40%;
				left: 50%;
				transform:  translate(-50%,-50%);
				color:#666666;
				img{
					width: 100px;
					margin-bottom: 6px;
				}
			}
		}
		.back_cover{
			top: 0;
		}
		.com_btn{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 0 20px;
		}
		.err_mod{
			z-index: 9;
		}
	}
	
</style>
