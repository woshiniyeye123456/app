<template>
  <div id="EnterpriseList">
    <!--头部-->
    <mytitle :title="msg" :showRight="true" :titleObj="{icon:'search'}" :whetherNotParent="true" @handleRight="search"></mytitle>
    <!-- <mt-search v-model="value" :result.sync="result"></mt-search> -->
    <!-- 下拉列表选项 -->
    <div class="selects">
      <div id="0" @click="selectFn(0)">
        <span>{{ administrative }}</span>
        <span :class="type == 0 ? openimg : closeimg"></span>
        <transition name="fade">
          <ul v-show="type == 0 ? true : false" class="filter_li">
            <li
              v-for="(item, index) in administrativeArr"
              :Key="index"
              :class="{ actives: index == adminIndex }"
              @click="selectEvent(0, item.name, item.code, index)">
              {{ item.name
              }}
            </li>
          </ul>
        </transition>
      </div>
      <div id="1" @click="selectFn(1)">
        <span>{{ industry }}</span>
        <span :class="type == 1 ? openimg : closeimg"></span>
        <transition name="fade">
          <ul v-show="type == 1 ? true : false" class="filter_li">
            <li
              v-for="(item, index) in industryArr"
              :Key="index"
              :class="{ actives: index == indIndex }"
              @click="selectEvent(1, item.name, item.code, index)"
            >
              {{ item.name
              }}
            </li>
          </ul>
        </transition>
      </div>
      <div id="2" @click="selectFn(2)">
        <span>{{ state }}</span>
        <span :class="type == 2 ? openimg : closeimg"></span>
        <transition name="fade">
          <ul v-show="type == 2 ? true : false" class="filter_li">
            <li
              v-for="(item, index) in statusArr"
              :Key="index"
              :class="{ actives: index == staIndex }"
              @click="selectEvent(2, item.name, item.code, index)"
            >
              {{ item.name
              }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <!-- 列表内容 -->
    <div class="mask" v-show="mask" @click="hide_select"></div>
    <div class="list_box">
      <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight }">
        <mt-spinner
          type="fading-circle"
          v-show="listArr.length <1 && InitialLoading"
          color="#26a2ff"
          class="center"
        ></mt-spinner>
        <mt-loadmore
          :top-method="loadTop"
          @top-status-change="handleTopChange"
          :bottom-method="loadBottom"
          @bottom-status-change="handleBottomChange"
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          ref="loadmore"
        >
          <!-- 单个 -->
          <ul
            class="list_item"
            v-for="(item, index) in listArr"
            :Key="index"
            @click="details(item.enterpId, item.industryCode)"
          >
            <li>
              <img src="../../assets/images/enterprise.png" alt>
              <div>
                <p>{{ item.enterpName }}</p>
                <p v-if="item.statusName">{{ item.statusName }}</p>
              </div>
            </li>
            <li>
              <div class="left">地址 ：</div>
              <div class="right">{{ item.address }}</div>
            </li>
            <li>
              电话 ：{{ item.tel }}
              <span class="standardLevel">标准化等级 ：{{ item.standardlevel }}</span>
            </li>
            <li>行业 ：{{ item.industryName }}</li>
          </ul>
          <!-- 无数据状态 -->
          <div v-show="listArr.length <1 && InitialLoading == false" class="list_item_empty">暂无数据</div>
          <!-- 模拟数据 -->
          <!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
          <div slot="top" class="mint-loadmore-top" style="text-align:center">
            <span
              v-show="topStatus !== 'loading'"
              :class="{ 'is-rotate':
              topStatus === 'drop' }"
            >↓</span>
            <mt-spinner type="fading-circle" v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
          </div>
          <div v-if="allLoaded && firstRender" style="text-align:center;" class="data-none">没有更多数据了</div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span
              v-show="bottomStatus !== 'loading' && bottom"
              :class="{ 'is-rotate': bottomStatus === 'drop' }"
            >↑</span>
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="fading-circle" v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
            </span>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <!-- --------------------------------------------------------------------------------- -->
  </div>
</template>

<script lang="ts">

import mytitle from "../common/mytitle.vue";
import { setTimeout } from 'timers';
import { Vue, Component } from 'vue-property-decorator';
import enterprise from '../../assets/server/enterprise_index.js';
import axios from 'axios';
const enterpriseListData = require('../../../public/json/enterprise/enterpriseList.json');

@Component({
  name: 'EnterpriseList',
  components:{mytitle}
})
export default class EnterpriseList extends Vue {
  // 上拉刷新下拉加载
  private pageNum = 1; //页码
  private firstRender = true;
  private InitialLoading = true; //初始加载
  private list = 0; //数据
  private allLoaded = false; //数据是否加载完毕
  private bottomStatus = ''; //底部上拉加载状态
  private wrapperHeight = "100%"; //容器高度
  private topStatus = ''; //顶部下拉加载状态
  private bottom = true;
  private mask = false;
  // 企业数据
  private msg = '企业列表';
  private administrative = '行政区划';
  private admincode = '';
  private adminIndex = -1;
  private type = 3;
  private industry = '行业';
  private indIndex = -1;
  private indcode = '';
  private state = '企业状态';
  private staIndex = -1;
  private stacode = '';
  private openimg = 'openArrow';
  private closeimg = 'closeArrow';
  // 模拟数据
  //乡政区划 ...

  private administrativeArr = [
  ];
  //行业
  private industryArr = [
    {
      code: '01',
      name: '煤矿'
    },
    {
      code: '02',
      name: '危化行业'
    },
    {
      code: '03',
      name: '非煤矿山'
    },
    {
      code: '04',
      name: '民爆'
    },
    {
      code: '05',
      name: '烟花爆竹'
    }
  ];
  // 企业状态
  private statusArr = [
    {
      code: '01',
      name: '正常'
    },
    {
      code: '02',
      name: '建设中'
    },
    {
      code: '03',
      name: '停工停产'
    }
  ];
  //list
  private listArr = [
    {
      entShort: '任楼煤矿11113',
      enterpId: '340600080001001',
      enterpName: '安徽恒源煤电股份有限公司任楼煤矿',
      address: '北京辰安科技',
      tel: '13666666666',
      industryCode: '01',
      industryName: '煤矿',
      standardlevel: '二级',
      districtsCode: '02',
      statusCode: '1',
      statusName: ''
    },
    {
      entShort: '企业01',
      enterpId: '340600080001001',
      enterpName: '危化企业01啊',
      address: '生产经营地址',
      tel: '13777777777',
      industryCode: '化工',
      industryName: '',
      standardlevel: '二级',
      districtsCode: '01',
      statusCode: '02',
      statusName: '建设中'
    },
    {
      entShort: '危化企业2',
      enterpId: '2c91fae86e1c0a5b016e2076e80e0002',
      enterpName: '危化企业2',
      address: '俺的功夫的',
      tel: '',
      industryCode: '危化企业',
      industryName: '',
      standardlevel: '',
      districtsCode: '04',
      statusCode: '1',
      statusName: ''
    },
    {
      entShort: 'adfdf',
      enterpId: '340600080002003',
      enterpName: '淮北宝相气体有限公司',
      address: '危险化工测试111',
      tel: '',
      industryCode: '02',
      industryName: '危化行业',
      standardlevel: '',
      districtsCode: '03',
      statusCode: '1',
      statusName: ''
    },
    {
      entShort: '危化企业01',
      enterpId: '340600080002002',
      enterpName: '安徽卓泰化工科技有限公司',
      address: '123',
      tel: '',
      industryCode: '02',
      industryName: '危化行业',
      standardlevel: '',
      districtsCode: '01',
      statusCode: '1',
      statusName: ''
    },
    {
      entShort: '危化企业001',
      enterpId: '340600080002001',
      enterpName: '临涣焦化股份有限公司',
      address: '阿萨德 ',
      tel: '',
      industryCode: '02',
      industryName: '危化行业',
      standardlevel: '',
      districtsCode: '01',
      statusCode: '1',
      statusName: ''
    },
    {
      entShort: '啊',
      enterpId: '2c91faba6dddb9ef016ddde27fab001a',
      enterpName: '非煤6',
      address: '1',
      tel: '13666666666',
      industryCode: '01',
      industryName: '煤矿',
      standardlevel: '一级',
      districtsCode: '01',
      statusCode: '1',
      statusName: ''
    },
    {
      entShort: '11',
      enterpId: '2c91faba6ded8bc3016df0e52e420001',
      enterpName: '22',
      address: '111',
      tel: '13611111111',
      industryCode: '02',
      industryName: '危化行业',
      standardlevel: '二级',
      districtsCode: '02',
      statusCode: '1',
      statusName: ''
    },
    {
      entShort: '88',
      enterpId: '2c91faba6df2dd2e016df628a54d0003',
      enterpName: '88',
      address: '88',
      tel: '13611111111',
      industryCode: '01',
      industryName: '煤矿',
      standardlevel: '二级',
      districtsCode: '01',
      statusCode: '1',
      statusName: ''
    },
    {
      entShort: '12',
      enterpId: '2c91faba6df2dd2e016df62a07310008',
      enterpName: '99',
      address: '1',
      tel: '13611111111',
      industryCode: '01',
      industryName: '煤矿',
      standardlevel: '一级',
      districtsCode: '01',
      statusCode: '1',
      statusName: ''
    }
  ];

  private selectFn(index) {
    if (this.type == index) {
      this.type = 4;
      this.mask = false;
    } else {
      this.type = index;
      this.mask = true;
    }
  }
  private checkCancel(listArr,valueStr){
    let flag=false;
    //debugger
    listArr.forEach((item,index)=>{
      if(item.name==valueStr){
        flag=true;
      }
    })
    if(!flag){
      listArr.push({code:"",name:valueStr})
    }
  }
  private selectEvent(id, data, code, index) {
    console.log(data);
    if (id == 0) {
      if (data == '取消选择') {
        this.administrative="行政区划"
        this.administrativeArr.splice(this.administrativeArr.length - 1, 1);
      } else {
        this.administrative = data;
        this.checkCancel(this.administrativeArr,'取消选择');
      }
      this.adminIndex = index;
      this.admincode = code;
    } else if (id == 1) {
      if (data == '取消选择') {
        this.industry = '行业';
        this.industryArr.splice(this.industry.length - 1, 1);
      } else {
        this.industry = data;
        this.checkCancel(this.industryArr,'取消选择');
      }
      this.indIndex = index;
      this.indcode = code;
    } else {
      if (data == '取消选择') {
        this.state = '企业状态';
        this.statusArr.splice(this.state.length - 1, 1);
      } else {
        this.state = data;
        this.checkCancel(this.statusArr,'取消选择');
      }
      this.staIndex = index;
      this.stacode = code;
    }
    this.loadTop();
  }
  //点击遮罩
  private hide_select() {
    this.type = 3;
    this.mask = false;
  }
  //后台数据交互
  // 企业列表数据
  private interactiveList() {
    let that = this;

    let parma = {
      industrycode: this.indcode,
      districtsCode: this.admincode,
      statusCode: this.stacode,
      keyword: '',
      pageNo: this.pageNum,
      orgCode:this.$store.state.userInfo.orgCode,
      userId:this.$store.state.userInfo.userId,
      pageSize: 10
    };
    console.log(parma);
    // return new Promise(function(resolve, reject) {
    //   enterprise
    //     .enterpriseList(parma,that)
    //     .then(function(response) {
    //       debugger
    //       if (response.data) {
    //         // console.log(response);
    //         if (that.pageNum == 1) {
    //           //每次更新筛选数据  置顶
    //           that.listArr = [];
    //           setTimeout(() => {
    //             // that.listArr = response.data.data;
    //             that.listArr = response.data.data.getEnterpriseList;
    //           }, 100);
    //           if (response.data.data.getEnterpriseList.length < 10 &&response.data.data.getEnterpriseList.length > 0) {
    //             that.allLoaded = true;
    //             that.firstRender = true;
    //             that.bottom = false;
    //           } else if (response.data.data.getEnterpriseList.length == 0) {
    //             that.bottom = false;
    //             that.firstRender = false;
    //           }
    //         } else {
    //           that.listArr = [...that.listArr, ...response.data.data.getEnterpriseList];
    //           that.firstRender = true;
    //         }
    //         //模拟数据加载完毕 禁用上拉加载
    //         that.allLoaded = response.data.data.getEnterpriseList.length < 10 ? true : false;
    //       }
    //       // console.log(that.listArr)
    //       resolve();
    //     })
    //     .catch(function(error) {
    //       reject(error);
    //     });
    // });
    
    that.listArr = enterpriseListData.data.getEnterpriseList;
  }
  // 行政区域
  private interactiveListDistricts() {
    let that = this;
    let parma = {};
    // return new Promise(function(resolve, reject) {
    //   enterprise
    //     .districts(parma)
    //     .then(function(response) {
    //       if (response.data.data) {
    //         console.log(response);
    //         // that.administrativeArr = response.data.data;
    //         // 中卫演示数据
    //         that.administrativeArr = response.data.data.getDistricts;
    //       }
    //       resolve();
    //     })
    //     .catch(function(error) {
    //       reject(error);
    //     });
    // });
    that.administrativeArr = enterpriseListData.data.getDistricts;
  }
  //行业
  private interactiveIndustry() {
    let that = this;
    let parma = {};
    // return new Promise(function(resolve, reject) {
    //   enterprise
    //     .industry()
    //     .then(function(response) {
    //       if (response.data.data) {
    //         // that.industryArr = response.data.data;
    //         // 中卫演示数据
    //         that.industryArr = response.data.data.getIndustry;
    //       }
    //       resolve();
    //     })
    //     .catch(function(error) {
    //       reject(error);
    //     });
    // });
    that.industryArr = enterpriseListData.data.getIndustry;
  }
  // 企业状态
  private interactiveStatus() {
    let that = this;
    let parma = {};
    // return new Promise(function(resolve, reject) {
    //   enterprise
    //     .enterpriseStatus()
    //     .then(function(response) {
    //       if (response.data.data) {
    //         // that.statusArr = response.data.data;
    //         // 中卫演示数据
    //         that.statusArr = response.data.data.getEnterpriseStatus;
    //       }
    //       resolve();
    //     })
    //     .catch(function(error) {
    //       reject(error);
    //     });
    // });
    that.statusArr = enterpriseListData.data.getEnterpriseStatus;
  }
  // 搜索页
  private search() {
    this.$router.push({
      name: 'enterpriseSearch',
      params: {}
    });
  }
  // 跳转到详情页
  private details(id, code) {
    this.$router.push({
      path: '/enterpriseDetails',
      query: {
        enterpId: id,
        industryCode: code
      }
    });
  }
  // 下拉刷新上拉加载
  private handleBottomChange(status) {
    this.bottomStatus = status;
  }
  private loadBottom() {
    this.handleBottomChange('loading'); //上拉时 改变状态码
    this.pageNum += 1;
    setTimeout(() => {
      //上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
      this.interactiveList();
      this.handleBottomChange('loadingEnd'); //数据加载完毕 修改状态码
      (this.$refs.loadmore as any).onBottomLoaded();
    }, 1000);
  }
  private handleTopChange(status) {
    this.topStatus = status;
  }
  private loadTop() {
    //下拉刷新 模拟数据请求这里为了方便使用一次性定时器
    this.handleTopChange('loading'); //下拉时 改变状态码
    this.pageNum = 1; //页数
    this.allLoaded = false; //下拉刷新时解除上拉加载的禁用
    setTimeout(() => {
      this.handleTopChange('loadingEnd'); //数据加载完毕 修改状态码
      (this.$refs.loadmore as any).onTopLoaded();
      this.interactiveList();
    }, 1000);
  }

  private created() {
    this.interactiveList();
    this.interactiveListDistricts();
    this.interactiveIndustry();
    this.interactiveStatus();
    this.$enJsBack(false)//true 为使用h5返回操作 false为使用android原生
  }
  private mounted() {
    setTimeout(() => {
      //页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
      this.InitialLoading = false;
    }, 1000);
  }
}
</script>

<style scoped lang="scss">

#EnterpriseList {
  width:100%;
  height: 100%;
  background: #fff;
}

.mintui {
  font-size: 20px !important;
}

#EnterpriseList .mint-header {
  height: $headerHeight;
  background: #5d944a;
  font-size: 18px;
}

.page-loadmore-wrapper {
  padding-bottom: 20px;
}

.mint-header-button {
  font-size: 20px !important;
}

.selects {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #eee;
  position: relative;
}

.selects div {
  /* position: relative; */
  font-size: 14px;
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
}

.selects div span:nth-of-type(1) {
  display: inline-block;
  max-width: 100px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selects div .openArrow:nth-of-type(2) {
  display: inline-block;
  width: 20px;
  height: 45px;
  vertical-align: middle;
  background: url('../../assets/images/openArrow.png') no-repeat right;
  background-size: 15px 8px;
  /* background-position: 15px 10px; */
}

.selects div .closeArrow:nth-of-type(2) {
  display: inline-block;
  width: 20px;
  height: 45px;
  vertical-align: middle;
  background: url('../../assets/images/closeArrow.png') no-repeat right;
  background-size: 15px 8px;
  /* background-position: 15px 10px; */
}

.selects div .filterbox,
.selects div .filter_li {
  position: absolute;
  width: 90%;
  top: 55px;
  left: 5%;
  line-height: 25px;
  font-size: 13px;
  background: #fff;
  text-align: center;
  z-index: 10;
  padding: 5px 0;
  border-radius: 10px;
}
.selects div .filter_li li {
  height: 30px;
  line-height: 30px;
}
.filterbox {
  padding: 5px 0;
}

.selects div .filterbox > li {
  width: 100px;
  /* padding: 0 5px; */
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  float: left;
}

.selects div .filterbox > li:nth-of-type(1) {
  width: 30%;
}

.selects div .filterbox > li:nth-of-type(2) {
  width: 70%;
  max-height: 500px;
  overflow-y: auto;
}

.selects div .filterbox .filter_left_child li {
  width: 100%;
  padding: 0 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selects div .filter_left li:active {
  color: red;
}

.actives {
  color: green;
}

.list_box {
  width: 100%;
  height: calc( 100% - #{$headerHeight} - 45px );
  background: #eee;
  overflow: hidden;
  padding-bottom: 20px;
}

.list_item {
  width: 345px;
  min-height: 10px;
  background: #fff;
  border-radius: 10px;
  margin: 10px auto;
  box-shadow: 2px 2px 3px #999;
  padding: 10px 15px;
}

.list_item li {
  font-size: 14px;
  color: #666666;
}

.list_item li:nth-of-type(1) {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #dddddd;
}

.list_item li:nth-of-type(2) {
  margin-top: 3px;
}

.list_item li:nth-of-type(3) {
  height: 25px;
  line-height: 22px;
}

.list_item li:nth-of-type(4) {
  height: 20px;
  line-height: 20px;
}

.list_item_empty {
  width: 345px;
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  background: #fff;
  border-radius: 10px;
  margin: 10px auto;
  box-shadow: 2px 2px 3px #999;
  text-align: center;
}

.mask {
  width: 100%;
  height: 562px;
  position: absolute;
  left: 0;
  top: 105px;
  background: rgba(1, 1, 1, 0.5);
  z-index: 2;
}

.left {
  width: 50px;
  float: left;
  padding: 5px 0;
  line-height: 18px;
}

.right {
  float: left;
  width: 260px;
  padding: 5px 0;
  line-height: 18px;
}

.standardLevel {
  margin-left: 30px;
}

li::before {
  display: block;
  content: '';
  clear: both;
}

.list_item li:nth-of-type(1) div {
  height: 70px;
  width: 300px;
}

.list_item li:nth-of-type(1) div p:nth-of-type(1) {
  padding: 0 15px 0 15px;
  font-size: 16px;
  color: black;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list_item li:nth-of-type(1) div p:nth-of-type(2) {
  font-size: 12px;
  float: left;
  height: 20px;
  color: #fff;
  line-height: 20px;
  padding: 1px 6px;
  background: green;
  margin-left: 15px;
  text-align: center;
}

.list_item li img {
  width: 45px;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #6fa45b;
}

.fade-enter-active,
.fade-leave-active {
  /* transition: opacity 0.7s; */
}

li::after {
  content: '';
  display: block;
  clear: both;
}

.fade-enter,
.fade-leave-active {
  /* opacity: 0; */
}

.page-loadmore-wrapper {
  overflow: scroll;
  z-index: 100;
}

.hot-list {
  padding: 0 8px;
}

.hot-item {
  padding: 10px 0;
}

.hot-one {
  overflow: hidden;
  border-bottom: 1px dashed #ccc;
}

.hot-one a img {
  padding-right: 10px;
}

.hot-item a img {
  width: 135px;
  height: 90px;
}

.fl {
  float: left;
}

.hot-one a h5 {
  margin-top: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 6px;
  font-size: 16px;
  color: #000;
}

.hot-one a p {
  font-size: 12px;
  color: #828282;
  margin: 0 0 3px;
}

.color_e85647 {
  color: #e85647;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

div.hot-list > div:first-child .img-box {
  overflow: hidden;
}

div.hot-list > div:first-child img {
  width: 100%;
  height: auto;
  padding-right: 0;
}

.mint-loadmore .mint-loadmore-content {
  min-height: 572px;
}

.mint-loadmore-top,
.mint-loadmore-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mint-loadmore-top > span,
.mint-loadmore-bottom > span {
  display: flex;
  justify-content: center;
  font-size: 20px;
}

.mint-loadmore-top > span > div {
  border-top-color: #666;
  border-left-color: #666;
  border-bottom-color: #666;
  height: 28px;
  width: 28px;
}

.data-none {
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}

ul:after {
  content: '';
  display: block;
  clear: both;
}
</style>