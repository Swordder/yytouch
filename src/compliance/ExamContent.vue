<template>
    <!-- <Survey></Survey> -->
    <div class="exam_content" data-name="exam_content">
        <p class="curr_subject">第{{curr_index+1 > qu_data.length?qu_data.length:curr_index+1}}/{{qu_data.length}}题</p>
        <div class="progress">
            <x-progress :percent="percent" :show-cancel="false"></x-progress>
        </div>
        <div class="qu-content">
            <section class="qu-item" v-for="(item,index) in qu_data" :key="index">
                <template v-if="curr_index == index">
                    <h3>
                        <span>[{{item.type == '1'?'单选':'多选'}}]</span>
                        {{index+1}}、{{item.name}}
                    </h3>
                    <ul>
                        <li 
                            class="flex_item" v-for="(item2,index2) in item.answers" 
                            @click="selectedItem(item.yyid,item2.yyid,index,item2.is_right,item.type)"
                            :key="index2">
                            <template v-if="item.type == 1">
                                <i v-if="curr_an_yyid == item2.yyid" class="iconfont right_check">&#xe601;</i>
                                <i v-else class="iconfont">&#xe668;</i>
                            </template>
                            <template v-else>
                                <i v-if="answer_yyid_arr.indexOf(item2.yyid) != -1" class="iconfont right_check check">&#xe620;</i>
                                <i v-else class="iconfont check">&#xe69c;</i>
                            </template>
                            <p>{{item2.name}}</p>
                        </li>
                    </ul>
                    <div class="btn_item flex_item">
                        <button class="up_btn" @click="previousQu(item.type)">上一题</button>
                        <template v-if="!show_submint">
                            <button  v-if="show_next" class="next_btn active_next_btn" @click="nextQu(index,item.yyid,item.type)">下一题</button>
                            <button v-else class='next_btn'>下一题</button>
                        </template>
                        <button v-else class="submint_btn" @click="submintTestList(index,item.yyid,item.type)">交卷</button>
                    </div>
                </template>
            </section>
        </div>
    </div>
</template>
<script>
import { startTest,submintTest } from '../../api/sendRequest';
import Survey from '../components/Survey';
import { XProgress, XButton } from 'vux';
import { mapState } from 'vuex';
export default {
    
    data(){
        return {
            percent:0,
            selType:false,
            qu_data:[],
            options:[],
            curr_index:0,
            curr_an_yyid:'',
            curr_qu_yyid:'',
            answer_yyid_arr :[],
            is_right_checks:[],
            curr_an_yyid_checks:[],
            show_next:false,
            show_answer:false,
            show_submint:false,
            answers:[]
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
        this.getQuestions();
    },
    methods:{
        async getQuestions(){
            let res = await startTest(this.user_info.yyid,this.user_info.user_token,this.$route.query.exam_yyid);
            this.qu_data = [...res.data.questions];
            this.percent = (1/this.qu_data.length)*100;
        },
        selectedItem(qu_yyid,an_yyid,index,is_right,type){
            this.curr_qu_yyid = qu_yyid;
            this.curr_an_yyid = an_yyid;
            // this.percent = ((index+1)/this.qu_data.length)*100;
            if(type == 1){
                if(is_right == 0){
                    this.show_answer = true;
                } else {
                    this.show_answer = false;
                }
                this.answer_yyid_arr.splice(0,1,an_yyid);
                if(this.answer_yyid_arr.length === 0){
                    this.show_next = false
                } else {
                    this.show_next = true
                }
            } else {
                this.show_next = true;
                if(this.answer_yyid_arr.indexOf(an_yyid) == -1){
                    this.answer_yyid_arr.push(an_yyid);
                    this.is_right_checks.push(is_right);
                } else {
                    this.answer_yyid_arr.splice(this.answer_yyid_arr.indexOf(an_yyid),1);
                    this.is_right_checks.splice(this.is_right_checks.indexOf(is_right),1);
                }
                if(this.answer_yyid_arr.length === 0){
                    this.percent = ((index)/this.qu_data.length)*100;
                }
                if(this.is_right_checks.indexOf('0') != -1){
                    this.show_answer = true;
                } else {
                    this.show_answer = false;
                }
            }
            
        },
        previousQu(type){
            if(this.answers.length === 0){
                this.$vux.toast.text('已经是第一题','top');
                return
            }
            if(this.curr_index == this.qu_data.length -1){
                this.show_submint = false;
            }
            this.curr_index --
            this.percent = ((this.curr_index+1)/this.qu_data.length)*100;
            if(this.curr_index == -1){
                this.curr_index = 0;
                this.percent = (1/this.qu_data.length)*100;
                this.$vux.toast.text('已经是第一题','top');
            }
            
            if(this.qu_data[this.curr_index].type == 1){
                this.curr_qu_yyid = this.answers[this.curr_index].question_yyid;
                this.curr_an_yyid = this.answers[this.curr_index].answers[0];
                this.answer_yyid_arr = this.answers[this.curr_index].answers;
                this.show_answer = this.answers[this.curr_index].show_answer;
                this.is_right_checks = this.answers[this.curr_index].is_right_checks;
            } else {
                this.curr_qu_yyid = this.answers[this.curr_index].question_yyid;
                this.answer_yyid_arr = this.answers[this.curr_index].answers;
                this.is_right_checks = this.answers[this.curr_index].is_right_checks;
                this.show_answer = this.answers[this.curr_index].show_answer;
            }
        },
        nextQu(index,yyid,type){
            if(index == 0){
                if(this.curr_qu_yyid == ''){
                    this.$vux.toast.text('请对本题作答','top');
                    return
                }
            } else {
                if(this.curr_qu_yyid != yyid || this.answer_yyid_arr.length === 0){
                    this.$vux.toast.text('请对本题作答','top');
                    return
                }
            }
            // 保存答题数据
            this.answers[this.curr_index] = {
                'question_yyid':this.curr_qu_yyid,
                'answers':this.answer_yyid_arr,
                'show_answer':this.show_answer,
                'is_right_checks':this.is_right_checks
            }
            this.show_answer = false;
            this.answer_yyid_arr = [];
            this.is_right_checks = [];
            this.curr_index ++;
            if(this.percent < 100){
                this.percent = ((this.curr_index+1)/this.qu_data.length)*100;
            } else {
                this.percent = 100;
            }
            // 判断已答列表中是否包含下标为index的题目，有则回显
            if(this.answers[index+1] !== undefined && this.answers[+1] !==''){
                this.curr_qu_yyid = this.answers[index+1].question_yyid;
                this.curr_an_yyid = this.answers[index+1].answers[0];
                this.answer_yyid_arr = this.answers[this.curr_index].answers;
                this.is_right_checks = this.answers[this.curr_index].is_right_checks;
                this.show_answer = this.answers[index+1].show_answer;
                this.percent = ((this.curr_index)/this.qu_data.length)*100;
            }
            if(this.curr_index === this.qu_data.length -1){
                this.show_submint = true;
            }
        },
        async submintTestList(index,yyid,type){
            this.nextQu(index,yyid,type);
            if(this.answers.length === this.qu_data.length -1){
                return
            };
            let res = await submintTest(this.user_info.yyid,this.user_info.user_token,this.$route.query.exam_yyid,JSON.stringify(this.answers));
            this.$router.push({
                path:'/signCompliance',
                query:{
                    exam_yyid:this.$route.query.exam_yyid,
                    has_agree:res.data.has_agreement,
                    pass:res.data.pass,
                    error:res.data.error
                }
            })
        }
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