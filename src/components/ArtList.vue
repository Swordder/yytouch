<template>
	<div class="liter_list">
		<mu-paper :z-depth="1" class="demo-loadmore-wrap search_list">
			<mu-container ref="container" class="demo-loadmore-content">
				<mu-load-more :loading="loading" :loaded-all="loadedAll" @load="getList" >
					<template>
						<ul>
							<li v-for="(item,index) in artList" :key="index">
								<router-link :to="{path:'/literatureDetail',query:{document_yyid:item.yyid}}" v-if="item.author">
									<h5 class="bd_bt">{{item.title}}</h5>
									<div class="liter_info">
										<div class="liter_info_hd flex_item">
											<div class="liter_author">
												<i class="iconfont">&#xe61f;</i>
												{{item.author}}
											</div>
											<div class="signs flex_item">
												<p class="font_10" v-for="(item2,index2) in item.tags" :key="index">{{item2.name}}</p>
											</div>
										</div>
										<div class="liter_info_ft">
											<i class="iconfont">&#xe669;</i>
											{{item.reference}}
										</div>
									</div>
								</router-link>
								<router-link :to="{path:'/clinicalDetail',query:{interpret_yyid:item.yyid}}" v-else>
									<h5 class="bd_bt">{{item.title}}</h5>
									<div class="liter_info">
										<div class="liter_info_hd flex_item">
											<div class="liter_author">
												<i class="iconfont time_icon">&#xe602;</i>
												{{item.created_time}}
											</div>
											<div class="signs flex_item">
												<p class="font_10" v-for="(item2,index2) in item.tags" :key="index2">{{item2.name}}</p>
											</div>
										</div>
									</div>
								</router-link>
							</li>
						</ul>
					</template>
				</mu-load-more>
			</mu-container>
		</mu-paper>
	</div>
</template>

<script>
	export default{
		props:['artList','loading','loadedAll'],
		data(){
			return {
				
			}
		},
		mounted() {
		},
		components:{
			
		},
		methods:{
			getList(){
				this.$emit('getTotalList','');
			}
		}
	}
</script>

<style lang="less">
	@import '../assets/css/graphic.less';
	.mu-paper{
		background-color: rgba(255, 255, 255, 0);
		.container{
			padding: 0;
		}
	}
	.mu-elevation-1{
		box-shadow: none !important;
	}
	
</style>
