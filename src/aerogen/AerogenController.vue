<template>
  <div class="aero_contro" data-name="aerogen_controller">
    <header>
      <h1>Aerogen Pro-X控制器/USB控制器</h1>
      <div class="flex_item">
        <div class="solo_pic">
          <img src="http://img.youyao99.com/AC280190D60B180FF00A192413FA07EB.png" alt="">
        </div>
        <div class="solo_pic">
          <img src="http://img.youyao99.com/040D6BCBEC40BF962CAD01D0512883AA.png" alt="">
        </div>
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
        <img src="http://img.youyao99.com/AF5C37EFF346256213CF2B1EE6A9FB70.png" alt="">
      </div>
    </div>
    <div class="prod_ad bgcw">
      <div class="prod_ad_pic">
        <img src="http://img.youyao99.com/CD8EC26346C41A2423F85E226F6115E4.png" alt="">
      </div>
    </div>
    <div class="aerogen_ad setting_ad">
      <h4>设置举例</h4>
      <ul>
      	<li>
          <h5>Aerogen Pro-X控制器驱动Aerogen Solo成为一个易于使用的设备，服务于整个医院</h5>
          <div class="setting_pic">
            <img src="http://img.youyao99.com/0AE591BCB91A3672104DC7DEB6FB0283.png" alt="">
          </div>
        </li>
      </ul>
    </div>
    <div class="video_ad">
      <h4 class="bd_bt">用户设置指南视频</h4>
      <group>
        <template v-for="(item,index) in video_list">
          <cell
            :title="item.title"
            is-link
            :border-intent="false"
            :key="item.id"
            ref="wrap_video"
            :arrow-direction="show_type_index == item.id ? 'up' : 'down'"
            @click.native="showOrNot(item.id)">
          </cell>
          <div :class="show_type_index == item.id ?'slide animate':'slide'">
            <div class="video" :style="{height:video_height}">
              <div :id="'video_container_'+item.id" :style="{height:video_height}"></div>
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
        video_list:[
          {
            title:'湿化器干燥端',
            id:1,
            url:'http://1253663427.vod2.myqcloud.com/e6fbef6evodtransgzp1253663427/f4a6f82e5285890802756776130/v.f20.mp4',
            pic_url:'http://img.youyao99.com/C8A25F602D33923312FD8903205D839E.png',
          },
          {
            title:'成人经鼻高流量',
            id:2,
            url:'http://1253663427.vod2.myqcloud.com/e6fbef6evodtransgzp1253663427/f6e904fb5285890802756864649/v.f20.mp4',
            pic_url:'http://img.youyao99.com/85E418DB7F699A53D6D04CB29CCC5597.png',
          },
          {
            title:'儿科经鼻高流量',
            id:3,
            url:'http://1253663427.vod2.myqcloud.com/e6fbef6evodtransgzp1253663427/31139e885285890802757040751/v.f20.mp4',
            pic_url:'http://img.youyao99.com/6AF432CB2F38FA7CD2F039BE1F5FA314.png',
          },
          {
            title:'在Y型口',
            id:4,
            url:'http://1253663427.vod2.myqcloud.com/e6fbef6evodtransgzp1253663427/337cffcb5285890802757154325/v.f20.mp4',
            pic_url:'http://img.youyao99.com/62C8F035E831DC215E04E66EC57AA0F2.png',
          },
          {
            title:'连续雾化',
            id:5,
            url:'http://1253663427.vod2.myqcloud.com/e6fbef6evodtransgzp1253663427/35c018ac5285890802757244542/v.f20.mp4',
            pic_url:'http://img.youyao99.com/35686646A00877CDEA788487DBDCAB2D.png',
          },
          {
            title:'自主呼吸',
            id:6,
            url:'http://1253663427.vod2.myqcloud.com/e6fbef6evodtransgzp1253663427/3cbf858c5285890802757544224/v.f20.mp4',
            pic_url:'http://img.youyao99.com/696E8DDA5B89BEEE4CCA265C1E44E02E.png',
          }
        ],
        player:null,
        advantage_list:[
          {
            id:1,
            title:'使用快捷，设置简单',
            content:''
          },
          {
            id:2,
            title:'驱动Aerogen Solo',
            content:''
          },
          {
            id:3,
            title:'完全静音',
            content:''
          },
          {
            id:4,
            title:'不增加流量',
            content:''
          },
          {
            id:5,
            title:'具有30分钟和连续模式选项',
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
      this.videoFn(this.video_list[0].url,1,this.video_list[0].pic_url);
    },
    methods:{
      showOrNot(id){
        if(this.show_type_index == id){
          this.show_type_index = -1;
          let elem = document.getElementById(`video_container_${id}`);
          elem.innerHTML = '';
        } else {
          this.show_type_index = id;
          this.videoFn(this.video_list[Number(id)-1].url,id,this.video_list[Number(id)-1].pic_url);
        }
      },
      videoFn(url,index,pic_url){
      	let width = window.screen.width;
      	this.video_height = 9*width/16+'PX';
        let _this = this;
        for(let i = 0; i < 6; i++){
          let elem = document.getElementById(`video_container_${i+1}`);
          if(elem.innerHTML != ''){
            elem.innerHTML = '';
          }
        };
      	this.player = new TcPlayer(`video_container_${index}`, {
      		"mp4": url, //请替换成实际可用的播放地址
      		"autoplay" : false,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
      		"coverpic" : {
      			'style':'cover',
      			'src':pic_url
      		},
          'controls':'',
      		"width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度system
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
  .aero_contro{
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
      .flex_item{
        justify-content: center;
        .solo_pic{
          width: 104px;
          height: 104px;
          border-radius: 50%;
          margin: 0 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .prod_ad{
      background-color: #138CDE;
      padding: 20px;
      .prod_ad_pic{
        margin-top: 30px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .bgcw{
      background-color: #FFFFFF;
      padding-right: 0;
      .prod_ad_pic{
        margin-top: 15px;
      }
    }
    .setting_ad{
      padding: 20px;
      padding-bottom: 2px;
      background-color: #0077C8;
      li{
        margin-bottom: 30px;
        h5{
          padding: 9px 17px;
          color: #FFD100;
          line-height: 20px;
          text-align: center;
          border: 1px solid #FFFFFF;
          border-bottom: 0 none;
          margin-top: 20px;
          font-weight: normal;
        }
        .setting_pic{
          width: 100%;
          img{
            width: 100%;
          }
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
