<template>
    <div class="exam_result" data-name="exam_result">
        <div class="qu-content">
            <section class="qu-item bd_bt" v-for="(item,index) in data" :key="index">
                <h3><span>[{{item.type == 1?'单选':'多选'}}]</span>{{index+1}}、{{item.name}}</h3>
                <ul>
                    <li class="flex_item" v-for="(item2,index2) in item.answers" :key="index2">
                        <template v-if="item.type == 1">
                            <template v-if="item.user_wrong_answer">
                                <i v-if="item.user_wrong_answer[0].indexOf(item2.yyid) != -1" class="iconfont wrong_check">&#xe601;</i>
                                <i v-else class="iconfont">&#xe668;</i>
                            </template>
                            <template v-else-if="!item.user_wrong_answer">
                                <i v-if="item2.is_right == 1" class="iconfont right_check">&#xe601;</i>
                                <i v-else class="iconfont">&#xe668;</i>
                            </template>
                        </template>
                        <template v-else>
                            <template v-if="item.user_wrong_answer">
                                <i v-if="item.user_wrong_answer.indexOf(item2.yyid) != -1" class="iconfont wrong_check db_check"> &#xe620;</i>
                                <i v-else class="iconfont db_check">&#xe69c;</i>
                            </template>
                            <template v-else-if="!item.user_wrong_answer">
                                <i v-if="item2.is_right == 0" class="iconfont db_check">&#xe69c;</i>
                                <i v-else class="iconfont db_check right_check">&#xe620;</i>
                            </template>
                        </template>
                        <p>{{item2.name}}</p>
                    </li>
                    
                </ul>
                <div v-show="item.user_wrong_answer && item.explain_content != ''" class="answer_con">
                    <h5>答案解析</h5>
                    <p>{{item.explain_content}}</p>
                    <span></span><span></span>
                </div>
            </section>
        </div>
        
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { testReview } from '../../api/sendRequest';
export default {
    data(){
        return {
            percent:20,
            selType:false,
            data:[],
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getReview();
    },
    methods:{
        async getReview(){
            let res = await testReview(this.user_info.yyid,this.user_info.user_token,this.$route.query.exam_yyid);
            this.data = [...res.data];
        }
    }
}
</script>
<style lang="less">
    .exam_result{
        padding: 15px 20px;
        .qu-content{
            .qu-item{
                padding-bottom: 10px;
                margin-bottom: 15px;
                h3{
                    position: relative;
                    padding-left: 5px;
                    margin-bottom: 15px;
                    span{
                        color: #5870FE;
                        margin-right: 10px;
                    }
                }
                li{
                    margin-bottom: 12px;
                    line-height: 20px;
                    justify-content: flex-start;
                    color: #666666;
                    .iconfont{
                        margin-right: 10px;
                    }
                    .db_check{
                        font-size: 16PX;
                    }
                    .check{
                        font-size: 16PX;
                    }
                    .right_check{
                        color: #5870FE;
                    }
                    .wrong_check{
                        color: #FF5555;
                    }
                }
                .answer_con{
                    background-color: #FFEEEE;
                    font-size: 14px;
                    margin-top: 20px;
                    margin-bottom: 10px;
                    position: relative;
                    overflow: hidden;
                    h5{
                        color: #FF5555;
                        text-align: center;
                        line-height: 50px;
                        border-bottom: 1PX dashed #FFB9B9;
                    }
                    p{
                        padding: 20px 14px;
                    }
                    span{
                        position: absolute;
                        top: 42px;
                        left: -7px;
                        width: 15px;
                        height: 15px;
                        background-color: #ffffff;
                        border-radius: 50%;
                        z-index: 10;
                    }
                    span:nth-of-type(2){
                        left: auto;
                        right: -7px;
                    }
                }
            }
        }
    }
</style>