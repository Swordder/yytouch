<template>
    <div class="survey_cover">
        <img src="http://img.youyao99.com/780ca76daa95dd55db296690db4bc899.png" alt="">
        <template v-if="this.$route.query.type == 2 || this.status == true">
            <img class="submint_pic" src="http://img.youyao99.com/12D8C3020CB69F56D4A40104E0A52418.png" alt="">
            <p class="finished">
                {{this.status?'问卷调查已结束':'恭喜您完成问卷'}}
            </p>    
        </template>
        <template v-else>
            <p>一次美好的旅行，途中遇到意外流落荒岛，遇到下列情景你会做出怎样的选择？一次美好的旅行，途中遇到意外流落荒岛，遇到下列情景你会做出怎样的选择？一次美好的旅行，途中遇到意外流落荒岛，遇到下列情景你会做出怎样的选择？</p>
            <router-link v-if="router_tag" :to="{path:'/surveySingle',query:{paper_yyid:this.$route.query.paper_yyid,next_question_yyid: data.next_question_id}}">开始<br />答题</router-link>
            <a v-else href="javascript:;">开始<br />答题</a>
        </template>
    </div>
</template>
<script>
import { question } from '../../api/sendRequest';
import { getStore } from '../../config/util';
export default {
    data(){
        return {
            status:false,
            router_tag:false,
            data:{}
        }
    },
    mounted(){
        if(this.$route.query.type != 2){
            this.getStatus()
        }
    },
    methods:{
        async getStatus(){
            let openid = getStore('openid');
            let res = await question(this.$route.query.paper_yyid);
            switch (res.errcode) {
                case 500001:
                    this.$vux.toast.text(res.errmsg,'top');
                    break;
                case 500002:
                    this.status = true;
                    break;
                case 500003:
                    this.$vux.toast.text(res.errmsg,'top');
                    break;
                case 500004:
                    this.$vux.toast.text(res.errmsg,'top');
                    break;
                case 500005:
                    this.$vux.toast.text(res.errmsg,'top');
                    break;
                case 500006:
                    this.$vux.toast.text(res.errmsg,'top');
                    break;
                case 0:
                    this.router_tag = true;
                    this.data = { ...res.data }
                    break;
                default:
                    
                    break;
            }
        },

    }
}
</script>
<style lang="less">
    .survey_cover{
        padding: 30px 12px;
        position: relative;
        img{
            width: 100%;
            height: auto;
        }
        p{
            width: 60%;
            position: absolute;
            top: 120px;
            left: 50%;
            transform: translateX(-50%);
        }
        .finished{
            position: absolute;
            bottom: 36%;
            text-align: center;
            color: #5870FE;
            font-size: 18PX;
            font-weight: bold;
            top: auto;
        }
        a{
            width: 100px;
            height: 100px;
            position: absolute;
            bottom: 90px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50%;
            background-color: #FFDB4F;
            color: #5870FE;
            text-align: center;
            font-size: 18PX;
            font-weight: bold;
            padding-top: 20px;
        }
        .submint_pic{
            position: absolute;
            top: 38%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 140px;
            height: 140px;
        }
    }
</style>