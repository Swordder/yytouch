<template>
    <div class="service_city">
        <ul>
            <li 
            class="bd_bt"
            :class="{'active_on':(active_id == index)}"
            v-for="(item,index) in pro_data" 
            @click="selectProvince(index,item)"
            :key="index">
                {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
    import { totalProvince } from '../../api/staticRequest';
    import { setSessionStore, getSessionStore } from '../../config/util';
    export default {
        data(){
            return {
                pro_data:{},
                active_id:''
            }
        },
        mounted(){
            totalProvince.then(res => {
                this.pro_data = {...res}
            });
            this.active_id = getSessionStore('region_yyid');
        },
        methods:{
            selectProvince(yyid,region){
                this.active_id = yyid;
                setSessionStore('region_yyid',yyid);
                setSessionStore('region',region);
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="less" scoped>
    .service_city{
        padding: 0 15px;
        li{
            line-height: 40px;

        }
        .active_on{
            color: #5870FE;
            border-bottom-color: #5870FE;
        }
    }
</style>