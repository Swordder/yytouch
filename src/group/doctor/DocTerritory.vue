<template>
    <div class="doc_territory" data-name="doc_territory">
        <div class="deps">
            <ul>
                <li 
                v-for="(item,index) in adap_list" 
                :key="index" 
                class="bd_bt"
                :class="{'active':item.key == id}"
                @click="selectTerritory(item.key,item.value)">
                    {{item.value}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { setSessionStore, getStore } from '../../../config/util.js'
import { updateDocInfo } from '../../../api/sendRequest';
import { adaptations } from '../../../api/staticRequest';
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {
            adap_list:[],
            id :''
        }
    },
    mounted(){
        this.id = this.$route.query.id;
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
            'deps',
        ]),
    },
    methods:{
        async selectTerritory(id,value){
            if (this.$route.query.type != 1) {
                this.id = id;
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
                    update_data.depart_id,
                    update_data.position,
                    update_data.job_title,
                    update_data.group_yyid,
                    id,
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
                return
            } else {
                let obj = {
                    id,
                    value
                };
                setSessionStore('doc_terr',JSON.stringify(obj));
                this.$router.go(-1);
            }
            
        }
        
    }
}
</script>
<style lang="less">
    .doc_territory{
        .deps{
            padding: 0px 15px 60px;
            .empty_show{
                text-align: center;
                line-height: 40px;
            }
            ul{
                li{
                    padding: 8px 0px;
                }
                .active{
                    color: #5870FE;
                }
            }
        }
    }
</style>