<template>
  <div class="addressAdd">
    <!--头部-->
    <mytitle :title="title" :showRight="true" :titleObj="{icon:'',rightText:'保存'}" :isNotRoute="false" @handleRight="addLinkman" ></mytitle>
    <div class="addressAdd-content">
      <!--头像-->
      <mt-cell title="姓名" class="listBox">
        <!-- <img src="../../../assets/images/danger.png" width="80" height="80"> -->
        <input type="text"  placeholder="请输入姓名" v-model="namemessage">
      </mt-cell>
      <mt-cell class="listBox" title="职位" value="zhangsan">
        <input type="text" placeholder="请输入职位" v-model="jobmessage">
      </mt-cell>
      <mt-cell class="listBox" title="组织机构" value="张三">
        <input type="text" placeholder="请选择组织机构" v-model="organization_name" @click="chooseorg">
      </mt-cell>
      <mt-cell class="listBox" title="手机" value="无">
        <input type="text" placeholder="手机" v-model="phone">
      </mt-cell>
      <mt-cell class="listBox" title="座机" value="中卫市应急局值班人员">
        <input type="text" placeholder="座机" v-model="landline">
      </mt-cell>
      <mt-cell class="listBox" title="联系地址" value="17689876567">
        <input type="text" placeholder="联系地址" v-model="linkAddress">
      </mt-cell>
      <mt-cell class="listBox" title="单位地址" value="兼职人员">
        <input type="text" placeholder="单位地址" v-model="unitAddress">
      </mt-cell> 
      <!-- <mt-field label="姓名" placeholder="请输入姓名" v-model="namemessage"></mt-field>
      <mt-field label="职位" placeholder="请输入职位信息" v-model="jobmessage"></mt-field>
      <mt-field label="组织机构" placeholder="请选择组织机构" v-model="organization_name" @click="chooseorg"></mt-field>
      <mt-field label="手机" placeholder="请输入手机" type="number" v-model="phone"></mt-field>
      <mt-field label="座机" placeholder="请输入座机" type="number" v-model="landline"></mt-field>
      <mt-field label="联系地址" placeholder="请输入联系地址" v-model="linkAddress"></mt-field>
      <mt-field label="单位地址" placeholder="请输入姓名" v-model="unitAddress"></mt-field> -->
    </div>
  </div>
</template>

<script lang="ts">
import linkmail from '../../../assets/server/mailList_index.js';
import mytitle from "../../common/mytitle.vue";
//中文转拼音
import PinYin from '../../../utils/linkmanList/cechange.js';
import { Component, Vue } from 'vue-property-decorator';
import { Field } from 'mint-ui';
@Component({
  name: 'personalInformation',
   components:{
    Field,
    mytitle
  },
  props:{
    linkUser:{}
  }
})
export default class personalInformation extends Vue {
  private title = '编辑联系人';
  private jobmessage = ''; //工作
  private namemessage = ''; //姓名
  private phone = ''; //电话
  private organization_name = ''; //组织机构名称
  private organization_code = ''; //组织机构id
  private personId = '';
  private landline = ''; //座机
  private linkAddress = ''; //联系地址
  private unitAddress = ''; //单位地址
  private dataList = ''; //更改联系人已有的内容
  private totalList = '';
  //选择机构
  private chooseorg() {
    console.log("选择组织机构");
    (this as any).$router.push({
      name: 'chooseorg',
      path: '/chooseorg'
    });
  }
  //保存
  private addLinkman() {
    if (this.jobmessage) {
      if (this.jobmessage.length > 10) {
        (this as any).$toast({ message: '职位信息过长!', position: 'middle', duration: 3000 });
        return;
      }
    }
    if (this.landline) {
      if (this.landline.length > 20) {
        (this as any).$toast({ message: '座机号格式错误!', position: 'middle', duration: 3000 });
        return;
      }
    }
    if (this.unitAddress) {
      if (this.unitAddress.length > 20) {
        (this as any).$toast({ message: '单位地址字数过长!', position: 'middle', duration: 3000 });
        return;
      }
    }
    if ((this as any).linkAddress) {
      if ((this as any).linkAddress.length > 20) {
        (this as any).$toast({ message: '联系地址字数过长!', position: 'middle', duration: 3000 });
        return;
      }
    }
    if (this.namemessage == '') {
      (this as any).$toast({ message: '姓名不能为空', position: 'middle', duration: 3000 });
      return;
    } else {
      let regex = new RegExp('^[\u4e00-\u9fa5]|[a-zA-Z_]$');
      if (!regex.test(this.namemessage)) {
        (this as any).$toast({ message: '姓名请填写有效字符!', position: 'middle', duration: 3000 });
        return;
      } else {
        if (this.namemessage.length > 10) {
          (this as any).$toast({ message: '姓名过长!', position: 'middle', duration: 3000 });
          return;
        }
      }
    }
    if (this.organization_code == '') {
      (this as any).$toast({ message: '组织机构不能为空', position: 'middle', duration: 3000 });
      return;
    }
    if (this.phone == '') {
      (this as any).$toast({ message: '手机号不能为空', position: 'middle', duration: 3000 });
      return;
    } else {
      let tests = /^\d{11}$/;
      if (!tests.test(this.phone)) {
        (this as any).$toast({ message: '手机号格式有误!', position: 'middle', duration: 3000 });
        return;
      }
    }
    let jobArr = this.jobmessage.split(' ');
    localStorage.removeItem('addparma');
    //对接时删除下三行
    (this as any).$toast({ message: '保存成功', position: 'bottom', duration: 3000 });
     (this as any).$router.push({
      path: '/addSearch/linkmanList'
    });
     //对接时解开注释
    // let that = this,
    //   parma = {
    //     contactAddress: that.linkAddress,
    //     dutyNumber: that.landline,
    //     // orgCode: '378420e3b12d4b3784525abbc5431666', // 组织机构
    //     orgCode: that.organization_code,
    //     personId: that.personId,
    //     personJob: that.jobmessage,
    //     personName: that.namemessage, //姓名
    //     telNumber: that.phone, //电话
    //     unitAddress: that.unitAddress,
    //     personJobArr:jobArr
    //   };
    // console.log(parma);
    // console.log(this.organization_code);
    // console.log(this.organization_name);
    // return new Promise(function(resolve, reject) {
    //   linkmail
    //     .editSave(parma)
    //     .then(function(response) {
    //       console.log(response);
    //       if (response.data.data) {
    //         (that as any).$toast({ message: '保存成功', position: 'bottom', duration: 3000 });
    //         //遍历联系人列表
    //         let n = PinYin.chineseToPinYin(that.namemessage.slice(0, 1)).slice(0, 1);
    //         for (let i in (that as any).totalList) {
    //           if ((that as any).totalList[i].name == n) {
    //             for (let j in (that as any).totalList[i].items) {
    //               if ((that as any).totalList[i].items[j].personName === that.namemessage) {
    //                 (that as any).totalList[i].items[j].contactAddress = that.linkAddress;
    //                 (that as any).totalList[i].items[j].personJob = that.jobmessage;
    //                 (that as any).totalList[i].items[j].telNumber = that.phone;
    //                 (that as any).totalList[i].items[j].dutyNumber = that.landline;
    //                 (that as any).totalList[i].items[j].orgCode = that.organization_code;
    //                 (that as any).totalList[i].items[j].orgName = that.organization_name;
    //                 (that as any).totalList[i].items[j].personName = that.namemessage; //姓名
    //                 (that as any).totalList[i].items[j].unitAddress = that.unitAddress;
    //               }
    //             }
    //           }
    //         }
    //         //本地保存
    //         that.$store.dispatch('total_message', that.totalList);
    //       }
    //       that.$router.push({ name: 'linkmanList' });
    //       resolve();
    //     })
    //     .catch(function(error) {
    //       (that as any).$toast({ message: '保存失败', position: 'bottom', duration: 3000 });
    //       reject(error);
    //     });
    // });
  }
  created(){
    this.$enJsBack(true)//true 为使用h5返回操作 false为使用android原生
  }
  private mounted() {
    //获取全部联系人
    this.totalList = this.$store.getters.total_message;
    //获取组织机构
    let linkman_message = this.$store.getters.linkman_message;
    let org_message = this.$store.getters.org_message;
    console.log("要修改的人===>" + linkman_message.orgName);
    console.log(org_message);
    if (org_message) {
      console.log(1111);
      this.organization_name = org_message.orgName == null ? '' : org_message.orgName;
      this.organization_code = org_message.orgCode == null ? '' : org_message.orgCode;
      console.log(this.organization_code);
    } else {
      if (linkman_message.jumptype == 1) {
        console.log(22222);
        this.organization_name = linkman_message.orgName == null ? '' : linkman_message.orgName;
        this.organization_code = linkman_message.orgCode == null ? '' : linkman_message.orgCode;
      } else {
        console.log(33333);
        this.organization_name = linkman_message.orgName == null ? '' : linkman_message.orgName;
        this.organization_code = linkman_message.orgName == null ? '' : linkman_message.orgName;
      }
    }
    if (linkman_message.jumptype == 1) {
      this.namemessage = linkman_message.personName == null ? '' : linkman_message.personName; //姓名
      this.personId = linkman_message.personId == null ? '' : linkman_message.personId;
    } else {
      this.namemessage = linkman_message.personName == null ? '' : linkman_message.personName; //姓名
      this.personId = linkman_message.personName == null ? '' : linkman_message.personName;
    }
    this.jobmessage = linkman_message.personJob == null ? '' : linkman_message.personJob; //工作
    this.phone = linkman_message.telNumber == null ? '' : linkman_message.telNumber; //电话
    this.landline = linkman_message.dutyNumber == null ? '' : linkman_message.dutyNumber; //座机
    this.linkAddress = linkman_message.contactAddress == null ? '' : linkman_message.contactAddress; //联系地址
    this.unitAddress = linkman_message.unitAddress == null ? '' : linkman_message.unitAddress; //单位地址
  }
}
</script>

<style scoped lang="scss">
input {
  border: none;
  outline: none;
}
</style>
    
    
    
    