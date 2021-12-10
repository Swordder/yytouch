<template>
	<div class="service_hos_detail" data-name="page_service_hos_detail">
		<div class="hos_info">
      <div class="flex_item hos_title">
        <h1>{{hos_name}}</h1>
        <!-- <router-link
          :to="{path:'/updateHosInfo',query:
            {
              hospital_yyid:$route.query.hospital_yyid,
              hos_type: hos_status
            }
          }">
          {{hos_status == 1?'修改':'纠错'}}
        </router-link> -->
      </div>
			<div v-show="hos_level != ''" class="hos_prop flex_item">
				<span>{{hos_level}}</span>
			</div>
			<div v-show="hos_addr != ''&&hos_addr != null" class="addr">
				<i class="iconfont">&#xe68f;</i>
				<span>{{hos_addr}}</span>
			</div>
		</div>
		<div class="product_info_wrap" v-for="(item,index) in product_list" :key="index">
			<div class="product_data">
				<div class="prod_hd bd_bt">
					<div class="prod_title flex_item">
            <p>{{item.product_name}}</p>
            <div v-show="item.chat_data.serve_status_code != 0" class="unbind_btns">
              <button v-if="item.chat_data.serve_status == '解除服务'" type="button" @click="chooseModType('offservice',item.chat_data.serve_yyid)" class="unbind bgcw">解绑服务</button>
              <p v-else>解除服务审核中</p>
            </div>
          </div>
					<div class="rate flex_item">
						<p>服务评级</p>
						<div v-if="item.serve_level == 5" class="level_rate">
							<i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i>
						</div>
						<div v-else-if="item.serve_level == 4" class="level_rate">
							<i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i><i class="iconfont gray">&#xe626;</i>
						</div>
						<div v-else-if="item.serve_level == 3" class="level_rate">
							<i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i><i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i>
						</div>
						<div v-else-if="item.serve_level == 2" class="level_rate">
							<i class="iconfont">&#xe626;</i><i class="iconfont">&#xe626;</i><i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i>
						</div>
						<div v-else-if="item.serve_level == 1" class="level_rate">
							<i class="iconfont">&#xe626;</i><i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i>
						</div>
						<div v-else-if="item.serve_level == 0" class="level_rate">
							<i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i><i class="iconfont gray">&#xe626;</i>
						</div>
					</div>
				</div>
				<div v-if="item.chat_data.serve_status_code == 0" class="empty_status">
					<img src="http://img.youyao99.com/639F0D88ECAB5C70E41BF08EC343CB65.png" alt="">
					<p>审核中</p>
				</div>
				<div v-else class="data_status">
          <!-- <div class="hos_process flex_item">
            <div class="hos_process_title">
              <h2>当前开发进度</h2>
              <p class="fw">
                <strong v-if="item.track_type == '0'">未知</strong>
                <strong v-else-if="item.track_type == '1'">临采</strong>
                <strong v-else-if="item.track_type == '2'">已提单</strong>
                <strong v-else-if="item.track_type == '3'">已上会</strong>
                <strong v-else-if="item.track_type == '4'">药事会通过</strong>
                <strong v-else="item.track_type == '5'">正式采购</strong>
                <span class="font_10">{{item.track_date == ''?'':'('+item.track_date+')'}}</span>
              </p>
            </div>
            <button class="btn_common" @click="chooseModType('update_process',item.series_yyid,index)">更新</button>
          </div> -->
					<div class="graph_wrap">
						<ve-line :data="item.chat_data.chart_data" height="240px" :settings="chartSettings" :extend="chartExtends"></ve-line>
					</div>
					<div class="data_bd animated fadeIn" :class="{show:show_id !== index}">
						<div class="prod_bd">
							<div class="data_show">
								<p class="data_title">当月数据</p>
								<div class="base_data flex_item bd_bt">
									<div class="data_item target_data">
										<p class="val">{{item.chat_data.data_two.target}}</p>
										<p class="val_type font_10">潜力</p>
									</div>
									<div class="data_item other_data flex_item">
										<div class="val_item">
											<p class="val">{{item.chat_data.data_two.month_total}}</p>
											<p class="val_type font_10">实际</p>
										</div>
										<div class="val_item">
											<p v-if="Number(item.chat_data.data_two.month_mom) < 0" class="val green">
												<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(item.chat_data.data_two.month_mom))}}<span class="font_10">%</span>
											</p>
											<p v-else-if="Number(item.chat_data.data_two.month_mom) > 0" class="val red">
												<span class="iconfont">&#xe651;</span>{{parseInt(Math.abs(item.chat_data.data_two.month_mom))}}<span class="font_10">%</span>
											</p>
											<p v-else class="val">
												{{item.chat_data.data_two.month_mom}}-
											</p>
											<p class="val_type font_10">环比</p>
										</div>
										<div class="val_item">
											<p v-if="Number(item.chat_data.data_two.month_an) < 0" class="val green">
												<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(item.chat_data.data_two.month_an))}}<span class="font_10">%</span>
											</p>
											<p v-else-if="Number(item.chat_data.data_two.month_an) > 0" class="val red">
												<span class="iconfont">&#xe651;</span>{{parseInt(Math.abs(item.chat_data.data_two.month_an))}}<span class="font_10">%</span>
											</p>
											<p v-else class="val">
												{{item.chat_data.data_two.month_an}}-
											</p>
											<p class="val_type font_10">同比</p>
										</div>
									</div>
								</div>
							</div>
							<div class="data_show">
								<p class="data_title">{{item.chat_data.data_three.data_three_title}}数据</p>
								<div class="base_data flex_item bd_bt">
									<div class="data_item target_data">
										<p class="val">{{item.chat_data.data_three.target}}</p>
										<p class="val_type font_10">潜力</p>
									</div>
									<div class="data_item other_data flex_item">
										<div class="val_item">
											<p class="val">{{item.chat_data.data_three.total}}</p>
											<p class="val_type font_10">实际</p>
										</div>
										<div class="val_item">
											<p v-if="Number(item.chat_data.data_three.mom) < 0" class="val green">
												<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(item.chat_data.data_three.mom))}}<span class="font_10">%</span>
											</p>
											<p v-else-if="Number(item.chat_data.data_three.mom) > 0" class="val red">
												<span class="iconfont">&#xe651;</span>{{parseInt(Math.abs(item.chat_data.data_three.mom))}}<span class="font_10">%</span>
											</p>
											<p v-else class="val">
												{{item.chat_data.data_three.mom}}-
											</p>
											<p class="val_type font_10">环比</p>
										</div>
										<div class="val_item">
											<p v-if="Number(item.chat_data.data_three.an) < 0" class="val green">
												<span class="iconfont">&#xe605;</span>{{parseInt(Math.abs(item.chat_data.data_three.an))}}<span class="font_10">%</span>
											</p>
											<p v-else-if="Number(item.chat_data.data_three.an) > 0" class="val red">
												<span class="iconfont">&#xe651;</span>{{parseInt(Math.abs(item.chat_data.data_three.an))}}<span class="font_10">%</span>
											</p>
											<p v-else class="val">
												{{item.chat_data.data_three.an}}-
											</p>
											<p class="val_type font_10">同比</p>
										</div>
									</div>
								</div>
							</div>
							<div class="data_show history_data bd_bt">
								<p class="data_title">历史数据</p>
								<div class="total_num">
									<p class="val">{{item.chat_data.data_one.history_total}}</p>
									<p class="val_type font_10">总计</p>
								</div>
								<div class="data_item flex_item">
									<div class="val_item">
										<p class="val">{{item.chat_data.data_one.history_top}}</p>
										<p class="val_type font_10">单月最高 （{{item.chat_data.data_one.history_month}}）</p>
									</div>
									<div class="val_item">
										<p class="val">{{item.chat_data.data_one.month_avg}}</p>
										<p class="val_type font_10">月平均</p>
									</div>
								</div>
							</div>
						</div>
						<OperaBtns :modtype="mod_type" :proyyid = "item.product_yyid" @correctMod = 'chooseModType'></OperaBtns>
					</div>
				</div>
			</div>
			<div v-show="item.chat_data.serve_status_code != 0" class="extend_btn bd_top" @click="showToggle(index)">
				<div v-if="show_id !== index" class="fold">
					<i class="iconfont">&#xe66a;</i>
					点击查看更多
				</div>
				<div v-else class="unfold">
					<i class="iconfont">&#xe625;</i>
					收起
				</div>

			</div>
		</div>
		<!-- 解除服务须知 -->
		<transition name="showcover">
			<div class="back_cover" v-show="mod_type"></div>
		</transition>
		<div class="mod_con remove_intro bgcw" v-show="mod_type == 'offservice'">
			<h2>解除服务须知</h2>
			<p>1.解除服务后，其他优药代表将可以申请在该医院服务该药品</p>
			<p>2.解除服务需要平台进行审核，审核时间一般为3个工作日以内</p>
			<p>3.平台审核通过后，服务解除将会在次月一日正式生效</p>
			<div class="opera_btns flex_item">
				<button type="button" class="btn_common" @click="closeBtn()">取消</button>
				<button type="button" class="btn_common" @click="confirmOff(ser_yyid)">确定</button>
			</div>
		</div>
		<ErrCorrectMod :modtype = 'mod_type' :userinfo = 'user_info' @closeMod="closeBtn"></ErrCorrectMod>
    <!-- 医院开发进度 -->
    <div class="mod_con update_process bgcw" v-show="mod_type == 'update_process'">
    	<h2>请选择当前开发进度</h2>
      <ul>
        <li
          v-for="(item,index) in process_list"
          :class="process_id == index?'active':''"
          :key="index"
          @click="chooseProcess(index)"
        >
          {{item}}
        </li>
      </ul>
    	<div class="opera_btns flex_item">
    		<button type="button" class="btn_common" @click="closeBtn()">取消</button>
    		<button type="button" class="btn_common" @click="updateTrackBtn">确定</button>
    	</div>
    </div>
    <!-- 结束提示 -->
    <div class="mod_con end_status bgcw" v-show="mod_type == 'end_status'">
      <div class="end_pic">
        <img src="http://img.youyao99.com/12D8C3020CB69F56D4A40104E0A52418.png" alt="">
      </div>
      <p class="end_con">开发进度更新完成</p>
      <p class="end_tip">1.5s后自动消失</p>
    </div>
  </div>
</template>
<script>
	import { hosDetailChartSet } from '../../config/util.js'
	import { hospitalInfo, userHosDetail, offService, updateTrack } from '../../api/sendRequest.js'
	import { mapState, mapActions } from 'vuex'
	import OperaBtns from '../../components/OperaBtns.vue'
	import ErrCorrectMod from '../../components/ErrCorrectMod.vue'
	export default {
		data(){
			hosDetailChartSet(this);
			return {
				hos_name:'',
				hos_level:'',
				hos_addr:'',
        hos_status:'',
				product_list:[],
				mod_type:'',
				ser_yyid:'',
				correct_con:'',
				show_id:-1,
        process_list:['临采','已提单','已上会','药事会通过','正式采购'],
        process_id:-1,
        series_yyid:''
			}
		},
		components:{
			OperaBtns,
			ErrCorrectMod
		},
		mounted(){
			this.checkUserInfo();
			this.getHosInfo();
			this.getUserHosDetail();
		},
		computed:{
			...mapState([
				'user_info'
			])
		},
		methods:{
			...mapActions([
				'checkUserInfo'
			]),
			async getHosInfo(){
				let res = await hospitalInfo(this.$route.query.hospital_yyid,this.user_info.yyid,this.user_info.user_token);
				// if(res.errcode == 0){
				this.hos_name = res.data.hospital_name;
				this.hos_level = res.data.level;
				this.hos_addr = res.data.addr;
       			this.hos_status = res.data.modify_type;
				// }
			},
			async getUserHosDetail(){
				let res = await userHosDetail(this.$route.query.hospital_yyid,this.user_info.yyid,this.user_info.user_token);
				// if(res.errcode == 0){
				this.product_list = res.data;
				// }
			},
			async confirmOff(id){
				let res = await offService(id,this.user_info.yyid,this.user_info.user_token);
				if(res.errcode == 0){
					this.getUserHosDetail();
					this.mod_type = '';
				}
			},
		chooseProcess(index){
			if(this.process_id === index){
				return
			} else {
				this.process_id = index;
			}
		},
		showToggle(index){
			if(this.show_id === index){
				this.show_id = -1;
			} else {
				this.show_id = index;
			}
		},
		chooseModType(type,id,index){
			this.ser_yyid = id;

			if(this.mod_type != type){
				this.mod_type = type;
				this.series_yyid = id;
				this.process_id = Number(this.product_list[index].track_type) - 1;
			} else {
				this.mod_type = '';
				this.series_yyid = '';
				this.process_id = -1;
			}

		},
		closeBtn(){
        	this.process_id = -1;
				this.mod_type = '';
		},
      	async updateTrackBtn(){
			if(this.process_id < 0){
				this.$vux.toast.text('请选择开发进度','top');
				return
			}
			let res = await updateTrack(
			this.user_info.yyid,
			this.user_info.user_token,
			this.$route.query.hospital_yyid,
			this.series_yyid,
			Number(this.process_id)+1
			);
			if(res.errcode == 0){
				this.getUserHosDetail();
				this.mod_type = 'end_status';
				this.process_id = -1;
				let _this = this;
				setTimeout(function(){
					_this.mod_type = '';
				},1500);
				} else {
				this.$vux.toast.text('更新失败','top');
				}
			}
		}
	}
</script>
<style lang="less">
.service_hos_detail{
	padding: 20px 15px 20px;
	.hos_info{
		padding:0 5px;
		box-shadow:none;
    .hos_title{
      h1{
        font-size: 18PX;
        // margin-bottom: 8px;
      }
      a{
        width: 60px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        background-color: #5870FE;
        color: #FFFFFF;
        border: none;
        border-radius: 18px;
        font-size: 12PX;
      }
    }

		.hos_prop{
			margin: 8px 0 12px 0;
			span{
				color: #5870FE;
				background-color: #E9ECFF;
				font-size: 12PX;
				padding: 3px 10px 2px;
				border-radius: 15px;
			}
		}
		.addr{
			.iconfont{
				font-size: 16PX;
				color: #5870FE;
				margin-right: 2px;
			}
		}
	}
	.product_info_wrap{
		border-radius: 8px;
		box-shadow:0px 2px 12px 0px rgba(204,213,224,0.5);
		.extend_btn{
			text-align: center;
			padding: 6px 0;
			color: #5870FE;
			.iconfont{
				font-size: 26PX;
				vertical-align: middle;
			}
		}
		.empty_status{
			text-align: center;
			padding:30px 0 20px 0;
			color: #999999;
			img{
				width: 88px;
			}
		}
	}
	.product_data{
		margin: 20px 0 0px 0;
		.prod_hd{
			padding: 15px 20px;
			.prod_title{
				font-size: 16PX;
				font-weight: bold;
        .unbind_btns{
        	font-size: 12PX;
        	.unbind{
        		color: #5870FE;
        		border:1px solid rgba(88,112,254,1);
        		padding: 3px 10px;
        		border-radius: 15px;
        	}
        	p{
        		color: #FF982A;
        		position: absolute;
        		right: 15px;
        		top: 40px;
        	}
        }
			}
			.rate{
				justify-content: flex-start;
				margin: 10px 0 0px 0;
				p{
					font-size: 12PX;
					color: #999999;
					margin-right: 8px;
					line-height: 30px;
				}
				.iconfont{
					font-size: 18PX;
					color: #FFDB4F;
					text-shadow:0px 4px 6px rgba(236,210,112,0.5);
					margin-right: 2px;
				}
				.gray{
					color: #ECEEF3;
					text-shadow:0px 0px 15PX rgba(0,0,0,0.1);
				}
			}
		}
		.show{
			display: none;
		}
    .data_status{
      padding: 20px 20px 0;
      .hos_process{
        padding: 10px 15px;
        background-color: #F7F8FF;
        align-items: center;
        p{
          color: #5870FE;
          margin-top: 8px;
          span{
            font-weight: normal;
            color: #999999;
          }
        }
        button{
          height: 26px;
          width: 60px;
          font-size: 12PX;
          line-height: 26px;
          background-color: #5870FE;
          color: #FFFFFF;
        }
      }
    }
		.graph_wrap{
			height: 240PX;
			overflow: hidden;
			border-bottom: 1px solid #F5F5F5;
		}
		.prod_bd{
			.data_show{
				.data_title{
					margin: 20px 0 15px 0;
				}
				.base_data{
					padding-bottom: 20px;
				}
				.data_item{
					text-align: center;
					height: 60px;
					background-color: #F7F8FF;
					.val{
						font-size: 18PX;
						font-weight: bold;
						.iconfont{
							font-size: 12PX;
							font-weight: normal;
							vertical-align: text-top;
							margin-right: 2px;
						}
					}
					.val_type{
						color: #999999;
						margin-top: -3px;
					}
				}
				.target_data{
					width: 24%;
					vertical-align: middle;
					.val{
						margin-top: 9px;
					}
				}
				.other_data{
					width: 74%;
					align-items: center;
					.val_item{
						flex:1;
						.green{
							color: #4ED79C;
							span{
								transform: rotateY(90deg);
							}
						}
						.red{
							color: #F65B6A;
						}
					}
				}
			}
			.history_data{
				.data_title{
					margin-bottom: 10px;
				}
				.data_item{
					background-color: #FFFFFF;
					.val_item{
						flex: 1;
					}
				}
				.total_num{
					text-align: center;
					margin-bottom: 10px;
					.val{
						font-size: 22PX;
						font-weight: bold;
					}
					.val_type{
						margin-top: -3px;
						color: #999999;
					}
				}
			}
		}
		.opera_btns{
			padding: 20px 0;
			.correct_btn{
				width: 36%;
			}
			.trans_btn{
				width: 60%;
				color: #FFFFFF;
				background-color: #5870FE;
			}
		}

	}
	.mod_con{
		padding: 20px;
		border-radius: 10px;
		h2{
			text-align: center;
			font-weight: bold;
			margin-bottom: 5px;
		}
		p{
			color: #666666;
			margin-bottom: 10px;
		}
		.opera_btns{
			margin-top: 20px;
			button{
				width: 48%;
			}
		}
	}
	.remove_intro,
  .update_process,
  .end_status{
		width: 285px;
		position: fixed;
		top: 20%;
		margin: 0 auto;
		left: 50%;
		margin-left: -142px;
		z-index: 4;
	}
  .update_process{
    ul{
      overflow: hidden;
      margin-top: 15px;
      li{
        width: 100px;
        margin-bottom: 20px;
        float: left;
        line-height: 26px;
        border-radius: 4px;
        text-align: center;
        border: 1px solid #DDDDDD;
        color: #999999;
      }
      .active{
        border-color: #5870FE;
        color: #5870FE;
        background-color: #E9ECFF;
      }
      li:nth-of-type(2n+1){
        margin:0 20px 0 10px;
      }
    }
  }
  .end_status{
    text-align: center;
    .end_pic{
      width: 145px;
      height: 145px;
      margin: 4px auto 20px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      margin-bottom: 0px;
    }
    .end_con{
      color: #333333;
    }
    .end_tip{
      font-size: 12PX;
      color: #999999;
    }
  }
	.showcover-enter-active, .showcover-leave-active {
		transition: opacity .6s
	}
	.showcover-enter, .showcover-leave-active {
		opacity: 0
	}
	.back_cover{
		position: fixed;
		top: 0px;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.6);
	}
}
</style>
