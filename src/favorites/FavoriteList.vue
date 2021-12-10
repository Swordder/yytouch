<template>
	<div class="fav_con_list" data-name="page_fav_con_list">
		<NavBar></NavBar>
		<div class="in_fav_con_list bgc">
			<div class="fav_title">
				<img src="http://img.youyao99.com/C7720F017804578C2BAFD3D773655EFD.png" alt="">
				<div class="flex_item fav_title_con" v-if="user_info.yyid == fav_info.user_yyid">
					<div class="main_title">
						<h2>{{fav_info.name}}</h2>
						<p>{{fav_info.resource_count}}个内容</p>
					</div>
					<div class="btns">
						<a href="javascript:;" class="share_btn bgcw" @click="shareCover()">
							<i class="iconfont">&#xe60d;</i>
							分享
						</a>
						<a href="javascript:;" class="set_btn" @click.stop.prevent ="editShow">
							<i class="iconfont">&#xe619;</i>
							设置
						</a>
					</div>
					<div class="set_con bgcw" v-show="edit_show">
						<router-link :to="{path:'/editFav',query:{fav_yyid:$route.query.fav_yyid}}" class="rename_btn bgcw">
							<i class="iconfont">&#xe60f;</i>
							重命名
						</router-link>
						<a href="javascript:;" class="del_btn" @click="delFav()">
							<i class="iconfont">&#xe65f;</i>
							删除
						</a>
					</div>
				</div>
				<div class="fav_title_con share_fav_title" v-else>
					<div class="main_title_wrap flex_item">
						<div class="main_title">
							<h2>{{fav_info.name}}</h2>
							<p>{{fav_info.resource_count}}个内容</p>
						</div>
						<div class="btns">
							<a href="javascript:;" class="share_btn bgcw" @click="shareCover()">
								<i class="iconfont">&#xe60d;</i>
								分享
							</a>
						</div>
					</div>
					<div class="share_author flex_item">
						<div class="share_info flex_item">
							<div class="pic_img">
								<img :src="fav_info.user_head" alt="">
							</div>
							<p>{{fav_info.truename}}</p>
						</div>
						<div class="phone_num bgcw">
							<a :href="'tel:'+fav_info.phone"><i class="iconfont">&#xe675;</i>咨询</a>
						</div>
					</div>
				</div>
			</div>
			<div class="fav_list_con graphic">
				<div class="art_list">
					<ul>
						<li class="bgcw" v-for="(item,index) in fav_detail_list" :key="index">
							<div class="fav_con_item" v-if="item.resource_type == 1">
								<a 
								href="javascript:;" 
								class="flex_item" 
								@click.stop.prevent = "hrefList($event,item.yyid,'/videoDetail')">
									<div class="pic_img">
										<img :src="item.img_src" alt="">
									</div>
									<div class="flex_item video_item">
										<div class="title_wrap flex_item">
											<p class="title">{{item.title}}</p>
											<p v-show="user_info.yyid == fav_info.user_yyid" @click.stop.prevent="cancelFav(item.yyid)"><i class="iconfont">&#xe618;</i></p>
											<div class="del_fav" v-show="del_fav_yyid == item.yyid" @click.stop.prevent ="cancelData(item.yyid)">
												<i class="iconfont">&#xe666;</i>
												取消收藏
											</div>
										</div>
										<div class="figure flex_item">
											<p class="time video_author"><i class="iconfont">&#xe632;</i><span>{{item.author}}</span></p>
											<div class="signs flex_item">
												<p v-show="item.tags != ''&&item.tags != null" v-for="(item4,index4) in tagsShow(item.tags)" :key="index4">{{item4}}</p>
											</div>
										</div>
									</div>
								</a>
							</div>
							<div class="fav_con_item" v-else-if="item.resource_type == 7">
								<a 
								href="javascript:;" 
								class="flex_item" 
								@click.stop.prevent = "hrefList($event,item.yyid,'/videoDetail')">
									<div class="pic_img">
										<img :src="item.img_src" alt="">
									</div>
									<div class="flex_item video_item">
										<div class="title_wrap flex_item">
											<p class="title">{{item.title}}</p>
											<p v-show="user_info.yyid == fav_info.user_yyid" @click.stop.prevent="cancelFav(item.yyid)"><i class="iconfont">&#xe618;</i></p>
											<div class="del_fav" v-show="del_fav_yyid == item.yyid" @click.stop.prevent ="cancelData(item.yyid)">
												<i class="iconfont">&#xe666;</i>
												取消收藏
											</div>
										</div>
										<div class="figure flex_item">
											<p class="time video_author"><i class="iconfont">&#xe632;</i><span>{{item.author}}</span></p>
										</div>
									</div>
								</a>
							</div>
							<div class="fav_con_item" v-else>
								<a 
								href="javascript:;" 
								@click.stop.prevent = "hrefList($event,item.yyid,'/literatureDetail')" 
								v-if="item.resource_type == 2">
									<div class="title_wrap flex_item bd_bt">
										<h5 class="title">{{item.title}}</h5>
										<p v-show="user_info.yyid == fav_info.user_yyid" @click.stop.prevent="cancelFav(item.yyid)"><i class="iconfont">&#xe618;</i></p>
										<div class="del_fav" v-show="del_fav_yyid == item.yyid" @click.stop.prevent ="cancelData(item.yyid)">
											<i class="iconfont">&#xe666;</i>
											取消收藏
										</div>
									</div>
									<div class="liter_info">
										<div class="liter_info_hd flex_item">
											<div class="liter_author">
												<i class="iconfont">&#xe61f;</i>
												{{item.author}}
											</div>
											<div class="signs flex_item">
												<p class="font_10" v-show="item.tags != ''&&item.tags != null" v-for="(item3,index3) in tagsShow(item.tags)" :key="index3">{{item3}}</p>
											</div>
										</div>
										<div class="liter_info_ft">
											<i class="iconfont">&#xe669;</i>
											{{item.reference}}
										</div>
									</div>
									
								</a>
								<a 
								href="javascript:;" 
								@click.stop.prevent = "hrefList($event,item.yyid,'/clinicalDetail')" 
								v-else-if="item.resource_type == 9">
									<div class="title_wrap flex_item bd_bt">
										<h5 class="title">{{item.title}}</h5>
										<p v-show="user_info.yyid == fav_info.user_yyid" @click.stop.prevent="cancelFav(item.yyid)"><i class="iconfont">&#xe618;</i></p>
										<div class="del_fav" v-show="del_fav_yyid == item.yyid" @click.stop.prevent = "cancelData(item.yyid)">
											<i class="iconfont">&#xe666;</i>
											取消收藏
										</div>
									</div>
									<div class="liter_info">
										<div class="liter_info_hd flex_item">
											<div class="liter_author">
												<i class="iconfont time_icon">&#xe602;</i>
												{{item.created_time}}
											</div>
											<div class="signs flex_item">
												<p class="font_10" v-show="item.tags != ''&&item.tags != null" v-for="(item2,index2) in tagsShow(item.tags)" :key="index2">{{item2}}</p>
											</div>
										</div>
									</div>
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="back_cover_edit" v-show="edit_show" @click="editShow"></div>
			<div class="back_cover_cancel" v-show="del_fav" @click="cancelFav('')"></div>
			<Negative v-show="del_mod" :negtiveCon="negtive_con" @cancelDel = "closeDelMod" @delData = "delComData"></Negative>
			<div v-show="fav_detail_list.length==0" class="empty_status">
				<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
				<p>暂无收藏内容</p>
			</div>
		</div>
		<div class="back_cover_share" v-show="bc_status" @click="shareCover()">
			<div class="bc_con">
				<i class="iconfont">&#xe622;</i>
				<p>
					请点击右上角<br>
					把它发送给指定朋友<br>
					或分享到朋友圈
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	import NavBar from '../../components/NavBar.vue'
	import Negative from '../../components/Negative.vue'
	import axiosFn from '../../config/index.js'
	import { setStore } from '../../config/util.js'
	import { wxShare } from '../../config/share.js'
	import { favListDetail,delFav,delFavCon } from '../../api/sendRequest.js'
	import { mapState,mapActions } from 'vuex'
	export default{
		data(){
			return{
				fav_info:{},
				fav_detail_list:[],
				del_fav:false,
				del_fav_yyid:'',
				edit_show:false,
				del_mod:false,
				negtive_con:{
					title:'删除收藏夹',
					con:'确定要删除整个收藏夹？'
				},
				bc_status:false
			}
		},
		components:{
			NavBar,
			Negative
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		created(){
			setStore('id_type',this.$route.query.fav_yyid);
		},
		mounted() {
			this.getFavListDetail();
			this.shareInfo();
		},
		methods:{
			async shareInfo(){
				let res = await axiosFn('/youyao/share/info',{
					'page_name':'fav_detail',
					'fav_yyid':this.$route.query.fav_yyid
				},'POST');
				wxShare(res.data.title,res.data.sub_title,res.data.image,this.$route.query.fav_yyid,4,this.$route.query);	
			},
			async getFavListDetail(){
				// this.$vux.loading.show({text: 'Loading'})
				let yyid = '';
				if(this.user_info && this.user_info.yyid){
					yyid = this.user_info.yyid;
				} else {
					yyid = '';
				}
				let res = await favListDetail(yyid,this.$route.query.fav_yyid);
				if(res.errcode == 0){
					// this.$vux.loading.hide();
					this.fav_info = res.data.fav_info;
					this.fav_detail_list = res.data.resource_info;
				}
			},
			tagsShow(tags){
				if(tags != '' && tags != null){
					return tags.split(' ');
				} 
			},
			hrefList(e,id,rpath){
				if(e.target == 'iconfont'){
					return
				};
				if(rpath == '/videoDetail'){
					this.$router.push({path:rpath,query:{video_yyid:id}});
				} else if(rpath == '/literatureDetail'){
					this.$router.push({path:rpath,query:{document_yyid:id}});
				} else if(rpath == '/clinicalDetail'){
					this.$router.push({path:rpath,query:{interpret_yyid:id}});
				}
			},
			editShow(){
				this.edit_show = !this.edit_show;
			},
			closeDelMod(){
				this.del_mod = !this.del_mod;
			},
			async delComData(){
				let res = await delFav(
					this.$route.query.fav_yyid
				);
				if(res.errcode == 0){
					this.$router.push({path:'/myFavorites'});
				}
			},
			async cancelData(id){
				let res = await delFavCon(this.$route.query.fav_yyid,id);
				if(res.errcode == 0){
					this.getFavListDetail();
				}
			},
			delFav(){
				this.editShow();
				this.closeDelMod();
			},
			cancelFav(id){
				this.del_fav_yyid = id;
				this.del_fav = !this.del_fav;
			},
			shareCover(){
				this.bc_status = !this.bc_status;
			}
		}
	}
</script>

<style lang="less">
	@import '../../assets/css/graphic';
	.fav_con_list{
		.in_fav_con_list{
			position: absolute;
			top: 36px;
			left: 0;
			right: 0;
			bottom: 0px;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			.fav_title{
				position: relative;
				height: 100px;
				img{
					width: 100%;
					height: 100%;
				}
				.fav_title_con{
					position: absolute;
					top: 20px;
					left: 20px;
					right: 26px;
					color: #ffffff;
					align-items: center;
					.main_title{
						width: 70%;
						h2{
							font-size: 16PX;
							font-weight: normal;
							margin-bottom: 2px;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
					.btns{
						a{
							display: block;
							height: 26px;
							line-height: 26px;
							padding: 0px 16px;
							border-radius: 16px;
							color: #ffffff;
							font-size: 12PX;
							.iconfont{
								font-size: 16PX;
								margin-right: 4px;
							}
						}
						.share_btn{
							color: #5870FE;
							margin-bottom: 10px;

						}
						.set_btn{
							.iconfont{
								vertical-align: middle;
								font-size: 14PX;
							}
							border: 1px solid #ffffff;
						}
					}
					.set_con{
						position: absolute;
						right: 0px;
						top: 64px;
						z-index: 102;
						width: 120px;
						height: 82px;
						border-radius: 4px;
						box-shadow:0px 0px 6px 0px rgba(166,166,166,0.5);
						padding: 10px 20px;
						a{
							display: block;
							text-align: center;
							height: 26px;
							font-size: 12PX;
							line-height: 26px;
							border-radius: 16px;
							color: #5870FE;
							border: 1px solid #5870FE;
							.iconfont{
								font-size: 16PX;
							}
						}
						.rename_btn{
							margin-bottom: 10px;
						}
					}
					.main_title_wrap{
						align-items: center;
						.btns{
							height: 26px;
						}
					}
					.share_author{
						width: 101%;
						height: 34px;
						border-radius: 18px;
						margin-top: 3px;
						background-color: rgba(29,58,223,0.5);
						align-items: center;
						.share_info{
							.pic_img{
								width: 34px;
								height: 34px;
								border-radius: 50%;
								img{
									border-radius: 50%;
								}
							}
							p{
								line-height: 34px;
								margin-left: 16px;
							}
						}
						.phone_num{
							border-radius: 16px;
							margin-right: 4px;
							a{
								height: 26px;
								line-height: 26px;
								padding: 0px 16px;
								border-radius: 16px;
								color: #5870FE;
								height: 26px;
								
								font-size: 12PX;
								.iconfont{
									font-size: 16PX;
									margin-right: 6px;
								}
							}
						}
					}
				}
				.share_fav_title{
					top: 8px;
					align-items: center;
				}
			}
			.fav_list_con{
				border-bottom: none;
				.art_list{
					ul {
						li{
							padding: 0;
							background-color: #F5F5F5;
							.fav_con_item{
								padding: 15px;
								border-radius: 4px;
								background-color: #ffffff;
								box-shadow:0px 2px 8px 0px rgba(228,228,228,0.5);
								.figure {
									justify-content: space-between;
								}
							}
							.art_item{
								padding: 5px 15px 10px;
							}
							.title_wrap{
								width: 100%;
								justify-content: space-between;
								align-items: center;
								position: relative;
								padding-bottom: 8px;
								.title{
									width: 80%;
								}
								.iconfont{
									font-size: 22PX;
									color: #D8D8D8;
								}
								.del_fav{
									position: absolute;
									top: 26px;
									right: 0;
									z-index: 102;
									width:120px;
									height:50px;
									line-height: 50px;
									text-align: center;
									background:rgba(255,255,255,1);
									box-shadow:0px 0px 6px 0px rgba(166,166,166,0.5);
									border-radius:4px;
									color: #666666;
									.iconfont{
										font-size: 16PX;
										margin-right: 5px;
										color: #FF5252;
									}
								}
							}
							h5{
								font-weight: normal;
								border-color: #f1f1f1;
							}
							.liter_info{
								color: #999999;
								font-size: 12PX;
								.liter_info_hd{
									margin: 8px 0 0;
									align-items: center;
									.liter_author{
										width: auto;
										.time_icon{
											font-size: 12PX;
										}
									}
								}
								.iconfont{
									font-size: 16px;
								}
							}
							.signs{
								
								p{
									height: 22px;
									color: #5870FE;
									padding: 2px 10px;
									background-color: #E5E8FF;
									border-radius: 10px 0 10px 0;
									margin-left: 5px;
								}
							}
						}
					}
				}
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
		.back_cover_cancel,
		.back_cover_edit{
			position: fixed;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0);
			top: 0;
			bottom: 0;
			z-index: 101;
		}
		.back_cover_share{
			position: fixed;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			top: 0;
			bottom: 0;
			text-align: center;
			z-index: 1000;
			background-color: rgba(0, 0, 0, 0.6);
			.bc_con{
				position: absolute;
				top:30%;
				left: 50%;
				transform: translate(-50%,-50%);
				color: #ffffff;
				font-size: 18px;
				.iconfont{
					font-size: 60PX;
					margin-left: 60px;
				}
			}
		}
	}
	
</style>
