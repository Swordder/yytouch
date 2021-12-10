<template>
	<div class="knowledge_detail" data-name="knowledge_detail">
		<div class="word" v-if="data.file_type == 2">
			<router-link :to="{path:'/knowledgeDoc',query:{type:data.file_type,yyid:data.yyid}}">
				<img src="http://img.youyao99.com/7dfed61ca58e356ce6b6704c61784ead.png" alt="">
			</router-link>
		</div>
		<div v-else class="video" :style="{height:video_height}">
			<div id="video_container" :style="{height:video_height}"></div>
		</div>
		<div class="container">
			<h4>{{data.title}}</h4>
			<p class="time">{{data.created_time}}</p>
			<div class="video_con">
				{{data.introduce}}
			</div>
		</div>
	</div>
</template>
<script>
	import { knowledgeInfo } from '../../api/sendRequest.js'
	import { mapState,mapActions } from 'vuex'
	export default {
		data () {
			return {
				data:{},
				video_data:{},
				video_height:'0px',
			}
		},
		computed:{
			...mapState([
				'user_info'
			]),
		},
		mounted() {
			let width = window.screen.width;
			this.video_height = 9*width/16+'PX';
			this.getDetail();
		},
		methods:{
			async getDetail(){
				let res = await knowledgeInfo(this.user_info.yyid,this.user_info.user_token,this.$route.query.knowledge_yyid);
				this.data = { ...res.data }
				document.title = res.data.title;
				if(res.data.file_type == 1){
					this.videoFn(res.data.file_address)
				}
			},
			videoFn(url,pic,id){
				let player = new TcPlayer('video_container', {
					"mp4": url, //请替换成实际可用的播放地址
					"autoplay" : false,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
					'controls':'system',
					"width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
					"height" : '100%',//视频的显示高度，请尽量使用视频分辨率高度
					"listener":function(msg){
						if(msg.type='loadedmetadata'){
							if((player.duration()-player.currentTime())>=0.5&&(player.duration()-player.currentTime())<=1){
								player.pause();
								player.currentTime(0.1);
								player.pause();
								player.fullscreen(false);
							}
						}
					}
				});	
			},
		}
	}
</script>
<style lang="less">
	.knowledge_detail{
		padding:0 15px 15px;
		.word{
			position: fixed;
			top: 0px;
			left: 0px;
			right: 0px;
			z-index: 4;
			a{
				display: block;
			}
			img{
				width: 100%;
				height: auto;
			}
		}
		.video{
			position: fixed;
			top: 0px;
			left: 0px;
			right: 0px;
			z-index: 4;
			background-color: #000000;
			border-radius: 2px;
		}
		.container{
			margin-top: 240px;
			padding: 0;
			h4{
				font-size: 16PX;
			}
			.time{
				font-size: 12PX;
				color: #999999;
				margin-top: 4px;
				margin-bottom: 10px;
			}
			img{
				width: 100% !important;
				height: auto;
			}
		}
	}
</style>
