<template>
    <div class="add_doc_detail" data-name="add_doc_detail">
        <div class="profile bgcw">
			<div class="flex_item bd_bt">
				<div class="p_title">真实姓名<i class="iconfont red">&#xe603;</i></div>
				<div class="p_con">
					<input type="text" placeholder="请输入真实姓名" v-model.trim="name" @input="saveData(1)">
				</div>
			</div>
			<group label-width="5em">
				<popup-picker 
				title="性别" 
				:data="gender_list" 
				v-model="value"
				:placeholder='value.toString()'
				@on-change="onChange"
				></popup-picker>
			</group>
            <div class="flex_item bd_bt">
				<div class="p_title">联系电话<i class="iconfont red">&#xe603;</i></div>
				<div class="p_con">
					<input type="text" placeholder="请输入联系电话" maxlength="11"  v-model.trim="number" @input="saveData(2)">
				</div>
			</div>
            <div class="flex_item bd_bt">
				<div class="p_title">所在医院</div>
				<div class="p_con">
					{{visit_data.v_hos_name}}
				</div>
			</div>
            <router-link :to="{path:'/visitDocDep'}" class="flex_item bd_bt">
				<div class="p_title">所在科室<i class="iconfont red">&#xe603;</i></div>
				<div class="p_con">{{depart_name}}<i class="iconfont">&#xe661;</i></div>
			</router-link>
			<group label-width="5em">
				<popup-picker 
				title="级别" 
				:data="position" 
				v-model="position_val"
				:placeholder='position_val.toString()'
				@on-change="onChange2"
				></popup-picker>
			</group>
			<group label-width="5em">
				<popup-picker 
				title="职称" 
				:data="job_title_list" 
				v-model="job_title"
				:placeholder='job_title.toString()'
				@on-change="onChange3"
				></popup-picker>
			</group>
			<router-link :to="{path:'/docTerritory',query:{type:1}}" class="flex_item bd_bt">
				<div class="p_title">擅长领域</div>
				<div class="p_con">{{terr_value.value}}<i class="iconfont">&#xe661;</i></div>
			</router-link>
			<div class="flex_item bd_bt" @click="showCliData(1)">
				<div class="p_title">门诊情况</div>
				<div class="p_con"><span v-show="clinic_type" class="doc_type font_10">{{clinic_type == 1?'专家':(clinic_type == 2?'普通':'未知')}}</span>{{clinic_type_str}}<i class="iconfont">&#xe661;</i></div>
			</div>
        </div>
		<transition name="showcover">
			<div class="back_cover" v-show="show_cover" @click="showCliData(2)"></div>
		</transition>
		<div v-show="show_cover" class="popover_item">
            <tab :line-width="1" :custom-bar-width="getBarWidth">
				<tab-item selected  @on-item-click="onItemClick(1)">专家</tab-item>
				<tab-item @on-item-click="onItemClick(2)">普通</tab-item>
			</tab>
			<div class="tab_con flex_item">
				<ul>
					<li :class="{active:item == week}" v-for="(item,index) in week_list" :key="index" @click="selectWeek(item)">{{item}}</li>
				</ul>
				<ul>
					<li :class="{active:item == day}" v-for="(item,index) in day_list" :key="index"  @click="selectDay(item)">{{item}}</li>
				</ul>
			</div>
            <button class="btn_common" @click="selectClinic">确定</button>
        </div>
		<div class="add_new_doc bgcw">
            <button class="btn_common" @click="addNewDoc">{{this.$route.query.type == 'edit'?'编辑':'新增'}}医生</button>
        </div>
    </div>
</template>
<script>
import { depList,addDoc,vdocDetail,vdocEdit } from '../../api/sendRequest';
import { adaptations } from '../../api/staticRequest';
import { removeSessionStore,getSessionStore,setSessionStore } from '../../config/util';
import { Group,PopupPicker,Tab,TabItem } from 'vux';
import { mapState } from 'vuex';
export default {
    data(){
        return {
			name:'',
			number:'',
			value:[],
			depart_name:'',
			depart_id:'',
			data:{},
			gender_list:[['女','男']],
			gender:'',
			position_val:[],
			position:[['职员','科室主任','科室副主任','院长','副院长']],
			job_title:[],
			job_title_list:[['医士','医师','主治医师','副主任医师','主任医师','护士','护师','主管护师','副主任护师','主任护师','初级药士','初级药师','中级主管药师','副主任药剂师','主任药剂师','初级中药士','初级中药师','中级主管中药师','副主任药剂师','主任药剂师','初级检验技士','初级检验技师','检验主管技师','副主任检验师','主任检验师','初级放射技士','初级放射技师','放射主管技师','副主任放射技师','主任放射技师','康复治疗士','初级康复治疗师','中级治疗师','高级治疗师']],
			week_list:['周一','周二','周三','周四','周五','周六','周日'],
			day_list:['上午','下午','夜班'],
			week:'',
			day:'',
			week_day:'',
			clinic_type:'',
			clinic_type_str:'',
			show_cover:false,
			getBarWidth: function (index) {
				return (index + 1) * 22 + 'px'
			},
			terr_value:{},

        }
	},
	computed:{
		...mapState([
			'user_info',
			'visit_data'
		])
	},
    components:{
		Group,
		PopupPicker,
		Tab,
		TabItem
	},
	mounted(){
		this.getSaveData();
		// 修改title
		this.$route.query.type == 'edit'?document.title='编辑医生':document.title='新增医生';
	},
    methods:{
		// 获取本地存储数据
		async getSaveData(){
			if (this.$route.query.type == 'edit') {
				let res = await vdocDetail(this.user_info.yyid,this.user_info.user_token,this.$route.query.doctor_id);
				if (res.errcode != 0) {
					this.$vux.toast.text(res.errmsg,'top');
					return
				};
				let info = res.data.info;

				this.name = getSessionStore('doc_name')?getSessionStore('doc_name'):info.name;
				this.number  = getSessionStore('doc_num')?getSessionStore('doc_num'):info.mobile;
				// 性别问题
				let sex = info.sex == 1?'男':'女';
				this.value = getSessionStore('doc_gender')?JSON.parse(getSessionStore('doc_gender')):[sex];
				this.depart_name = getSessionStore('doc_dep')?JSON.parse(getSessionStore('doc_dep')).value:info.depart.name;
				this.depart_id = getSessionStore('doc_dep')?JSON.parse(getSessionStore('doc_dep')).key:info.depart.id;
				this.position_val = getSessionStore('doc_pos')?JSON.parse(getSessionStore('doc_pos')):[info.position];
				this.job_title = getSessionStore('doc_job')?JSON.parse(getSessionStore('doc_job')):[info.job_title];
				// 判断擅长领域
				let terr_info = {};
				let adp_res = await adaptations;
				let adp_list = adp_res.adaptationList;
				for (let i = 0; i < adp_list.length; i++) {
					if (adp_list[i].id == info.field_id) {
						terr_info.id = adp_list[i].id;
						terr_info.value = adp_list[i].value;
					} 
					
				}
				// adaptations.then(res => {
				// 	res.adaptationList.map((item) => {
				// 		if (item.id == info.field_id) {
				// 			terr_info.id = item.id;
				// 			terr_info.value = item.value;
				// 		} 
				// 	})
				// })
				this.terr_value = getSessionStore('doc_terr')?JSON.parse(getSessionStore('doc_terr')):terr_info;
				this.clinic_type = getSessionStore('doc_clinic_type')?getSessionStore('doc_clinic_type'):info.clinic_type;
				this.clinic_type_str = getSessionStore('doc_date')?getSessionStore('doc_date'):info.clinic_rota;
			} else {
				this.name = getSessionStore('doc_name')?getSessionStore('doc_name'):'';
				this.number  = getSessionStore('doc_num')?getSessionStore('doc_num'):'';
				// 性别问题
				this.value = getSessionStore('doc_gender')?JSON.parse(getSessionStore('doc_gender')):[];
				this.depart_name = getSessionStore('doc_dep')?JSON.parse(getSessionStore('doc_dep')).value:'';
				this.depart_id = getSessionStore('doc_dep')?JSON.parse(getSessionStore('doc_dep')).key:'';
				this.position_val = getSessionStore('doc_pos')?JSON.parse(getSessionStore('doc_pos')):[];
				this.job_title = getSessionStore('doc_job')?JSON.parse(getSessionStore('doc_job')):[];
				this.terr_value = getSessionStore('doc_terr')?JSON.parse(getSessionStore('doc_terr')):{};
				this.clinic_type = getSessionStore('doc_clinic_type')?getSessionStore('doc_clinic_type'):'';
				this.clinic_type_str = getSessionStore('doc_date')?getSessionStore('doc_date'):'';
			}
		},
		// 输入
		saveData(type){
			if(type === 1){
				setSessionStore('doc_name',this.name);
			} else if(type === 2) {
				setSessionStore('doc_num',this.number);
			}
		},
		async onChange (val) {
			setSessionStore('doc_gender',val);
			if(val[0] == '女'){
				this.gender = 2;
			} else if(val[0] == '男'){
				this.gender = 1;
			}
		},
		onChange2(val){
			setSessionStore('doc_pos',val);
		},
		onChange3(val){
			setSessionStore('doc_job',val);
		},
		// 显示门诊情况
		showCliData(type){
			if (type == 1) {
				this.show_cover = true;
				this.clinic_type = 1;	
			} else if(type == 2){
				this.show_cover = false;
				this.clinic_type = '';	
			}
			
		},
		selectWeek(week){
			this.week = week;
		},
		selectDay(day){
			this.day = day;
		},
		onItemClick(type){
			this.clinic_type = type;
			this.week = '';
			this.day = '';
			this.clinic_rota = '';
			// if (type == 1) {
			// 	this.clinic_type_str='专家';
			// } else {
			// 	this.clinic_type_str='普通';
			// }
			setSessionStore('doc_clinic_type',type);
		},
		selectClinic(){
			if(this.week == ''|| this.day == ''){
				this.$vux.toast.text('请选择类型','top');
                return
			};
			if (this.clinic_type == '') {
				this.clinic_type = 1
				setSessionStore('doc_clinic_type',1);
			};
			setSessionStore('doc_date',`${this.week}${this.day}`);
			this.clinic_type_str = `${this.week}${this.day}`;
			this.show_cover = false;
		},
		async addNewDoc(){
			let reg = /^1[0-9]{10}$/;//验证手机号
			// let dep_id = getSessionStore('doc_dep')?JSON.parse(getSessionStore('doc_dep')).key:'';
			if (this.name == '') {
				this.$vux.toast.text('输入姓名','top');
				return
			};
			if (this.number == '') {
				this.$vux.toast.text('输入手机号','top');
				return
			} else if (!reg.test(this.number)) {
              this.$vux.toast.text('手机号码格式不正确','top');
			  return
          	};
			if (this.depart_id == '') {
				this.$vux.toast.text('请选择科室','top');
				return
			};
			if (this.$route.query.type == 'edit') {
				let res = await vdocEdit(
					this.user_info.yyid,
					this.user_info.user_token,
					this.name,
					this.gender,
					this.number,
					this.$route.query.hos_id,
					this.depart_id,
					this.job_title.toString(),
					this.position_val.toString(),
					this.terr_value.id?this.terr_value.id:'',
					this.clinic_type,
					this.clinic_type_str,
					this.$route.query.doctor_id
				);
				if (res.errcode != 0) {
					this.$vux.toast.text(res.errmsg,'top');
					return
				};	
			} else {
				let res = await addDoc(
					this.user_info.yyid,
					this.user_info.user_token,
					this.name,
					this.gender,
					this.number,
					this.position_val.toString(),
					this.job_title.toString(),
					this.terr_value.id?this.terr_value.id:'',
					this.visit_data.v_hos_id,
					this.depart_id,
					this.clinic_type,
					this.clinic_type_str
				);
				if (res.errcode != 0) {
					this.$vux.toast.text(res.errmsg,'top');
					return
				};	
			}
			removeSessionStore('doc_num');
			removeSessionStore('doc_name');
			removeSessionStore('doc_gender');
			removeSessionStore('doc_dep');
			removeSessionStore('doc_pos');
			removeSessionStore('doc_job');
			removeSessionStore('doc_terr');
			removeSessionStore('doc_date');
			removeSessionStore('doc_clinic_type');
			this.$router.go(-1);
		}
    }
}
</script>
<style lang="less">
    .add_doc_detail{
		padding-bottom: 70px;
		.vux-no-group-title{
			margin-top: 0;
		}
		.weui-cell{
			padding: 8px 0;
			font-size: 14PX;
			.vux-cell-value{
				color: #999999;
				margin-right: 5px;
			}
			.weui-cell__ft{
				&::after{
					width: 7px;
					height:7px;
					border-width:2px 2px 0 0;
					border-color: #999999;
					right: 3px;
				}
			}
		}
		.weui-cells{
			&::before{
				border-top: none;
			}
		}
        .profile{
			padding: 10px 15px 0 15px;
			.flex_item{
				height: 44px;
				line-height: 44px;
				.p_title{
					width: 100px;
				}
				.p_con{
					color: #999999;
					overflow: hidden;
                	text-overflow:ellipsis;
                	white-space: nowrap;
					.iconfont{
						font-size: 14PX;
						color: #aaaaaa;
						margin-left: 5px;
						line-height: 20px;
					}
				}
				.iconfont{
					font-size: 14PX;
					color: #aaaaaa;
					margin-left: 5px;
				}
			}
		}
		.flex_item{
			.red{
				color: #FF5252!important;
				margin-left: 0 !important;
				font-size: 20PX!important;
			}
			input{
				outline-style: none;
				border: none;
				text-align: right;
			}
			.doc_type{
				padding:3px 6px;
				border-radius: 12px;
				margin-right: 8px;
				background-color: #E5E8FF;
				color: #5870FE;
			}
		}
		.add_new_doc{
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
			.vux-tab{
				border-radius: 8px;
				.vux-tab-item{
					border-radius: 8px;
				}
				.vux-tab-item.vux-tab-selected{
					color: #5870FE;
					border-bottom-color: #5870FE;
				}
			}
			.vux-tab-bar-inner{
				background-color: #5870FE;
			}
			.tab_con{
				height: 130px;
				padding: 15px;
				ul{
					flex: 1;
					text-align: left;
					padding: 0 15px;
					li{
						color: #747474;
						line-height: 24px;
						margin-bottom: 15px;
					}
					.active{
						color: #5870FE;
						border-bottom: 1PX solid #5870FE;
					}
				}
				ul:nth-of-type(1){
					height: 130px;
					overflow-y: scroll;
					padding: 0 15px;
					border-right: 1px solid #F3F3F3;
				}
			}
			button{
				width: 160px;
				color: #ffffff;
				background-color: #5870FE;
				margin-bottom: 20px;
				margin-top: 20px;
			}
			.digit_status_btn{
				background-color: #ffffff;
				width: 80%;
				color: #FF982A;
				border-color: #FF982A;
			}
		}
    }
</style>