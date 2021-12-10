<template>
	<div class="create_fav" data-name="page_edit_fav">
		<div class="com_hd bd_bt flex_item">
			<h4>编辑收藏夹</h4>
		</div>
		<div class="fav_title">
			<input type="text" v-model.trim="value" placeholder="请输入收藏夹标题">
		</div>
		<div class="agent_btn" @click="editOldFav()">
			<a href="javascript:;">完成</a>
		</div>
	</div>
</template>
<script>
	import { editFav } from '../../api/sendRequest.js';
	import { mapState,mapActions } from 'vuex'
	export default{
		data(){
			return{
				value:''
			}
		},
		mounted() {
			this.checkUserInfo();
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
			async editOldFav(){
				if(this.value == ''){
					this.$vux.toast.text('标题不能为空','top');
					return;
				}
				let res = await editFav(this.$route.query.fav_yyid,this.value);
				if(res.errcode == 0){
					this.$router.go(-1);
				}
			}
		}
	}
</script>

<style lang="less">
	.weui-toast.weui-toast_text{
	    min-height: 0;
	    background-color: #F65B6A;
	    width: 100% !important;
	    top: 0px;
	}
	.weui-toast_text .weui-toast__content{
	    width: 100%;
	}
	.create_fav{
		.fav_title{
			padding: 15px;
			input{
				width: 100%;
				height: 44px;
				background-color: #EEEEEE;
				border: none;
				border-radius: 4px;
				outline-style: none;
				padding: 0 10px;
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
		}
	}
	
</style>
