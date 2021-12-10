<template>
	<div class="hos_detail_page" data-name="page_apply_hos_detail">
		<HosInfo :paramsInfo = 'this.$route.query'></HosInfo>
		<section class="agent_detail">
			<h2>服务须知</h2>
			<p>1. 提交服务申请后，优药平台将在1-3个工作日内进行处理</p>
			<p>2. 申请处理过程中，优药平台有可能与您进行联系，请保持手机畅通。</p>
		</section>
		<div class="agent_btn">
			<a href="javascript:;" @click="applySub">{{$t('apply_agent_btn')}}</a>
		</div>
		<transition name="showcover">
			<div class="back_cover" v-show="show"></div>
		</transition>
		<section class="apply_succ" v-show="show">
			<img src="http://img.youyao99.com/550B03B0AD09EB627B695CDC1A3F4558.png" alt="">
			<p>服务申请已提交</p>
      <router-link v-if="$route.query.add_service_hos === 'add_hos'" :to="{path:'/userServiceHos'}">确定</router-link>
			<router-link v-else :to="{path:'/product',query:{'series_yyid':$route.query.series_yyid,product_yyid:$route.query.product_yyid}}">确定</router-link>
		</section>
	</div>
</template>
<script>
	import HosInfo from '../../components/HosInfo.vue'
	import { serviceApply } from '../../api/sendRequest.js'
	import { mapState ,mapActions } from 'vuex'
	export default {
		data(){
			return{
				show:false,
			}
		},
		mounted(){
			this.checkUserInfo();
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		components:{
			HosInfo
		},
		methods:{
			...mapActions([
				'checkUserInfo'
			]),
			async applySub(){
				let params = this.$route.query;
				this.$vux.loading.show({text: '提交中...'});
				let res = await serviceApply(params.series_yyid,params.hospital_yyid,this.user_info.yyid,this.user_info.user_token);
				if(res.errcode != 0){
					this.$vux.toast.text(res.errmsg);
					return;
				}
				this.show = !this.show;
        		this.$vux.loading.hide();
			}
		}
	}
</script>

<style lang="less" scoped>
	.hos_detail_page{
		padding: 15px;
		margin-bottom: 55px;
		.hos_info{
			width:345px;
			height:auto;
			padding: 20px 26px;
			box-sizing: border-box;
			box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
			border-radius:8px;
			h1{
				font-size: 18PX;
			}
			.sign{
				span{
					display: inline-block;
					padding: 3px 10px;
					border-radius: 15px;
					margin-top: 6px;
					background-color: #E9ECFF;
					color: #5870FE;
				}
			}
		}
		.base_info{
			margin-top: 22px;
			padding: 6px 0;
			border-top: 1PX solid #F5F5F5;
			border-bottom: 1PX solid #F5F5F5;
			.info_item{
				margin: 14px 0;
				.info_label{
					width: 32%;
					margin-right: 8px;
					color: #333333;
					font-size: 14PX;
					.iconfont{
						font-size: 14PX;
						transform: scale(.8);
						color: #0BC7A7;
						margin-right: 8px;
					}
				}
				.info_value{
					flex: 1;
					overflow: hidden;
					word-wrap: break-word;
					word-break: break-all;
					color: #666666;
					font-size: 14PX;
				}
				.info_depart{
					flex: 1;
					flex-wrap: wrap;
					justify-content: flex-start;
					li{
						padding: 0 10px;
						margin:0 8px 10px 0;
						background-color: #F0FFFC;
						border-radius: 15px;
						border:1px solid rgba(184,232,224,1);
					}
				}
			}
		}
		.address{
			padding-top: 15px;
			.iconfont{
				font-size: 14PX;
				color: #5870FE;
				margin-right: 3px;
			}
		}
		.agent_detail{
			margin-top: 20px;
			h2{
				font-size: 16PX;
				text-align: center;
			}
			p{
				margin: 10px 0;
				color: #666666;
			}
		}
		.apply_succ{
			width: 76%;
			height: 260px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			z-index: 20;
			padding:7px 53px ;
			background-color: #FFFFFF;
			border-radius: 8px;
			box-sizing: border-box;
			text-align: center;
			img{
				width: 100%;
			}
			a{
				display: inline-block;
				width: 100%;
				height: 36px;
				line-height: 36px;
				border: 1PX solid #5870FE;
				border-radius: 18px;
				color: #5870FE;
				margin-top: 8px;
			}
		}
		.showcover-enter-active, .showcover-leave-active {
			transition: opacity .3s
		}
		.showcover-enter, .showcover-leave-active {
			opacity: 0
		}
		.back_cover{
			position: fixed;
			top: 0px;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			z-index: 15;
			background-color: rgba(0, 0, 0, 0.6);
		}
	}
</style>
