<template>
	<div class="data_show_list">
		<div class="data_show_item" v-for="(item,index) in warningdata" :key="index">
			<div class="service_info flex_item">
				<div class="rank_num" :class="Number(index)+1 <=3 ?'red':''">{{Number(index)+1}}</div>
				<div class="fs_hos_info">
					<p class="hos_name">{{item.hospital_name}}</p>
					<div class="service_name">服务代表 <span>{{item.true_name}}</span></div>
				</div>
			</div>
			<div class="service_data flex_item">
				<div class="service_data_item">
					<p :class="Number(index)+1 <=3 ?'red_num':''">{{item.order_num}}</p>
					<p class="font_10">{{date}}月实际(套)</p>
				</div>
				<div class="service_data_item">
					<p>{{item.target}}</p>
					<p class="font_10">{{date}}月指标(套)</p>
				</div>
				<div class="service_data_item">
					<p :class="Number(index)+1 <=3 ?'red_num':''">{{item.pre}}<span class="font_10">%</span></p>
					<p class="font_10">{{date}}月达成</p>
				</div>
			</div>
		</div>
	</div> 
</template>

<script>
	export default{
		props:['date','warningdata'],
		data(){
			return {
				data_show:{}
			}
		},
		watch:{
			warningdata(val){
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
	}
</style>
