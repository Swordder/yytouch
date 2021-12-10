<template>
	<div class="certify_page pd_15" data-name="update_hos_info">
		<div class="flex_item bd_bt">
			<div class="c_title"><i class="iconfont">&#xe603;</i>医院名称</div>
			<div class="c_bd">
				<input class="bgcw" v-model.trim="name_value" type="text" placeholder="请输入医院名称">
			</div>
		</div>
    <p class="font_10 tip">请输入完整的标准名称，不要使用简称</p>
    <div class="" style="position: relative;">
      <i class="iconfont" style="position: absolute; top: -5px;left: -15px;color: #FF5252;">&#xe603;</i>
      <group>
        <popup-picker
          :data="hos_list"
          @on-change="onChange"
          :class="this.level != '请选择'?'level_blue':''"
          v-model="level"
          >
          <template slot="title" slot-scope="props">
            <div class="c_title">
              <span>等级</span>
            </div>
          </template>
        </popup-picker>
      </group>
    </div>
		<div class="agent_btn">
			<a href="javascript:;" @click="updateHosInfoBtn">{{$t('sub_btn')}}</a>
		</div>
    <!-- 更新成功提醒 -->
    <transition name="showcover">
    	<div class="back_cover" v-show="mod_type"></div>
    </transition>
    <div class="mod_con end_status bgcw" v-show="mod_type == 'end_status'">
      <div class="end_pic">
        <img src="http://img.youyao99.com/12D8C3020CB69F56D4A40104E0A52418.png" alt="">
      </div>
      <p class="end_con" v-if="$route.query.hos_type=='1'">医院信息修改完成</p>
      <p class="end_con" v-else="$route.query.hos_type=='2'">纠错信息已提交，审核后生效</p>
      <p class="end_tip">1.5s后自动消失</p>
    </div>
	</div>
</template>

<script>
	import { Group,PopupPicker } from 'vux'
	import { updateHosInfo } from '../../api/sendRequest.js'
	import { setSessionStore, getSessionStore, removeSessionStore, throttle } from '../../config/util.js'
	import { mapState,mapMutations,mapActions} from 'vuex'
	export default {
		data() {
			return {
				name_value:'',
        hos_list:[['未知','三级甲等','三级乙等','三级丙等','二级甲等','二级乙等','二级丙等','一级甲等','一级乙等','一级丙等']],
				level:['请选择'],
        mod_type:''
			};
		},
		components:{
      Group,
			PopupPicker
		},
		computed: {
		    ...mapState([
		        'user_info',
				'yyid_list',
		    ]),
		},
		mounted(){
			this.checkUserInfo();
		},
		methods:{
			...mapMutations([
				'INIT_CART_LIST',
			]),
			...mapActions([
				'checkUserInfo'
			]),
      onChange (val) {
        if(val[0] == '请选择'){
          this.level[0] = '未知'
        }
      },
      async updateHosInfoBtn(){
        if(this.name_value == ''){
          this.$vux.toast.text('请填写医院的标准名称','top');
          return
        };
        if(this.level == '请选择'){
          this.$vux.toast.text('请选择医院等级','top');
          return
        };
        let res = await updateHosInfo(
          this.user_info.yyid,
          this.user_info.user_token,
          this.$route.query.hospital_yyid,
          this.name_value,
          this.level
        );
        if(res.errcode == 0){
          this.mod_type = 'end_status';
          let _this = this;
          setTimeout(function(){
            _this.mod_type = '';
            _this.$router.push({
              path:'/serviceHosDetail',
              query:{
                hospital_yyid:_this.$route.query.hospital_yyid
              }
            })
          },1500);
        } else {
          this.$vux.toast.text('更新失败','top');
        }

      },
      // 函数节流的应用
      fnThrottle:throttle(function () {
        this.submintCertifyInfo()
      },1000),
		}
	}
</script>
<style lang="less">
.weui-toast.weui-toast_text{
	min-height: 0;
	background-color: #F65B6A;
	width: 100% !important;
	top: 0px;
}
.weui-toast_text .weui-toast__content{
	width: 100%;
}
.vux-no-group-title{
  margin-top: 0 !important;
}
.level_blue .vux-cell-value{
  color: #5870FE !important;
}
.weui-cells{
  &::before{
    border-top: none !important;
  }
  .weui-cell{
    font-size: 14PX;
    padding-left: 0;
    padding-right: 0;
  }
}
.vux-popup-header-right{
  color: #5870FE !important;
}
.certify_page{
	.flex_item{
		height: 44px;
		line-height: 44px;
		justify-content: flex-start;
		align-items: center;
		.c_title{
			flex: 1;
			position: relative;
			.iconfont{
				position: absolute;
				top: -5px;
				left: -15px;
				color: #FF5252;
			}
		}

		a{
			flex: 2;
		}
		.c_bd{
			flex: 2;
			color: #BBBBBB;
			justify-content: space-between;
			.c_num{
				color: #5870FE;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
		.flex_end{
			justify-content: flex-end;
		}
		input{
			border: none;
      width: 100%;
			line-height: 30px;
			outline-style: none;
		}
	}
  .tip{
    color: #FF5555;
    text-align: right;
    margin-right: -15px;
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
  .end_status{
    width: 285px;
    position: fixed;
    top: 20%;
    margin: 0 auto;
    left: 50%;
    margin-left: -142px;
    z-index: 14;
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
  	z-index: 12;
  	background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
