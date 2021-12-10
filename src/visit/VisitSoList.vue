<template>
    <div class="v_sign_list bgc" data-name="visit_sign_list">
        <van-list
        v-model="loading"
        :finished="finished"
         @load="getVisitList"
        >
            <div class="v_list bgc flex_item">
                <div class="v_item bgcw" v-for="(item,index) in data_list" :key="index">
                    <div @click="getVisitDetail(item.id)">
                        <h4 class="bd_bt">
                            <p>{{item.check_type == 1?'签入':'签出'}}</p>
                            {{item.date}}
                        </h4>
                        <ul>
                            <li><i class="iconfont">&#xe6fa;</i>{{item.type}}</li>
                            <li v-show="item.hospital"><i class="iconfont">&#xe6fa;</i>{{item.hospital}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </van-list>
        <van-empty v-show="empty_flag" description="暂无此条件下的数据" />
    </div>
</template>
<script>
import { visitList } from '../../api/sendRequest';
import { Datetime, Group, PopupRadio  } from 'vux';
import { mapState,mapMutations } from 'vuex';
export default {
    data(){
        return {
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
        }
    },
    components:{
        Datetime, Group, PopupRadio 
    },
    computed:{
        ...mapState([
            'user_info',
        ]),
    },
    methods:{
        ...mapMutations([
            'INIT_VISTI'
		]),
        async getVisitList(){
            // 获取当天的日期
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth()+1 < 10?`0${date.getMonth()+1}`:date.getMonth()+1;
            let day = date.getDate();
            let start_time = `${year}-${month}-${day} 00:00:00`;
            let end_time = `${year}-${month}-${day} 23:59:59`;
            let _this = this;
            // 异步更新数据
            setTimeout(async () => {
                let res = await visitList(
                    _this.user_info.yyid,
                    _this.user_info.user_token,
                    start_time,
                    end_time,
                    '','',0,JSON.stringify([]),1,'',_this.page,10);
                if(res.errcode != 0){
                    _this.error = true;
                    _this.loading = false;
					return
				}
                _this.page ++;
                if(res.data.page.total == 0){
                    _this.empty_flag = true;
                    // _this.finished = true;
                    _this.finished_text = '';
                } else {
                    _this.empty_flag = false;
                    // _this.finished = false;
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
        async getVisitDetail(id){
            this.$router.push({
                path:'/visit',
                query:{
                    'id':id
                }
            })
        },
    }
}
</script>
<style lang="less">
.v_sign_list{
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
            a{
                display: block;
                color: #BBBBBB;
            }
        }   
    }
    .v_list{
        padding: 15px;
        flex-wrap: wrap;
        .v_item{
            width: 48%;
            border-radius: 4px;
            margin-bottom: 15px;
            h4{
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
            }
            ul{
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
.demo3-slot {
    text-align: center;
    padding: 10px 0;
    color: #888;
}
</style>