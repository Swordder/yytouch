<template>
    <div class="fs_tab_btns">
        <ul class="flex_item">
            <li
            :class="id == index?'actived':''"
            v-for="(item, index) in area_divid"
            @click="changeAreaTab(index)"
            :key="index">{{item}}</li>
        </ul>
    </div>
</template>
<script>
export default{
  props:['changeAreaData'],
  data(){
      return {
          id:'all',
          area_divid:{
              all:'全国',
              ES000000:'东区',
              SS000000:'南区',
              NS000000:'北区'
          },
      }
  },
  mounted() {
    this.initArea();
  },
  methods:{
    initArea(){
      if(this.$route.query.areaid){
        this.id = this.$route.query.areaid;
      }
    },
    changeAreaTab(index){
      this.id = index;
      this.$emit('changeAreaData',index);
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.fs_tab_btns{
    padding: 15px 15px 7px;
    ul{
        background-color: #F7F7F7;
        line-height: 36px;
        border-radius: 18px;
        text-align: center;
        li{
            flex: 1;
            border-radius: 18px;
        }
        .actived{
            background-color: #5870FE;
            color: #ffffff;
        }
    }
}
</style>
