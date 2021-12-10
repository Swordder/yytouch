<template>
  <div class="home_page">
    <router-view></router-view>
  </div>
</template>
<script>
	import { statisticsObj } from './config/statistics.js'
	import { statisticsInfo,getUserResource } from './api/sendRequest.js'
	import { getStore } from './config/util'
	export default {
		data(){
			return {
			}
		},
		beforeRouteUpdate(to,from,next){
			let data_name = document.querySelector('.home_page');
			let page_name = data_name.firstChild.getAttribute('data-name');
			statisticsObj.setLastPage(page_name);
			next();
		},
		updated() {
			this.$nextTick(() => {
				let data_name = document.querySelector('.home_page');
				let page_name = data_name.firstChild.getAttribute('data-name');
				statisticsObj.setNowPage(page_name);
				statisticsInfo(this.$route.query);
			})
		},
		mounted(){
			let data_name = document.querySelector('.home_page');
			let page_name = data_name.firstChild.getAttribute('data-name');
			statisticsObj.setNowPage(page_name);
			statisticsInfo(this.$route.query);	
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // height: 100%;
  .home_page{
    // height: 100%;
  }
}
[data-dpr="1"] #app{
    font-size: 14PX !important;
}
[data-dpr="2"] #app{
    font-size: 28PX!important;
}
[data-dpr="3"] #app{
    font-size: 42PX !important;
}
</style>
