<template>
  <div id="contingency-plan">
    <!--头部-->
    
    <mytitle title="知识详情" :showRight="false" :titleObj="{icon:'more'}" :whetherNotParent="false" ></mytitle>
    <div v-if="datadetail.qtype=='0'" class="contingency-plan">
      <p class="info_title">
        <span class=""></span> 基本信息
      </p>
      <p>
        <ul>
          <li>别名:<span>{{datadetail.msdsTitle}}</span></li>
          <li>cas号:<span>{{datadetail.casno}}</span></li>
          <li>是否重点监管：<span>{{datadetail.supervision}}</span></li>
        </ul>
      </p>
      <p class="info_title">
        <span class=""></span> 危险性类别
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.hazardClass}}</span> 
      </p>
      <p class="info_title">
        <span class=""></span> 危害描述
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.hazardDesc}}</span> 
      </p>
      <p class="info_title">
        <span class=""></span> 成分组成信息
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.component}}</span> 
      </p>
      <p class="info_title">
        <span class=""></span> 急救措施
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.emergency}}</span> 
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
    <div v-if="datadetail.qtype=='1'" class="contingency-plan">
      <p class="info_title">
        <span class=""></span> 基本信息
      </p>
      <p>
        <ul>
          <li>反应类型:<span>{{datadetail.reacTypeName}}</span></li>
          <li>重点监管单元：<span>{{datadetail.monitorUnit}}</span></li>
        </ul>
      </p>
      <p class="info_title">
        <span class=""></span> 工艺简介
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.processDesc}}</span> 
      </p>
      <p class="info_title">
        <span class=""></span>  工艺危险特点
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.hazardChara}}</span> 
      </p>
      <p class="info_title">
        <span class=""></span> 典型工艺
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.process}}</span> 
      </p>
      <p class="info_title">
        <span class=""></span> 重点监控工艺参数
      </p>
      <p class="info_content_p">
        <span class="info_content_single">{{datadetail.processParam}}</span> 
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
    // createTime: '2019-05-01 00:00:00',
    // fileList: [
    //   {
    //     fileId: '8a83939e6d94be79016d9563055c0160',
    //     fileName: '国家地震应急预案.doc',
    //     saveTime: '2019-10-04 14:06:53',
    //     filepath: 'http://61.183.117.29:18202/gemp_file/8a83939e6d94be79016d9563055c0160.doc'
    //   }
    // ],
    // planstructuring: {
    //   docname: '国家地震应急预案.doc',
    //   id: '8a83939e6d94be79016d9563055c0160'
    // },
    // orgCode: '378420e3b12d4b3784525abbc5431666',
    // orgName: '指挥中心',
    // planId: '8a83939e6d94be79016d9558681b0157',
    // planName: '国家地震应急预案',
    // updateTime: '2019-10-20 16:15:43',
    // notes: '国家地质应急预案_备注'
  };
  //点击附件
  private build() {
    (this as any).$toast({ message: '正在建设中...', position: 'bottom', duration: 3000 });
  }
   private openFileItem(_item){
    console.log(_item)
   window['gsmdp'].downloadFile({
    // 示例 url，并非真实存在
    url: _item.url,
    success: function(res) {
      const filePath = res.tempFilePath
      window['gsmdp'].openFile({
        filePath: filePath,
        success: function(res) {
          console.log('打开文档成功')
        }
      })
    }
  })
  }

  private created() {
    
    this.datadetail = (this as any).$route.params.item;
    console.log("datadetail==>",this.datadetail)
    this.$enJsBack(true)//true 为使用h5返回操作 false为使用android原生

  }
}
</script>

<style scoped lang="scss">
.contingency-plan {
  overflow:auto;
  height: 607px;
  background: #eee;
  .info_title{
    margin-top: 5px;
    font-weight: bold;
    padding: 0px;
    line-height: 36px;
    span{
      width: 10px;
      height: 10px;
      display: inline-block;
      border-radius: 10px;
      background: red;
      margin: 0px 0px 2px 10px;
      
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
