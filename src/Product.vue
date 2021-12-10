<template>
    <div class="pro_page" data-name="product_index">
      <NavBar></NavBar>
		<div class="page bgc">
			<div class="pro_banner">
				<img :src="product_info.detail_pic" alt="">
			</div>
			<div class="pro_info m_b">
				<div class="pro_hd flex_item">
					<div class="pro_pic flex_item">
						<div class="pro_img">
							<img :src="product_info.list_pic" alt="">
						</div>
						<div class="pro_name">
							<h1>{{product_info.series_name}}</h1>
							<p>{{product_info.sub_series_name}}</p>
						</div>
					</div>
					<div class="pro_treasure" v-show="$route.query.series_yyid == '529435CCE7AB708DC55BAE3A1486DD03'">
						<router-link :to="{path:'/productInfo',query:{product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid}}">{{$t('prod_book')}}</router-link>
					</div>
					<div class="pro_treasure" v-show="$route.query.series_yyid == 'E79FEAAAE849C8BC45F176E34EE7E75A' || $route.query.series_yyid == '730EA7B963AA824659662E8060A0AE3B'">
						<router-link :to="{path:'/niferexInfo',query:{product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid}}">{{$t('prod_book')}}</router-link>
					</div>
				</div>
				<div class="test">
					<div class="pro_bd">
						<div class="pro_item flex_item">
							<i class="iconfont">&#xe6fa;</i>
							<label class="pro_label">产品类别</label>
							<span class="pro_value">{{product_info.type}}</span>
						</div>
						<div class="pro_item flex_item">
							<i class="iconfont">&#xe6fa;</i>
							<label class="pro_label">批准文号</label>
							<span class="pro_value">{{product_info.approval_id}}</span>
						</div>
						<div class="pro_item flex_item">
							<i class="iconfont">&#xe6fa;</i>
							<label class="pro_label">生产企业</label>
							<span class="pro_value">{{product_info.manufacturer}}</span>
						</div>
						<div class="pro_item flex_item">
							<i class="iconfont">&#xe6fa;</i>
							<label class="pro_label">产品简介</label>
							<span class="pro_value">{{product_info.desc}}</span>
						</div>
					</div>
				</div>
				<div class="pro_intro">
					<router-link :to="{path:'/productIntro',query:{product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid,resource_type:6}}">{{$t('instruction')}}</router-link>
				</div>
			</div>
      <div class="pro_module m_b pro_zs">
      	<div class="mod_hd"><span></span>{{$t('intensive_reading')}}</div>
      	<div class="mod_bd mod_zs flex_item">
      		<a href="javascript:;"  @click="chooseRulseType('prod_rule','4')">
      			<div class="plat_rules flex_item">
      				<div class="pic" style="margin-bottom: 0; margin-right: 15px;width: 35px; height: 35px;">
                <img style="width: 24px; height: 24px;" src="http://img.youyao99.com/EF7BAB0A754FDBFD77272A5012A56C6C.png" alt="" srcset=""></div>
      				<span>产品应用与招商范围</span>
      			</div>
      		</a>
      	</div>
      </div>
			<div class="pro_module m_b pro_zs">
				<div class="mod_hd"><span></span>{{$t('business_policy')}}</div>
				<div class="mod_bd mod_zs flex_item">
					<a href="javascript:;"  @click="chooseRulseType('pr_detail','5')">
						<div class="plat_rules flex_item">
							<img src="http://img.youyao99.com/F9D72BC0D2C21533A7E4DD10F44B8442.png" alt="">
							<span>平台政策与结算细节</span>
						</div>
					</a>
				</div>
			</div>
		</div>
		<div class="back_cover" v-show="rulse_type"></div>
		<section>
			<transition-group class="rulse_show">
        <section class="rulse_show_item" v-show="rulse_type == 'prod_rule'" key="prod_rule">
        	<section class="rulse_con pr_detail bgcw">
        		<div class="rulse_con_hd">
        			<img src="http://img.youyao99.com/C53B254E0B9462B35397A359202AF456.png" alt="">
        			<span>产品应用与招商范围</span>
        		</div>
        		<div class="rulse_con_bd bgcw">
        			<div class="flex_item">
                <p>产品应用&nbsp;&nbsp;</p>
                <span>{{product_base_info['1'].val}}</span>
              </div>
              <div class="flex_item">
                <p>市场分析&nbsp;&nbsp;</p>
                <span>{{product_base_info['2'].val}}</span>
              </div>
              <div class="flex_item">
                <p>招商范围&nbsp;&nbsp;</p>
                <span>{{product_base_info['3'].val}}</span>
              </div>
              <div class="flex_item">
                <p>区域价格&nbsp;&nbsp;</p>
                <span>{{product_base_info['4'].val}}</span>
              </div>
        		</div>
        	</section>
        	<div class="close" @click="closeCover">
        		<i class="iconfont">&#xe615;</i>
        	</div>
        </section>
				<section class="rulse_show_item" v-show="rulse_type == 'pr_detail'" key="pr_detail">
					<section class="rulse_con pr_detail bgcw">
						<div class="rulse_con_hd">
							<img src="http://img.youyao99.com/C53B254E0B9462B35397A359202AF456.png" alt="">
							<span>{{product_base_info['5']['key']}}</span>
						</div>
						<div class="rulse_con_bd bgcw">
							<p style="margin-bottom: 15px;">平台政策&nbsp;&nbsp;<span>{{product_base_info['5']['val']}}</span></p>
							<p style="margin-bottom: 0;">结算细则&nbsp;&nbsp;<span>{{product_base_info['5']['val2']}}</span></p>
						</div>
					</section>
					<div class="close" @click="closeCover">
						<i class="iconfont">&#xe615;</i>
					</div>
				</section>
			</transition-group>
		</section>
		<AgentBtn></AgentBtn>
		<GetRoute v-show="get_source_flag" :get_source_flag = "get_source_flag" @getSourceBtn="submint"></GetRoute>
    </div>
</template>
<script>
import NavBar from '../components/NavBar'
import AgentBtn from '../components/AgentBtn.vue'
import GetRoute from '../pages/GetRoute'
import axiosFn from '../config/index.js'
import { wxShare } from '../config/share.js'
import { seriesInfo ,updateUserInfo , } from '../api/sendRequest.js'
import { productBaseInfo } from '../api/staticRequest.js'
import { getStore,setStore } from '../config/util'
import { mapState,mapMutations ,mapActions} from 'vuex'
export default {
  data(){
    return{
      product_info:{
      },
      product_info_arr:{
        '1':{},
        '2':{},
        '3':{},
        '4':{},
      },
      product_base_info:{
        '1':{},
        '2':{},
        '3':{},
        '4':{},
        '5':{}
      },
      province_arr:[],
      len:0,
	  rulse_type:'',
	  get_source_flag:true
    }
  },
	created(){
		setStore('id_type',this.$route.query.product_yyid);
	},
	watch: {
		'$route'(to,from){
			setStore('id_type',this.$route.query.product_yyid);
			let is_new = getStore('is_new');
			if(is_new == 'true'){
				this.get_source_flag = false; 
			} else {
				this.get_source_flag = true;
			}
			this.getSeriesInfo();
			this.getProductBaseInfo();
			this.shareInfo();
		}
	},
  mounted() {
    if(this.user_info&&this.user_info.yyid){
      this.checkUserInfo();
	}
	let is_new = getStore('is_new');
	if(is_new == 'true' || (this.user_info&&this.user_info.yyid)){
		this.get_source_flag = false; 
	} else {
		this.get_source_flag = true;
	}
    this.getSeriesInfo();
    this.getProductBaseInfo();
	this.shareInfo();

  },
	computed:{
		...mapState([
			'user_info',
		])
	},
  components:{
    NavBar,
	AgentBtn,
	GetRoute
  },
	methods:{
		...mapActions([
			'checkUserInfo'
		]),
		async getSeriesInfo(){
			let yyid="";
			let token="";
			if(this.user_info&&this.user_info.yyid){
				yyid = this.user_info.yyid;
				token = this.user_info.user_token;
			} else {
				yyid = '';
				token = '';
			}
			let res = await seriesInfo(this.$route.query.series_yyid,yyid,token);
			this.product_info = res.data;
		},
		async shareInfo(){
			let res = await axiosFn('/youyao/share/info',{
				'page_name':'product_info',
				'product_yyid':this.$route.query.product_yyid
			},'POST');
			wxShare(res.data.title,res.data.sub_title,res.data.image,this.$route.query.product_yyid,5,this.$route.query);
		},
		getProductBaseInfo(){
			productBaseInfo.then( res => {
				let id = this.$route.query.series_yyid;
				if(res.hasOwnProperty(id)){
					this.product_base_info = res[id];
				}
			});
		},
		chooseRulseType(type,val){
			if(this.user_info&&this.user_info.yyid){
				if(this.user_info.is_agent == 2 || this.user_info.is_agent == 3){
					if(this.rulse_type != type){
						this.rulse_type = type;
					} else {
						this.rulse_type = ''
					}
				} else {
					this.$router.push({path:'/certificateInfo',query:{redirect: this.$route.fullPath}})
				}
			} else {
				this.$router.push({path:'/login',query:{redirect: this.$route.fullPath}})
			}
		},
		closeCover(){
			this.rulse_type = ''
		},
		// 判断获取公众号的来源
		submint(){
			this.get_source_flag = false;
		}
	}
}
</script>
<style lang="less" scoped>
	.pro_page{
		height: 100%;
		.back_cover{
			top:0;
			bottom: 0;
			z-index: 101;
		}
		.rulse_show_item{
			width: 285px;
			position: fixed;
			top:50%;
			left: 50%;
      transform: translateY(-50%);
			margin-left: -143px;
			border-radius: 9px;
			z-index: 102;
			.rulse_con{
				border-radius: 9px;
				.rulse_con_hd{
					color: #ffffff;
					font-size: 16PX;
					font-weight: bold;
					position: relative;
					letter-spacing: 1px;
					img{
						border-radius: 8px 8px 0 0;
						width: 100%;
					}
					span{
						text-align: center;
						width: 100%;
						position: absolute;
						top:50%;
            left: 50%;
						transform: translate(-50%,-50%);
            z-index: 10;
					}
				}
				.rulse_con_bd{
					text-align: center;
					padding: 20px 30px 30px;
					border-radius: 0 0 8px 8px;
					ul{
						max-height: 105px;
						overflow: hidden;
						overflow-y: scroll;
						flex-wrap: wrap;
						li{
							width: 33%;
						}
					}
				}
			}
			.close{
				text-align: center;
				margin-top: 15px;
				color: #FFFFFF;
				.iconfont{
					font-size: 36PX;
				}
			}
			.pr_detail{
				.rulse_con_bd {
					text-align: left;
          p{
            span{
            	color: #5870FE;
            }
          }
					.flex_item{
            justify-content: flex-start;
						margin-bottom: 15px;
            p{
              width: 70px;
            }
						span{
              flex: 1;
							color: #5870FE;
						}
					}
				}
			}
		}
	}
	.page{
		bottom: 70px;
	}
    .pro_banner{
        width: 100%;
        height: 210px;
		img{
			width: 100%;
			height: 100%;
		}
    }
    .pro_info{
        padding: 12px 15px;
        background-color: #ffffff;
        .pro_hd{
            padding-bottom: 15px;
            border-bottom: 1PX solid #F3F3F3;
        }
        .pro_pic{
            justify-content: start;
            .pro_img{
                width: 50px;
                height: 50px;
                margin-right: 15px;
				img{
					width: 100%;
				}
            }
        }
        .pro_name{
            h1{
                font-size: 16PX;
                margin: 4px 0;
            }
            p{
                font-size: 12PX;
            }
        }
        .pro_treasure a{
            display: block;
            // width: 80px;
            padding: 0 16px;
            height: 30px;
            line-height: 30px;
            font-size: 12PX;
            margin-top: 10px;
            text-align: center;
            color: #ffffff;
            background-color: #5870FE;
            border-radius: 15px;
        }
        .pro_bd{
            padding:15px 0 5px 0;
            border-bottom: 1PX solid #F3F3F3;
            .pro_item{
                margin-bottom: 10px;
                padding-left: 15px;
                justify-content: start;
                position: relative;
                .iconfont{
					font-size: 14PX;
					transform: scale(0.9);
					-webkit-transform: scale(0.9);
					color: #5870FE;
                    position: absolute;
                    left: -4px;
                }
                .pro_label{
                    width: 65px;
                    margin-right: 8px;
                    color: #333333;
                    font-size: 14PX;

                }
                .pro_value{
                    flex: 1;
                    overflow: hidden;
                    word-wrap: break-word;
                    word-break: break-all;
                    color: #666666;
                    font-size: 14PX;

                }
            }
        }
        .pro_intro{
            padding-top: 13px;
            text-align: center;
            a{
                display: inline-block;
                width: 130px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-radius: 16px;
                border: 1px solid #5870FE;
                color: #5870FE;
                font-size: 12PX;
            }
        }
    }
    .pro_module{
        background-color: #ffffff;
        .mod_hd{
            padding: 10px 15px 10px 29px;
            border-bottom: 1PX solid #F3F3F3;
            position: relative;
            font-size: 14PX;
            color: #333333;
            span{
                position: absolute;
                top: 46%;
                left: 15px;
				transform: translateY(-50%);
                width: 4px;
                height: 16px;
                background-color: #5870FE;
            }
        }
        .mod_bd{
            padding: 20px 15px 16px 15px;
            a{
                text-align: center;
                color: #333333;
                justify-content: space-between;
                .pic{
                    display: inline-block;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background-color: #5870FE;
                    box-shadow:0px 6px 12px 0px rgba(99,124,199,0.3);
                    position: relative;
                    margin-bottom: 8px;
                    .market_analys_pic{
                        top: 48%;
                    }
                    img{
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                    }
                    span{
                        display: block;
                    }
                }

            }
        }
        .mod_zs{
            padding: 15px;
            a{
                width: 100%;
                padding: 20px 26px;
                border-radius: 4px;
                box-shadow:0px 2px 10px 0px rgba(216,216,216,0.5);
                box-sizing: border-box;
                position: relative;
                .plat_rules{
					justify-content: flex-start;
					color: #5870FE;
                    img{
                        width: 29px;
                        height: 32px;
                        margin-right: 15px;
                    }
                    span{
                        line-height: 32px;
                    }
                    .close_icon{
                        width: 23px;
                        height: 23px;
                        padding-top: 1px;
                        background-color: #FFB13E;
                        color: #ffffff;
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        border-radius: 0 4px 0  100%;
                        box-sizing: border-box;
                        i{
                            font-size: 12px;
                            margin-left: 6px;
                        }
                    }
                }
                .opacity_h{
                    opacity: .6;
                }
            }
        }
    }


</style>
