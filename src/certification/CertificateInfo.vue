<template>
	<div class="certify_page pd_15" data-name="page_certify">
		<div class="flex_item bd_bt">
			<div class="c_title"><i class="iconfont">&#xe603;</i>真实姓名</div>
			<div class="c_bd">
				<input class="bgcw" v-model.trim="name_value" type="text" @input="nameChang" placeholder="请输入您的姓名">
			</div>
		</div>
		<div class="flex_item bd_bt">
			<div class="c_title"> 曾服务的医院</div>
			<router-link to="/selectHos" class="">
				<div class="c_bd flex_item" :class="{'flex_end':yyid_list.length != 0}">
					<p v-if="yyid_list.length == 0">点击选择医院</p>
					<div v-else class="c_show flex_item">
						<p class="c_num">已选择 {{yyid_list.length}}</p>
						<i class="iconfont">&#xe661;</i>
					</div>
					<i v-show="yyid_list.length == 0" class="iconfont">&#xe661;</i>
				</div>
			</router-link>
		</div>
		<div class="flex_item bd_bt">
			<div class="c_title"><i class="iconfont">&#xe603;</i>可服务的城市</div>
			<router-link to="/serviceCity" class="">
				<div class="c_bd flex_item" :class="{'flex_end':region != 0}">
					<p v-if="region == ''">点击选择城市</p>
					<div v-else class="c_show flex_item">
						<p class="c_num">{{region}}</p>
						<i class="iconfont">&#xe661;</i>
					</div>
					<i v-show="region == ''" class="iconfont">&#xe661;</i>
				</div>
			</router-link>
		</div>
		<div class="flex_item bd_bt">
			<div class="c_title"><i class="iconfont">&#xe603;</i>服务公司</div>
			<router-link to="/companyList" class="">
				<div class="c_bd flex_item" :class="{'flex_end':company_name != ''}">
					<p v-if="company_name == ''">点击选择公司</p>
					<div v-else class="c_show flex_item">
						<p class="c_num">{{company_name}}</p>
						<i class="iconfont">&#xe661;</i>
					</div>
					<i v-show="company_name == ''" class="iconfont">&#xe661;</i>
				</div>
			</router-link>
		</div>
		<div v-show="company_name === '其他'" class="flex_item bd_bt">
			<div class="c_title"><i class="iconfont">&#xe603;</i>公司名称</div>
			<router-link :to="{path:'/totalCompany',query:{'type':1}}" class="">
				<div class="c_bd flex_item" :class="{'flex_end':other_company != ''}">
					<p v-if="other_company == ''">点击选择公司</p>
					<div v-else class="c_show flex_item">
						<p class="c_num">{{other_company}}</p>
						<i class="iconfont">&#xe661;</i>
					</div>
					<i v-show="other_company == ''" class="iconfont">&#xe661;</i>
				</div>
			</router-link>
		</div>
		<div class="flex_item bd_bt">
			<div class="c_title"><i class="iconfont">&#xe603;</i>医药推广年限</div>
			<div class="c_bd">
				<input class="bgcw" v-model.trim="year" @input="yearChange"  placeholder="请输入您的推广年限">
			</div>
		</div>
		<div class="flex_item bd_bt">
			<div class="c_title"> 近期服务的公司</div>
			<router-link to="/company" class="">
				<div class="c_bd flex_item" :class="{'flex_end': company_list.length !== 0 }">
					<p v-if="company_list.length === 0">点击填写详细信息</p>
					<div v-else class="c_show flex_item">
						<p class="c_num">已填写{{company_list.length}}个公司信息</p>
						<i class="iconfont">&#xe661;</i>
					</div>
					<i v-show="company_list.length == 0 " class="iconfont">&#xe661;</i>
				</div>
			</router-link>
		</div>
		<div class="flex_item bd_bt">
			<div class="c_title"><i class="iconfont">&#xe603;</i>熟悉的科室</div>
			<router-link to="/depList" class="">
				<div class="c_bd flex_item" :class="{'flex_end':deps.length !== 0}">
					<p v-if="deps.length === 0">点击选择科室名称</p>
					<div v-else class="c_show flex_item">
						<p class="c_num">已选择{{deps.length}}个</p>
						<i class="iconfont">&#xe661;</i>
					</div>
					<i v-show="deps.length == 0" class="iconfont">&#xe661;</i>
				</div>
			</router-link>
		</div>
		<div class="c_check">
			<div class="flex_item">
				<div class="c_title">您擅长的服务方向</div>
				<div class="c_ft">（可多选）</div>
			</div>
			<div class="c_classify">
				<checklist ref="demoObject" :options="direction_list" v-model="direction_listValue" @on-change="changeDirect"></checklist>
			</div>
		</div>
		<div class="agent_btn">
			<a href="javascript:;" @click="fnThrottle()">{{$t('sub_btn')}}</a>
		</div>
	</div>
</template>
<script>
	import { Checklist } from 'vux'
	import {getAgentInfo,agentAdd} from '../../api/sendRequest.js'
	import {setSessionStore,getSessionStore,removeSessionStore,throttle} from '../../config/util.js'
	import { mapState,mapMutations,mapActions} from 'vuex'
	export default {
		data() {
			return {
				name_value:'',
				direction_list: [
					{
						key: '1', value: '医院列名服务',
					},
					{
						key: '2', value: '学术营销服务',
					},
				],
				direction_listValue: [],
				company_name:'',
				other_company:'',
				familiar_company:'',
				year:'',
				region:'',
				region_yyid:''
			};
		},
		components:{
			Checklist
		},
		computed: {
		    ...mapState([
		        'user_info',
				'yyid_list',
				'deps',
				'company_list'
		    ]),
		},
		mounted(){
			this.checkUserInfo();
			this.agentInfo()
		},
		methods:{
			...mapMutations([
				'INIT_CART_LIST',
				'GET_DEPS'
			]),
			...mapActions([
				'checkUserInfo'
			]),
			nameChang(){
				setSessionStore('yy_truename',this.name_value);
			},
			yearChange(){
				setSessionStore('yy_year',this.year);
			},
			changeDirect(val, label){
				setSessionStore('yy_direct',val);
			},
			async agentInfo(){
				this.name_value = getSessionStore('yy_truename') ? getSessionStore('yy_truename'):'';
				this.company_name = getSessionStore('yy_company_name') ? getSessionStore('yy_company_name'):'';
				this.region = getSessionStore('region') ? getSessionStore('region'):'';
				this.region_yyid = getSessionStore('region_yyid') ? getSessionStore('region_yyid'):'';
				this.other_company = getSessionStore('yy_other_com') ? getSessionStore('yy_other_com'):'';
				this.year = getSessionStore('yy_year')?JSON.parse(getSessionStore('yy_year')):'';
				this.direction_listValue = getSessionStore('yy_direct')?JSON.parse(getSessionStore('yy_direct')):[];
		},
      	// 函数节流的应用
      	fnThrottle:throttle(function () {
        	this.submintCertifyInfo()
      	},1000),
		submintCertifyInfo(){

			if(this.name_value == ''){
				this.$vux.toast.text('请填写真实姓名','top');
				return
			};
			// if(this.yyid_list.length == 0){
			// 	this.$vux.toast.text('请选择可服务的医院','top');
			// 	return
			// };
			if(this.region_yyid == ''||this.region_yyid == undefined){
				this.$vux.toast.text('请选择可服务的城市','top');
				return
			};
			if(this.company_name == '其他' && this.other_company == ''){
				this.$vux.toast.text('请填写公司名称','top');
				return
			};
			if(this.year == ''){
				this.$vux.toast.text('请填写医药推广年限','top');
				return
			};
			// if(this.company_list.length === 0){
			// 	this.$vux.toast.text('请填写近期服务过的公司','top');
			// 	return
			// };
			if(this.deps.length === 0){
				this.$vux.toast.text('请选择熟悉的科室','top');
				return
			}
			agentAdd(
				this.user_info.yyid,
				this.user_info.user_token,
				this.name_value,
				this.yyid_list.join(','),
				this.region_yyid,
				getSessionStore('yy_company_id'),
				this.other_company,
				this.year,
				JSON.stringify(this.company_list),
				this.deps,
				this.direction_listValue.join(',')
			).then(res => {
				if(res.errcode == 0){
					window.sessionStorage.clear();
					if(this.$route.query.redirect&&this.$route.query.redirect !=''){
						this.$router.push({path:decodeURIComponent(this.$route.query.redirect)});
					} else {
						this.$router.push({
							name:'user_info'
						})
					}
					return
				}else {
					this.$vux.toast.text(res.errmsg,'top');
				}
			})
		}
	}
}
</script>
<style lang="less">
.weui-toast.weui-toast_text{
	min-height: 0;
	background-color: #F65B6A;
	width: 100% !important;
	top: 0px;
}
.weui-toast_text .weui-toast__content{
	width: 100%;
}
.certify_page{
	.flex_item{
		height: 44px;
		line-height: 44px;
		justify-content: flex-start;
		align-items: center;
		.c_title{
			flex: 1;
			position: relative;
			.iconfont{
				position: absolute;
				top: -5px;
				left: -15px;
				color: #FF5252;
			}
		}
		a{
			flex: 2;
		}
		.c_bd{
			flex: 2;
			color: #BBBBBB;
			justify-content: space-between;
			.c_num{
				color: #5870FE;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
		.flex_end{
			justify-content: flex-end;
		}
		input{
			border: none;
			line-height: 30px;
			outline-style: none;
		}
	}
	.c_depart_check{
		padding-bottom: 6px;
	}
	.c_check{
		.flex_item{
			justify-content: space-between;
			.c_ft{
				color: #BBBBBB;
			}
		}
		.weui-cells{
			&:before{
				border-top: none;
			}
			&:after{
				border-bottom: none;
			}
			.weui-cell{
				padding: 8px 0;
				font-size: 14px;
				color: #666666;
				&:before{
					border-top: none;
				}
				.weui-icon-checked{
					&:before{
						font-size: 20px;
					}
				}
				.weui-check:checked + .vux-checklist-icon-checked:before{
					color: #5870FE;
				}
			}

		}

	}
}
</style>
