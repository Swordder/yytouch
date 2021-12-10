<template>
    <div class="compliance" data-name="compliance">
        <NavBar></NavBar>
        <router-link to="/knowledge" class="compliance_item flex_item">
            <div class="sub_content">
                <h2>知识库</h2>
                <p>各产品文献、视频、技能培训、合规政策的知识中心</p>
            </div>
            <i></i>
        </router-link>
        <router-link to="/exam" class="compliance_item flex_item">
            <div class="sub_content">
                <h2>考试</h2>
                <p>各产品相关知识的综合性测验，检测学习的成果</p>
            </div>
            <i></i>
        </router-link>
    </div>
</template>
<script>
import NavBar from '../../components/NavBar'
export default {
    data(){
        return {

        }
    },
    components:{
        NavBar
    },
    methods:{
        RecursionTree(){
            
        }
    }
}
</script>
<style lang="less" scoped>
    .compliance{
        padding: 55px 15px 15px;
        .compliance_item{
            height: 100px;
            color: #ffffff;
            margin-bottom: 20px;
            border-radius: 8px;
            padding: 18px 30px;        
            box-shadow: 0px 6px 10px 0px rgba(127, 155, 226, 0.5);
            background: url('http://img.youyao99.com/aed89ad36b30b669ae7c86d4d826ce95.png') left center no-repeat;
            background-size: cover;
            .sub_content{
                flex: 1;
            }
            h2{
                font-size: 18PX;
                margin-bottom: 4px;
            }
            p{
                font-size: 12PX;
            }
            i{
                width: 42px;
                height: 32px;
                margin-top: 10px;
                margin-left: 20px;
                background: url('http://img.youyao99.com/120bde530486a65708038d4c05ee9d61.png') left center no-repeat;
                background-size: cover;
            }
        }
        .compliance_item:nth-of-type(2){
            background: url('http://img.youyao99.com/e6c185e2421d7f45fe2b48d88afdf372.png') left center no-repeat;
            background-size: cover;
            i{
                width: 36px;
                height: 36px;
                background: url('http://img.youyao99.com/7616644b217d41e3ea842b5df32ea01e.png') left center no-repeat;
                background-size: cover;
            }
        }
    }
</style>