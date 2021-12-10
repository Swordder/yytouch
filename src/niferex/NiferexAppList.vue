<template>
    <div class="niferex_app_list">
        <NavBar />
        <router-link :to="{path:'/niferexOverview',query:{str_type:this.$route.query.str_type,sub_type:'ppt',product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid}}">
            力蜚能{{this.$route.query.str_type == 'obstetric'?'产科':(this.$route.query.str_type == 'renal'?'肾科':'全科')}}PPT
            <i class="iconfont">&#xe661;</i>
        </router-link>
        <router-link :to="{path:'/niferexOverview',query:{str_type:this.$route.query.str_type,sub_type:'da',product_yyid:$route.query.product_yyid,series_yyid:$route.query.series_yyid}}">
            力蜚能{{this.$route.query.str_type == 'obstetric'?'产科':(this.$route.query.str_type == 'renal'?'肾科':'全科')}}DA
            <i class="iconfont">&#xe661;</i>
        </router-link>
    </div>
</template>
<script>
import NavBar from '../../components/NavBar.vue';
export default {
    data(){
        return {

        }
    },
    mounted() {
        // 修改文档的title
        switch (this.$route.query.str_type){
            case 'obstetric':
                document.title = '产科'
                break;
            case 'prod_compare':
                document.title = '全科'
                break;
            case 'renal':
                document.title = '肾科'
                break;
            default:
                break;
        }
    },
    components:{
        NavBar
    }
}
</script>
<style lang="less">
.niferex_app_list{
    margin-top: 36px;
    padding: 15px;
    a{
        display: block;
        line-height: 40px;
        background-color: #F3F4F5;
        padding: 0 15px;
        border-radius: 4px;
        margin-bottom: 10px;
        position: relative;
        .iconfont{
            position: absolute;
            right: 10px;
            top: 0px;
        }
    }
}
</style>