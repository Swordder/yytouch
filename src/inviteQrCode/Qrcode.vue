<template>
    <div class="qrcontainer">
        <vue-qr :text="content" :size="200" style="padding-top:15px"></vue-qr>
         <button class="btnScan">扫码更多售后服务</button>
    </div>
</template>

<script>
import VueQr from 'vue-qr'
import { mapState } from 'vuex'
import {aerogenUrl} from '../../config/env'
export default {
    props:['copyStoreId','copyDrugId','copyDrugName'],
    data(){
        return{
            content:aerogenUrl
        }
    },
    created(){
        this.content = aerogenUrl+`/?drugStoreId=${this.copyStoreId}&drugId=${this.copyDrugId}&drugName=${this.copyDrugName}&agentId=${this.user_info.yyid}`
    },
    computed:{
        ...mapState(['user_info'])
    },
    components:{
        VueQr
    }

}
</script>

<style>
.qrcontainer{
    position: relative;
    height: 100%;
}
.btnScan{
    text-align: center;
	background-color: #FFFFFF;
	color: #5870FE;
	border: 1PX solid #5870FE;
	border-radius: 30px;
	line-height: 22px;
    padding: 5px;
    margin-bottom: 10px;
    width: 160px;
}
.van-icon-cross::before{
  position: relative;
  bottom: 10px;
  left: 10px;
}
</style>