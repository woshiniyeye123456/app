
<template>
  <div id="enterprise_search">
    <mt-header title>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/newwork" slot="right">
        <mt-button icon="add" style="font-size:30px">+</mt-button>
      </router-link>
    </mt-header>
    <span class="title" @click="openSimple = !openSimple">{{title}}</span>
    <!-- //组织机构列表 -->
    <!-- <mu-dialog title width="360" scrollable :open.sync="openSimple">
      <el-button
        type="text"
        size="mini"
        @click="() => clearTree('coordinate')"
        style="font-size:15px"
      >清空已选择内容</el-button>
      <el-tree
        :data="orgList"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :expand-on-click-node="true"
      ></el-tree>
    </mu-dialog> -->
    <!-- 主体 -->
    <div class="main_box">
      <!-- 日历 -->
      <div class="datePicker">
        <Calendar
          :now="false"
          :responsive="false"
          lunar
          clean
          @select="selected"
          @selectYear="selectYeared"
          @selectMonth="selectMonthed"
          @prev="preved"
          @next="nexted"
          :multi="false"
          ref="calendar"
        />
      </div>
      <!-- 值班内容 -->
      <div class="duty_box">
        <div v-show="flag == 0">
          <div class="duty_div" v-for="(item,index) in listArr" :key="index">
            <p class="time">日期 : {{item?item.date:""}}</p>
            <ul class="duty_ul" v-for="(item2,index2) in item.dutyList" :key="index2">
              <li>职务 : {{item2?item2.groupName :""}}</li>
              <li>姓名 : {{item2?item2.personName:""}}</li>
            </ul>
          </div>
        </div>
        <div v-show="flag == 1">
          <ul class="duty_singgle" v-for="(item,index) in listArr" :key="index">
            <li>日期: {{item?item.dutyDate:""}}</li>
            <li>职务: {{item?item.groupName :""}}</li>
            <li>姓名: {{item?item.personName:""}}</li>
          </ul>
        </div>
        <!-- 无数据状态 -->
        <div v-show="listArr.length == 0" class="list_item_empty2"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import linkmail from '../../assets/server/mailList_index.js';
import onduty from '../../assets/server/onduty.js';
import Calendar from 'mpvue-calendar';
import 'mpvue-calendar/src/browser-style.css';
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'dynamic',
  components: {
    Calendar
  }
})
export default class dynamic extends Vue {
  private value = '';
  //DOM切换
  private flag = 0;
  private dataList = '';
  private openSimple = false;
  private org_code = this.$store.state.userInfo.orgCode; //组织机构
  private title = '值班动态';
  private listArr = [];
  private allDuty = [];
  //时间选择器
  private year = '';
  private mounth = '';
  private year_mounth = '';
  //组织选择期
  private orgList = [];
  private defaultProps = {
    children: 'children',
    label: 'org_name'
  };
  private baseurl = '';
  //点击日期
  private selected(val, val2) {
    console.log(val2);
    let mounth = val[1];
    if(mounth < 9){
      mounth = '0' + mounth
    }
    let day = val[2];
    if(day <9){
      day = '0' + day
    }
    this.flag = 1;
    // this.value = val2.date;
    let  value = val[0] + '-' + mounth + '-' + day;
    
    //交互
    // this.dynamic_list();
    this.listArr = [];
    this.allDuty.forEach(element => {
      if(value == element.date){
        this.listArr = element.dutyList;
        console.log(this.listArr);
      }
    });
  }
  //点击年份
  private selectYeared(y) {
    this.flag = 0;
    this.year_mounth = y + '-' + this.mounth;
    this.mounthnamic_list();
  }
  //点击月份
  private selectMonthed(m, y) {
    this.flag = 0;
    this.year_mounth = y + '-' + m;
    this.mounthnamic_list();
  }
  //上一月
  private preved(y, m, W) {
    this.flag = 0;
    this.year_mounth = y + '-' + m;
    this.mounthnamic_list();
  }
  //下一月
  private nexted(y, m, W) {
    this.flag = 0;
    this.year_mounth = y + '-' + m;
    this.mounthnamic_list();
  }
  private openOrg() {
    this.openSimple = true;
  }
  private handleNodeClick(data) {
    //组织机构
    this.openSimple = false;
    console.log(data);
    this.org_code = data.emorgid;
    this.title = data.org_name;
    //交互
  }
  private getNowYearAndMounth() {
    var myDate = new Date();
    var tYear = myDate.getFullYear();
    var tMonth = myDate.getMonth();
 
    var m = JSON.stringify(tMonth + 1);
    if (m.toString().length == 1) {
        m = "0" + m;
    }
    this.year_mounth =  tYear + '-' + m;
  }
  //获取组织机构
  private getAllOrg() {
    let that = this;
    let parma = {
      orgCode: '',
      updateTime: '',
      userId: ''
    };
    return new Promise(function(resolve, reject) {
      linkmail
        .getGroup(parma)
        .then(function(response) {
          if (response.data.data) {
            // console.log(response.data.data);
            that.orgList = that.filterArray(response.data.data.list, '0');
          } else {
            (that as any).$toast({ message: '请求数据异常!', position: 'bottom', duration: 3000 });
          }
          resolve();
        })
        .catch(function(error) {
          (that as any).$toast({ message: '请求数据异常!', position: 'bottom', duration: 3000 });
          reject(error);
        });
    });
  }

  private filterArray(data, id) {
    //组织机构的递归
    var fa = function(parentid) {
      var _array = [];
      for (var i = 0; i < data.length; i++) {
        var n = data[i];
        if (n.parentcode === parentid) {
          n.children = fa(n.emorgid);
          _array.push(n);
        }
      }
      return _array;
    };
    return fa(id);
  }
  private clearTree(obj) {
    this.openSimple = false;
    this.title = '值班动态';
    this.org_code = '';
    //交互
  }
  //交互获取当天值班信息
  private currenttime() {
    let that = this;
    return new Promise(function(resolve, reject) {
      onduty
        .currenttime()
        .then(function(response) {
          if (response.data.data) {
            console.log(response.data.data);
            that.year_mounth = response.data.data.currentTime.split('-')[0] + '-' + response.data.data.currentTime.split('-')[1];
            that.mounth = response.data.data.currentTime.split('-')[1];
          } else {
            // (that as any).$toast({ message: '当天日期获取失败!', position: 'bottom', duration: 3000 });
          }
        })
        .catch(function(error) {
          // (that as any).$toast({ message: '当天日期获取失败!', position: 'bottom', duration: 3000 });
          reject(error);
        });
    });
  }
  private mounthnamic_list() {
    let that = this;
    let parma = {
      "date":this.year_mounth,
      "endTime": "",
      "orgCode": this.org_code,
      "startTime": ""
    };
    console.log(parma);
    return new Promise(function(resolve, reject) {
      onduty
        .dutymounthlist(parma)
        .then(function(response) {
          console.log(response);
          if (response.data.data) {
            if (response.data.data[0].dutyList) {
              that.listArr = response.data.data;
              that.allDuty = response.data.data; 
              console.log(that.listArr);
            }
          } else {
            that.listArr = [];
          }
        })
        .catch(function(error) {
          that.listArr = [];
          reject(error);
        });
    });
  }
  //取月份数据遍历方法
  private sort(data) {}
  //交互获取当天值班信息
  private dynamic_list() {
    let that = this;
    let parma = {
      date: this.value,
      endTime: "",
      orgCode:this.org_code,
      startTime: '',
    };
    console.log(parma);
    return new Promise(function(resolve, reject) {
      onduty
        .dutydaylist(parma)
        .then(function(response) {
          console.log(response);
          if (response.data.data) {
            that.listArr = response.data.data;
            console.log(that.listArr);
          } else {
            that.listArr = [];
          }
        })
        .catch(function(error) {
          that.listArr = [];
          reject(error);
        });
    });
  }
  private created() {
    let that = this;
    this.currenttime();
    // this.getAllOrg();
    that.getNowYearAndMounth();
    setTimeout(function() {
      that.mounthnamic_list();
    }, 100);
  }
}
</script>
<style scoped lang="scss">
#enterprise_search {
  // height: 667px;
  .mint-header {
    height: 60px;
    background: #5d944a;
    font-size: 4.8vw;
  }
  .title {
    position: absolute;
    top: 0;
    height: 60px;
    width: 80px;
    text-align: center;
    line-height: 60px;
    left: 147px;
    font-size: 18px;
    color: #fff;
  }
  .main_box {
    height: 607px;
    overflow: auto;
  }
  .duty_box {
    width: 100%;
    .duty_div {
      width: 100%;
      background: #fff;
      padding: 5px 15px;
      margin: 8px 0;
      font-size: 15px;
      .time {
        height: 40px;
        line-height: 40px;
        font-weight: bold;
      }
      .duty_ul {
        padding: 5px 0;
        border-top: 1px solid #ddd;
        li {
          height: 25px;
          line-height: 25px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .duty_singgle {
      width: 100%;
      background: #fff;
      padding: 5px 15px;
      margin: 8px 0;
      li {
        height: 25px;
        line-height: 25px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>













