<template>
    <div class="group_code"  data-name="wx_code">
        <div class="code_img">
            <div class="pic_wrap">
                <img :src="data.url" alt="">
            </div>
            <p v-if="this.$route.query.type_yyid == '531B7BD0B32FA6A56A6C520593BA675D'">{{data.group_name}}群组二维码</p>
            <p v-else-if="this.$route.query.type_yyid == 'CC9A4AD01C4EB56C737B450A52BD61D1'">{{data.group_name}}群组二维码</p>
            <p v-else-if="this.$route.query.type_yyid == 'EB0E428E924055A20E7C71A0FD55667C'">我的二维码</p>
            <button class="btn_common">点击右上角分享到微信</button>
        </div>
    </div>
</template>
<script>
import { wxCode,agentGpCode,personCode } from '../../api/sendRequest';
import { wxShare } from '../../config/share';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            data:{}
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getWxCode();
    },
    methods:{
        async getWxCode(){
            if(this.$route.query.type_yyid == 'CC9A4AD01C4EB56C737B450A52BD61D1'){
                let res = await wxCode(this.user_info.yyid,this.user_info.user_token);
                if(res.errcode != 0){
                  this.$vux.toast.text(res.errmsg,'top');
                  return
                }
                this.data = { ...res.data };
                wxShare(
                    `医生的群二维码`,
                    '扫码加群，获取更多资源',
                    res.data.url,
                    this.$route.query.type_yyid,
                    22,
                    this.$route.query
                );
                return
            } else if(this.$route.query.type_yyid == 'EB0E428E924055A20E7C71A0FD55667C'){
                let res = await personCode(this.user_info.yyid,this.user_info.user_token);
                if(res.errcode != 0){
                  this.$vux.toast.text(res.errmsg,'top');
                  return
                }
                this.data = { ...res.data };
                wxShare(
                    `我的二维码`,
                    '扫码加群，获取更多资源',
                    res.data.url,
                    this.$route.query.type_yyid,
                    20,
                    this.$route.query
                );
                return
            } else if(this.$route.query.type_yyid == '531B7BD0B32FA6A56A6C520593BA675D'){
                let res = await agentGpCode(this.user_info.yyid,this.user_info.user_token,this.$route.query.group_yyid);
                if(res.errcode != 0){
                  this.$vux.toast.text(res.errmsg,'top');
                  return
                }
                this.data = { ...res.data };
                wxShare(
                    `${res.data.group_name}群二维码`,
                    '扫码加群，获取更多资源',
                    res.data.url,
                    this.$route.query.type_yyid,
                    21,
                    this.$route.query
                );
                return
            }
        }
    }
}
</script>
<style lang="less">
    .group_code{
        text-align: center;
        .code_img{
            position: absolute;
            top: 44%;
            left: 50%;
            transform: translate(-50%,-50%);
            .pic_wrap{
                width: 220px;
                height: 220px;
                margin: 0 auto 10px;
                padding: 14px;
                border-radius: 10px;
                box-shadow: 0px 2px 10px 0px rgba(216, 216, 216, 0.5);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            button{
                width: 240px;
                line-height: 44px;
                margin-top: 20px;
            }
        }
    }
</style>
