<template>
	<div class="my_favorites bgc" data-name="page_fav_list">
		<NavBar></NavBar>
		<div class="in_my_favorites bgc">
			<div class="fav_list">
				<div class="fav_item bgcw" v-for="(item,index) in fav_list" :key="index">
					<router-link :to="{path:'/favoriteList',query:{fav_yyid:item.yyid}}" class="flex_item">
						<div class="fav_l">
							<h5>{{item.name}}</h5>
							<p>{{item.resource_count}}个内容</p>
						</div>
						<div class="icon">
							<i class="iconfont">&#xe661;</i>
						</div>
					</router-link>
				</div>
			</div>
			<div v-show="fav_list.length==0" class="empty_status">
				<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
				<p>暂无收藏夹</p>
			</div>
		</div>
		<div class="agent_btn">
			<router-link to="/createNewFav">新建收藏夹</router-link>
		</div>
		
	</div>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	import { favList } from '../../api/sendRequest.js'
	import { mapState,mapActions } from 'vuex'
	export default{
		data(){
			return{
				fav_list:[],
			}
		},
		components:{
			NavBar
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		mounted() {
			this.checkUserInfo();
			this.getFavList();
		},
		methods:{
			...mapActions([
				'checkUserInfo'
			]),
			async getFavList(){
				// this.$vux.loading.show({text: 'Loading'})
				let res = await favList(this.user_info.yyid,this.user_info.user_token,this.$route.query.resource_yyid);
				if(res.errcode == 0){
					// this.$vux.loading.hide();
					this.fav_list = res.data.fav_list;
				}
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	.my_favorites{
		.in_my_favorites{
			position: absolute;
			top: 36px;
			left: 0;
			right: 0;
			bottom: 64px;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			padding: 0 15px;
		}
		.fav_item{
			margin-top: 10px;
			box-shadow:0px 2px 8px 0px rgba(228,228,228,0.5);
			border-radius:4px;
			a{
				padding: 14px 10px 14px 15px;
				align-items: center;
				.fav_l{
					width: 90%;
					h5{
						font-weight: normal;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					p{
						color: #999999;
						margin-top: 2px;
					}
				}
				
			}
		}
		.empty_status{
			text-align: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform:  translate(-50%,-50%);
			color:#666666;
			img{
				width: 100px;
				margin-bottom: 6px;
			}
		}
		.agent_btn{
			background-color: #F5F5F5;
			a{
				box-shadow:0px 6px 12px 0px rgba(99,124,199,0.3);
			}
		}
	}
</style>
