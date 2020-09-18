<template>
  <div id="contingency-plan" style="height:100%">
    <!--头部-->
    
    <mytitle :title="msg" :showRight="false" :titleObj="{icon:'more'}" :whetherNotParent="false"></mytitle>
    <div @click="search">
      <mt-search v-model.trim="value" placeholder="搜索" cancel-text></mt-search>
    </div>

    <el-radio-group v-model="direction" style="display:none">
      <el-radio label="rtl"></el-radio>
    </el-radio-group>

    <el-drawer :visible.sync="drawer" :direction="direction">
      <div class="typesearch">
        <p>事故类型</p>
        <ul>
          <li
            v-for="(item,index) in typeArr"
            :key="index"
            :class="{ gray_active: index == index1 }"
            @click="index1 == index?index1 =-1:index1 = index;
            index1 == index?code='':code=item.code"
          >{{item.name}}</li>
        </ul>
        <div>
          <span @click="reset">重置</span>
          <span @click="determine">确认</span>
        </div>
      </div>
    </el-drawer>
    <!-- 下拉列表选项 -->
      <div class="selects">
        <div id="0" @click="selectFn(0)">
          <span>{{ administrative }}</span>
          <span :class="type == 0 ? openimg : closeimg"></span>
          <transition name="fade">
            <ul v-show="type == 0 ? true : false" class="filter_li">
              <li
                v-for="(item, index) in typeArr"
                :Key="index"
                :class="{ actives: index == adminIndex }"
                @click="selectEvent(0,item)"
              >
                {{ item.eventTypeName
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
                @click="selectEvent(1,item)"
              >
                {{ item.eventLevelName
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
                @click="selectEvent(2,item)"
              >
                {{ item.name
                }}
              </li>
            </ul>
          </transition>
        </div>
      </div>
       <!-- 下拉列表选项 end -->
    <!-- -------------------------------------------------------------------------------------- -->
    <div class="list_box">
      <div class="mask" v-show="mask" @click="hide_select"></div>
      <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight}">
        <mt-spinner
          type="fading-circle"
          v-show="knowlist.length <1 && InitialLoading"
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
          <div style="min-height:560px;padding:4px 0 0 0;">
            <ul v-for="(item,index) in knowlist" :key="index" @click="jumpdetail(item)">
              <li>
                <span class="title_span">{{item?item.caseName:""}}</span>
                <span class="flag_red">重大</span>
              </li>
               <li class="content_li">{{item?item.conResume:""}}</li>
              <li class="foot_li">
                <span>{{item.typeName}}</span>
                <span>{{item.createTime}}</span>
              </li>
            </ul>
            <!-- 无数据状态 -->
            <div v-show="knowlist.length <1 && InitialLoading == false" class="list_item_empty"></div>
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
      <!-- -------------------------------------------------------------------------------------- -->
    </div>
    <!-- -------------------------------------------------------------------------------------- -->
  </div>
</template>

<script lang="ts">
import plan from '../../../assets/server/knowledge_base.js';
import mytitle from "../../common/mytitle.vue";
//loading效果
import { Indicator } from 'mint-ui';
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'Case',
  components:{mytitle}
})
export default class Case extends Vue {
  //侧栏
  private drawer = false;
  private direction = 'rtl';
  private typeArr = [];
  private code = ''; //事故类型code
  private index1 = -1;
  //循选中下标
  private act = 0;
  private value = '';
  private timer = '';
  private flag = false;
  //上拉加载下拉刷新
  private pageNo = 1; //页码
  private moredata = false;
  private list = 0; //数据
  private InitialLoading = true;
  private allLoaded = false; //数据是否加载完毕
  private bottomStatus = ''; //底部上拉加载状态
  private wrapperHeight = "100%"; //容器高度
  private topStatus = ''; //顶部下拉加载状态
  //请求数据
  private planTypeCode = '61A00'; //'61B00''61C00''61D00'
  //预案数据
  private knowlist = [];
  private mask = false;
   // 企业数据
  private msg = '案例';
  private administrative = '事件类型';
  private admincode = '';
  private adminIndex = -1;
  private type = 3;
  private industry = '事件等级';
  private indIndex = -1;
  private indcode = '';
  private state = '事发时间';
  private staIndex = -1;
  private stacode = '';
  private openimg = 'openArrow';
  private closeimg = 'closeArrow';
  private levelCode="";
  private typeCode="";
  private startTime="";
  //行业
  private industryArr = [
  ];
  // 时间选择
  private statusArr = [
    {
      code: '',
      name: '全部'
    },
    {
      code: '1',
      name: '近3个月'
    },
    {
      code: '2',
      name: '近半年'
    },
    {
      code: '3',
      name: '近一年'
    }
  ];
  //重置按钮
  private reset() {
    this.code = '';
  }
   //点击遮罩
  private hide_select() {
    this.type = 3;
    this.mask = false;
  }
  //确定按钮
  private determine() {
    this.drawer = false;
    this.caseListRequest();
  }
  selectEvent(_type,_item){
    console.log(_type,_item)
    let _this=this;
    switch (_type) {
      case 0:
        console.log("select event type")
        _this.typeCode=_item.eventTypeCode;
        break;
      case 1:
        console.log("select event level")
        _this.levelCode=_item.eventLevelCode;
        break;
      case 2:
        console.log("select event time")
        if(_item.code=="1"){
          var date1 = new Date();
          date1.setMonth(date1.getMonth()-3);
          _this.startTime=_this.$formatTimeStr(date1)
          console.log(_this.$formatTimeStr(date1) )
        }else if(_item.code=="2"){
          var date1 = new Date();
          date1.setMonth(date1.getMonth()-6);
          _this.startTime=_this.$formatTimeStr(date1)
          console.log(_this.$formatTimeStr(date1) )
        }else if(_item.code=="3"){
          var date1 = new Date();
          date1.setMonth(date1.getMonth()-12);
          _this.startTime=_this.$formatTimeStr(date1)
          console.log(_this.$formatTimeStr(date1) )
        }else{
           _this.startTime="";
        }
        break;
    }
    _this.caseListRequest();
  }
  //搜索关键字
  private search() {
    this.$router.push({
      name: 'Casesearch',
      path: '/Casesearch'
    });
  }
  //跳转详情
  private jumpdetail(data) {
    this.$router.push({
      name: 'Casedetail',
      path: '/Casedetail',
      params: {
        item: data
      }
    });
  }
  //知识列表
  private caseListRequest() {
    let that = this;
    let parma = {
      "keyWord": "",
      "nowPage": 1,
      "pageSize": 10,
      "startTime": that.startTime,
      "typeCode": that.typeCode,
      "levelCode":that.levelCode
    };
    console.log(parma);
    // Indicator.open({
    //   text: '加载中...',
    //   spinnerType: 'fading-circle'
    // });
    setTimeout(() => {
      //页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
    }, 1000);
    return new Promise(function(resolve, reject) {
      plan
        .caselist(parma)
        .then(function(response) {
          //解除loading
          // Indicator.close();
          if (response.data) {
              that.knowlist = response.data.data.list;
            //对接真数据 下方接口注释解开
            // if (that.pageNo == 1) {
            //   //每次更新筛选数据  置顶
            //   setTimeout(() => {
            //     that.knowlist = response.data.data.list;
            //   }, 100);
            // } else {
            //   console.log(that.knowlist);
            //   that.knowlist = [...that.knowlist, ...response.data.data.list];
            //   console.log(response.data.data.list);
            //   // that.firstRender = true;
            //   that.allLoaded = response.data.data.list.length < 10 ? true : false;
            // }
          }
          resolve();
        })
        .catch(function(error) {
          // Indicator.close();
          reject(error);
        });
    });
  }
  private selectFn(index) {
    if (this.type == index) {
      this.type = 4;
      this.mask = false;
    } else {
      this.type = index;
      this.mask = true;
    }
  }
  //事故类型
  private plantype() {
    let that = this;
    new Promise(function(resolve, reject) {
      plan
        .planType()
        .then(function(response) {
          if (response.data.data) {
            console.log("plantype==>",response.data.data);
            //that.typeArr = response.data.data;
            let obj={"eventTypeCode":"","eventTypeName":"全部"};
            that.typeArr=[];
            that.typeArr.push(obj as any)
            that.typeArr = [...that.typeArr, ...response.data.data];
          }
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });
    return new Promise(function(resolve, reject) {
      plan
        .eventLevel()
        .then(function(response) {
          if (response.data.data) {
            console.log("eventLevel==>",response.data.data);
            that.industryArr=[];
            let obj={"eventLevelCode":"","eventLevelName":"全部"};
            that.industryArr.push(obj as any)
            that.industryArr = [...that.industryArr, ...response.data.data];
            //that.industryArr = response.data.data;
          }
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });

    
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
      this.caseListRequest();
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
      this.caseListRequest();
    }, 1000);
  }
  private mounted() {
    setTimeout(() => {
      //页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
      this.InitialLoading = false;
    }, 2000);
  }
  private created() {
    this.caseListRequest();
    this.plantype();
    this.$enJsBack(true)//true 为使用h5返回操作 false为使用android原生
  }
}
</script>

<style scoped lang="scss">
.tab {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #c0ccda;
  .tabList {
    font-size: 14px;
    height: 28px;
  }
  .active {
    color: #0bb20c;
    border-bottom: 2px solid #0bb20c;
    /*padding-top: 10px;*/
  }
}

.selects {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #eee;
  position: relative;
  background: #fff;
  div {
  /* position: relative; */
    font-size: 14px;
    height: 100%;
    width: 100px;
    display: flex;
    justify-content: center;
    span:nth-of-type(1) {
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
    .openArrow:nth-of-type(2) {
      display: inline-block;
      width: 20px;
      height: 45px;
      vertical-align: middle;
      background: url('../../../assets/images/openArrow.png') no-repeat right;
      background-size: 15px 8px;
      /* background-position: 15px 10px; */
    }
    .closeArrow:nth-of-type(2) {
      display: inline-block;
      width: 20px;
      height: 45px;
      vertical-align: middle;
      background: url('../../../assets/images/closeArrow.png') no-repeat right;
      background-size: 15px 8px;
      /* background-position: 15px 10px; */
    }
    .filter_li {
      position: absolute;
      width: 90%;
      top: 55px;
      left: 5%;
      max-height: 40vh;
      overflow-y: auto;
      line-height: 25px;
      font-size: 13px;
      background: #fff;
      text-align: center;
      z-index: 10;
      padding: 5px 0;
      border-radius: 10px;
    }
    .filter_li li {
      height: 30px;
      line-height: 30px;
    }
    .filterbox {
      padding: 5px 0;
    }
    .filterbox > li {
      width: 100px;
      /* padding: 0 5px; */
      /* white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */
      float: left;
    }
    .filterbox > li:nth-of-type(1) {
      width: 30%;
    }
    .filterbox > li:nth-of-type(2) {
      width: 70%;
      max-height: 500px;
      overflow-y: auto;
    }
    .filterbox .filter_left_child li {
      width: 100%;
      padding: 0 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .filter_left li:active {
      color: red;
    }

  }
}
.list_box {
  height: calc(100% - 150px);
  background: #eee;
  width: 100%;
  overflow: hidden;
  .mask {
    width: 100%;
    height: 516px;
    position: absolute;
    left: 0;
    bottom: 0px;
    background: rgba(1, 1, 1, 0.5);
    z-index: 2;
  }
  ul {
    background: #fff;
    width: 100%;
    // height: 90px;
    padding: 10px 15px 15px 15px;
    border-top: 1px solid #eee;
    li {
      width: 100%;
      font-size: 14px;
      .title_span{
        display: inline-block;
        max-width: 85%;
        padding-right: 2.66667vw;
        color: steelblue;
        overflow: hidden;
        float: left;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .flag_red{
        display: inline-block;
        max-width: 25%;
        height: 20px;
        line-height: 20px;
        padding: 0px 8px;
        background: red;
        text-align: center;
        font-size: 13px;
        color: #fff;
      }
    }
    .content_li{
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: gray;
      font-size: 13px;
    }
    li:nth-of-type(1) {
      font-weight: bold;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    li:nth-of-type(2) {
      //height: 25px;
      line-height: 25px;
    }
    .foot_li{
      width: 100%;
      line-height: 25px;
      span{
        max-width: 30%;
        padding-right:10px;
        color: gray;
      }
    }
    li:nth-of-type(4) {
      margin-top: 6px;
      height: 22px;
      line-height: 22px;
      span {
        height: 22px;
        border-radius: 10px;
        display: inline-block;
        text-align: center;
        padding: 0 10px;
        font-size: 13px;
        border: 1px solid #7093db;
        color: #7093db;
        margin: 0 10px 0 0;
      }
    }
  }
}
.mint-search {
  height: 45px;
}
ul::after {
  content: '';
  display: block;
  clear: both;
}
.mint-loadmore .mint-loadmore-content {
  min-height: 560px;
}
.typesearch {
  height: 100%;
  width: 100%;
  padding: 65px 0 0 0;
  background: #eee;
  position: relative;
  p {
    font-size: 15px;
    font-weight: bold;
    height: 25px;
    line-height: 25px;
    padding: 0 0 0 10px;
  }
  ul {
    margin-bottom: 20px;
  }
  li {
    float: left;
    padding: 0 8px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    font-size: 13px;
    margin: 8px;
  }
  .gray_active {
    background: rgb(194, 194, 194);
  }
  div {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    span:nth-of-type(1) {
      width: 50%;
      line-height: 40px;
      text-align: center;
      background: gray;
    }
    span:nth-of-type(2) {
      border-left: 1px solid #fff;
      width: 49.8%;
      line-height: 40px;
      text-align: center;
      color: white;
      background: green;
    }
  }
  



}
</style>