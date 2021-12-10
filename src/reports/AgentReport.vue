<template>
    <div class="fs_agent_rp" data-name="rp_agent_home">
        <HeadNav></HeadNav>
        <div class="fs_agent_info">
            <div class="agent_info flex_item">
                <div class="pic">
                    <img :src="rep_info.headimgurl==''?'http://img.youyao99.com/380C836AA106AFDB997D582D284EBF66.png':rep_info.headimgurl" alt="">
                </div>
                <div class="info">
                    <p>{{rep_info.truename}}</p>
                    <a href="tel:18439409306">{{rep_info.mobile_num}}</a>
                </div>
            </div>
        </div>
        <div class="agent_base_info">
            <grid>
                <grid-item :label="rep_target.total_hospital_num">
                    医院数
                </grid-item>
                <grid-item :label="rep_target.total_order_num == 0?'--':rep_target.total_order_num">
                    {{date.split('-')[1]}}月实际
                </grid-item>
                <grid-item :label="rep_target.total_target">
                    {{date.split('-')[1]}}月指标
                </grid-item>
                <grid-item :label="rep_target.pre+'%'" class="pink">
                    达成率
                </grid-item>
            </grid>
        </div>
        <div class="area_rp_list">
          <template v-if="rep_hospital.length != 0">
            <AgentRpHosList :lowHosList='rep_hospital'></AgentRpHosList>
          </template>
          <div v-else class="item_empty_status">
            <img src="http://img.youyao99.com/456AB7F18A83B6E155C20D2012BB2609.png" alt="">
            <p>暂无数据</p>
          </div>
        </div>
        <divider>我是有底线的</divider>
    </div>
</template>
<script>
import HeadNav from '../../components/reports/HeadNav.vue'
import AgentRpHosList from '../../components/reports/AgentRpHosList.vue'
import { getStore } from '../../config/util.js'
import { getArea,rpAgentInfo } from '../../api/sendRequest.js'
import { Grid, GridItem, GroupTitle, Divider } from 'vux'
import { mapState,mapMutations,mapActions} from 'vuex'
export default{
    data(){
      return {
        date:'',
        all_areas:[],
        rep_info:{},
        rep_hospital:[],
        rep_target:{}
      }
    },
    components:{
        HeadNav,
        AgentRpHosList,
        Grid,
        GridItem,
        GroupTitle,
        Divider
    },
    computed: {
      ...mapState([
          'user_info',
          'color'
      ]),
    },
    mounted() {
      this.getAgentData();
    },
    methods:{
      async getAgentData(){
        let res = await rpAgentInfo(this.user_info.yyid,this.user_info.user_token,this.$route.query.node_yyid,this.$route.query.u_yyid);
        if(res.errcode == -1){
        	this.$router.push({path:'/rpLimitAuthor'});
        	return
        };
        this.date = res.data.date;
        this.rep_info = res.data.rep_info;
        this.rep_hospital = res.data.rep_hospital;
        this.rep_target = res.data.rep_target;
      }
    }
}
</script>
<style lang="less">
    .fs_agent_rp{
        .fs_agent_info{
            height: 140px;
            background-color: #5870FE;
            color: #ffffff;
            padding: 20px;
            .agent_info{
                justify-content: flex-start;
                align-items: center;
                .pic{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                p{
                    font-size: 16PX;
                    font-weight: bold;
                }
                a{
                    color: #ffffff;
                    margin-top: 6px;

                }
            }
        }
        .agent_base_info{
            background-color: #ffffff;
            margin:0 15px;
            margin-top: -38px;
            border-radius: 8px;
            box-shadow:0px 2px 12px 0px rgba(200,202,212,0.5);
            .weui-grids{
                &:before{
                    border-top: none;
                }
                &:after{
                    border-left: none;
                }
            }
            .weui-grid{
                color: #999999;
                text-align: center;
                padding-left: 0;
                padding-right: 0;
                &:before{
                    border-right: none;
                }
                &:after{
                    border-bottom: none;
                }
                .weui-grid__label{
                    font-size: 20PX;
                    font-weight: bold;
                    color: #333333;
                }
            }
            .pink{
                .weui-grid__label{
                    color: #F65B6A;
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

    }

</style>
