<template>
    <div class="cost_integral bgc">
        <div class="cost_hd flex_item">
            <p>我的消费积分</p>
            <p @click="integralIntro"><i class="iconfont">&#xe7b9;</i></p>
        </div>
        <div class="cost_detail">
            <p>{{total_point}}<span>分</span></p>
            <router-link to="/costDetail">积分明细</router-link>
        </div>
        <div v-if="goods_list.length !== 0" class="cost_list">
            <div
            class="cost_list_item flex_item"
            v-for="(item,index) in goods_list"
            :key="item.goods_yyid">
                <div class="cost_l">
                    <i class="iconfont">&#xe634;</i>
                </div>
                <div class="cost_r">
                    <div class="cost_r_top bd_bt">
                        <h4>{{item.goods_name}}</h4>
                        <p class="font_10">{{item.desc}}</p>
                    </div>
                    <div class="cost_r_bt flex_item">
                        <div class="num_item">
                            <i class="iconfont" @click="reduceOne(index)">&#xe62d;</i>
                            <input type="number" v-model="integral_val[index]" pattern="[0-9]*"/>
                            <i class="iconfont icon_plus" @click="plusOne(index)">&#xe66e;</i>
                        </div>
                        <button class="btn_common" @click="exchange(index,item.goods_yyid)">立即兑换</button>
                    </div>
                </div>
            </div>
        </div>
        <template v-else>
            <div class="item_empty_status">
                <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
                <p>暂无数据</p>
            </div>
        </template>
        <transition name="showcover">
			<div class="back_cover" v-show="modal_type"></div>
		</transition>
        <div v-show="modal_type == 'exchange_popover'" class="popover_item">
            <div class="popover_con">
                <h4>兑换现金</h4>
                <p>你确定要用积分兑换{{integral_val[cur_index_num]}}份现金吗？</p>
            </div>
            <div class="btns flex_item">
                <button class="btn_common" @click="modal_type = ''">取消</button>
                <button class="btn_common" @click="exchangePoint">确定</button>
            </div>
        </div>
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
                    <p>8、本活动由平台发起，与Apple.Inc无关;本活动仅限18岁以上用户参与。</p>
                </div>
            </div>
            <div class="btns flex_item intro_btn">
                <button class="btn_common" @click="integralIntro">确定</button>
            </div>
        </div>
        <div v-show="modal_type == 'success'" class="popover_item">
            <div class="popover_con popover_icon">
                <h4><i class="iconfont">&#xe635;</i></h4>
                <p>兑换成功，后台审核通过后会及时发放</p>
            </div>
            <div class="btns flex_item intro_btn">
                <button class="btn_common" @click="modal_type = ''">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
import { myPoint,exchangePoint } from '../../api/sendRequest'
import { InlineXNumber } from 'vux';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            total_point:'',
            modal_type:'',
            integral_val:[],
            goods_list:[],
            goods_id : '',
            money:'',
            cur_index_num:0
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
        this.getCostInfo()
    },
    methods:{
        async getCostInfo(){
            let res = await myPoint(this.user_info.yyid,this.user_info.user_token);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.total_point = res.data.money_point;
            this.goods_list = [...res.data.goods];
            this.goods_list.map((item,index) => {
                this.integral_val.push(0)
            })
        },
        integralIntro(){
            if(this.modal_type == ''){
                this.modal_type = 'intro';
            } else {
                this.modal_type = '';
            }
        },
        reduceOne(index){
            if(this.integral_val[index] <= 0){
                return
            };
            this.integral_val[index]--
            this.$set(this.integral_val,index,this.integral_val[index]);
        },
        plusOne(index){
            this.integral_val[index]++
            this.$set(this.integral_val,index,this.integral_val[index]);
        },
        exchange(index,yyid){
            if(this.integral_val[index] == 0){
                this.$vux.toast.text('兑换份数不能为0','top');
                return
            }
            this.cur_index_num = index;
            this.modal_type = 'exchange_popover';
            this.goods_id = yyid;
        },
        async exchangePoint(){
            let res = await exchangePoint(this.user_info.yyid,this.user_info.user_token,this.goods_id,this.integral_val[this.cur_index_num]);
            if (res.errcode == 0) {
                this.modal_type = 'success';
                this.integral_val = [];
                this.goods_id = '';
                this.cur_index_num = 0;
                this.getCostInfo()
            } else {
                this.$vux.toast.text(res.errmsg,'top');
            }
            
        }
    }
}
</script>
<style lang="less">
.cost_integral{
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
        height: 140px;
        margin: -65px 15px 0;
        padding: 20px;
        text-align: center;
        border-radius: 8px;
        background: linear-gradient(#FFFAEE,#F8E7D6);
        p{
            font-size: 32PX;
            color: #AB744C;
            font-weight: bold;
            span{
                font-size: 14PX;
                font-weight: normal;
                margin-left: 4px;
            }
        }
        a{
            display: inline-block;
            width: 160px;
            height: 36px;
            line-height: 36px;
            border-radius: 18px;
            color: #ffffff;
            margin-top: 15px;
            background-image: linear-gradient(to right, #D5AC83 , #AB744C);
        }
    }
    .cost_list_item{
        background-color: #ffffff;
        margin-top: 10px;
        padding: 7px 15px 12px;
        .cost_l{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            margin-right: 10px;
            background-color: #5870FE;
            color: #ffffff;
        }
        .cost_r{
            flex: 1;
            .cost_r_top{
                margin: 6px 0 15px;
                padding-bottom: 12px;
                .font_10{
                    color: #999999;
                    transform-origin: left;
                }
            }
            .num_item{
                // line-height: 30px;
                input{
                    width: 52px;
                    padding: 0 5px;
                    background-color: #F3F3F3;
                    border: none;
                    text-align: center;
                    margin: 0 6px;
                }
                .icon_plus{
                    font-size: 16PX;
                }
            }

            button{
                font-size: 12PX;
                line-height: 26px;
                width: 80px;
                color: #ffffff;
                background-color: #5870FE;
                padding: 0 10px;
            }
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
        .popover_icon{
            text-align: center;
            h4{
                display: inline-block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-radius: 50%;
                background-color:#4ED79C;
                .iconfont{
                    font-weight: normal;
                    color: #ffffff;
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
