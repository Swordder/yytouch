<template>
    <div class="helper_page" data-name="page_helper">
      <NavBar></NavBar>
      <div class="page">
        <header>
          <div class='f_reminder'>
            <div class="bgc_b"></div>
          </div>
          <div class="f_r_con bgcw">
            <div v-if="user_info&&user_info.yyid">
              <router-link v-if="msg_data&&msg_data.created_time" to="/news">
                <div class="f_r_data">
                  <div class="f_r_hd"><i class="iconfont">&#xe602;</i><span>{{msg_data.created_time}}</span></div>
                  <p>{{msg_data.sub_title?msg_data.sub_title:'无数据'}}</p>
                </div>
              </router-link>
              <div v-else class="f_r_empty">
                <img src="http://img.youyao99.com/5B72F13A7CCC0428310B4524AAE8FC96.png" alt="">
                <p>暂无流向数据</p>
              </div>
            </div>
            <a v-else @click="login">
              <div class="pic_icon flex_item">
                <img src="http://img.youyao99.com/CC3148B3684077C16D1CFA9D775187E3.png" alt="" srcset="">
                <div class="f_tip">
                  <h4>账号未登录</h4>
                  <p>暂无查看权限</p>
                </div>
              </div>
            </a>
            <div class="f_r_btn" v-show="(Object.keys(user_info).length === 0) || (Object.keys(msg_data).length != 0)">
              <a href="javascript:;">消息提醒<span v-show="msg_data.unread != 0" class="red"></span></a>
            </div>
          </div>
        </header>
        <section class="bgcw">
          <h3>{{$t('my_tools')}}</h3>
          <div class="hp_mod flex_item">
            <!-- <router-link :to="{path:'/productInfo',query:{product_yyid:'1CFA19C5921EFAA41E8A03B3E852B7AC',series_yyid:'529435CCE7AB708DC55BAE3A1486DD03'}}" class="item_hp pro_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>{{$t('prod_book')}}</h5>
              </div>
            </router-link> -->
            <router-link to="/myFavorites" class="item_hp fav_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>{{$t('fav')}}</h5>
              </div>
            </router-link>
            <router-link to="/compliance" class="item_hp train_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>{{$t('train')}}</h5>
              </div>
            </router-link>
            <router-link to="/visitIndex" class="item_hp train_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>拜访系统</h5>
              </div>
            </router-link>
            <!-- <router-link to="/pubClass" class="item_hp pc_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>{{$t('course')}}</h5>
              </div>
            </router-link>
            <router-link to="/live" class="item_hp live_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>{{$t('live')}}</h5>
              </div>
            </router-link> -->
            <router-link to="/myInvitation" class="item_hp train_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>我的邀请</h5>
              </div>
            </router-link>
            <router-link to="/myDocGroup" class="item_hp train_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>我的医生群组</h5>
              </div>
            </router-link>
            <router-link to="/agentGroup" class="item_hp train_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>我的代表群组</h5>
              </div>
            </router-link>
            <router-link :to="{path:'/wxCode',query:{type_yyid:'EB0E428E924055A20E7C71A0FD55667C'}}" class="item_hp pro_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>我的二维码</h5>
              </div>
            </router-link>
            <router-link :to="{path:'/surveyList'}" class="item_hp pro_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>问卷系统</h5>
              </div>
            </router-link>
            <router-link :to="{path:'/yyInvite'}" class="item_hp pro_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>优云邀请</h5>
              </div>
            </router-link>
            <!-- 报表力蜚能开始 -->
            <!-- <template v-show="rp_auth.length !== 0" v-for="item in rp_auth">
              <router-link v-if="item.report_type == 1" :to="{path:'/reportHome',query:{node_yyid:item.node_yyid}}" class="item_hp rp_hp">
                <i class="bg_img"></i>
                <div class="item_con">
                  <h5>{{item.report_name}}<br/>{{item.report_area_name}}</h5>
                </div>
              </router-link>
              <router-link v-else-if="item.report_type == 2"
                :to="{
                  path:'/areaReport',
                  query:{
                    node_yyid:item.node_yyid,
                    area:item.report_area_name.slice(0,-4),
                    total_id:area_id_arr.indexOf('1') != -1?rp_auth[0].node_yyid:item.node_yyid
                  }
                }"
                    class="item_hp rp_hp">
                <i class="bg_img"></i>
                <div class="item_con">
                  <h5>{{item.report_name}}<br />{{item.report_area_name}}</h5>
                </div>
              </router-link>
            </template> -->
            <!-- 报表力蜚能结束 -->
            <router-link v-show="user_info&&user_info.yyid&&user_info.is_agent == 2&&com_tool_show&&fs_show" to="/fsBonus" class="item_hp ic_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>{{$t('fs_bonus')}}</h5>
              </div>
            </router-link>
            <router-link v-show="user_info&&user_info.yyid&&user_info.is_agent == 2&&com_tool_show&&td_show" to="/treandaBonus" class="item_hp ic_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>{{$t('tr_bonus')}}</h5>
              </div>
            </router-link>
            <router-link v-show="user_info&&user_info.yyid&&user_info.is_agent == 2&&com_tool_show&&ni_show" to="/niferexBonus" class="item_hp ic_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>{{$t('ni_bonus')}}</h5>
              </div>
            </router-link>
            <router-link v-show="user_info&&user_info.yyid&&user_info.is_agent == 2&&com_tool_show&&this.cal_data.length === 0" to="/calEmpty" class="item_hp ic_hp">
              <i class="bg_img"></i>
              <div class="item_con">
                <h5>{{$t('bonus')}}</h5>
              </div>
            </router-link>
            
          </div>
        </section>
      </div>
	</div>
</template>
<script>
import NavBar from '../components/NavBar'
import { messageListDetail ,servicePro } from '../api/sendRequest'
import { mapState,mapActions} from 'vuex'
export default {
    data(){
        return {
            tran_data:{},
            msg_data:{},
            cal_data : [],
            com_tool_show:false,
            fs_show : false,
            td_show:false,
            ni_show:false,
            rp_auth:[],
            area_id_arr:[]
        }
    },
    computed: {
        ...mapState([
            'user_info',
        ]),
    },
    mounted() {
        if (this.user_info&&this.user_info.yyid) {
            this.tranRem();
            this.serPro();
        }

    },
    components:{
        NavBar,
    },
    methods: {
      ...mapActions([
        'checkUserInfo'
      ]),
      login(){
          this.$router.push({path:'/login',query:{redirect: this.$route.fullPath}})
      },
      async tranRem(){
        this.checkUserInfo();
        let res = await messageListDetail(this.user_info.yyid,this.user_info.user_token,1,'');
        if (res.errcode == 0) {
          this.msg_data = res.data;
        } else {
          this.$vux.toast.text(res.errmsg,'top');
        }
      },
      async serPro(){
        this.checkUserInfo();
        let arr = [];
        let res = await servicePro(this.user_info.yyid,this.user_info.user_token);
        this.cal_data = res.data;
        if(this.user_info.company_yyid == '338EEF6193A011E7BAD8A1F3E2912E36'){
          this.com_tool_show = true;
        }

        if(res.data != ''){
          for(var i = 0; i < res.data.length ; i ++){
            arr.push(res.data[i].series_yyid);
          }
          if(arr.indexOf('529435CCE7AB708DC55BAE3A1486DD03') != -1){
            this.fs_show = true;
          };
          if(arr.indexOf('7593D0F105A9E084F0BBFBE945B8F633') != -1){
            this.td_show = true;
          };
          if(arr.indexOf('E79FEAAAE849C8BC45F176E34EE7E75A') != -1){
            this.ni_show = true;
          }
        }
      },
    },

  }
</script>
<style lang="less" scoped>
	.helper_page{
		height: 100%;
	}
    header{
        position: relative;
        width: 100%;
        height: 125px;
		background-color: #F5F5F5;
    }
    .f_reminder{
        width: 100%;
        height: 125px;
        position: relative;
        background:linear-gradient(top , #4661FF,#4E78FF);
        background:-webkit-linear-gradient(top , #4661FF,#4E78FF);
        border-radius: 0% 0 40% 40%;
        overflow: hidden;
        .bgc_b{
            width: 86%;
            height: 135%;
            background:linear-gradient(left ,#4661FF, #4E78FF);
            background:-webkit-linear-gradient(left ,#4661FF, #4E78FF);
            border-radius: 0 0 90% 42%;
            position: absolute;
            top: -50px;
            left: -16px;
            z-index: 2;
        }

    }
    .f_r_con{
        width: 90%;
        height: 110px;
        border-radius: 4px;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        box-sizing: border-box;
        padding: 15px;
        box-shadow:0px 2px 12px 0px rgba(0,36,207,0.08);
        a{
            display: block;
            color: #333333;
        }
        .pic_icon{
            justify-content: start;
            align-items: center;
            .f_tip{
                h4{
                    font-size: 16PX;
                    margin-bottom: 6px;
                }
                p{
                    color: #848484;
                }
            }
            img{
                width: 117px;
                height: 80px;
                margin-right: 20px;
            }
        }
        .f_r_data{
            .f_r_hd{
                color: #999999;
                margin-bottom: 16px;
                font-size: 12PX;
                .iconfont{
                    font-size: 14PX;
                    margin-right: 5px;
                }
            }
            p{
                font-size: 14PX;
                font-weight: bold;
            }
        }
        .f_r_empty{
            text-align: center;
            img{
                width: 54px;
                height: 62px;
                margin: -5px 0 4px 0;
            }
        }
        .f_r_btn{
            a{
                display: inline-block;
                width: 60px;
                height: 24px;
                line-height: 24px;
                background-color: #5870FE;
                border-radius: 10px 0 10px 0;
                color: #ffffff;
                font-size: 12PX;
                transform: scale(.9);
                text-align: center;
                position: absolute;
                top: 10px;
                right: 15px;
            }
            .red{
                display: inline-block;
                position: absolute;
                top: -4px;
                right: -4px;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: #F65B6A;
            }
        }
    }
    section{
      border-top: 25px solid #F5F5F5;
      h3{
          font-size: 14PX;
          font-weight: normal;
          padding: 10px 15px;
          border-bottom: 1PX solid #f3f3f3;
      }
      .hp_mod{
          justify-content: flex-start;
          flex-wrap: wrap;
          text-align: center;
          .item_hp{
              width: 33.33333%;
              box-sizing: border-box;
              padding: 26px 0px 26px 0px;
              border-bottom: 1px solid #F3F3F3;
              border-right: 1px solid #F3F3F3;
              .bg_img{
                  display: inline-block;
                  background: url('../assets/images/helper.png') no-repeat;
                  background-size: 4.266666rem;
                  margin-bottom: .266667rem;
              }
              h5{
                color: #666666;
                font-weight: normal;
              }
              p{
                  font-size: 12PX;
                  -webkit-transform-origin: 0% 00%;
                  transform-origin: 0% 0%;
                  transform: scale(.9);
                  color: #999999;
              }
              .iconfont{
                  color: #BEDBF4;
                  font-size: 16PX;
                  position: absolute;
                  top: 15px;
                  right: 15px;
              }
          }
          .item_hp:nth-child(3n){
            border-right: none 0;
          }
          .pro_hp .bg_img{
              width: 26px;
              height: 35px;
              background-position: 0 0;
          }
          .fav_hp .bg_img{
              width: 29px;
              height: 34px;
              background-position: -27px 0;
          }
          .train_hp .bg_img{
              width: 32px;
              height: 32px;
              background-position: -57px 0px;
          }
          .nav_hp .bg_img{
              width: 32px;
              height: 30px;
              background-position: -57px 0;
          }
          .pc_hp .bg_img{
              width: 35px;
              height: 35px;
              background-position: -89px -0;
          }
          .live_hp .bg_img{
              width: 32px;
              height: 34px;
              background-position: -125px -0;
          }
          .ic_hp .bg_img{
              width: 31px;
              height: 31px;
              background-position: -37.5px -35px;
          }
          .rp_hp .bg_img{
            width: 32px;
            height: 32px;
            background-position: -2px -35px;
          }
      }
    }
</style>
