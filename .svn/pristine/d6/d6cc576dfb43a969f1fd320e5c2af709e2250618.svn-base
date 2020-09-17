<template>
  <div class="addressAdd">
    <!--头部-->
    <mt-header :title="title" class="commonHeader">
      <!--<router-link to="/addSearch" >-->
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <!--</router-link>-->
    </mt-header>
    <div id="organization">
      <div class="organizationTitle">
        <span :class="{lastSpan : titleList.length == 0}" @click="goChose(-1)">组织机构</span>
        <span
          v-for="(item, index) in titleList"
          :key="index"
          :class="{lastSpan : titleList.length == (index + 1)}"
          @click="goChose(index, item)"
        >＞ {{ item.orgName }}</span>
      </div>
      <p class="organizationline"></p>
      <div class="haveData" v-if="mainList.length != 0">
        <div class="organizationMain" v-for="(item, index) in mainList" :key="index">
          <!-- <div class="mechanism">
            测试组织样式
            <img class="jtIcon" src="@/assets/images/right_jt.png">
          </div>-->
          <!-- <div class="people">
            <div class="firstWord">测</div>
            <div class="peopleTop">测试联系人样式</div>
            <div class="telIcon"></div>
            <div class="peopleBottom">指挥中心/应急部值班员</div>
          </div>-->
          <div class="mechanism" v-if="isMechanism" @click="choose_code(item)">
            <div>{{ item.orgName }}</div>
            <div @click.stop="rowClick(item, index)">
              <img class="jtIcon" src="@/assets/images/right_jt.png">
            </div>
          </div>
          <div class="people" v-if="!isMechanism">
            <div class="firstWord">{{ item.name.substr(0, 1) }}</div>
            <div class="peopleTop">{{ item.name }}</div>
            <div class="telIcon" v-if="item.phone != ''"></div>
            <div class="peopleBottom">{{ item.group }}</div>
          </div>
        </div>
      </div>
      <div class="noMainData" v-else-if="mainList.length == 0"></div>
    </div>
  </div>
</template>

<script lang="ts">
import linkmail from '../../../assets/server/mailList_index.js';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'chooseorg'
})
export default class chooseorg extends Vue {
  private title = '请选择组织机构';
  private titleList = [];
  private initialList = [];
  private mainList = [];
  private isMechanism = true;
  private axiosData1 = [
    {
      name: '一级节点1',
      id: '1',
      type: '1',
      cengji: '1'
    },
    {
      name: '一级节点2',
      id: '2',
      type: '1',
      cengji: '1'
    },
    {
      name: '一级节点3',
      id: '3',
      type: '1',
      cengji: '1'
    }
  ];
  private axiosData2 = [
    [
      {
        name: '1二级节点1',
        id: '1.1',
        type: '1',
        cengji: '2'
      },
      {
        name: '1二级节点2',
        id: '1.2',
        type: '1',
        cengji: '2'
      },
      {
        name: '1二级节点3',
        id: '1.3',
        type: '1',
        cengji: '2'
      }
    ],
    [
      {
        name: '2二级节点1',
        id: '2.1',
        type: '1',
        cengji: '2'
      },
      {
        name: '2二级节点2',
        id: '2.2',
        type: '1',
        cengji: '2'
      },
      {
        name: '2二级节点3',
        id: '2.3',
        type: '1',
        cengji: '2'
      }
    ],
    [
      {
        name: '3二级节点1',
        id: '3.1',
        type: '1',
        cengji: '2'
      },
      {
        name: '3二级节点2',
        id: '3.2',
        type: '1',
        cengji: '2'
      },
      {
        name: '3二级节点3',
        id: '3.3',
        type: '1',
        cengji: '2'
      }
    ]
  ];
  private axiosData3 = [
    [
      {
        name: '杨坤',
        id: '1.1.1',
        type: '2',
        group: '指挥中心/应急部值班员',
        tel: '13000000000',
        phone: '123456',
        cengji: '3'
      },
      {
        name: '崔文治',
        id: '1.1.2',
        type: '2',
        group: '指挥中心/测试长度溢出/测试长度溢出/测试长度溢出/测试长度溢出',
        tel: '13111111111',
        phone: '',
        cengji: '3'
      },
      {
        name: '张天',
        id: '1.1.3',
        type: '2',
        group: '指挥中心/负责人',
        tel: '13222222222',
        phone: '',
        cengji: '3'
      }
    ],
    [
      {
        name: '2三级节点1',
        id: '2.1.1',
        type: '1',
        cengji: '3'
      },
      {
        name: '2三级节点2',
        id: '2.1.2',
        type: '1',
        cengji: '3'
      },
      {
        name: '2三级节点3',
        id: '2.1.3',
        type: '1',
        cengji: '3'
      }
    ],
    []
  ];
  private mounted() {
    // this.mainList = this.axiosData1;
    this.getIndexGroup();
  }
  // 顶部节点点击事件
  private goChose(index, item) {
    this.mainList = [];
    // if (item.isleaf == ) {

    // }
    if (index == -1) {
      this.titleList = [];
      for (let value of this.initialList) {
        if (value.parentCode == 0) {
          this.mainList.push(value);
        }
      }
    } else {
      this.titleList = this.titleList.slice(0, index + 1);
      for (let value of this.initialList) {
        if (value.parentCode == item.orgCode) {
          this.mainList.push(value);
        }
      }
    }
  }
  // 列表点击事件
  private rowClick(item, index) {
    if (item.isLeaf == 0) {
      this.mainList = [];
      this.titleList.push(item);
      for (let value of this.initialList) {
        if (value.parentCode == item.orgCode) {
          this.mainList.push(value);
        }
      }
    }
  }
  //选择机构点击事件
  private choose_code(data) {
    console.log(data);
    this.$store.dispatch('org_messageadd', data);
    this.$router.go(-1);
  }
  private getIndexGroup() {
    let that = this;
    let parma = {
      orgCode: '0'
    };
    return new Promise(function(resolve, reject) {
      linkmail
        .getAllGroup(parma)
        .then(function(response) {
          if (response.data.data) {
            that.initialList = response.data.data;
            // console.log(that.initialList);
            for (let value of that.initialList) {
              // if (value.org_name == '指挥中心') {
              //   console.log(value);
              // }
              // if (value.org_name == '国家部委') {
              //   console.log(value);
              // }
              if (value.parentCode == 0) {
                that.mainList.push(value);
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
}
</script>
<style lang="scss" scoped>
#organization {
  width: 100%;
  height: calc(100% - 102px);
  .organizationTitle {
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
  .organizationline {
    width: 100%;
    border-bottom: 3px solid #dcdddc;
  }
  .haveData {
    width: 100%;
    height: calc(100% - 48px);
    overflow-x: hidden;
    overflow-y: scroll;
    .organizationMain {
      width: 100%;
      background: #ffffff;
      .mechanism {
        width: 100%;
        border-bottom: 1px solid #dcdddc;
        height: 45px;
        line-height: 44px;
        font-size: 14px;
        font-weight: bold;
        padding: 0 0 0 15px;
        display: flex;
        justify-content: space-around;
        div:nth-of-type(1) {
          width: 300px;
        }
        div:nth-of-type(2) {
          width: 50px;
          padding: 0 15px 0 0;
        }
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
        .telIcon {
          width: 30px;
          height: 30px;
          background: url('../../../assets/images/telIcon.jpg') no-repeat 50% center;
          background-size: 100% 100%;
          float: right;
          margin: 5px;
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

    
    
    
    