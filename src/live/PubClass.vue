<template>
	<div class="public_class" data-name="page_pub_class">
		<div class="swiper_container">
			<mu-carousel interval="4000">
				<mu-carousel-item v-for="(item,index) in banner_list" :key="index">
					<a :href="item.link">
						<div v-show="item.status != 3" class="live_status">
							<div v-if="item.status==1" class="live_sign">预告中</div>
							<div v-else-if="item.status==2" class="live_sign living">正在直播中</div>
						</div>
						<img :src="item.pic">
					</a>
				</mu-carousel-item>
			</mu-carousel>
		</div>
		<div class="fore_list" v-show="advance_list.length != 0">
			<div class="com_hd flex_item">
				<h4>{{$t('weblive_notice')}}</h4>
			</div>
			<div class="fore_con_list">
				<div class="fore_item" v-for="(item,index) in advance_list" :key="index">
					<div class="time">
						<i class="iconfont">&#xe602;</i>
						{{item.start_time.split(' ')[0].split('-')[1]}}月{{item.start_time.split(' ')[0].split('-')[2]}}日
						{{item.start_time.split(' ')[1].split(':')[0]}}:{{item.start_time.split(' ')[1].split(':')[1]}}
					</div>
					<div class="fore_title flex_item">
						<p><a :href=item.live_url >{{item.title}}</a></p>
						<a 
							@click="getFoucsStatus(item.yyid)" 
							href="javascript:;" 
							class="fouce_btn" 
							:class="{foucs:item.is_focus == 1}">
							{{item.is_focus == 1?'已关注':'关注'}}
						</a>
					</div>
					<div class="fore_speaker">
						{{item.author}}
					</div>
				</div>
			</div>
		</div>
		<div class="pub_class lecture">
			<div class="com_hd flex_item">
				<h4>{{$t('replay')}}</h4>
				<router-link :to="{path:'/liveList',query:{type:1}}">{{$t('all_lectures')}}</router-link>
			</div>
			<div class="pub_list">
				<div class="pub_item flex_item bd_bt" v-for="(item,index) in lecture_list" :key="index">
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
									{{item.start_time.split(' ')[1].split(':')[0]}}:{{item.start_time.split(' ')[1].split(':')[1]}}
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
	import { wxShare } from '../../config/share.js'
	import { liveBanner,liveAdvance,liveVideoList,focusStatus } from '../../api/sendRequest.js'
	import { getStore } from '../../config/util.js'
	import { mapState } from 'vuex'
	export default{
		data(){
			return {
				banner_list:[],
				advance_list:[],
				lecture_list:[],
				yyid:'',
				token:''
			}
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		mounted() {
			this.getTotalData();
			wxShare('优药公开课','为了更好的提高医药代表的业务技巧、工作能力、行业见解，优药公开课将定期邀请相关业内资深讲师、嘉宾进行专业的职业培训、业务学习、行业访谈、市场环境及政策分析。','http://wx.youyao99.com/images/icon.jpg','9D8003C158248FEA68767E86517B505F',19,this.$route.query);
		},
		methods:{
			userStatus(){
				if(this.user_info&&this.user_info.yyid){
					this.yyid = this.user_info.yyid;
					this.token = this.user_info.user_token;
				} else {
					this.yyid = '';
					this.token = '';
				}
			},
			async getTotalData(){
				// this.$vux.loading.show({text: 'Loading'});
				
				let res1 = liveBanner(this.yyid,this.token,1);
				let res2 = liveAdvance(this.yyid,this.token,1);
				let res3 = liveVideoList(this.yyid,this.token,1,1);
				let res = await Promise.all([res1,res2,res3]);
				
				// this.$vux.loading.hide();
				this.banner_list = res[0].data;
				this.advance_list = res[1].data;
				this.lecture_list = res[2].data.video_list;
			},
			async getFoucsStatus(id){
				let res = await focusStatus(getStore('openid'),id);
				let yyid = '',token = '';
				if(res.errcode != 0){
					this.$vux.toast.text(res.errmsg,'top');
					return
				}
				
				let res2 = await liveAdvance(this.yyid,this.token);
				this.advance_list = res2.data;
			}
		}
	}
</script>

<style lang="less">
	@import '../../assets/css/live.less';
	.public_class{
		padding: 12px 15px;
		.pub_class{
			.com_hd{
				padding: 0;
			}
		}
	}
</style>
