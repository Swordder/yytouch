<template>
	<div class="limit_author" data-name="limit_author_page">
		<div class="wrap">
			<img src="http://img.youyao99.com/95AD7432E8C225A9C3FF80C69EB329DE.png" alt="">
			<p>暂无查看权限</p>
			<p>请联系管理员授权</p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		mounted() {
		}
	}
</script>

<style lang="less">
	.limit_author{
		color: #666666;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0px;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		.wrap{
			width: 120px;
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%,-50%);
			img{
				width: 100%;
				margin-bottom: 10px;
			}
		}
	}
</style>
