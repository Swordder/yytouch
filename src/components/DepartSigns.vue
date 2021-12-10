<template>
	<div class="depart_signs bgcw">
		<div class="com_hd flex_item bd_bt bgcw" :class="{active:mod_type}" @click="selectSign()">
			<h4>科室</h4>
			<i class="iconfont">&#xe645;</i>
		</div>
		<transition name="showcover">
			<div class="back_cover" v-show="mod_type"></div>
		</transition>
		<section class="com_item">
			<transition name="com_item">
				<section class="com_item_con bgcw" v-show="mod_type">
					<ul class="flex_item">
						<li 
						v-for="(item,index) in signsList" 
						:key="item.yyid" 
						@click="filterSign(item)"
						:class="{active:tags.indexOf(item.yyid) != -1}">{{item.name}}</li>
					</ul>
					<div class="tab_btns">
						<button type="button" class="reset_btn" @click="resetData()">重置</button> 
						<button type="button" class="sub_btn" @click="filterBtn()">确定</button>
					</div>
				</section>
			</transition>
		</section>
	</div>
</template>

<script>
	export default{
		props:['signsList'],
		data(){
			return {
				mod_type:false,
				tags:[],
				tag_yyid:'',
				
			}
		},
		mounted() {
			
		},
		components:{
			
		},
		methods:{
			selectSign(){
				this.mod_type = !this.mod_type;
			},
			filterSign(item){
				
				if(this.tags.indexOf(item.yyid) == -1){
					this.tags.push(item.yyid);
					this.tag_yyid = item.yyid;
				} else {
					this.tags.splice(this.tags.indexOf(item.yyid),1);
					this.tag_yyid = '';
				}
			},
			filterBtn(){
				this.selectSign();
				this.$emit('filterData',this.tags);
			},
			resetData(){
				this.tags = [];
			}
		}
	}
</script>

<style lang="less">
	.depart_signs{
		.com_hd{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 20;
			height: 44px;
			margin: 0;
			.iconfont{
				font-size: 22PX;
			}
		}
		.com_hd.active{
			color: #5870FE;
		}
		.com_item-enter-active,
		.com_item-leave-active{
			transition: all .3s;
			transform: translateY(0);
		}
		.com_item-enter,
		.com_item-leave-active{
			opacity: 0;
			transform: translateY(-100%);
		}
		.back_cover{
			z-index: 12;
		}
		.com_item{
			position: fixed;
			top: 44px;
			left: 0;
			right: 0;
			z-index: 13;
			.com_item_con{
				min-height: 500px;
				padding: 0 58px 50px;
				ul{
					height: 460px;
					flex-wrap: wrap;
					// overflow: hidden;
					overflow-y: auto;
					margin-bottom: 20px;
					li{
						width: 46%;
						height: 26px;
						text-align: center;
						margin-top: 20px;
						color: #999999;
						border: 1px solid #DDDDDD;
						border-radius: 4px;
						line-height: 24px;
						
					}
					.active{
						color: #5870FE;
						background-color: #E9ECFF;
						border-color: #5870FE;
					}
				}
				.tab_btns{
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					font-size: 14PX;
					border: 1PX solid #5870FE;
					background-color: #5870FE;
					button{
						height: 44px;
						background-color: #FFFFFF;
						border: 0;
					}
					.reset_btn{
						color: #5870FE;
						width: 33%;
					}
					.sub_btn{
						width: 60%;
						background-color: #5870FE;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
