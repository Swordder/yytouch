<template>
	<div class="user_info_show" data-name="page_user_certify_info">
		<div class="info_item">
			<div class="flex_item bd_bt">
				<p><i class="iconfont">&#xe603;</i>真实姓名</p>
				<p class="name">{{name}}</p>
			</div>
		</div>
		<div class="info_item bd_bt">
			<div class="flex_item">
				<p> 可服务的医院</p>
				<p class="gray">已选{{falimiar_hospital_list.length}}</p>
			</div>
			<ul v-show="falimiar_hospital_list.length !== 0" class="user_hos_list user_list_item bd_bt">
				<li v-for="item in falimiar_hospital_list" :key="item.hos_id">
					<i class="iconfont">&#xe6fa;</i>
					&nbsp;{{item.hos_name}}
				</li>
			</ul>
		</div>
		<div class="info_item">
			<div class="flex_item bd_bt">
				<p><i class="iconfont">&#xe603;</i>可服务的城市</p>
				<p class="name">{{service_region_name}}</p>
			</div>
		</div>
		<div class="info_item">
			<div class="flex_item bd_bt">
				<p><i class="iconfont">&#xe603;</i>公司</p>
				<p class="name">{{company_name}}</p>
			</div>
		</div>
		<div class="info_item bd_bt">
			<div class="flex_item">
				<p> 近期服务过的公司</p>
				<p class="gray">已选{{familiar_company.length}}</p>
			</div>
			<ul v-show="familiar_company.length !== 0" class="user_list_item company_item bd_bt">
				<li v-for="(item,index) in familiar_company_arr" :key="index">
					<div class="company_item_in flex_item">
						<p class="item_title">公司名称：</p>
						<p>{{item.company_name}}</p>
					</div>
					<div class="company_item_in flex_item">
						<p class="item_title">治疗领域：</p>
						<p>{{item.territory}}</p>
					</div>
					<div class="company_item_in flex_item">
						<p class="item_title">适应症：</p>
						<p>{{item.indications}}</p>
					</div>
					<div class="company_item_in flex_item">
						<p class="item_title">产品名称:</p>
						<p>{{item.drug_name}}</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="info_item">
			<div class="flex_item">
				<p><i class="iconfont">&#xe603;</i>熟悉的科室</p>
				<p class="gray">已选{{familiar_offices_arr.length}}</p>
			</div>
			<ul class="user_list_item bd_bt">
				<li v-for="(item,index) in familiar_offices_arr" :key="index">
					<i class="iconfont">&#xe6fa;</i>
					&nbsp;{{item}}
				</li>
			</ul>
		</div>
		<div class="info_item">
			<div class="flex_item">
				<p>您擅长的服务方向</p>
				<p class="gray">已选{{serve_direction_arr.length}}</p>
			</div>
			<ul v-show="serve_direction != ''" class="menu_ment flex_item">
				<li v-for="(item,index) in serve_direction_arr" :key = "index">{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {getAgentInfo} from '../../api/sendRequest.js';
	import { adaptations, depList } from '../../api/staticRequest';
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
				name:'',
				falimiar_hospital_list:[],
				familiar_company:[],
				familiar_company_arr:[],
				familiar_offices:[],
				familiar_offices_arr:[],
				serve_direction:'',
				serve_direction_arr:[],
				company_name:'',
				service_region_name:'',
				total_deps:[],
				total_territory:[],
				total_indications:[],
			}
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		mounted(){
			this.getInfo();
		},
		methods:{
			async getInfo(){
				let res = await getAgentInfo(this.user_info.yyid,this.user_info.user_token);
				if(res.errcode == 0){
					this.name = res.data.truename;
					this.falimiar_hospital_list = res.data.falimiar_hospital_list;
					this.familiar_company = res.data.familiar_company;
					this.company_name = res.data.company_name;
					this.service_region_name = res.data.service_region_name;
					if(res.data.falimiar_hospital_list != null && res.data.falimiar_hospital_list != ''){
						this.familiar_offices = res.data.familiar_offices.split(',');
					}
					if(res.data.serve_direction != null && res.data.serve_direction != ''){
						this.serve_direction = res.data.serve_direction;
					};
					// 处理曾经服务过的医院的治疗领域和适应症
					adaptations.then(res => {
						let per_indication = [];
						let per_territory = [];
						let per_indication_id = [];
						let per_territory_id = [];
						res.adaptationList.map((item,index) => {
							this.total_indications.push(...item.children);
							this.total_territory.push({
								id:item.id,
								value:item.value
							})
						});
						this.familiar_company.map((item,index) => {
							per_indication_id = item.indications.split(',');
							per_territory_id = item.territory.split(',');
							this.total_territory.map((item2,index2) => {
								if(per_territory_id.indexOf(item2.id.toString()) != -1){
									per_territory.push(item2.value)
								}
							})
							this.total_indications.map((item3,index3) => {
								if(per_indication_id.indexOf(item3.id.toString()) != -1){
									per_indication.push(item3.value)
								}
							})
							this.familiar_company_arr.push({
								'company_name':item.company_name,
								'territory':per_territory.toString(),
								'indications':per_indication.toString(),
								'drug_name':item.drug_name
							})
						})
					})
					// 处理科室
					depList.then(res => {
						res.depList.map((item,index) => {
							if(this.familiar_offices.indexOf(item.id.toString()) != -1){
								this.familiar_offices_arr.push(item.depName);
							}
						})
					});
					// 处理服务方向
					if(this.serve_direction != ''){
						this.serve_direction.split(',').forEach(val => {
							if(val == 1){
								this.serve_direction_arr.push('医院列名服务');
							} else if(val == 2){
								this.serve_direction_arr.push('学术营销服务');
							}
						})
					}
					
				}
			}
		}
	}
</script>

<style lang="less">
	.user_info_show{
		.info_item{
			padding: 0 15px;
			position: relative;
			.flex_item{
				line-height: 44px;
				.gray{
					color: #BBBBBB;
				}
				.iconfont{
					color: #FF5252;
					position: absolute;
					top: -4px;
					left: 1px;
				}
				.name{
					color: #666666;
				}
			}
			.user_list_item{
				color: #666666;
				margin-top: 5px;
				padding-bottom: 5px;
				li{
					position: relative;
					padding-left: 17px;
					margin-bottom: 12px;
					.iconfont{
						font-size: 14PX;
						position: absolute;
						left: 0;
						color: #0BC7A7;
					}
				}
			}
			.company_item{
				li{
					padding: 10px;
					border: 1px solid #B8E8E0;
					border-radius: 4px;
					p{
						line-height: 26px;
					}
					.item_title{
						width: 80px;
						font-weight: bold;
					}
					p:nth-of-type(2){
						flex:1;
					}
					.flex_item{
						justify-content: flex-start;;
					}
				}
			}
			.menu_ment{
				justify-content: flex-start;
				margin: 2px 0;
				li{
					line-height: 22px;
					padding: 0 10px;
					margin-right: 10px;
					font-size: 12PX;
					color: #666666;
					border: 1px solid #B8E8E0;
					border-radius: 14px;
					background-color: #F0FFFC;
					margin-bottom: 15px;
				}
			}
		}
		
	}

</style>
