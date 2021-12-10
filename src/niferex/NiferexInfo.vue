<template>
	<div class="prod_info" data-name="niferex_wiki">
		<NavBar></NavBar>
		<div class="prod_part1">
			<div class="flex_item p_hd_wrap">
				<div class="p_hd flex_item">
					<img v-if="$route.query.series_yyid == 'E79FEAAAE849C8BC45F176E34EE7E75A'" src="http://img.youyao99.com/913443AB0672F8D9CDC2BEFDAD45E6A6.png" alt="">
					<img v-else src="http://img.youyao99.com/55ea763f0532487c0ccc5edf4edc1624.png" alt="">
					<div class="prod_name">
						<h3 v-if="$route.query.series_yyid == 'E79FEAAAE849C8BC45F176E34EE7E75A'">{{$t('home.ni')}}</h3>
						<h3 v-else>力蜚能（OTC）</h3>
						<p>多糖铁复合物胶囊</p>
					</div>
				</div>
				<router-link class="prod_intro" :to="{path:'/product',query:{product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid}}">{{$t('brief')}}</router-link>
			</div>
			<div class="pic">
				<a href="javascript:;">
					<img v-if="$route.query.series_yyid == 'E79FEAAAE849C8BC45F176E34EE7E75A'" src="http://img.youyao99.com/C4E8EB9F59E45AD03A2B6643E93719AB.png" alt="">
					<img v-else src="http://img.youyao99.com/55ea763f0532487c0ccc5edf4edc1624.png" alt="">
				</a>
			</div>
			<div class="btns flex_item">
				<router-link :to="{path:'/productIntro',query:{product_yyid:$route.query.product_yyid,resource_type:6}}" class="btn_common">{{$t('instruction')}}</router-link>
			</div>
		</div>
		<div class="prod_part2">
			<div class="com_hd bd_bt">
				<h4>{{$t('prod_application')}}</h4>
			</div>
			<div class="icon_list">
				<ul class="flex_item">
					<li>
						<router-link :to="{path:'/niferexAppList',query:{str_type:'obstetric',product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid}}">
							<div>
								<i class="iconfont">&#xe6f4;</i>
							</div>
							<p>产科</p>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'/niferexAppList',query:{str_type:'renal',product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid}}">
							<div>
								<i class="iconfont">&#xe624;</i>
							</div>
							<p>肾科</p>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'/niferexAppList',query:{str_type:'prod_compare',product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid}}">
							<div>
								<i class="iconfont">&#xe628;</i>
							</div>
							<p>全科</p>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="graphic">
			<a href="javascript:;">
				<div class="com_hd bd_bt flex_item">
					<h4>{{$t('literature')}}</h4>
				</div>
			</a>
			<div class="art_list">
				<ul>
					<li v-for="(item,index) in list" :key="index">
						<router-link :to="{path:'/clinicalDetail',query:{interpret_yyid:item.yyid}}" class="flex_item">
							<div class="flex_item">
								<p class="title bd_bt">{{item.title}}</p>
								<div class="figure flex_item">
									<p class="time"><i class="iconfont">&#xe602;</i><span>{{item.created_time}}</span></p>
									<p class="view"><i class="iconfont">&#xe621;</i><span>{{item.read_num}}</span></p>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<AgentBtn></AgentBtn>
	</div>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	import AgentBtn from '../../components/AgentBtn.vue'
	import { clinicalList } from '../../api/sendRequest.js'
	import { mapState } from 'vuex'
	export default {
		data(){
			return {
				list:[]
			}
		},
		components:{
			NavBar,
			AgentBtn
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		mounted() {
			this.getClinicalData();
		},
		methods:{
			async getClinicalData(){
				let yyid = '';
				if(this.user_info&&this.user_info.yyid){
					yyid = this.user_info.yyid;
				} else {
					yyid = '';
				}
				let res = await clinicalList(yyid,this.$route.query.product_yyid,1,5,'');
				this.list = res.data.list;
			}
		}
	}
</script>

<style lang="less">
	@import '../../assets/css/graphic';
	.prod_info{
		padding: 36px 0 68px;
		.prod_part1{
			padding: 15px 15px 24px;
			border-bottom: 10px solid #F5F5F5;
			.p_hd_wrap{
				align-items: center;
				.p_hd{
					align-items: center;
					img{
						width: 50px;
						height: 50px;
						margin-right: 15px;
					}
					.prod_name{
						h3{
							font-size: 16PX;
							font-weight: bold;
							margin-top: 2px;
						}
						p{
							font-size: 12PX;
							color: #666666;
						}
					}
				}
				.prod_intro{
					background-color: #5870FE;
					color: #ffffff;
					padding: 5px 16px;
					border-radius: 16px;
					font-size: 12PX;
				}
			}
			.pic{
				width: 100%;
				height: 150px;
				border-radius: 8px;
				margin: 15px 0 20px;
				background-color: rgba(0, 0, 0, .6);
				a{
					display: block;
					position: relative;
					height: 100%;
					img{
						width: 100%;
						height: 100%;
						border-radius: 8px;
					}
					.video_icon{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
						z-index: 2;
						width: 64px;
						height: 64px;
						img{
							width: 100%;
							height: 100%;
						}
					}
				}

			}
			.btns{
				a{
					width: 100%;
				}
				.prod_sum{
					background-color: #5870FE;
					color: #ffffff;
				}
			}
		}
		.prod_part2{
			border-bottom: 10px solid #F5F5F5;
			.com_hd{
				margin: 0;
			}
			.icon_list{
				padding-bottom: 20px;
				ul{
					justify-content: flex-start;
					flex-wrap: wrap;
					li{
						text-align: center;
						width: 33%;
						margin-top: 20px;
						a{
							color: #666666;
							text-align: center;
							display: block;
							div{
								width: 44px;
								height: 44px;
								line-height: 44px;
								border-radius: 50%;
								display: inline-block;
								background-color: #E5E8FF;
								color: #5870FE;
								margin-bottom: 7px;
								.iconfont{
									font-size: 28PX;
								}
							}
						}
					}
				}
			}
		}
		.graphic{
			.com_hd{
				margin: 0;
			}
			.art_list{
				.title{
					width: 100%;
					padding-bottom: 8px;
					margin-bottom: 8px;
				}
			}
		}
	}
</style>
