<template>
	<section class="hos_info bgcw">
		<div class="title">
			<h1>{{hos_info.hospital_name}}</h1>
			<div class="sign">
				<span v-show="hos_info.level != ''">{{hos_info.level}}</span>
				<span v-if="hos_info.have_transaction_status == 0" class="yellow">待开发</span>
				<span v-else>已进药</span>
			</div>
		</div>
		<div class="base_info">
			<div class="info_item flex_item">
				<label class="info_label"><i class="iconfont">&#xe6fa;</i>主管院长</label>
				<span class="info_value" v-if="hos_info.hos_dean != ''">{{hos_info.hos_dean}}</span>
				<span class="info_value" v-else>暂无数据</span>
			</div>
			<div class="info_item flex_item">
				<label class="info_label"><i class="iconfont">&#xe6fa;</i>特色专科</label>
				<ul class="info_depart flex_item" v-if="code_arr != ''">
					<li v-for="(item,index) in code_arr">{{item}}</li>
				</ul>
				<span v-else class="info_value">暂无数据</span>
			</div>
			<div class="info_item flex_item">
				<label class="info_label"><i class="iconfont">&#xe6fa;</i>床位总数</label>
				<span class="info_value" v-if="hos_info.bed_num == null || hos_info.bed_num == ''">暂无数据</span>
				<span class="info_value" v-else>{{hos_info.bed_num}}</span>
			</div>
		</div>
		<div class="address">
			<i class="iconfont">&#xe68f;</i>
			<span>{{hos_info.address}}</span>
		</div>
	</section>
</template>

<script>
	import axios from "axios"
	import {totalDepartment} from '../api/staticRequest'
	import {hospitalDetail} from '../api/sendRequest'
	export default {
		props:['paramsInfo'],
		data(){
			return{
				hos_info:{},
				department_arr:[],
				code_arr:[]
			}
		},
		mounted(){
			this.getHosDetail();
		},
		methods:{
			async getHosDetail(){
				let res = await hospitalDetail(this.$route.query.series_yyid,this.paramsInfo.hospital_yyid);
				this.hos_info = res.data;
				if(res.data.p_department != ''&&res.data.p_department != null){
					this.department_arr = res.data.p_department.split(',');
				}
				totalDepartment.then(result => {
					this.department_arr.forEach(val => {
						this.code_arr.push(result[val][0]);
					})
				})
			},
		}
	}
</script>

<style lang="less">
	.hos_info{
		width:345px;
		height:auto;
		margin: 0 auto;
		padding: 20px 26px;
		box-sizing: border-box;
		box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
		border-radius:8px;
		h1{
			font-size: 18PX;
		}
		.sign{
			span{
				display: inline-block;
				padding: 3px 10px;
				border-radius: 15px;
				margin-top: 6px;
				background-color: #E9ECFF;
				color: #5870FE;
			}
		}
	}
	.base_info{
		margin-top: 22px;
		padding: 6px 0;
		border-top: 1PX solid #F5F5F5;
		border-bottom: 1PX solid #F5F5F5;
		.info_item{
			margin: 14px 0;
			.info_label{
				width: 32%;
				margin-right: 8px;
				color: #333333;
				font-size: 14PX;
				.iconfont{
					font-size: 14PX;
					transform: scale(.8);
					color: #0BC7A7;
					margin-right: 8px;
				}
			}
			.info_value{
				flex: 1;
				overflow: hidden;
				word-wrap: break-word;
				word-break: break-all;
				color: #666666;
				font-size: 14PX;
			}
			.info_depart{
				flex: 1;
				flex-wrap: wrap;
				justify-content: flex-start;
				li{
					padding: 0 10px;
					margin:0 8px 10px 0;
					background-color: #F0FFFC;
					border-radius: 15px;
					border:1px solid rgba(184,232,224,1);
				}
			}
		}
	}
	.address{
		padding-top: 15px;
		.iconfont{
			font-size: 14PX;
			color: #5870FE;
			margin-right: 3px;
		}
	}
</style>
