<template>
  <div id="contingency-plan">
    <!--头部-->
    <mytitle title="案例详情" :showRight="false" :titleObj="{icon:'more'}" :whetherNotParent="false" ></mytitle>
    <div  class="contingency-plan">
      <p class="info_big_title">{{datadetail.caseName}}</p>
      
      <p class="info_detail">
        <span>{{datadetail.typeName}}</span>
        <span>{{datadetail.conResume}}</span>
        <span>
          <div class="">{{datadetail.levelName}}</div>
        </span>
      </p>
      <p class="info_title">
        <span class=""></span> 事故简述:
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.levelName}}</span> 
      </p>
      <p class="info_title">
        <span class=""></span> 预防措施:
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.precaution}}</span> 
      </p>
      <p class="info_title">
        <span class=""></span> 案例文件:
      </p>
      <p class="info_content_p">
        <!-- <span class="info_content_single" v-for="(item,index) in datadetail.attachmentList" :key="index" @click="openFile(item)">
          <img src="../../../assets/images/documentDow.png" alt="" srcset="">{{item.name}}
          </span>  -->
          <span class="info_content_single" @click="openFile()">
            <img src="../../../assets/images/documentDow.png" alt="" srcset="">危险化学品经典案例
          </span>

      </p>
      
<!-- 
      <p>{{datadetail.caseName}}</p>
      <p>{{datadetail.createOrgCodeText}}</p>
      <p>
        发布时间:
        <span>{{datadetail.createTime}}</span>
      </p>
      <p>
        关联事件:
        <span class="link_thing">{{datadetail.expAccidentTypeName}}</span>
      </p>
      <ul>
        <p>附件</p>
        <li @click="build" v-for = "(item,index) in datadetail.fileList " :key = "index">
          {{item?item.fileName:""}}
          <img class="jtIcon" src="@/assets/images/right_jt.png">
        </li>
      </ul>
      <p>编制或修订说明</p>
      <p v-html="datadetail.conresume"></p> -->
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
  };
  //点击附件
  private build() {
    (this as any).$toast({ message: '正在建设中...', position: 'bottom', duration: 3000 });
  }

  private created() {
    this.datadetail = (this as any).$route.params.item;
    console.log("this.datadetail==>",this.datadetail)
    this.details(this.datadetail['caseId'])
    this.$enJsBack(true)//true 为使用h5返回操作 false为使用android原生
    
  }
  private openFile(_item){
    console.log(_item)
    let localurl="al_wxhxpxlal.docx"
   window['gsmdp'].openDocument2({
      filePath: localurl,
      success: function(res) {
        console.log('打开文档成功')
      }
    })
    // let replaceStr="http://172.20.1.17:8868/";
    // if(_item.url&&_item.url.indexOf(replaceStr)>=0){
    //   _item.url=_item.url.replace(replaceStr,window['g'].IP)
    // }
    // console.log(JSON.stringify(_item))
    // window['gsmdp'].downloadFile({
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
    //   },taskComplete(result) {
    //       alert('Download taskComplete: ' + JSON.stringify(result));
    //   }
    // })
  }
  
  private details(_id) {
    let _this=this;
    let id = (this as any).$route.params.item.planId;
    return new Promise(function(resolve, reject) {
      plan
        .caseDetails(_id)
        .then(function(response) {
          console.log("caseDetails==",response);
          if (response.data.data) {
            _this.datadetail=response.data.data
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

<style scoped lang="scss">
.contingency-plan {
  overflow:auto;
  height: 607px;
  background: #eee;
  .info_big_title{
    width: 100%;
    font-size: 17px;
    padding: 5vw 3vw;
    color: deepskyblue;
    text-align: center;
    
  }
  .info_title{
    margin-top: 5px;
    font-weight: bold;
    padding: 0px;
    line-height: 36px;
    span{
      width: 15px;
      height: 15px;
      background-size: 100%;
      background-position-x: 5px;
      display: inline-block;
      border-radius: 10px;
      background-image: url('../../../assets/images/arraw.png')
      
    }
  }
  .info_detail{
    width: 100%;
    span:nth-of-type(1){
      width: 12vw;
      height: 12vw;
      display: inline-block;
      background: red;
      border-radius: 1.33333vw;
      margin: 1.4vw;
      font-size: 4.26667vw;
      padding: 1.3vw;
      color: #fff;
      float: left;
      
    }
    span:nth-of-type(2){
      width: 60vw;
      height: 12vw;
      display: inline-block;
      margin: 1.4vw 0vw;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      float: left;
      padding: 5px 5px;
      font-size: 13px;
    }
    span:nth-of-type(3){
      width: 16vw;
      height: 12vw;
      display: inline-block;
      margin: 1.4vw 0vw;
      div{
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        background: yellow;
      }
    }
  }

  >p{
    //line-height: 36px;
    padding: 0 15px;
    background: #fff;
    margin-bottom: 10px;
    // span {
    //   margin-left: 20px;
    // }
    li{
      font-size: 13px;
      line-height: 25px;
    }
    .info_content_single{
      font-size: 13px;
      line-height: 25px;
      width: 100%;
      display: block;
      img{
        width: 25px;
        vertical-align: middle;
        margin-top: -4px;
        margin-right: 5px;
      }
    }
  }
  .info_content_p{
    padding: 15px 15px;
  }
  // > p:nth-of-type(1) {
  //   width: 100%;
  //   line-height: 60px;
  //   height: 55px;
  //   text-align: center;
  //   padding: 10px 15px;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  //   margin-right: 10px;
  //   font-size: 28px;
  //   color: blue;
  //   background: #fff;
  //   font-weight: bold;
  // }
  // > p:nth-of-type(2) {
  //   height: 45px;
  //   line-height: 36px;
  //   padding: 0 15px;
  //   background: #fff;
  //   margin-bottom: 10px;
  //   text-align: center;
  // }
  // > p:nth-of-type(3) {
  //   height: 35px;
  //   line-height: 36px;
  //   padding: 0 15px;
  //   background: #fff;
  //   margin-bottom: 10px;
  //   span {
  //     margin-left: 20px;
  //   }
  // }
  // > p:nth-of-type(4) {
  //   height: 35px;
  //   line-height: 36px;
  //   padding: 0 15px;
  //   background: #fff;
  //   margin-bottom: 10px;
  //   span {
  //     margin-left: 20px;
  //   }
  // }
  // > p:nth-of-type(5) {
  //   height: 30px;
  //   line-height: 30px;
  //   padding: 0 15px;
  //   margin-top: 10px;
  //   color: #999;
  // }
  // > p:nth-of-type(6) {
  //   min-height: 90px;
  //   overflow: auto;
  //   padding: 10px 10px;
  //   background: #fff;
  //   margin-bottom: 20px;
  // }
  > ul {
    background: #fff;
    > p {
      height: 35px;
      line-height: 36px;
      padding: 0 15px;
      background: #fff;
      color: #8f8f94;
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
