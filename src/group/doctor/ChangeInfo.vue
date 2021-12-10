<template>
    <div class="change_info" data-name="doc_change_info">
        <input v-if="this.$route.query.type=='1'" type="text" v-model.trim="value_name" placeholder="请输入姓名">
        <input v-else type="text" v-model.trim="number" placeholder="请输入手机号">
        <template>
            <transition name="showcover">
                <div class="back_cover" v-show="show_cover"></div>
            </transition>
            <div v-show="show_cover" class="popover_item">
                <h2>关联信息自动录入</h2>
                <div class="tab_con flex_item">
                    <ul>
                        <li><i class="iconfont">&#xe69e;</i><span>真实姓名</span><p>{{doc_data.name}}</p></li>
                        <li><i class="iconfont">&#xe69e;</i><span>性别</span><p>{{doc_data.sex == 1?'男':'女'}}</p></li>
                        <li><i class="iconfont">&#xe69e;</i><span>所在医院</span><p>{{doc_data.hospital.name}}</p></li>
                        <li><i class="iconfont">&#xe69e;</i><span>所在科室</span><p>{{doc_data.depart.name}}</p></li>
                        <li><i class="iconfont">&#xe69e;</i><span>级别</span><p>{{doc_data.job_title}}</p></li>
                        <li><i class="iconfont">&#xe69e;</i><span>职称</span><p>{{doc_data.position}}</p></li>
                        <li><i class="iconfont">&#xe69e;</i><span>擅长领域</span><p>{{doc_data.field.name}}</p></li>
                        <li><i class="iconfont">&#xe69e;</i><span>门诊情况</span><p>{{doc_data.clinic_rota}}</p><p class="clinic_type">{{doc_data.clinic_type == 1?'专家':'普通'}}</p></li>
                    </ul>
                </div>
                <div class="btns flex_item">
                    <button class="btn_common" @click="unRecord">暂不录入</button>
                    <button class="btn_common" @click="mergeDocInfo">确认录入</button>
                </div>
            </div>
        </template>
        <div class="btn">
            <button class="btn_common" @click="change()">确定</button>
        </div>
    </div>
</template>
<script>
import { updateDocInfo,searchDoc,mergeDoc } from '../../../api/sendRequest';
import { adaptations } from '../../../api/staticRequest';
import { getStore } from '../../../config/util';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            value_name:'',
            number:'',
            show_cover:false,
            doc_data:{
                name:'',
                sex:0,
                hospital:{},
                depart:{},
                job_title:'',
                position:'',
                field_id:[],
                field:{},
                clinic_rota:'',
                id:'',
            },
            feild_str:'无数据'
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
    },
    methods:{
        // 录入医生信息
        async mergeDocInfo(){
            let res = await mergeDoc(this.user_info.yyid,this.user_info.user_token,this.$route.query.doctor_id,this.doc_data.id);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.$router.go(-1);
        },
        // 暂不录入医生信息
        async unRecord(){
            let update_data = JSON.parse(getStore('update_data'));
            let res = await updateDocInfo(
                update_data.user_yyid,
                update_data.user_token,
                update_data.member_yyid,
                update_data.true_name,
                update_data.gender,
                this.number,
                update_data.hospital_yyid,
                update_data.hospital_name,
                update_data.depart_id?update_data.depart_id:'',
                update_data.position,
                update_data.job_title,
                update_data.group_yyid,
                update_data.field_id,
                update_data.clinic_type,
                update_data.clinic_rota,
                this.$route.query.doctor_id
            );
            if(res.errcode == 0){
                this.$router.go(-1)
                return
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
        },
        async change(){
            let update_data = JSON.parse(getStore('update_data'));
            if(this.$route.query.type == '1'){
                if(this.value_name == ''){
                    this.$vux.toast.text('请输入修改姓名','top');
                    return
                }
                // this.unRecord();
                let res = await updateDocInfo(
                    update_data.user_yyid,
                    update_data.user_token,
                    update_data.member_yyid,
                    this.value_name,
                    update_data.gender,
                    update_data.mobile_num,
                    update_data.hospital_yyid,
                    update_data.hospital_name,
                    update_data.depart_id?update_data.depart_id:'',
                    update_data.position,
                    update_data.job_title,
                    update_data.group_yyid,
                    update_data.field_id,
				    update_data.clinic_type,
				    update_data.clinic_rota,
                    this.$route.query.doctor_id
                );
                if(res.errcode == 0){
                    this.$router.go(-1)
                }
            } else {
                if(this.number == ''){
                    this.$vux.toast.text('请输入手机号码','top');
                    return
                } else {
                    if(!(/^1[0-9]{10}$/.test(this.number))){ 
                        this.$vux.toast.text('手机号码有误，请重新填写','top'); 
                        return false; 
                    } 
                    if (this.$route.query.nick_name) {
                        let doc_res = await searchDoc(update_data.user_yyid,
                        update_data.user_token,this.number,this.$route.query.doctor_id);
                        if(doc_res.errcode != 0){
                            this.$vux.toast.text(doc_res.errmsg,'top');
                            return
                        }
                        if(doc_res.data.info.length === 0){
                            this.unRecord();
                            return
                        }
                        this.show_cover = true;
                        this.doc_data = {...doc_res.data.info};
                        this.feild_str = doc_res.data.info.field.name;
                        // if (doc_res.data.info.field_id) {
                        //     let adp_res = await adaptations;
                        //     let adp_list = adp_res.adaptationList;
                        //     for (let i = 0; i < adp_list.length; i++) {
                        //         if (adp_list[i].id == doc_res.data.info.field_id) {
                        //             this.feild_str = adp_list[i].value
                        //         } else {
                        //             this.feild_str = '无数据'
                        //         }
                        //     }
                        // }
                    } else {
                        this.unRecord();
                    }
                }
            };
        }
    }
}
</script>
<style lang="less" scoped>
    .change_info{
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        bottom: 0px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #F5F5F5;
        input{
            border: none;
            outline-style: none;
            line-height: 44px;
            width: 100%;
            padding: 0 10px;
        }

        .back_cover{
            top: 0;
            bottom: 0;
		}
		.popover_item{
			width: 285px;
			text-align: center;
			background-color: #ffffff;
			border-radius: 8px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			z-index: 12;
			.tab_con{
				padding: 15px 15px 0;
				ul{
					flex: 1;
					text-align: left;
					padding: 0 15px;
					li{
                        display: flex;
                        justify-content: flex-start;
						color: #747474;
						line-height: 24px;
						margin-bottom: 10px;
                        .iconfont{
                            font-size: 16PX;
                            margin-right: 4px;
                            color: #5870FE;
                        }
                        span{
                            width: 60px;
                            display: block;
                            margin-right: 20px;
                            color: #999999;
                        }
                        p{
                            color: #333333;
                        }
                        .clinic_type{
                            margin-left: 5px;
                            color: #5870FE;
                            background-color: #E5E8FF;
                            border-radius: 13px;
                            padding: 0 10px;
                        }
					}
					.active{
						color: #5870FE;
						border-bottom: 1PX solid #5870FE;
					}
				}
			}
            .btns{
                padding: 0 25px;
                button{
                    width: 160px;
                    color: #ffffff;
                    background-color: #5870FE;
                    margin-bottom: 20px;
                    margin-top: 20px;
                }
                button:nth-of-type(1){
                    color: #5870FE;
                    background-color: #ffffff;
                    border: 1PX solid #5870FE;
                    margin-right: 10px;
                }
            }
		}
        .btn{
            text-align: center;
            position: fixed;
            left: 0px;
            right: 0px;
            bottom: 0px;
            button{
                width: 80%;
                margin-bottom: 20px;
                color: #ffffff;
                background-color: #5870FE;
            }
        }
        
    }
</style>