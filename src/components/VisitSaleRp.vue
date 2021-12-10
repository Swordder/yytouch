<template>
    <div class="data_list">
        <template v-if="sale_report.length === 0">
            <van-empty description="暂无此条件下的数据" />
        </template>
        <template v-else>
            <div class="data_list_item" v-for="item in sale_report" :key="item.id">
                <group>
                    <popup-picker :title="item.product_name_cn" :data="item.level" v-model="item.init_level" @on-change="changeData($event,item.product_name_cn,1)"></popup-picker>
                </group>
                <span class="level">SKU</span>
                <div class="data_show_wrap">
                    <h4>月销售</h4>
                    <div class="data_show flex_item">
                        <div class="data_show_item">
                            <span>{{item.month_target}}</span>
                            <p class="font_10">指标</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.month_sales}}</span>
                            <p class="font_10">销售</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.month_ach}}</span>
                            <p class="font_10">达成率</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.ly_sales}}</span>
                            <p class="font_10">去年历史销售</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.month_gr}}</span>
                            <p class="font_10">增长率</p>
                        </div>
                    </div>
                </div>
                <div class="data_show_wrap">
                    <h4>季度销售</h4>
                    <div class="data_show flex_item">
                        <div class="data_show_item">
                            <span>{{item.qtd_target}}</span>
                            <p class="font_10">指标</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.qtd_sales}}</span>
                            <p class="font_10">销售</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.qtd_ach}}</span>
                            <p class="font_10">达成率</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.qtd_ly_sales}}</span>
                            <p class="font_10">去年历史销售</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.qtd_gr}}</span>
                            <p class="font_10">增长率</p>
                        </div>
                    </div>
                </div>
                <div class="data_show_wrap">
                    <h4>年销售</h4>
                    <div class="data_show flex_item">
                        <div class="data_show_item">
                            <span>{{item.ytd_target}}</span>
                            <p class="font_10">指标</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.ytd_sales}}</span>
                            <p class="font_10">销售</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.ytd_ach}}</span>
                            <p class="font_10">达成率</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.ytd_ly_sales}}</span>
                            <p class="font_10">去年历史销售</p>
                        </div>
                        <div class="data_show_item">
                            <span>{{item.ytd_gr}}</span>
                            <p class="font_10">增长率</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { PopupPicker, Group } from 'vux';
export default {
    props:['sale_report','changeNumData'],
    data(){
        return {
        }
    },
    components:{
        PopupPicker, Group
    },
    methods:{
        changeData(event,name,type){
            this.$emit('changeNumData',event,name,type)
        }
    }
}
</script>
<style lang="less">

</style>