<template>
    <div id="changeInformation">
      <!--头部-->
      <mytitle :title="title" :showRight="true" :titleObj="{icon:'',rightText:'保存'}" :isNotRoute="true" @close="GoBack"  @handleRight="saveInfo" ></mytitle>
      <input  type="text" class="inp" :placeholder= "placeholder" v-model="infoStr">
    </div>
</template>

<script lang="ts">
  import {Vue, Component,Prop} from 'vue-property-decorator'
  import mytitle from "../common/mytitle.vue";
  import editMineInfo from '../../assets/server/editMineInfo.js';
  @Component({
    name:'changeInformation',
    components:{mytitle}
  })
    export default class changeInformation extends Vue{
        @Prop(String) readonly changeType: any | undefined;
        @Prop(String) readonly info: any | undefined;
        private name= "changeInformation";
        private title = "";
        private placeholder = "";
        private parentType = '';
        private infoStr = "";
        private userID = this.$store.state.userInfo.userId;
        private created(){
          //this.userID = this.$store.state.userInfo.role.userId;
          this.parentType = this['changeType'];
          this.infoStr = this['info'];
          if(this.parentType == "name"){
            this.title = "修改姓名";
            this.placeholder = "请输入姓名";
          }else if(this.parentType == "tel"){
            this.title = "修改联系方式";
            this.placeholder = "请输入联系方式";
          }else{
            this.title = "修改备注";
            this.placeholder = "请输入备注";
          }
        }
        

        private saveInfo(){
         let that = this;
          return new Promise(function(resolve, reject) {
          let para;
          if(that.parentType == "name"){
            para={
              //名称
              "name":that.infoStr,
              "userId": that.userID
            };
          }else if(that.parentType == "tel"){
            para={
              //联系方式
              "telephone":that.infoStr,
              "userId": that.userID
            };
          }else{
            para={
              //备注
              "name":that.infoStr,
              "userId": that.userID
            };
          }
            
            editMineInfo
            .editMineInfo(para)
            .then(function(response) {
              console.log(response.data.status);
              console.log(response.status);
              if(response.data.status ==200){
                (that as any).$toast({ message: '修改成功', position: 'bottom', duration: 1000 });
                that.$emit('close',that.infoStr);
                
              }
            })
            .catch(function(error) {
              (that as any).$toast({ message: '修改失败', position: 'bottom', duration: 1000 });
              reject(error);
            });
          });
      }
      private GoBack(){
          this.$emit('close');
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
</style>