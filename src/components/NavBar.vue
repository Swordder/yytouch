<template>
	<div class="nav_bar">
		<div class="nav">
			<div class="logo">
				<div class="in_logo">
					<img src="http://img.youyao99.com/3245C0BE8EA44E9BF69C496BCF114A97.png" alt="">
				</div>
			</div>
			<div class="menu_icon" @click="sidebarNav"><i class="iconfont">&#xe71e;</i></div>
		</div>
		<transition name="showcover">
			<div class="back_cover" v-show="nav_type" @click="sidebarNav"></div>
		</transition>
		<section>
			<transition name = "sidebar">
				<section class="sidebar_nav bgcw"  v-show="nav_type">
					<router-link
					to="/personalCenter"
					class="flex_item nav_menu">
						<div class="nav_con">
							<i class="iconfont">&#xe61b;</i>
							<span>{{$t('profile_center')}}</span>
						</div>
						<i class="iconfont">&#xe661;</i>
					</router-link>
					<!-- <router-link :to="{path:'/wxCode',query:{type_yyid:'EB0E428E924055A20E7C71A0FD55667C'}}" class="flex_item nav_menu">
						<div class="nav_con">
							<i class="iconfont">&#xe63b;</i>
							我的二维码
						</div>
						<i class="iconfont">&#xe661;</i>
					</router-link> -->
					<router-link to="/helper" class="flex_item nav_menu">
						<div class="nav_con">
							<i class="iconfont">&#xe61d;</i>
							{{$t('tools')}}
						</div>
						<i class="iconfont">&#xe661;</i>
					</router-link>
          			<div class="nav_prod">
						<p><i class="iconfont">&#xe623;</i>{{$t('product')}}</p>
						<div class="nav_prod_list">
							<router-link
								key = "1"
								@click.native="sidebarNav()"
								:to="{
								path:'/product',
								query:{
									series_yyid:'E79FEAAAE849C8BC45F176E34EE7E75A',
									product_yyid:'3CFB4279AC717E90806E1D441546A513'
								}
								}"
								class="flex_item"
							>
								<div class="nav_con">{{$t('home.ni')}}</div>
								<i class="iconfont">&#xe661;</i>
							</router-link>
							<router-link
								key = "11"
								@click.native="sidebarNav()"
								:to="{
								path:'/product',
								query:{
									series_yyid:'730EA7B963AA824659662E8060A0AE3B',
									product_yyid:'F528FFABB385E411BE1C7C8F06BDC49D'
								}
								}"
								class="flex_item"
							>
								<div class="nav_con">力蜚能(OTC)</div>
								<i class="iconfont">&#xe661;</i>
							</router-link>
							<router-link
								key = "4" @click.native="sidebarNav()"
								:to="{
								path:'/aerogenInfo',
								query:{
									series_yyid:'CE99604C72FCA1B4FF0FD255E611D431',
									product_yyid:'3D05AC5E2CDBA972A4E5D2E889CE60CC'
								}
								}"
								class="flex_item"
							>
								<div class="nav_con">爱尔真</div>
								<i class="iconfont">&#xe661;</i>
							</router-link>
						</div>
					</div>
					<router-link to="/aboutPlatform" class="flex_item nav_menu">
						<div class="nav_con">
							<i class="iconfont">&#xe607;</i>
							{{$t('about_us')}}
						</div>
						<i class="iconfont">&#xe661;</i>
					</router-link>
					<router-link v-show="user_info&&user_info.yyid" to="/login" @click.native="logout()" class="flex_item nav_menu logout">
						<div class="nav_con">
							<i class="iconfont">&#xe72e;</i>
							{{$t('logout')}}
						</div>
					</router-link>
				</section>
			</transition>
		</section>
	</div>
</template>
<script>
  import { mapState} from 'vuex'
	export default {
		data(){
			return {
				nav_type:false,
				nav_con:'',
				current_id:'',
			}
		},
    computed:{
    	...mapState([
    		'user_info',
    	])
    },
		methods:{
			sidebarNav(){
				this.nav_type = !this.nav_type;
			},
      logout(){
        window.sessionStorage&&window.sessionStorage.clear();
        window.localStorage && window.localStorage.clear();
      }
		}
	}
</script>
<style lang="less">
	.nav_bar{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 36px;
		box-shadow: 0 1PX 10PX 0 rgba(99, 124, 199, 0.2);
		.nav{
			height: 36px;
			padding: 7px 14px;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			box-sizing: border-box;
			background-color: #ffffff;
			color: #333333;

			.in_logo{
				height: 22px;
				border-radius: 50%;
				img{
					width: auto !important;
					height: 100%;
				}
			}
			.menu_icon{
				.iconfont{
					font-size: 16PX;
				}
			}
		}
    .showcover-enter-active, .showcover-leave-active {
    	transition: opacity .1s
    }
    .showcover-enter, .showcover-leave-active {
    	opacity: 0
    }
		.back_cover{
			top:0;
			z-index: 1000;
		}
		.sidebar-enter-active,
		.sidebar-leave-active
		{
			margin-right: 0;
			transition: all .3s ease;
		}
		.sidebar-enter,
		.sidebar-leave-to
		{
			margin-right: -64%;
		}
		.sidebar_nav{
			width: 64%;
			position: fixed;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 1002;
			padding: 20px;
			box-sizing: border-box;
			.nav_menu{
				line-height: 32px;
				border-radius: 16px;
				padding: 0 0px 0 10px;
				margin-bottom: 8px;
				.iconfont{
					font-size: 18PX;
					vertical-align: bottom;
					margin-right: 5px;
				}
			}
      .logout{
        color: #F75D6C;
      }
			.router-link-exact-active{
				background-color: #E9ECFF;
				color: #546DFF;
			}
			.nav_prod{
				p{
					color: #888888;
					margin-bottom: 10px;
					padding: 0 10px;
					.iconfont{
						font-size: 16PX;
						margin-right: 10px;
					}
				}
				a{
					line-height: 32px;
					border-radius: 16px;
					padding: 0 0px 0 15px;
					margin: 0px 0 6px 20px;
					.iconfont{
						font-size: 18PX;
						margin-right: 5px;
					}
				}
				.router-link-exact-active{
					background-color: #E9ECFF;
					color: #546DFF;
				}
			}

		}
	}

</style>
