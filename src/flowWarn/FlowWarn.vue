<template>
	<div class="flow_list bgc" data-name="page_flow_list">
		<div class="list_item bgcw" v-for="(item,index) in list" :key="item.msg_yyid">
			<router-link :to="{path:'/flowWarnDetail',query:{msg_yyid:item.msg_yyid}}" class="flex_item">
				<div class="list_item_l">
					<div class="list_item_hd">
						日流向更新
						<span class="font_10">{{item.created_time.split(' ')[0]}}</span>
					</div>
					<div class="list_item_bd">
						{{item.sub_title}}
					</div>
				</div>
				<div class="list_item_r">
					<i v-show="item.is_read == 0" class="iconfont red">&#xe609;</i>
					<i class="iconfont">&#xe661;</i>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import {dailyFlowList} from '../../api/sendRequest.js'
	import {mapState,mapActions} from 'vuex'
	export default {
		data(){
			return {
				month:2019,
				list:[],
			}
		},
		mounted(){
			this.checkUserInfo();
			if(this.user_info&&this.user_info.yyid){
				this.getDailyFlowList();
			}
		},
		computed: {
			...mapState([
				'user_info'
			])
		},
		components:{
			
		},
		methods: {
			...mapActions([
				'checkUserInfo'
			]),
			async getDailyFlowList() {
				// this.$vux.loading.show({text: 'Loading'});
				let res = await dailyFlowList(this.user_info.yyid,this.user_info.user_token);
				if(res.errcode != 0){
					this.$vux.toast.text(res.errmsg);
					return;
				}
				// this.$vux.loading.hide();
				this.list = res.data.list;
			}
		},
	}
</script>


<style lang="less" scoped="scoped">
	.flow_list{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		.list_item{
			padding: 11px 10px 11px 15px;
			margin-bottom: 10px;
			a{
				width: 100%;
				align-items: center;
				.list_item_hd{
					font-weight: bold;
				}
				.list_item_r{
					width: 40px;
					position: relative;
					text-align: right;
					.red{
						position: absolute;
						right: 15px;
					}
				}
				.font_10{
					font-size: 12PX;
					color: #999999;
					margin-left: 10px;
					font-weight: normal;
				}
				.list_item_bd{
					color: #666666;
					margin-top: 6px;
				}
				
				.iconfont{
					color: #AAAAAA;
				}
				.red{
					color: #F65B6A;
				}
			}
		}
	}
</style>
