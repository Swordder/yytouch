<template>
	<div class="err_correct_page">
		<div class="opera_btns flex_item">
			<button type="button" class="btn_item btn_common correct_btn" @click="correct()">{{$t('correct')}}</button>
			<router-link v-if="$route.query.hospital_yyid" class="btn_item btn_common trans_btn" :to="{path:'/historyFlow',query:{product_yyid:proyyid,hospital_yyid:$route.query.hospital_yyid}}">{{$t('history_flow_detail')}}</router-link>
			<router-link v-else class="btn_item btn_common trans_btn" :to="{path:'/historyFlow',query:{product_yyid:proyyid}}">{{$t('history_flow_detail')}}</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		props:['modtype','proyyid'],
		data(){
			return {}
		},
		mounted(){
		},
		methods:{
			correct(){
				this.$emit('correctMod','err_correct_mod');
			}
		}
	}
</script>

<style lang="less" scoped="">
.err_correct_page{
	.opera_btns{
		padding: 20px 0;
		.correct_btn{
			width: 36%;
		}
		.trans_btn{
			width: 60%;
			color: #FFFFFF;
			background-color: #5870FE;
		}
	}
}
</style>
