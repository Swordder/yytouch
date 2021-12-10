<template>
	<div class="com_area">
		<transition name="showcover">
			<div class="back_cover"></div>
		</transition>
		<div class="negative_mod bgcw">
			<h2>评论</h2>
			<textarea v-model.trim="txt_val" maxlength="99" placeholder="请输入您的评论..." />
			<p class="font_10">可输入{{99-Number(txt_val.length)}}字</p>
			<div class="negative_btn flex_item">
				<a href="javascript:;" @click="cancelSend">取消</a>
				<a href="javascript:;" class="send_btn" @click="sendCom(txt_val)">发送</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		// props:['sendData'],
		data(){
			return {
				txt_val:'',
			}
		},
		mounted() {
			
		},
		methods:{
			cancelSend(){
				this.txt_val = '';
				this.$emit('cancelSendCon');
			},
			async sendCom(){
				this.$emit('sendComCon',this.txt_val);
				this.txt_val = '';
			}
		}
	}
</script>
<style lang="less">
	.com_area{
		.back_cover{
			top:0;
			bottom: 0;
			z-index: 200;
		}
		.negative_mod{
			width: 285px;
			text-align: center;
			border-radius: 8px;
			position: fixed;
			top: 30%;
			left: 50%;
			z-index: 202;
			margin-left: -143px;
			padding: 20px;
			h2{
				margin-bottom: 10px;
			}
			.font_10{
				color: #B4B4B4;
				text-align: right;
				margin-right: -10px;
			}
			textarea{
				width: 100%;
				height: 80px;
				resize: none;
				border-color: #EEEEEE;
				padding: 10px;
				outline-style: none;
			}
			.negative_btn{
				margin-top: 20px;
				text-align: center;
				a{
					width: 48%;
					height: 36px;
					border-radius: 18px;
					line-height: 36px;
					color: #5870FE;
					border: 1px solid #5870FE;
				}
				.send_btn{
					color: #ffffff;
					background-color: #5870FE;
				}
			}
		}
	}
</style>
