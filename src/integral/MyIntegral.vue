<template>
	<div class="integral_page bgc" data-name="page_user_intergral">
		<div class="main_data bgcw">
			<div class="i_icon">
				<i class="iconfont">&#xe62c;</i>
			</div>
			<div class="i_total_tank">
				<p v-if="user_rank_info.youyao_rank != 0" class="blue">{{user_rank_info.youyao_rank}}</p>
				<p v-else class="blue">--</p>
				<p>{{month}}月全国排名</p>
			</div>
			<div class="flex_item">
				<div class="i_data">
					<p v-show="user_rank_info.point != 0" class="red">
						<span v-if="user_rank_info.point > 0">+</span>
						<span v-else-if="user_rank_info.point < 0"></span>
						{{user_rank_info.point}}
					</p>
					<p v-show="user_rank_info.point == 0" class="red">
						--
					</p>
					<p class="font_10">{{user_rank_info.month}}月新增</p>
				</div>
				<div class="i_data">
					<p class="">{{user_rank_info.total_point}}</p>
					<p class="font_10">总积分</p>
				</div>
			</div>
		</div>
		<div class="i_data_detail">
			<div class="i_top3 bgcw">
				<h1>{{month}}月全国服务积分增长 Top10</h1>
				<div class="i_top_hd flex_item">
					<div class="six_bd">
						<div class="avator">
							<div class="avator_img">
								<img :src="top2.user_head" alt="">
							</div>
							<div class="rank_num">{{top2.youyao_rank}}</div>
						</div>
						<div class="user_data">
							<p class="name">{{top2.user_name}}</p>
							<p class="integral">{{top2.point}}分</p>
							<div v-show="top2.last_youyao_rank - top2.youyao_sort_rank != 0" class="range_num">
								<i v-if="top2.last_youyao_rank - top2.youyao_sort_rank > 0" class="iconfont">&#xe651;</i>
								<i v-else-if="top2.last_youyao_rank != 0&&top2.last_youyao_rank - top2.youyao_sort_rank < 0" class="iconfont">&#xe605;</i>
								{{Math.abs(top2.last_youyao_rank - top2.youyao_sort_rank)}}
							</div>
							<div v-show="top2.last_youyao_rank - top2.youyao_sort_rank == 0" class="range_num">--</div>
						</div>
					</div>
					<div class="six_bd">
						<div class="avator">
							<div class="avator_img avator_60">
								<img :src="top1.user_head" alt="">
							</div>
							<div class="rank_num green_1">{{top1.youyao_rank}}</div>
						</div>
						<div class="user_data">
							<p class="name">{{top1.user_name}}</p>
							<p class="integral">{{top1.point}}分</p>
							<div v-show="top1.last_youyao_rank - top1.youyao_sort_rank != 0" class="range_num">
								<i v-if="top1.last_youyao_rank - top1.youyao_sort_rank > 0" class="iconfont">&#xe651;</i>
								<i v-else-if="top1.last_youyao_rank != 0&&top1.last_youyao_rank - top1.youyao_sort_rank < 0" class="iconfont">&#xe605;</i>
								{{Math.abs(top1.last_youyao_rank - top1.youyao_sort_rank)}}
							</div>
							<div v-show="top1.last_youyao_rank - top1.youyao_sort_rank == 0" class="range_num">--</div>
						</div>
					</div>
					<div class="six_bd">
						<div class="avator">
							<div class="avator_img">
								<img :src="top3.user_head" alt="">
							</div>
							<div class="rank_num red">{{top3.youyao_rank}}</div>
						</div>
						<div class="user_data">
							<p class="name">{{top3.user_name}}</p>
							<p class="integral">{{top3.point}}分</p>
							<div v-show="top3.last_youyao_rank - top3.youyao_sort_rank != 0" class="range_num">
								<i v-if="top3.last_youyao_rank - top3.youyao_sort_rank > 0" class="iconfont">&#xe651;</i>
								<i v-else-if="top3.last_youyao_rank != 0&&top3.last_youyao_rank - top3.youyao_sort_rank < 0" class="iconfont">&#xe605;</i>
								{{Math.abs(top3.last_youyao_rank - top3.youyao_sort_rank)}}
							</div>
							<div v-show="top3.last_youyao_rank - top3.youyao_sort_rank == 0" class="range_num">--</div>
						</div>
					</div>
				</div>
			</div>
			<div class="i_rank_list bgcw">
				<ul class="">
					<li class="flex_item rank_item" v-for="(item,index) in yy_rank" :key="index">
						<div class="i_user_rank flex_item">
							<p class="rank_num">{{item.youyao_rank}}</p>
							<div v-if="item.last_youyao_rank - item.youyao_sort_rank > 0" class="rank_status red">
								<i class="iconfont">&#xe651;</i><span>{{parseInt(item.last_youyao_rank - item.youyao_sort_rank)}}</span>
							</div>
							<div v-else-if="item.last_youyao_rank != 0&&item.last_youyao_rank - item.youyao_sort_rank < 0" class="rank_status green">
								<i class="iconfont">&#xe605;</i><span class="">{{Math.abs(item.last_youyao_rank - item.youyao_sort_rank)}}</span>
							</div>
							<div v-else="item.last_youyao_rank - item.youyao_sort_rank == 0" class="rank_status">
								<span class="">--</span>
							</div>
							<div class="user_avactor flex_item">
								<div class="user_avactor_img">
									<img :src="item.user_head" alt="">
								</div>
								<p>{{item.user_name}}</p>
							</div>
						</div>
						<div class="total_integral">{{item.point}}分</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="agent_btn">
			<router-link to="/historyIntegral">{{$t('history_point')}}</router-link>
		</div>
	</div>
</template>

<script>
	import {getPoint} from '../../api/sendRequest.js'
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
				status:true,
				user_rank_info:{},
				top1:{},
				top2:{},
				top3:{},
				month:'',
				yy_rank:[]
			}
		},
		mounted(){
			this.getIntegral();
		},
		computed: {
			...mapState([
				'user_info'
			]),
			dataResult(last,now){
				let result = last - now;
				return result;
			},
		},
		methods: {
			async getIntegral() {
				// this.$vux.loading.show({text: 'Loading'});
				let res = await getPoint(this.user_info.yyid,this.user_info.user_token);
				if(res.errcode == 0){
					// this.$vux.loading.hide();
					this.user_rank_info = res.data.user_info;
					this.top1 = res.data.youyao_rank[0];
					this.top2 = res.data.youyao_rank[1];
					this.top3 = res.data.youyao_rank[2];
					this.month = this.user_rank_info.month.split('-')[1];
					this.yy_rank = res.data.youyao_rank.splice(3,7);
				}
			}
		},
	}
</script>

<style lang="less" scoped="scoped">
	.integral_page{
		height: 100%;
		padding: 15px 15px 72px 15px;
		.main_data{
			height: 192px;
			border-radius: 8px;
			padding: 20px;
			box-sizing: border-box;
			margin-bottom: 15px;
			.i_icon{
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background-color: #FFF8E3;
				margin: 0px auto;
				text-align: center;
				position: relative;
				line-height: 40px;
				margin-bottom: 10px;
				.iconfont{
					color: #FFC200;
					font-size: 28PX;
				}
			}
			.i_total_tank{
				text-align: center;
				font-size: 12PX;
				margin-bottom: 12px;
				.blue{
					font-size: 22PX;
					color: #5870FE;
					font-weight: bold;
				}
			}
			.i_data{
				width: 30%;
				text-align: center;
				font-size: 16PX;
				font-weight: bold;
				.font_10{
					font-weight: normal;
					color: #999999;
				}
				.red{
					color: #F65B6A;
				}
			}
		}
		.i_top3{
			border-radius: 8px 8px 0 0;
			background-color: #6178FF;
			color: #ffffff;
			text-align: center;
			padding: 20px;
			h1{
				font-weight: bold;
				margin-bottom: 25px;
			}
			.i_top_hd{
				justify-content: space-around;
				.avator{
					position: relative;
					.avator_img{
						width: 50px;
						height: 50px;
						border-radius: 50%;
						border: 2px solid #ffffff;
						margin-bottom: 23px;
						margin-top: 12px;
						img{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.avator_60{
						width: 60px;
						height: 60px;
						margin-top: 0;
					}
					.rank_num{
						width: 20px;
						height: 20px;
						line-height: 20px;
						border-radius: 50%;
						background-color: #F8E71C;
						color: #000000;
						font-weight: bold;
						box-shadow:0px 3px 6px 0px rgba(54,67,143,0.5);
						position: absolute;
						bottom: -10px;
						left: 50%;
						transform: translateX(-50%);
					}
					.green_1{
						width: 26px;
						height: 26px;
						bottom: -15px;
						line-height: 26px;
						background-color: #6FE7B3;
					}
					.red{
						background-color: #F27777;
					}
				}
				.range_num{
					padding-top: 3px;
					margin-top: 2px;
					border-top: 1px solid #ffffff;
					.iconfont{
						font-size: 12PX;
						font-weight: normal;
					}
				}
				.integral{
					font-size: 17PX;
					margin-top: 4px;
					font-weight: bold;
				}
			}
		}
		.i_rank_list{
			padding: 5px 15px 15px 15px;
			border-radius: 0 0 8px 8px;
			.rank_item{
				width: 100%;
				padding: 10px 15px 10px 10px;
				background-color: #F6F7FF;
				margin-top: 10px;
				align-items: center;
				.i_user_rank{
					align-items: center;
				}
			}
			.rank_num{
				width: 18px;
				height: 18px;
				border-radius: 50%;
				background-color: #DAE0FF;
				color: #5870FE;
				font-size: 12px;
				text-align: center;
			}
			.rank_status{
				min-width: 30px;
				text-align: left;
				margin: 0 10px 0 20px;
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
			.user_avactor{
				align-items: center;
				.user_avactor_img{
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-right: 10px;
					img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}
			.total_integral{
				font-size: 18PX;
				font-weight: bold;
				color: #FF982A;
			}
		}
		.agent_btn{
			background-color: #F5F5F5;
		}
	}
</style>
