<template>
	<div class="agent_btn" @click="applyAgentBtn()">
		<a v-if="user_info&&user_info.is_agent == '2'" href="javascript:;">{{$t('agent_btn')}}</a>
    	<a v-else href="javascript:;">{{$t('serve_btn')}}</a>
	</div>
</template>

<script>
	import {updateUserInfo} from '../api/sendRequest.js'
	import { mapState,mapMutations,mapActions } from 'vuex'
	export default{
		props:[],
		data(){
			return {

			}
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		methods:{
			async applyAgentBtn(){
				if(this.user_info && this.user_info.yyid){
					let res = await updateUserInfo(this.user_info.yyid,this.user_info.user_token);
					if(res.errcode == 4003){
						this.CHECK_USERINFO();
						this.$router.push({path:'/login',query:{redirect: '/product','series_yyid':this.$route.query.series_yyid,product_yyid:this.$route.query.product_yyid}})
					} else if(res.errcode == 0){
						if(this.user_info.is_agent == '0' || this.user_info.is_agent == '1' || this.user_info.is_agent == '4'){
							this.$router.push({path:'/certificateInfo'})
						} else {
							this.$router.push({path:'/applyHos',query:{'series_yyid':this.$route.query.series_yyid,product_yyid:this.$route.query.product_yyid}})
						}
					}
				} else {
					this.$router.push({path:'/login',query:{redirect: '/product','series_yyid':this.$route.query.series_yyid,product_yyid:this.$route.query.product_yyid}})
				}
			},
		}
	}
</script>
<style lang="less">

</style>
