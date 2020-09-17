<template>
    <div class="my_title">
      <mt-header :title="title">
        <mt-button icon="back" slot="left" @click="GoBack"></mt-button>
          <div class="headerRight" slot="right">
          <img v-if="titleObj&&titleObj.iconUrl" :src="titleObj.iconUrl" style="width: 25px;height: 25px;margin-right: 10px" @click="handleRight(titleObj.iconUrl)">
          <mt-button v-if="showRight" :icon="titleObj.icon" slot="right" @click="handleRight('')">{{titleObj.rightText}}</mt-button>
        </div>
        
      </mt-header>
    </div>
</template>
<script>
export default {
  data() {
    return {
  
    };
  },
  props: ["title","showRight","isNotRoute","titleObj","whetherNotParent"],
  methods: {
    GoBack(){
      let _this=this;    
      console.log("go back")
      //window['gsmdp'].showToast({title: 'Go back'})
      if(_this.isNotRoute){
        _this.$emit("close")
      }else{
        
        if(_this.$isAndroid()){
          if(this.whetherNotParent){
            // window['dsBridge'].register('GoBack', function (ret) {
            //   return useHtml;
            // })
            //alert("close")
            window['app'].closePage()
          }else{
             _this.$router.go(-1)
          }
        }else{
           _this.$router.go(-1)
        }
        
      }
      //_this.$isAndroid()
    },
    handleRight(_url){
      this.$emit("handleRight",_url)
    },
    gother() {
      if(this.title.flag){
        this.$router.push("/other"); //其他区域
      }
    }
  },mounted:function () {
    window.GoBack = this.GoBack;//返回
    let _this=this;
    window['dsBridge'].register('GoBack', function (ret) {
      _this.GoBack();
    })
  }
};
</script>
<style scoped>
.my_title .mint-header {
  height: 60px;
  background: #5d944a;
  font-size: 18px;
  padding-top: 15px !important;
}
.my_title .headerRight {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /*width: 66px;*/
  }
</style>
