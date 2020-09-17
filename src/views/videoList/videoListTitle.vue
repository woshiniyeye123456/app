<template>
  <div id="videoListTitle">
    <!--头部-->
    <div class="header_titleBox">
      <mytitle :title="titleText" :showRight="true" :titleObj="{icon:'search'}" :whetherNotParent="true" @handleRight="search"></mytitle>
      <transition name="fade">
        <div class="searchBox" v-if="searchIsShow">
          <div class="searchHeadbox">
            <img @click="searchHide" src="@/assets/images/jiantouZuo.png">
            <input
              @input="searchEvent"
              v-model="inputvalue"
              class="searchInp"
              type="text"
              placeholder="请输入视频关键字"
            >
          </div>
        </div>
      </transition>

      <div class="listTitleBox">
        <span
          v-for="(i,index) in listTitleObj"
          :key="index"
          @click="titleClick(index,i.code)"
          :class="activeDom === index ? 'activeTitle' : 'noActive'"
        >{{i.name}}</span>
      </div>
    </div>
    <ul class="listBox">
      <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight }">
        <mt-spinner
          type="fading-circle"
          v-show="listData.length <1 && InitialLoading"
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
          <div style="min-height:100%;  background: #fff;">
            <li v-for="(i,index) in listData" :key="index" @click="details(i)">
              <img class="videoImg" src="../../assets/images/companyVedio.png">
              <div class="textBox">
                <span>{{i == undefined?"":i.industryEnterpName}}</span>
                <!-- <span>{{i == undefined?"":i.createTime}}</span> -->
                <span>接入路数：{{i == undefined?"":i.videoCount}}</span>
              </div>
              <img class="jtIcon" src="@/assets/images/right_jt.png">
            </li>

            <!-- 无数据状态 -->
            <div v-show="listData.length <1 && InitialLoading == false" class="list_item_empty"></div>
          </div>
          <!-- 模拟数据 -->
          <!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
          <div slot="top" class="mint-loadmore-top" style="text-align:center">
            <span
              v-show="topStatus !== 'loading'"
              :class="{ 'is-rotate':
              topStatus === 'drop' }"
            >↓</span>
            <mt-spinner type="fading-circle" v-show="topStatus == 'loading'" color="#9e9e9e"></mt-spinner>
          </div>
          <div v-if="allLoaded" style="text-align:center;" class="data-none">没有更多数据了</div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span
              v-show="bottomStatus !== 'loading'"
              :class="{ 'is-rotate': bottomStatus === 'drop' }"
            >↑</span>
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="fading-circle" v-show="bottomStatus == 'loading'" color="#9e9e9e"></mt-spinner>
            </span>
          </div>
        </mt-loadmore>
      </div>
      <!-- ----------------------------------------------------------------------- -->
    </ul>
  </div>
</template>

<script lang="ts">
import enterprise from '../../assets/server/enterprise_index.js';
import videoMonitor from '../../assets/server/vedioMonitor.js';
import mytitle from "../common/mytitle.vue";
import { Vue, Component,Watch} from 'vue-property-decorator';
@Component({
  name: 'videoListTitle',
  components:{mytitle}
})
export default class videoListTitle extends Vue {
  @Watch('inputvalue',{immediate:true,deep:true})
  onInputValueChanged(val){
    console.log("现在搜搜的视频是"+val);
    if(val.length>20) this.inputvalue = val.slice(0,19);
    this.searchEvent();
  }
  private name = 'videoListTitle';
  private titleText = '视频列表';
  private selected = '1';
  private pageNo = 1; //页码

  private InitialLoading = true; //初始加载
  private list = 0; //数据
  private allLoaded = false; //数据是否加载完毕
  private bottomStatus = ''; //底部上拉加载状态
  private wrapperHeight = "100%"; //容器高度
  private topStatus = ''; //顶部下拉加载状态
  private mask = false;
  // 行业code
  private code = '01';
  //关键字
  private inputvalue = '';
  private keyword = '';
  private searchIsShow = false;
  private timer = '';
  // 时间
  private dateTimePicker: any;
  private value = '';

  //筛选时间
  private searchTime = '';
  private listTitleObj = [
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
  private activeDom = 0;
  //  private listData = [];
  private listData = [
    
  ];
  private search(_url) {
    if(_url){
      this.showDateTimePicker();
    }else{
      this.searchIsShow = true;
    }
    
  }
  GoBack(){
      let _this=this;    
      console.log("go back")
      if(_this.$isAndroid()){
        //关闭webview
        window['app'].close()
      }else{
        _this.$router.go(-1)
      }
      
      //_this.$isAndroid()
    }
  private titleClick(ind: number, code) {
    //交互
    this.pageNo = 1;
    this.activeDom = ind;
    this.code = code;
    this.videoMonitorLists();
  }
  private searchHide() {
    this.searchIsShow = false;
    this.inputvalue = '';
  }
  //行业
  private interactiveIndustry() {
    let that = this;
    let parma = {};
    return new Promise(function(resolve, reject) {
      enterprise
        .industry()
        .then(function(response) {
          if (response.data.data) {
            console.log(response.data.data);
            that.listTitleObj = response.data.data;
            that.code = response.data.data[0].code;
          }
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
  //视频监控列表
  private videoMonitorLists() {
    let that = this;
    that.allLoaded = false;
    let parma = {
      keyTime: this.searchTime,
      keyWord: this.inputvalue,
      industryCode: this.code,
      orgCode:this.$store.state.userInfo.orgCode,
      userId:this.$store.state.userInfo.userId,
      pageNo: this.pageNo,
      pageSize: 10
    };
    console.log(parma);
    return new Promise(function(resolve, reject) {
      videoMonitor
        .videoMonitorList(parma)
        .then(function(response) {
          if (response.data) {
            //   let arr = response.data.info;
            // if (that.pageNo > 1) {
            //   for (let i = 0; i < 5; i++) {
            //     response.data.info.push(arr[0]);
            //   }
            // } else {
            //   for (let i = 0; i < 9; i++) {
            //     response.data.info.push(arr[0]);
            //   }
            // }
            console.log(response);
            if (that.pageNo == 1) {
              //每次更新筛选数据  置顶

              that.listData = [response.data.info[0], response.data.info[1]];
              setTimeout(() => {
                that.listData = response.data.info;
              }, 100);
            } else {
              that.listData = [...that.listData, ...response.data.info];
              that.allLoaded = response.data.info.length < 10 ? true : false;
            }
          }
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
  //阻止浏览器冒泡事件
  private retClick(e) {
    e.stopPropagation();
  }
  //实时搜索
  private searchEvent() {
    this.clearTimer();
    if (this.inputvalue.length >= 0) {
      //获取当前延时函数的ID，便于后面clearTimeout清除该ID对应的延迟函数
      (this as any).timer = setTimeout(() => {
        let test = new RegExp('[^a-zA-Z0-9_\u4e00-\u9fa5]', 'i');
        console.log(this.inputvalue);
        if (test.test(this.inputvalue) == true) {
          (this as any).$toast({ message: '搜索内容含有非法字符!', position: 'middle', duration: 3000 });
          this.inputvalue = '';
          return false;
        } else {
          this.videoMonitorLists();
        }
      }, 500);
    } else {
      setTimeout(() => {});
    }
  }
  private clearTimer() {
    if (this.timer) {
      clearTimeout((this as any).timer);
    }
  }
  //跳转详情
  private details(data) {
    console.log(data);
    //本地保存
    this.$store.dispatch('video_deta', data);
    this.$router.push({
      path: 'videoDetails',
      query: {
        data: data
      }
    });
  }
  //时间选择器
  private showDateTimePicker() {
    if (!this.dateTimePicker) {
      this.dateTimePicker = this.$createDatePicker({
        title: '请选择时间',
        min: new Date(2019, 7, 8, 8, 0, 0, 0),
        max: new Date(2025, 9, 20, 20, 59, 59, 59),
        value: new Date(),
        columnCount: 6,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      });
    }
    this.dateTimePicker.show();
  }
  private selectHandle(date, selectedVal, selectedText) {
    console.log(date);
    console.log(selectedVal);
    console.log(selectedText);
    this.searchTime =
      selectedText[0] +
      '-' +
      selectedText[1] +
      '-' +
      selectedText[2] +
      ' ' +
      selectedText[3] +
      ':' +
      selectedText[4] +
      ':' +
      selectedText[5];
    this.videoMonitorLists();
  }
  private cancelHandle() {
    this.$createToast({
      type: 'correct',
      txt: '已取消日期选择',
      time: 1000
    }).show();
  }
  private created() {
    // this.videoMonitorLists();
    this.interactiveIndustry().then(() => {
      this.videoMonitorLists();
    });
    this.$enJsBack(false)//true 为使用h5返回操作 false为使用android原生
  }
  // 下拉刷新上拉加载
  private handleBottomChange(status) {
    this.bottomStatus = status;
  }
  private loadBottom() {
    this.handleBottomChange('loading'); //上拉时 改变状态码
    this.pageNo += 1;
    setTimeout(() => {
      //上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
      //调接口
      this.videoMonitorLists();
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
    this.pageNo = 1; //页数
    this.allLoaded = false; //下拉刷新时解除上拉加载的禁用
    setTimeout(() => {
      this.handleTopChange('loadingEnd'); //数据加载完毕 修改状态码
      (this.$refs.loadmore as any).onTopLoaded();
      //调接口
      this.videoMonitorLists();
    }, 1000);
  }
  private mounted() {
    setTimeout(() => {
      //页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
      this.InitialLoading = false;
    }, 2000);
    window['GoBack']=this.GoBack;
  }
}
</script>

<style scoped lang="scss">
#videoListTitle {
  width: 100vw;
  height: 100%;
  padding-top: 100px;
  .header_titleBox {
    width: 100vw;
    height: auto;
    position: fixed;
    top: 0px;
    .searchBox {
      width: 100vw;
      height: $headerHeight;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      position: fixed;
      top: 0;
      background-color: rgba(1, 1, 1, 0.4);
      z-index: 999999;
      .searchHeadbox {
        width: 100vw;
        height: $headerHeight;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 0px 10px;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        .searchInp {
          margin-left: 10px;
          width: 100%;
          height: 100%;
          padding: 10px 0px;
          outline: none;
        }
      }
    }
    .mint-header-button.is-right {
      width: 88px;
    }
    .headerRight {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      /*width: 66px;*/
    }
    .listTitleBox {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #fff;
    }
    .activeTitle {
      border-bottom: 0.53333vw solid #6fa55b;
      padding-bottom: 1.33333vw;
      color: #6fa55b;
    }
    .noActive {
      color: #9e9e9e;
    }
  }
  .listBox {
    width: 100%;
    height: calc( 100% );
    background: #eee;
    overflow: hidden;
    padding-bottom: 20px;
    border-top: 1px solid #ddd;
    li {
      width: 90%;
      height: 84px;
      margin: 0 15px;
      border-bottom: 1px solid #9e9e9e;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .videoImg {
        width: 56px;
        height: 56px;
        border-radius: 10px;
      }
      .jtIcon {
        width: 14px;
        height: 14px;
      }
      .textBox {
        flex: 1;
        width: calc( 100% - 80px - 14px );
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0px 12px;
        span {
          display: inline-block;
          height: 25px;
          width: 100%;
          line-height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
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
  min-height: 100%;
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
  font-size: 14px;
  color: #999;
}

ul:after {
  content: '';
  display: block;
  clear: both;
}
</style>