<template>
    <div class="visit_rp" data-name="visit_rp">
        <h1>{{date}}</h1>
        <template v-if="report.length === 0">
            <van-empty description="暂无此条件下的数据" />
        </template>
        <div v-else class="data_list">
            <div class="data_list_item" v-for="(item,index) in report" :key="index">
                <group>
                    <popup-picker :title="item.product_name_cn" :data="item.level" v-model="item.init_level" @on-change="changeData($event,item.product_name_cn)"></popup-picker>    
                </group>
                <span class="level">机构级别</span>
                <div class="data_show flex_item">
                    <div class="data_show_item">
                        <span>{{item.of_tgt_ins}}</span>
                        <p class="font_10">目标机构数量</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{item.of_ins_visited}}</span>
                        <p class="font_10">拜访机构数量</p>
                    </div>

                    <div class="data_show_item">
                        <span>{{item.coverage}}</span>
                        <p class="font_10">覆盖率</p>
                    </div>
                    
                    <div class="data_show_item">
                        <span>{{item.of_calls}}</span>
                        <p class="font_10">拜访数量</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{item.frequency}}</span>
                        <p class="font_10">拜访频率</p>
                    </div>

                    <div class="data_show_item">
                        <span>{{item.base_num}}</span>
                        <p class="font_10">Base已列名<br/>机构数</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{item.base_standard_num}}</span>
                        <p class="font_10">Base已列名<br/>达标机构数</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{item.base_rage}}</span>
                        <p class="font_10">达标率</p>
                    </div>
                </div>
                <div class="data_show flex_item">
                    <div class="data_show_item">
                        <span>{{item.vacant_days}}</span>
                        <p class="font_10">空岗率</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{item.dif}}</span>
                        <p class="font_10">DIF</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{item.dif_percent}}</span>
                        <p class="font_10">DIF比例</p>
                    </div>
                    <div class="data_show_item">
                        <span>{{item.working_hours}}</span>
                        <p class="font_10">工作小时/DIF</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { visitRp } from '../../api/sendRequest';
import { PopupPicker, Group } from 'vux';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            report:[],
            date:'',
            total_data:{}
        }
    },
    components:{
        PopupPicker, Group
    },
    computed:{
        ...mapState([
            'user_info',
        ]),
    },
    mounted(){
        this.getData();
    },
    methods:{
        async getData(){
            let res = await visitRp(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.date = res.data.month;
            let res_data = res.data.report;
            this.total_data = {...res_data};
            for(let prop in res_data){
                let arr = [];
                let obj = {
                    level:[],
                    init_level:[],
                };
                obj = {...obj,...res_data[prop][Object.keys(res_data[prop])[0]]};
                for(let prop2 in res_data[prop]){
                    arr.push(prop2);
                }
                obj.level[0] = arr;
                obj.init_level[0] = arr[0];
                this.report.push(obj);
            }
        },
        changeData(event,name){
            for(let i = 0;i<this.report.length;i++){
                if(this.report[i]['product_name_cn']==name){
                    this.report.splice(i,0,...this.total_data[name][event[0]]);
                    let obj = {...this.report[i],...this.total_data[name][event[0]]};
                    this.$set(this.report, i, obj)
                }
            }
        }
    }
}
</script>
<style lang="less">
.visit_rp{
    padding: 15px;
    h1{
        font-size: 18PX;
        font-weight: bold;
        color: #5870FE;
        margin-bottom: 15px;
        text-align: center;
    }
    .data_list_item{
        padding: 20px;
        margin-bottom: 15px;
        border-radius: 8px;
        box-shadow: 0px 2px 12px 0px rgba(204, 213, 224, 0.5);
        position: relative;
        .level{
            position: absolute;
            top: 22px;
            right: 70px;
            color: #999999;
        }
        .weui-cells{
            margin-top: 0;
            &::before{
                border-top: none;
            }
            &::after{
                border-bottom: none;
            }
            .weui-cell{
                padding: 0;
                .weui-label{
                    font-weight: bold;
                }
                .vux-cell-value{
                    font-size: 12PX;
                    color: #5870FE;
                }
            }
        }
        .data_show{
            text-align: center;
            flex-wrap: wrap;
            justify-content: flex-start;
            background-color: #F7F8FF;
            margin-top: 15px;
            padding-top: 15px;
            .data_show_item{
                width: 33%;
                margin-bottom: 20px;
                span{
                    font-size: 16PX;
                    font-weight: bold;
                }
                p{
                    color: #999999;
                }
            }
        }
    }
}
</style>