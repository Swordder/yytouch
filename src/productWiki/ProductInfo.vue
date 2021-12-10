<template>
	<div class="prod_info" data-name="product_hu_wiki">
		<NavBar></NavBar>
		<div class="prod_part1">
			<div class="flex_item p_hd_wrap">
				<div class="p_hd flex_item">
					<img src="http://img.youyao99.com/fibrin_1x1.jpg" alt="">
					<div class="prod_name">
						<h3>{{$t('home.fs')}}</h3>
						<p>外用人纤维蛋白粘合剂</p>
					</div>
				</div>
				<router-link class="prod_intro" :to="{path:'/product',query:{product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid}}">{{$t('brief')}}</router-link>
			</div>
			<div class="pic">
				<router-link :to="{path:'/videoDetail',query:{video_yyid:'AEA61511A8B2E721BF4211E3842452E7'}}">
					<img src="http://img.youyao99.com/C23F8B5D29F59B401FF93EF0A1996866.png" alt="">
					<div class="video_icon">
						<img src="../../assets/images/vd.png" alt="">
					</div>
				</router-link>
			</div>
			<div class="btns flex_item">
				<router-link :to="{path:'/productOverview',query:{str_type:'hu_indroduce',resource_type:11,product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid,resource_yyid:'F3D5496B0D55C606B43D9CC919893B16'}}" class="btn_common prod_sum">{{$t('ov')}}</router-link>
				<router-link :to="{path:'/productIntro',query:{product_yyid:$route.query.product_yyid,resource_type:6}}" class="btn_common">{{$t('instruction')}}</router-link>
			</div>
		</div>
		<div class="prod_part2">
			<div class="com_hd bd_bt">
				<h4>{{$t('dep_app')}}</h4>
			</div>
			<div class="icon_list">
				<ul class="flex_item">
					<li v-for="(item,index) in depart_data" :key="index">
						<router-link :to="{path:'/productOverview',query:{str_type:item.str_type,resource_type:10,product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid,resource_yyid:item.resource_yyid}}">
							<div>
								<i class="iconfont" v-html="item.icon_symbol">{{item.icon_symbol}}</i>
							</div>
							<p>{{item.name}}</p>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="prod_part3 flex_item">
			<ul class="flex_item">
				<li>
					<router-link :to="{path:'/productOverview',query:{str_type:'hu_safe',resource_type:11,product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid,resource_yyid:'E686EE681A152BD524EBF8CAE53F8B75'}}">安全解读</router-link>
				</li>
				<li class="purple">
					<router-link :to="{path:'/productOverview',query:{str_type:'hu_compare',resource_type:11,product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid,resource_yyid:'F1B29D41A75827919CD4C747A5C28269'}}">产品对比</router-link>
				</li>
				<li class="light_blue">
					<router-link :to="{path:'/productOverview',query:{str_type:'hu_use',resource_type:11,product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid,resource_yyid:'F7FA7E76F342D67D901338EF4599F22C'}}">使用方法</router-link>
				</li>
				<li class="green">
					<router-link :to="{path:'/productOverview',query:{str_type:'hu_questions',resource_type:11,product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid,resource_yyid:'254A7972D784A62768A3354599F6CFB0'}}">常见问题</router-link>
				</li>
			</ul>
		</div>
		<div class="graphic">
			<router-link :to="{path:'/clinicalAnalysis',query:{product_yyid:$route.query.product_yyid}}">
				<div class="com_hd bd_bt flex_item">
					<h4>{{$t('clinical')}}</h4>
					<i class="iconfont">&#xe661;</i>
				</div>
			</router-link>
			<div class="art_list">
				<ul>
					<li v-for="(item,index) in clinical_List" :key="index">
						<router-link :to="{path:'/clinicalDetail',query:{interpret_yyid:item.yyid}}" class="flex_item">
							<div class="pic_img">
								<img :src="item.img_src" alt="">
							</div>
							<div class="flex_item">
								<p class="title">{{item.title}}</p>
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
		<div class="prod_part5 flex_item">
			<div class="library">
				<router-link :to="{path:'/literature',query:{product_yyid:$route.query.product_yyid}}">
					<div><i class="iconfont">&#xe647;</i>文献库</div>
					<div class="font_10">各科室文献资料<span>30+</span></div>
				</router-link>
			</div>
			<div class="library orange">
				<router-link :to="{path:'/videoList',query:{product_yyid:$route.query.product_yyid}}">
					<div><i class="iconfont">&#xe60b;</i>视频库</div>
					<div class="font_10">产品实案使用视频<span>30+</span></div>
				</router-link>
			</div>
		</div>
		<AgentBtn></AgentBtn>
	</div>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	import AgentBtn from '../../components/AgentBtn.vue'
	import { getStore,setStore } from '../../config/util.js'
	import { wxShare } from '../../config/share.js'
	import { clinicalList } from '../../api/sendRequest.js'
	import { mapState } from 'vuex'
	export default{
		data(){
			return{
				depart_data:[
					{
						icon_symbol:'&#xe6f1;',
						name:'神经外科',
						str_type:'hu_neuro',
						resource_yyid:'A9D7FB48FAC5B521985C9446144FB9BE'
					},
					{
						icon_symbol:'&#xe610;',
						name:'心脏外科',
						str_type:'hu_heart',
						resource_yyid:'77BF83AD13BE18AF1C27236AD397AC24'
					},
					{
						icon_symbol:'&#xe62e;',
						name:'胸外科',
						str_type:'hu_chest',
						resource_yyid:'67BC2011AD017FDD4415DDD4701369D2'
					},
					{
						icon_symbol:'&#xe60c;',
						name:'肝胆外科',
						str_type:'hu_liver',
						resource_yyid:'960051A0C91E9384C565E4E8F155732E'
					},
					{
						icon_symbol:'&#xe612;',
						name:'肠胃外科',
						str_type:'hu_stomach',
						resource_yyid:'E83E4D15274C0539489E702810F5DEB9'
					},
					{
						icon_symbol:'&#xe61c;',
						name:'骨科',
						str_type:'hu_bone',
						resource_yyid:'C3F115BEDF99A59F64C2BBC543B971B2'
					},
					{
						icon_symbol:'&#xe62f;',
						name:'甲乳外科',
						str_type:'hu_breast',
						resource_yyid:'143AAE8C7B70ADADEDFEC9A72A31D70A'
					},
					{
						icon_symbol:'&#xe61a;',
						name:'妇科',
						str_type:'hu_gynechology',
						resource_yyid:'E89CF5553732E74CE1B0755EEFDB81AD'
					},
					{
						icon_symbol:'&#xe611;',
						name:'眼科',
						str_type:'hu_eye',
						resource_yyid:'0F74B42BC4B6AC62408E7C22CA57161C'
					},
					{
						icon_symbol:'&#xe617;',
						name:'ESD',
						str_type:'hu_esd',
						resource_yyid:'960051A0C91E9384C565E4E8F155732E'
					},
				],
				clinical_List:[]
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
		created() {
			setStore('id_type',this.$route.query.product_yyid);
		},
		mounted() {
			this.getClinicalData();
			wxShare('护固莱士介绍','产品概述、科室应用、安全解读、产品对比、使用方法、常见问题、说明书等内容','http://img.youyao99.com/fibrin_1x1.jpg',this.$route.query.product_yyid,13,this.$route.query);
		},
		methods:{
			async getClinicalData(){
				// this.$vux.loading.show({text: 'Loading'})
				let yyid = '';
				if(this.user_info&&this.user_info.yyid){
					yyid = this.user_info.yyid;
				} else {
					yyid = '';
				}
				let res = await clinicalList(yyid,this.$route.query.product_yyid,1,5,'');
				// this.$vux.loading.hide();
				this.clinical_List = res.data.list;
			}
		}
	}
</script>
<style lang="less" scoped="scoped">
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
					width: 48%;
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
						width: 25%;
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
		.prod_part3{
			padding: 22px 15px;
			border-bottom: 10px solid #F5F5F5;
			ul{
				width: 100%;
				text-align: center;
				li{
					width: 22%;
					height: 44px;
					line-height: 46px;
					border-radius: 4px;
					background-color: #5870FE;
					a{
						font-size: 12PX;
						display: block;
						color: #ffffff;
					}
				}
				.purple{
					background-color: #8363F1;
				}
				.light_blue{
					background-color: #4A9BFF;
				}
				.green{
					background-color: #52C7C4;
				}
			}

		}
		.graphic{
			.com_hd{
				margin: 0;
			}
		}
		.prod_part5{
			padding: 15px;
			border-bottom: 10px solid #F5F5F5;
			.library{
				width: 48%;
				height: 90px;
				padding: 10px 0px 0 18px;
				background-color: #5870FE;
				border-radius: 4px;
				box-sizing: border-box;
				a{
					display: block;
					color: #ffffff;
					.iconfont{
						font-size: 26PX;
						margin-right: 10px;
						vertical-align: middle;
					}
					.font_10{
						margin-top: 5px;
						margin-left: -5px;
					}
					span{
						display: inline-block;
						padding: 0px 4px;
						background-color: #ffffff;
						color: #5870FE;
						margin-left: 4px;
					}
				}
			}
			.orange{
				background-color: #FFA341;
				a{
					span{
						color: #FFA341;
					}
				}
			}
		}
	}
</style>
