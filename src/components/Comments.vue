<template>
	<div class="comments">
		<div class="comments_list">
			<div class="comments_item flex_item" v-for="(item,index) in comList" :key="index">
				<div class="avator">
					<img :src="item.user_head" alt="">
				</div>
				<div class="comments_con bd_bt">
					<div class="user_info flex_item">
						<div class="user_name">
							<p class="name">{{item.user_name}}</p>
							<p class="time font_10">{{item.created_time}}</p>
						</div>
						<div class="del" v-show="userYyid == item.user_yyid" @click="delCom(item.com_yyid,item.user_yyid)">
							<i class="iconfont">&#xe644;</i>
						</div>
					</div>
					<div class="com_info" @click="showCom(item.com_yyid)">{{item.comment}}</div>
					<div class="reply">
						<div class="comments_item flex_item" v-for="(item2,index2) in item.reply" :key="index2" @click="delCom(item2.r_com_yyid,item2.user_yyid)" >
							<div class="avator">
								<img :src="item2.user_head" alt="">
							</div>
							<div class="comments_con">
								<p class="name">{{item2.user_name}}</p>
								<div class="com_info bd_bt">{{item2.comment}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-show="comList.length==0" class="empty_status">
			<img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
			<p>暂无评论</p>
		</div>
	</div>
</template>

<script>
	export default{
		props:['comList','delMod','userYyid'],
		data(){
			return {
				value:''
			}
		},
		mounted() {
		},
		methods:{
			showCom(father_yyid){
				this.$emit('showComMod',father_yyid);
			},
			delCom(com_yyid,user_id){
				this.$emit('delComCon',com_yyid,user_id);
			}
		}
	}
</script>

<style lang="less">
	.comments{
		min-height: 150px;
		padding-left: 20px;
		position: relative;
		.comments_item{
			padding: 15px 0 0px;
			.avator{
				width: 40px;
				height: 40px;
				border-radius: 50%;
				margin-right: 10px;
				background-color: #D8D8D8;
				img{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.comments_con{
				width: 86%;
				color: #666666;
				padding-right: 15px;
				.user_info{
					align-items: center;
					.name{
						margin-top: 4px;
						color: #333333;
					}
					.time{
						color: #999999;
						margin-left: -5px;
					}
					.iconfont{
						color: #999999;
					}
				}
				.del{
					.iconfont{
						font-size: 20PX;
					}
				}
				.com_info{
					font-size: 12PX;
					margin-top: 5px;
					line-height: 18px;
					border-color: #ECECEC;
				}
				.reply{
					background-color: #F7F7F7;
					padding-left: 10px;
					margin: 8px 0 15px;
					font-size: 12px;
					flex-wrap: wrap;
					.comments_item{
						padding-top: 10px;
						padding-bottom: 0;
					}
					.avator{
						width: 30px;
						height: 30px;
					}
					.comments_con{
						padding: 0;
						p{
							margin-top: 5px;
						}
					}
					.com_info{
						padding-right: 10px;
						padding-bottom: 8px;
					}
				}
			}
		}
		.empty_status{
			text-align: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform:  translate(-50%,-50%);
			color:#666666;
			img{
				width: 100px;
				margin-bottom: 6px;
			}
		}
	}
</style>
