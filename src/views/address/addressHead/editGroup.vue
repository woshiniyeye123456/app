<template>
  <div id="addGroup">
    <div class="addGroupTop">
      <div class="addGroup_back" @click="goBack"></div>
      <span>编辑群组</span>
      <span
        style="float: right;"
        v-show="$store.state.addList.length > 0"
        @click="uploadAdd()"
      >确定({{ $store.state.addList.length }})</span>
    </div>
    <div class="addGroupBox">
      <div class="addBoxTitle">
        <span>*群组名称：</span>
        <input type="text" placeholder="请输入群组名称" maxlength="12" v-model="groupName"/>
      </div>
      <div class="addBoxList">
        <span v-for="(item, index) in $store.state.addList" :key="index" @click="deletePerson(item)">{{ item.personName }}</span>
      </div>
    </div>
    <div class="addGroupTitle">
      <span :class="{lastSpan : $store.state.addGroupTitle.length == 0}" @click="goChose(-1)">组织机构</span>
      <span
        v-for="(item, index) in $store.state.addGroupTitle"
        :key="index"
        :class="{lastSpan : $store.state.addGroupTitle.length == (index + 1)}"
        @click="goChose(index, item)"
      >＞ {{ item.orgname }}</span>
    </div>
    <p class="addGroupline"></p>
    <div class="haveData" v-if="mechanismList.length + peopleList.length != 0">
      <div class="addGroupMain" >
        <!-- <div class="mechanism">
            测试组织样式
            <img class="jtIcon" src="@/assets/images/right_jt.png">
        </div>-->
        <!-- <div class="people">
            <div class="firstWord">测</div>
            <div class="peopleTop">测试联系人样式</div>
            <el-checkbox  @click.stop.native class="peopleCheck"></el-checkbox>
            <div class="peopleBottom">指挥中心/应急部值班员</div>
        </div>-->
        <div class="mechanism" v-for="(item, index) in mechanismList" :key="index" @click="rowClick(1, item)">
          {{ item.orgname }}
          <img class="jtIcon" src="@/assets/images/right_jt.png" />
        </div>
        <div class="people" v-for="(item, index) in peopleList" :key="index" @click="rowClick(2, item)">
          <div class="firstWord">{{ item.personName.substr(0, 1) }}</div>
          <div class="peopleTop">{{ item.personName }}</div>
          <el-checkbox class="peopleCheck" @click.stop.native @change="checkPeople(item)" v-model="item.checked"></el-checkbox>
          <div class="peopleBottom">{{ "所属组织" }}</div>
        </div>
      </div>
    </div>
     <div>
      <confirm v-model="showConfirm"
      title="删除联系人"
      confirm-text="确定"
      cancel-text="取消"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
      <p style="text-align:center;">确定删除此联系人吗？</p>
      </confirm>
    </div>
    </div>
   
</template>

<script lang='ts'>
import groupServer from '../../../assets/server/organization.js';
import { Vue, Component } from 'vue-property-decorator';
import useServer from '../../../assets/server/useGroup.js';
import {Confirm,Popup} from 'vux'
@Component({
  name: 'addGroup',
  components:{
    Confirm
  },
  props:{
      groupName:String,
      perTypeId:String
  }
})
export default class addGroup extends Vue {
  private groupName = "";
  private mechanismList = [];
  private peopleList = [];
  private groupID = "";
  private showConfirm = false;
  private deleteItem = {};
  private deletePersonArr = [];
  private created() {
    this.groupName = this['groupName'];
    this.groupID = this['perTypeId'];
    console.log("groupName =====> ",this.groupName);
    this.getGroupPersonList();
    this.getIndexGroup();
    this.$enJsBack(true)//true 为使用h5返回操作 false为使用android原生
  }
  private mounted(){
    window['GoBack']=this.goBack;
  }
  // 封装请求数据方法
  private getData (parma) {
    let that = this;
    console.log("parma===>" + parma);
    return new Promise(function(resolve, reject) {
      groupServer
        .getAllGroup(parma)
        .then(function(response) {
          // console.log(response.data.data);
          if (response.data.data) {
            that.mechanismList = response.data.data.addressorglist;
            that.peopleList = response.data.data.addressperson;
            // 存在人员检测选中状态
            if (that.$store.state.addList.length != 0) {
              for (let add of that.$store.state.addList) {
                for (let people of that.peopleList) {
                  if (people.personId == add.personId) {
                    people.checked = true;
                  }
                }
              }
            }
          }
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
  // 初始化列表
  private getIndexGroup() {
    let parma = {
    };
    this.getData(parma);
  }
  // 顶部节点点击事件
  private goChose(index, item) {
    let parma = {
      // userid: '2c91fad169fc63320169fc6d7d76000c',
      // orgcode: '320281003001009',
      // parentid: ''
    };
    // if (index == -1) {
    //   parma.parentid = '-1';
    //   this.$store.state.addGroupTitle = [];
    // } else {
    //   parma.parentid = item.orgcode;
    //   this.$store.state.addGroupTitle = this.$store.state.addGroupTitle.slice(0, index + 1);
    // }
    this.getData(parma);
  }
  // 列表点击事件
  private rowClick(type, item) {
    let parma = {
      // userid: '2c91fad169fc63320169fc6d7d76000c',
      // orgcode: '320281003001009',
      // parentid: item.orgcode
    };
    if (type == 1) {
      this.$store.state.addGroupTitle.push(item);
      this.getData(parma);
    } else {
      //判断是否为常用群组模块
      item.jumptype = 1;
      //跳转
      this.$router.push({
        path: '/linkmanDetail',
        name: 'linkmanDetail',
        params: {
          item: item,
        }
      });
    }
  }
  // 联系人多选框事件
  private checkPeople(item) {
    var state = (event.currentTarget as any).checked;
    // console.log(state);
    let existence = false;
    if (state) {
      for (let value of this.$store.state.addList) {
        if (value.personId == item.personId) {
          existence = true;
        }
      }
      if (!existence) {
        this.$store.state.addList.push(item);
      }
    } else {
      for (var i = 0; i < this.$store.state.addList.length; i++) {
        if (this.$store.state.addList[i].personId == item.personId) {
          this.$store.state.addList.splice(i, 1);
          break;
        }
      }
    }
  }
  // 确定添加新分组;
  private uploadAdd() {
    if (this.groupName == "") {
      (this as any).$toast({ message: '请输入群组名称', position: 'bottom', duration: 2000 });
    } else {
      this.uploadEditGroupInfo();
      
    }
  }
  //编辑完成后上传
  private uploadEditGroupInfo(){
    let that = this;
    let parma = {
      "perTypeId": that.groupID,
      "typeName": that.groupName
    }
    return new Promise(function(resolve, reject) {
    useServer
      .editGroupName(parma)
      .then(function(response) {
        if (response.data.status == 200) {
          console.log("修改成功");
          that.goBack();
          //  (this as any).$toast({ message: '请输入群组名称', position: 'bottom', duration: 2000 });
        }
        resolve();
      })
      .catch(function(error) {
        reject(error);
      });
    });
  }
  private getGroupPersonList(){
      let that =  this;
      let parma = {
        perTypeId: that.groupID
      };
      return new Promise(function(resolve, reject) {
        useServer
          .getPeople(parma)
          .then(function(response) {
            // console.log(response);
            if (response.data.data) {
              that.$store.state.addList = response.data.data;
            }
            resolve();
          })
          .catch(function(error) {
            reject(error);
          });
      });
  }
  deletePerson(item){
    this.deleteItem = item;
    this.showConfirm = true;
  }
  onCancel(){

  }
  onConfirm(){
    let that = this;
    that.$store.state.addList = that.$store.state.addList.filter((item)=>{
      return item !== that.deleteItem;
    });
    that.uploadDeletePerson(that.deleteItem['personId']);
  }
  private uploadDeletePerson(personID){
    let that = this;
    let parma = {
      "perTypeId": that.groupID,
      "personId": personID
    }
    return new Promise(function(resolve, reject) {
    useServer
      .deletePersons(parma)
      .then(function(response) {
        if (response.data.status == 200) {
          console.log("删除成功");
          //  (this as any).$toast({ message: '请输入群组名称', position: 'bottom', duration: 2000 });
        }
        resolve();
      })
      .catch(function(error) {
        reject(error);
      });
    });
  }
  private goBack(){
      this.$emit('close');
  }
}
</script>
<style lang="scss" scoped>
#addGroup {
  width: 100%;
  height: 100%;
  background: #ffffff;
  .addGroupTop {
    width: 100%;
    height: 60px;
    background: url('../../../assets/images/dataTitle.png') no-repeat 50% center;
    background-size: 100% 100%;
    line-height: 60px;
    font-size: 18px;
    color: #fff;
    padding: 0 15px 0 50px;
    .addGroup_back {
      width: 30px;
      height: 26px;
      background: url('../../../assets/images/whiteBack.png') no-repeat 50% center;
      background-size: 100% 100%;
      position: absolute;
      top: 18px;
      left: 12px;
    }
  }
  .addGroupBox {
    width: 100%;
    height: 120px;
    line-height: 120px;
    padding: 0 15px;
    .addBoxTitle {
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: #000;
      font-size: 16px;
      input {
        border: none;
        font-size: 15px;
        outline: none;
        width: calc(100% - 130px);
      }
    }
    .addBoxList {
      width: 100%;
      height: 80px;
      line-height: 75px;
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: auto;
      span {
        padding: 0 5px;
        height: 30px;
        line-height: 29px;
        display: inline-block;
        margin-right: 20px;
        border: 1px solid #6fa55b;
        border-radius: 5px;
        color: #000;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .addGroupTitle {
    width: 94%;
    height: 43px;
    line-height: 40px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0 3%;
    span {
      font-size: 14px;
      font-weight: bold;
      color: #67a551;
    }
    .lastSpan {
      color: #000;
    }
  }
  .addGroupline {
    width: 100%;
    border-bottom: 3px solid #dcdddc;
  }
  .haveData {
    width: 100%;
    height: calc(100% - 228px);
    overflow-x: hidden;
    overflow-y: scroll;
    .addGroupMain {
      width: 100%;
      background: #ffffff;
      .mechanism {
        width: 100%;
        border-bottom: 1px solid #dcdddc;
        height: 45px;
        line-height: 44px;
        font-size: 14px;
        font-weight: bold;
        padding: 0 15px;
        .jtIcon {
          float: right;
          width: 14px;
          height: 14px;
          margin-top: 12px;
        }
      }
      .people {
        width: 100%;
        height: 60px;
        padding: 10px 15px;
        border-bottom: 1px solid #dcdddc;
        div {
          float: left;
        }
        .firstWord {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #dcdddc;
          margin-right: 15px;
          line-height: 40px;
          text-align: center;
        }
        .peopleTop,
        .peopleBottom {
          width: calc(100% - 150px);
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
        .peopleBottom {
          color: #dcdddc;
        }
        .peopleCheck {
          float: right;
          width: 20px;
          height: 20px;
          margin: 10px 0;
        }
      }
    }
  }
  .noMainData {
    width: 100%;
    height: 300px;
    background: url('../../../assets/images/noData.png') no-repeat 50% center;
    background-size: 60% 60%;
  }
}
</style>
