<template>
	<div class="select_fav" data-name="page_select_fav">
		<div class="com_hd bd_bt flex_item">
			<h4>选择收藏夹</h4>
			<p>共{{fav_list.length}}个</p>
		</div>
		<div class="total_fav_list">
			<div class="favs_list flex_item">
				<div class="favs_item item_box" 
					v-for="(item,index) in fav_list" 
					:key="index" 
					:class="{active_box:new_fav_yyids.indexOf(item.yyid) != -1}"
					@click="selectFav(item.yyid)">
					<p class="title">{{item.name}}</p>
					<p class="con_num">{{item.resource_count}}个内容</p>
					<div class="select_btn">
						<i class="iconfont" v-if="new_fav_yyids.indexOf(item.yyid) == -1">&#xe69c;</i>
						<i class="iconfont" v-else>&#xe620;</i>
					</div>
				</div>
				<div class="add_fav item_box">
					<router-link to="/createNewFav">
						<i class="iconfont">&#xe66e;</i>
						<p>添加收藏夹</p>
					</router-link>
				</div>
			</div>
		</div>
		<div class="agent_btn" @click="completeSel()">
			<a href="javascript:;">完成</a>
		</div>
	</div>
</template>

<script>
	import { favList,changeFav } from '../../api/sendRequest.js'
	import { mapState,mapActions } from 'vuex'
	export default{
		data(){
			return{
				fav_list:[],
				last_fav_yyids:[],
				new_fav_yyids:[]
			}
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
					this.last_fav_yyids = res.data.has_fav_array.toString();
					this.new_fav_yyids = res.data.has_fav_array;
				}
			},
			selectFav(id){
				if(this.new_fav_yyids.indexOf(id) != -1){
					this.new_fav_yyids.splice(this.new_fav_yyids.indexOf(id),1);
				} else {
					this.new_fav_yyids.push(id)
				}
			},
			async completeSel(){
				let res = await changeFav(
					this.user_info.yyid,
					this.user_info.user_token,
					this.$route.query.resource_yyid,
					this.$route.query.resource_type,
					this.last_fav_yyids,
					this.new_fav_yyids.toString()
				);
				if(res.errcode == 0){
					this.$router.go(-1);
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.select_fav{
		padding-bottom: 60px;
		.com_hd{
			padding: 0.266667rem 0.4rem;
			margin: 0;
			p{
				color: #999999;
			}
		}
		.total_fav_list{
			padding: 15px;
			.favs_list{
				flex-wrap: wrap;
			}
			.item_box{
				width: 48%;
				height: 80px;
				padding: 16px 15px 15px;
				margin-bottom: 15px;
				position: relative;
				background-color: #FBFBFB;
				border:1px solid rgba(229,232,255,1);
				text-align: center;
				p.title{
					font-weight: bold;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
			
				}
				.con_num{
					color: #999999;
					margin-top: 3px;
				}
				.select_btn{
					position: absolute;
					top: -5px;
					right: -1px;
					.iconfont{
						font-size: 16px;
						color: #E5E8FF;
					}
				}
			}
			.active_box{
				color: #5870FE;
				border: 2px solid #5870FE;
				background-color: #E5E8FF;
				.con_num{
					color: #5870FE;
				}
				.select_btn{
					.iconfont{
						color: #5870FE;
					}
				}
			}
			.add_fav{
				a{
					color: #999999;
				}
			}
		}
	}
</style>
