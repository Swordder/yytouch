<template>
	<div class="err_mod" v-show="modtype == 'err_correct_mod'">
		<div v-if="!success_status" class="submit_err">
			<div class="mod_con err_correct bgcw">
				<h2>纠错</h2>
				<p>如果您的流向信息有误，请在下方提交错误纠正信息，我们会尽快为您更</p>
				<textarea name="" id="" v-model.trim="correct_con"></textarea>
				<div class="opera_btns">
					<button type="button" class="btn_common sub_btn" @click="submitCorrectCon()">提交</button>
				</div>
			</div>
			<div class="close">
				<i class="iconfont" @click="closehandle()">&#xe615;</i>
			</div>
		</div>
		<div v-else class="submit_success">
			<img src="http://img.youyao99.com/550B03B0AD09EB627B695CDC1A3F4558.png" alt="">
			<p>纠错内容已提交</p>
			<a href="javascript:;" @click="closehandle()">确定</a>
		</div>
	</div>
</template>
<script>
	import {errCorrect} from '../api/sendRequest.js'
	export default {
		props:['modtype','userinfo'],
		data(){
			return{
				correct_con:'',
				success_status:false
			}
		},
		methods:{
			async submitCorrectCon(){
				if(this.correct_con == ''){
					return;
				}
				let res = await errCorrect(this.userinfo.yyid,this.userinfo.user_token,this.correct_con,4,'');
				if(res.errcode == 0){
					// this.$emit('closeMod');
					this.correct_con = '';
					this.success_status = true;
				}
			},
			
			closehandle(){
				this.success_status = false;
				this.$emit('closeMod');
			}
		}
	}
</script>

<style lang="less" scoped>
	
.err_mod{
	width: 285px;
	position: fixed;
	top: 20%;
	margin: 0 auto;
	left: 50%;
	margin-left: -142px;
	z-index: 4;
	.close{
		text-align: center;
		margin-top: 20px;
		color: #FFFFFF;
		.iconfont{
			font-size: 30PX;
		}
	}
	.mod_con{
		padding: 20px;
		border-radius: 10px;
		h2{
			text-align: center;
			font-weight: bold;
			margin-bottom: 5px;
		}
		p{
			color: #666666;
			margin-bottom: 10px;
		}
		.opera_btns{
			margin-top: 20px;
			button{
				width: 48%;
			}
		}
	}
	.err_correct{
		textarea{
			width: 100%;
			height: 80px;
			padding: 6px;
			border: 1px solid #EEEEEE;
			resize: none;
			color: #666666;
			font-size: 12PX;
			outline-style: none;
		}
		.opera_btns{
			text-align: center;
			margin-top: 15px;
		}
		.sub_btn{
			background-color: #5870FE;
			color: #FFFFFF;
		}
	}
	.submit_success{
		width: 285px;
		height: 260px;
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 20;
		padding:7px 53px ;
		background-color: #FFFFFF;
		border-radius: 8px;
		box-sizing: border-box;
		text-align: center;
		img{
			width: 100%;
		}
		a{
			display: inline-block;
			width: 100%;
			height: 36px;
			line-height: 36px;
			border: 1PX solid #5870FE;
			border-radius: 18px;
			color: #5870FE;
			margin-top: 8px;
		}
	}
}

</style>
