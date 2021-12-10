<template>
	<div class="history_integral_page" data-name="page_history_intergral">
		<h1>历史积分</h1>
		<div class="point_wrap">
			<div class="history_point_list" v-for="(item,index) in history_data" :key="index">
				<p class="year font_10">{{item.year}}年</p>
				<ul class="month_point_list" v-for="(item2,index2) in item.data" :key="index2">
					<li class="flex_item">
						<div class="month font_10">{{item2.month.split('-')[1]}}月</div>
						<div class="month_point flex_item">
							<div class="month_process" :style="{width:((Number(item2.point)*0.8)/Number(max)*100+'%')}"></div>
							<p>{{item2.point}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div v-show="show_empty == true" class="empty_status">
			<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
			<p>暂无历史积分</p>
		</div>
	</div>
</template>

<script>
	import {getHistoryPoint} from '../../api/sendRequest.js'
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
				show_empty:false,
				history_data:{},
				max:''
			}
		},
		mounted(){
			this.getHistoryPoint();
		},
		computed: {
			...mapState([
				'user_info'
			]),
		},
		methods:{
			async getHistoryPoint(){
				// this.$vux.loading.show({text: 'Loading'})
				let res = await getHistoryPoint(this.user_info.yyid,this.user_info.user_token);
				if(res.errcode != 0){
					this.$vux.toast.text(res.errmsg);
					return
				} else if(res.errcode == 0) {
					
					this.history_data = res.data;
					// this.$vux.loading.hide();
					let point_arr = [];
					for(let item in this.history_data){
						for(let item1 in this.history_data[item]){
							for(let item2 in this.history_data[item].data){
								point_arr.push(this.history_data[item].data[item2].point)
							}
						}
					}
					this.max = Math.max.apply(null,point_arr);
				}
				if(res.data == ''){
					this.show_empty = true;
					return;
				}
				
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.history_integral_page{
		padding: 15px 10px 0;
		h1{
			font-size: 12PX;
			font-weight: normal;
			text-align: center;
		}
		.history_point_list{
			margin-top: 26px;
			position: relative;
			.year{
				position: absolute;
				top: -26px;
				left: 0px;
				padding: 2px 8px;
				background-color: #F2F3FF;
				color: #5870FE;
				border-radius: 14px;
			}
			.month_point_list{
				padding-left: 27px;
				li{
					padding: 0px 0;
					justify-content: flex-start;
					align-items: center;
				}
				.month{
					width: 34px;
					margin-right: 4px;
					color: #666666;
				}
				.month_point{
					width: 75%;
					padding: 10px 0 10px 10px;
					box-sizing: border-box;
					position: relative;
					justify-content: flex-start;
					::after{
						content: '';
						width:1px;
						height: 100%;
						background-color: #EEEEEE;
						position: absolute;
						top: 0;
						left: 0;
					}
					.month_process{
						height: 20px;
						border-radius: 4px 10px 10px 4px;
						background:linear-gradient(left #B8C2FF, #5870FE);
						background: -webkit-linear-gradient(left, #B8C2FF, #5870FE);
						box-shadow:-1px 2px 5px 0px rgba(21,44,172,0.3);
						margin-right: 10px;
					}
					p{
						color: #5870FE;
						font-weight: bold;
					}
				}
			}
		}
		.empty_status{
			text-align: center;
			position: absolute;
			top: 40%;
			left: 50%;
			transform:  translate(-50%,-50%);
			color:#666666;
			img{
				width: 100px;
				margin-bottom: 6px;
			}
		}
	}
</style>
