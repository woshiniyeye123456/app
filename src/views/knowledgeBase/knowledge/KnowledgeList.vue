<template>
  <div id="contingency-plan">
    <!--头部-->
    
    <mytitle :title="msg" :showRight="false" :titleObj="{icon:'more'}" :whetherNotParent="false" ></mytitle>
    <mt-navbar v-model="selected" >
      <mt-tab-item  :id="item.code" @click.native="changeSelect(item.code)" v-for="(item,index) in tabArr" :key="index">{{item.name}}</mt-tab-item>
       <!-- <mt-tab-item id="0" >MSDS</mt-tab-item>
        <mt-tab-item id="1" >重点监管工艺</mt-tab-item> -->
      
    </mt-navbar>
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
              index1 == index?code=item.code:code=''"
          >{{item.name}}</li>
        </ul>
        <div>
          <span @click="reset">重置</span>
          <span @click="determine">确认</span>
        </div>
      </div>
    </el-drawer>
    <!-- -------------------------------------------------------------------------------------- -->
    <div class="list_box">
      <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px'
        }">
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
          <div style="min-height:560px;padding:1px 0 0 0;">
            <ul class="data_lump" v-for="(item,index) in knowlist" :key="index" @click="jumpdetail(item)">
              <div v-if="selected=='0'">
                <span v-if="item&&item.supervisionFlag=='1'" class="rect_parent">
                  <span class="rect">重点</span>
                </span>
                <li>{{item?item.msdsTitle:""}}</li>
                <li>别名：{{item?item.msdsAli:""}}</li>
                <!-- <li><span></span>危险性类别：{{item?item.createOrgCodeText:""}}</li> -->
                <li>危险性类别：{{item?item.hazardClass:""}}</li>
              </div>
              <div v-else>
                <li>{{item?item.processName:""}}</li>
                <li>反应类型：{{item?item.reacTypeName:""}}</li>
              </div>
              
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
  name: 'ContingencyPlan',
  components:{mytitle}
})
export default class ContingencyPlan extends Vue {
  private msg = '知识';
  //侧栏
  private drawer = false;
  private direction = 'rtl';
  private typeArr = '';
  private code = ''; //事故类型code
  private index1 = -1;
  private tabArr=[{"code":"0","name":"MSDS","active":"false"},{"code":"1","name":"重点监管工艺","active":"false"}];
  selected="0";
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
  private wrapperHeight = 500; //容器高度
  private topStatus = ''; //顶部下拉加载状态
  //请求数据
  private planTypeCode = '61A00'; //'61B00''61C00''61D00'
  //预案数据
  private knowlist = [];
  //重置按钮
  private reset() {
    this.code = '';
  }
  //确定按钮
  private determine() {
    this.drawer = false;
    this.knowledge();
  }

  //搜索关键字
  private search() {
    this.$router.push({name: 'KlSearch', path: '/KlSearch',query:{"qtype":this.selected}});
  }
  //跳转详情
  private jumpdetail(data) {
    data.qtype=this.selected;
    console.log(data)
    this.$router.push({
      name: 'knowledgeDetail',
      params: {
        item: data
      }
    });
  }
  //知识列表
  private knowledge() {
    let that = this;
    if(that.selected=="0"){
      console.log("请求MSDS列表数据")
    }else{
       console.log("请求重点工艺列表数据")
    }
    let parma = {
      keyWord: '',
      orgCode: '',
      nowPage: that.pageNo,
      pageSize: 10,
      userId: '',
      qtype:that.selected,
    };
    console.log(parma);
   
    return new Promise(function(resolve, reject) {
      plan
        .knowlist(parma)
        .then(function(response) {
          //解除loading
           Indicator.close();
          if (response.data) {
            console.log(response.data)
           //假接口逻辑
             that.knowlist = response.data.processList.list;
            //下方真接口逻辑
            // if (that.pageNo == 1) {
            //   //每次更新筛选数据  置顶

            //   that.knowlist = [that.knowlist[0]];
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
          } else {
            (that as any).$toast({ message: '暂无更多数据', position: 'bottom', duration: 3000 });
          }
          resolve();
        })
        .catch(function(error) {
           Indicator.close();
          reject(error);
        });
    });
  }
  //事故类型
  private plantype() {
    let that = this;
    return new Promise(function(resolve, reject) {
      plan
        .caselist()
        .then(function(response) {
          if (response.data.data) {
            console.log(response.data.data);
            that.typeArr = response.data.data;
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
      this.knowledge();
      this.handleBottomChange('loadingEnd'); //数据加载完毕 修改状态码
      (this.$refs.loadmore as any).onBottomLoaded();
    }, 1000);
  }
  private handleTopChange(status) {
    this.topStatus = status;
  }
  private loadTop() {
     Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    //下拉刷新 模拟数据请求这里为了方便使用一次性定时器
    this.handleTopChange('loading'); //下拉时 改变状态码
    this.pageNo = 1; //页数
    this.allLoaded = false; //下拉刷新时解除上拉加载的禁用
    setTimeout(() => {
      this.handleTopChange('loadingEnd'); //数据加载完毕 修改状态码
      (this.$refs.loadmore as any).onTopLoaded();
      //调接口
      this.knowledge();
    }, 1000);
  }
  changeSelect(_code){
    console.log("change select==>"+_code)
    this.knowlist=[];
    this.loadTop();

  }
  private mounted() {
    setTimeout(() => {
      //页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
      this.InitialLoading = false;
    }, 2000);
  }
  private created() {
    let _this=this;
    setTimeout(() => {
      _this.selected="0";
    }, 1000);
    this.knowledge();
    this.$enJsBack(true)//true 为使用h5返回操作 false为使用android原生

    //this.plantype();
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
.mint-navbar{
  margin: 5px 0px;
}
.mint-navbar .mint-tab-item.is-selected{
  color: #67a551;
  border-bottom-color: #67a551;
}
.list_box {
  height: 500px;
  background: #eee;
  width: 100%;
  overflow: hidden;
  .data_lump{
    position: relative;
    .rect_parent{
      width: 40px;
      height: 40px;
      position: absolute;
      overflow: hidden;
      top: 1px;
      left: 1px;      
      .rect{
        position: absolute;
        width: 56.5px;
        height: 17px;
        line-height: 20px;
        background: orange;
        color: #fff;
        top: 1px;
        overflow: hidden;
        text-align: center;
        left: 1px;
        font-size: 12px;
        margin-left: -16.6px;
        margin-top: 1vw;
        transform: scale(0.8);
        /* margin: 0px 0px -12px 0; */
        -webkit-transform: rotateZ(-45deg);
        transform: rotateZ(-45deg);
      }
    }
    
  }
  ul {
    background: #fff;
    width: 45%;
    height: 30vw;
    display: block;
    float: left;
    padding: 4.66667vw 4vw 4vw 4vw;
    margin: 2% 2%;
    border-top: 1px solid #eee;
    li {
      width: 100%;
      font-size: 13px;
    }
    li:nth-of-type(1) {
      font-weight: bold;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
    li:nth-of-type(2) {
      height: 25px;
      line-height: 25px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    li:nth-of-type(3) {
      height: 20px;
      line-height: 20px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        height: 20px;
        border-radius: 10px;
        display: inline-block;
        text-align: center;
        padding: 0 10px;
        font-size: 13px;
        border: 1px solid #7093db;
        color: #7093db;
        margin: 0 10px 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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