<template>
	<div class="video_list bgc" data-name="page_video_list">
		<DepartSigns :signsList = 'signs_list' @filterData="filterFn"></DepartSigns>
		<div class="in_video_list bgc">
			<div class="graphic">
				<div class="art_list">
					<mu-paper :z-depth="1" class="demo-loadmore-wrap search_list">
						<mu-container ref="container" class="demo-loadmore-content">
							<mu-load-more :loading="loading" :loaded-all="loaded_all" @load="getVideoList" >
								<template>
									<ul>
										<li class="bgcw" v-for="(item,index) in video_list" :key="index">
											<router-link class="flex_item" :to="{path:'/videoDetail',query:{video_yyid:item.yyid}}">
												<div class="pic_img">
													<img :src="item.img_src" alt="">
												</div>
												<div class="flex_item video_item">
													<p class="title">{{item.title}}</p>
													<div class="figure flex_item">
														<p class="time video_author"><i class="iconfont">&#xe632;</i><span>{{item.author}}</span></p>
														<div class="signs flex_item">
															<p v-for="(item2,index2) in item.tags">{{item2.name}}</p>
														</div>
													</div>
												</div>
											</router-link>
										</li>
									</ul>
								</template>
							</mu-load-more>
						</mu-container>
					</mu-paper>
				</div>
			</div>
		</div>
		
		<div v-show = "show_empty" class="empty_status">
			<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
			<p>暂无符合条件的视频</p>
		</div>
		<AgentBtn></AgentBtn>
	</div>
</template>

<script>
	import DepartSigns from '../../components/DepartSigns.vue'
	import AgentBtn from '../../components/AgentBtn.vue'
	import { mapState } from 'vuex'
	import { wxShare } from '../../config/share.js'
	import { videoList } from '../../api/sendRequest.js'
	export default{
		data(){
			return {
				page:1,
				signs_list:[],
				video_list:[],
				loading: false,
				loaded_all:false,
				tags:'',
				show_empty:false
			}
		},
		mounted() {
			this.filterFn(this.tags);
			wxShare('护固莱士相关视频','护固莱士相关使用方法、临床手术视频','http://img.youyao99.com/fibrin_1x1.jpg',this.$route.query.product_yyid,16,this.$route.query);
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		components:{
			DepartSigns,
			AgentBtn
		},
		methods:{
			filterFn(tags){
				this.page = 1;
				this.loaded_all = false;
				this.video_list = [];
				this.getVideoList(tags);
			},
			async getVideoList(tags){
				this.loading = true;
				let yyid = '';
				let page = this.page;
				let signs = '';
				if(tags){
					signs = tags;
				} else {
					signs = '';
				};
				if(this.user_info&&this.user_info.yyid){
					yyid = this.user_info.yyid;
				} else{
					yyid = '';
				}
				let _this = this;
				
				setTimeout(async () => {
					
					let res = await videoList(yyid,this.$route.query.product_yyid,page,10,signs);
					_this.signs_list = res.data.tags;
					
					_this.page ++;
					if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) >= Number(res.data.page)){
						_this.show_empty = false;
						_this.loading = false;
						_this.video_list = _this.video_list.concat(res.data.list);
						if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) == Number(res.data.page)){
				
							_this.loading = false;
							_this.loaded_all = true;
						}	
					} else {
						_this.loading = false;
						_this.loaded_all = true;
						_this.video_list = [];
						_this.show_empty = true;
					}
				}, 150);
			}
		}
	}
</script>

<style lang="less">
	@import '../../assets/css/graphic';
	
	.video_list{
		.in_video_list{
			position: absolute;
			top: 44px;
			left: 0;
			right: 0;
			bottom: 68px;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			z-index: 2;
		}
		.mu-paper{
			background-color: rgba(255, 255, 255, 0);
			.container{
				padding: 0;
			}
		}
		.mu-elevation-1{
			box-shadow: none !important;
		}
		.mu-load-more {
			margin-top: 0;
		}
		.empty_status{
			text-align: center;
			position: absolute;
			top: 40%;
			left: 50%;
			transform:  translate(-50%,-50%);
			color:#666666;
			z-index: 11;
			img{
				width: 100px;
				margin-bottom: 6px;
			}
		}
		.depart_signs{
			.com_item{
				.com_item_con{
					min-height: 400px;
					height: 400px;
					ul{
						min-height: 300px;
						height: 300px;
					}
				}
			}
		}
		.graphic{
			.art_list{
				ul{
					li{
						background-color: #ffffff;
						box-shadow:0px 2px 8px 0px rgba(228,228,228,0.5);
						border-radius:4px;
						a.flex_item{
							display: flex;
							.figure{
								justify-content: space-between;
								.time{
									width: auto;
									margin-right: 10px;
								}
							}
							.signs{
								p{
									color: #5870FE;
									padding: 2px 10px;
									background-color: #E5E8FF;
									border-radius: 10px 0 10px 0;
									margin-left: 5px;
								}
							}
						}
						.video_item{
							width: 72%;
						}
					}
				}
			}
		}
		
	}
</style>
