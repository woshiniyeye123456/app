<template>
  <div id="dataFirst">
    <div class="dataFirst_title">
      <div class="dataFirst_back" @click="GoBack"></div>
      <div class="dataFirst_check">
        <!-- <div class="dataFirst_checkBtn" v-for="(item,index) in dataList" :key="index">
          <span  :class="{dataFirst_activity : $store.state.dataFirstPage==index}"
            @click="goToPage(1, '/industryData')"
          >{{item.name}}</span>
        </div> -->
        <div class="dataFirst_checkBtn"   v-if="dataList.length>1" >
          <span  :class="{dataFirst_activity : $store.state.dataFirstPage==1}"
            @click="goToPage(1, '/industryData')"
          >行业数据</span>
        </div>
        <div class="dataFirst_checkBtn" :class="{dataFirst_checkBtn_all : dataList.length<=1}">
          <span
            class
            :class="{dataFirst_activity : $store.state.dataFirstPage==2}" 
            @click="goToPage(2, '/enterpriseData')"
          >企业数据</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'firstTitle'
})
export default class firstTitle extends Vue {
  private dataList =[];
  private created() {
    console.log("menus list")
    let menusArr=this.$GetMenusByKey(this.$store.state.gauthMenuArr,'data_analysis')
    this.dataList=menusArr;
    console.log("dataList==>"+JSON.stringify(this.dataList))
    let currentPage = this.$route.fullPath;
    if(this.dataList.length<=1){
      this.goToPage(2,"/enterpriseData")
    }
    this.$enJsBack(false)//true 为使用h5返回操作 false为使用android原生
    console.log("firstTitle===>")
    switch (currentPage) {
      case '/industryData':
        this.$store.state.dataFirstPage = 1;
        break;
      case '/industryData/collieryIndustry':
        this.$store.state.dataFirstPage = 1;
        break;
      case '/industryData/collieryIndustry':
        this.$store.state.dataFirstPage = 1;
        break;
      case '/industryData/collieryIndustry':
        this.$store.state.dataFirstPage = 1;
        break;
      case '/enterpriseData':
        this.$store.state.dataFirstPage = 2;
        break;
    }
    
  }
  private mounted(){
    console.log("load success")
    window['GoBack']=this.GoBack;
  }
  // 行业数据和企业数据切换
  private goToPage(type, page) {
    this.$store.state.dataFirstPage = type;
    this.$router.push({ path: page });
  }
  private GoBack(){
    let _this=this;    
    console.log("go back");
    _this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>
#dataFirst {
  .dataFirst_title {
    width: 100%;
    height: 65px;
    background: url('../../../assets/images/dataTitle.png') no-repeat 50% center;
    background-size: 100% 100%;
    position: relative;
    padding-top: 12px;
  }
  .dataFirst_back {
    width: 30px;
    height: 26px;
    background: url('../../../assets/images/whiteBack.png') no-repeat 50% center;
    background-size: 100% 100%;
    position: absolute;
    top: 30px;
    left: 12px;
  }
  .dataFirst_check {
    width: 200px;
    height: 40px;
    margin: 10px auto;
  }
  .dataFirst_checkBtn {
    width: 40%;
    height: 40px;
    text-align: center;
    margin: 0 5%;
    float: left;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
  }
  .dataFirst_checkBtn_all{
    width: 100%;
  }
  .dataFirst_activity {
    color: #fff757;
    border-bottom: 2px solid #fff757;
    padding-bottom: 5px;
  }
}
</style>
