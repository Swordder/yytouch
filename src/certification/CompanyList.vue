<template>
	<div class="company_list" data-name="page_compony_list">
		<mu-paper :z-depth="1" class="demo-loadmore-wrap search_list">
			<mu-container ref="container" class="demo-loadmore-content">
				<mu-load-more :loading="loading" :loaded-all="loaded_all" @load="getCompanyList" >
					<template>
						<ul>
							<li 
							v-for="(item,index) in company_list" 
							:key="item.company_id" 
							@click="selectedCom(item.company_id,item.company_name)"
							:class="{active:com_id == item.company_id}"
							class="bd_bt">{{item.company_name}}</li>
						</ul>
					</template>
				</mu-load-more>
			</mu-container>
		</mu-paper>
		
	</div>
</template>

<script>
	import { companyList } from '../../api/sendRequest.js'
	import { getSessionStore } from '../../config/util.js'
	import { mapState,mapMutations } from 'vuex'
	export default {
		data(){
			return {
				company_list:[],
				page: 1,
				loading: false,
				loaded_all:false,
				com_id :'',
			}
		},
		computed:{
			...mapState([
				'user_info',
			])
		},
		components:{
			
		},
		mounted() {
			this.page = 1;
			this.loaded_all = false;
			this.company_list = [];
			this.getCompanyList();
			this.com_id = getSessionStore('yy_company_id');
		},
		methods:{
			...mapMutations([
				'INIT_COMPANY',
				'SELECTED_COMPANY'
			]),
			selectedCom(id,com_name){
				this.com_id	= id;
				this.SELECTED_COMPANY({
					'company_id':id,
					'company_name':com_name
				});
				this.$router.go(-1);
			},
			async getCompanyList(){
				this.loading = true;
				let page = this.page;
				let _this = this;
				
				setTimeout(async () => {
					let res = await companyList(this.user_info.yyid,this.user_info.user_token,'','list',page,15);
					_this.page ++;
					if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) >= Number(res.data.page)){
						_this.loading = false;
						_this.company_list = _this.company_list.concat(res.data.list);
						// _this.empty_show = false;
						if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) == Number(res.data.page)){
							_this.loading = false;
							_this.loaded_all = true;
						}	
					} else {
						_this.loading = false;
						_this.loaded_all = true;
						_this.company_list = [];
					}
				}, 150);
			}
		}
	}
</script>
<style lang="less">
	.company_list{
		padding: 0 20px;
		.mu-elevation-1{
			box-shadow: none !important;
			.container{
				padding: 0;
			}
		}
		.mu-paper{
			background-color: #ffffff;
		}
		li{
			padding: 12px 0;
		}
		.active{
			color: #5870FE;
			border-color: #5870FE;
		}
	}
</style>
