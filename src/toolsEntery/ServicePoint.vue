<template>
    <div class="service_integral bgc">
        <div class="cost_hd flex_item">
            <p>我的服务积分</p>
            <p @click="integralIntro"><i class="iconfont">&#xe7b9;</i></p>
        </div>
        <div class="cost_detail">
            <p>{{total_point}}<span>分</span></p>
        </div>
        <div class="service_detail bgc">
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
        <transition name="showcover">
			<div class="back_cover" v-show="modal_type"></div>
		</transition>
        <div v-show="modal_type == 'intro'" class="popover_item">
            <div class="popover_con">
                <h4>优药平台积分说明</h4>
                <div class="piont_rule">
                    <p>1、优药消费积分（以下简称消费积分）、优药服务积分（以下简称服务积分）是优药平台（以下简称平台）对参加优药平台用户的一种回馈。消费积分和服务积分可以在优药平台兑换相应的物品。</p>
                    <p>2、为了保证用户账户的安全，用户必须在平台进行实名认证之后才可以使用消费积分和服务积分。</p>
                    <p>3、消费积分和服务积分仅在平台上面使用有效。</p>
                    <p>4、每次的兑换都需要消耗不同数量的消费积分和服务积分，消费积分和服务积分必须大于物品兑换所需要的消费积分及服务积分数量时才可兑换。物品兑换申请后，相应的消费积分和服务积分将做扣除。</p>
                    <p>5、所有兑换物品数量有限，兑完为止，如有毁损或遗失将不获得补发或不做现金赔偿。</p>
                    <p>6、消费积分和服务积分是平台对用户的一种回馈，用户所兑换的物品不予开具发票。</p>
                    <p>7、平台对消费积分和消费积分的细则在法律允许的范围内享有最终解释权。</p>
                    <p>8、本活动由平台发起，与Apple.Inc无关;本活动公限18岁以上用户参与。</p>    
                </div>
            </div>
            <div class="btns flex_item intro_btn">
                <button class="btn_common" @click="integralIntro">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
import { myPoint,servicePointDetail } from '../../api/sendRequest'
import { InlineXNumber } from 'vux';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            total_point:'',
            modal_type:'',
            integral_val:[],
            goods_id : '',
            money:'',
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
    components:{
        InlineXNumber
    },
    mounted(){
        this.getCostInfo();
        this.getData()
    },
    methods:{
        async getCostInfo(){
            let res = await myPoint(this.user_info.yyid,this.user_info.user_token);
            this.total_point = res.data.service_point;
        },
        integralIntro(){
            if(this.modal_type == ''){
                this.modal_type = 'intro';
            } else {
                this.modal_type = '';
            }
        },
        async getData(){
            this.loading = true;
            let page = this.page;
            let type = this.type;
            let _this = this;
            setTimeout(async () => {
                let res = await servicePointDetail(this.user_info.yyid,this.user_info.user_token,type,page,10);
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
<style lang="less">
.service_integral{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .cost_hd{
        height: 120px;
        color: #ffffff;
        background-color: #5870FE;
        padding: 15px;
        font-size: 16PX;
        font-weight: bold;
        .iconfont{
            font-weight: normal;
            font-size: 16PX;
        }
        p:nth-of-type(2){
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 50%;
            background-color: #ffffff;
            .iconfont{
                color: #5870FE;
            }
        }
    }
    .cost_detail{
        text-align: center;
        height: 100px;
        margin: -65px 15px 10px;
        padding: 20px;
        text-align: center;
        border-radius: 8px;
        background: linear-gradient(#FFFAEE,#F8E7D6);
        p{
            font-size: 32PX;
            color: #AB744C;
            font-weight: bold;
            margin-top: 5px;
            span{
                font-size: 14PX;
                font-weight: normal;
                margin-left: 4px;
            }
        }
    }
    .service_detail{
        .wrap_tabs{
            background-color: #ffffff;
            padding: 15px;
            .tabs{
                background-color: #F7F7F7;
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
        .popover_con{
            border-radius: 8px 8px 0 0;
            padding: 20px 27px;
            .piont_rule{
                height: 200px;
                overflow: hidden;
                overflow-y: scroll;
            }
            h4{
                font-size: 14PX;
                margin-bottom: 15px;
                
            }
            p{
                text-align: left;
                color: #666666;
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
        .intro_btn{
            button:nth-of-type(1){
                width: 100%;
                margin-right: none;
                background-color: #5870FE;
                color: #ffffff;
            }
        }
    }
}
</style>