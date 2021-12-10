<template>
	<div class="user_info_page bgc" data-name="page_user_info">
		<div class="profile bgcw">
			<div class="flex_item bd_bt avatar">
				<div class="p_title">{{$t('user_info.profile_photo')}}</div>
				<div class="p_con">
					<img :src="user_info.picture_url" alt="">
				</div>
			</div>
			<div class="flex_item bd_bt">
				<div class="p_title">{{$t('user_info.nick')}}</div>
				<div class="p_con">{{user_info.name != ''?user_info.name:user_info.truename}}</div>
			</div>
			<div class="flex_item bd_bt">
				<div class="p_title">{{$t('user_info.cell_phone')}}</div>
				<div class="p_con">{{user_info.mobile_num}}</div>
			</div>
      <div v-if="user_info.is_agent == 1 || user_info.is_agent == 0 ||user_info.is_agent == 4" class="flex_item">
      	<div class="p_title">{{$t('user_info.authentication')}}</div>
      	<div class="p_con gray_9">{{$t('profile.unverified')}}</div>
      </div>
      <router-link v-else-if="user_info.is_agent == 2" class="flex_item" to="/userInfoShow">
      	<div class="p_title">{{$t('user_info.authentication')}}</div>
      	<div class="p_con blue">{{$t('profile.verified_rep')}}</div>
      </router-link>
      <router-link v-else="user_info.is_agent == 3" class="flex_item" to="/userInfoShow">
      	<div class="p_title">{{$t('user_info.authentication')}}</div>
      	<div class="p_con blue">{{$t('profile.in_verification')}}</div>
      </router-link>
		</div>
		<div class="auth_status bgcw" v-show="user_info.is_agent != 2">
			<div v-if="user_info.is_agent == 0 || user_info.is_agent == 1" class="steps">
				<img src="http://img.youyao99.com/C481F1B4FD169FC582AC233CDE977D1A.png" alt="">
				<div class="agent_btn">
					<router-link to="/certificateInfo">{{$t('im_auth_btn')}}</router-link>
				</div>
			</div>
			<div v-else-if="user_info.is_agent == 3" class="sub_succ">
				<img src="http://img.youyao99.com/0D3D9C0472FD04D431089836D3C7AA29.png" alt="">
				<p class="font_16">认证资料已提交</p>
				<p>我们将在1-2个工作日内完成审核</p>
				<div class="agent_btn">
					<router-link to="/personalCenter">返回</router-link>
				</div>
			</div>
			<div v-else-if="user_info.is_agent == 4" class="sub_succ fail_btn">
				<img src="http://img.youyao99.com/81DE77586D43D715DD7ABF3DA6D5ED26.png" alt="">
				<p class="font_16">很抱歉，您未通过认证审核</p>
				<p>{{user_info.refuse_msg}}</p>
				<div class="agent_btn">
					<router-link to="/certificateInfo">重新认证</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	import {getAgentInfo,updateUserInfo} from '../../api/sendRequest.js'
	import {getStore,setStore} from '../../config/util'
	export default {
		data(){
			return {
				status:1
			}
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		mounted(){
			this.getUserStatus();
			this.agentInfo();
		},
		methods:{
			async getUserStatus(){
			    let res = await updateUserInfo(this.user_info.yyid,this.user_info.user_token);
			    if (this.user_info) {
			        this.yy_user_info = Object.assign(this.user_info,res.data);
			    }
			    setStore('yy_user_info',JSON.stringify(this.yy_user_info))
			},
			async agentInfo(){
				if(this.user_info.is_agent == 0){
					return
				}
				let res = await getAgentInfo(this.user_info.yyid,this.user_info.user_token);
				if(getStore('yy_user_info')){
					this.$set(this.user_info,'truename',res.data.truename)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.user_info_page{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		.profile{
			padding: 10px 15px 0 15px;
			.flex_item{
				height: 44px;
				line-height: 44px;
				.p_con{
					color: #666666;
				}
				.gray_9{
					color: #999999;
				}
				.yellow_ft{
					color: #FF982A;
				}
				.blue{
					color: #5870FE;
				}
			}
			.avatar{
				height: auto;
				.p_con{
					width: 40px;
					height: 40px;
					margin-bottom: 8px;
					border-radius: 50%;
					border: 1PX solid #CCCCCC;
					img{
						width: 100%;
						border-radius: 50%;
					}
				}
			}
		}
		.auth_status{
			padding: 15px;
			position: absolute;
			top: 206px;
			left: 0;
			right: 0;
			bottom: 0;
			.steps{
				img{
					width: 100%;
				}
			}
			.sub_succ{
				text-align: center;
				img{
					width: 120px;
					margin-top: 40px;
				}
				p{
					color: #666666;
					margin-top: 4px;
				}
				.font_16{
					font-weight: bold;
					color: #333333;
					margin-top: 12px;
				}
				.agent_btn{
					padding-bottom: 15px;
					a{
						width: 160px;
						margin: 0 auto;
					}
				}
			}
			.fail_btn{
				p{
					color: #333333;
					margin-top: 4px;
				}
				img{
					width: 140px;
				}
				.agent_btn{
					padding-bottom: 15px;
					a{
						width: 100%;
						margin: 0 auto;
					}
				}
			}
		}
	}
</style>
