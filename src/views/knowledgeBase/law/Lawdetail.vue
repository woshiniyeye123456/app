<template>
  <div id="contingency-plan">
    <!--头部-->
    <mytitle title="法律详情" :showRight="false" :titleObj="{icon:'more'}" :whetherNotParent="false" ></mytitle>
     <div class="contingency-plan">
    <p>{{datadetail.lawName}}</p>
    <p>{{datadetail.publishOrgName}}</p>
    <p>
      发布时间:
      <span>{{datadetail.publishDate}}</span>
    </p>
    <!-- <p>
      关联事件:
      <span class="link_thing">{{datadetail.expAccidentTypeName}}</span>
    </p> -->
    <ul>
      <p>附件</p>
      <li @click="openFileItem(item)" v-for ="(item,index) in datadetail.attachmentList" :key ="index">
        {{item?item.name:""}}
        <img class="jtIcon" src="@/assets/images/right_jt.png">
      </li>
    </ul>
    <p>编制或修订说明</p>
    <p >
      {{datadetail.content}}
    </p>
  </div>
   </div>
</template>

<script lang="ts">
import plan from '../../../assets/server/knowledge_base.js';
import mytitle from "../../common/mytitle.vue";

import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'ContingencyPlanSearch',
  components:{mytitle}
})
export default class ContingencyPlanSearch extends Vue {
  private datadetail = {
    createTime: '2019-05-01 00:00:00',
    fileList: [
      {
        fileId: '8a83939e6d94be79016d9563055c0160',
        fileName: '国家地震应急预案.doc',
        saveTime: '2019-10-04 14:06:53',
        filepath: 'http://61.183.117.29:18202/gemp_file/8a83939e6d94be79016d9563055c0160.doc'
      }
    ],
    planstructuring: {
      docname: '国家地震应急预案.doc',
      id: '8a83939e6d94be79016d9563055c0160'
    },
    orgCode: '378420e3b12d4b3784525abbc5431666',
    orgName: '指挥中心',
    planId: '8a83939e6d94be79016d9558681b0157',
    planName: '国家地震应急预案',
    updateTime: '2019-10-20 16:15:43',
    notes: '国家地质应急预案_备注'
  };
  //点击附件
  private build() {
    (this as any).$toast({ message: '正在建设中...', position: 'bottom', duration: 3000 });
  }
  private openFileItem(_item){
    console.log(_item)
    let localurl="fg_dlaqjtf.docx"
   window['gsmdp'].openDocument2({
      filePath: localurl,
      success: function(res) {
        console.log('打开文档成功')
      }
    })
  //   let replaceStr="http://172.20.1.17:8868/";
  //   if(_item.url&&_item.url.indexOf(replaceStr)>=0){
  //     _item.url=_item.url.replace(replaceStr,window['g'].IP)
  //   }
  //   console.log(JSON.stringify(_item))
  //  window['gsmdp'].downloadFile({
  //   // 示例 url，并非真实存在
  //   url: _item.url,
  //   success: function(res) {
  //     const filePath = res.tempFilePath
  //     window['gsmdp'].openFile({
  //       filePath: filePath,
  //       success: function(res) {
  //         console.log('打开文档成功')
  //       }
  //     })
  //   }
  // })
  }

  private created() {
    let that=this;
    that.datadetail = (this as any).$route.params.item;
    console.log("this.datadetail==",this.datadetail)
    return new Promise(function(resolve, reject) {
      plan
        .lawDetails(that.datadetail['lawId'])
        .then(function(response) {
          if(response.data.data){
            console.log(response.data.data)
            that.datadetail=response.data.data;
          }
          console.log(response)
          resolve();
        })
        .catch(function(error) {
          // Indicator.close();
          reject(error);
        });
    });
    this.$enJsBack(true)//true 为使用h5返回操作 false为使用android原生
  }
}
</script>

<style scoped lang="scss">
.contingency-plan {
  overflow:auto;
  height: 607px;
  background: #eee;
  > p:nth-of-type(1) {
    width: 100%;
    line-height: 60px;
    height: 55px;
    text-align: center;
    padding: 10px 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 10px;
    font-size: 28px;
    color: blue;
    background: #fff;
    font-weight: bold;
  }
  > p:nth-of-type(2) {
    height: 45px;
    line-height: 36px;
    padding: 0 15px;
    background: #fff;
    margin-bottom: 10px;
    text-align: center;
  }
  > p:nth-of-type(3) {
    height: 35px;
    line-height: 36px;
    padding: 0 15px;
    background: #fff;
    margin-bottom: 10px;
    span {
      margin-left: 20px;
    }
  }
  > p:nth-of-type(4) {
    height: 35px;
    line-height: 36px;
    padding: 0 15px;
    background: #fff;
    margin-bottom: 10px;
        margin-top: 3px;
    span {
      margin-left: 20px;
    }
  }
  > p:nth-of-type(5) {
    // height: 30px;
    line-height: 30px;
    padding: 0 15px;
    margin-top: 10px;
    // color: #999;
    background: #fff;
  }
  > p:nth-of-type(6) {
    min-height: 90px;
    overflow: auto;
    padding: 10px 10px;
    background: #fff;
    margin-bottom: 20px;
  }
  > ul {
    background: #fff;
    > p {
      height: 35px;
      line-height: 36px;
      padding: 0 15px;
      background: #fff;
      color: #8f8f94;
      margin-top: 2px;
    }
    li {
      position: relative;
      height: 40px;
      line-height: 40px;
      padding: 0 40px 0 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #8f8f94;
      .jtIcon {
        position: absolute;
        right: 12px;
        top: 12px;
        width: 16px;
      }
    }
  }
  
    .link_thing {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
}
</style>
