<template>
    <div class="get_route" data-name="get_route">
        <h1>获取公众号的信息来源</h1>
        <checklist title="" :options="list" v-model="value" :max="1" @on-change="change"></checklist>
        <textarea v-show="other_flag" class="other_reason" v-model.trim="other_value" type="text" placeholder="请填写其他来源"></textarea>
        <div class="btn">
            <button class="btn_common" @click="submintBtn">确定</button>
        </div>
    </div>
</template>
<script>
import { Checklist } from 'vux';
import { getUserResource } from '../api/sendRequest';
import { getStore, setStore } from '../config/util';
export default {
    props:['get_source_flag'],
    data(){
        return {
            list:['好友推送','朋友圈、微信群、直播间','51JOB、BOSS等招聘渠道','公司官网、搜索引擎、推文软文','线下','其他'],
            value:[],
            other_value:'',
            other_flag:false
        }
    },
    components:{
        Checklist
    },
    methods:{
        change(val){
            if(val[0] == '其他'){
                this.other_flag = true;
            } else {
                this.other_flag = false;
            }
        },
        submintBtn(){
            let openid = getStore('openid');
            let val = '';
            let type = '';
            if(this.value.length === 0){
                this.$vux.toast.text('请选择信息来源','top');
                return
            }
            if(this.value[0] == '其他'&&this.other_value == ''){
                this.$vux.toast.text('请填写其他原因','top');
                return
            }
            if(this.value[0] == '其他'&&this.other_value == ''){
                val = this.other_value
            } else {
                val = this.value[0];
            };
            if(this.$route.path == '/login'){
                type = 'register';
            } else {
                type = 'product';
            };
            getUserResource(openid,'',type,val).then(res => {
                if(res.data.result == true){
                    setStore('is_new',res.data.result)
                    this.$emit('getSourceBtn');
                }
            })
        }
    }
}
</script>
<style lang="less">
    .get_route{
        padding: 20px 15px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background-color: #ffffff;
        h1{
            text-align: center;
            font-size: 20PX;
            margin-bottom: 20px;
        }
        .weui-cells{
            &::before{
                border-top: none 0;
            }
            &::after{
                border-bottom: none 0;
            }
        }
        .weui-cell__bd{
            font-size: 14PX;
        }
        .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked{
            &::before{
                color: #5870FE;
            }
        }
        .other_reason{
            width: 80%;
            margin: 0 20px;
            padding: 2px 15px;
            line-height: 24px;
            border: 1px solid #C4C9D2;
            outline-style: none;
            resize: none;
        }
        .btn{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 15px;
            button{
                width: 100%;
                font-size: 14PX;
                color: #ffffff;
                background-color: #5870FE;
            }
        }
    }
</style>