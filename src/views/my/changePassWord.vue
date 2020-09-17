<template>
    <div id="changeInformation">
      <!--头部-->
      <mytitle title="修改密码" :showRight="true" :titleObj="{icon:'',rightText:'保存'}" :isNotRoute="true" @close="GoBack"  @handleRight="saveNewPassWord" ></mytitle>
      <!-- <div class="addGroupTop">
        <div class="addGroup_back" @click="GoBack"></div>
          <span id="titleSpan">修改密码</span>
          <span style="float:right;" @click="saveNewPassWord">保存</span>
        </div> -->
      <!-- <input type="password" class="inp" placeholder="请输入原密码" v-model="oldPassWord"> -->
      <input type="password" class="inp" placeholder="请输入新密码" v-model="newPassWord">
      <input type="password" class="inp" placeholder="再次输入新密码" v-model="checkPassWord">
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import mytitle from "../common/mytitle.vue";
  import editMineInfo from '../../assets/server/editMineInfo.js';
  @Component({
    name:'changeInformation',
    components:{mytitle}
  })
    export default class changeInformation extends Vue{
        private name= "changeInformation";
        private oldPassWord= "";
        private newPassWord= "";
        private checkPassWord= "";
        private userID = this.$store.state.userInfo.userId;
        private created(){
          this.$enJsBack(true)//true 为使用h5返回操作 false为使用android原生
        }
        private GoBack(){
          this.$emit('close');
        }
        private saveNewPassWord(){
          // if(this.oldPassWord == ""){
          //    (this as any).$toast({ message: '请输入原密码!', position: 'middle', duration: 3000 });
          //     return;
          // }
          if(this.newPassWord == ""){
             (this as any).$toast({ message: '请输入新密码!', position: 'middle', duration: 3000 });
              return;
          }
          if(this.checkPassWord == ""){
             (this as any).$toast({ message: '请再次新密码!', position: 'middle', duration: 3000 });
              return;
          }
          if(this.checkPassWord != this.newPassWord){
             (this as any).$toast({ message: '两次输入的新密码不一致!', position: 'middle', duration: 3000 });
              return;
          }
          let that = this;
          return new Promise(function(resolve, reject) {
            let para={
              "newPassword":that.newPassWord,
              "userId": that.userID
            };
            editMineInfo
            .editMineInfo(para)
            .then(function(response) {
              if(response.status ==200){
                (that as any).$toast({ message: '修改成功', position: 'bottom', duration: 1000 });
                that.GoBack();
              }
            })
            .catch(function(error) {
              (that as any).$toast({ message: '修改失败', position: 'bottom', duration: 3000 });
              reject(error);
            });
          });
        }
    }
</script>

<style scoped lang="scss">
  #changeInformation{
    width: 100vw;
    .sexRadio{
      margin-top: 20px;
    }
    .inp{
      width: 80%;
      border: none;
      border-bottom: 1px solid #a7a7a7;
      display: block;
      font-size: 14px;
      margin: 20px auto;
      background-color: #fafafa;
      padding: 10px 0;
    }
  }
  .addGroupTop {
    width: 100%;
    height: 60px;
    background: url('../../assets/images/dataTitle.png') no-repeat 50% center;
    background-size: 100% 100%;
    line-height: 60px;
    font-size: 18px;
    color: #fff;
    padding: 0 15px 0 50px;
    .addGroup_back {
      width: 30px;
      height: 26px;
      background: url('../../assets/images/whiteBack.png') no-repeat 50% center;
      background-size: 100% 100%;
      position: absolute;
      top: 18px;
      left: 12px;
    }
  }
  #titleSpan{
    width: calc(100% - 36px);
    display: block;
    text-align: center;
    float: left;
  }
</style>