<template>
    <div class="fs_tab_btns">
      <tab bar-active-color="#5870FE">
        <template v-if="this.allAreas.length === 2">
          <tab-item
            :key="this.allAreas[1].area_node_yyid"
            class="vux-tab-selected"
          >
            {{this.allAreas[1].area_name}}
          </tab-item>
        </template>
        <template v-else>
          <tab-item
            v-for="(item, index) in this.allAreas"
            :key="index"
            :selected="initId === item.area_node_yyid"
            :class="(id == ''?initId:id) == item.area_node_yyid?'vux-tab-selected':''"
            @on-item-click="changeAreaTab(item.area_node_yyid)"
          >
            {{item.area_name}}
          </tab-item>
        </template>

      </tab>
    </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
export default{
  props:['changeAreaData','allAreas','initId'],
  data(){
    return {
      id:'',
    }
  },
  mounted() {
    this.initArea();
  },
  components:{
    Tab,
    TabItem
  },
  methods:{
    initArea(){
      if(this.$route.query.areaid){
        this.id = this.$route.query.areaid;
      } else {
        this.id = this.initId;
      }
    },
    changeAreaTab(index){
      this.id = index;
      this.$emit('changeAreaData',index);
    }
  }
}
</script>

<style lang="less">
.fs_tab_btns{
  .vux-tab .vux-tab-item.vux-tab-selected{
    color: #5870FE;
    border:none !important;
    border-width: initial;
    border-bottom: 2px solid #5870FE !important;
  }
  .scrollable .vux-tab-ink-bar{
    bottom: 0;
  }
}
</style>
