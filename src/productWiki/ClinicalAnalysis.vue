<template>
	<div class="clinical_aly bgc" data-name="page_clinic_literature">
		<DepartSigns :signsList = 'signs_list' @filterData="filterFn"></DepartSigns>
		<div class="in_clinical_aly bgc">
			<ArtList :artList = "liter_list" :loading='loading' :loadedAll = 'loaded_all' @getTotalList = 'getClinicalList()'></ArtList>
		</div>
		<AgentBtn></AgentBtn>
		<div v-show = "show_empty" class="empty_status">
			<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
			<p>暂无符合条件的文章</p>
		</div>
	</div>
</template>

<script>
	import DepartSigns from '../../components/DepartSigns.vue'
	import ArtList from '../../components/ArtList.vue'
	import AgentBtn from '../../components/AgentBtn.vue'
	import { wxShare } from '../../config/share.js'
	import { clinicalList } from '../../api/sendRequest.js'
	import { mapState } from 'vuex'
	export default{
		data(){
			return {
				page:1,
				liter_list:[],
				signs_list:[],
				loading: false,
				loaded_all:false,
				tags:'',
				show_empty:false
			}
		},
		mounted() {
			this.filterFn(this.tags);
			wxShare('护固莱士最新临床解读','护固莱士最新临床解读、专家共识、指南','http://img.youyao99.com/fibrin_1x1.jpg',this.$route.query.product_yyid,14,this.$route.query);
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		components:{
			ArtList,
			DepartSigns,
			AgentBtn
		},
		methods:{
			filterFn(tags){
				this.page = 1;
				this.loaded_all = false;
				this.liter_list = [];
				this.getClinicalList(tags);
			},
			async getClinicalList(tags){
				this.loading = true;
				let yyid = '';
				let page = this.page;
				
				let signs = '';
				if(tags){
					signs = tags;
				} else {
					signs = '';
				}
				if(this.user_info&&this.user_info.yyid){
					yyid = this.user_info.yyid;
				} else{
					yyid = '';
				}
				let _this = this;
				
				setTimeout(async () => {
					let res = await clinicalList(yyid,_this.$route.query.product_yyid,page,10,signs);
					_this.signs_list = res.data.tags;
					_this.show_empty = false;
					_this.page ++;
					if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) >= Number(res.data.page)){
						_this.loading = false;
						_this.liter_list = _this.liter_list.concat(res.data.list);
						if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) == Number(res.data.page)){
							_this.loading = false;
							_this.loaded_all = true;
						}	
					} else {
						_this.loading = false;
						_this.loaded_all = true;
						_this.liter_list = [];
						_this.show_empty = true;
					}
				}, 150);
			}
		}
	}
</script>

<style lang="less">
	.clinical_aly{
		.in_clinical_aly{
			position: absolute;
			top: 44px;
			left: 0;
			right: 0;
			bottom: 60px;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			z-index: 2;
		}
		
		.mu-paper{
			background-color: #f5f5f5;
		}
		.mu-load-more {
			margin-top: 0;
		}
		.depart_signs{
			.com_item{
				.com_item_con{
					min-height: 400px;
					height: 400px;
					ul{
						min-height: 300px;
						height: 300px;
					}
				}
			}
		}
		.liter_list{
			li{
				box-shadow:0px 2px 8px 0px rgba(228,228,228,0.5);
				border-radius:4px;
				background-color: #ffffff;
			}
		}
	}
</style>
