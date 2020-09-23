<template>
  <div id="app">
    <!-- 合并到master -->
    <!-- keep-alive 页面缓存组件 -->
    <!--<keep-alive :include="['Sticky', 'Home']">-->
    <router-view></router-view>
    <!--</keep-alive>-->
  </div>
</template>

<style lang="scss">
@import './assets/styles/index.scss'; // 全局自定义的css样式
</style>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
// import Home from '@/view/cubedemo/home.vue';
@Component
export default class App extends Vue {
  beforeCreate() {}
  created() {
    let _this=this;
    
  }
  private setUserObj(resultObj){
    if(resultObj.IP){
      window['g'].IP=resultObj.IP;
      console.log("IP setObj==>"+window['g'].IP)
    }
    //console.log(resultObj)
    // let loginObj=resultObj.loginSystemInfo;
    // console.log(loginObj)
    // this.$store.commit('SET_USER_INFO', loginObj);
  } 
  mounted() {

  }
}
</script>