<template>
    <div class="visit_detail bgc" data-name="visit_search_detail">
        <div class="v_tiem_list bgcw">
            <div class="v_item bd_bt">
                <p>拜访签入时间</p>
                <div class="time_range flex_item">
                    <div class="time_range_item">
                        <datetime :class="start_time == '请选择开始时间'?'gray time_show':'time_show'" v-model="start_time" format="YYYY-MM-DD"></datetime>    
                    </div>
                    至
                    <div class="time_range_item">
                        <datetime :class="end_time == '请选择结束时间'?'gray time_show':'time_show'" v-model="end_time" format="YYYY-MM-DD"></datetime>    
                    </div>
                </div>
            </div>
            <div class="v_item bd_bt">
                <p>拜访签出时间</p>
                <div class="time_range flex_item">
                    <div class="time_range_item">
                        <datetime :class="co_start_time == '请选择开始时间'?'gray time_show':'time_show'" v-model="co_start_time" format="YYYY-MM-DD"></datetime>    
                    </div>
                    至
                    <div class="time_range_item">
                        <datetime :class="co_end_time == '请选择结束时间'?'gray time_show':'time_show'" v-model="co_end_time" format="YYYY-MM-DD"></datetime>    
                    </div>
                </div>
            </div>
            <div class="v_item bd_bt">
                <p>拜访医院</p>
                <popup-radio class="hos_select" :options="hos_list" v-model="hos_id">
                    <p slot="popup-header" class="vux-1px-b demo3-slot">请选择</p>
                </popup-radio>
                <i class="iconfont r_icon">&#xe661;</i>
            </div>
            <div class="v_item bd_bt v_dep">
                <p>拜访科室</p>
                <p @click="showDep">{{deps_name.length === 0?'请选择':deps_name.toString()}}</p>
                <i class="iconfont r_icon">&#xe661;</i>
            </div>  
            <div class="v_item bd_bt">
                <p>拜访类型</p>
                <popup-radio class="hos_select" :options="visit_ways" v-model="visit_way">
                    <p slot="popup-header" class="vux-1px-b demo3-slot">请选择</p>
                </popup-radio>
                <i class="iconfont r_icon">&#xe661;</i>
            </div>  
        </div>
        <van-action-sheet v-model="show1" title="科室列表">
            <div class="content">
                <checklist v-if="list_dep.length !== 0" label-position="left" required :options="list_dep" v-model="checklist"></checklist>
                <van-empty v-else description="暂无此条件下的数据" />
            </div>
            <div class="dep_btn bgwc">
                <button class="btn_common" @click="selectDeps">确定</button>
            </div>
        </van-action-sheet>
        <div class="search_btn">
            <button class="btn_common" @click="searchData">搜索</button>
        </div>
        <van-list
        v-model="loading"
        :finished="finished"
        @load="getVisitList"
        >
            <div class="his_v_list bgc">
                <div class="his_v_item" v-for="(item,index) in data_list" :key="index" @click="getVisitDetail(item.check_type,item.id)">
                    <div class="his_v_item_con bgcw">
                        <h4 class="bd_bt">
                            <p :class="{'bd_bt bg_red':item.check_type == 1,'bd_bt':item.check_type != 1}">{{item.check_type == 1?'未签出':'签出'}}</p>
                            {{item.date}}
                        </h4>
                        <ul>
                            <li><i class="iconfont">&#xe6fa;</i>{{item.type}}</li>
                            <li v-show="item.hospital"><i class="iconfont">&#xe6fa;</i>{{item.hospital}}</li>
                            <li v-show="item.departs.length !== 0"><i class="iconfont">&#xe6fa;</i>{{item.departs.toString()}}</li>
                            <li v-show="item.doctors.length !== 0"><i class="iconfont">&#xe6fa;</i>{{item.doctors.toString()}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </van-list>
        <van-empty v-show="empty_flag" description="暂无此条件下的数据" />
    </div>
</template>
<script>
import { visitHos, visitList, depServe } from '../../api/sendRequest';
import { Datetime, Group, PopupRadio, Checklist,TransferDom  } from 'vux';
import { ActionSheet } from 'vant'
import { mapState,mapMutations } from 'vuex';
export default {
    directives: {
        TransferDom
    },
    data(){
        return {
            start_time:'请选择开始时间',
            end_time:'请选择结束时间',
            co_start_time:'请选择开始时间',
            co_end_time:'请选择结束时间',
            hos_list: [],
            hos_id:'请选择',
            dep_id:0,
            list_dep:[],
            dep_name:'',
            data_list:[],
            loading: false,
            error:false,
            finished: false,
            page : 1,
            empty_flag:false,
            show1:false,
            checklist:[],
            deps_name:[],
            visit_ways: [
                {
                key: 0,
                value: '所有'
            }, {
                key: 1,
                value: '面对面拜访'
            }, {
                key: 2,
                value: '线上拜访'
            }, {
                key: 3,
                value: '内部会议'
            }, {
                key: 4,
                value: '外部会议'
            }, {
                key: 5,
                value: '行政类工作'
            }],
            visit_way:'请选择',
            // end_time:null
        }
    },
    components:{
        Datetime, Group, PopupRadio, ActionSheet, Checklist,TransferDom 
    },
    computed:{
        ...mapState([
            'user_info',
        ]),
    },
    mounted(){
        this.getServeHos();
        this.getDepList();
    },
    methods:{
        ...mapMutations([
            'INIT_VISTI'
		]),
        // 获取服务医院
        async getServeHos(){
            let res = await visitHos(this.user_info.yyid,this.user_info.user_token,'');
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            if(res.data.list.length !== 0){
                res.data.list.map(item => {
                    this.hos_list.push({
                        key:item.id,
                        value:item.name
                    })
                })
            };
        },
        // 获取当前服务的科室列表
        async getDepList(){
            this.dep_list = [];
            let res = await depServe(this.user_info.yyid,this.user_info.user_token,0,'');
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            let arr = res.data.list;
            if(arr.length === 0){
                this.result_flag = true;
                return
            } else {
                this.result_flag = false;
            }
            arr.map((item) => {
                this.list_dep.push({
                    key:item.id,
                    value:item.name
                })
            })
        },
        selectDeps(){
            this.showDep();
            if(this.checklist.length === 0||this.list_dep.length === 0){
                return
            };
            // 当选择了科室后展示科室的名称
            this.list_dep.map((item) => {
                if(this.checklist.indexOf(item.key) != -1){
                    this.deps_name.push(item.value);
                }
            })
        },
        showDep(){
            this.show1 = !this.show1;
        },
        // 搜索接口
        searchData(){
            this.page = 1;
            this.finished = false;
            this.data_list = [];
            this.getVisitList();
        },
        async getVisitList(){
            let _this = this;
            let time1 = '' , time2 = '', time3='', time4='',hos_yyid, visit_way_id;
            if(this.start_time != '请选择开始时间'){
                time1 = this.start_time;
            };
            if(this.end_time != '请选择结束时间'){
                time2 = this.end_time;
            };
            if(this.co_start_time != '请选择开始时间'){
                time3 = this.co_start_time;
            };
            if(this.co_end_time != '请选择结束时间'){
                time4 = this.co_end_time;
            };
            if(this.hos_id&&this.hos_id == '请选择'){
                hos_yyid = 0;
            } else {
                hos_yyid = this.hos_id
            };
            if(this.visit_way&&this.visit_way == '请选择'){
                visit_way_id = 0;
            } else {
                visit_way_id = this.visit_way
            }
            // 异步更新数据
            setTimeout(async () => {
                let res = await visitList(
                    _this.user_info.yyid,
                    _this.user_info.user_token,
                    time1,
                    time2,
                    time3,time4,hos_yyid,JSON.stringify(this.checklist),0,visit_way_id,_this.page,10);
                if(res.errcode != 0){
                    _this.error = true;
                    _this.loading = false;
					return
				}
                _this.page ++;
                if(res.data.page.total == 0){
                    _this.empty_flag = true;
                    _this.finished_text = '';
                } else {
                    _this.empty_flag = false;
                    _this.finished_text = '没有更多了'
                }
                if(_this.data_list.length < res.data.page.total){
                    
                    _this.data_list = _this.data_list.concat(res.data.list);
                }
                // 加载状态结束
                _this.loading = false;
                // 数据全部加载完成
                if (_this.data_list.length >= res.data.page.total) {
                    _this.finished = true;
                }
            }, 1000);
        },
        async getVisitDetail(type,id){
            if (type == 1) {
                this.$router.push({
                    path:'/visitSignIn',
                    query:{
                        'id':id
                    }
                })
            } else if(type == 2){
                this.$router.push({
                    path:'/visit',
                    query:{
                        'id':id,
                        'edit_type':1
                    }
                })
            }
        },
    }
}
</script>
<style lang="less">
.visit_detail{
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    .v_tiem_list{
        padding: 0px 15px;
        a{
            display: block;
        }
        .v_item{
            padding: 10px 0;
            position: relative;
            p{
                margin-bottom: 8px;
                .iconfont{
                    color: #FF5252;
                }    
            }
            .gray{
                .vux-cell-value{
                    color: #BBBBBB;
                }
            }
            .r_icon{
                position: absolute;
                right: -3px;
                bottom: 8px;
                color: #BBBBBB;
            }
            textarea{
                padding: 10px 0;
                resize: none;
                width: 100%;
                border: none;
                outline-style: none;
                height: 60px;
            }
            .weui-cell{
                padding: 0;
                &:before{
                    border-top: none;
                }
                .weui-cell__ft{
                    text-align: left;
                    &::after{
                        height: 0;
                        width: 0;
                        border-color: transparent;
                    }
                }
            }
            .hos_select{
                .vux-cell-primary{
                    flex: 0;
                }
            }
        } 
        .v_dep{
            p:nth-of-type(2){
                width: 94%;
                margin-bottom: 0;
                color: #999999;
            }
            a{
                display: block;
                color: #BBBBBB;
            }
        }   
    }
    .search_btn{
        margin: 10px 15px 0;
        text-align: right;
        button{
            width: 90px;
            height: 34px;
            line-height: 34px;
            background-color: #5870FE;
            color: #ffffff;
            border-radius: 4px;
        }
    }
    .his_v_list{
        padding: 15px 0px 15px 15px;
        flex-direction: row;
        column-count: 2;
        column-gap: 0;
        .his_v_item{
            box-sizing: border-box;
            break-inside: avoid;
            border-radius: 4px;
            margin: 0 15px 15px 0;
            .his_v_item_con{
                display: flex;
                flex-direction: column;
                align-items: center;
                height: auto;
                h4{
                    width: 100%;
                    box-sizing: border-box;
                    line-height: 40px;
                    padding: 0 15px;
                    p{
                        width: 50px;
                        line-height: 24px;
                        border-radius: 15px;
                        font-weight: normal;
                        margin-top: 10px;
                        text-align: center;
                        font-size: 12PX;
                        background-color: #E5E8FF;
                        color: #5870FE;
                    }
                    .bg_red{
                        color:#FF5555;
                        background-color:#FFEEEE;
                    }
                }
                ul{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 10px 15px ;
                    li{
                        line-height: 30px;
                        .iconfont{
                            font-size: 16px;
                            color: #5870FE;
                            margin-right: 8px;
                        }
                    }
                }
            }
        }
    }
    .van-popup--bottom.van-popup--round{
        border-radius: 0;
    }
    .van-action-sheet{
        height: 100%;
        max-height: 100%;
        .van-action-sheet__content{
            position: relative;
            .dep_btn{
                position: fixed;
                width: 100%;
                bottom: 0px;
                padding: 15px;
                .btn_common{
                    width: 100%;
                    background-color: #5870FE;
                    color: #ffffff;
                }
            }
        }
    }
    .weui-cells{
        font-size: 14PX;
    }
    .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
        color: #5870FE;
    }
}
.demo3-slot {
    text-align: center;
    padding: 10px 0;
    color: #888;
}
</style>