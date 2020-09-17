<template>
  <div id="enterprise_search">
    <div class="mask" v-show="flag" @click="flag=!flag"></div>
    <mt-header title="新增值排班">
      <router-link to="/dynamic" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="list_box">
      <ul>
        <p>
          <span></span>基本信息
        </p>
        <li>
          * 值班日期 : {{searchTime}}
          <span class="openArrow" @click="showDateTimePicker"></span>
        </li>
        <li>
          * 值班类型 : {{type_name}}
          <span class="openArrow" id="trigger4"></span>
        </li>
        <li>
          * 值班人 : {{person_name}}
          <span class="openArrow" @click="choose_person"></span>
        </li>
      </ul>
      <p class="bei_zhu">
        <span></span>备注
      </p>
      <textarea placeholder="备注" v-model="textvalue"></textarea>
    </div>
    <div class="save" @click="save">保存</div>
    <!-- 联系人弹窗 -->
    <ul class="person_box" v-show="flag">
      <div class="main_box">
        <el-radio-group v-model="radio">
          <el-radio
            :label="item"
            v-for="(item,index) in person_list"
            :key="index"
          >{{item.peopleName}}</el-radio>
        </el-radio-group>
      </div>
      <div class="choose_es">
        <span @click="determine">确认</span>
        <span @click="can_cel">取消</span>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import onduty from '../../assets/server/onduty.js';
import PickerExtend from 'picker-extend';
//loading效果
import { Indicator } from 'mint-ui';
import enterprise from '../../assets/server/enterprise_index.js';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'dynamic'
})
export default class dynamic extends Vue {
  //遮罩
  private flag = false;
  private textvalue = '';
  private radio = '';
  // 时间
  private dateTimePicker: any;
  private value = '';
  private searchTime = '请选择日期';
  //值班类型
  private type_list = [];
  private type_code = '';
  private type_name = '请选择类型';
  //值班人
  private person_id = '';
  private person_name = '请选择值班人';
  private person_list = [];
  //时间选择器
  private showDateTimePicker() {
    if (!this.dateTimePicker) {
      this.dateTimePicker = this.$createDatePicker({
        title: '请选择时间',
        min: new Date(2019, 7, 8),
        max: new Date(2025, 9, 20),
        value: new Date(),
        columnCount: 3,
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
    this.searchTime = selectedText[0] + '-' + selectedText[1] + '-' + selectedText[2];
  }
  private cancelHandle() {
    this.$createToast({
      type: 'correct',
      txt: '已取消日期选择',
      time: 1000
    }).show();
  }
  //值班人选择
  private choose_person() {
    this.flag = true;
  }
  //取消勾选
  private can_cel() {
    this.flag = false;
    (this as any).this.radio = '';
  }
  //确定
  private determine() {
    this.flag = false;
    this.person_name = (this as any).radio.peopleName;
  }
  private save() {
    let that = this as any;
    if (that.searchTime == '请选择日期') {
      that.$toast({ message: '请选择日期!', position: 'bottom', duration: 3000 });
      return;
    }
    if (that.type_code === '') {
      that.$toast({ message: '请选择值班类型!', position: 'bottom', duration: 3000 });
      return;
    }
    console.log(that.radio);
    if (that.radio.length == 0) {
      that.$toast({ message: '请选择值班人!', position: 'bottom', duration: 3000 });
      return;
    }
    let prame = {
      code: that.type_code,
      dutyArrangeId: '',
      dutyDate: that.searchTime,
      groupId: that.radio.groupId,
      orgCode: '',
      personId: that.radio.peopleId,
      personName: that.radio.peopleName
    };
    console.log(prame);
    return new Promise(function(resolve, reject) {
      onduty
        .duty_save(prame)
        .then(function(response) {
          console.log(response);
          if (response.status == 200) {
            (that as any).$toast({ message: '新增排班成功!', position: 'bottom', duration: 3000 });
          } else {
            (that as any).$toast({ message: '新增排班失败!', position: 'bottom', duration: 3000 });
          }
        })
        .catch(function(error) {
          (that as any).$toast({ message: '新增排班失败!', position: 'bottom', duration: 3000 });
          reject(error);
        });
    });
  }
  //获取值班类型
  private duty_type() {
    let that = this;
    return new Promise(function(resolve, reject) {
      onduty
        .duty_type()
        .then(function(response) {
          if (response.data.data) {
            if (response.data.data.length > 0) {
              let arr = [];
              for (var i = 0; i < response.data.data.length; i++) {
                arr.push(response.data.data[i].groupName);
              }
              var mobileSelect4 = new PickerExtend({
                trigger: '#trigger4',
                title: '选择值班类型',
                wheels: [{ data: arr }],
                callback: (a, b) => {
                  console.log(b);
                  that.type_code = a[0];
                  that.type_name = b[0];
                  that.loading();
                  that.duty_person();
                }
              });
            }
          } else {
            (that as any).$toast({ message: '值班类型获取失败!', position: 'bottom', duration: 3000 });
          }
        })
        .catch(function(error) {
          (that as any).$toast({ message: '值班类型获取失败!', position: 'bottom', duration: 3000 });
          reject(error);
        });
    });
  }
  //获取值班人
  private duty_person() {
    let that = this;
    let prame = {
      code: this.type_code,
      orgCode: ''
    };
    console.log(prame);
    return new Promise(function(resolve, reject) {
      onduty
        .duty_person(prame)
        .then(function(response) {
          Indicator.close();
          if (response.data.data) {
            console.log(response);
            if (response.data.data.length > 0) {
              let arr = that.sort(response.data.data, 'peopleId');
              that.person_list = arr;
            }
          } else {
            (that as any).$toast({ message: '值班人失败!', position: 'bottom', duration: 3000 });
          }
        })
        .catch(function(error) {
          Indicator.close();
          (that as any).$toast({ message: '值班人失败!', position: 'bottom', duration: 3000 });
          reject(error);
        });
    });
  }
  //联系人去重
  private sort(arr, name) {
    var hash = {};
    return arr.reduce(function(item, next) {
      hash[next[name]] ? '' : (hash[next[name]] = true && item.push(next));
      return item;
    }, []);
  }
  //加载动画
  private loading() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  }
  private mounted() {
    this.duty_type();
  }
  private created() {}
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
  .list_box {
    width: 100%;
    ul {
      padding: 0 15px;
      background: #fff;
      li {
        height: 45px;
        line-height: 45px;
        width: 100%;
        padding-right: 35px;
        position: relative;
        border-top: 2px solid #eee;
        .openArrow {
          height: 45px;
          width: 35px;
          display: block;
          position: absolute;
          right: 0;
          font-size: 0;
          top: 0;
          background: url('../../assets/images/openArrow.png') no-repeat center;
          background-size: 16px 8px;
        }
        .closeArrow {
          height: 45px;
          width: 35px;
          display: block;
          position: absolute;
          right: 0;
          top: 0;
          background: url('../../assets/images/closeArrow.png') no-repeat center;
          background-size: 16px 8px;
        }
      }
    }
    p {
      height: 50px;
      line-height: 50px;
      span {
        display: inline-block;
        width: 5px;
        height: 25px;
        background: #5d944a;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .bei_zhu {
      background: #fff;
      margin-top: 8px;
      padding: 0 15px;
      border-bottom: 1px solid #eee;
    }
  }
  textarea {
    border: none;
    outline: none;
    width: 100%;
    height: 300px;
    padding: 15px;
    font-size: 15px;
    color: gray;
  }
  .save {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: green;
    font-size: 15px;
    text-align: center;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(1, 1, 1, 0.5);
    border-radius: 15px;
    z-index: 10;
  }
  .person_box {
    width: 300px;
    height: 490px;
    position: absolute;
    border-radius: 10px;
    top: 90px;
    left: 35px;
    z-index: 20;
    background: #fff;
  }
  .main_box {
    width: 100%;
    height: 445px;
    padding: 15px;
    overflow: auto;
    label {
      width: 80%;
      margin: 5px 0;
    }
    li {
      height: 30px;
      line-height: 30px;
    }
  }
  .choose_es {
    width: 100%;
    span {
      display: block;
      width: 48%;
      height: 40px;
      background: green;
      float: left;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      color: #fff;
    }
    span:nth-of-type(2) {
      background: #eee;
      float: right;
      color: black;
    }
  }
}
</style>
