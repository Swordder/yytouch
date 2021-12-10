<template>
    <div class="knowledge compliance_inner" data-name="knowledge">
        <div class="top_bar">
            <div class="search">
                <router-link to="/searchCompliance">
                    <i class="iconfont">&#xe689;</i>
                    <input 
                        type="text" 
                        class="search_input"
                        placeholder="请输入关键字"
                    >    
                </router-link>    
            </div>
            <div class="search_res flex_item">
                <div class="data_num"></div>
                <div class="popover" @click="menuNav">
                   <i class="iconfont">&#xe645;</i>{{knowledge_dir_value}}
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content_item_1 bd_bt" v-for="(item,index) in list" :key="index">
                <div class="wrap_menu flex_item bd_bt" @click="showCon(1,item.id)">
                    <div class="title"><i class="iconfont">&#xe63e;</i><span>{{item.name}}</span></div>
                    <div class="icon">
                        <i v-if="wrap_id == item.id" class="iconfont">&#xe649;</i>
                        <i v-else class="iconfont">&#xe661;</i>
                    </div>
                </div>
                <div class="content_item_2" v-show="wrap_id == item.id" v-for="(item2,index2) in item.children" :key="index2">
                    <div v-if="item.type == 1" class="content_item_3">
                        <div class="wrap_menu wrap_menu3 flex_item bd_bt" @click="showCon(2,item2.id)">
                            <div class="title"><i class="iconfont">&#xe63e;</i><span>{{item2.name}}</span></div>
                            <div class="icon">
                                <i v-if="con_id == item2.id" class="iconfont">&#xe649;</i>
                                <i v-else class="iconfont">&#xe661;</i>
                            </div>
                        </div>
                        <div v-show="con_id == item2.id" class="con_item_list">
                            <router-link class="bd_bt" :to="{path:'/knowledgeDetail',query:{knowledge_yyid:item3.id}}" v-for="(item3,index3) in item2.children" :key="index3"><i class="iconfont">&#xe6fa;</i> <span>{{item3.name}}</span></router-link>     
                        </div>
                    </div>
                    <div v-else-if="item.type == 2" class="con_item_list">
                        <router-link class="bd_bt" v-for="(item_con,index_con) in item.children" :key="index_con" :to="{path:'/knowledgeDetail',query:{knowledge_yyid:item_con.id}}"><i class="iconfont">&#xe6fa;</i> <span>{{item_con.name}}</span></router-link>     
                    </div>
                </div>
            </div>
        </div>
        <div v-show="empty_show" class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
        </div>
        <transition name="showcover">
			<div class="back_cover" v-show="type_menu" @click="menuNav"></div>
		</transition>
		<section>
			<transition name="prod_show">
				<section class="type_list bgcw" v-show="type_menu">
					<ul>
                        <li
                        key = "00"
                        @click="selectDir(0)"
                        :class="{active:type_yyid == 0}">
							全部
						</li>
						<li
						v-for="(item,index) in dir_list"
                        :key = "index"
                        @click="selectDir(item.id)"
                        :class="{active:type_yyid == item.id}">
							{{item.name}}
						</li>
					</ul>
				</section>
			</transition>
		</section>
    </div>
</template>
<script>
import { Popover } from 'vux';
import { comKnowledges,knowledgeDir } from '../../api/sendRequest';
import _ from 'lodash';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            value:'',
            data:[],
            dir_list:[],
            knowledge_dir:'',
            knowledge_dir_value:'全部',
            list:[],
            wrap_id:'',
            con_id:'',
            type_menu:false,
            type_yyid:'',
            empty_show:false
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    components:{
        Popover
    },
    mounted(){
        this.getContent(0);
        this.getDir();
    },
    methods:{
        // 获取全部结构资料
        async getContent(id){
            let res = await comKnowledges(this.user_info.yyid,this.user_info.user_token,id);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            }
            this.list = [...res.data.list];
            if(this.list.length === 0){
                this.empty_show = true;
            } else {
                this.empty_show = false;
            }
        },
        showCon(type,id){
            if(type == 1){
                this.con_id = '';
                if(this.wrap_id == id){
                    this.wrap_id = '';
                } else {
                    this.wrap_id = id;
                }    
                return
            } else if(type == 2){
                if(this.con_id == id){
                    this.con_id = '';
                } else {
                    this.con_id = id;
                }   
            }
        },
        menuNav(){
            this.type_menu = !this.type_menu ;
		},
        // 搜索结构
        async getDir(){
            let res = await knowledgeDir(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            }
            this.dir_list = [ ...res.data.list ];
        },
        selectDir(yyid){
            this.type_yyid = yyid;
            this.list = [];
            this.getContent(yyid);
            this.menuNav();
        },
    },
}
</script>
<style lang="less" scoped>
    @import '../../assets/css/complianceInner.less';
    .knowledge{
        padding-top: 100px;
        font-size: 12px;
        .content{
            .content_item_1{
                background-color: #F9FAFF;
                line-height: 44px;
                padding: 0 15px;
                .icon{
                    .iconfont{
                        color: #AAAAAA;
                    }
                }
                .wrap_menu2{
                    background-color: #F9FAFF;
                }
                .title{
                    .iconfont{
                        vertical-align: middle;
                        color: #FFCD45;
                        margin-right: 10px;
                    }
                }
                .content_item_2{
                    padding-left: 15px;
                    a{
                        .iconfont{
                            color: #DEE2E6;
                            font-size: 16PX;
                        }
                        display: block;
                    }
                    .content_item_3{
                        a{
                            padding-left: 15px;
                        }
                    }
                }

            }
        }
        .popover{
            padding: 0px 10px 0 8px;
            border-radius: 30px;
            color: #5870FE;
            background-color: #ffffff;
            line-height: 22px;
            .iconfont{
                vertical-align: middle;
            }
        }
        .item_empty_status{
            text-align: center;
            padding:30px 0 20px 0;
            color: #999999;
            img{
                width: 88px;
            }
        }
        .dir_list{
            position: fixed;
            left: 0;
            right: 0;
            top: 100px;
            width: 100%;
            background-color: #ffffff;
            padding: 0 25px;
            z-index: 12;
            span{
                position: absolute;
                right: 30px;
                top: -16px;
                border: 10px solid transparent;
                border-bottom: 10px solid #ffffff;
            }
            ul{
                height: 200px;
                overflow: hidden;
                overflow-y: scroll;
                li{
                    line-height: 40px;
                }
                .active{
                    color: #5870FE;
                    border-color: #5870FE;
                }
            }
        }
        .prod_show-enter-active,
		.prod_show-leave-active{
			margin-right: 0;
			transition: all .3s ease;
		}
		.prod_show-enter,
		.prod_show-leave-to
		{
			margin-right: -54%;
		}
		.back_cover{
			top:0;
			bottom: 0;
			z-index: 12;
		}
		.type_list{
			padding: 20px 20px 5px;
			width: 54%;
			box-sizing: border-box;
			position: fixed;
			top: 0px;
			bottom: 0;
			right: 0;
			z-index: 13;
			overflow: hidden;
			overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
			li{
				margin-bottom: 10px;
                line-height: 32px;
                padding: 0 15px;
                border-radius: 16px;
				.iconfont{
					font-size: 14PX;
					font-weight: normal;
					transform: scale(0.9);
				}
			}
			.active{
				color: #5870FE;
                background-color: #E9ECFF;
			}
		}
        .mu-elevation-1{
            box-shadow: none;
        }
        .container{
            padding: 0;
        }
        .content{
            li{
                font-size: 14px;
                color: #333333;
                padding: 12px 15px 12px 15px;
                align-items: center;
                background-color: #ffffff;
                .list_title{
                    align-items: center;
                    span{
                        display: inline-block;
                        text-align: center;
                        // width: 30px;
                        // height: 30px;
                        line-height: 30px;
                        color: #5870FE;
                        border-radius: 50%;
                        margin-right: 10px;
                        // background-color: #E5E8FF;
                    }
                    .iconfont{
                        font-size: 20PX;
                    }
                }
                .date{
                    font-size: 12px;
                    color: #999999;
                    margin-left: 20px;
                    width: 120px;
                    text-align: right;
                }
            }
            li:nth-of-type(2n){
                background-color: #F9FAFF;
            }
        }
    }
</style>