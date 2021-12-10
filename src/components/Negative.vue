<template>
	<div class="negative">
		<transition name="showcover">
			<div class="back_cover"></div>
		</transition>
		<div class="negative_mod bgcw">
			<h2>{{negtiveCon.title}}</h2>
			<p>{{negtiveCon.con}}</p>
			<div class="negative_btn flex_item">
				<a href="javascript:;" @click="cancelDel">取消</a>
				<a href="javascript:;" @click="delCom">确定</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:['delMod','negtiveCon'],
		data(){
			return {
				
			}
		},
		methods:{
			cancelDel(){
				this.$emit('cancelDel');
			},
			delCom(){
				this.$emit('delData');
			}
		}
	}
</script>

<style lang="less">
	.negative{
		.back_cover{
			top: 0;
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
			p{
				color: #666666;
			}
			.negative_btn{
				margin-top: 40px;
				text-align: center;
				a{
					width: 48%;
					height: 36px;
					border-radius: 18px;
					line-height: 36px;
					color: #5870FE;
					border: 1px solid #5870FE;
				}
			}
		}
	}
	
</style>
