<template>
    <div class="territory" data-name="territory">
        <checklist label-position="left" required :options="adap_list" v-model="checklist" ></checklist>
        <div class="cer_btn" @click="backLast">
            <button class="btn_common">确定</button>
        </div>
    </div>
</template>
<script>
import { Checklist, Search } from 'vux';
import { adaptations } from '../../api/staticRequest';
import { setSessionStore } from '../../config/util.js';
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {
            adap_list:[],
            checklist:[],
            territorys:[],
            search_value:''
        }
    },
    mounted(){
        this.checklist = this.territory_id;
        // this.territorys = this.territory;
        adaptations.then(res => {
            res.adaptationList.map((item,index) => {
                this.adap_list.push({
                    key:item.id,
                    value:item.value
                })
            })
        })
    },
    computed:{
        ...mapState([
            'territory',
            'territory_id'
        ]),
    },
    components:{
        Checklist,
        Search
    },
    methods:{
        ...mapMutations([
            'GET_TERRITORY',
            'GET_TERRITORY_TXT'
        ]),
        backLast(){
            this.GET_TERRITORY(this.checklist);
            let len = this.adap_list.length;
            for (var i = 0; i < len; i++) {
                if (this.checklist.indexOf(this.adap_list[i].key) != -1) {
                    this.territorys.push(this.adap_list[i].value);
                }
            }
            this.GET_TERRITORY_TXT(this.territorys);
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
    .territory{
        padding-bottom:60px;
        .weui-cells{
            .weui-cell{
                padding: 10px 15px;
            }
        }
        .weui-cell__bd{
            font-size: 14px;
        }
        .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
            color: #5870FE !important;
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