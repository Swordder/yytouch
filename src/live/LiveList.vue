<template>
	<div class="total_live" data-name="page_live_list">
		<div class="pub_class lecture">
			<div class="com_hd flex_item">
				<h4 v-if="$route.query.type == 1">{{$t('op_course_replay')}}</h4>
				<h4 v-else>{{$t('pro_lecture_replay')}}</h4>
			</div>
			<div class="pub_list">
				<div class="pub_item flex_item bd_bt" v-for="(item,index) in video_list" :key="index">
					<router-link class="flex_item" :to="{path:'/liveDetail',query:{video_yyid:item.yyid}}">
						<div class="pub_pic">
							<img :src="item.pic" alt="">
						</div>
						<div class="lecture_con flex_item">
							<p class="pub_title">{{item.title}}</p>
							<p>{{item.author}}</p>
							<div class="pub_data flex_item">
								<div class="pub_time">
									{{item.start_time.split(' ')[0].split('-')[1]}}/{{item.start_time.split(' ')[0].split('-')[2]}}
									{{item.start_time.split(' ')[1].split(':')[1]}}:{{item.start_time.split(' ')[1].split(':')[2]}}
								</div>
								<div class="live_view flex_item">
									<p>
										<i class="iconfont">&#xe621;</i>
										{{item.view_num}}
									</p>
									<p class="comment">
										<i class="iconfont">&#xe648;</i>
										{{item.comment_num}}
									</p>
								</div>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { liveVideoList } from '../../api/sendRequest.js'
	import { mapState } from 'vuex'
	export default{
		data(){
			return {
				video_list:[]
			}
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		mounted() {
			this.getTotalData();
		},
		methods:{
			async getTotalData(){
				let yyid = '',token = '';
				if(this.user_info&&this.user_info.yyid){
					yyid = this.user_info.yyid;
					token = this.user_info.user_token;
				} else {
					yyid = '';
					token = '';
				}
				let res = await liveVideoList(yyid,token,'',this.$route.query.type);
				if(res.errcode != 0){
					this.$vux.toast.text(res.errmsg,'top');
					return
				}
				this.video_list = res.data.video_list;
			}
		}
	}
</script>

<style lang="less">
	@import '../../assets/css/live.less';
	.total_live{
		padding: 0px 15px;
		.com_hd{
			padding: 0;
		}
	}
</style>
