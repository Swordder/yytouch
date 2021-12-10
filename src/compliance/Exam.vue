<template>
    <div class="exam compliance_inner" data-name="exam">
        <div class="top_bar">
            <div class="search">
                <i class="iconfont">&#xe689;</i>
                <input 
                    type="text" 
                    class="search_input" 
                    v-model.trim="value" 
                    @input="change"
                    placeholder="请输入关键字">    
            </div>
            <div class="search_res flex_item">
                <div class="data_num">共计{{total_data.length}}条</div>
                <div class="popover" @click="showDir()">
                   <i class="iconfont">&#xe645;</i>{{keywords}}
                </div>
            </div>
        </div>
        <div v-show="show_cover" class="dir_list">
            <span></span>
            <ul>
                <li
                    :class="[keywords == item?'bd_bt active':'bd_bt']"
                    v-for="(item,index) in dir_list" 
                    @click="selectTest(item)"
                    :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <transition name="showcover">
			<div class="back_cover" v-show="show_cover"></div>
		</transition>
        <div class="wrapper">
            <ul class="content">
                <li v-for="(item,index) in total_data" :key="index">
                    <template v-if="item.status == 0">
                        <router-link :to="{path:'/examStatus',query:{exam_yyid:item.yyid}}">
                            <h5>{{item.name}}</h5>
                            <div class="test_status flex_item">
                                <template v-if="item.exam_end != null">
                                    <div class="time">
                                        <p class="m_bottom"><i class="iconfont">&#xe6fa;</i><span>开始时间：</span> {{item.exam_start.split(' ')[0]}}</p>
                                        <p><i class="iconfont">&#xe6fa;</i><span>结束时间：</span> {{item.exam_end.split(' ')[0]}}</p>
                                    </div>
                                </template>
                                <div class="time blue" v-else>
                                    <i class="iconfont">&#xe602;</i>
                                    无限时
                                </div>
                                <div class="result_status">
                                    <i class="pending"></i>
                                </div>
                            </div>
                        </router-link>
                    </template>
                    <template v-else-if="item.status == 1">
                        <router-link :to="{path:'/examStatus',query:{exam_yyid:item.yyid}}">
                            <h5>{{item.name}}</h5>
                            <div class="test_status flex_item">
                                <div class="time">
                                    <p><i class="iconfont">&#xe6fa;</i><span>通过时间：</span> {{item.pass_time.split(' ')[0]}}</p>
                                </div>
                            </div>
                            <div class="test_status flex_item">
                                <div class="result_status result_succ">
                                    <i class="success"></i>
                                </div>
                            </div>
                        </router-link>
                    </template>
                    <template v-else-if ="item.status == 2">
                        <a href="javascript:;">
                            <h5>{{item.name}}</h5>
                            <div class="test_status flex_item">
                                <div class="test_status flex_item">
                                    <template v-if="item.exam_end != null">
                                        <div class="time">
                                            <p class="m_bottom"><i class="iconfont">&#xe6fa;</i><span>开始时间：</span> {{item.exam_start.split(' ')[0]}}</p>
                                            <p><i class="iconfont">&#xe6fa;</i><span>结束时间：</span> {{item.exam_end.split(' ')[0]}}</p>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="time blue">
                                            <i class="iconfont">&#xe602;</i>
                                            无限时
                                        </div>
                                    </template>
                                </div>
                                <div class="result_status">
                                    <i class="fail"></i>
                                </div>
                            </div>
                        </a>
                    </template>
                    <template v-else-if ="item.status == 3">
                        <router-link :to="{path:'/examStatus',query:{exam_yyid:item.yyid}}">
                            <h5>{{item.name}}</h5>
                            <div class="test_status flex_item">
                                <div class="test_status flex_item">
                                    <template v-if="item.exam_end != null">
                                        <div class="time">
                                            <p class="m_bottom"><i class="iconfont">&#xe6fa;</i><span>开始时间：</span> {{item.exam_start.split(' ')[0]}}</p>
                                            <p><i class="iconfont">&#xe6fa;</i><span>结束时间：</span> {{item.exam_end.split(' ')[0]}}</p>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="time blue">
                                            <i class="iconfont">&#xe602;</i>
                                            无限时
                                        </div>
                                    </template>
                                </div>
                                <div class="result_status">
                                    <i class="unpass"></i>
                                </div>
                            </div>
                        </router-link>
                    </template>
                </li>
            </ul>
            <p v-show="total_data.length == 0" style="text-align: center;line-height: 1.5;">暂无数据~</p>
        </div>
    </div>
</template>
<script>
import { Popover } from 'vux';
import { testList } from '../../api/sendRequest';
import _ from 'lodash';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            value:'',
            total_data:[],
            total:[],
            progress:[],
            passed:[],
            not_pass:[],
            expired:[],
            dir_list:['全部','进行中','已通过','未通过','已过期'],
            show_cover:false,
            keywords:'全部'
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getTestList();
    },
    methods:{
        async getTestList(){
            let res = await testList(this.user_info.yyid,this.user_info.user_token,this.value);
            this.total_data = [...res.data.progress,...res.data.not_pass,...res.data.passed,...res.data.expired];
            this.total = [...res.data.progress,...res.data.not_pass,...res.data.passed,...res.data.expired];
            this.progress = [...res.data.progress];
            this.passed = [...res.data.passed];
            this.expired = [...res.data.expired];
            this.not_pass = [...res.data.not_pass];
        },
        selectTest(value){
            this.keywords = value;
            if(value == '进行中'){
                this.total_data = [...this.progress];
            } else if(value == '已通过'){
                this.total_data = [...this.passed];
            }else if(value == '已过期'){
                this.total_data = [...this.expired];
            } else if(value == '未通过'){
                this.total_data = [...this.not_pass];
            } else {
                 this.total_data = [... this.total];
            }
            this.showDir();
        },
        showDir(){
            this.show_cover = !this.show_cover;
        },
        // input防抖
        change:_.debounce(function(){
            this.getTestList()
        },1000)
    },
    components:{
        Popover
    }
}
</script>
<style lang="less" scoped>
    @import '../../assets/css/complianceInner.less';
    .exam{
        font-size: 12PX;
        padding-top: 105px;
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
        .dir_list{
            position: fixed;
            left: 0;
            right: 0;
            top: 100px;
            width: 100%;
            background-color: #ffffff;
            padding: 0 25px;
            z-index: 14;
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
        .back_cover{
            top: 0;
            z-index: 6;
        }
        .wrapper{
            padding: 12px 20px 20px;
            li{
                background-color: #ffffff;
                margin-bottom: 16px;
                border-radius: 8px;
                box-shadow: 0px 2px 10px 0px rgba(216, 216, 216, 0.5);
                a{
                    display: block;
                    padding: 15px;
                    h5{
                        font-size: 16PX;
                        margin-bottom: 15px;
                    }
                    .test_status{
                        font-size: 14PX;
                        color: #333333;
                        align-items: center;
                        position: relative;
                        .time{
                            .m_bottom{
                                margin-bottom: 8px;
                            }
                            .iconfont{
                                color: #5870FE;
                                font-size: 14PX;
                                margin-right: 4px;
                            }
                            span{
                                color: #999999;
                            }
                        }
                        .blue{
                            color: #5870FE;
                            font-weight: bold;
                        }
                        .result_status{
                            i{
                                display: inline-block;
                                width: 58px;
                                height: 44px;
                                background: url('http://img.youyao99.com/fe8da94d04ef4f6d6776e3a0344f2289.png') left center no-repeat;
                                background-size: cover;
                            } 
                            .pending{
                                background: url('http://img.youyao99.com/6fd4005e027ddb459b1114e1ad0f683f.png') left center no-repeat;
                                background-size: cover;
                            }
                            .success{
                                background: url('http://img.youyao99.com/2a6536eae71882fd143cfec959fb61b5.png') left center no-repeat;
                                background-size: cover;
                            }
                            .unpass{
                                background: url('http://img.youyao99.com/cf78c29467fbacdc1b7614a7898e7054.png') left center no-repeat;
                                background-size: cover;
                            }
                        }
                        .result_succ{
                            position: absolute;
                            top: -42px;
                            right: 0;
                            z-index: 5;
                        }
                    }
                }
            }
        }
    }
</style>