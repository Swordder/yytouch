<template>
    <div class="doc_dep_list" data-name="doc_dep_list">
        <div class="search_bar">
            <search 
            placeholder="搜索科室" 
            v-model.trim="search_value" 
            auto-scroll-to-top ref="search"
            @on-change="getResult"
            ></search>
        </div>
        <div class="deps">
            <ul>
                <li 
                v-for="(item,index) in search_arr" 
                :key="index" 
                class="bd_bt"
                @click="changeVal(item.key)">
                    {{item.value}}
                </li>
            </ul>
            <p class="empty_show" v-show="result_flag">无符合条件的结果哦~</p>
        </div>
    </div>
</template>
<script>
import { Checklist, Search } from 'vux';
import { setSessionStore, getStore } from '../../../config/util.js'
import { updateDocInfo } from '../../../api/sendRequest';
import { depList } from '../../../api/staticRequest';
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
        async changeVal(id){
            let update_data = JSON.parse(getStore('update_data'));
            let res = await updateDocInfo(
                update_data.user_yyid,
                update_data.user_token,
                update_data.member_yyid,
                update_data.true_name,
                update_data.gender,
                update_data.mobile_num,
                update_data.hospital_yyid,
                update_data.hospital_name,
                id,
                update_data.position,
                update_data.job_title,
                update_data.group_yyid,
                update_data.field_id,
				update_data.clinic_type,
				update_data.clinic_rota,
                this.$route.query.doctor_id
            );
            if(res.errcode == 0){
                this.$router.go(-1);
                return
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        }
        
    }
}
</script>
<style lang="less">
    .doc_dep_list{
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
                    .weui-search-bar__cancel-btn{
                        color: #5870FE;
                    }
                }
            }
        }
        .deps{
            padding: 44px 15px 60px;
            .empty_show{
                text-align: center;
                line-height: 40px;
            }
            ul{
                li{
                    padding: 8px 0px;
                }
            }
        }
    }
</style>