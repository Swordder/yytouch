<template>
    <div class="companys_list">
        <p class="tip">注：工作经验由近及远，至少填写一个</p>
        <div v-show="company_list_txt.length !== 0"  class="wrap_add_company_list">
            <div class="add_company_list" v-for="(item,index) in company_list_txt" :key="index">
                <div class="add_componay_item flex_item">
                    <div class="add_com_title">公司名称</div>
                    <div class="add_com_bd">{{item.company_name}}</div>
                </div>
                <div class="add_componay_item flex_item">
                    <div class="add_com_title">治疗领域</div>
                    <div class="add_com_bd">{{item.territory}}</div>
                </div>
                <div class="add_componay_item flex_item">
                    <div class="add_com_title">适应症</div>
                    <div class="add_com_bd">{{item.indications}}</div>
                </div>
                <div class="add_componay_item flex_item">
                    <div class="add_com_title">产品名称</div>
                    <div class="add_com_bd">{{item.drug_name}}</div>
                </div>
                <span @click="deleteCom(index)">X</span>
            </div>
        </div>
        <div class="company_form">
            <div class="form_item bd_bt">
                <router-link to="/totalCompany" class="flex_item">
                    <div class="c_title"><i class="iconfont">&#xe603;</i>公司名称</div>
                    <div class="c_bd">
                        <div class="c_bd flex_item">
                            <p v-if="familiar_com =='' ">点击选择公司</p>
                            <div v-else class="c_show flex_item">
                                <p class="c_num">{{familiar_com}}</p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="form_item bd_bt">
                <router-link to="/territory" class="flex_item">
                    <div class="c_title"><i class="iconfont">&#xe603;</i>治疗领域</div>
                    <div class="c_bd flex_item">
                        <p v-if="territory_id.length === 0">点击选择治疗领域</p>
                        <div v-else class="c_show flex_item">
                            <p class="c_num">已选择{{territory_id.length}}种治疗领域</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="form_item bd_bt">
                <router-link to="/indications" class="flex_item">
                    <div class="c_title"><i class="iconfont">&#xe603;</i>适应症</div>
                    <div class="c_bd">
                        <div class="c_bd flex_item">
                            <p v-if="indication_id.length === 0">点击选择适应症</p>
                            <div v-else class="c_show flex_item">
                                <p class="c_num">已选择{{indication_id.length}}种适应症</p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="form_item bd_bt flex_item">
                <div class="c_title"><i class="iconfont">&#xe603;</i>产品名称</div>
                <div class="c_bd">
                    <input type="text" placeholder="请输入产品名称" v-model.trim="drug_name" @input="saveDrugName">
                </div>
            </div>
            <div class="compony_btn" @click="addCompany">
                <button class="btn_common">确定添加</button>
            </div>
        </div>
        <div class="cer_btn" @click="addBack">
            <button class="btn_common">确定</button>
        </div>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex';
import { setSessionStore,getSessionStore,removeSessionStore } from '../../config/util.js'
export default {
    data(){
        return{
            drug_name:'',
            familiar_com:''
        }
    },
    computed:{
        ...mapState([
            'company_list',
            'company_list_txt',
            'territory',
            'territory_id',
            'indication',
            'indication_id'
        ]),
    },
    mounted(){
        this.getStorage()
    },
    
    methods:{
        ...mapMutations([
            'GET_COMPANY_LIST',
            'CLEAR_FAMILIAR_COM',
            'DELETE_COMPANY'
        ]),
        getStorage(){
            this.drug_name = getSessionStore('yy_drug_name')?getSessionStore('yy_drug_name'):'';
            this.familiar_com = getSessionStore('yy_familiar_com')?getSessionStore('yy_familiar_com'):'';
        },
        saveDrugName(){
            setSessionStore('yy_drug_name',this.drug_name);
        },
        addCompany(){
            let len = this.company_list.length;
            if(getSessionStore('yy_familiar_com') == null || getSessionStore('yy_drug_name') == null || this.territory_id.length === 0 || this.indication_id.length === 0){
                this.$vux.toast.text('请填写完整的信息','top');
                return
            };
            this.GET_COMPANY_LIST({
                "company_name":getSessionStore('yy_familiar_com'),
                "territory":this.territory_id,
                "territory_txt":this.territory,
                "indications":this.indication_id,
                "indications_txt":this.indication,
                "drug_name":getSessionStore('yy_drug_name'),
            })
            this.drug_name="";
            this.familiar_com="";
            this.CLEAR_FAMILIAR_COM()
        },
        deleteCom(index){
            this.DELETE_COMPANY(index);
        },
        addBack(){
            if(this.company_list.length === 0){
                this.$vux.toast.text('请确认添加的信息','top');
                return
            }
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
    .companys_list{
        padding: 15px 15px 60px;
        .tip{
            font-size: 12px;
            color: #FF5252;
            margin-bottom: 10px;
        }
        .add_company_list{
            background-color: #E5E8FF;
            padding: 15px;
            border-radius: 3px;
            margin-bottom: 10px;
            position: relative;
            .flex_item{
                justify-content: flex-start;
                margin-bottom: 10px;
                .add_com_title{
                    width: 80px;
                    margin-right: 5px;
                }
                .add_com_bd{
                    flex: 1;
                    color: #000000;
                }
            }
            span{
                position: absolute;
                top: -5px;
                right: -5px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                border-radius: 50%;
                background-color: #DBDBDB;
                color: #ffffff;
                text-align: center;
            }
        }
        .company_form{
            padding: 6px;
            margin-top: 10px;
            border-radius: 3px;
            border: 1PX solid #C4C9D2;
            .form_item{
                line-height: 24px;
                padding: 8px;
                .iconfont{
                    color: #FF5252;
                }
                .c_title{
                    position: relative;
                    width: 100px;
                    padding-left: 5px;
                    .iconfont{
                        position: absolute;
                        top: -6px;
                        left: -10px;
                    }
                }
                .c_bd{
                    flex: 1;
                    color: #999999;
                    input{
                        width: 100%;
                        border:none;
                        outline-style: none;
                    }
                    .c_show{
                        color: #000000;
                    }
                }
            }
            .compony_btn{
                text-align: right;
                margin: 15px 0 10px;
                button{
                    padding: 0 15px;
                    line-height: 28px;
                    color: #ffffff;
                    background-color: #5870FE;
                }
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
    }
</style>