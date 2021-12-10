<template>
	<div class="doc_select_hos" data-name="doc_sel_hos">
		<section class="search_hd">
			<search v-model="value" placeholder="请输入医院名称" position="absolute" @on-change="change" auto-scroll-to-top ref="search"></search>
			<section class="tab_hd">
				<div class="tab_title tab_right_border" :class="{tab_title_color:area.chooseCondition == 'area'}" @click="chooseType('area')">
					<span>{{area.city_txt}}</span>
					<p class="iconfont rotata_icon">&#xe6bb;</p>
				</div>
				<div class="tab_title" :class="{tab_title_color:area.chooseCondition == 'hos_condition'}" @click="chooseType('hos_condition')">
					<span>等级</span>
					<p class="iconfont rotata_icon">&#xe6bb;</p>
				</div>
			</section>
		</section>
		<section class="tab_content">
			<Area :area='area' @search='searchHos'></Area>
			<section class="tab_item">
				<transition name="showlist">
					<section class="tab_container tab_hos_con" v-show="area.chooseCondition == 'hos_condition'">
						<div class="total_condition">
							<div class="hos_con_item hos_l">
								<div class="hos_con_hd"><span></span>医院等级</div>
								<div class="hos_con_type">
									<ul class="flex_item">
										<li v-for="(item,index) in hos_level" :key="index" @click="selectedCondition(item,level_arr)" 
										:class="{hos_type_active:item.show}">{{item.text}}</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="tab_btns">
							<button type="button" class="reset_btn" @click="resetData">重置</button>
							<button type="button" class="sub_btn" @click="submitCodition">确定</button>
						</div>
					</section>
				</transition>
			</section>
		</section>
		<transition name="showcover">
			<div class="back_cover" v-show="area.chooseCondition"></div>
		</transition>
		<mu-paper :z-depth="1" class="demo-loadmore-wrap search_list">
			<mu-container ref="container" class="demo-loadmore-content">
				<mu-load-more :loading="loading" :loaded-all="loaded_all" @load="getHosList" >
					<template>
						<div class="hos_item flex_item" 
                        v-for="(item,index) in hos_list" 
                        :key="index"
                        @click="addSelect(item.hospital_yyid,item.hospital_name)">
							<div class="hos_item_l">
								<div class="hos_name">{{item.hospital_name}}</div>
								<div class="hos_sign">
									<span v-show="item.level">{{item.level}}</span>
								</div>
							</div>
						</div>
					</template>
					<p v-show="empty_show" style="text-align: center;line-height: 1.5;margin-bottom: 10px;">暂无数据</p>
				</mu-load-more>
			</mu-container>
		</mu-paper>
	</div>
</template>
<script>
	import { Search } from 'vux'
	import {hospitalList,updateDocInfo} from '../../../api/sendRequest'
	import {totalDepartment} from '../../../api/staticRequest'
	import { getSessionStore,getStore } from '../../../config/util.js'
	import Area from '../../../components/Area.vue'
	import _ from 'lodash';
	import {mapState,mapMutations} from 'vuex'
	export default {
		data(){
			return {
				page: 1,
				empty_show:false,
				loading: false,
				loaded_all:false,
				text: 'List',
				value:'',
				tabTitle:'',
				can_apply:'',
				have_transaction:'',
				hos_detail:false,
				selected_list:false,
				area:{
					pro_name:'',
					city_name:'',
					pro_id:'',
					city_id:'',
					chooseCondition:'',
					city_txt:'全国',
				},
				can_apply:[],
				have_transaction:[],
				level:'',
				level_arr:[],
				choosType:'',
				hos_level:[
					{
						text:'三级',
						show:false,
						id:8
					},
					{
						text:'二级',
						show:false,
						id:4
					},
					{
						text:'一级',
						show:false,
						id:2
					},
					{
						text:'未定级',
						show:false,
						id:1
					}
					
				],
				hos_list:[],
				hos_info:{},
				department_arr:[],
                code_arr:[],
			}
		},
		components:{
			Search,
			Area,
		},
		mounted(){
			this.getHosList();
		},
		computed:{
			...mapState([
				'cart_list',
				'wave_status'
			]),
		},
		methods:{
			async searchHos(){
				this.page = 1;
				this.loaded_all = false;
				this.empty_show = false;
				this.hos_list = [];
				this.getHosList();
			},
			async getHosList(){
				this.loading = true;
				let s_yyid = '';
				let keywords = this.value;
				let level = this.level;
				let pro_id = this.area.pro_id,city_id = this.area.city_id;
				let have_transaction = this.have_transaction;
				let can_apply = this.can_apply;
				let page = this.page;
				let _this = this;
				setTimeout(async () => {
					
					let res = await hospitalList(s_yyid,keywords,level,pro_id,city_id,have_transaction,can_apply,page,'');
					if(res.errcode != 0){
						this.$vux.toast.text(res.errmsg,'top');
						return
					};
					_this.page ++;
					
					if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) >= Number(res.data.page)){
						_this.loading = false;
						_this.hos_list = _this.hos_list.concat(res.data.hospital_list);
						_this.empty_show = false;
						if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) == Number(res.data.page)){
							_this.loading = false;
							_this.loaded_all = true;
						}	
					} else {
						_this.loading = false;
						_this.loaded_all = true;
						_this.hos_list = [];
						_this.empty_show = true;
					}
					
				}, 150);
			},
			chooseType(type){
				if(this.area.chooseCondition !== type){
					this.area.chooseCondition = type;
				} else {
					this.area.chooseCondition = '';
				}
			},
			// 搜索input防抖
			change:_.debounce(function(){
				this.searchHos()
			},1000),
			selectedCondition(item,value){
				item.show = !item.show;
				if(value.indexOf(item.id) == -1){
					value.push(item.id);
				} else {
					value.splice(value.indexOf(item.id),1)
				}
			},
			submitCodition(){
				if(this.level_arr.length != 0){
					this.level = this.level_arr.reduce((prev,cur,index) => {
						return Number(prev) + Number(cur);
					});
				}	else if(this.level_arr.length == 0){
					this.level = '';
				}
				this.searchHos();
				this.area.chooseCondition = '';
			},
			resetData(){
				this.hos_level.map(item => item.show = false);
				this.level_arr = [];
				this.level = '';
			},
			async addSelect(yyid,name){
                this.hos_yyid = yyid;
                let update_data = JSON.parse(getStore('update_data'));
                let res = await updateDocInfo(
                    update_data.user_yyid,
                    update_data.user_token,
                    update_data.member_yyid,
                    update_data.true_name,
                    update_data.gender,
                    update_data.mobile_num,
                    yyid,
                    name,
                    update_data.depart_id,
                    update_data.position,
                    update_data.job_title,
                    update_data.group_yyid,
					update_data.field_id,
				    update_data.clinic_type,
				    update_data.clinic_rota,
					this.$route.query.doctor_id
                );
                if(res.errcode == 0){
                    this.$router.go(-1);
                }
			},
		}
	}
</script>

<style lang="less">
	@import '../../../assets/css/searchHos';
	
	.doc_select_hos{
		padding-bottom:50px;
		.mu-load-more {
			margin-top: 10px;
		}
		.vux-search-box{
			padding: 0;
		}
		.mu-paper{
			background-color: #f5f5f5;
		}
		.tab_content .tab_item .tab_hos_con{
			height:160px;
		}
		.select_status .iconfont{
			font-size: 24PX;
			color: #5870FE;
		}
		.selected_list{
			max-height: 370px;
			overflow: hidden;
			overflow-y: auto;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 50px;
			z-index: 12;
			padding: 0 20px;
			.hos_item{
				margin-bottom: 0;
				padding: 15px 0;
			}
			.iconfont{
				color: #FF982A;
			}
		}
		.hos_info{
			width:285px;
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
					width: 36%;
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
	}
	.hos_cart{
		height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 12;
		box-shadow:0px -2px 4px 0px rgba(208,208,208,0.5);
		a{
			text-align: center;
			font-size: 12PX;
		}
		.hos_num{
			width: 33%;
			line-height: 50px;
			color: #999999;
			.selected_num{
				position: relative;
				span{
					position: absolute;
					top: 14px;
					right: 20px;
					z-index: 3;
					color: #FFFFFF;
					display: inline-block;
					min-width: 20px;
					height: 20px;
					line-height: 21px;
					background-color: #FF982A;
					border-radius: 10px;
				}
				p{
					position: absolute;
					top: 4px;
					right: 10px;
					z-index: 2;
					width: 40px;
					height: 40px;
					opacity: 0;
					border-radius: 50%;
					background: #FF982A;
				}
				p.wave_circle{
					animation: circle-opacity 1s infinite;
				}
			}
			
		}
		@keyframes circle-opacity{
		    from {
		        opacity: 1;
		        transform: scale(0);
		    }
		    to {
		        opacity: 0;
		        transform: scale(1);
		    }
		}
		.hos_sub{
			color: #FFFFFF;
			width: 65%;
			line-height: 50px;
			background-color: #5870FE;
			font-size: 14PX;
		}
	}
	.hos_detail{
		top: 0;
	}
	.show_hos_info{
		position: fixed;
		top: 40px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 20;
		.close{
			color: #FFFFFF;
			text-align: center;
			margin-top: 15px;
			.iconfont{
				font-size:30PX;
			}
		}
	}
</style>
