<template>
    <div class="staff_detail" data-name="doc_staff_detail">
        <div class="profile bgcw">
			<div class="flex_item bd_bt avatar">
				<div class="p_title">头像</div>
				<div class="p_con">
					<img :src="data.headimgurl" alt="">
				</div>
			</div>
			<div class="flex_item bd_bt">
				<div class="p_title">微信昵称</div>
				<div class="p_con">{{data.nickname}}</div>
			</div>
			<router-link :to="{path:'/changeInfo',query:{type:'2',member_yyid:this.$route.query.member_yyid,doctor_id:this.$route.query.doctor_id,nick_name:data.nickname}}" class="flex_item bd_bt">
				<div class="p_title">联系电话</div>
				<div class="p_con">{{data.mobile_num}}<i class="iconfont">&#xe661;</i></div>
			</router-link>
			<router-link :to="{path:'/changeInfo',query:{type:'1',member_yyid:this.$route.query.member_yyid,doctor_id:this.$route.query.doctor_id}}" class="flex_item bd_bt">
				<div class="p_title">真实姓名</div>
				<div class="p_con">{{data.true_name}}<i class="iconfont">&#xe661;</i></div>
			</router-link>
			<group label-width="5em">
				<popup-picker 
				title="性别" 
				:data="gender_list" 
				v-model="value1"
				:placeholder='value1.toString()'
				@on-hide="onChange(value1.toString())"></popup-picker>
			</group>
            
            <router-link :to="{path:'/docHosList',query:{member_yyid:this.$route.query.member_yyid,doctor_id:this.$route.query.doctor_id}}" class="flex_item bd_bt">
				<div class="p_title">所在医院</div>
				<div class="p_con">
					{{data.hospital_name}}
				</div>
				<i class="iconfont">&#xe661;</i>
			</router-link>
            <router-link :to="{path:'/docDepList',query:{member_yyid:this.$route.query.member_yyid,doctor_id:this.$route.query.doctor_id}}" class="flex_item bd_bt">
				<div class="p_title">所在科室</div>
				<div class="p_con">{{data.depart_name}}<i class="iconfont">&#xe661;</i></div>
			</router-link>
			<group label-width="5em">
				<popup-picker 
				title="级别" 
				:data="position" 
				v-model="position_val"
				:placeholder='position_val.toString()'
				@on-hide="onChange2(position_val.toString())"></popup-picker>
			</group>
			<group label-width="5em">
				<popup-picker 
				title="职称" 
				:data="job_title_list" 
				v-model="job_title"
				:placeholder='job_title.toString()'
				@on-hide="onChange3(job_title.toString())"></popup-picker>
			</group>
			<router-link :to="{path:'/docTerritory',query:{id:data.field_id,doctor_id:this.$route.query.doctor_id}}" class="flex_item bd_bt">
				<div class="p_title">擅长领域</div>
				<div class="p_con">{{data.field_name}}<i class="iconfont">&#xe661;</i></div>
			</router-link>
			<div class="flex_item bd_bt" @click="show_cover = true">
				<div class="p_title">门诊情况</div>
				<div class="p_con">{{data.clinic_rota}}<i class="iconfont">&#xe661;</i></div>
			</div>
			<router-link v-show="this.$route.query.member_yyid" :to="{path:'/moveMember',query:{type:1,member_yyid:this.$route.query.member_yyid,doctor_id:this.$route.query.doctor_id}}"  class="flex_item bd_bt">
				<div class="p_title">当前分组</div>
				<div class="p_con">{{data.group_name}}<i class="iconfont">&#xe661;</i></div>
			</router-link>
        </div>
		<transition name="showcover">
			<div class="back_cover" v-show="show_cover" @click="show_cover = false"></div>
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
    </div>
</template>
<script>
import { docDetail,updateDocInfo } from '../../../api/sendRequest';
import { depList } from '../../../api/staticRequest';
import { setStore,getStore } from '../../../config/util';
import { Group,PopupPicker,Tab,TabItem } from 'vux';
import { mapState } from 'vuex';
export default {
    data(){
        return {
			value1:[],
			data:{},
			gender_list:[['未知','女','男']],
			position_val:[],
			position:[['职员','科室主任','科室副主任','院长','副院长']],
			job_title:[],
			job_title_list:[['医士','医师','主治医师','副主任医师','主任医师','护士','护师','主管护师','副主任护师','主任护师','初级药士','初级药师','中级主管药师','副主任药剂师','主任药剂师','初级中药士','初级中药师','中级主管中药师','副主任药剂师','主任药剂师','初级检验技士','初级检验技师','检验主管技师','副主任检验师','主任检验师','初级放射技士','初级放射技师','放射主管技师','副主任放射技师','主任放射技师','康复治疗士','初级康复治疗师','中级治疗师','高级治疗师']],
			update_data:{
				'user_yyid':'',
				'user_token':'',
				'member_yyids':'',
				'true_name':'',
				'gender':'',
				'mobile_num':'',
				'hospital_yyid':'',
				'hospital_name':'',
				'depart_id':'',
				'position':'',
				'job_title':'',
				'group_yyid':'',
				'field_id':'',
				'clinic_type':'',
				'clinic_rota':''
			},
			week_list:['周一','周二','周三','周四','周五','周六','周日'],
			day_list:['上午','下午','夜班'],
			week:'',
			day:'',
			week_day:'',
			clinic_type:1,
			show_cover:false,
			getBarWidth: function (index) {
				return (index + 1) * 22 + 'px'
			}
        }
	},
	computed:{
		...mapState([
			'user_info'
		])
	},
    components:{
		Group,
		PopupPicker,
		Tab,
		TabItem
	},
	mounted(){
		this.getDgDetail();
	},
    methods:{
        async getDgDetail(){
			let res = await docDetail(this.user_info.yyid,this.user_info.user_token,this.$route.query.member_yyid,this.$route.query.doctor_id);
			if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
			this.data = {...res.data};
			this.$set(this.value1,0,res.data.gender == 0?'未知':(res.data.gender == 1?'男':'女'));
			this.$set(this.position_val,0,res.data.position);
			this.$set(this.job_title,0,res.data.job_title);
			this.update_data.user_yyid = this.user_info.yyid;
			this.update_data.user_token = this.user_info.user_token;
			this.update_data.member_yyid = this.$route.query.member_yyid;
			this.update_data.group_yyid = this.$route.query.group_yyid;
			this.update_data.true_name = res.data.true_name?res.data.true_name:'';
			this.update_data.gender = res.data.gender;
			this.update_data.depart_id = res.data.depart_id?res.data.depart_id:'';
			this.update_data.mobile_num = res.data.mobile_num?res.data.mobile_num:'';
			this.update_data.hospital_yyid = res.data.hospital_yyid?res.data.hospital_yyid:'';
			this.update_data.hospital_name = res.data.hospital_name?res.data.hospital_name:'';
			this.update_data.position = res.data.position?res.data.position:'';
			this.update_data.job_title = res.data.job_title?res.data.job_title:'';
			this.update_data.field_id = res.data.field_id?res.data.field_id:'';
			this.update_data.clinic_type = res.data.clinic_type?res.data.clinic_type:'';
			this.update_data.clinic_rota = res.data.clinic_rota?res.data.clinic_rota:'';
			this.week = res.data.clinic_rota.split('-')[0];
			this.day = res.data.clinic_rota.split('-')[1];
			this.clinic_rota = this.week+'-'+this.day;
			setStore('update_data',this.update_data);
		},
		async update(data){
			let res = await updateDocInfo(
				data.user_yyid,
				data.user_token,
				data.member_yyid,
				data.true_name,
				data.gender,
				data.mobile_num,
				data.hospital_yyid,
				data.hospital_name,
				data.depart_id,
				data.position,
				data.job_title,
				data.group_yyid,
				data.field_id,
				data.clinic_type,
				data.clinic_rota,
				this.$route.query.doctor_id
			);
			this.getDgDetail();
		},
		async onChange (val) {
			let gender;
			if(val == '未知'){
				gender = 0;
			} else if(val == '女'){
				gender = 2;
			} else if(val == '男'){
				gender = 1;
			}
			this.update_data.gender = gender;
			this.update(this.update_data)
		},
		onChange2(val){
			this.update_data.position = val;
			this.update(this.update_data);
		},
		onChange3(val){
			this.update_data.job_title = val;
			this.update(this.update_data);
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
		},
		selectClinic(){
			if(this.week == ''|| this.day == ''){
				this.$vux.toast.text('请选择类型','top');
                return
			}
			this.update_data.clinic_type = this.clinic_type;
			this.update_data.clinic_rota = this.week+'-'+this.day;
			this.show_cover = false;
			this.update(this.update_data);
		}
    }
}
</script>
<style lang="less">
    .staff_detail{
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
			.avatar{
				height: auto;
				.p_con{
					width: 40px;
					height: 40px;
					margin-bottom: 8px;
					border-radius: 50%;
					border: 1PX solid #CCCCCC;
					overflow: hidden;
                	text-overflow:ellipsis;
                	white-space: nowrap;
					img{
						width: 100%;
						border-radius: 50%;
					}
					
				}
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