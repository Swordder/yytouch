<template>
	<div class="service_hos_page bgc" data-name="page_service_hos">
		<div class="hos_name bgcw bd_bt" v-for="(item,index) in hos_list">
			<router-link class="flex_item" :to="{ path:'/serviceHosDetail',query:{hospital_yyid:item.hospital_yyid} }">
				<p>{{item.hospital_name}}</p>
				<div class="hos_status">
					<i class="iconfont">&#xe661;</i>
				</div>
			</router-link>
		</div>
    <div class="hos_name bgcw add_btn">
      <router-link :to="{path:'/',query:{add_service_hos:'add_hos'}}">
        <i class="iconfont">&#xe66e;</i>
        新增服务医院
      </router-link>
    </div>
		<div v-show="show_empty" class="empty_status">
			<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
			<p>暂无服务的医院</p>
		</div>
    <div class="back_btn agent_btn">
      <router-link to="/personalCenter">{{$t('back')}}</router-link>
    </div>
	</div>
</template>

<script>
	import { userHosList } from '../../api/sendRequest.js'
	import { mapState,mapActions } from 'vuex'
	export default {
		data(){
			return {
				hos_list:[],
				show_empty:false,
			}
		},
		computed:{
			...mapState([
				'user_info'
			]),
		},
		mounted(){
			this.checkUserInfo();
			this.hosList();
		},
		methods:{
			...mapActions([
				'checkUserInfo'
			]),
			async hosList(){
				// this.$vux.loading.show({text: 'Loading'})
				let res = await userHosList('',this.user_info.yyid,this.user_info.user_token);
				if(res.errcode == 0){
					// this.$vux.loading.hide();
					this.hos_list = res.data;
					if(res.data.length == 0){
						this.show_empty = true;
					} else {
						this.show_empty = false;
					}
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.service_hos_page {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 60px;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;

		.hos_name{
			.flex_item{
				padding: 10px 15px;
				p{
					line-height: 30px;
				}
			}
			span{
				font-weight: normal;
				color: #FF982A;
			}
			.iconfont{
				font-weight: normal;
				color: #AAAAAA;
			}
		}
    .add_btn{
      text-align: center;
      a{
        display: block;
        padding: 10px 0;;
        color: #5870FE;
        .iconfont{
          margin-right: 8px;
          font-size: 14PX;
          color: #5870FE;
        }
      }
    }
    .back_btn{
      background-color: #F5F5F5;
      a{
        background-color: #ffffff;
        color: #5870FE;
        border: 1px solid #5870FE;
      }
    }
		.empty_status{
			text-align: center;
			position: absolute;
			top: 40%;
			left: 50%;
			transform:  translate(-50%,-50%);
			color:#666666;
			img{
				width: 100px;
				margin-bottom: 6px;
			}
		}
	}
</style>
