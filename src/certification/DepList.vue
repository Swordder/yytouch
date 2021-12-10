<template>
    <div class="dep_list" data-name="dep_list">
        <div class="search_bar">
            <search 
            placeholder="搜索科室" 
            v-model.trim="search_value" 
            auto-scroll-to-top ref="search"
            @on-change="getResult"
            ></search>
        </div>
        <div class="deps">
            <checklist label-position="left" required :options="search_arr" v-model="checklist"></checklist>
            <p class="empty_show" v-show="result_flag">无符合条件的结果哦~</p>
        </div>
        <div class="cer_btn" @click="backLast">
            <button class="btn_common">确定</button>
        </div>
    </div>
</template>
<script>
import { Checklist, Search } from 'vux';
import { setSessionStore } from '../../config/util.js'
import { depList } from '../../api/staticRequest';
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {
            dep_list:[],
            search_arr:[],
            checklist:[],
            search_value:'',
            result_flag:false
        }
    },
    mounted(){
        this.GET_DEPS(this.deps);
        this.checklist = [...this.deps];
        depList.then(res => {
            res.depList.map((item,index) => {
                this.dep_list.push({
                    key:item.id,
                    value:item.depName
                })
            })
        })
    },
    computed:{
        ...mapState([
            'deps',
        ]),
    },
    components:{
        Checklist,
        Search
    },
    methods:{
        ...mapMutations([
            'GET_DEPS',
        ]),
        getResult (val) {
            let arr = [];
            let reg =  new RegExp(val);
            if(val === ''){
                this.search_arr = [];
                this.result_flag = false;
                return
            }
            for (var i = 0; i < this.dep_list.length; i++) {
                if (reg.test(this.dep_list[i].value)) {
                    arr.push(this.dep_list[i]);
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
            this.GET_DEPS(this.checklist)
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
    .dep_list{
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
            }
        }
        .weui-cells{
            .weui-cell{
                padding: 10px 15px;
            }
        }
        .weui-search-bar__cancel-btn{
            color: #5870FE;
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
    }
    .weui-cell__bd{
        font-size: 14px;
    }
    .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
        color: #5870FE !important;
    }
    .deps{
        padding: 44px 0 60px;
        .empty_show{
            text-align: center;
            line-height: 40px;
        }
    }
    
</style>