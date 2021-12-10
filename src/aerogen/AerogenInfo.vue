<template>
  <div class="aerogen_info" data-name="aerogen_info">
    <NavBar></NavBar>
    <div style="overflow: hidden;">
      <div class="video" :style="{height:video_height}">
        <div id="video_container" :style="{height:video_height}"></div>
      </div>
    </div>
    <div class="aerogen_intro">
      <div class="base_intro">
        <div class="pic">
          <img src="http://img.youyao99.com/5DF4B4265D21F8E8F36257F34F84A8E4.png" />
        </div>
        <h2>Aerogen爱尔真雾化系统</h2>
        <p class="font_12">高效雾化给药技术领导者，全球领先企业</p>
        <!-- <router-link class="" :to="{path:'/'}">业务介绍 <i class="iconfont">&#xe61e;</i></router-link> -->
        <h3>独一无二的钯振动网筛技术</h3>
        <p class="paragraph">Aerogen拥有超过40项国际专利的获奖技术，其中钯合金振动网格技术Aerogen Vibronic&#174 是气雾剂输送技术的突破，也是我们的核心产品。中心孔板直径只有5mm，分布着1000个精密成形微孔，每秒振动128,000次，形成大小最利于深度肺部沉积的液滴。</p>
      </div>
      <div class="application_item">
        <h4>应用领域</h4>
        <grid :cols="5" :show-lr-borders="false">
          <grid-item v-for="item in apply_pic_list" :key="item.id">
             <div class="pic">
               <img :src="item.src" alt="">
             </div>
          </grid-item>
        </grid>
        <div class="pic_intro flex_item">
          <p>自主呼吸</p>
          <p>HFNC</p>
          <p>机械通气</p>
          <p>NIV</p>
          <p>HFOV</p>
        </div>
      </div>
    </div>
    <div class="pro_intro">
      <div class="mod_hd"><span></span>产品解读</div>
      <div class="pro_intro_mod">
        <router-link key="1" class="flex_item" to="/aerogenSolo">
          <div class="pic">
            <img src="http://img.youyao99.com/5DF4B4265D21F8E8F36257F34F84A8E4.png" alt="">
          </div>
          <div class="title">SOLO</div>
          <i class="iconfont">&#xe61e;</i>
        </router-link>
        <router-link key="2" class="flex_item" to="/aerogenUltra">
          <div class="pic pic_50">
            <img src="http://img.youyao99.com/C282FC664BA21ABA52349B9196680502.png" alt="">
          </div>
          <div class="title">Ultra</div>
          <i class="iconfont">&#xe61e;</i>
        </router-link>
        <router-link key="3" class="flex_item" to="/aerogenController">
          <div class="pic">
            <img src="http://img.youyao99.com/040D6BCBEC40BF962CAD01D0512883AA.png" alt="">
          </div>
          <div class="title">控制器</div>
          <i class="iconfont">&#xe61e;</i>
        </router-link>
        <router-link key="4" class="flex_item small_pic" to="/aerogenAnalysis">
          <div class="pic">
            <img src="http://img.youyao99.com/F8247A71F3913016AAABADF941881E44.png" alt="">
          </div>
          <div class="title">竞品分析</div>
          <i class="iconfont">&#xe61e;</i>
        </router-link>
        <router-link key="5" class="flex_item small_pic" to="/aerogenQa">
          <div class="pic">
            <img src="http://img.youyao99.com/3813539E01F7A549C97397DAA6ED2BA4.png" alt="">
          </div>
          <div class="title">Q&A</div>
          <i class="iconfont">&#xe61e;</i>
        </router-link>
      </div>
    </div>
    <div class="partner">
      <h5>合作伙伴</h5>
      <div class="pic_partner">
        <img src="http://img.youyao99.com/162B9064424A35775427D6A5A6F73D48.png" alt="">
      </div>
    </div>
    <AerogenAgentBtn></AerogenAgentBtn>
  </div>
</template>

<script>
  import NavBar from '../../components/NavBar.vue'
  import { wxShare } from '../../config/share.js'
	import AerogenAgentBtn from '../../components/AerogenAgentBtn.vue'
  import { Grid, GridItem } from 'vux'
  export default {
    data(){
      return {
        video_height:'0px',
        apply_pic_list:[
          {
            id:'1',
            src:'http://img.youyao99.com/56EC6503A3453E08F7620A4F5393D7B5.png'
          },
          {
            id:'2',
            src:'http://img.youyao99.com/62CBDDD4F413CD39DCD6D20A33C4BD4D.png'
          },
          {
            id:'3',
            src:'http://img.youyao99.com/3E024BFDBAC77AAD5DF43C3D10E81E2A.png'
          },
          {
            id:'4',
            src:'http://img.youyao99.com/CE780B625B859C25F061F29782936151.png'
          },
          {
            id:'5',
            src:'http://img.youyao99.com/3257C7497280AE1EA1C53EFB33EECFD5.png'
          },
        ],

      }
    },
    components:{
      NavBar,
      AerogenAgentBtn,
      Grid,
      GridItem
    },
    mounted(){
      wxShare(
        'AerogenⓇ爱尔真雾化器',
        'Aerogen雾化器拥有超过40项国际专利的获奖技术，给患者带来安静、高效、快速、药效持久的雾化治疗！',
        'http://img.youyao99.com/8017F0F76A89475C6467F4ADA8BBAD5E.png',
        '3D05AC5E2CDBA972A4E5D2E889CE60CC',
        5,
        this.$route.query
      );
      this.videoFn();
    },
    methods:{
      videoFn(url,pic){
      	let width = window.screen.width;
      	this.video_height = 9*width/16+'PX';
      	let player = new TcPlayer('video_container', {
      		"mp4": 'http://1253663427.vod2.myqcloud.com/e6fbef6evodtransgzp1253663427/8313a6cf5285890802758292190/v.f20.mp4', //请替换成实际可用的播放地址
      		"autoplay" : false,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
          "coverpic" : {
      			'style':'cover',
      			'src':'http://img.youyao99.com/F7B5E73AB7917B050D8885C882AD342E.png'
      		},
          "controls":'',
      		"width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度system
      		"height" : '100%',//视频的显示高度，请尽量使用视频分辨率高度
      		"listener":function(msg){
      			if(msg.type =='loadedmetadata'){
      				if((player.duration()-player.currentTime())>=0.5&&(player.duration()-player.currentTime())<=1){
      					player.pause();
      					player.currentTime(0.1);
      					player.pause();
      					player.fullscreen(false);
      				}
      			}
            if(msg.type =='ended'){
              player.currentTime(0.1);
              player.pause();
            }
      		}
      	});
      },
    }
  }
</script>

<style lang="less">
.aerogen_info{
  padding: 36px 0 68px;
  .aerogen_intro{
    text-align: center;
    background-color: #0077C8;
    color: #FFFFFF;
    .base_intro{
      padding: 20px 26px;
      .pic{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        margin: 0 auto 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      h2{
        font-size: 18PX;
      }
      .font_12{
        font-size: 12PX;
        margin-bottom: 20px;
      }
      /* a{
        display: inline-block;
        position: relative;
        width: 216px;
        line-height: 30px;
        margin: 10px auto 30px;
        color: #FFFFFF;
        font-size: 12PX;
        border: 2px solid #FFFFFF;
        .iconfont{
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
        }
      } */
      .paragraph{
        margin-top: 8px;
        text-align: justify;
        word-break: break-all;
      }
    }
    .application_item{
      h4{
        margin-bottom: 18px;
        position: relative;
        &::before{
          content: '';
          display: inline-block;
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 3px;
          background-color: #FFFFFF;
        }
      }
      .weui-grids{
        &::before{
          border-top: none;
        }
        .weui-grid{
          padding: 0;
          padding-top: 20%;
          height: 0;
          &::before{
            border-right: none;
          }
          &::after{
            border-bottom: none;
          }
          .pic{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-right: 1PX solid #0077C8;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .pic_intro{
        padding: 10px 0 30px;
        p{
          flex: 1;
        }
      }
    }
  }
  .pro_intro{
    .mod_hd{
      padding: 15px 15px 10px 29px;
      position: relative;
      font-size: 14PX;
      color: #333333;
      span{
        position: absolute;
        top: 54%;
        left: 15px;
        transform: translateY(-50%);
        width: 4px;
        height: 16px;
        background-color: #0077C8;
      }
    }
    .pro_intro_mod{
      padding: 10px 15px 20px;
      a{
        height:60px;
        padding: 8px 6px;
        margin-top: 10px;
        background:#FFFFFF;
        box-shadow:0px 0px 6px 0px rgba(210,210,210,0.5);
        align-items: center;
        .pic{
          width: 52px;
          height: 52px;
          img{
            width: 100%;
          }
        }
        .pic_50{
          width: 48px;
          height: 48px;
        }
        .title{
          font-weight: bold;
        }
        .iconfont{
          margin-right: 14px;
          color: #0077C8;
        }
      }
      .small_pic{
        .pic{
          padding: 10px;
        }
      }
    }
  }
  .partner{
    background-color: #F7F7F7;
    padding: 12px 0;
    text-align: center;
    color: #0077C8;
    h5{
      position: relative;
      margin-bottom: 14px;
      &::after{
        content: '';
        display: inline-block;
        position: absolute;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
        width: 18px;
        height: 3px;
        background-color: #0077C8;
      }
    }
    .pic_partner{
      height: 92px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
