<template>
    <div class="territory_doc" data-name="territory_doc">
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
import pdf from 'vue-pdf';
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
import { mapState } from 'vuex';
export default {
    data(){
        return {
            pdf_url:'',
            src:'',
            numPages:1,
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
        getInfo(){
            this.src = pdf.createLoadingTask(`http://static.youyao99.com/${this.$route.query.yyid}.pdf`,CMapReaderFactory);
            let _this = this;
            this.src.promise.then(pdf => {
                this.numPages = pdf.numPages;
                _this.$vux.loading.show({ text: 'Loading' })
                setTimeout(function(){
                    _this.$vux.loading.hide()
                },1000);
            }).catch((err) => {
                console.log(err)
            });
        },
        
    }

}
</script>
<style lang="less" scoped>
.territory_doc{
    overflow: hidden;
}
</style>