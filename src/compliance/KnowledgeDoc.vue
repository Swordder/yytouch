<template>
    <div class="knowledge_doc" data-name="knowledge_doc">
        <pdf 
            v-for="i in numPages"
            :key="i"
            ref="pdf"
            :src="src"
            :page="i"
            >
        </pdf>
    </div>
</template>
<script>
import { knowledgeInfo } from '../../api/sendRequest';
import pdf from 'vue-pdf';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            pdf_url:'',
            src:'',
            numPages:undefined,
        }
    },
    computed:{
        ...mapState([
            'user_info'
        ])
    },
    mounted(){
        this.getInfo();
    },
    components:{
        pdf
    },
    methods:{
        async getInfo(){
            let res = await knowledgeInfo(this.user_info.yyid,this.user_info.user_token,this.$route.query.yyid);
            document.title = res.data.title;
            this.src = pdf.createLoadingTask(res.data.file_address);
            let _this = this;
            this.src.promise.then(pdf => {
                this.numPages = pdf.numPages;
                _this.$vux.loading.show({ text: 'Loading' })
                setTimeout(function(){
                    _this.$vux.loading.hide()
                },1000);
            });
        }
    }

}
</script>
<style lang="less" scoped>
.knowledge_doc{
    overflow: hidden;
}
</style>