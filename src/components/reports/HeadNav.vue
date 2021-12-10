<template>
  <header v-show="rp_type.indexOf('1') != -1" class="fs_header bd_bt">
    <router-link
      v-if="rp_auth.length !== 0"
      :to="{path:'/reportHome',query:{node_yyid:rp_auth[0].node_yyid}}">
      <i style="color: #5870FE;" class="iconfont">&#xe629;</i>
    </router-link>
    <router-link v-else :to="{path:'/reportHome',query:{node_yyid:(Object.keys($route.query).length == 1 && $route.query.node_yyid)?$route.query.node_yyid:$route.query.total_id}}">
      <i class="iconfont">&#xe629;</i>
    </router-link>
    <popover placement="bottom">
      <div slot="content" class="popover-demo-content">
        <router-link
        :to="{
          path:'/areaReport',
          query:{
            node_yyid:item.area_node_yyid,
            area:item.area_name,
            total_id:rp_auth[0].node_yyid
          }
        }"
        v-for="(item,index) in all_areas.slice(1)"
        :key="index"
        >
          {{item.area_name}}
        </router-link>
      </div>
      <div class="flex_item">
        <span style="display:inline-block;">
          {{current_area.length !== 0?current_area[0].area_name:'全国'}}
        </span>
        <i class="iconfont">&#xe645;</i>
      </div>
    </popover>
  </header>
</template>
<script>
  import { rpAuthority, getArea } from '../../api/sendRequest'
  import { mapState } from 'vuex'
  import { Popover } from 'vux'
  export default {
    props:['allAreas'],
    data(){
      return {
        all_areas:[],
        rp_auth:[],
        rp_type:[],
        current_area:[]
      }
    },
    watch:{
      '$route'(to, from){
        this.getAuth();
      }
    },
    computed: {
      ...mapState([
          'user_info',
      ]),
    },
    components:{
      Popover
    },
    mounted() {
      this.getAuth();
    },
    methods:{
      // 获取报表权限
      async getAuth() {
        // 获取对应账号区的权限，并判断有没有全国权限
        let res = await rpAuthority(this.user_info.yyid,this.user_info.user_token);
        if(res.data.length === 0){
          return
        }
        this.rp_auth = res.data.filter(item => item.report_type == 1);
        if(this.rp_auth.length === 0){
          return
        }
        // 获取对应权限下的所有区
        let area_res = await getArea(this.user_info.yyid,this.user_info.user_token,this.rp_auth[0].node_yyid);
        this.all_areas = [...area_res.data];
        this.current_area = this.all_areas.filter(item => item.area_node_yyid == this.$route.query.node_yyid);
        this.rp_type = res.data.map((item,index) => {
          return item.report_type
        });
      }
    }
  }
</script>

<style lang="less">
  .fs_header{
    height: 36px;
    padding: 0 20px;
    line-height: 36px;
    display: -webkit-box;
    display: flex;
    justify-content: space-between;
    color: #5870FE;
    span{
      font-size: 12PX;
    }
  }
  .vux-popover{
    width: 60px;
    box-shadow:0px 2px 12px 0px rgba(0,0,0,0.1);
    .popover-demo-content{
      border-radius: 4px;
      a{
        text-align: center;
        display: block;
        color: #ffffff;
        padding: 2px 0;
        border-bottom: 1PX solid #F3F3F3;
        line-height: 20px;
        border-radius: 4px;
      }
    }
  }

</style>
