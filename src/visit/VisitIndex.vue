<template>
    <div class="visit_index flex_item" data-name="visit_index">
        <router-link to="/visitSignIn">
            <span>签入</span>
            <img src="http://img.youyao99.com/64d08e724934b47fd26294e531b91f96.png" alt="">
        </router-link>
        <router-link to="/visitSoList">
            <span>签出</span>
            <img src="http://img.youyao99.com/f077f82dd51fecd9ecbbd42024b4a626.png" alt="">
        </router-link>
        <router-link to="/visitDetail">
            <span>所有拜访记录</span>
            <img src="http://img.youyao99.com/99d88298a20fb0f2b7f08cf0c3a3b560.png" alt="">
        </router-link>
        <router-link to="/visitRp">
            <span>拜访报告</span>
            <img src="http://img.youyao99.com/906b39c797f881493c68696fc43009ab.png" alt="">
        </router-link>
        <router-link to="/visitSaleRp">
            <span>销售报告</span>
            <img src="http://img.youyao99.com/a94fbadc91b31be00b79de96a745abc6.png" alt="">
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>
<style lang="less">
.visit_index{
    padding: 15px;
    flex-wrap: wrap;
    a{
        display: block;
        width: 165px;
        height: 80px;
        margin-bottom: 16px;
        position: relative;
        span{
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            color: #ffffff;
            font-weight: bold;
            font-size: 16PX;
        }
        img{
            width: 100%;
            height: auto;
        }
    }
}
</style>