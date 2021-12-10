<template>
	<div class="history_flow" data-name="page_history_flow">
		<header>
			<router-link :to="{path:'/serviceHosRecord',query:{product_yyid:$route.query.product_yyid}}">
				<search v-model="value" placeholder="请输入医院名称" position="absolute" @on-change="" auto-scroll-to-top ref="search"></search>
			</router-link>
			<div class="hf_hd flex_item">
				<div class="drug_info">
					<h1>{{product_info.name}}历史流向记录</h1>
					<span class="font_10">{{update_time}}</span>
				</div>
				<div class="calendar" @click="chooseModType('month_list_mod')">
					<i class="iconfont">&#xe73a;</i>
				</div>
			</div>
		</header>

		<div class="hf_bd bgc">
			<div class="hf_item bgcw" v-for="(item,index) in history_list" :key="index">
				<div class="hf_item_hd flex_item bd_bt">
					<p>{{index.split('-')[1]}}月总计</p>
					<p class="blue">{{item.sum}}</p>
				</div>
				<div v-if="$route.query.hospital_yyid" class="hf_item_bd">
					<div class="fl_item_bd" v-for="(item2,index2) in item.data" :key="index2">
						<ul>
							<li class="flex_item hos_value" v-for="(item3,index3) in item2" :key="index3">
								<div class="hos_name">
									{{item3.order_date}}
								</div>
								<div v-if="item3.num > 0" class="fl_value red">+{{item3.num}}</div>
								<div v-else-if="item3.num < 0" class="fl_value green">{{item3.num}}</div>
								<div v-else class="fl_value">--</div>
							</li>
						</ul>
					</div>
				</div>
				<div v-else class="hf_item_bd">
					<div class="fl_item_bd" v-for="(item2,index2) in item.data" :key="index2">
						<p class="blue fl_time"><i class="iconfont">&#xe602;</i><span>{{index2}}</span></p>
						<ul>
							<li class="flex_item hos_value" v-for="(item3,index3) in item2" :key="index3">
								<div class="hos_name">
									{{item3.hospital_name}}
								</div>
								<div v-if="item3.num > 0" class="fl_value red">+{{item3.num}}</div>
								<div v-else-if="item3.num < 0" class="fl_value green">{{item3.num}}</div>
								<div v-else class="fl_value">--</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="hf_btn bgc">
			<button type="button" class="btn_common" @click="chooseModType('err_correct_mod')">{{$t('correct')}}</button>
		</div>
		<transition name="showcover">
			<div class="back_cover" v-show="mod_type" @click="closeBtn"></div>
		</transition>
		<div class="month_mod bgcw" v-show="mod_type == 'month_list_mod'">
			<ul>
				<li class="flex_item bd_bt"
				v-for="(item,index) in month_list"
				:key="index"
				@click="selectedMonth(item.month,item.type,index,'search_trends','',item.month)"
				:class="{active:active_status == index}">
					<p class="">{{item.month.split('-')[0]}}年{{item.month.split('-')[1]}}月</p>
					<p class="count_status" v-show="item.type != '已结算'">未结算</p>
				</li>
			</ul>
			<div v-show="month_list.length == 0" class="empty_status">
				<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
				<p>暂无数据</p>
			</div>
		</div>
		<ErrCorrectMod :modtype = 'mod_type' :userinfo = 'user_info' @closeMod="closeBtn"></ErrCorrectMod>
		<div v-show="show_empty" class="empty_status">
			<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
			<p>暂无历史数据</p>
		</div>
	</div>
</template>

<script>
	import { Search } from 'vux'
	import { historyFlowList } from '../../api/sendRequest.js'
	import ErrCorrectMod from '../../components/ErrCorrectMod.vue'
	import {mapState,mapActions} from 'vuex'
	export default {
		data(){
			return {
				value:'',
				mod_type:'',
				update_time:'',
				product_info:{},
				history_list:{},
				month_list:[],
				date_list:[],
				show_empty:false,
				trend_month:'',
				active_status:'',
				type:'',

			}
		},
		mounted(){
			this.checkUserInfo();
			if(this.user_info&&this.user_info.yyid){
				if(this.$route.query.hospital_yyid){
					this.getHistoryFlowList(this.user_info.yyid,this.user_info.user_token,this.$route.query.product_yyid,this.$route.query.hospital_yyid,'','','search_trends','','');
				} else {
					this.getHistoryFlowList(this.user_info.yyid,this.user_info.user_token,this.$route.query.product_yyid,'','','','search_trends','','');
				}

			}
		},
		computed: {
			...mapState([
				'user_info'
			])
		},
		components:{
			ErrCorrectMod,
			Search
		},
		methods: {
			...mapActions([
				'checkUserInfo'
			]),
			async getHistoryFlowList(yyid,token,pro_id,hospital_yyid,month,type,action,keywords,trend_month){
				// this.$vux.loading.show({text: 'Loading'});
				let res = await historyFlowList(yyid,token,pro_id,hospital_yyid,month,type,action,keywords,trend_month);
				if(res.errcode == 0){
					// this.$vux.loading.hide();
					this.update_time = res.data.last_update_time;
					this.product_info = res.data.product_info;
					this.history_list = res.data.list;
					this.month_list = res.data.month_array;
					this.date_list = res.data.list;
					this.value = res.data.hospital_info.hospital_name;
					if(res.data.list == ''){
						this.show_empty = true;
					} else {
            this.show_empty = false;
          }
				}
			},
			selectedMonth(month,type,index,action,keywords,trend_month){
				this.active_status = index;
				if(this.$route.query.hospital_yyid){
					this.getHistoryFlowList(this.user_info.yyid,this.user_info.user_token,this.$route.query.product_yyid,this.$route.query.hospital_yyid,month,type,action,keywords,trend_month);
				} else {
					this.getHistoryFlowList(this.user_info.yyid,this.user_info.user_token,this.$route.query.product_yyid,'',month,type,'',keywords,trend_month);
				}
				this.closeBtn();
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
<style lang="less">
	.vux-search-box{
		height: 64px;
		padding: 5px 10px 18px;
		position: relative !important;
		border-bottom: 10px solid #F5F5F5;
		.weui-search-bar{
			background-color: #FFFFFF;

			&:before{
				border-top: 0;
			}
			&:after{
				border-bottom: 0;
			}
			.weui-search-bar__form{
				&:after{
					border: 0;
					border-radius: 0;
				}
				.weui-search-bar__box{
					background-color: #F4F4F4;
					border-radius: 20px;
					.weui-icon-search{
						position: absolute;
						left: 0.266667rem;
						top: 0;
						line-height: 0.746667rem;
					}
					.weui-search-bar__input{
						margin-left: 8px;
						line-height:1.9;
					}
				}
			}
			.weui-search-bar__label{
				text-align: left;
				background-color: #F4F4F4;
				border-radius: 20px;
				padding-left: 30px;
				.weui-icon-search{
					position: absolute;
					left: 9px;
					top: 0;
					line-height:1.9;

				}
				span{
					position: absolute;
					left: 36px;
					top: 0;
					line-height:1.9;
				}
			}
			.weui-search-bar__cancel-btn{
				color: #5870FE;
			}
		}
	}
</style>
<style lang="less" scoped="scoped">
	.history_flow{
		header{
			padding-bottom: .373333rem;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			a{
				display: block;
			}
		}
		.hf_hd{
			padding: 18px 20px;
			.drug_info{
				h1{
					font-size: 16PX;
				}
				.font_10{
					color: #999999;
				}
			}
			.calendar{
				width: 40px;
				height: 40px;
				border-radius: 50%;
				color: #ffffff;
				background-color: #5870FE;
				text-align: center;
				line-height: 40px;
			}
		}
		.hf_bd{
			position: absolute;
			top: 140px;
			bottom: 76px;
			left: 0;
			right: 0;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			.hf_item{
				margin-top: 10px;
				.hf_item_hd{
					padding: 12px 15px;
				}
				.hf_item_bd{
					padding:15px 0 5px 0;
				}
				.fl_item_bd{
					padding: 0px 20px;
					.fl_time{
						font-size: 12PX;
						.iconfont{
							font-size: 12PX;
							margin-right: 5px;
						}
					}
					.blue{
						color: #5870FE;
					}
					ul{
						.hos_value{
							align-items: center;
							margin: 8px 0 15px 0;
						}
						.fl_value{
							width: 60px;
							text-align: right;
						}
						.green{
							color: #4ED79C;
						}
						.red{
							color: #F65B6A;
						}
					}

				}
			}
			.blue{
				color: #5870FE;
			}
		}
		.hf_btn{
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			height: 76px;
			padding: 0 20px;
			box-sizing: border-box;
			button{
				width: 100%;
				margin-top: 20px;
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
		.month_mod{
			width: 285px;
			border-radius: 8px;
			min-height: 150px;
			padding: 10px 20px;
			box-sizing: border-box;
			color: #666666;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translateY(-50%);
			margin-left: -142px;
			z-index: 10;
			li{
				padding: 10px;
			}
			.active{
				color: #5870FE;
				background-color: #F1F3FF;
				border-color: #5870FE;
			}
			.count_status{
				color: #5870FE;
				background-color: #F1F3FF;
				padding: 3px 10px;
				border-radius: 14px;
				font-size: 12PX;
			}
			.empty_status{
				text-align: center;
				position: absolute;
				top: 50%;
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
			bottom: 0;
			z-index: 1;
		}
	}
</style>
