<template>
    <div class="cost_detail bgc">
        <div class="wrap_tabs bd_bt">
            <ul class="tabs flex_item">
                <li 
                    @click="chooseTab(index)" v-for="(item,index) in tabs" 
                    :key="index"
                    :class="{active:type == index}">
                    {{item}}
                </li>
            </ul>
        </div>
        <mu-paper :z-depth="1" class="demo-loadmore-wrap common_list">
			<mu-container ref="container" class="demo-loadmore-content">
				<mu-load-more :loading="loading" :loaded-all="loaded_all" @load="getData" >
					<template>
						<div class="common_list_inner_item" v-for="item in list" :key="item.detail_yyid">
                            <div class="common_list_item flex_item bd_bt">
                                <div class="point_data">
                                    <p>
                                        {{item.desc}}
                                        <span v-if="item.status == 1" class="status_y">申请中</span>
                                        <span v-else-if="item.status == 3">已兑换</span>
                                        <span v-else-if="item.status == 2" class="status_g">已到账</span>
                                    </p>
                                    <p class="font_10">{{item.date}}</p>
                                </div>
                                <div v-if="item.status == 1" class="note">{{item.point}}</div>
                                <div v-else-if="item.status == 3" class="note">{{item.point}}</div>
                                <div v-else-if="item.status == 2" class="note">{{item.point}}</div>
                            </div>
                        </div>
					</template>
					<p v-show="empty_show" style="text-align: center;line-height: 1.5;margin: 10px 0;">暂无数据</p>
				</mu-load-more>
			</mu-container>
		</mu-paper>
        <p class="bottom">只显示最近一年的数据</p>
    </div>
</template>
<script>
import { pointDetail } from '../../api/sendRequest';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            tabs:['全部','发放','使用'],
            list:[],
            page:1,
            loading: false,
            loaded_all:false,
            type:0,
            empty_show:false
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getData();
    },
    methods:{
        async getData(){
            this.loading = true;
            let page = this.page;
            let type = this.type;
            let _this = this;
            setTimeout(async () => {
                let res = await pointDetail(this.user_info.yyid,this.user_info.user_token,type,page,10);
                _this.page ++;
                if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) >= Number(res.data.page)){
                    _this.loading = false;
                    _this.list = _this.list.concat(res.data.details);
                    _this.empty_show = false;
                    if(Math.ceil(Number(res.data.total)/Number(res.data.page_size)) == Number(res.data.page)){
                        _this.loading = false;
                        _this.loaded_all = true;
                    }	
                } else {
                    _this.loading = false;
                    _this.loaded_all = true;
                    _this.list = [];
                    _this.empty_show = true;
                }
            }, 150);
        },
        async chooseTab(index){
            this.type = index;
            this.page = 1;
			this.loaded_all = false;
			this.empty_show = false;
			this.list = [];
            this.getData();
        }
    }
}
</script>
<style lang="less" scoped>
.cost_detail{
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-top: 70px;
    z-index: 9;
    .wrap_tabs{
        background-color: #ffffff;
        padding: 15px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        .tabs{
            background-color: #F7F7F7!important;
            border-radius: 18px;
            text-align: center;
            li{
                color: #999999;
                line-height: 36px;
                flex: 1;
                border-radius: 18px;
            }
            .active{
                background-color: #5870FE;
                color: #ffffff;
            }
        }    
    }
    .common_list{
        box-shadow: none;
        h5{
            line-height: 36px;
            margin: 0 15px;
        }
        .common_list_item{
            background-color: #ffffff;
            padding: 14px 15px;
            .point_data{
                .font_10{
                    transform-origin: left;
                    color: #999999;
                }
                span{
                    font-size: 12PX;
                    height: 20px;
                    line-height: 20px;
                    margin-top: 5px;
                    border-radius: 2px;
                    color: #ffffff;
                    margin-left: 10px;
                    background-color: #5870FE;
                    padding: 3px 5px;
                }
                .status_y{
                    background-color: #FF982A;
                }
                .status_g{
                    background-color: #4ED79C;
                }
            }
            .note{
                font-weight: bold;
                line-height: 40px;
            }
        }
    }
    .bottom{
        text-align: center;
        color: #999999;
        margin: 10px 0;
    }
}
</style>