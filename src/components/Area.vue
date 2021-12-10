<template>
	<section class="tab_item">
		<transition name="showlist">
			<section class="tab_container flex_item" v-show="area.chooseCondition == 'area'">
				<section class="province">
					<ul>
						<li :class="{tab_active:'全国' == area.pro_name}" @click="totalProvince">全国</li>
						<li v-for="(item,index) in province" :key="index" @click="getCity(index)" :class="{tab_active:item == area.pro_name}">{{item}}</li>
					</ul>
				</section>
				<section class="city">
					<ul>
						<li @click="selectedCity('全部','')" :class="{city_active:'全部' == area.city_name}">全部</li>
						<li v-for="(city_item,index) in city" :key="index" @click="selectedCity(city_item.name,index)" :class="{city_active:city_item.name == area.city_name}">{{city_item.name}}</li>
					</ul>
				</section>
			</section>
		</transition>
	</section>
</template>

<script>
	import {totalProvince,totalCity} from '../api/staticRequest'
	export default {
		props:['area'],
		data(){
			return {
				province:{},
				city:{},
			}
		},
		mounted(){
			this.getProvince();
		},
		methods:{
			totalProvince(id){
				this.city = '';
				this.area.pro_name = "全国";
				this.area.pro_id = '';
			},
			getProvince(id){
				totalProvince.then(result => {
					this.province = result;
				});
			},
			getCity(province_id,id){
				this.area.pro_id = province_id;
				totalCity(province_id).then(result => {
					this.city = result.child;
					this.area.pro_name =  result.name;
				});
			},
			selectedCity(name,index){
				this.area.city_name = name;
				this.area.city_id = index;
				this.area.city_txt = this.area.pro_name;
				this.$emit('search');
				this.area.chooseCondition = '';
			},
		}
	}
</script>

<style>

</style>
