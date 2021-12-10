<template>
    <div class="index_page bgc" data-name="page_home">
		<div class="hom_pic">
			<img src="http://img.youyao99.com/897F4FA732E7F8C5883097DB64A80E9F.png" alt="">
		</div>
		<div
			v-if="$route.query.add_service_hos === 'add_hos'"
			class="total_product">
			<router-link
			class="flex_item bgcw" key='1'
			:to="{
        path:'/applyHos',
        query:{
          add_service_hos:'add_hos',
          series_yyid:'E79FEAAAE849C8BC45F176E34EE7E75A',
          product_yyid:'3CFB4279AC717E90806E1D441546A513'
          }
        }"
      >
        <div class="prod_pic">
          <img src="http://img.youyao99.com/913443AB0672F8D9CDC2BEFDAD45E6A6.png" alt="">
        </div>
        <div class="prod_intro flex_item">
          <p class="title">{{$t("home.ni")}}</p>
          <p class="sub_title">多糖铁复合物胶囊</p>
        </div>
        <div class="icon"><i class="iconfont">&#xe661;</i></div>
			</router-link>
      <router-link
			class="flex_item bgcw" key='1'
			:to="{
        path:'/applyHos',
        query:{
          add_service_hos:'add_hos',
          series_yyid:'730EA7B963AA824659662E8060A0AE3B',
          product_yyid:'F528FFABB385E411BE1C7C8F06BDC49D'
          }
        }"
      >
        <div class="prod_pic">
          <img src="http://img.youyao99.com/7e6763d2d205baab607c21fdb6e3b968.png" alt="">
        </div>
        <div class="prod_intro flex_item">
          <p class="title">力蜚能(OTC)</p>
          <p class="sub_title">多糖铁复合物胶囊</p>
        </div>
        <div class="icon"><i class="iconfont">&#xe661;</i></div>
			</router-link>
      <router-link class="flex_item bgcw" key="4"
      :to="{
        path:'/aerogenInfo',
        query:{
          add_service_hos:'add_hos',
          series_yyid:'CE99604C72FCA1B4FF0FD255E611D431',
          product_yyid:'3D05AC5E2CDBA972A4E5D2E889CE60CC'
        }
      }" >
        <div class="prod_pic">
          <img src="http://img.youyao99.com/8017F0F76A89475C6467F4ADA8BBAD5E.png" alt="">
        </div>
        <div class="prod_intro flex_item">
          <p class="title">Aerogen（爱尔真）雾化给药系统</p>
          <p class="sub_title">安静、高效、快速、药效持续的雾化治疗！</p>
        </div>
        <div class="icon"><i class="iconfont">&#xe661;</i></div>
      </router-link>
		</div>
		<div
			v-else
			class="total_product">
			<router-link class="flex_item bgcw" key="1"
			:to="{
        path:'/product',
        query:{
          series_yyid:'E79FEAAAE849C8BC45F176E34EE7E75A',
          product_yyid:'3CFB4279AC717E90806E1D441546A513'
        }
      }" >
        <div class="prod_pic">
          <img src="http://img.youyao99.com/913443AB0672F8D9CDC2BEFDAD45E6A6.png" alt="">
        </div>
        <div class="prod_intro flex_item">
          <p class="title">{{$t("home.ni")}}</p>
          <p class="sub_title">多糖铁复合物胶囊</p>
        </div>
        <div class="icon"><i class="iconfont">&#xe661;</i></div>
			</router-link>
      <router-link
			class="flex_item bgcw" key='11'
			:to="{
        path:'/product',
        query:{
          add_service_hos:'add_hos',
          series_yyid:'730EA7B963AA824659662E8060A0AE3B',
          product_yyid:'F528FFABB385E411BE1C7C8F06BDC49D'
          }
        }"
      >
        <div class="prod_pic">
          <img src="http://img.youyao99.com/7e6763d2d205baab607c21fdb6e3b968.png" alt="">
        </div>
        <div class="prod_intro flex_item">
          <p class="title">力蜚能(OTC)</p>
          <p class="sub_title">多糖铁复合物胶囊</p>
        </div>
        <div class="icon"><i class="iconfont">&#xe661;</i></div>
			</router-link>
      <router-link class="flex_item bgcw" key="4"
      :to="{
        path:'/aerogenInfo',
        query:{
          series_yyid:'CE99604C72FCA1B4FF0FD255E611D431',
          product_yyid:'3D05AC5E2CDBA972A4E5D2E889CE60CC'
        }
      }" >
        <div class="prod_pic">
          <img src="http://img.youyao99.com/8017F0F76A89475C6467F4ADA8BBAD5E.png" alt="">
        </div>
        <div class="prod_intro flex_item">
          <p class="title">Aerogen（爱尔真）雾化给药系统</p>
          <p class="sub_title">安静、高效、快速、药效持续的雾化治疗！</p>
        </div>
        <div class="icon"><i class="iconfont">&#xe661;</i></div>
      </router-link>
		</div>
	</div>
</template>
<script>
	import { wxShare } from '../config/share.js'
	export default {
		data(){
			return {
				
			}
		},
		mounted() {
			wxShare('优药','医药学术营销服务平台','http://img.youyao99.com/F46EC605D71D5658300304E84F16B434.jpg','4856E2787EE08E28A69FE9AF1E2A425A',19,this.$route.query);
		},
	}
</script>
<style lang="less" scoped="scoped">
	.index_page{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		.hom_pic{
			width: 100%;
			height: 140px;
			margin-bottom: 10px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.total_product{
			a{
				width: 100%;
				height: 80px;
				padding: 10px 15px;
				margin-bottom: 10px;
				justify-content: flex-start;
				align-items: center;
				.prod_pic{
					width: 60px;
					height: 60px;
					margin-right: 15px;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.prod_intro{
					width: 70%;
					height: 100%;
					flex-wrap: wrap;
					align-content: space-between;
					.sub_title{
						width: 100%;
						font-size: 12PX;
						color: #666666;
						line-height: 16px;
					}
				}
				.icon{
					text-align: right;
					width: 30px;
					.iconfont{
						color: #AAAAAA;
					}
				}

			}
		}
	}
</style>
