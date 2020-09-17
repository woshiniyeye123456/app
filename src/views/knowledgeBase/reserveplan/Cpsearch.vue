<template>
  <div id="enterprise_search" style="height:100%">
    
     <mytitle title="预案" :showRight="false" :titleObj="{icon:'more'}" :whetherNotParent="false"></mytitle>
    <mt-search @input="searchEvent" v-model="value" cancel-text="取消"  placeholder="输入预案关联词"></mt-search>
    <div class="list_box">
      <ul>
      <ul v-for="(item,index) in planlist" :key="index" @click="jumpdetail(item)">
        <li>{{item?item.planName:""}}</li>
        <li>
          <span>{{item?item.orgName:""}}</span>
          <span>{{item?item.createTime:""}}</span>
        </li>
        <li>
          <span>{{item?item.planLevelName:""}}</span>
          <span>{{item?item.classCodeName:""}}</span>
        </li>
      </ul>
      </ul>
      <!-- 无数据状态 -->
      <div v-show="flag" class="list_item_empty"></div>
    </div>
    <!-- -------------------------------------------------------------------------------------- -->
  </div>
</template>

<script lang="ts">
import plan from '../../../assets/server/knowledge_base.js';
import mytitle from "../../common/mytitle.vue";

//loading效果
import { Indicator } from 'mint-ui';
import { Vue, Component,Watch} from 'vue-property-decorator';
@Component({
  name: 'ContingencyPlanSearch',
  components:{mytitle}
})
export default class ContingencyPlanSearch extends Vue {
  @Watch('value', { immediate: true, deep: true })
  onValueChanged(val) {
    console.log("现在搜索的内容是"+val);
    if(val.length>20) this.value = val.slice(0,19);
    this.searchEvent();
  }
  private timer: any;
  private value = '';
  private flag = false;
  private planlist = '';
  //跳转详情
  private jumpdetail(data) {
    this.$router.push({
      name: 'plandetail',
      path: '/plandetail',
      params: {
        item: data
      }
    });
  }
  //实时搜索
  private searchEvent() {
    this.clearTimer();
    if (this.value.length >= 0) {
      //获取当前延时函数的ID，便于后面clearTimeout清除该ID对应的延迟函数
      this.timer = setTimeout(() => {
        let test = new RegExp('[^a-zA-Z0-9_\u4e00-\u9fa5]', 'i');
        console.log(this.value);
        if (test.test(this.value) == true) {
          (this as any).$toast({ message: '搜索内容含有非法字符!', position: 'middle', duration: 3000 });
          this.value = '';
          return false;
        } else {
          this.genehcplan();
        }
      }, 500);
    } else {
    }
  }
  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  private genehcplan() {
    let that = this;
    let parma = {
      eventParentTypeCode: '11000',
      eventTypeCode: '',
      pageNo: 1,
      pageSize: 20,
      planLevelCode: '',
      keyWord: this.value,
      planParentTypeCode: '',
      planTypeCode: ''
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
        .reserveplan(parma)
        .then(function(response) {
          console.log(response.data.data);
          if (response.data.data) {
            that.flag = false;
            console.log(response.data.data.list);
            that.planlist = response.data.data.list;
          } else {
            (that as any).planlist = [];
            that.flag = true;
          }
          resolve();
        })
        .catch(function(error) {
            (that as any).planlist = [];
          that.flag = true;
          reject(error);
        });
    });
  }
  private created(){
    this.genehcplan()
    this.$enJsBack(true)//true 为使用h5返回操作 false为使用android原生
  }
}
</script>

<style scoped lang="scss">
.mint-header {
  height: 60px;
  background: #5d944a;
  font-size: 4.8vw;
}
.list_box {
  height: calc(100% - 100px);
  overflow: auto;
  background: #eee;
  width: 100%;
  ul {
    background: #fff;
    width: 100%;
    // height: 90px;
    padding: 10px 15px 15px 15px;
    margin-top: 8px;
    border-top: 1px solid #eee;
    li {
      width: 100%;
      font-size: 14px;
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
      height: 25px;
      line-height: 25px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      span:nth-of-type(1) {
        max-width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 10px;
      }
    }
    li:nth-of-type(3) {
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
      }
      span:nth-of-type(1) {
        border: 1px solid #7093db;
        color: #7093db;
        margin: 0 10px 0 0;
      }
      span:nth-of-type(2) {
        border: 1px solid #e45050;
        color: #e45050;
      }
    }
  }
}
.mint-search-list {
  height: 0;
}
#enterprise_search {
  // height: 667px;
  .mint-search {
    height: 45px !important;
    color: #eee;
  }
}
.mint-loadmore .mint-loadmore-content {
  min-height: 622px;
}
</style>
