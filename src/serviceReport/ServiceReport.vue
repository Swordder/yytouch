<template>
	<div class="service_report_page bgc" data-name="page_service_report">
		<div class="s_product_list">
			<div class="s_list_item bgcw" v-for="(item,index) in list" :key="index">
				<div class="s_list_hd flex_item bd_bt">
					<h4>{{item.product_info.name}}</h4>
					<div v-if="item.data_info.length != 0" class="leaf_type font_10">{{item.data_info.date.split('-')[1]}}月服务月报</div>
					<div v-else class=""></div>
				</div>
				<div v-if="item.data_info.length != 0" class="s_data_wrap">
					<div class="s_list_bd bd_bt">
						<p class="s_data_title">{{item.data_info.date.split('-')[1]}}月数据</p>
						<div class="flex_item s_data_item">
							<div class="s_data_val">
								<p v-if="item.data_info.month_total != '-'" class="val">{{item.data_info.month_total}}</p>
								<p v-else class="val">--</p>
								<p class="val_type font_10">流向</p>
							</div>
							<div class="s_data_val">
								<p v-if="item.data_info.month_mom < 0" class="val green">
									<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(item.data_info.month_mom))}}<span class="font_10">%</span>
								</p>
								<p v-else-if="item.data_info.month_mom > 0" class="val red">
									<span class="iconfont">&#xe651;</span>{{parseInt(item.data_info.month_mom)}}<span class="font_10">%</span>
								</p>
								<p v-else class="val">--</p>
								<p class="val_type font_10">环比</p>
							</div>
							<div class="s_data_val">
								<p v-if="item.data_info.month_an < 0" class="val green">
									<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(item.data_info.month_an))}}<span class="font_10">%</span>
								</p>
								<p v-else-if="item.data_info.month_an > 0" class="val red">
									<span class="iconfont">&#xe651;</span>{{parseInt(item.data_info.month_an)}}<span class="font_10">%</span>
								</p>
								<p v-else class="val">--</p>
								<p class="val_type font_10">同比</p>
							</div>
						</div>
					</div>
					<div class="s_list_bd bd_bt">
						<p class="s_data_title">{{item.data_info.last_three}}月数据</p>
						<div class="flex_item s_data_item">
							<div class="s_data_val">
								<p v-if="item.data_info.three_total != ''" class="val">
									{{item.data_info.three_total}}
								</p>
								<p v-else class="val">--</p>
								<p class="val_type font_10">流向</p>
							</div>
							<div class="s_data_val">
								<p v-if="item.data_info.three_mom < 0" class="val green">
									<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(item.data_info.three_an))}}<span class="font_10">%</span>
								</p>
								<p v-else-if="item.data_info.three_mom > 0" class="val red">
									<span class="iconfont">&#xe651;</span>{{parseInt(item.data_info.three_mom)}}<span class="font_10">%</span>
								</p>
								<p v-else class="val">--</p>
								<p class="val_type font_10">环比</p>
							</div>
							<div class="s_data_val">
								<p v-if="item.data_info.three_an < 0" class="val green">
									<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(item.data_info.three_an))}}<span class="font_10">%</span>
								</p>
								<p v-else-if="item.data_info.three_an > 0" class="val red">
									<span class="iconfont">&#xe651;</span>{{parseInt(item.data_info.three_an)}}<span class="font_10">%</span>
								</p>
								<p v-else class="val">--</p>
								<p class="val_type font_10">同比</p>
							</div>
						</div>
					</div>
					<div class="btn_common">
						<router-link :to="{path:'/serviceReportDetail',query:{product_yyid:item.product_info.product_yyid}}">{{$t('detail')}}</router-link>
					</div>
				</div>
				<div v-else class="item_empty_status">
					<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
					<p>暂无数据</p>
				</div>
			</div>
		</div>
		<div v-show="empty_status" class="empty_status">
			<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
			<p>暂无正在服务的产品</p>
		</div>
	</div>
</template>

<script>
	import { agentFlowList } from '../../api/sendRequest.js'
	import { mapState,mapActions } from 'vuex'
	export default{
		data(){
			return {
				list:[],
				empty_status:false
			}
		},
		mounted(){
			this.checkUserInfo();
			if(this.user_info&&this.user_info.yyid){
				this.getAgentFlowList();
			}
		},
		computed: {
			...mapState([
				'user_info'
			])
		},
		methods: {
			...mapActions([
				'checkUserInfo'
			]),
			async getAgentFlowList() {
				// this.$vux.loading.show({text: 'Loading'})
				let res = await agentFlowList(this.user_info.yyid,this.user_info.user_token);
				if(res.errcode == 0){
					// this.$vux.loading.hide();
					this.list = res.data;
					if(this.list.length == 0){
						this.empty_status = true;
					} else {
						this.empty_status = false;
					}
				}
			}
		},
	}
</script>

<style lang="less" scoped="scoped">
	.service_report_page{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		padding: 15px;
		.s_list_item{
			padding: 0 20px 15px 20px;
			border-radius: 8px;
			box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
			margin-bottom: 15px;
			.s_list_hd{
				align-items: center;
				padding: 20px 0 15px 0;
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
			.s_list_bd{
				padding: 15px 0 5px 0;
				.s_data_title{
					color: #999999;
					font-weight: bold;
				}
				.s_data_item{
					justify-content: space-around;
					.s_data_val{
						flex: 1;
						text-align: center;
						padding: 15px;
						.val{
							font-size:16PX;
							font-weight: bold;
							.iconfont{
								font-weight: normal;
								font-size: 12PX;
								margin-right: 4px;
							}
						}
						.green{
							color: #4ED79C;
						}
						.red{
							color: #F65B6A;
						}
						.val_type {
							color: #999999;
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
			.btn_common{
				margin-top: 15px;
				background-color: #5870FE;
				a{
					display: block;
					color: #ffffff;
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
</style>
