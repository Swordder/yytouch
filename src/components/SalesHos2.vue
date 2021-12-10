<template>
	<div class="data_show_list">
		<div class="data_show_item" v-for="(item,index) in data_show" :key="index">
			<div class="service_info flex_item">
				<div class="rank_num" :class="Number(index)+1 <=3 ?'red':''">{{Number(index)+1}}</div>
				<div class="fs_hos_info">
					<p class="hos_name">{{item.hospital_name}}</p>
				</div>
			</div>
			<div class="agent_data flex_item">
				<div class="service_name">服务代表 <span>{{item.true_name}}</span></div>
				<div class="target_num">{{date}}月指标(套) <span>{{item.target}}</span></div>
			</div>
		</div>
	</div>
</template>

<script>
	// import { mapState ,mapActions} from 'vuex'
	export default {
		props:['date','areadata'],
		data(){
			return {
				data_show:{}
			}
		},
		watch:{
			areadata(val){
				this.data_show =  val;
			}
		},
		computed:{
			// ...mapState([
			// 	'init_fs_data'
			// ]),
		},
		mounted() {
			// console.log(this.data_show)
			
			// this.initFsData();
		},
		methods:{
			// ...mapActions([
			// 	'initFsData'
			// ]),
			
		}
	}
</script>

<style lang="less">
	.data_show_item{
		.service_info{
			justify-content: flex-start;
			.rank_num{
				width: 24px;
				height: 24px;
				color: #5870FE;
				text-align: center;
				line-height: 24px;
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
