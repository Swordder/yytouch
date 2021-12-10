<template>
  <div class="aero_ultra" data-name="aerogen_ultra">
    <header>
      <h1>Aerogen Ultra</h1>
      <div class="solo_pic">
        <img src="http://img.youyao99.com/83DB55D3902A4E914B1237CAE6E5140F.png" alt="">
      </div>
    </header>
    <div class="aerogen_ad">
      <h4>优势-slogan</h4>
      <ul class="aerogen_ad_list">
        <li v-for="item in advantage_list" :key="item.id">
          <p class="ad_title"><span>{{item.id}}</span>{{item.title}}</p>
          <p class="ad_con">{{item.content}}</p>
        </li>
      </ul>
    </div>
    <div class="aerogen_ad prod_ad">
      <h4>产品特点</h4>
      <div class="prod_ad_pic">
        <img src="http://img.youyao99.com/A111432FB49ED80C8A8A1F9C17E8A8BA.png" alt="">
      </div>
    </div>
    <div class="video_ad">
      <h4 class="bd_bt">用户设置指南视频</h4>
      <group>
        <template>
          <cell
            title="自主呼吸"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 1 ? 'up' : 'down'"
            @click.native="showOrNot(1)">
          </cell>
          <div class="slide" :class="show_type_index == 1 ?'animate':''">
            <div class="video" :style="{height:video_height}">
            	<div id="video_container" :style="{height:video_height}"></div>
            </div>
          </div>
        </template>
      </group>
    </div>
    <AerogenAgentBtn></AerogenAgentBtn>
  </div>
</template>
<script>
  import AerogenAgentBtn from '../../components/AerogenAgentBtn.vue'
  import { wxShare } from '../../config/share.js'
  import { Cell, CellBox, Group } from 'vux'
  export default{
    data(){
      return {
        show_type_index:1,
        video_height:'0px',
        player:null,
        advantage_list:[
          {
            id:1,
            title:'全静音设备',
            content:''
          },
          {
            id:2,
            title:'使用简便',
            content:'通过AerogenⓇ Pro-X 控制器a 或 AerogenⓇ USB 控制器加强'
          },
          {
            id:3,
            title:'给药快速，而且不增加额外流量',
            content:''
          },
          {
            id:4,
            title:'全部标准气溶胶/有刻度的面罩内部可调',
            content:''
          },
          {
            id:5,
            title:'在时间减半的情况下吸入药物更多',
            content:''
          },
          {
            id:6,
            title:'更加快速的患者响应，缩短了治疗时间',
            content:''
          },

        ]
      }
    },
    components:{
      Cell,
      CellBox,
      Group,
      AerogenAgentBtn
    },
    mounted() {
      wxShare(
        'AerogenⓇ爱尔真雾化器',
        'Aerogen雾化器拥有超过40项国际专利的获奖技术，给患者带来安静、高效、快速、药效持久的雾化治疗！',
        'http://img.youyao99.com/8017F0F76A89475C6467F4ADA8BBAD5E.png',
        '3D05AC5E2CDBA972A4E5D2E889CE60CC',
        5,
        ''
      );
      this.videoFn();
    },
    methods:{
      showOrNot(id){
        if(this.show_type_index == id){
          this.show_type_index = -1;
          let elem = document.getElementById(`video_container`);
          elem.innerHTML = '';
        } else {
          this.show_type_index = id;
          this.videoFn();
        }
      },
      videoFn(url,index){
      	let width = window.screen.width;
      	this.video_height = 9*width/16+'PX';
        let elem = document.getElementById(`video_container`);
        if(elem.innerHTML != ''){
          elem.innerHTML = '';
        }
        let _this = this;
      	this.player = new TcPlayer(`video_container`, {
      		"mp4": 'http://1253663427.vod2.myqcloud.com/e6fbef6evodtransgzp1253663427/3cbf858c5285890802757544224/v.f20.mp4', //请替换成实际可用的播放地址
      		"autoplay" : false,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
      		"coverpic" : {
      			'style':'stretch',
      			'src':'http://img.youyao99.com/696E8DDA5B89BEEE4CCA265C1E44E02E.png'
      		},
          'controls':'',
      		"width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
      		"height" : '100%',//视频的显示高度，请尽量使用视频分辨率高度
      		"listener":function(msg){
      			if(msg.type =='loadedmetadata'){
      				if((_this.player.duration()-_this.player.currentTime())>=0.5&&(_this.player.duration()-_this.player.currentTime())<=1){
      					_this.player.pause();
      					_this.player.currentTime(0.1);
      					_this.player.pause();
      					_this.player.fullscreen(false);
      				}
      			}
            if(msg.type =='ended'){
              _this.player.currentTime(0.1);
              _this.player.pause();
            }
      		}
      	});
      },
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/aerogenCommon';
  .aero_ultra{
    header{
      height: 180px;
      background-color: #138CDE;
      text-align: center;
      color: #FFFFFF;
      padding: 20px;
      h1{
        font-size: 18PX;
        font-weight: 500;
        margin-bottom: 12px;
      }
      .solo_pic{
        width: 104px;
        height: 104px;
        border-radius: 50%;
        margin: 0 auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .prod_ad{
      background-color: #138CDE;
      padding: 20px;
      padding-right: 5px;
      .prod_ad_pic{
        margin-top: 20px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .setting_ad{
      padding: 20px;
      padding-bottom: 2px;
      background-color: #0077C8;
      li{
        margin-bottom: 30px;
        h5{
          color: #FFD100;
          line-height: 40px;
          text-align: center;
          border: 1px solid #FFFFFF;
          margin-top: 20px;
          font-weight: normal;
        }
        .setting_pic{
          width: 100%;
          height: 214px;
          border: 1px solid #FFFFFF;
        }
      }
    }
    .video_ad{
      padding-bottom: 70px;
      border-top: 10px solid #F5F5F5;
      h4{
        padding: 18px 0;
        color: #0077C8;
        margin-bottom: 0;
        font-weight: 500;
        text-align: center;
        position: relative;
        &::after{
          content: '';
          display: inline-block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 3px;
          bottom: 16px;
          background-color: #0077C8;
        }
      }
      .weui-cells{
        margin-top: 0;
        &::before{
          border: 0 none;
        }
        .weui-cell{
          // border-bottom: 10px solid #F5F5F5;
        }
        .weui-cell_access{
          .weui-cell__ft{
            &::after{
              height: 8px;
              width: 8px;
            }
          }
        }
        .vux-label{
          font-size: 14PX;
        }
      }
      .slide {
        overflow: hidden;
        max-height: 0;
        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
      }
      .animate {
        max-height: 9999px;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
      }
    }
  }
</style>
