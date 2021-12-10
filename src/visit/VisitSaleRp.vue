<template>
    <div class="visit_sale_rp"  data-name="visit_sale_rp">
        <h1 v-if="type== 1">{{date}}</h1>
        <h1 v-else>{{date}}</h1>
        <div class="tabs flex_item bd_bt">
            <p 
                :class="type == index+1?'active':''" 
                v-for="(item,index) in tabs" 
                @click="changeTab(index)"
                :key=index>
                {{item}}
            </p>
        </div>
        <template v-if="type == 1">
            <VisitSaleRp :sale_report="sale_num_report" @changeNumData="changeNumData"/>    
        </template>
        <template v-else>
            <VisitValue  :value_report="sale_value_report" @changeNumData="changeNumData"/>
        </template>
        <!-- email -->
        <transition name="showcover">
			<div class="back_cover" v-show="email_tag"  @click="email_tag = false"></div>
		</transition>
        <div class="email" v-show="email_tag">
            <div class="add_email">
                <h4>邮箱</h4>
                <input type="text" v-model.trim="email" placeholder="请输入邮箱">
            </div>
            <button class="btn_common" @click="sendEmail">确定</button>
        </div>
        <div class="export bgcw" v-show="type == 1">
            <button class="btn_common" @click="email_tag = true">导出</button>
        </div>
    </div>
</template>
<script>
import { visitBiRp,srpMail } from '../../api/sendRequest';
import VisitSaleRp from '../components/VisitSaleRp';
import VisitValue from '../components/VisitValue';
import { mapState, mapActions } from 'vuex';
export default {
    data(){
        return {
            tabs:['销量','金额'],
            date:'',
            type:1,
            value1: ['一级'],
            list1: [['一级', '二级', '三级', '其他']],
            sale_num_data:{},
            sale_num_report:[],
            sale_value_data:{},
            sale_value_report:{},
            email:'',
            email_tag:false
        }
    },
    components:{
        VisitSaleRp, VisitValue
    },
    computed:{
        ...mapState([
            'user_info',
        ]),
    },
    mounted(){
        this.getTotalData();
        if (this.user_info&&this.user_info.mail) {
            this.email = this.user_info.mail;
        }
    },
    methods:{
        ...mapActions([
            'checkUserInfo'
        ]),
        changeTab(index){
            this.type = index+1;
        },
        async getTotalData(){
            let res = await visitBiRp(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            // 判断是销量还是金额
            if (this.type == 1) {
                this.date = res.data.saleNum.month;
            } else {
                this.date = res.data.saleValue.month;
            };
            // 销量的数据处理
            let res_sale_data = res.data.saleNum.report;
            this.sale_num_data = {...res_sale_data};
            for(let prop in res_sale_data){
                let arr = [];
                let obj = {
                    level:[],
                    init_level:[],
                };
                obj = {...obj,...res_sale_data[prop][Object.keys(res_sale_data[prop])[0]]};
                for(let prop2 in res_sale_data[prop]){
                    arr.push(prop2);
                }
                obj.level[0] = arr;
                obj.init_level[0] = arr[0];
                this.sale_num_report.push(obj);
            }
            // 金额的数据处理
            let res_value_data = res.data.saleValue.report;
            this.sale_value_data = {...res_value_data};
            let obj = {
                level:[],
                init_level:[],
            };
            let arr = [];
            obj = {...obj,...res_value_data[Object.keys(res_value_data)[0]]};
            for(let prop in res_value_data){
                arr.push(prop);
                obj.level[0] = arr;
                obj.init_level[0] = arr[0];
            }
            this.sale_value_report = {...obj};
        },
        changeNumData(event,name,type){
            if (type == 1) {
                for(let i = 0;i<this.sale_num_report.length;i++){
                    if(this.sale_num_report[i]['product_name_cn']==name){
                        this.sale_num_report.splice(i,0,...this.sale_num_data[name][event[0]]);
                        let obj = {...this.sale_num_report[i],...this.sale_num_data[name][event[0]]};
                        this.$set(this.sale_num_report, i, obj)
                    }
                }    
                return
            } else {
                if (this.sale_value_report.product_name_cn == event[0]) {
                    return
                } else {
                    let obj = {...this.sale_value_data[event[0]]};
                    this.sale_value_report = {...this.sale_value_report,...obj};
                }
            }
            
        },
        // 获取报告
        async sendEmail(){
            if(!this.email){
                this.$vux.toast.text('邮箱不能为空');
                return
            };
            let res = await srpMail(this.user_info.yyid,this.user_info.user_token,this.type,this.email);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.checkUserInfo();
            this.email_tag = false;
            this.$vux.toast.text(res.data.toString(),'top');
            if (this.user_info&&this.user_info.mail) {
                this.email = this.user_info.mail;
            } else {
                this.email = '';
            }
        }
    }
}
</script>
<style lang="less">
.visit_sale_rp{
    padding: 15px 15px 60px 15px;
    position: relative;
    h1{
        font-size: 18PX;
        font-weight: bold;
        color: #5870FE;
        margin-bottom: 5px;
        text-align: center;
    }
    .tabs{
        line-height: 40px;
        margin-bottom: 11px;
        text-align: center;
        p{
            flex: 1;
            position: relative;    
        }
        p.active{
            &::after{
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                content: '';
                width: 20px;
                height: 2px;
                background-color: #5870FE;
            }
        }
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
            right: 150px;
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
                    width: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    float: right
                }
            }
        }
        .data_show_wrap{
            margin-top: 15px;
            background-color: #F7F8FF;
            h4{
                padding: 15px 0 0 15px;
                &::before{
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 12px;
                    background-color: #5870FE;
                    border-radius: 2px;
                    margin-right: 5px;
                }
            }
            .data_show{
                text-align: center;
                flex-wrap: wrap;
                justify-content: flex-start;
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
    .back_cover{
        top: 0;
        bottom: 0;
    }
    .email{
            width: 285px;
            text-align: center;
            background-color: #ffffff;
            border-radius: 8px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 12;
            .add_email{
                background-color: #5870FE;
                border-radius: 8px 8px 0 0;
                padding: 20px 27px;
                margin-bottom: 20px;
                h4{
                    color: #ffffff;
                    font-size: 14PX;
                }
                input{
                    width: 100%;
                    margin-top: 15px;
                    padding: 0 10px;
                    outline-style: none;
                    line-height: 44px;
                }
            }
            button{
                width: 160px;
                color: #ffffff;
                background-color: #5870FE;
                margin-bottom: 20px;
            }
        }
    .export{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 15px;
        button{
            width: 100%;
            background-color: #5870FE;
            color: #ffffff;
        }
    }
}
</style>