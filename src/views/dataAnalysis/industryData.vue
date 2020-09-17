<template>
  <div id="industryData">
    <DataFirstTitle></DataFirstTitle>
    <div class="dataSecond_title">
      <router-link
        to="/industryData/collieryIndustry"
        class="dataSecond_checkBtn"
        active-class="dataSecond_activity"
      >煤矿行业</router-link>
      <router-link
        to="/industryData/dangerData"
        class="dataSecond_checkBtn"
        active-class="dataSecond_activity"
      >危化行业</router-link>
      <router-link
        to="/industryData/nonCoalMine"
        class="dataSecond_checkBtn"
        active-class="dataSecond_activity"
      >非煤矿山</router-link>
       <router-link
        to="/industryData/lifeLine"
        class="dataSecond_checkBtn"
        active-class="dataSecond_activity"
      >生命线</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import DataFirstTitle from './dataCommon/dataFirstTitle.vue';

@Component({
  name: 'industryData',
  components: {
    DataFirstTitle
  }
})

export default class industryData extends Vue {}

</script>

<style lang="scss" scoped>
.dataSecond_title {
  width: 100%;
  height: 40px;
  padding-top: 0.1px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0 0 20px;
  background: #fff;
}
.dataSecond_checkBtn {
  height: 40px;
  text-align: center;
  float: left;
  line-height: 40px;
  font-size: 16px;
  color: #000;
}
.dataSecond_activity {
  border-bottom: 2px solid #6fa55b;
  padding-bottom: 5px;
  color: #6fa55b;
}
</style>
