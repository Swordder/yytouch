<template>
	<div class="data_show_list">
		<div class="data_show_item" v-for="(item, key, index) in zerosale" :key="index">
			<div class="service_info flex_item">
				<div class="rank_num" :class="Number(index)+1 <=3 ?'red':''">{{Number(index)+1}}</div>
				<div class="fs_hos_info">
					<p class="hos_name">{{item.true_name}}</p>
				</div>
			</div>
			<div class="agent_data flex_item">
				<div class="service_name">服务医院 <span>{{item.hospital_nums}}个</span></div>
				<div class="target_num">{{date}}月指标(套) <span>{{item.target}}</span></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:['date', 'zerosale'],
		data(){
			return {
				data_show:{}
			}
		},
		watch:{
			zerosale(val){
				this.data_show =  val;
			}
		},
	}
</script>

<style lang="less">
	.data_show_item{
		.service_info{
			justify-content: flex-start;
			.rank_num{
				min-width: 24px;
				height: 24px;
				color: #5870FE;
				text-align: center;
				line-height: 24PX;
				background-color: #EDF0FB;
				border-radius: 50%;
				margin-right: 6px;
			}
			.red{
				color: #ffffff;
				background-color: #FF6675;
			}
			.fs_hos_info{
				.hos_name{
					font-weight: bold;
					font-size: 16px;
				}
				.service_name{
					font-size: 12PX;
					color: #999999;
					margin-top: 8px;
					span{
						color: #333333;
						margin-left: 8px;
					}
				}
			}
		}
		.agent_data{
			font-size: 12PX;
			margin: 8px 0 0 30px;
			.service_name{
				color: #999999;
			}
			.target_num{
				color: #999999;
			}
			span{
				font-weight: bold;
				margin-left: 6px;
				color: #333333;
			}
		}
	}
</style>
