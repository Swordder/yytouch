<template>
	<div class="comments_bar bgcw flex_item">
		<div class="txt_wrap" @click="showCom('')">
			<input type="text" v-model="value" class="bgcw" disabled="disabled" placeholder="输入评论..."/>
		</div>
		<div class="flex_item">
			<div class="fav_btn bar_btn" @click="favRouter()">
				<i class="iconfont" v-if="favStatus == 0">&#xe613;</i>
				<i class="iconfont red" v-else>&#xe666;</i>
				<p class="font_10">收藏</p>
			</div>
			<div class="share_btn bar_btn" @click="shareCover()">
				<i class="iconfont">&#xe60d;</i>
				<p class="font_10">分享</p>
			</div>
		</div>
		<transition name="showcover">
			<div class="back_cover" v-show="bc_status" @click="shareCover()">
				<div class="bc_con">
					<i class="iconfont">&#xe622;</i>
					<p>
						请点击右上角<br>
						把它发送给指定朋友<br>
						或分享到朋友圈
					</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { mapState,mapActions } from 'vuex'
	export default{
		props:['favStatus','resourceType','resourceYyid'],
		data(){
			return {
				value:'',
				bc_status:false
			}
		},
		computed:{
		 	...mapState([
				'user_info'
			]),
		},
		mounted() {
		},
		methods:{
			...mapActions([
				'checkUserInfo'
			]),
			showCom(){
				this.checkUserInfo();
				if(this.user_info&&this.user_info.yyid){
					this.$emit('showComMod','');
				} else {
					this.$router.push({path:'/login',query:{redirect: encodeURIComponent(this.$route.fullPath)}})
				}
			},
			favRouter(){
				if(this.user_info&&this.user_info.yyid){
					this.$router.push({path:'/selectFav',query:{resource_yyid:this.resourceYyid,resource_type:this.resourceType}})
				} else{
					this.$router.push({path:'/login',query:{redirect: encodeURIComponent(this.$route.fullPath)}})
				}
			},
			shareCover(){
				this.bc_status = !this.bc_status;
			}
		}
	}
</script>

<style lang="less">
	.comments_bar{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 5px 20px 0;
		z-index: 101;
		box-shadow:0px -1px 4px 0px rgba(239,239,239,0.5);
		.txt_wrap{
			width: 70%;
			input{
				width: 100%;
				height:36px; 
				padding: 0 20px;
				border:1px solid rgba(221,221,221,1);
				border-radius: 18px;
				outline-style: none;
			}
		}
		
		input::-webkit-input-placeholder{
			color: #B4B4B4;
		}
		input::-ms-input-placeholder{
			color: #B4B4B4;
		}
		input::-moz-placeholder{
			color: #B4B4B4;
		}
		.fav_btn{
			margin-right: 15px;
		}
		.bar_btn{
			color: #999999;
			text-align: center;
			.iconfont{
				font-size: 18PX;
			}
			.red{
				color: #FF5252;
			}
		}
		.back_cover{
			top: 0;
			bottom: 0;
			text-align: center;
			z-index: 1000;
			.bc_con{
				width: 60%;
				position: absolute;
				top:20%;
				left: 60%;
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
