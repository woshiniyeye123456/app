<template>
  <div id="addSearch">
    <!--头部-->
    <mt-header :title="title" class="commonHeader">
      <div v-show="selectedTab !== '/addSearch/useGroup'" @click="add" slot="left">
        <mt-button icon="add" style="font-size:30px">+</mt-button>
      </div>
      <mt-button
        icon="search"
        @click="searchShow"
        v-show="selectedTab !== '/addSearch/useGroup'"
        slot="right"
      ></mt-button>
      <div
        v-show="selectedTab === '/addSearch/useGroup'"
        class="rightHead"
        slot="right"
        @click="goAdd()"
      >
        <img src="@/assets/images/jiahao.png">
        添加群组
      </div>
    </mt-header>
    <transition name="fade">
      <div class="searchBox" v-if="searchIsShow" @click="searchIsShow = false">
        <div class="searchHeadbox" @click.stop>
          <img @click="searchHide" src="@/assets/images/jiantouZuo.png">
          <input
            class="searchInp"
            type="text"
            placeholder="联系人姓名，机构查询"
            @input="searchEvent"
            v-model.trim="inputvalue"
          >
        </div>
        <div class="list_box">
          <div v-show="flag" class="empty_list">暂无相关联词</div>
          <ul v-for="(item,index) in  valuelist" :key="index" @click="linkmandetail(item)">
            <li>{{item.personName.slice(0,1)}}</li>
            <li>
              <p>{{item.personName}}</p>
              <p>{{item.orgName}}</p>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <mt-navbar>
      <mt-tab-item
        v-for="(i,index) in tabObj"
        :key="index"
        :id="i.path"
        @click.native="changeLink(i.path,index)"
      >
        <router-link :to="i.path" active-class="activeLink">{{i.name}}</router-link>
      </mt-tab-item>
    </mt-navbar>
    <router-view :searchVal="inputvalue"></router-view>
  </div>
</template>

<script lang="ts">
//loading效果
import { Indicator } from 'mint-ui';
// ts
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component({
  name: 'personalInformation'
})
export default class personalInformation extends Vue {
  @Watch ('inputvalue',{immediate: true, deep: true })
  onInputvalueChanged(val){
    if(val.length>20) this.inputvalue = val.slice(0,19);

    this.searchEvent();
  }
  private inputvalue = ''; //检索关键字
  private keywordData = ''; //联系人总数据
  private valuelist = []; //检索联系人数组
  private timer = '';
  private searchIsShow = false;
  private flag = false;
  private title = '通讯录信息';
  private index = 0;
  private selectedTab = '1';
  private tabObj = [
    {
      name: '机构联系人',
      path: '/addSearch/linkmanList',
      value: '1'
    },
    {
      name: '组织机构',
      path: '/addSearch/organization',
      value: '2'
    },
    {
      name: '常用群组',
      path: '/addSearch/useGroup',
      value: '3'
    }
  ];
  private changeLink(path: string, index) {
    this.selectedTab = path;
    if (this.index != index) {
      this.searchIsShow = false;
      this.inputvalue = '';
    }
    this.index = index;
  }
  private mounted() {
    this.selectedTab = this.$route.path;
  }
  private created() {
    this.selectedTab = this.tabObj[0].path;
    let that = this;
    //拿到联系人总数据
    console.log(this.$store.getters.total_message)
    that.keywordData = this.$store.getters.total_message;
  }
  private searchShow() {
    this.searchIsShow = true;
  }
  private searchHide() {
    this.searchIsShow = false;
    this.inputvalue = '';
    this.valuelist = [];
  }
  //新增联系人
  private add() {
    this.$router.push({ path: '/addressAdd' });
    localStorage.removeItem('addparma');
  }
  private goAdd() {
    this.$store.state.addGroupTitle = [];
    this.$store.state.addList = [];
    this.$router.push({ path: '/addGroup' });
  }
  //点击联系人
  private linkmandetail(item: any) {
    this.$router.push({
      name: 'linkmanDetail',
      path: '/linkmanDetail',
      params: {
        item: item
      }
    });
  }
  //实时搜索
  private searchEvent() {
    // this.clearTimer();
    let that = this;
    console.log(that.keywordData)
    if (this.inputvalue && this.inputvalue.length > 0) {
      //获取当前延时函数的ID，便于后面clearTimeout清除该ID对应的延迟函数
      // (this as any).timer = setTimeout(() => {
        let test = new RegExp('[^a-zA-Z0-9_\u4e00-\u9fa5]', 'i');
        console.log(this.inputvalue);
        if (test.test(this.inputvalue) == true) {
          (this as any).$toast({ message: '搜索内容含有非法字符!', position: 'middle', duration: 3000 });
          this.inputvalue = '';
          return;
        }
        let arrayList = [];
        for (let item of that.keywordData) {
          for (let arr of (item as any).items) {
            if (arr.personName.indexOf(that.inputvalue) != -1 ||that.inputvalue.indexOf(arr.personName) != -1) {
              arrayList.push(arr);
            }
          }
        }
        for (let item of that.keywordData) {
          for (let arr of (item as any).items) {
            if (arr.orgName != null) {
              if (arr.orgName.indexOf(that.inputvalue) != -1 || that.inputvalue.indexOf(arr.orgName) != -1) {
                arrayList.push(arr);
              }
            }
          }
        }
        that.valuelist = arrayList;
        console.log(arrayList)
        if (that.valuelist.length == 0) {
          that.flag = true;
        } else {
          that.flag = false;
        }
      // }, 500);
    } else {
      setTimeout(() => {
         that.valuelist = [];
      });
    }
  }
  private clearTimer() {
    if (this.timer) {
      clearTimeout((this as any).timer);
    }
  }
}
</script>
<style scoped lang="scss">
#addSearch {
  width: 100%;
  height: 100%;
  .searchBox {
    width: 100vw;
    height: 100%;
    background-color: #fff;
    position: fixed;
    top: 0;
    background-color: rgba(1, 1, 1, 0.4);
    z-index: 999999;
    .list_box {
      max-height: 607px;
      overflow: auto;
      .empty_list{
        font-size: 14px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fff;
        color: gray;
        padding: 0 0 0 20px;
      }
      ul {
        width: 100%;
        padding: 0 10px;
        background: #fff;
        height: 70px;
        display: flex;
        align-items: center;
        li {
          float: left;
        }
        li:nth-of-type(1) {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          text-align: center;
          line-height: 40px;
          margin-right: 15px;
          background: #666;
          color: #fff;
        }
        li:nth-of-type(2) {
          width: 300px;
          height: 70px;
          padding: 12px 0 0 0;
          p {
            width: 300px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 25px;
            line-height: 25px;
          }
          p:nth-of-type(2) {
            color: gray;
            line-height: 22px;
          }
        }
      }
    }
    .searchHeadbox {
      width: 100vw;
      height: 16vw;
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
  .activeLink {
    border-bottom: 2px solid #6fa55b;
    padding-bottom: 5px;
    color: #6fa55b;
  }
  .rightHead {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>  