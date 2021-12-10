<template>
    <!-- <Survey></Survey> -->
    <div class="exam_content" data-name="exam_content">
        <p class="curr_subject">第{{per_data.pos}}/{{per_data.total}}题</p>
        <div class="progress">
            <x-progress :percent="percent" :show-cancel="false"></x-progress>
        </div>
        <div class="qu-content">
            <section class="qu-item">
                <template>
                    <h3>
                        <span>[{{per_data.type == '1'?'单选':'多选'}}]</span>
                        {{per_data.pos}}、{{per_data.name}}
                    </h3>
                    <ul>
                        <li 
                            class="flex_item" v-for="item in per_data.items" 
                            :key="item.yyid"
                            @click="selectedItem(item.yyid,per_data.type)">
                            <template v-if="per_data.type == 1">
                                <i v-if="curr_an_yyid.indexOf(item.yyid) != -1" class="iconfont right_check">&#xe601;</i>
                                <i v-else class="iconfont">&#xe668;</i>
                            </template>
                            <template v-else-if="per_data.type == 2">
                                <i v-if="curr_an_yyid.indexOf(item.yyid) != -1" class="iconfont right_check check">&#xe620;</i>
                                <i v-else class="iconfont check">&#xe69c;</i>
                            </template>
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                    <div class="btn_item flex_item">
                        <button class="up_btn" @click="previousQu">上一题</button>
                        <button class="next_btn active_next_btn" @click="nextQu">
                            {{per_data.next_question_yyid?'下一题':'交卷'}}
                        </button>
                    </div>
                    <div v-show="show_answer" class="answer_con">
                        <h5>答案解析</h5>
                        <p>{{explain}}</p>
                        <span></span><span></span>
                    </div>
                </template>
            </section>
        </div>
    </div>
</template>
<script>
import { question,getPerQuestion,getPerAnswer } from '../../api/sendRequest';
import { getStore } from '../../config/util';
import Survey from '../components/Survey';
import { XProgress, XButton } from 'vux';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            percent:0,
            start_data:{},
            per_data:{},
            cur_num:1,
            qu_data:[],
            options:[],
            curr_index:0,
            curr_an_yyid:[],
            show_answer:false,
            explain:'',
            answers:[],
        }
    },
    computed:{
        ...mapState([
            'user_info',
        ])
    },
    components:{
        XProgress,
        XButton,
    },
    mounted(){
        this.getPerQu(this.$route.query.next_question_yyid,this.cur_num);
    },
    methods:{
        async getPerQu(next_yyid,num){
            let res = await getPerQuestion(this.$route.query.paper_yyid,next_yyid,num);
            if(res.errcode != 0){
                this.$vux.toast.text(res.errmsg,'top');
                return
            };
            this.per_data = { ...res.data };
            this.percent = res.data.pos/res.data.total*100;
        },
        selectedItem(an_yyid,type){
            if(type == 1){
                if(this.curr_an_yyid.length === 0){
                    this.curr_an_yyid.push(an_yyid);
                } else {
                    this.$set(this.curr_an_yyid,0,an_yyid)
                }
                return
            } else if(type == 2){
                if(this.curr_an_yyid.indexOf(an_yyid) == -1){
                    this.curr_an_yyid.push(an_yyid);
                } else {
                    this.curr_an_yyid.splice(this.curr_an_yyid.indexOf(an_yyid),1);
                }
            }
        },
        previousQu(){
            if(this.per_data.pos == 1){
                this.$vux.toast.text('已经是第一题','top');
                return
            };
            let index = Number(this.per_data.pos)-2;
            this.getPerQu(this.answers[index].qu_yyid,index+1);
            this.curr_an_yyid = this.answers[index].answer_yyid;
            this.show_answer = false;
        },
        async nextQu(){
            // 判断是否作答
            if(this.curr_an_yyid.length == 0){
                this.$vux.toast.text('请对本题作答','top');
                return
            }
            // 已作答的直接获取题目和答案，未作答的要先提交答案开始
            let index = Number(this.per_data.pos);
            if(this.answers.length !== 0 && this.answers[index]){
                this.getPerQu(this.per_data.next_question_yyid,Number(this.per_data.pos)+1);
                this.curr_an_yyid = this.answers[index].answer_yyid;
            } else {
                let paper_yyid = this.$route.query.paper_yyid;
                let res = await getPerAnswer(paper_yyid,this.per_data.yyid,JSON.stringify(this.curr_an_yyid),'',this.per_data.pos);
                if(res.data.is_right == 0){
                    this.$vux.toast.text('答案错误，请重新选择','top');
                    this.explain = res.data.explain;
                    this.show_answer = true;
                    return
                } else if(res.data.is_right == 1){
                    if(this.per_data.next_question_yyid){
                        // 保存当前正确选项
                        this.answers.push({
                            'qu_yyid':this.per_data.yyid,
                            'answer_yyid':res.data.right_options,
                            'pos':this.per_data.pos
                        })
                        // 判断当前问题的答案是否已经存在于this.answers的数组中
                        this.getPerQu(this.per_data.next_question_yyid,Number(this.per_data.pos)+1);
                        this.curr_an_yyid = [];
                        this.show_answer = false;
                        
                    } else {
                        this.$router.push({
                            path:'/surveyCover',
                            query:{
                                type:'2'
                            }
                        })
                    }
                }
            }
            // 结束
        },
    }
}
</script>
<style lang="less">
    .exam_content{
        padding: 16px 15px 90px;
        .curr_subject{
            margin-bottom: 20px;
        }
        .weui-progress__bar{
            height: 8px;
            border-radius: 4px;
            .weui-progress__inner-bar{
                border-radius: 4px;
                background-color: #5870FE;
            }
        }
        .qu-content{
            margin-top: 26px;
            .qu-item{
                // padding-bottom: 10px;
                h3{
                    position: relative;
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
                    .check{
                        font-size: 16PX;
                    }
                    .wrong_check{
                        color: #FF5555;
                    }
                    .right_check{
                        color: #5870FE;
                    }
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
        .btn_item{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            button{
                border: none;
                border-radius: 22px;
                outline-style: none;
                line-height: 44px;
                background-color: #D1D3D7;
                color: #ffffff;
                flex: 1;
            }
            .up_btn{
                color: #5870FE;
                margin-right: 10px;
                background-color: #ffffff;
                border: 1PX solid #5870FE;
            }
            .next_btn{
                flex: 2;
            }
            .active_next_btn{
                background-color: #5870FE;
            }
            .submint_btn{
                width: 100%;
                background-color: #5870FE;
            }
        }
    }
</style>