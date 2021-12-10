<template>
	<div class="service_recode bgc" data-name="page_service_record">
		<header>
			<search v-model="value" placeholder="请输入医院名称" position="absolute" 
			@on-change="getHistoryFlowList(user_info.yyid,user_info.user_token,$route.query.product_yyid,'','','','search_hospital',value)" auto-scroll-to-top ref="search"></search>
		</header>
		<section>
			<ul>
				<li class="bd_bt bgcw">
					<router-link :to="{path:'/historyFlow',query:{hospital_yyid:'',product_yyid:$route.query.product_yyid}}">
						全部医院
					</router-link>
				</li>
				<li class="bd_bt bgcw" v-for="(item,index) in hospital_list" :key="index">
					<router-link :to="{path:'/historyFlow',query:{hospital_yyid:item.hospital_yyid,product_yyid:$route.query.product_yyid}}">
						{{item.hospital_name}}
					</router-link>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
	import { Search } from 'vux'
	import { historyFlowList } from '../../api/sendRequest.js'
	import {mapState,mapActions} from 'vuex'
	export default{
		data(){
			return {
				value:'',
				hospital_list:[]
			}
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		components:{
			Search
		},
		mounted() {
			this.checkUserInfo();
			if(this.user_info&&this.user_info.yyid){
				this.getHistoryFlowList(this.user_info.yyid,this.user_info.user_token,this.$route.query.product_yyid,'','','','search_hospital',this.value);
			}
		},
		methods:{
			...mapActions([
				'checkUserInfo'
			]),
			async getHistoryFlowList(yyid,token,pro_id,hospital_yyid,month,type,action,keywords){
				// this.$vux.loading.show({text: 'Loading'});
				let res = await historyFlowList(yyid,token,pro_id,hospital_yyid,month,type,'search_hospital',this.value);
				if(res.errcode == 0){
					// this.$vux.loading.hide();
					this.hospital_list = res.data.hospital_list;
				}
			}
		}
	}
</script>

<style lang="less">
	.service_recode{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		header{
			margin-bottom: 10px;
		}
		.vux-search-box{
			height: auto;
			position: relative !important;
			background-color: #FFFFFF;
			padding: 0;
			border-bottom: 0;
			.weui-search-bar{
				padding: 10px 20px;
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
		ul{
			li{
				padding: 12px 20px;
				a{
					display: block;
				}
			}
		}
	}
</style>
