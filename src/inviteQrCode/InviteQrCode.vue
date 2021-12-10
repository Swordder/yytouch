<template>
  <div class="inviteQrCode">
    <div class="tabBox">
      <div :class="['option1',active==1?'selectedTab':'']" @click='active=1'>医生</div>
      <div :class="['option2',active==2?'selectedTab':'']" @click='active=2'>药店</div>  
    </div>
      <ul class="doctorTab" v-show="active==1">
          <li class="doctor" v-for="(item,index) in doctorList" :key="index">
              <div>
              <img class="avartar"
                  :src="item.headimgurl"
                />
                </div>
                <div class="doctorInfo">
                    <div class="doctorname">{{decodeURI(item.true_name)||item.nickname}}</div>
                    <div class="hospitalname" v-show="item.hospital_name">{{decodeURI(item.hospital_name)}}</div>
                </div>
                <button class="invite" @click="onSelect(item)">邀请</button>
                <button class="edit" @click="onEdit(item)">编辑</button>
          </li>
      </ul>
        <ul class="drugstoreTab" v-show="active==2">
          <li class="drugstore" v-for="(item,index) in drugStoreList" :key="index">
            <div class='storeContainer'>
            <img class='yaodian' src="@/assets/images/medicine.png" alt="">
            <div class="storeName">{{item.drugstore_name}}</div>
            </div>
            <div class="chooseMedicine">
              <h2>选择药品</h2>
              <div class="selectContainer"> 
                <select v-model="item.selected" ref="opt1" :style="{color:item.selected=='请选择药品'?'#BBB':'#333'}">
                  <option v-for="(it,ind) in productList" :key="ind">{{it.drug_name}}</option>
                </select>
              </div>
              <van-button type="info" round style="width:230px;height:36px" @click="shareStore(item)">邀请</van-button>
            </div>
          </li>
        </ul>
        <van-popup v-model="showCode" closeable >
          <div ref="popupContent" class="popupWrapper">
            <Qrcode ref="qrImg" v-if="!canShareImg" :copyStoreId="storeId" :copyDrugId="drugId" :copyDrugName="drugName"/>
            <div ref="drQrImg"  class="popupWrapper" v-if="!canShareDrImg">
              <img style="width:200px;height:200px;padding-top:15px" :src="doctorCode" alt="" crossorigin="anonymous"/>
              <button class="btnQuery">扫码查询附近药房</button>
            </div>
            <div ref="shareImgWrap"></div>
          </div>
        </van-popup>
  </div>
</template>

<script>
import {getDrugStoreList, getProductList, getDrQrCode,docGroupList} from '@/api/sendRequest'
import { mapState } from 'vuex';
import {httpUrl} from '../../config/env'
import Qrcode from './Qrcode.vue';
// import domtoimage from 'dom-to-image';
import {Toast} from 'vant'
import html2canvas from 'html2canvas'

export default {
  components: { Qrcode },
    name:'InviteQrCode',
    data(){
        return{
          active:1,
            storeShareUrl:httpUrl,
            showCode: false,
              options: [
                { name: '微信', icon: 'wechat',message:'分享成功' },
                { name: '微博', icon: 'weibo',message:'' },
                { name: '复制链接', icon: 'link',message:'' },
                { name: '分享海报', icon: 'poster',message:'' },
                { name: '二维码', icon: 'qrcode',message:'' },
              ],
              drugStoreList:[],
              doctorList:[],
              productList:['请选择药品'],
              doctorCode:'',
              storeId:'',
              drugId:'',
              drugName:'',
              memberYyId:'',
              doctorId:'',
              canShareImg: false,
              canShareDrImg:false
        }
    },
    created(){
      //获取医生列表
        docGroupList(this.user_info.yyid,this.user_info.user_token).then(res => {
        let arr = res.data;
        var sum = [];
        for(let i = 0; i < arr.length; i++) {
          sum = sum.concat(arr[i].members) 
        }
        let arr2 = sum.flat();
        let arr3 = [];
        for(let i = 0; i<arr2.length; i++) {
          if (!arr3.find( item => {
            return item.doctor_id == arr2[i].doctor_id
          })) {
            arr3.push(arr2[i])
          }
        }
        this.doctorList = arr3;
        console.log( this.doctorList );
      })
      //获取药店列表
      getDrugStoreList(1,this.user_info.yyid,this.user_info.user_token).then( res => {
        //获取的对象添加selected字段绑定选择框
        this.drugStoreList = res.data.drugstore_list
        console.log(this.drugStoreList)
        this.drugStoreList.forEach( item => {
          item.selected = '请选择药品'
        })
        console.log(this.drugStoreList)
      })
      //获取药店药品列表
      getProductList(1,this.user_info.yyid,this.user_info.user_token).then( res => {
        this.productList = res.data.drug_list;
        this.productList.unshift({drug_yyid:'',drug_name:'请选择药品'});
      });
    },
    methods: {
      //医生分享
      onSelect(list) {
          this.showCode = true;
          this.canShareImg = true;
          this.canShareDrImg = false
          this.$nextTick(function () {
            this.$refs.shareImgWrap.innerHTML = '';
                getDrQrCode(1,this.user_info.yyid,list.doctor_id).then( res => {
                this.doctorCode = res.data.qrcode_url
                html2canvas(this.$refs.popupContent,{
                  scrollX:0,
                  scrollY:0
                })
                .then(dataUrl => {  
                      var img = new Image();
                      img.src = dataUrl.toDataURL();
                      img.style.width = '230px';
                      img.onload = () => {
                        this.$refs.shareImgWrap.appendChild(img);
                        this.canShareDrImg = true;
                        console.log('克隆节点成功')
                      }
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
                })
          });
      },
      
      //编辑医生信息
      onEdit(doc){
        const b =this.doctorList.find(item => {
          return item.true_name == doc.true_name
        })
        this.memberYyId = b.member_yyid;
        this.doctorId = b.doctor_id;
        this.$router.push(`/staffDetail?member_yyid=${this.memberYyId}&doctor_id=${this.doctorId}`)
      },
      //药店分享
      shareStore(list){
            if (this.productList.length<=1) {
              Toast.fail('请先前往产品菜单添加您要服务的药品');
            }
            else if (list.selected == '请选择药品') {
              Toast.fail('请选择药品后分享邀请码');
            }
            else {
              this.showCode = true;
              this.canShareImg = false;
              this.canShareDrImg = true
              this.storeId = list.drugstore_yyid;
              const a = this.productList.find(item => {
                return item.drug_name == list.selected
              });
              this.drugId = a.drug_yyid;
              this.drugName = a.drug_name
              console.log(this.drugName)

              window.setTimeout( () => {
              console.log(this.$refs.popupContent);
              this.$refs.shareImgWrap.innerHTML = '';
              this.canShareImg = false;
              html2canvas(this.$refs.popupContent,{
                scrollX:0,
                scrollY:0
              })
              .then(dataUrl => {
                    var img = new Image();
                    img.src = dataUrl.toDataURL();
                    img.style.width = '230px';
                    img.onload = () =>{
                      this.$refs.shareImgWrap.appendChild(img)
                      this.canShareImg = true;
                      console.log('克隆节点成功')
                    }
              })
              .catch(function (error) {
                  console.error('oops, something went wrong!', error);
              });
              },0);
            }
      },
    },
    computed:{
      ...mapState(['user_info']),
    },
    components:{
      Qrcode
    }
}
</script>

<style lang="less">

.doctorTab{
  position: relative;
  padding: 0px 15px 10px;
}
.doctor{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px,solid,#F3F3F3;
  border-bottom: 1px solid #F3F3F3;
  padding: 5px 0;
}
.tabBox{
  padding:0 87px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  font-weight: 400;
  color: #999999;
  border-bottom: 1px solid #F3F3F3;
}
.option1{
  height: 40px;
  line-height: 40px;
}
.option2{
  height: 40px;
  line-height: 40px;
}
.selectedTab{
  border-bottom: 2px solid #0088CE;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: #0088CE;
}
.avartar{
  width: 44px;
  height: 44px;
  border-radius: 8px;
}
.doctorInfo{
  width: 160px;
  margin-left: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  padding-right: 30px;
  align-self: flex-start;
  padding-top: 2px;
}
.doctorname{
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #333333;
  line-height: 20px;
  margin-bottom: 4px;
}
.hospitalname{
  background: #D6A779;
  border-radius: 2px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  padding: 2px 2px;
  text-align: left;
}
.popupWrapper{
  position: relative;
  text-align: center;
  width:220px
}
.btnQuery{
  text-align: center;
	background-color: #FFFFFF;
	color: #5870FE;
	border: 1PX solid #5870FE;
	border-radius: 30px;
	line-height: 22px;
  padding: 5px;
  margin-bottom: 10px;
  width: 160px;
}
.invite{
  width:48px;
  height:26px;
  background: #0088CE;
  border-radius: 18px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255,255,255,0.9);
  border: transparent;
}
.edit{
  margin-left: 20px;
  width: 48px;
  height: 26px;
  background: #FFFFFF;
  border-radius: 18px;
  border: 1px solid #0088CE;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0088CE;
  border: transparent;
  border: 1px solid #0088CE;
}
.drugstoreTab{
  padding: 15px;
}
.drugstore{
  text-align: center;
  width: 345px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px 0px rgba(216, 216, 216, 0.5);
  border-radius: 8px;
  padding-bottom: 20px;
  margin-bottom: 15px;
}
.storeContainer{
  border-bottom:1px solid #F3F3F3;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  padding:13px 20px;
}
.yaodian{
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.selectContainer{
  width: 100%;
  border-bottom: 1px solid #F3F3F3;
  margin-bottom: 20px;
  margin-top: 4px;
}
option{
  color: #333;
}
select{
  width: 100%;
  display: block;
  border: transparent;
  margin-bottom: 12px;
  padding:0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.storeName{
  text-align: left;
  margin-left: 10px;
  font-size: 16px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN,PingFangSC-Bold, PingFang SC;
  font-weight: 700;
  color: #333333;
  line-height: 24px;
}
.chooseMedicine{
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
}
hr{
  position: absolute;
  top: 50px;
  background: #F3F3F3;
  width: 100%;
}
h2{
  align-self: flex-start;
  font-size: 12px;
  font-family:SourceHanSansCN-Bold, SourceHanSansCN,PingFangSC-Bold, PingFang SC;
  font-weight: 700;
  color: #333333;
  line-height: 16px;
  margin-bottom: 10px;
}
.van-icon-cross::before{
  position: relative;
  bottom: 10px;
  left: 10px;
}
</style>