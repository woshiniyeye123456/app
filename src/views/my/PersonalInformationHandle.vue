<template>
   <div id="personalInformation">
     <!--头部-->
     <!-- <mt-header :title="title" class="commonHeader">
       <router-link to="/" slot="left">
         <mt-button icon="back"></mt-button>
       </router-link>
     </mt-header> -->
    <div class="my_header_div">
      <div class="backColordiv"></div>
      <div class="header_content" @click="comeToInfo">
        <div class="personicon_div">
          <span>
            <img :src="headerUrl" width="60" height="60">
          </span>
        </div>
        <div class="ul_content">
          <span class="top_title">{{userObj.name}}</span>
          <!-- <span class="bottom_title">北京辰安科技股份有限公司</span> -->
        </div>
        <div class="flag_img">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC1ElEQVRoQ+2ZwY3bMBBFhzpIx2wJuxVkO4i3gqwriHUxqVPiClLCOieRvsipYJ0KdlNBNh24g9hH+0AGA0iA4IgWRyJpGIgAn0xY/3FmPodjBlf+sCvXD/8BLh1BcgSqqro5Ho9fAWACANs0TfM8z3eXAiEDSClfGGMovnl2jLGH+Xz+dgkIEkC9+386hGIEcs75JjYECQDFKaVQ7LsuoVrrvCiKdUwIMkBZlrMkSSqbSGPMWgiRx4IgA6CwPggA2MQq7kEANcQkSRLM+c50AoC3NE0fQjvUYACEWK1W91rrNWPsvSVlgjvUKAAUjc50OBxez0ForadFUbyGqIvRAI0opRS6zyebyFAO5Q2gttgvAPB0ZqeXnPOFz0h4BWg51NJW3GizWZYtfBW3d4CmuI0xmPPBHSoIgEtxG2O2SZJMx/ZQwQBaEGizH202O9ahggI0oqWUS8bY5xAOFQXAsf2YDulmowE4tB+7NE3vqO4UFcCh/VhwztGCnZ/oAD0O9ZNz3r7t9YJcBKB1Vvw6Vcg5J2kiLe7dDsIC7GSNMdcL0DEcAGPMbyHEPWEf4g+26sHACwD8I9QY800IgQ2h8xM1hc6JR8Va67uiKLbO6gHiRaDOeRwGdKbIkN1H0CgRqMVj2tx07a4x5ocQ4pGy883a4AB94gHgO+d8NkR88Ag4jF9GiQ8K4CCe3DZ0RSlICiml8F5stUOfF3zvAFLKijFmy+k9AMyGtM22GvEGUM+Hns6Jx7H82CvkKYgXgL4DCgD2IcR7KeI+8djfZFk2oV5UXG11VATq2egzY+zWckAFFT8qAn0HFJ6uWZbNQu38qJO4LEscrT/bWoOxp6tr+gyKgO0i0rx0aFNGEd1eS64BKeXGNqjyeUC5ApEBlFI48/xw+oJLiB+UQkqp0xH6Xmv9GOoPjL5IkCOAP6iUwt4dP1v8i4l6i+oTRfl+EADlBaHX/gVI3G1AMBA5LwAAAABJRU5ErkJggg==" alt="" srcset="">
        </div>
      </div>
    </div>
     
     <!-- <mt-cell class="listBox" title="坐标上报" >
       <img slot="icon" src="../../assets/images/mineInfo/ico-坐标上报.png" width="20" height="24">
       <mt-switch></mt-switch>
     </mt-cell> -->
     <!-- <mt-cell class="listBox" title="关注事件"  >
        <img slot="icon" src="../../assets/images/mineInfo/ico-关注事件.png" width="20" height="20">
       <img class="jtIcon" @click="changeInformationPage('inp')" src="@/assets/images/right_jt.png">
     </mt-cell>
     <mt-cell class="listBox" title="修改企业信息" >
       <img slot="icon" src="../../assets/images/mineInfo/ico-修改企业信息.png" width="20" height="20">
       <img class="jtIcon" @click="changeInformationPage('inp')" src="@/assets/images/right_jt.png">
     </mt-cell> -->
     <mt-cell class="listBox" style="margin:0;border-top: 1px solid darkgray;" title="修改密码" >
        <img slot="icon" src="../../assets/images/mineInfo/ico-修改密码.png" width="20" height="20">
        <img class="jtIcon" @click="changePassWord" src="@/assets/images/right_jt.png">
     </mt-cell>
     <!-- <mt-cell class="listBox" title="版本更新" >
        <img slot="icon" src="../../assets/images/mineInfo/ico-版本更新.png" width="20" height="20">
       <img class="jtIcon" @click="changeInformationPage('inp')" src="@/assets/images/right_jt.png">
     </mt-cell> -->
     <!-- <mt-cell class="listBox" title="意见反馈" >
       <img slot="icon" src="../../assets/images/mineInfo/ico-意见反馈.png" width="20" height="20">
       <img class="jtIcon" @click="changeInformationPage('inp')" src="@/assets/images/right_jt.png">
     </mt-cell> -->
    <div class="exit_btn" @click="checkOut">
      注销
    </div>
    <div v-transfer-dom>
      <confirm v-model="exitConfirmShow"
      title="确定注销吗？"
      @on-confirm="onConfirm"
      cancel-text="取消"
      confirm-text="确定"
     >
        <p style="text-align:center;">注销后需要重新登录</p>
      </confirm>
    </div>
    <popup v-model="showChangePassword" v-if="showChangePassword" height="100%" position="right" width="100%">
        <ChangePassword  @close='closeChangePassWord' />
    </popup>
    <popup v-model="showPersonalInfo" v-if="showPersonalInfo" height="100%" position="right" width="100%">
        <personalInfo  @close='closePersonnalInfo' :userObj='userObj'/>
    </popup>
   </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {Popup,Confirm} from 'vux'
  import ChangePassword from './changePassWord.vue'
  import personalInfo from './PersonalInformation.vue';
  import editMineInfo from '../../assets/server/editMineInfo.js';
  
  @Component({
    name:'headImgval',
    components:{
      Popup,
      ChangePassword,
      personalInfo,
      Confirm
    }
  })
    export default class personalInformation extends Vue {
      // @Watch('$router', { immediate: true, deep: true })
      //   onCurChanged(val) {
      //     if(val==1){
      //       this.initData("30");
      //     }else{
      //       this.initData("7");
      //     }
      // }
      private title = '个人信息';
      private headImgval = '';
      private userID = "";
      private userObj = {};
      private showChangePassword = false;
      private showPersonalInfo = false;
      private headerUrl ="";
      private exitConfirmShow = false;
      private mounted(){
        
      }

      private created(){
        
       let headerImg = window.localStorage.getItem('headerImg');
       if(headerImg == undefined || headerImg == ""){
        let urlStr = "http://220.179.173.29:8000/upload/uploadFile/duty/760349bd01dc4064a9ce59fc8b8f0043.png"
        let header = urlStr.split("/upload/");
        let headerStr = window['g'].IP + "upload/" + header[1];
        // let headerStr = window['g'].IP + "upload/" + header[1];
        window.localStorage.setItem('headerImg',headerStr);
       }
        this.headerUrl = window.localStorage.getItem('headerImg');
        let that = this;
        window['gsmdp'].getStorage({
        key: 'store',
        success(res) {
          if(res.data){
            let resultObj=JSON.parse(res.data); 
            that.setUserObj(resultObj);
          }
        }
        });
      }
      private setUserObj(resultObj){
        if(resultObj.IP){
          window['g'].IP=resultObj.IP;
          console.log("IP setObj==>"+window['g'].IP)
        }
        //console.log(resultObj)
        let loginObj=resultObj.loginSystemInfo;
        console.log(loginObj)
        this.$store.commit('SET_USER_INFO', loginObj);
        this.userID = this.$store.state.userInfo.userId;
        console.log("222222222222222222222222222222222222");
        console.log("this.userID "+this.userID);
        console.log("333333333333333333333333333333333333");
        console.log("token: "+window.localStorage.getItem('token'));
        this.getMineInfo();
        this.$enJsBack(false)//true 为使用h5返回操作 false为使用android原生
      } 
      private changePassWord(){
        this.showChangePassword = true;
      }
      private closeChangePassWord(){
        this.showChangePassword = false;
      }
      private changeInformationPage(type:string){
        console.log(type);
        this.$router.push({
          name:'changeInformation',
          path:'/changeInformation',
          params: {
            type: type
          }
        })
      };
      private changeImg(e){
        console.log(e.target.files[0]);
        alert(e.target.files[0]);
      }
      private onConfirm(){
        window['app'].exit();
      }
      private checkOut(){
        // alert('注销');
        this.exitConfirmShow = true;
      }
      private comeToInfo(){
        console.log("come to info")
        // this.$router.push({"path":"/PersonalInformation",query:{"infoid":"1"}})
        this.showPersonalInfo = true;
      }
      private closePersonnalInfo(){
        this.showPersonalInfo = false;
        this.headerUrl = window.localStorage.getItem('headerImg');
      }
      
      private getMineInfo(){
        let that = this;
        return new Promise(function(resolve, reject) {
            let para={
              "userId":that.userID
            };
            console.log("当前用户ID是："+that.userID);
            console.log("this.$store.state.userInfo.userId"+that.$store.state.userInfo.userId);
            console.log("当前用户ID登录的token是："+window.localStorage.getItem('token'));
            editMineInfo
            .getMineInfo(para)
            .then(function(response) {
              if(response.status ==200){
                console.log("获取用户信息成功");
                // that.userObj = response.data.data;
                that.userObj = response.data.data.baseuser;
              }
            })
            .catch(function(error) {
              // (that as any).$toast({ message: '保存失败', position: 'bottom', duration: 3000 });
              reject(error);
            });
          });
      }
    }
</script>

<style scoped lang="scss">
  #personalInformation{
    .my_header_div{
      width: 100%;
      height: 25vh;
      background: #fff;
      position: relative;
      .backColordiv{
        width: 100%;
        height: 50%;
        background: #67A551;  
      }
      .header_content{
        width: 90%;
        height: 19vh;
        margin-left: 5%;
        position: absolute;
        top: 5vh;
        border-radius: 4px;
        background:linear-gradient(#DDFDE7, 10%, #fafffd);
        box-shadow: 1px 2px 4px #888888;
        .personicon_div{
          width: 20%;
          height: 100%;
          padding-left: 4vw;
          float: left;
          display: flex;
          -webkit-box-align: center;
          align-items: center;//垂直居中
          justify-content: center;//行内居中
          -webkit-box-pack: center; 
          span{
            display: block;
            width: 60px;
            height: 60px;
            border: 1px #888888 solid;
            border-radius: 5px;
          }
        }
        .ul_content{
          width: 70%;
          height: 100%;
          float: left;
          display: flex;
          -webkit-box-align: center;
          align-items: center;//垂直居中
          justify-content: center;//行内居中
          -webkit-box-pack: center; 
          flex-direction: column;
          padding-left: 4vw;
          .top_title{
            display: block;
            width: 100%;
            height: 9vw;
            float: left;
            line-height: 9vw;
            font-size: 5vw;
            font-weight: bold;
          }
          .bottom_title{
            display: block;
            width: 100%;
            height: 9vw;
            line-height: 9vw;
            font-size: 4vw;
          }
        }
        .flag_img{
          width: 10%;
          height: 100%;
          display: flex;
          -webkit-box-align: center;
          align-items: center;//垂直居中
          justify-content: center;//行内居中
          -webkit-box-pack: center; 
          img{
            width: 20px;
          }
        }

      }
    }
    .listBox{
      margin-top: 10px;
      font-size: 14px;
      border:0px ;
      .mint-cell-wrapper{
        background-image: none;
      }
      .jtIcon{
        width: 14px;
        height: 14px;
      }
      .imgInp{
        width: 80px;
        height: 60px;
        position: absolute;
        opacity: 0;
        border: 1px solid red;
      }
    }
    .exit_btn{
      width: 100%;
      height: 45px;
      text-align: center;
      color: red;
      line-height: 45px;
      background: #fff;
      margin-top: 10px;
    }
  }
</style>



