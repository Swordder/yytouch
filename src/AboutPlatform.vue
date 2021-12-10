<template>

	<div class="about_platfotm" data-name="page_about_yy">
		<NavBar></NavBar>
		<section class="about_platfotm_in bgc">
			<section class="summary bgcw">
				<h1>{{$t('about_us')}}</h1>
				<p>优药致力于中国新特药品与医疗器械的市场和学术服务。链接药企的优质产品，学术代表和专科诊疗医生，让医生用好的产品，给患者好的治疗！你可以立即查看药品，申请加入，或者留言咨询！</p>
			</section>
			<section class="summary bgcw contact">
				<h1>{{$t('contact_us')}}</h1>
				<ul>
					<li class="bd_bt">
						<i class="iconfont">&#xe675;</i>
						021-32035318
					</li>
					<li class="bd_bt">
						<i class="iconfont">&#xe7b0;</i>
						info@nuancebiotech.cn
					</li>
					<li>
						<i class="iconfont">&#xe79e;</i>
						上海市静安区南京西路1376号上海商城东峰办公楼639室
					</li>
				</ul>
			</section>
		</section>
	</div>
</template>

<script>
	import NavBar from '../components/NavBar.vue'
	export default {
		data(){
			return {

			}
		},
		mounted() {
		},
		components:{
			NavBar
		}
	}
</script>

<style lang="less" scoped="scoped">
	.about_platfotm_in{
		position: absolute;
		top: 36px;
		left: 0;
		right: 0;
		bottom: 0px;
		z-index: 1;
		.summary{
			padding: 20px 30px;
			margin-bottom: 10px;
			h1{
				font-size: 16PX;
				font-weight: bold;
				text-align: center;
				position: relative;
				&::before{
					content: '';
					display: block;
					height: 3px;
					width: 20px;
					border-radius: 3px;
					position: absolute;
					bottom: -8px;
					left: 50%;
					margin-left: -10px;
					text-align: center;
					background-color: #5870FE;
				}
			}
			p{
				line-height: 22px;
				margin-top: 20px;
				color: #666666;
			}
		}
		.contact{
			padding: 20px 15px 0;
			li{
				color: #666666;
				padding: 10px 0;
			}
			.iconfont{
				color: #5870FE;
				font-size: 16PX;
				margin-right: 5px;
			}
		}
	}
</style>
