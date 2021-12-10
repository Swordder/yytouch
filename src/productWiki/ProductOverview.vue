<template>
	<div class="prod_overview bgc" :data-name="'page_'+$route.query.str_type">
		<NavBar></NavBar>
		<div class="in_prod_overview">
			<div class="ov_hd">
				<img src="http://img.youyao99.com/C7720F017804578C2BAFD3D773655EFD.png" alt="">
				<div class="ov_hd_title">
					<h1>{{name}}</h1>
					<p class="line bgcw"></p>
					<p>{{en_name}}</p>
				</div>
			</div>
			<div class="ov_bd">
				<div class="ov_con">
					<div class="ov_con_item bgcw" v-for="(item,index) in content_list" :key="index">
						<h5>{{item.title}}</h5>
						<p class="line"></p>
						<div class="item_con" ref="item" v-html="item.content">
							{{item.content}}
						</div>
						<div  :class="{show:show_id == index}" class="item_con item_con_hidden animated fadeIn" v-html="item.content2">
							{{item.content2}}
						</div>
						<div v-show="item.content2" class="extend_btn bd_top" @click="showToggle(index)">

							<div v-if="show_id !== index" class="fold">
								<i class="iconfont">&#xe66a;</i>
								点击查看更多
							</div>
							<div v-else class="unfold">
								<i class="iconfont">&#xe625;</i>
								收起
							</div>
						</div>
					</div>
				</div>
				<div class="per_liter bgcw" v-show="JSON.stringify(literature_list) != '{}'">
					<div class="com_hd bd_bt">
						<h4>其他相关文献</h4>
					</div>
					<div class="liter_list">
						<ul>
							<li class="bgcb" v-for="(item,index) in literature_list" :key="index">
								<router-link v-if="item.type == 2" :to="{path:'/literatureDetail',query:{document_yyid:item.yyid}}">
									<h5 class="bd_bt">{{item.title}}</h5>
									<div class="liter_info">
										<div class="liter_info_hd flex_item">
											<div class="liter_author">
												<i class="iconfont">&#xe61f;</i>
												{{item.writer}}
											</div>
											<div class="signs flex_item">
												<p class="font_10">{{item.tag}}</p>
											</div>
										</div>
										<div class="liter_info_ft">
											<i class="iconfont">&#xe669;</i>
											{{item.provenance}}
										</div>
									</div>
								</router-link>
								<router-link v-if="item.type == 9" :to="{path:'/clinicalDetail',query:{interpret_yyid:item.yyid}}">
									<h5 class="bd_bt">{{item.title}}</h5>
									<div class="liter_info">
										<div class="liter_info_hd flex_item">
											<div class="liter_author">
												<i class="iconfont">&#xe61f;</i>
												{{item.writer}}
											</div>
											<div class="signs flex_item">
												<p class="font_10">{{item.tag}}</p>
											</div>
										</div>
										<div class="liter_info_ft">
											<i class="iconfont">&#xe669;</i>
											{{item.provenance}}
										</div>
									</div>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="graphic bgcw" v-show="JSON.stringify(video_list) != '{}'">
					<router-link to="/">
						<div class="com_hd bd_bt flex_item">
							<h4>其他相关视频</h4>
						</div>
					</router-link>
					<div class="art_list">
						<ul>
							<li v-for="(item,index) in video_list" :key="index">
								<router-link class="flex_item" :to="{path:'/videoDetail',query:{video_yyid:item.yyid}}">
									<div class="pic_img">
										<img :src="item.pic" alt="">
									</div>
									<div class="flex_item">
										<p class="title">{{item.title}}</p>
										<div class="figure flex_item">
											<p class="time"><i class="iconfont">&#xe602;</i><span>{{item.datetime}}</span></p>
										</div>
									</div>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<AgentBtn></AgentBtn>
	</div>
</template>
<script>
	import NavBar from '../../components/NavBar.vue'
	import AgentBtn from '../../components/AgentBtn.vue'
	import { wxShare,previewImg } from '../../config/share.js'
	import { viewCount } from '../../api/sendRequest.js'
	import { totalSummaryData } from '../../api/staticRequest.js'
	import { mapState } from 'vuex'
	export default{
		data(){
			return {
				content_list:{},
				video_list:{},
				literature_list:{},
				name:'',
				en_name:'',
				show_id:-1,
				share_yyid:''
			}
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		components:{
			NavBar,
			AgentBtn
		},
		mounted() {
      if(this.$route.query.share_yyid&&this.$route.query.share_yyid != undefined){
      	this.share_yyid = this.$route.query.share_yyid;
      } else {
      	this.share_yyid = '';
      }

      if(this.user_info && this.user_info.yyid){
      	viewCount(this.user_info.yyid,this.$route.query.resource_yyid,this.share_yyid,this.$route.query.resource_type,window.sessionStorage.getItem('singleMark'))
      } else {
      	viewCount('',this.$route.query.resource_yyid,this.share_yyid,this.$route.query.resource_type,window.sessionStorage.getItem('singleMark'))
      }
      this.getData();
		},
    updated(){
      this.showImg();
    },
		methods:{
			showToggle(index){
				if(this.show_id === index){
					this.show_id = -1;
				} else {
					this.show_id = index;
				}
			},
      // 加载数据
      async getData(){
        let res = await totalSummaryData(this.$route.query.str_type);
        this.content_list = res.content_list;
        if(res.video_list){
        	this.video_list = res.video_list;
        };
        if(res.literature_list){
        	this.literature_list = res.literature_list;
        };
        this.name = res.title;
        this.en_name = res.english_title;
        wxShare(res.title,res.product+res.title,'http://img.youyao99.com/fibrin_1x1.jpg',this.$route.query.str_type,this.$route.query.resource_type,this.$route.query);
      },
      // 显示放大图片
      showImg(){
        let elem = document.querySelectorAll('.item_con img');
        let src_list = [];

        elem.forEach(item => {
          src_list.push(item.getAttribute('src'));
          (function(){
            item.onclick = function(){
              previewImg(item.getAttribute('src'),src_list);
            }
          })();
        });

      }
		}
	}
</script>
<style lang="less">
	@import '../../assets/css/graphic';
	.prod_overview{
		.in_prod_overview{
			position: absolute;
			top: 36px;
			left: 0;
			right: 0;
			bottom: 68px;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			z-index: 2;
			.ov_hd{
				height: 140px;
				overflow: hidden;
				position: relative;
				img{
					height: 100%;
				}
				.ov_hd_title{
					width: 100%;
					height: 140px;
					position: absolute;
					top: 20px;
					text-align: center;
					color: #ffffff;
					h1{
						font-size: 18PX;
					}
				}
			}
			.line{
				width: 20px;
				height: 3px;
				margin: 3px auto;
				border-radius: 4px;
			}
			.ov_bd{
				position: relative;
				z-index: 4;
				.ov_con{
					width: 92%;
					margin: -50px auto 0;
					.ov_con_item{
						border-radius: 8px;
						padding-top: 20px;
						text-align: center;
						box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
						margin-bottom: 15px;
						h5{
							font-size: 16PX;
							padding: 0 15px;
						}
						img{
							width: 100% !important;
						}
						.line{
							background-color: #5870FE;
						}
						.item_con{
							color: #666666;
							text-align: left;
							line-height: 22px;
							padding: 10px 30px 15px;
						}
						.item_con_hidden{
							display: none;
						}
						.show{
							display: block;
						}
						.extend_btn {
							padding: 6px 0;
							color: #5870FE;
							.iconfont{
								vertical-align: middle;
								font-size: 26PX;
							}
						}
					}
				}

			}
		}

	}
</style>
