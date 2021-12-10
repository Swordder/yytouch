<template>
	<div class="video_detail" data-name="page_video_detail">
		<div class="video" :style="{height:video_height}">
			<div id="video_container" :style="{height:video_height}"></div>
		</div>
		<mu-container :style="{top:video_height}">
			<mu-tabs :style="{top:video_height}" :value.sync="active2" color="#ffffff" indicator-color="#5870FE"  text-color="#5870FE" full-width>
				<mu-tab>介绍</mu-tab>
				<mu-tab>
					评论
					<p class="comments_num">{{com_num}}</p>
				</mu-tab>
			</mu-tabs>
			<div class="con_text video_intro" :style="{top:video_height}" v-if="active2 === 0">
				<div v-html="video_data.content">
					{{video_data.content}}
				</div>
			</div>
			<div class="con_text comments_con" :style="{top:video_height}" v-if="active2 === 1">
				<Comments 
					:comList = 'com_list' 
					:userYyid="user_yyid" 
					@showComMod="showComArea" 
					@delComCon="cancelDelCom" 
					:delMod = 'del_mod'>
				</Comments>
			</div>
		</mu-container>
		<CommentsBar 
			:favStatus='fav_status' 
			:resourceType="resource_type" 
			:resourceYyid = "$route.query.video_yyid"
			@showComMod="showComArea">
		</CommentsBar>
		<CommentArea v-show="show_com" @cancelSendCon = "showComArea" @sendComCon = 'sendCom'></CommentArea>
		<Negative v-show="del_mod" :negtiveCon="negtive_con" @cancelDel = "closeDelMod" @delData = "delComData"></Negative>
	</div>
</template>

<script>
	import Comments from '../../components/Comments.vue'
	import CommentsBar from '../../components/CommentsBar.vue'
	import Negative from '../../components/Negative.vue'
	import CommentArea from '../../components/CommentArea.vue'
	import axiosFn from '../../config/index.js'
	import { setStore } from '../../config/util.js'
	import { wxShare } from '../../config/share.js'
	import { videoDetail,viewCount,favStatus,commentsList,sendComment,delComment } from '../../api/sendRequest.js'
	import { getSessionStore } from '../../config/util.js'
	import { mapState,mapActions } from 'vuex'
	export default {
		data () {
			return {
				video_data:{},
				active2: 0,
				user_yyid:'',
				fav_status:'',
				com_list:[],
				com_num:'',
				show_com:false,
				father_yyid:'',
				del_mod:false,
				com_yyid:'',
				resource_type:1,
				video_height:'0px',
				negtive_con:{
					title:'删除评论',
					con:'是否确认删除此条评论?'
				},
				share_yyid:''
			}
		},
		components:{
			Comments,
			CommentsBar,
			Negative,
			CommentArea
		},
		computed:{
			...mapState([
				'user_info'
			]),
		},
		created(){
			setStore('id_type',this.$route.query.video_yyid);
		},
		mounted() {
			this.getVideoDetail();
			this.idStatus();
			if(this.user_info && this.user_info.yyid){
				this.getFavStatus();
			}
			this.getComList();
			this.shareInfo();
			
			if(this.$route.query.share_yyid&&this.$route.query.share_yyid != undefined){
				this.share_yyid = this.$route.query.share_yyid;
			} else {
				this.share_yyid = '';
			}
			if(this.user_info && this.user_info.yyid){
				viewCount(this.user_info.yyid,this.$route.query.video_yyid,this.share_yyid,1,window.sessionStorage.getItem('singleMark'))
			} else {
				viewCount('',this.$route.query.video_yyid,this.share_yyid,1,window.sessionStorage.getItem('singleMark'))
			}
		},
		methods:{
			idStatus(){
				if(this.user_info&&this.user_info.yyid){
					this.user_yyid = this.user_info.yyid;
				} else {
					this.user_yyid = '';
				}
			},
			videoFn(url,pic,id){
				let width = window.screen.width;
				this.video_height = 9*width/16+'PX';
				let player = new TcPlayer('video_container', {
					"mp4": url, //请替换成实际可用的播放地址
					"autoplay" : false,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
					"coverpic" : {
						'style':'stretch',
						'src':pic
					},
					'controls':'system',
					"width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
					"height" : '100%',//视频的显示高度，请尽量使用视频分辨率高度
					"listener":function(msg){
						if(msg.type='loadedmetadata'){
							if(msg.type='loadedmetadata'){
								if((player.duration()-player.currentTime())>=0.5&&(player.duration()-player.currentTime())<=1){
									player.pause();
									player.currentTime(0.1);
									player.pause();
									player.fullscreen(false);
								}
							}
						}
					}
				});	
			},
			async shareInfo(){
				let res = await axiosFn('/youyao/share/info',{
					'page_name':'video_detail',
					'video_yyid':this.$route.query.video_yyid
				},'POST');
				wxShare(res.data.title,res.data.sub_title,res.data.image,this.$route.query.video_yyid,1,this.$route.query);	
			},
			async getVideoDetail(){
				let yyid = '';
				if(this.user_info && this.user_info.yyid){
					yyid = this.user_info.yyid;
				} else {
					yyid = '';
				}
				let res = await videoDetail(yyid,this.$route.query.video_yyid);
				this.video_data = res.data;
				this.videoFn(res.data.video_tencent_url,res.data.img_src);
			},
			async getFavStatus(){
				let res = await favStatus(this.user_yyid,this.$route.query.video_yyid);
				this.fav_status = res.data.if_has_fav;
			},
			async getComList(){
				let res = await commentsList(this.user_yyid,this.$route.query.video_yyid,getSessionStore('yy_singleMark'),'');
				if(res.errcode == 0){
					this.com_list = res.data.comment_info;
					this.com_num = res.data.comment_num;
				}
			},
			async sendCom(txt_val){
				let res = await sendComment(
					this.user_yyid,
					this.user_info.user_token,
					this.$route.query.video_yyid,
					2,
					this.father_yyid,
					txt_val
				);
				if(res.errcode == 0){
					this.getComList();
				}
				this.show_com = false;
			},
			async delComData(){
				let res = await delComment(
					this.user_yyid,
					this.user_info.user_token,
					this.com_yyid
				);
				this.getComList();
				this.del_mod = false;
			},
			showComArea(father_yyid){
				if(!(this.user_info && this.user_info.yyid)){
					this.checkUserInfo();
				}
				if(father_yyid){
					this.father_yyid = father_yyid;
				} else {
					this.father_yyid = '';
				}
				this.show_com = !this.show_com;
			},
			cancelDelCom(com_yyid,user_id){
				this.com_yyid = com_yyid;
				if(this.user_yyid == user_id){
					this.del_mod = true;
				} else {
					this.del_mod = false;
				}
			},
			closeDelMod(){
				this.del_mod = !this.del_mod;
			}
		}
	}
</script>

<style lang="less">
	.video_detail{
		.video{
			width: 100%;
			// height: 210px;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 4;
			background-color: #000000;
		}
		.container{
			position: absolute;
			top: 180px;
			padding: 0;
			.mu-tabs{
				position: fixed;
				// top: 180px;
				left: 0;
				right: 0;
				border-bottom: 1px solid #F3F3F3;
				.mu-tab-active{
					.mu-tab-wrapper{
						color: #5870FE;
					}
				}
			}
			.mu-tab-wrapper{
				font-size: 14PX;
				color: #333333;
				position: relative;
				.comments_num{
					position: absolute;
					top: 15px;
					right: 60px;
					color: #ffffff;
					width: 16px;
					height: 16px;
					background-color: #FF5252;
					border-radius: 50%;
					text-align: center;
					line-height: 18px;
					font-size: 12PX;
				}
			}
		}
		.con_text{
			padding: 53px 0px 45px;
			.comments{
				min-height: 300px;
			}
		}
		.video_intro {
			padding: 63px 20px 45px;
			background: #fff;
			overflow: hidden;
			overflow-y: scroll;
			img{
				width: 100% !important;
				height: 100% !important;
			}
		}
	}
</style>
