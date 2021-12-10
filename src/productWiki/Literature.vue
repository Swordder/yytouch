<template>
	<div class="literature bgc" data-name="page_literature">
		<DepartSigns :signsList = 'signs_list' @filterData="filterFn"></DepartSigns>
		<div class="in_literature bgc">
			<ArtList 
			:artList = "liter_list" 
			:loading='loading' 
			:loadedAll = 'loaded_all' 
			@getTotalList = 'getLiterList()'></ArtList>
		</div>
		<div v-show = "show_empty" class="empty_status">
			<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
			<p>暂无符合条件的文献</p>
		</div>
		<AgentBtn></AgentBtn>
	</div>
</template>
<script>
	import DepartSigns from '../../components/DepartSigns.vue'
	import ArtList from '../../components/ArtList.vue'
	import AgentBtn from '../../components/AgentBtn.vue'
	import { wxShare } from '../../config/share.js'
	import { literatureList } from '../../api/sendRequest.js'
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
			wxShare('护固莱士相关文献','护固莱士相关文献','http://img.youyao99.com/fibrin_1x1.jpg',this.$route.query.product_yyid,15,this.$route.query);
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
				this.getLiterList(tags);
			},
			async getLiterList(tags){
				
				this.loading = true;
				let yyid = '';
				let page = this.page;
				
				let signs = '';
				if(tags){
					signs = tags;
				} else {
					signs = '';
				}
				let _this = this;
				if(this.user_info&&this.user_info.yyid){
					yyid = this.user_info.yyid;
				} else{
					yyid = '';
				}
				setTimeout(async () => {
					
					let res = await literatureList(yyid,_this.$route.query.product_yyid,page,10,signs);
					_this.signs_list = res.data.tags;
					
					_this.page ++;
					if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) >= Number(res.data.page)){
						_this.show_empty = false;
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
		},
	}
</script>

<style lang="less">
	.literature{
		.in_literature{
			position: absolute;
			top: 44px;
			left: 0;
			right: 0;
			bottom: 60px;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			z-index: 2;
		}
		.mu-load-more {
			margin-top: 0;
		}
		.mu-paper{
			background-color: #f5f5f5;
		}
		.liter_list{
			ul{
				li{
					box-shadow:0px 2px 8px 0px rgba(228,228,228,0.5);
					border-radius:4px;
					background-color: #ffffff;
					a{
						display: block;
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
			z-index: 11;
			img{
				width: 100px;
				margin-bottom: 6px;
			}
		}
	}
</style>
