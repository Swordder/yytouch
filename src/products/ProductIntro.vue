<template>
	<div class="prod_intro" data-name="product_introduction">
		<NavBar></NavBar>
		<div class="prod_con">
			<h1>{{prod_info.name}}</h1>
			<div
			class="pro_item bd_bt"
			v-for="(item,index) in prod_con"
			:data-yyid="item.yyid"
			:key="item.yyid">
				<div class="item_hd">
					<i class="iconfont">&#xe6fa;</i>
					{{item.name}}
				</div>
				<div class="item_bd" v-html="item.content">
					{{item.content}}
				</div>
			</div>
			<div class="prod_menu_btn" @click="menuNav">
				<i class="iconfont">&#xe616;</i>
			</div>
		</div>
		<transition name="showcover">
			<div class="back_cover" v-show="menu" @click="menuNav"></div>
		</transition>
		<section>
			<transition name="memu_show">
				<section class="menu_list bgcw" v-show="menu">
					<ul>
						<li
						v-for="(item,index) in prod_con"
						:data-yyid="item.yyid"
						:key="item.yyid"
						@click="selectMenu(item.yyid,index)"
						:class="{active:menu_yyid == item.yyid}">
							<i class="iconfont">&#xe6fa;</i>
							{{item.name}}
						</li>
					</ul>
				</section>
			</transition>
		</section>
	</div>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	import axiosFn from '../../config/index.js'
	import { wxShare } from '../../config/share.js'
	import { setStore } from '../../config/util.js'
	import {productInfo,proManualList} from "../../api/sendRequest.js"
	import {mapState,mapActions} from 'vuex'
	export default{
		data(){
			return {
				prod_info:{},
				prod_con:[],
				menu_yyid:'',
				menu:false,
				docTop:0,
			}
		},
		mounted() {
			this.getProdManualList();
			this.shareInfo();
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		components:{
			NavBar
		},
		created(){
			setStore('id_type',this.$route.query.product_yyid);
		},
		methods:{
			async shareInfo(){
				let res = await axiosFn('/youyao/share/info',{
					'page_name':'product_info',
					'product_yyid':this.$route.query.product_yyid
				},'POST');
				wxShare(res.data.title,res.data.sub_title,res.data.image,this.$route.query.product_yyid,6,this.$route.query);
			},
			async getProdManualList(){
				let user_yyid = '';
				if(this.user_info&&this.user_info.yyid){
					user_yyid = this.user_info.yyid;
				} else {
					user_yyid = ''
				};
				let prod_res = productInfo(user_yyid,this.$route.query.product_yyid);
				let res = proManualList(user_yyid,this.$route.query.product_yyid);
				let res_all = await Promise.all([prod_res,res]);
				this.prod_info = res_all[0].data;
				this.prod_con = res_all[1].data;
			},
      getScrollData(){
        if(window.pageYOffset){
          return {
            x:window.pageXOffset,
            y:window.pageYOffset
          }
        } else {
          return {
            x:document.documentElement.scrollLeft || document.body.scrollLeft,
            y:document.documentElement.scrollTop || document.body.scrollTop
          }
        }
      },
      // getScroll(){
      //   this.scroll_top = this.getScrollData().y;
      // },
			menuNav(){
        this.menu = !this.menu ;
        // this.getScroll();
        // console.log(this.scroll_top)
        // let doc = document.body || document.documentElement;
        // if( this.menu === false){
        //   this.menu = true;
        //   doc.style.position = 'fixed';
        //   doc.style.overflow = 'hidden';
        //   doc.style.top = -this.scroll_top + 'px';
        // } else {
        //   doc.style.position = 'static';
        //   doc.style.overflow = 'auto';
        //   doc.scrollTop = -this.scroll_top + 'px';
        //   this.menu = false;
        // }
			},
			selectMenu(yyid,index){
				this.menu_yyid = yyid;
				let total_el = this.$el.querySelectorAll('.pro_item');
				let item_top = total_el[index].offsetTop;
				document.documentElement.scrollTop = item_top - 50;
				document.body.scrollTop = item_top -50;
				window.pageYOffset = item_top -50;
				this.menuNav();
			},
		}
	}
</script>
<style lang="less">
	.prod_intro{
		img{
			width: 100% !important;
			height: 100% !important;
		}
	}
</style>
<style lang="less" scoped>
	.prod_intro{
		.prod_con{
			padding: 56px 15px 10px 15px;
			h1{
				font-size: 16PX;
				font-weight: bold;
				text-align: center;
				position: relative;
				margin-bottom: 20px;
				&::before{
					content: '';
					display: block;
					height: 3px;
					width: 20px;
					border-radius: 3px;
					position: absolute;
					bottom: -8px;
					left: 50%;
					margin-left: -10px;
					text-align: center;
					background-color: #5870FE;
				}
			}
			.pro_item{
				margin-top: 15px;
				.item_hd{
					font-weight: bold;
					.iconfont{
						font-size: 14PX;
						font-weight: normal;
						transform: scale(0.9);
						color: #5870FE;
					}
				}
				.item_bd{
					padding: 8px 15px 15px;
					color: #666666;
					line-height: 24px;
					img{
						width: 100% !important;
					}

				}
			}
			.prod_menu_btn{
				position: fixed;
				bottom: 40px;
				right: 20px;
				z-index: 2;
				width:46px;
				height:46px;
				line-height: 46px;
				background:rgba(88,112,254,1);
				box-shadow:0px 0px 8px 0px rgba(120,126,160,0.5);
				color: #ffffff;
				border-radius: 50%;
				text-align: center;
				.iconfont{
					font-size: 28PX;
				}
			}
		}
		.memu_show-enter-active,
		.memu_show-leave-active{
			margin-right: 0;
			transition: all .3s ease;
		}
		.memu_show-enter,
		.memu_show-leave-to
		{
			margin-right: -54%;
		}
		.back_cover{
			top:36px;
			bottom: 0;
			z-index: 5;
		}
		.menu_list{
			padding: 30px 20px 5px;
			width: 54%;
			box-sizing: border-box;
			position: fixed;
			top: 36px;
			bottom: 0;
			right: 0;
			z-index: 6;
			overflow: hidden;
			overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
			li{
				margin-bottom: 25px;
				.iconfont{
					font-size: 14PX;
					font-weight: normal;
					transform: scale(0.9);
				}
			}
			.active{
				color: #5870FE;
			}
		}
	}

</style>
