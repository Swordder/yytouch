<template>
    <div class="invite_detail" data-name="invite_detail">
        <div class="profile bgcw">
			<div class="flex_item bd_bt avatar">
				<div class="p_title">头像</div>
				<div class="p_con">
					<img :src="data.headimgurl" alt="">
				</div>
			</div>
			<div class="flex_item bd_bt">
				<div class="p_title">姓名</div>
				<div class="p_con">{{data.name}}</div>
			</div>
            <group label-width="5em">
				<popup-picker 
				title="角色" 
				:data="role_list" 
				v-model="value"
				:placeholder='value.toString()'
				@on-change="onChange"></popup-picker>
			</group>
        </div>
        <div class="back_btn">
            <button class="btn_common" @click="() => { this.$router.go(-1) }">返回</button>
        </div>
    </div>
</template>
<script>
import { inviteUsersDetail,inviteUsersUpdate } from '../../api/sendRequest';
import { Group,PopupPicker } from 'vux';
import { mapState } from 'vuex';
export default {
    data(){
        return {
			value:[],
			data:{},
			role_list:[['医生','代表']],
        }
	},
	computed:{
		...mapState([
			'user_info'
		])
	},
    components:{
		Group,
        PopupPicker
	},
	mounted(){
        this.getDgDetail()
	},
    methods:{
        async getDgDetail(){
            let res = await inviteUsersDetail(this.user_info.yyid,this.user_info.user_token,this.$route.query.member_yyid);
            this.data = {...res.data};
            this.$set(this.value,0,res.data.user_type == 1?'代表':'医生');
		},
		async onChange (val) {
            let type = '';
            if(val.toString() == '医生'){
                type = 2;
            } else {
                type = 1
            }
            let res = await inviteUsersUpdate(this.user_info.yyid,this.user_info.user_token,this.$route.query.member_yyid,type);

		},
		
    }
}
</script>
<style lang="less">
    .invite_detail{
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
				.p_con{
					color: #999999;
					.iconfont{
						font-size: 14PX;
						color: #aaaaaa;
						margin-left: 5px;
						line-height: 20px;
					}
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
					img{
						width: 100%;
						border-radius: 50%;
					}
					
				}
			}
        }
        .back_btn{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 10;
            background-color: #ffffff;
            padding: 15px;
            button{
                display: block;
                width: 100%;
                height: 44px;
                line-height: 44px;
                font-size: 14PX;
                background-color: #5870FE;
                color: #ffffff;
            }
        }
    }
</style>