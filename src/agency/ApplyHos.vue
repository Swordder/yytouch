<template>
	<div class="apply_pag bgc" data-name="page_apply_hos">
		<section class="search_hd">
			<search v-model="value" placeholder="请输入医院名称" position="absolute" @on-change="searchHos" auto-scroll-to-top ref="search"></search>
			<section class="tab_hd">
				<div class="tab_title tab_right_border" :class="{tab_title_color:area.chooseCondition == 'area'}" @click="chooseType('area')">
					<span>{{area.city_txt}}</span>
					<p class="iconfont rotata_icon">&#xe6bb;</p>
				</div>
				<div class="tab_title" :class="{tab_title_color:area.chooseCondition == 'hos_condition'}" @click="chooseType('hos_condition')">
					<span>筛选</span>
					<p class="iconfont rotata_icon">&#xe6bb;</p>
				</div>
			</section>
		</section>
		<section class="tab_content">
			<Area :area='area' @search = 'searchHos'></Area>
			<section class="tab_item">
				<transition name="showlist">
					<section class="tab_container tab_hos_con" v-show="area.chooseCondition == 'hos_condition'">
						<div class="total_condition">
							<div class="hos_con_item hos_l bd_bt">
								<div class="hos_con_hd"><span></span>{{$t('grade_hos')}}</div>
								<div class="hos_con_type">
									<ul class="flex_item">
										<li v-for="(item,index) in hos_level" :key="index" @click="selectedCondition(item,level_arr)"
										:class="{hos_type_active:item.show}">{{item.text}}</li>
									</ul>
								</div>
							</div>
							<div class="hos_con_item bd_bt">
								<div class="hos_con_hd"><span></span>{{$t('l_status')}}</div>
								<div class="hos_con_type">
									<ul class="flex_item">
										<li v-for="(item,index) in medicineStatus" :key="index" @click="selectedCondition(item,have_transaction)"
										:class="{hos_type_active:item.show}">
										{{item.text}}</li>
									</ul>
								</div>
							</div>
							<div class="hos_con_item">
								<div class="hos_con_hd"><span></span>{{$t('others')}}</div>
								<div class="hos_con_type">
									<ul class="flex_item">
										<li v-for="(item,index) in other" :key="index" @click="selectedCondition(item,can_apply)"
										:class="{hos_type_active:item.show}">
										{{item.text}}</li>
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
						<div class="hos_item" v-for="(item,index) in hos_list">
							<template v-if="item.status == 0">
								<template  v-if="item.hospital_series_company != ''">
									<template v-if="item.hospital_series_company.indexOf(user_info.company_yyid) != -1">
										<router-link class="hos_item_a flex_item" :to="{path:'/hospitalDetail',query:{'add_service_hos':$route.query.add_service_hos,'series_yyid':$route.query.series_yyid,'hospital_yyid':item.hospital_yyid,product_yyid:$route.query.product_yyid}}">
											<div class="hos_item_l">
												<div class="hos_name">{{item.hospital_name}}</div>
												<div class="hos_sign flex_item">
													<span v-show="item.level">{{item.level}}</span>
													<div v-show="item.status != 1">
														<span v-if="item.have_transaction_status == 0" class="yellow">未进药</span>
														<span v-else>已进药</span>
													</div>
												</div>
											</div>
											<button type="button" class="btn">{{$t('apply')}}</button>
										</router-link>
									</template>
									<template v-else>
										<a href="javascript:;" class="hos_item_a flex_item" @click="tipShow('unopen')">
											<div class="hos_item_l">
												<div class="hos_name">{{item.hospital_name}}</div>
												<div class="hos_sign flex_item">
													<span v-show="item.level">{{item.level}}</span>
												</div>
											</div>
											<a href="javascript:;" class="unopen">未开放</a>
										</a>
									</template>
								</template>
								<template v-else>
									<router-link class="hos_item_a flex_item" :to="{path:'/hospitalDetail',query:{'add_service_hos':$route.query.add_service_hos,'series_yyid':$route.query.series_yyid,'hospital_yyid':item.hospital_yyid,product_yyid:$route.query.product_yyid}}">
										<div class="hos_item_l">
											<div class="hos_name">{{item.hospital_name}}</div>
											<div class="hos_sign flex_item">
												<span v-show="item.level">{{item.level}}</span>
												<div v-show="item.status != 1">
													<span v-if="item.have_transaction_status == 0" class="yellow">未进药</span>
													<span v-else>已进药</span>
												</div>
											</div>
										</div>
										<button type="button" class="btn">{{$t('apply')}}</button>
									</router-link>
								</template>
							</template>
							<template v-else-if="item.status == 1">
								<a href="javascript:;" class="hos_item_a flex_item" @click="tipShow('otherService')">
									<div class="hos_item_l">
										<div class="hos_name">{{item.hospital_name}}</div>
										<div class="hos_sign flex_item">
											<span v-show="item.level">{{item.level}}</span>
											<div v-show="item.status != 1">
												<span v-if="item.have_transaction_status == 0" class="yellow">未进药</span>
												<span v-else>已进药</span>
											</div>
										</div>
									</div>
									<a href="javascript:;" class="gray">{{$t('occupied')}}</a>
								</a>
							</template>
							<template v-else-if="item.status == 2">
								<a href="javascript:;" class="hos_item_a flex_item" @click="tipShow('selfService')">
									<div class="hos_item_l">
										<div class="hos_name">{{item.hospital_name}}</div>
										<div class="hos_sign flex_item">
											<span v-show="item.level">{{item.level}}</span>
											<div v-show="item.status != 1">
												<span v-if="item.have_transaction_status == 0" class="yellow">未进药</span>
												<span v-else>已进药</span>
											</div>
										</div>
									</div>
									<a href="javascript:;" class="green">{{$t('in_service')}}</a>
								</a>
							</template>
						</div>
					</template>
					<p v-show="empty_show" style="text-align: center;line-height: 1.5;margin-bottom: 10px;">暂无数据</p>
				</mu-load-more>
			</mu-container>
		</mu-paper>

		<div class="tip_show" v-show="tip_status"></div>
		<transition>
			<div class="tip_item bgcw" v-show="tip_status">
				<div class="tip_con" v-if="tip_status == 'unopen'">
					您暂时无法申请该医院，如有疑问请在微信中留言
				</div>
				<div class="tip_con" v-else-if="tip_status == 'otherService'">
					该医院已有其它代表正在服务该产品，您暂时无法重复申请，如有疑问请在微信中留留⾔言
				</div>
				<div class="tip_con" v-else-if="tip_status == 'selfService'">
					您当前正在该医院服务该产品请勿重复申请
				</div>
				<button type="button" class="btn_common" @click="closeTip()">确定</button>
			</div>
		</transition>
	</div>
</template>
<script>
	import { Search } from 'vux'
	import {hospitalList} from '../../api/sendRequest'
	import Area from '../../components/Area.vue'
	import { mapState ,mapMutations,mapActions} from 'vuex'
	export default {
		data(){
			return {
				page: 1,
				empty_show:false,
				loading: false,
				loaded_all:false,
				tip_status : '',
				text: 'List',
				value:'',
				tabTitle:'',
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
				medicineStatus:[
					{
						text:'未进药',
						show:false,
						id:1
					},
					{
						text:'已进药',
						show:false,
						id:-1
					}
				],
				other:[
					{
						text:'可申请',
						show:false,
						id:1
					},
				],
				hos_list:[]
			}
		},
		components:{
			Search,
			Area
		},
		mounted(){
			this.checkUserInfo();
			if(this.user_info&&this.user_info.yyid){
				this.getHosList();
			}

		},
		computed: {
		    ...mapState([
		        'user_info',
		    ]),
		},
		methods:{
			...mapActions([
				'checkUserInfo'
			]),
			async searchHos(){
				this.page = 1;
				this.loaded_all = false;
				this.empty_show = false;
				this.hos_list = [];
				this.getHosList();
			},
			async getHosList(){
				this.loading = true;
				let s_yyid = this.$route.query.series_yyid;
				let keywords = this.value;
				let level = this.level;
				let pro_id = this.area.pro_id,city_id = this.area.city_id;
				let have_transaction = this.have_transaction;
				let can_apply = this.can_apply;
				let page = this.page;
				let _this = this;
				setTimeout(async () => {

					let res = await hospitalList(s_yyid,keywords,level,pro_id,city_id,have_transaction,can_apply,page,this.user_info.yyid);
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
				} else if(this.level_arr.length == 0){
					this.level = '';
				}
				this.searchHos();
				this.area.chooseCondition = '';
			},
			resetData(){
				this.hos_level.map(item => item.show = false);
				this.medicineStatus.map(item => item.show = false);
				this.other.map(item => item.show = false);
				this.level_arr = [];
				this.have_transaction = [];
				this.can_apply = [];
				this.level = '';
			},
			tipShow(status){
				this.tip_status = status;
			},
			closeTip(){
				this.tip_status = '';
			}
		}
	}
</script>
<style lang="less">
	@import '../../assets/css/searchHos';
	.apply_pag{
		.mu-load-more {
			margin-top: 10px;
		}
		.vux-search-box{
			padding: 0;
		}
		.mu-paper{
			background-color: #f5f5f5;
		}
		.tip_show{
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			z-index: 15;
			background-color: rgba(0, 0, 0, 0.6);
		}
		.tip_item{
			position: fixed;
			top: 46%;
			left: 50%;
			transform: translate(-50%,-50%);
			text-align: center;
			border-radius: 8px;
			z-index: 20;
			width: 285px;
			padding: 30px 27px 20px;
			line-height: 24px;
			.btn_common{
				width: 160px;
				height: 36px;
				margin-top: 26px;
			}
		}

		.search_list{
			.hos_item{
				.hos_item_a{
					display: flex;
					align-items: center;
					.unopen{
						color: #FF982A;
						background-color: #FFFFFF;
					}
				}
				.btn{
					height: 26PX;
					line-height: 26PX;
					padding: 0 12px;
					background-color: #5870FE;
					color: #FFFFFF;
					border-radius: 15px;
					border:0;
					font-size: 12PX;
				}
				.gray_btn{
					background-color: #DDDDDD;
					color: #333333;
				}
				.gray{
					color: #999999;
					font-size: 12PX;
				}
				.green{
					color: #4ED79C;
					font-size: 12PX;
				}
				.hos_sign{
					justify-content: flex-start;
					span{
						margin-right: 6px;
					}
				}
			}
		}

	}
</style>
