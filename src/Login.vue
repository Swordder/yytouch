<template>
    <div class="login" data-name="page_login">
      <div class="banner">
        <img src="http://img.youyao99.com/747A2F5C95E2C3B0FBEF98F90DB59F03.png" alt="">
      </div>
      <form action="" method="post" id="loginForm">
          <div class="phone_num in_txt">
              <i class="iconfont">&#xe73d;</i>
              <input type="number" name="" @input='limitLen()' id="phone_num" maxlength="11" placeholder="请输入手机号码" v-model.trim="phone_num">
          </div>
          <div class="code in_txt">
              <i class="iconfont">&#xe614;</i>
              <input type="number" name="" id="code" @input='limitLen()' maxlength="6" placeholder="请输入验证码" v-model.trim="code">
              <button type="button" class="btn_code" @click="sendCode()">{{send_code}}</button>
          </div>
          <button type="button" class="login_btn" @click="login()">登录/注册</button>
      </form>
      <GetRoute v-show="get_source_flag" :get_source_flag = "get_source_flag" @getSourceBtn="submint"></GetRoute>
    </div>
</template>
<script>
import { getCode, loginPlat, getUserResource } from '../api/sendRequest'
import { setStore,getStore } from '../config/util'
import { mapState,mapMutations } from 'vuex'
import GetRoute from '../pages/GetRoute'
export default {
    data(){
        return {
          phone_num : '',
          code:'',
          send_code:'发送验证码',
          timer:null,
          loginTxt:'登录/注册',
          get_source_flag:false
        }
    },
    components:{
      GetRoute
    },
    computed: {
        ...mapState([
            'user_info',
        ]),
    },
    mounted () {
      if(this.user_info && this.user_info.yyid){
        window.location = window.location.origin;
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      countDown(){
        let count = 60;
        let _this = this;
        _this.timer = setInterval(() => {
            count --;
            _this.send_code = count + 's';
            if (count <= 0) {
                clearInterval(_this.timer);
                this.disabled = false;
                _this.send_code = '发送验证码';
                _this.timer = null;
            }
        }, 1000);
      },
      async sendCode(){
        if (this.timer) {
            return
        };

        let reg = /^1[0-9]{10}$/;//验证手机号
        if (this.phone_num == '') {
            this.$vux.toast.text('请输入手机号','top');
        } else {
          if (!reg.test(this.phone_num)) {
              this.$vux.toast.text('手机号码格式不正确','top');
          } else {
              this.countDown();
              let res = await getCode(this.phone_num);
          }
        }
      },
      async login(){

        let regNum = /^1[0-9]{10}$/;//验证手机号
        let regCode = /^[0-9]{6}$/;//验证验证码

        if (this.phone_num  == '' || this.code == '') {
            this.$vux.toast.text('请输入手机号或验证码','top');
            return;
        };
        if (!regNum.test(this.phone_num) || !regCode.test(this.code)) {
            this.$vux.toast.text('手机号或验证码格式错误','top');
            return
        };

        let res = await loginPlat(this.phone_num,this.code,'');
        let redirect = decodeURIComponent(this.$route.query.redirect);
        if (res.errcode != 0) {
            this.$vux.toast.text(res.errmsg,'top');
            return
        } else {
          this.RECORD_USERINFO(res.data);

          // 判断公众号获取来源是否显示
          let is_new = getStore('is_new');
          if(is_new == 'true' || res.data.is_new == false){
            this.get_source_flag = false;
            setStore('is_new',true)
            this.submint();
          } else {
            this.get_source_flag = true
          }

        }
      },
      submint(){
         // 判断公众号获取来源是否显示
        this.get_source_flag = false;
        let redirect = decodeURIComponent(this.$route.query.redirect);
        if(this.$route.query.series_yyid){
          this.$router.push({path: redirect,query:{'series_yyid':this.$route.query.series_yyid,product_yyid:this.$route.query.product_yyid}});
        } else if((this.$route.fullPath.indexOf('login') != -1) || (redirect.indexOf('login') != -1)){
          this.$router.push({path:'/'});
        } else {
          window.location = `${window.location.origin}/v2wx/`
        }
      },
      limitLen(){
        if(this.phone_num.length >= 11){
          this.phone_num = this.phone_num.substr(0,11)
        }
        if(this.code.length >= 6){
          this.code = this.code.substr(0,6)
        }
      }
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
  .login{
    .banner{
      width: 100%;
      height: 150px;
      color: #ffffff;
      text-align: center;
      line-height: 150px;
      margin-bottom: 50px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    #loginForm{
      padding: 0 35px;
      .in_txt{
        width: 100%;
        padding: 11px 0;
        border-bottom: 1PX solid #d6d4d4;
        margin-bottom: 18px;
        box-sizing: border-box;
        padding-left: 35px;
        position: relative;
        .iconfont{
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
          -o-transform: translateY(-50%);
          font-size: 22px;
        }
        input{
          width: 66%;
          border: none;
          padding: 5px;
          outline-style: none;
        }
      }
      .phone_num {
        input{
          width: 100%;
        }
      }
      .code{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        .btn_code{
          width: 90px;
          height: 30px;
          font-size: 12px;
          border: 1PX solid #5870FE;
          color: #5870FE;
          text-align: center;
          border-radius: 15px;
          background-color: #ffffff;
        }
      }
      .login_btn{
        width: 100%;
        height: 44px;
        font-size: 16px;
        border-radius: 22px;
        margin-top: 32px;
        background-color: #5870FE;
        color: #ffffff;
        border: none;
      }
    }
  }
</style>
