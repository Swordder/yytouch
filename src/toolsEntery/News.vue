<template>
	<div class="p_center_news bgc" data-name="page_flow_list">
		<div class="list_item bgcw" v-for="(item,index) in list" :key="index">
			<router-link v-if="item.msg_type == 7" :to="{path:'/flowWarnDetail',query:{msg_yyid:item.msg_yyid}}" class="flex_item a_flex_item">
				<div class="list_item_l">
					<div class="list_item_hd">
						{{item.title}}
						<span class="font_10">{{item.created_time}}</span>
					</div>
					<div class="list_item_bd">
						{{item.sub_title}}
					</div>
				</div>
				<div class="list_item_r">
					<i v-show="item.is_read == 0" class="iconfont red">&#xe609;</i>
					<i class="iconfont">&#xe661;</i>
				</div>
			</router-link>
			<div v-else-if="item.msg_type == 8" @click="goToDetail(item.msg_yyid,item.msg_type)" class="flex_item a_flex_item">
				<div class="list_item_l">
					<div class="list_item_hd">
						{{item.title}}
						<span class="font_10">{{item.created_time}}</span>
					</div>
					<div class="list_item_bd">
						{{item.sub_title}}
					</div>
				</div>
				<div class="list_item_r">
					<i v-show="item.is_read == 0" class="iconfont red">&#xe609;</i>
				</div>
			</div>
			<div v-else-if="item.msg_type == 9" @click="goToDetail(item.msg_yyid,item.msg_type)" class="flex_item a_flex_item">
				<div class="list_item_l">
					<div class="list_item_hd">
						{{item.title}}
						<span class="font_10">{{item.created_time}}</span>
					</div>
					<div class="list_item_bd">
						{{item.sub_title}}
					</div>
				</div>
				<div class="list_item_r">
					<i v-show="item.is_read == 0" class="iconfont red">&#xe609;</i>
				</div>
			</div>
			<div v-else-if="item.msg_type == 10" @click="goToDetail(item.msg_yyid,item.msg_type)" class="flex_item a_flex_item">
				<div class="list_item_l">
					<div class="list_item_hd">
						{{item.title}}
						<span class="font_10">{{item.created_time}}</span>
					</div>
					<div class="list_item_bd">
						{{item.sub_title}}
					</div>
				</div>
				<div class="list_item_r">
					<i v-show="item.is_read == 0" class="iconfont red">&#xe609;</i>
				</div>
			</div>
			<div v-else-if="item.msg_type == 11" @click="goToDetail(item.msg_yyid,item.msg_type,item.link)" class="flex_item a_flex_item">
				<div class="list_item_l">
					<div class="list_item_hd">
						{{item.title}}
						<span class="font_10">{{item.created_time}}</span>
					</div>
					<div class="list_item_bd">
						{{item.sub_title}}
					</div>
				</div>
				<div class="list_item_r">
					<i v-show="item.is_read == 0" class="iconfont red">&#xe609;</i>
					<i class="iconfont">&#xe661;</i>
				</div>
			</div>
			<div v-else-if="item.msg_type == 12" class="flex_item a_flex_item" @click="getGpDetail(item.msg_yyid)">
				<div class="list_item_l">
					<div class="list_item_hd">
						{{item.title}}
						<span class="font_10">{{item.created_time}}</span>
					</div>
					<div class="list_item_bd">
						{{item.sub_title}}
					</div>
				</div>
				<div class="list_item_r">
					<i v-show="item.is_read == 0" class="iconfont red">&#xe609;</i>
					<i class="iconfont">&#xe661;</i>
				</div>
			</div>
		</div>	
        <transition name="showcover">
			<div class="back_cover" v-show="show_popover" @click="showPopover"></div>
		</transition>
        <div v-show="show_popover" class="popover_item popover_product">
            <div class="group_name">
                <h4>邀请加入代表群组</h4>
                <ul>
                    <li class="flex_item">
						<div class="title_item">
							<i class="iconfont">&#xe6fa;</i>
							邀请人
						</div>
                        <p>{{popover_data.inviter_name}}</p>
                    </li>
					<li class="flex_item">
						<div class="title_item">
							<i class="iconfont">&#xe6fa;</i>
							群主
						</div>
                        <p>{{popover_data.group_owner}}</p>
                    </li>
					<li class="flex_item">
						<div class="title_item">
							<i class="iconfont">&#xe6fa;</i>
							负责人药品
						</div>
                        <p>{{popover_data.series_name?popover_data.series_name:'无数据'}}</p>
                    </li>
					<li class="flex_item">
						<div class="title_item">
							<i class="iconfont">&#xe6fa;</i>
							当前贡献比例
						</div>
                        <p>{{popover_data.tax_rate}}%</p>
                    </li>
                </ul>
            </div>
            <div v-if="popover_data.status == 2" class="btns flex_item">
                <button class="btn_common" @click="submintInvite(popover_data.msg_yyid,2)">拒绝</button>
                <button class="btn_common" @click="submintInvite(popover_data.msg_yyid,1)">加入</button>
            </div>
			<div class="popover_green" v-else-if="popover_data.status == 1">
                已加入
            </div>
			<div class="popover_yellow" v-else-if="popover_data.status == 3">
                已拒绝
            </div>
        </div>
	</div>
</template>
<script>
	import { messageList,messageListDetail,msgGpDetail,msgGpInvite } from '../../api/sendRequest.js'
	import { mapState } from 'vuex'
	export default {
		data(){
			return {
				list:[],
				show_popover:false,
				popover_data:{}
			}
		},
		computed: {
			...mapState([
				'user_info'
			])
        },
        mounted(){
			this.getList();
		},
		methods: {
			async getList(){
				let res = await messageList(this.user_info.yyid,this.user_info.user_token,1);
				if(res.errcode != 0){
					this.$vux.toast.text(res.errmsg,'top');
					return
				};
				if(res.data != ''&&res.data.list){
					res.data.list.map((item,index) => {
						switch (item.msg_type) {
							case 7:
								this.list.push(item);
								break;
							case 9:
								this.list.push(item);
								break;
							case 10:
								this.list.push(item);
								break;
							case 11:
								this.list.push(item);
								break;
							case 12:
								this.list.push(item);
								break;
							default:
								this.list = [...res.data.list];
								break;
						}
					})
				}
			},
			async goToDetail(yyid,type,link){
				let res = await messageListDetail(this.user_info.yyid,this.user_info.user_token,1,yyid);
				if(res.errcode == 0){
					this.list = [];
					this.getList();
					switch (type) {
						case 7:
							break;
						case 8:
							break;
						case 9:
							break;
						case 10:
							break;
						case 11:
							window.location = link;
							break;
						case 12:
							this.getGpDetail(yyid)
							break;
						default:
							break;
					}
				}
			},
			async getGpDetail(yyid){
				let res = await msgGpDetail(this.user_info.yyid,this.user_info.user_token,yyid);
				if(res.errcode == 0){
					this.show_popover = true;
					this.popover_data = {...res.data};
					this.list = [];
					this.getList();
					// messageListDetail(this.user_info.yyid,this.user_info.user_token,1,'');
				} else {
					this.$vux.toast.text(res.errmsg,'top');
				}
			},
			async submintInvite(yyid,type){
				let res = await msgGpInvite(this.user_info.yyid,this.user_info.user_token,yyid,type);
				if(res.errcode == 0){
					this.show_popover = false;
					this.getList()
				} else {
					this.$vux.toast.text(res.errmsg,'top');
				}
			},
			showPopover(){
				this.show_popover = !this.show_popover;
			}
		},
	}
</script>
<style lang="less" scoped="scoped">
	.p_center_news{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		.list_item{
			padding: 11px 10px 11px 15px;
			margin-bottom: 10px;
			.a_flex_item{
				width: 100%;
				align-items: center;
				.list_item_hd{
					font-weight: bold;
                }
                .list_item_bd{
                    color: #666666;
                }
				.list_item_r{
					width: 40px;
					position: relative;
					text-align: right;
					.red{
						position: absolute;
						right: 15px;
					}
				}
				.font_10{
					font-size: 12PX;
					color: #999999;
					margin-left: 10px;
					font-weight: normal;
				}
				.list_item_bd{
					color: #666666;
					margin-top: 6px;
				}
				
				.iconfont{
					color: #AAAAAA;
				}
				.red{
					color: #F65B6A;
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
            .group_name{
                border-radius: 8px 8px 0 0;
                padding: 20px 27px;
                h4{
					font-size: 14PX;
					margin-bottom: 15px;
				}
				li{
					line-height: 30px;
					.title_item{
						color: #999999;
						.iconfont{
							font-size: 14PX;
							color: #5870FE;
						}
					}
				}
			}
			.btns{
				margin: 0 27px;
				button{
					width: 160px;
					color: #ffffff;
					background-color: #5870FE;
					margin-bottom: 20px;
				}
				button:nth-of-type(1){
					margin-right: 10px;
					background-color: #ffffff;
					color: #5870FE;
				}
			}
            .popover_green{
				line-height: 40px;
				margin-bottom: 20px;
				font-size: 16px;
				font-weight: bold;
				color: #4ED79C;
			}
			.popover_yellow{
				color: #FF982A;
				line-height: 40px;
				margin-bottom: 20px;
				font-size: 16px;
				font-weight: bold;
			}
        }
	}
</style>
