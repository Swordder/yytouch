<template>
    <div class="personal_page bgc" data-name="page_user_center">
        <NavBar></NavBar>
		<div class="page bgc">
			<div class="personal_bd">
            <header class="head bgcw m_b">
                <div class="avator">
                    <img v-show="!(user_info&&user_info.picture_url)" src="http://img.youyao99.com/380C836AA106AFDB997D582D284EBF66.png" alt="">
					<router-link v-show="user_info&&user_info.picture_url" to="/userInfo">
						<img :src="user_info.picture_url" alt="" srcset="">
					</router-link>
                </div>
                <div class="status_info">
					<router-link to="/userInfo">
						<div v-if="Object.keys(user_info).length !== 0" class="user_info">
							<h2>{{user_info.name}}</h2>
							<p v-if="user_info.is_agent == '0'">{{$t('profile.unverified')}}</p>
							<p v-else-if="user_info.is_agent == '1'||user_info.is_agent == '4'">{{$t('profile.unverified')}}</p>
							<p class="blue" v-else-if="user_info.is_agent == '2'">{{$t('profile.verified_rep')}}</p>
							<p v-else-if="user_info.is_agent == '3'">{{$t('profile.in_verification')}}</p>
						</div>
                    <a class="login_btn" href="javascript:;" v-else @click="login">点击登录</a>
					</router-link>
                </div>
            </header>
            <section>
                <div class="base_data bgcw m_b">
					<router-link to="/costIntegral" class="flex_item">
						<div class="item_l">
							<h4>消费积分</h4>
							<p>消费积分跟业绩息息相关</p>
						</div>
						<div v-if="user_info&&user_info.yyid" class="item_r">
							<div v-if="res_data.money_point" class="item_data">
								<span class="number">{{res_data.money_point}}</span>
							</div>
							<div v-else  class="unlogin">--</div>
						</div>
						<div v-else class="unlogin">--</div>
					</router-link>
                </div>
                <div class="base_data bgcw m_b">
					<router-link to="/servicePoint" class="flex_item">
						<div class="item_l">
							<h4>{{$t('profile.s_points')}}</h4>
							<p>服务积分跟业绩息息相关</p>
						</div>
						<div v-if="user_info&&user_info.yyid" class="item_r">
							<div v-if="res_data.point" class="item_data">
								<span class="number">{{res_data.point}}</span>
							</div>
							<div v-else  class="unlogin">--</div>
						</div>
						<div v-else class="unlogin">--</div>
					</router-link>
                </div>
                <div class="base_data bgcw m_b">
					<router-link to="/userServiceHos" class="flex_item">
						<div class="item_l">
							<h4>{{$t('profile.s_hos')}}</h4>
							<p>建议增多服务医院，可扩大业绩</p>
						</div>
						<div v-if="user_info&&user_info.yyid" class="item_r">
							<div v-if="res_data.hospital_num == 0 || res_data.hospital_num != ''" class="item_data">
								<span class="item_txt">总计</span>
								<span class="number">{{res_data.hospital_num}}</span>
							</div>
							<div v-else class="unlogin">--</div>
						</div>
						<div v-else class="unlogin">--</div>
					</router-link>
                </div>
          <div class="base_data bgcw flex_item m_b">
            <router-link to="/serviceReport" class="flex_item">
              <div class="item_l">
                <h4>{{$t('profile.m_report')}}</h4>
                <p>服务药品的结算月报</p>
              </div>
              <div class="item_r">
                <img src="http://img.youyao99.com/B3AA0791239ACEAF4DA4C173A7C8EA9C.png" alt="">
              </div>
            </router-link>
          </div>

            </section>
        </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../components/NavBar'
import { getUserBaseInfo } from '../api/sendRequest'
import { mapState ,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return {
            res_data:{},
            status:true,
            loading:true,
        }
    },
    mounted() {
		if(this.user_info&&this.user_info.yyid){
			this.getBaseInfo();
		}
    },
    computed: {
        ...mapState([
            'user_info',
        ]),
    },
    components:{
        NavBar,
    },
    methods: {
		...mapActions([
			'checkUserInfo'
		]),
		...mapMutations([
			'CHECK_USERINFO'
		]),
        login(){
            this.$router.push({path:'/login',query:{redirect: this.$route.fullPath}})
        },
        async getBaseInfo(){
            this.checkUserInfo();
            let res = await getUserBaseInfo(this.user_info.yyid,this.user_info.user_token);
            if (res.errcode == 0) {
                this.res_data = res.data;
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
    }
}
</script>

<style lang="less">
    .personal_page{
        height: 100%;
        .personal_bd{
            padding: 0 10px;
        }
        header{
            width: 100%;
            height: 100px;
            margin-top: 50px;
            border-radius: 2px;
            position: relative;
            .avator{
                width: 70px;
                height: 70px;
                border:2PX solid #ffffff;
                border-radius: 50%;
                position: absolute;
                top: -38px;
                left: 50%;
                transform: translateX(-50%);
                box-shadow: 0 3PX 15PX rgba(0,0,0,.1);
				background-color:#FFFFFF;
				a{
					display: block;
					width: 100%;
					height: 100%;
				}
                img{
                    width: 100%;
					height: 100%;
                    border-radius: 50%;
                }
            }
            .status_info{
                position: absolute;
                top: 38px;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                .login_btn{
                    display: inline-block;
                    width: 80px;
                    height: 30px;
                    color: #ffffff;
                    background-color: #5870FE;
                    line-height: 30px;
                    border-radius: 16px;
                    font-size: 12px;
                    margin-top: 9px;
                }
                .user_info{
                    h2{
                        font-size: 16PX;
                        color: #333333;
                    }
                    p{
                        font-size: 12PX;
                        transform: scale(0.9);
                        border: 1PX solid #999999;
                        color: #999999;
                        padding: 2px 10px;
                        margin-top: 5px;
                        border-radius: 2px;
                    }
					.blue{
						color: #5870FE;
						border-color: #5870FE;
					}
                }
            }
        }
        .base_data{
            height: 70px;
            border-radius: 2px;
            padding: 13px 16px 13px 20px;
            box-sizing: border-box;
            align-items: center;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 3px;
                background-color: #5870FE;
                border-radius: 2px 0 0 2px;
            }
			a{
				width: 100%;
				align-items: center;
			}
            h4{
                font-size: 16PX;
                color: #333333;
                text-align: left;
                font-weight: bold;
            }
            p{
                font-size: 12PX;
                color: #aaaaaa;
                margin-top: 5px;
            }
            .item_r{
                color: #5870FE;
                font-size: 12PX;
            }
			.unlogin{
				font-size: 16PX;
				color: #5870FE;
				font-weight: bold;
			}
            .iconfont{
                display: inline-block;
                font-size: 12PX;
                color: #F65B6A;
            }
            .iconfont.down{
                transform:rotate(180deg);
                -ms-transform:rotate(180deg); /* Internet Explorer */
                -moz-transform:rotate(180deg); /* Firefox */
                -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
                -o-transform:rotate(180deg); /* Opera */
                color: #4ED79C;
            }
            .number{
                font-size: 18PX;
                font-weight: bold;
                vertical-align: middle;
                margin-left: 6px;
            }
            img{
                width: 40px;
            }
        }
    }
</style>
