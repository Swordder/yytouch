<template>
	<div class="flow_detail" data-name="page_flow_detail">
		<div class="flow_detail_in bgc">
			<div class="fl_item bgcw" v-for="(item,index) in list" :key="index">
				<div class="fl_item_hd bd_bt">
					{{item.drug_info.name}}最新流向提醒
				</div>
				<div class="fl_item_bd bd_bt">
					<p class="blue fl_time"><i class="iconfont">&#xe602;</i><span>{{date}}</span></p>
					<ul>
						<li class="flex_item hos_value" v-for="(item2,index2) in item.tans_info" :key="index2">
							<div class="hos_name">
								{{item2.hospital_name}}
							</div>
							<div class="fl_value red" v-if="item2.num > 0">+{{item2.num}}</div>
							<div class="fl_value green" v-else-if="item2.num < 0">{{item2.num}}</div>
						</li>
					</ul>
				</div>
				<OperaBtns :modtype="mod_type" :proyyid='item.drug_info.product_yyid' @correctMod = 'chooseModType'></OperaBtns>
			</div>
		</div>
		<transition name="showcover">
			<div class="back_cover" v-show="mod_type"></div>
		</transition>
		<ErrCorrectMod :modtype = 'mod_type' :userinfo = 'user_info' @closeMod="closeBtn"></ErrCorrectMod>
	</div>
</template>
<script>
	import OperaBtns from '../../components/OperaBtns.vue'
	import ErrCorrectMod from '../../components/ErrCorrectMod.vue'
	import {dailyFlowDetail} from '../../api/sendRequest.js'
	import {mapState,mapActions} from 'vuex'
	export default {
		data(){
			return {
				mod_type:'',
				date:'',
				list:{},
			}
		},
		mounted(){
			this.checkUserInfo();
			if(this.user_info&&this.user_info.yyid){
				this.getDailyFlowDetail();
			}
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
			async getDailyFlowDetail(){
				// this.$vux.loading.show({text: 'Loading'});
				let res = await dailyFlowDetail(this.user_info.yyid,this.user_info.user_token,this.$route.query.msg_yyid);
				if(res.errcode == 0){
					// this.$vux.loading.hide();
					this.date = res.data.date;
					this.list = res.data.list;
				}
			},
			chooseModType(type,id){
				this.mod_type = 'err_correct_mod';
			},
			closeBtn(){
				this.mod_type = '';
			},
		},
	}
</script>

<style lang="less" scoped="scoped">
	.flow_detail{
		.flow_detail_in{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			padding: 15px;
		}
		.fl_item{
			padding: 0 15px;
			border-radius: 8px;
			box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
			.fl_item_hd{
				padding: 15px 0;
				font-size: 16PX;
				font-weight: bold;
			}
			.fl_item_bd{
				.fl_time{
					margin-top: 15px;
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
					padding-bottom: 5px;
					.hos_value{
						align-items: center;
						margin: 15px 0;
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
		.back_cover{
			top: 0;
			bottom: 0;
			z-index: 1;
		}
	}
</style>
