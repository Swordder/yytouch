<template>
	<div class="clinical_detail" data-name="page_clinic_detail">
		<div class="art_detail">
			<div class="art_hd bd_bt">
				<h1>{{clinical_data.title}}</h1>
				<p class="author"><i class="iconfont">&#xe61f;</i>{{clinical_data.sub_title}}</p>
				<p class="view"><i class="iconfont">&#xe926;</i>{{clinical_data.read_sum}}</p>
			</div>
			<div class="art_bd" v-html="clinical_data.content">
				{{clinical_data.content}}
			</div>
		</div>
		<div class="com">
			<div class="com_hd bd_bt flex_item">
				<h4>全部评论</h4>
				<p>{{com_num}}条</p>
			</div>
			<Comments 
				:comList = 'com_list' 
				:userYyid="user_yyid" 
				@showComMod="showComArea" 
				@delComCon="cancelDelCom" 
				:delMod = 'del_mod'>
			</Comments>
		</div>
		<CommentsBar 
			:favStatus='fav_status' 
			:resourceType="resource_type" 
			:resourceYyid = "$route.query.interpret_yyid"
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
	import { clinicalDetail,viewCount,favStatus,commentsList,sendComment,delComment } from '../../api/sendRequest.js'
	import { getSessionStore } from '../../config/util.js'
	import { mapState,mapActions } from 'vuex'
	export default{
		data(){
			return {
				clinical_data:{},
				user_yyid:'',
				fav_status:'',
				com_list:[],
				com_num:'',
				show_com:false,
				father_yyid:'',
				del_mod:false,
				com_yyid:'',
				resource_type:9,
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
		created(){
			setStore('id_type',this.$route.query.interpret_yyid);
		},
		mounted() {
			this.idStatus();
			this.getClinicalDetail();
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
				viewCount(this.user_info.yyid,this.$route.query.interpret_yyid,this.share_yyid,9,window.sessionStorage.getItem('singleMark'))
			} else {
				viewCount('',this.$route.query.interpret_yyid,this.share_yyid,9,window.sessionStorage.getItem('singleMark'))
			}
			
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		methods:{
			...mapActions([
				'checkUserInfo'
			]),
			idStatus(){
				if(this.user_info&&this.user_info.yyid){
					this.user_yyid = this.user_info.yyid;
				} else {
					this.user_yyid = '';
				}
			},
			async shareInfo(){
				let res = await axiosFn('/youyao/share/info',{
					'page_name':'interpret_detail',
					'interpret_yyid':this.$route.query.interpret_yyid
				},'POST');
				wxShare(res.data.title,res.data.sub_title,res.data.image,this.$route.query.interpret_yyid,9,this.$route.query);	
			},
			async getClinicalDetail(){
				// this.$vux.loading.show({text: 'Loading'})
				let res = await clinicalDetail(this.user_yyid,this.$route.query.interpret_yyid);
				if(res.errcode == 0){
					// this.$vux.loading.hide();
					this.clinical_data = res.data;
				}
			},
			async getFavStatus(){
				let res = await favStatus(this.user_yyid,this.$route.query.interpret_yyid);
				this.fav_status = res.data.if_has_fav;
			},
			async getComList(){
				let res = await commentsList(this.user_yyid,this.$route.query.interpret_yyid,getSessionStore('yy_singleMark'),'');
				if(res.errcode == 0){
					this.com_list = res.data.comment_info;
					this.com_num = res.data.comment_num;
				}
			},
			async sendCom(txt_val){
				let res = await sendComment(
					this.user_yyid,
					this.user_info.user_token,
					this.$route.query.interpret_yyid,
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
	.clinical_detail{
		padding-bottom: 45px;
		.art_detail{
			padding: 15px 20px;
			border-bottom: 10px solid #F5F5F5;
			.art_hd{
				padding-bottom: 5px;
				margin-bottom: 12px;
				h1{
					font-size: 16PX;
					line-height: 22px;
				}
				p{
					font-size: 12PX;
					color: #999999;
					.iconfont{
						font-size: 18PX;
						margin-right: 7px;
						vertical-align: middle;
					}
				}
				.author{
					.iconfont{
						font-size: 16PX;
					}
				}
			}
			.art_bd{
				line-height: 24px;
				p{
					color: #666666;
					word-break: break-all;
				}
				img{
					width: 100%;
				}
			}
		}
		.com_hd{
			p{
				color: #5870FE;
			}
		}
	}
</style>
