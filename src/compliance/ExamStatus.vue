<template>
    <div class="exam_success" data-name="exam_status">
        <ul class="content">
            <li>
                <template v-if="data.status == 1">
                    <a href="javascript:;">
                        <h5>{{data.name}}</h5>
                        <div class="test_status flex_item">
                            <div class="result_status result_succ">
                                <i class="success"></i>
                            </div>
                        </div>
                    </a>
                </template>
                <template v-else-if="data.status == 0">
                    <a href="javascript:;">
                        <h5>{{data.name}}</h5>
                        <div class="test_status flex_item">
                            <template v-if="data.exam_end != null">
                                <div class="time">
                                    <p class="m_bottom"><i class="iconfont">&#xe6fa;</i><span>开始时间：</span> {{data.exam_start.split(' ')[0]}}</p>
                                    <p><i class="iconfont">&#xe6fa;</i><span>结束时间：</span> {{data.exam_end.split(' ')[0]}}</p>
                                </div>
                            </template>
                            <template v-else>
                                <div class="time blue">
                                    <i class="iconfont">&#xe602;</i>
                                    无限时
                                </div>
                            </template>
                            <div class="result_status">
                                <i class="pending"></i>
                            </div>
                        </div>
                    </a>
                </template>
                <template v-else-if="data.status == 3">
                    <a href="javascript:;">
                        <h5>{{data.name}}</h5>
                        <div class="test_status flex_item">
                            <template v-if="data.exam_end != null">
                                <div class="time">
                                    <p class="m_bottom"><i class="iconfont">&#xe6fa;</i><span>开始时间：</span> {{data.exam_start.split(' ')[0]}}</p>
                                    <p><i class="iconfont">&#xe6fa;</i><span>结束时间：</span> {{data.exam_end.split(' ')[0]}}</p>
                                </div>
                            </template>
                            <template v-else>
                                <div class="time blue">
                                    <i class="iconfont">&#xe602;</i>
                                    无限时
                                </div>
                            </template>
                            <div class="result_status">
                                <i class="unpass"></i>
                            </div>
                        </div>
                    </a>
                </template>
            </li>
        </ul>
        <div class="exam_rules">
            <h3>考试说明</h3>
            <p>{{data.introduce}}</p>
        </div>
        <div class="sign_status">
            <div class="sign_item review_exam" v-show="data.status == 1 || data.status == 3">
                <div class="up">
                    <h4>回顾答题</h4>
                    <p>交卷时间：{{data.pass_time}}</p>
                </div>
                <div class="down">
                    <router-link :to="{path:'/examResult',query:{exam_yyid:data.yyid}}">回顾</router-link>
                </div>
            </div>
            <div v-show="data.has_agreement && data.status == 1">
                <div class="sign_item sign" v-if="data.is_agree == 0">
                    <div class="up">
                        <h4>协议签署</h4>
                    </div>
                    <div class="down">
                        <button @click="showPopup(true)">签署</button>
                    </div>
                </div>
                <div class="sign_item signed" v-else-if="data.is_agree == 1">
                    <div class="up">
                        <h4>协议签署</h4>
                        <p>签署时间：{{data.agree_time}}</p>
                    </div>
                    <div class="down">
                        <button @click="showPdfInfo(data.agree_pdf)">查看协议</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="data.status == 0 || data.status == 3" class="exam_button">
            <router-link :to="{path:'/examContent',query:{exam_yyid:data.yyid}}">开始考试</router-link>
        </div>
        <!-- 协议 -->
        <!-- <div class="agree_btn" @click="showPopup">协议书</div> -->
        <div v-transfer-dom class="show_agree">
            <popup v-model="show" position="bottom" height="100%">
                <p class="closebtn" @click="show = !show"><i class="iconfont">&#xe615;</i></p>
                <h1>协议书</h1>
                <div class="popup_content" v-html="sign_data.content">
                </div>
                <div class="sign_btn" v-show="type">
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
import { testInfo,complianceAgree,complianceSign } from '../../api/sendRequest';
import { mapState } from 'vuex';
import { TransferDom, Popup, Group, Toast, XDialog, XButton } from 'vux';
import vueSignature from 'vue-signature';
import pdf from 'vue-pdf';

export default {
    directives: {
        TransferDom
    },
    data(){
        return {
            value:'',
            data:{},
            sign_data:{},
            show:false,
            agree:false,
            type:true,
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
            'user_info'
        ])
    },
    mounted(){
        this.getTestInfo();
    },
    methods:{
        async showPopup(type){
            this.type = type;
            this.show = !this.show;
            let res = await complianceAgree(this.user_info.yyid,this.user_info.user_token,this.$route.query.exam_yyid);
            this.sign_data = res.data;
        },
        agreeSign(){
            this.agree = !this.agree;
        },
        async getTestInfo(){
            let res = await testInfo(this.user_info.yyid,this.user_info.user_token,this.$route.query.exam_yyid);
            this.data = {...res.data};
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
    },
    components:{
        TransferDom, Popup, Group, Toast, XDialog, vueSignature, XButton, pdf
    }
}
</script>
<style lang="less" scoped>
    @import '../../assets/css/complianceInner.less';
    .exam_success{
        font-size: 12PX;
        padding: 15px;
        ul{
            padding: 5px;
            li{
                background-color: #ffffff;
                margin-bottom: 16px;
                a{
                    display: block;
                    h5{
                        font-size: 16PX;
                        margin-bottom: 15px;
                    }
                    .test_status{
                        font-size: 14PX;
                        color: #333333;
                        align-items: center;
                        position: relative;
                        .time{
                            .m_bottom{
                                margin-bottom: 8px;
                            }
                            .iconfont{
                                color: #5870FE;
                                font-size: 14PX;
                                margin-right: 4px;
                            }
                            span{
                                color: #999999;
                            }
                        }
                        .blue{
                            color: #5870FE;
                            font-weight: bold;
                        }
                        .result_status{
                            i{
                                display: inline-block;
                                width: 58px;
                                height: 44px;
                                background: url('http://img.youyao99.com/2a6536eae71882fd143cfec959fb61b5.png') left center no-repeat;
                                background-size: cover;
                            }
                            .pending{
                                background: url('http://img.youyao99.com/6fd4005e027ddb459b1114e1ad0f683f.png') left center no-repeat;
                                background-size: cover;
                            }
                            .unpass{
                                background: url('http://img.youyao99.com/cf78c29467fbacdc1b7614a7898e7054.png') left center no-repeat;
                                background-size: cover;
                            }
                        }
                        .result_succ{
                            position: absolute;
                            top: -42px;
                            right: 0;
                            z-index: 10;
                        }
                    }
                }
            }
        }
        .exam_rules{
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0px 2px 10px 0px rgba(216, 216, 216, 0.5);
            h3{
                font-size: 14PX;
                margin-bottom: 10px;
                padding-left: 10px;
                position: relative;
                &::before{
                    content: '';
                    width: 4px;
                    height: 14px;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    border-radius: 2px;
                    background-color: #5870FE;
                }
            }
            p{
                margin-bottom: 10px;
                margin-left: 9px;
                color: #999999;
            }
        }
        .sign_status{
            .sign_item{
                width: 345px;
                height: 180px;
                font-size: 14PX;
                background: url('http://img.youyao99.com/f4e4ca8be71dab6a14c5268f30e8ff63.png') left center no-repeat;
                background-size: cover;
                margin: 20px auto;
                text-align: center;

                .up{
                    padding-top: 20px;
                    h4{
                        margin-bottom: 8px;
                    }
                    p{
                        color: #4ED79C;
                    }
                }
                .down{
                    margin: 44px auto 0;
                    a,button{
                        display: inline-block;
                        width: 240px;
                        height: 44px;
                        line-height: 44px;
                        background-color: #4ED79C;
                        color: #ffffff;
                        border-radius: 22px;
                    }
                    button{
                        border: none;
                    }
                }
            }
            .signed{
                background: url('http://img.youyao99.com/265bc6953e593da47223ec6f5c4abbf2.png') left center no-repeat;
                .up{
                    p{
                        color: #5870FE;
                    }
                }
                .down{
                    button{
                        background-color: #5870FE;
                    }
                }
            }
            .sign{
                background: url('http://img.youyao99.com/2e653f002a98b879ad5641efbe6ec186.png') left center no-repeat;
                .up{
                    p{
                        color: #5870FE;
                    }
                }
                .down{
                    button{
                        background-color: #5870FE;
                    }
                }
            }
        }
        .exam_button{
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            text-align: center;
            padding: 20px 15px;
            background-color: #ffffff;
            a{
                display: inline-block;
                width: 100%;
                font-size: 14PX;
                border-radius: 22px;
                line-height: 44px;
                background-color: #5870FE;
                color: #ffffff;
            }
        }
    }
    .show_agree{
        .vux-popup-dialog{
            padding: 15px 15px 110px;
            background-color: #ffffff;
            .closebtn{
                position: fixed;
                top: 0px;
                right: 15px;
                .iconfont{
                    font-size: 30PX;
                    font-weight: normal;
                    color: #999999;
                }
            }
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
