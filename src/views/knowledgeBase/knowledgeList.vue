<template>
  <div class="knowledgeList-img">
    <!--头部-->
    <!-- <mt-header :title="msg">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <mytitle :title="msg" :showRight="false" :titleObj="{icon:'search'}" :whetherNotParent="true" ></mytitle>
    <ul>
      <li class="imgUrl" v-for="(item,index) in arr" @click="clickFun(index)" :key="index">
        <span class="text">{{item.name}}</span>
        <img :src="item.src" alt>
        <span class="img-mask"></span>
      </li>
    </ul>
    <!-- <footer>
        <span class="FullScreen">全屏显示</span>
    </footer>-->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import mytitle from "../common/mytitle.vue";
//导入图片
// import list1 from '../../assets/images/knowledgeList/list1.jpg';
// import list2 from '../../assets/images/knowledgeList/list2.jpg';
// import list3 from '../../assets/images/knowledgeList/list3.jpg';
// import list4 from '../../assets/images/knowledgeList/list4.jpg';
@Component({
  name: 'knowledgeList',
  components:{mytitle}
})
export default class knowledgeList extends Vue {
  // 企业数据
  private msg = '知识库';
  public arr = [
    { name: '应急预案', src: require('../../assets/images/knowledgeList/plan.jpg') }, //src/assets/images/knowledgeList/list1.jpg
    { name: '知识', src: require('../../assets/images/knowledgeList/know.jpg') },
    { name: '法律法规', src: require('../../assets/images/knowledgeList/law.jpg') },
    { name: '案例', src: require('../../assets/images/knowledgeList/case.jpg') }
  ];
  // private flag = -1;
  public txt = ''; // 点击li获取的值
  public clickFun(index) {
    if (index == 0) {
      this.$router.push({ path: '/ContingencyPlan' });
    } else if (index == 1) {
      this.$router.push({ path: '/KnowledgeListDetail' });
    } else if (index == 2) {
      this.$router.push({ path: '/Lawlist' });
    } else if (index == 3) {
      this.$router.push({ path: '/Caselist' });
    }
  }
  private created() {
    this.$store.dispatch('plan', '');
    this.$store.dispatch('law', '');
    this.$enJsBack(false)//true 为使用h5返回操作 false为使用android原生
  }
}
</script>

<style scoped lang="scss">
.knowledgeList-img {
  height: 100%;
}
ul {
  margin-bottom: 30px;
  .imgUrl {
    width: 100%;
    height: 140px;
    margin: 10px 5px;
    img {
      width: 97%;
      height: 130px;
    }
    .img-mask {
      display: block;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      width: 97%;
      height: 130px;
      margin-right: 5px;
    }
    .text {
      font-size: 20px;
      color: #fff;
      position: absolute;
      left: 40%;
      top: 16%;
      z-index: 3;
    }
  }
  :nth-child(1) .img-mask {
    top: 70px;
  }
  :nth-child(2) .img-mask {
    top: 220px;
  }
  :nth-child(3) .img-mask {
    top: 370px;
  }
  :nth-child(4) .img-mask {
    top: 520px;
  }
  :nth-child(1) .text {
    top: 130px;
  }
  :nth-child(2) .text {
    top: 275px;
    left: 47.33333vw;
  }
  :nth-child(3) .text {
    top: 425px;
  }
  :nth-child(4) .text {
    top: 575px;
    left: 47.33333vw;
  }
}

footer {
  width: 100%;
  height: 60px;
  background: #1d120e;
  // margin: 10px 5px;
  .FullScreen {
    text-align: center;
    line-height: 60px;
    color: #ccc;
    font-size: 16px;
    width: 100%;
    display: block;
  }
}
</style>