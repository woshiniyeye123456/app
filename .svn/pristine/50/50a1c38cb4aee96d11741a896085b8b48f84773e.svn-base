<template>
  <div id="EnterpriseVideo">
    <!--头部-->
    <div class="header_box">
      <mt-header title="企业视频">
        <router-link to="/enterpriseDetails" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button icon="search" slot="right" @click = "search"></mt-button>
      </mt-header>
          <!-- 时间选择器 -->
      <span class="timepicker" @click="showDateTimePicker"></span>
    </div>
    {{searchTime}}
    <!-- 视频列表主题 -->
    <div class="vdeio_main_list">
      <ul class="vdeio_main_title">
        <li>{{ dataList.company }}</li>
        <li>总接入: {{ dataList.totalAccess }}</li>
      </ul>
      <div class="vdeio_main_body">
        <div v-for="(item, index) in dataList.workArr" :Key="index">
          <P @click="openList(index)" :class="flag == index ? openimg : closeimg"
            >{{ item.title }}<span>{{ item.count }}</span></P
          >
          <ul v-show="flag == index">
            <li v-for="(item2, index2) in item.list" :Key="index2"><span></span>{{ item2.information }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'EnterpriseVideo'
})
export default class EnterpriseVideo extends Vue {
  private flag = -1;
  // 按钮样式
  private openimg = 'openimg';
  private closeimg = 'closeimg';
  // 时间
  private dateTimePicker: any;
  private value = "";
  private searchTime = "";
  // 数据
  private dataList = {
    company: '股份有限公司', //企业视频名称
    totalAccess: 20, //总接入数
    //视频数组
    workArr: [
      {
        title: '液氢生产车间1#', //标题
        count: 7, //视频数目
        //视频数组
        list: [
          { information: '安装位置-安装位置1##.avi' }, //视频信息 名称...
          { information: '安装位置-安装位置1##.avi' },
          { information: '安装位置-安装位置1##.avi' },
          { information: '安装位置-安装位置1##.avi' }
        ]
      },
      {
        title: '液氢生产车间2#', //标题
        count: 7, //视频数目
        //视频数组
        list: [
          { information: '安装位置-安装位置2##.avi' }, //视频信息 名称...
          { information: '安装位置-安装位置2##.avi' },
          { information: '安装位置-安装位置2##.avi' },
          { information: '安装位置-安装位置2##.avi' }
        ]
      }
    ],
    slots: [
      {
        flex: 1,
        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
        className: 'slot1',
        textAlign: 'right'
      },
      {
        divider: true,
        content: '-',
        className: 'slot2'
      },
      {
        flex: 1,
        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
        className: 'slot3',
        textAlign: 'left'
      }
    ]
  };
  private openList(index) {
    if (index == this.flag) {
      this.flag = -1;
    } else {
      this.flag = index;
    }
  }
  //时间选择器
  private showDateTimePicker() {
    if (!this.dateTimePicker) {
      this.dateTimePicker = this.$createDatePicker({
        title: '请选择时间',
        min: new Date(2008, 7, 8, 8, 0,0,0),
        max: new Date(2022, 9, 20, 20, 59,59,59),
        value: new Date(),
        columnCount: 6,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      });
    }
    this.dateTimePicker.show();
  }
  private selectHandle(date, selectedVal, selectedText) {
    console.log(date)
    console.log(selectedVal)
    console.log(selectedText)
    this.searchTime = selectedText[0]+"-"+ selectedText[1]+"-"+selectedText[2]+" "+selectedText[3]+":"+ selectedText[4]+":"+selectedText[5];
   console.log(this.searchTime)
   // this.$createDialog({
    //   type: 'warn',
    //   content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
    //   icon: 'cubeic-alert'
    // }).show();
  }
  private cancelHandle() {
    this.$createToast({
      type: 'correct',
      txt: '已取消日期选择',
      time: 1000
    }).show();
  }
   private search() {
     this.$router.push({
       path:"/VedioSearch"
     })
   }
}
</script>

<style scoped>
#EnterpriseVideo .mint-header {
  height: 60px;
  background: #5d944a;
  font-size: 18px !important;
}
.header_box {
  position: relative;
}
.timepicker {
  position: absolute;
  top: 17px;
  right: 40px;
  width: 25px;
  height: 25px;
  background: url('../../assets/images/clock.png') no-repeat left;
  background-size: 25px 25px;
}
#EnterpriseVideo .vdeio_main_list {
  width: 100%;
  height: 607px;
  background: #fff;
}
#EnterpriseVideo .vdeio_main_list .vdeio_main_title {
  width: 100%;
  height: 80px;
  padding: 10px 15px;
  border-bottom: 1px solid #dddddd;
}
.vdeio_main_title li:nth-of-type(1) {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.vdeio_main_title li:nth-of-type(2) {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
}
.vdeio_main_body p {
  height: 45px;
  line-height: 45px;
  padding: 0 15px 0 40px;
}
.vdeio_main_body .openimg {
  background: url('../../assets/images/up.png') no-repeat left;
  background-size: 13px 10px;
  background-position: 12px 17px;
}
.vdeio_main_body .closeimg {
  background: url('../../assets/images/down.png') no-repeat left;
  background-size: 13px 10px;
  background-position: 12px 17px;
}
.vdeio_main_body p span {
  float: right;
}
.vdeio_main_body ul li {
  height: 40px;
  line-height: 40px;
  padding-left: 40px;
  font-size: 14px;
  color: #666666;
  background: #eee;
  border-bottom: 1px solid #dddddd;
}
.vdeio_main_body ul li span {
  display: inline-block;
  height: 20px;
  width: 25px;
  background: url('../../assets/images/Monitor.png') no-repeat left;
  background-size: 25px 20px;
  background-position: 0px 0px;
  margin: 0 10px 0 0;
  vertical-align: middle;
}
</style>

