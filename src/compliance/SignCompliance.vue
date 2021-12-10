<template>
    <div class="sign_compliance" data-name="sign_compliance">
        <h3>考试结果</h3>
        <div class="test_res">
            <img v-if="this.$route.query.pass.toString() == 'true'" src="http://img.youyao99.com/2a6536eae71882fd143cfec959fb61b5.png" alt="">
            <img v-else src="http://img.youyao99.com/cf78c29467fbacdc1b7614a7898e7054.png" alt="">
        </div>
        <router-link v-show="this.$route.query.pass.toString() == 'false'" :to="{path:'/exam',query:{exam_yyid:this.$route.query.exam_yyid}}">回到考试主页</router-link>
        <div v-show="this.$route.query.has_agree.toString() == 'true'" class="agree_btn" @click="showPopup">协议书</div>
        <div v-transfer-dom class="show_agree">
            <popup v-model="show" position="bottom" height="100%">
                <h1>协议书</h1>
                <div class="popup_content" v-html="data.content">
                </div>
                <div class="sign_btn">
                    <p @click="agreeSign" :class="[agree?'blue':'']">
                        <i v-if="agree" class="iconfont">&#xe601;</i>
                        <i v-else class="iconfont">&#xe668;</i>
                        我已阅读并同意协议书
                    </p>
                    <button @click="signature()">确定</button>
                </div>
            </popup>
        </div>
        <!-- 手写签名    -->
        <div  v-transfer-dom>
        <x-dialog v-model="showSign" hide-on-blur :dialog-style="{'background-color': 'transparent'}">
            <vueSignature ref="signature" :sigOption="option" :w="'330px'" :h="'130px'"></vueSignature>
            <div>
               <x-button mini type="warn" @click.native="clear()">清 空</x-button>
               <x-button mini type="primary" @click.native="submitSignature()">确 定</x-button>
            </div>
            <br>
            <x-icon type="ios-close-outline" style="fill:#fff;" @click.native="showSign=false"></x-icon>
        </x-dialog>
        </div>
        <!-- pdf -->
        <div  v-transfer-dom>
        <x-dialog v-model="showPdf" hide-on-blur :dialog-style="{'overflow':'auto','display':'inline'}" @on-hide="closePdf()">
            <pdf
                v-for="i in numPages"
                :key="i"
                ref="pdf"
                :src="pdfSrc"
                :page="i"
                >
            </pdf>
            <x-icon type="ios-close" @click="closePdf()"></x-icon>
        </x-dialog>
        </div>
    </div>
</template>
<script>
import { complianceAgree,complianceSign } from '../../api/sendRequest';
import { TransferDom, Popup, Group, Toast, XDialog, XButton } from 'vux'
import { mapState } from 'vuex';
import vueSignature from 'vue-signature';
import pdf from 'vue-pdf';

export default {
    directives: {
        TransferDom
    },
    data(){
        return{
            show:false,
            data:{},
            agree:false,
            signImg: undefined,
            showSign:false,
            showPdf:false,
            numPages:1,
            pdfSrc:undefined,
            option: {
                penColor:"rgb(0, 0, 0)",
                backgroundColor:"rgb(255,255,255)"
            }
        }
    },
    computed:{
        ...mapState([
            'user_info',
        ])
    },
    components:{
        TransferDom, Popup, Group, Toast, XDialog, vueSignature, XButton, pdf
    },
    mounted(){
    },
    methods:{
        async showPopup(){
            this.show = !this.show;
            let res = await complianceAgree(this.user_info.yyid,this.user_info.user_token,this.$route.query.exam_yyid);
            this.data = res.data;
        },
        agreeSign(){
            this.agree = !this.agree;
        },
        async signature(){
            if(!this.agree){
                this.$vux.toast.text('请点击同意书','top');
                return
            }
            this.showSign = true;
            var _this = this;

			this.$nextTick().then(() => {
				_this.$refs.signature.draw();
			});
        },
        async submitSignature(){
            var _this = this;
            this.signImg = _this.$refs.signature.save('image/jpeg')
            this.showSign = false;
            let res = await complianceSign(this.user_info.yyid,this.user_info.user_token,this.$route.query.exam_yyid,this.signImg);
            if (res.errcode !== 0) {
                this.$vux.toast.text(res.errmsg,'top');
            } else {
                this.show = false;
                this.showPdfInfo(res.data.pdf)
            }
		},
        async clear(){
            var _this = this;
            _this.$refs.signature.clear();
		},
        async showPdfInfo(pdfUrl){
          this.showPdf = true;
          this.pdfSrc = pdf.createLoadingTask(pdfUrl, {withCredentials: false});
          let _this = this;
          _this.$vux.loading.show({ text: 'Loading' })
          this.pdfSrc.promise.then(pdf => {
              this.numPages = pdf.numPages;
              _this.$vux.loading.hide();
          }).catch(reason=>{
          });
            // this.showPdf = true;
            // this.pdfSrc = pdf.createLoadingTask(pdfUrl);
            // let _this = this;
            // _this.$vux.loading.show({ text: 'Loading' })
            // this.pdfSrc.promise.then(pdf => {
            //     this.numPages = pdf.numPages;
            //     _this.$vux.loading.hide();
            // });
        },
        async closePdf(){
            this.showPdf = false;
            if (this.signImg) {
                this.$router.push({path:'/exam'})
            }
		}
    }
}
</script>
<style lang="less">
.sign_compliance{
    text-align: center;
    h3{
        margin: 60px auto 60px;
        font-size: 18PX;
    }
    a{
        position: fixed;
        bottom: 15px;
        left: 15px;
        right: 15px;
        line-height: 36px;
        color: #ffffff;
        background-color: #5870FE;
        display: inline-block;
        margin-top: 100px;
        border-radius: 18px;
    }
    .agree_btn{
        height: 80px;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        padding-top: 30px;
        font-weight: bold;
        border-radius: 8px 8px 0 0;
        box-shadow: 0px 0px 10px 0px rgba(204, 213, 224, 0.5);
        &::before{
            content: '';
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 6px;
            border-radius: 3px;
            background-color: #5870FE;
        }
    }

}
.show_agree{
    .vux-popup-dialog{
        padding: 15px 15px 110px;
        background-color: #ffffff;
        h1{
            text-align: center;
            margin-bottom: 10px;
            font-size: 14PX;
        }
        .popup_content{
            color: #666666;
            line-height: 22px;
        }
    }
    .sign_btn{
        position: fixed;
        left: 15px;
        right: 15px;
        bottom: 0;
        padding-bottom: 15px;
        background-color: #ffffff;
        p{
            .iconfont{
                margin-right: 6px;
                vertical-align: middle;
            }
            color: #999999;
            text-align: center;
            margin: 5px auto 8px;
        }
        .blue{
            color: #5870FE;
        }
        button{
            width: 100%;
            background-color: #5870FE;
            color: #ffffff;
            border: none;
            line-height: 40px;
            border-radius: 20px;
        }
    }
}

</style>
