<template>
    <div class="data_list">
        <template v-if="value_report.init_level.length === 0">
            <van-empty description="暂无此条件下的数据" />
        </template>
        <div v-else class="data_list_item">
            <group>
                <popup-picker :data="value_report.level" v-model="value_report.init_level" @on-change="changeData($event,value_report.product_name_cn,2)"></popup-picker>
            </group>
            <div class="data_show_wrap">
                <h4>月销售</h4>
                <div class="data_show flex_item">
                    <div class="data_show_item">
                        <span>{{value_report.month_target}}</span>
                        <p class="font_10">指标</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.month_sales}}</span>
                        <p class="font_10">销售</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.month_ach}}</span>
                        <p class="font_10">达成率</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.ly_sales}}</span>
                        <p class="font_10">去年历史销售</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.month_gr}}</span>
                        <p class="font_10">增长率</p>
                    </div>
                </div>
            </div>
            <div class="data_show_wrap">
                <h4>季度销售</h4>
                <div class="data_show flex_item">
                    <div class="data_show_item">
                        <span>{{value_report.qtd_target}}</span>
                        <p class="font_10">指标</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.qtd_sales}}</span>
                        <p class="font_10">销售</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.qtd_ach}}</span>
                        <p class="font_10">达成率</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.qtd_ly_sales}}</span>
                        <p class="font_10">去年历史销售</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.qtd_gr}}</span>
                        <p class="font_10">增长率</p>
                    </div>
                </div>
            </div>
            <div class="data_show_wrap">
                <h4>年销售</h4>
                <div class="data_show flex_item">
                    <div class="data_show_item">
                        <span>{{value_report.ytd_target}}</span>
                        <p class="font_10">指标</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.ytd_sales}}</span>
                        <p class="font_10">销售</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.ytd_ach}}</span>
                        <p class="font_10">达成率</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.ytd_ly_sales}}</span>
                        <p class="font_10">去年历史销售</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{value_report.ytd_gr}}</span>
                        <p class="font_10">增长率</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { PopupPicker, Group } from 'vux';
export default {
    props:['value_report','changeNumData'],
    data(){
        return {
            type:1,
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