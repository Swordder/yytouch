<template>
    <div class="indications" data-name="indications">
        <div class="search_bar">
            <search 
            placeholder="搜索适应症" 
            v-model.trim="search_value" 
            auto-scroll-to-top ref="search"
            @on-change="getResult"
            ></search>
        </div>
        <div class="deps">
            <checklist label-position="left" required :options="search_arr" v-model="checklist" ></checklist>
            <p class="empty_show" v-show="result_flag">无符合条件的结果哦~</p>
        </div>
        <div class="cer_btn" @click="backLast">
            <button class="btn_common">确定</button>
        </div>
    </div>
</template>
<script>
import { Checklist, Search } from 'vux';
import { adaptations } from '../../api/staticRequest';
import { setSessionStore } from '../../config/util.js'
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {
            adap_list:[],
            search_arr:[],
            checklist:[],
            indications:[],
            search_value:'',
            result_flag:false
        }
    },
    mounted(){
        this.checklist = this.indication_id;
        adaptations.then(res => {
            let len = res.adaptationList.length;
            let arr = [];
            for(let i = 0; i < len; i++){
                arr.push(...res.adaptationList[i].children);
            }
            arr.map((item,index) => {
                this.adap_list.push({
                    key:item.id,
                    value:item.value
                })
            })
        })
    },
    computed:{
        ...mapState([
            'indication_id',
            'indication'
        ]),
    },
    components:{
        Checklist,
        Search
    },
    methods:{
        ...mapMutations([
            'GET_INDICATION',
            'GET_INDICATION_TXT'
        ]),
        getResult (val) {
            let arr = [];
            let reg =  new RegExp(val);
            if(val === ''){
                this.search_arr = [];
                this.result_flag = false;
                return
            }
            for (var i = 0; i < this.adap_list.length; i++) {
                if (reg.test(this.adap_list[i].value)) {
                    arr.push(this.adap_list[i]);
                }
            }
            if(arr.length === 0){
                this.result_flag = true;
            } else {
                this.result_flag = false;
            }
            this.search_arr = [...arr]
        },
        backLast(){
            this.GET_INDICATION(this.checklist);
            let len = this.adap_list.length;
            for (var i = 0; i < len; i++) {
                if (this.checklist.indexOf(this.adap_list[i].key) != -1) {
                    this.indications.push(this.adap_list[i].value);
                }
            }

            this.GET_INDICATION_TXT(this.indications);
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
    .indications{
        .search_bar{
            width: 100%;
            height: 48px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            .vux-search-box{
                height: 48px;
                padding-bottom: 0;
                border-bottom: 0;
                .weui-search-bar{
                    background-color: #ffffff;
                    border-bottom: 1px solid #f5f5f5;
                    .weui-search-bar__form{
                        border-radius: 18px;
                        &:after{
                            border: none 0;
                        }
                        .weui-search-bar__box,
                        .weui-search-bar__label{
                            background-color: #F4F4F4;
                            border-radius: 18px;
                            line-height: 24px;
                        }
                    }
                }
                .weui-search-bar__cancel-btn{
                    color: #5870FE;
                }
            }
            
        }
        .weui-cells{
            .weui-cell{
                padding: 10px 15px;
            }
        }
        .cer_btn{
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            padding: 10px 15px;
            background-color: #ffffff;
            button{
                width: 100%;
                background-color: #5870FE;
                color: #ffffff;
            }
        }
        .deps{
            padding: 44px 0 60px;
            .empty_show{
                text-align: center;
                line-height: 40px;
            }
        }
    }
    .weui-cell__bd{
        font-size: 14px;
    }
    .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
        color: #5870FE !important;
    }
    
</style>