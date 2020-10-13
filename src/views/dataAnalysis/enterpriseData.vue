<template>
  <div id="enterpriseData">
    <DataFirstTitle></DataFirstTitle>
    <div class="enterpriseDataDetail">
      <div class="search">
        <div id="trigger">
          <div class></div>
        </div>
        <div id="jilian">
          <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
        </div>
      </div>
      <div class="banner">
        <ul class="banner-top">
          <li >
            <div class="div_list" v-for="(item,index) in data" :key="index">
              <i>{{item.name}}</i>
              <span>
                {{item.num}}
                <!-- <font>个</font> -->
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="tab">
          <h3>报警数量统计</h3>
          <ul class="tabList">
            <li v-for="(i,n) in tabList" :key="n" @click="changeTab(n)" :class="{active:cur == n}">{{i}}</li>
          </ul>
        </div>
        <div id="line"></div>
        <h3>报警类型统计</h3>
        <div id="pie"></div>
        <ul class="bottomList">
          <!-- <li>
            <p style="color: #ff79eb">25%</p>
            <p>压力报警</p>
          </li>
          <li>
            <p style="color: #ff548e">21%</p>
            <p>温度报警</p>
          </li>
          <li>
            <p style="color: #f6d511">26%</p>
            <p>有毒气体报警</p>
          </li>
          <li>
            <p style="color: #3e9cff">31%</p>
            <p>液位报警</p>
          </li> -->
          <li v-for="(item,index) in typeWarnList" :key="index" :style="{width:findLiWith(item.value)}">
            <p style="color: #ff79eb">{{(item.value/countAll)*100}}%</p>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import * as echarts from 'echarts';
import { Vue, Component } from 'vue-property-decorator';
import industryData from '../../assets/server/industrydata.js';
import DataFirstTitle from './dataCommon/dataFirstTitle.vue';
import PickerExtend from 'picker-extend';

@Component({
  name: 'enterpriseData',
  components: {
    DataFirstTitle
  }
})
export default class enterpriseData extends Vue {
  private data = [];
  private cur = 0;
   private countAll=0;
  private typeWarnList=[];
  private tabList = ['24小时', '7日', '30日'];
  private ec = echarts as any;
  private enterpId="";
  private value = [];
  private options = [
    // {
    //   value: 'zhinan',
    //   label: '临涣焦化',
    //   children: [
    //     {
    //       value: 'shejiyuanze',
    //       label: '临涣焦化股份有限公司'
    //     }
    //   ]
    // },
    // {
    //   value: 'zujian',
    //   label: '全部煤矿'
    // },
    // {
    //   value: 'ziyuan',
    //   label: '全部焦涣'
    // }
  ];

  private mounted() {
    // this.drawLine();
    // this.drawPie();
    var mobileSelect7 = new PickerExtend({
      trigger: '#trigger',
      title: '级联',
      wheels: [
        {
          data: [
            {
              id: '1',
              value: '附近',
              childs: [
                { id: '1', value: '1000米' },
                { id: '2', value: '2000米' },
                { id: '3', value: '3000米' },
                { id: '4', value: '5000米' },
                { id: '5', value: '10000米' }
              ]
            },
            { id: '2', value: '上城区' },
            { id: '3', value: '下城区' },
            { id: '4', value: '江干区' },
            { id: '5', value: '拱墅区' },
            { id: '6', value: '西湖区' }
          ]
        }
      ],
      callback: function(indexArr, data) {
        console.log(data);
      }
    });
    
  }
  private created(){
    this.initHeadData();//初始化接入设备
    this.initData("24小时")
  }
  changeTab(_key){
    console.log("changetab==>"+_key);
    this.cur = _key;
    this.countAll=0;
    this.initData(this.tabList[_key])
    
  }
  initHeadData(){
    let _this=this;
    let parma={"maxMenuCode":"1","TabCode":"03","enterpId":_this.enterpId}
    
    new Promise(function(resolve, reject) {
      industryData
        .enterpriseTypeList({})
        .then(function(response) {
          if(response.status==200){
            _this.handleOptions(response['data'].data)
            //_this.data=response['data'].data;
            console.log(_this.data)
          }
          console.log("enterpriseTypeList",response)
        })
        .catch(function(error) {
          console.log("request error")
        });
    });


  }
  handleOptions(_data){
    let newOptions=[];
    if(_data&&_data.length>0){
       let allSelect={label:"全部",value:""};
        newOptions.push(allSelect);
      _data.forEach((item,index)=>{
        let labelStr=item.name;
        if(labelStr.length>8){
          labelStr=labelStr.substr(0,8)+"...";
        }
        let newObj={label:labelStr,value:item.code,children:[]};
        if(item.listArr&&item.listArr.length>0){
          let childrenArr=[];
          item.listArr.forEach((itemch,indexch)=>{
            let labelchStr=itemch.industryName;
            if(labelchStr.length>8){
              labelchStr=labelchStr.substr(0,8)+"...";
            }
            let newObj={label:labelchStr,value:itemch.code};
            childrenArr.push(newObj)
          })
          newObj.children=childrenArr;
        }
        newOptions.push(newObj)
      })
    }
    this.options=newOptions;
    console.log("_data",_data);
    let arr = [this.options[0].value, this.options[0].children[0].value];
    this.value = arr;
  }
  initData(_day){
    //获取报警数量统计
    let _this = this;
    let parma = {
      maxMenuCode:"1",
      tabCode:"",
      dataType:_day,
      dateType:_day,
      enterpId:this.enterpId
    };
    
    //行业数据报警综合统计
    let p1= new Promise(function(resolve, reject) {
      industryData
        .industryTopTypeData(parma)
        .then(function(response) {
           resolve(response)
        })
        .catch(function(error) {
          reject(error);
        });
    });
    //行业数据企业报警统计
    // let p2 = new Promise(function(resolve, reject) {
    //   industryData
    //     .industryMiddleTypeData(parma)
    //     .then(function(response) {
    //       resolve(response)
    //     })
    //     .catch(function(error) {
    //       reject(error);
    //     });
    // });
    //行业数据企业类型报警统计
    let p3 = new Promise(function(resolve, reject) {
      industryData
        .industrybottomTypeData(parma)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error);
        });
    });
    let parmadata={"maxMenuCode":"1","TabCode":"03","enterpId":_this.enterpId}
    let p4 = new Promise(function(resolve, reject) {
      industryData
        .enterpriseTopTypeData(parmadata)
        .then(function(response) {
          resolve(response)
          
        })
        .catch(function(error) {
          console.log("request error")
        });
    });
    
    Promise.all([p1,p3,p4]).then(function (results) {
        if(results[0]['status']==200){
           _this.drawLine(results[0]['data'].data);
        }
        if(results[1]['status']==200){
          _this.drawPie(results[1]['data'].data);
        }
        if(results[2]['status']==200){
            _this.data=results[2]['data'].data;
            console.log(_this.data)
            console.log("enterpriseTopTypeData",results[2]['data'])
        }
        // if(results[2]['status']==200){
        //   _this.drawBottomChart(results[2]['data'].data);
        // }
        console.log("getlineMonitorStatistics==>",results)
        
      }).catch(function (status) {
        
         
      });

  }
  findLiWith(value){
    console.log(value,this.countAll)
    return ((value/this.countAll)*100)+"%";
  }
  private drawLine(_data) {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.ec.init(document.getElementById('line'));
    let xAxisData=[];
    let seriesData=[];
    let warnAllNum=0;
    console.log("topchart==>",_data)
    if(_data.data){
      xAxisData=_data.time;
      seriesData=_data.data;
      seriesData.forEach((item,index)=>{
        try {
          warnAllNum+=parseInt(item);
        } catch (error) {
        }
      })
    }
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        formatter: '{b} <br/> {c} 次',
        backgroundColor: 'rgba(0,0,0,0.7)',
        textStyle: {
          color: '#ff686c'
        }
      },
      grid: {
        top: '30%',
        bottom: '15%'
      },
      title: {
        left: 'center',
        text: warnAllNum,
        subtext: '报警总数量（次）',
        top: '3%',
        textStyle: {
          color: '#ff686c',
          fontSize: 24
        },
        subtextStyle: {
          color: '#333',
          fontSize: 14
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#999'
        }
      },
      yAxis: {
        name: '(次)',
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#999'
        }
      },
      series: [
        {
          data: seriesData,
          type: 'line',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#ffc6c8' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#ffedee' // 100% 处的颜色
                }
              ]
            }
          },
          smooth: true,
          lineStyle: {
            color: '#ff6c70'
          }
        }
      ]
    });
  }
  private drawPie(_data) {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.ec.init(document.getElementById('pie'));
    let seriesArr=[];
    let maxNum=0;
    console.log("drawBottomChart==>",_data)
    if(_data&&_data.length>0){
      seriesArr=_data;
    }
    this.typeWarnList=seriesArr;
    this.typeWarnList.forEach((item,index)=>{
      console.log(item.value)
      if(item.value){
        this.countAll+=parseInt(item.value);
      }
    })
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        show: false
      },
      title: {
        left: 'center',
        text: seriesArr.length,
        subtext: '报警类型',
        top: '35%',
        textStyle: {
          color: '#ff686c',
          fontSize: 24
        },
        subtextStyle: {
          color: '#333'
        }
      },
      series: [
        {
          name: '报警类型',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ['#3e9cff', '#f6d511', '#ff548e', '#ff79eb'],
          data: seriesArr
        }
      ]
    });
  }
  private handleChange(value) {
    console.log(value);
    if(value&&value.length>1){
      this.enterpId=value[1];
    }else{
      this.enterpId="";
    }
    this.initData(this.tabList[this.cur])
    //this.initHeadData();
  }
}
</script>
<style lang="css" scoped>

.pickerExtend {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.pickerExtend .grayLayer {
  position: absolute;
  top: 100px;
  height: 100%;
}
.pickerExtend .content {
  position: absolute;
  top: 100px;
  height: 260px;
}
</style>
<style lang="scss" scoped>
#enterpriseData{
  background: #fff;
}
.enterpriseDataDetail {
   height:calc( 100% - #{$headerHeight} );
   overflow: auto;
  .content {
    padding: 0 15px;
  }
}
.search {
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid #dddddd;
  #trigger {
    font-weight: bold;
  }
}
h3 {
  width: 100%;
  height: 36px;
  line-height: 36px;
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
}
/*企业数据得详情*/
.banner-top {
  background: url('../../assets/images/enterprise/enter-top-bg.png') no-repeat;
  height: 40px;
  width: 100%;
  .div_list{
    float: left;
    width: 50%;
    i,
    span {
      float: left;
      width: 50%;
      text-align: center;
      line-height: 40px;
    }
  }
  
  span {
    color: #0bb20c;
  }
}
/*tab切换得样式*/
.tabList {
  display: flex;
  justify-content: center;
  border: 1px solid #cfcfcf;
  border-left: none;
  height: 32px;
  li {
    height: 30px;
    width: 33.33%;
    /*margin: 5px 5px;*/
    text-align: center;
    line-height: 32px;
    color: #333;
    font-size: 16px;
    border-left: 1px solid #cfcfcf;
  }
  .active {
    background-color: #0bb20c;
    color: #fff;
  }
}
/*echarts图得样式==============*/
#line {
  width: 100%;
  height: 260px;
}
#pie {
  width: 100%;
  height: 200px;
}
.bottomList {
  width: 100%;
  border-top: 1px solid #dddddd;
  li {
    border-left: 1px solid #dddddd;
    width: 25%;
    height: 68px;
    float: left;
    text-align: center;
    p:first-of-type {
      height: 40px;
      line-height: 40px;
      font-size: 18px;
    }
    p:last-of-type {
      height: 20px;
      line-height: 20px;
      color: #999;
      font-size: 12px;
    }
  }
  li:first-of-type {
    border-left: none;
  }
}
</style>
