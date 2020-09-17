<template>
  <div id="nonCoalMine">
    <ul class="nonCoalMine_topList">
      <!-- <li v-for="(item,index) in tableArr" :key="index">
        <div>{{item?item.name:"--"}}</div>
        <div>{{item?comput(index,item.num):"--"}}</div>
      </li> -->
      <li>
        <div>监测管网</div>
        <div>{{pipelineCount}}公里</div>
      </li>
      <li>
        <div>监测设备</div>
        <div>{{equipCount}}个</div>
      </li>
      <li>
        <div>正常工作比例</div>
        <div>{{normalRate}}%</div>
      </li>
    </ul>
    <div class="nonCoalMine_chartBox">
      <div class="chartBox_firstChart">
        <p class="chartBox_title">报警数量统计</p>
        <ul class="firstChart_timeList">
          <li
            v-for="(value, key) in timeList"
            :key="key"
            @click="cur = key"
            :class="{timeList_active:cur == key}"
          >{{ value }}</li>
        </ul>
        <div id="chartBox_top" class="chartBox_top"></div>
      </div>
      <div class="chartBox_secondChart">
        <p class="chartBox_title">报警企业统计</p>
        <div id="chartBox_center" class="chartBox_center"></div>
      </div>
      <div class="chartBox_thirdChart">
        <p class="chartBox_title">报警类型统计</p>
        <div id="chartBox_bottom" class="chartBox_bottom"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import * as echarts from 'echarts';
import industryData from '../../../assets/server/industrydata.js';  
import { Vue, Component, Watch } from 'vue-property-decorator';
@Component({
  name: 'nonCoalMine'
})
export default class nonCoalMine extends Vue {
  @Watch('cur', { immediate: true, deep: true })
  onCurChanged(val) {
    if(val==1){
       this.initData("30");
    }else{
      this.initData("7");
    }
  }
  private tableArr = [];
  private ec = echarts as any;
  private cur = 0;
  private drawTopList={
    "2020-02-15": 15,
    "2020-02-18": 17,
    "2020-02-19": 10,
    "2020-02-20": 7,
    "2020-02-21": 7,
    "2020-02-22": 6,
    "2020-02-23": 7,
    "2020-02-24": 5,
    "2020-02-25": 10,
    "2020-02-26": 9,
    "2020-02-27": 7,
    "2020-02-28": 5,
    "2020-02-29": 6,
    "2020-03-01": 6,
    "2020-03-02": 9,
    "2020-03-03": 24};
  private companyAlarm={};
  private typeAlarm={};
  private equipCount=0;//监测设备
  private pipelineCount=0;//监测管网
  private normalRate=0;//正常工作比
  private timeList = ['7天', '30天'];
  created(){
    console.log("lifeLine 统计")
    let _this=this;
    //_this.initData("30");
  }
  private mounted() {
    //this.drawTopChart();
    // this.drawCenterChart();
    // this.drawBottomChart();
    // this.tabledata();
  }
  
  initData(_day){
    //获取报警数量统计
    let _this = this;
    // let parma = {
    //   day:_day,
    //   orgCode:this.$store.state.userInfo.orgCode,
    //   userId:this.$store.state.userInfo.userId,
    // };
    let parma = {
      day:_day
    };
    //生命线报警综合统计
    // let p1= new Promise(function(resolve, reject) {
    //   industryData
    //     .industryLifeWarnNum(parma)
    //     .then(function(response) {
    //        resolve(response)
    //     })
    //     .catch(function(error) {
    //       reject(error);
    //     });
    // });
    //获取头部接口数据
    let p2 = new Promise(function(resolve, reject) {
      industryData
        .industryLifeData(parma)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error);
        });
    });
    //获取报警单位接口
    // let p3 = new Promise(function(resolve, reject) {
    //   industryData
    //     .industryLifecompanyData(parma)
    //     .then(function(response) {
    //       resolve(response)
    //     })
    //     .catch(function(error) {
    //       reject(error);
    //     });
    // });
    //获取报警类型接口
    // let p4 = new Promise(function(resolve, reject) {
    //   industryData
    //     .industryLifeWarnTypeData(parma)
    //     .then(function(response) {
    //       resolve(response)
    //     })
    //     .catch(function(error) {
    //       reject(error);
    //     });
    // });
    Promise.all([p2]).then(function (results) {
        let resultsObj=results[0];
        console.log("getLifelineMonitorStatistics==>",resultsObj)
        if(resultsObj==null||resultsObj['status']!=200){
          console.log("处理异常");
        }else{
          console.log("data==>",resultsObj['data'])
          let dataObj=resultsObj['data'].data;
          console.log(dataObj)
          _this.drawTopList=dataObj.dateAlarm;
          _this.drawTopChart();
          _this.companyAlarm=dataObj.companyAlarm;
          _this.typeAlarm=dataObj.typeAlarm;
          _this.pipelineCount=dataObj.pipelineCount;
          _this.normalRate=dataObj.normalRate;
          _this.equipCount=dataObj.equipCount;
          _this.drawCenterChart();
          _this.drawBottomChart();
        }
      }).catch(function (status) {
        
         
      });

  }
    private comput(index, data) {
    if (index == 0 || index == 1){
      data = data + '公里';
    }
    return data;
  }
    //获取列表数据
  private tabledata() {
    let that = this;
    let parma = {
      maxMenuCode: 0,
      TabCode: 3,
      enterpId: ''
    };
    return new Promise(function(resolve, reject) {
      industryData
        .industrytable(parma)
        .then(function(response) {
          if (response.data.data) {
            // that.tableArr = response.data.data;
            // 中卫演示数据
            that.tableArr = response.data.data.getStatiscalInfo;
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
  private drawTopChart() {
    let myChart = this.ec.init(document.getElementById('chartBox_top'));
    let _this=this;
    let xAxisData=[];
    let seriesData=[];
    let warnAllNum=0;
    for (let key in _this.drawTopList) {
      xAxisData.push(key);
      seriesData.push(_this.drawTopList[key])
      if(_this.drawTopList[key]){
        warnAllNum+=parseInt(_this.drawTopList[key]);
      }
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
        top: '5%',
        textStyle: {
          color: '#ff686c'
        },
        subtextStyle: {
          color: '#333'
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
          data:seriesData,
          type: 'line',
          symbolSize: 0,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: '#fff' // 0% 处的颜色
                },
                {
                  offset: 0,
                  color: '#3b21ed' // 100% 处的颜色
                }
              ]
            }
          },
          // smooth: true,
          lineStyle: {
            color: 'blue'
          }
        }
      ]
    });
  }
  private findChartsObj(_resultOjb){
    let _this=this;
    let xAxisData=[];
    let seriesData=[];
    let warnAllNum=0;
    for (let key in _resultOjb) {
      xAxisData.push(key);
      seriesData.push(_resultOjb[key])
      if(_resultOjb[key]){
        warnAllNum+=parseInt(_resultOjb[key]);
      }
    }
    let resultObj={"xAxisData":xAxisData,"seriesData":seriesData,"warnAllNum":warnAllNum};
    return resultObj;
  }
  private drawCenterChart() {
    let myChart = this.ec.init(document.getElementById('chartBox_center'));
    let _this=this;
    let chartsData=_this.findChartsObj(_this.companyAlarm);
    //companyAlarm
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
      // grid: {
      //   top: '30%',
      //   bottom: '15%'
      // },
      title: {
        left: 'center',
        text: chartsData.xAxisData.length,
        subtext: '报警单位（家）',
        top: '5%',
        textStyle: {
          color: '#ff686c'
        },
        subtextStyle: {
          color: '#333'
        }
      },

      // dataZoom: {
      //   height: 14,
      //   type: 'inside',
      //   show: true,
      //   realtime: true,
      //   y: 36,
      //   start: 20,
      //   end: 80
      // },
      xAxis: {
        data: chartsData.xAxisData,
        axisTick: {
          show: false
        },
        axisLabel: {  
          interval:0,  
          // rotate:10,  
          formatter:function(value)  
          {   
              var ret = "";//拼接加\n返回的类目项  
              var maxLength = 3;//每项显示文字个数  
              var valLength = value.length;//X轴类目项的文字个数  
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
              if (rowN > 1)//如果类目项的文字大于3,  
              {  
                  for (var i = 0; i < rowN; i++) {  
                      var temp = "";//每次截取的字符串  
                      var start = i * maxLength;//开始截取的位置  
                      var end = start + maxLength;//结束截取的位置  
                      //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                      temp = value.substring(start, end) + "\n";  
                      ret += temp; //凭借最终的字符串  
                  }  
                  return ret;  
              }  
              else {  
                  return value;  
              }  
          }  
        }  
      },
      yAxis: {
        name: '(次)'
      },
      grid: {  
      left: '10%',  
      bottom:'40%'  
      }, 
      series: [
        {
          data: chartsData.seriesData,
          type: 'bar',
          barMaxWidth: 12,
          label: {
            show: true,
            color: 'blue'
          },
          itemStyle: {
            normal: {
              color: new this.ec.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(255,113,117, 1)' },
                { offset: 1, color: 'rgba(255,113,117, 0.5)' }
              ]),
              barBorderRadius: [6, 6, 0, 0]
            }
          }
        }
      ]
    });
  }
  private drawBottomChart() {
    let myChart = this.ec.init(document.getElementById('chartBox_bottom'));
    let _this=this;
    let xAxisData=[];
    let seriesData=[];
    let warnAllNum=0;
    for (let key in _this.typeAlarm) {
      xAxisData.push(key);
      let obj={"name":key,"value":_this.typeAlarm[key]}
      seriesData.push(obj)
      if(_this.typeAlarm[key]){
        warnAllNum+=parseInt(_this.typeAlarm[key]);
      }
    }
    
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
        text: warnAllNum,
        subtext: '报警类型',
        top: '32%',
        textStyle: {
          color: '#ff686c'
        },
        subtextStyle: {
          color: '#333'
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['45%', '60%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            normal: {
              show: true,
              position: 'ouside',
              formatter: '{b}' + '\n' + '{d}%'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '15',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          color: ['#3e9cff', '#f6d511', '#ff548e', '#ff79eb'],
          data: seriesData,
        }
      ]
    });
  }
}
</script>

<style lang="scss" scoped>
#nonCoalMine {
  height: calc( 100% - 40px - #{$headerHeight} );
  overflow: auto;
  background: #fff;
  .nonCoalMine_topList {
    float: left;
    width: 100%;
    background: #f7fff4;
    font-size: 14px;
    box-shadow: 0 3px 0 #ecf3e9;
    li:nth-of-type(1),
    li:nth-of-type(2) {
      width: 50%;
      float: left;
      height: 25px;
      line-height: 25px;
      text-align: center;
      border-top: 1px solid #dcdddc;
      div {
        width: 50%;
        float: left;
      }
      div:first-of-type {
        text-align: left;
        padding-left: 15px;
      }
      div:last-of-type {
        text-align: right;
        padding-right: 15px;
        color: #6fa55b;
      }
    }
    li:nth-of-type(3) {
      width: 100%;
      float: left;
      height: 25px;
      line-height: 25px;
      text-align: center;
      border-top: 1px solid #dcdddc;
      div {
        width: 50%;
        float: left;
      }
      div:first-of-type {
        text-align: left;
        padding-left: 15px;
      }
      div:last-of-type {
        text-align: right;
        padding-right: 15px;
        color: #6fa55b;
      }
    }
    li:nth-child(odd) {
      border-right: 1px solid #dcdddc;
    }
  }
  .nonCoalMine_chartBox {
    width: 100%;
    float: left;
    div {
      width: 100%;
      .chartBox_title {
        width: 100%;
        height: 36px;
        line-height: 36px;
        margin-top: 5px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .chartBox_firstChart {
      padding: 0 15px;
      box-shadow: 0 4px 0 #ecf3e9;
      .firstChart_timeList {
        width: 160px;
        float: right;
        display: flex;
        justify-content: center;
        border: 1px solid #cfcfcf;
        border-left: none;
        height: 32px;
        li {
          height: 30px;
          width: 80px;
          text-align: center;
          line-height: 30px;
          color: #333;
          font-size: 14px;
          border-left: 1px solid #cfcfcf;
        }
        .timeList_active {
          background-color: #0bb20c;
          color: #fff;
        }
      }
      .chartBox_top {
        width: 100%;
        height: 260px;
        margin-top: 30px;
      }
    }
    .chartBox_secondChart {
      padding: 0 15px;
      box-shadow: 0 4px 0 #ecf3e9;
      .chartBox_center {
        width: 100%;
        height: 280px;
      }
    }
    .chartBox_thirdChart {
      padding: 0 15px 15px;
      .chartBox_bottom {
        padding: 0 15px;
        width: 100%;
        height: 150px;
      }
    }
  }
  .nonCoalMine_bottomList {
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
}
</style>
