<template>
  <div id="collieryIndustry">
    <ul class="collieryIndustry_topList">
      <li v-for="(item,index) in tableArr" :key="index">
        <div>{{item?item.name:"--"}}</div>
        <div>{{item?comput(index,item.num):"--"}}</div>
      </li>
    </ul>
    <ul class="statistics_top">
      <!-- <li v-for="(item,index) in tableArr" :key="index">
        <div>{{item?item.name:"--"}}</div>
        <div>{{item?comput(index,item.num):"--"}}</div>
      </li> -->
      <li v-for="(item,index) in topList" :key="index+'1'">
        <div v-if="item.name.length>5" style="width: 70%;">{{item.name}}</div>
        <div v-if="item.name.length>5" style="width: 30%;">{{item.num}}</div>
        <div v-if="item.name.length<=5">{{item.name}}</div>
        <div v-if="item.name.length<=5">{{item.num}}</div>
      </li>
      <!-- {{item.name}}家 -->
      <!-- <li>
        <div>重大危险源</div>
        <div>个</div>
      </li>
      <li>
        <div>接入设备</div>
        <div>个</div>
      </li>
      <li>
        <div>在线率</div>
        <div></div>
      </li> -->
    </ul>
    <div class="collieryIndustry_chartBox">
      <div class="chartBox_firstChart">
        <p class="chartBox_title">报警数量统计</p>
        <ul class="firstChart_timeList">
          <li
            v-for="(value, key) in timeList"
            :key="key"
            @click="changeTab(key)"
            :class="{timeList_active:cur == key}"
          >{{ value }}</li>
        </ul>
        <div id="chartBox_top" class="chartBox_top"></div>
      </div>
      <div class="chartBox_secondChart">
        <p class="chartBox_title">企业报警统计</p>
        <div id="chartBox_center" class="chartBox_center"></div>
      </div>
      <div class="chartBox_thirdChart">
        <p class="chartBox_title">报警类型统计</p>
        <div id="chartBox_bottom" class="chartBox_bottom"></div>
        <ul class="collieryIndustry_bottomList" >
          <li v-for="(item,index) in typeWarnList" :key="index" :style="{width:findLiWith(item.value)}">
            <p style="color: #ff79eb">{{item.num}}</p>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import * as echarts from 'echarts';
import industryData  from '../../../assets/server/industrydata.js';
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'collieryIndustry'
})
export default class collieryIndustry extends Vue {
  private tableArr = [];
  private ec = echarts as any;
  private cur = 0;
  private countAll=0;
  private topList=[];
  private typeWarnList=[];
  private timeList = ['24小时', '7日', '30日'];
  private drawTopList={"2020-02-15": 15,
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
  private comput(index, data) {
    if (index == 0) {
      data = data + '家';
    } else if (index == 1 || index == 2) {
      data = data + '个';
    }
    return data;
  }
  created(){
    console.log("fafdas created")
    this.initTypeData();
    this.initData("24小时");
  }
  private mounted() {
    // this.drawTopChart();
    // this.drawCenterChart();
    // this.drawBottomChart();
    //不知道干什么的接口先注释
    //this.tabledata();
    
  }
  // initData(){
  //   //获取报警数量统计
  //   let _this = this;
  //   let parma = {
  //     maxMenuCode:"0",
  //     tabCode:"01",
  //     dataType:"7日"
  //   };
  //   return new Promise(function(resolve, reject) {
  //     industryData
  //       .industryTypeData(parma)
  //       .then(function(response) {
  //         if (response.data.data) {
  //           console.log(response.data.data)
  //           _this.drawTopList=response.data.data;
  //          // _this.tableArr = response.data.data;
  //         }
  //       })
  //       .catch(function(error) {
  //         reject(error);
  //       });
  //   });
  // }
  findLiWith(value){
    console.log(value,this.countAll)
    return ((value/this.countAll)*100)+"%";
  }
  changeTab(_key){
    console.log("changetab==>"+_key);
    this.cur = _key;
    this.countAll=0;
    let timeStr=this.timeList[_key];
    // if(_key==0){
    //   timeStr="24小时";
    // }
    this.initData(timeStr)
    
  }
  initTypeData(){
    //enterpriseTopTypeData
    let _this=this;
    let parma = {
      maxMenuCode:"0",
      TabCode:"01",
      orgCode:this.$store.state.userInfo.orgCode,
      userId:this.$store.state.userInfo.userId
    };
    new Promise(function(resolve, reject) {
      industryData
        .enterpriseTopTypeData(parma)
        .then(function(res) {
           console.log("enterpriseTopTypeData==",res)
           let resData=res.data;
           if(resData.status =='200'){
             console.log(resData.data)
             _this.topList=resData.data;
             _this.topList.forEach((item,index)=>{
               if(item.name.indexOf('企业')>=0){
                 item.num=item.num+"家";
               }else if(item.name.indexOf('危险源')>=0){
                 item.name="煤与瓦斯突出矿"
                 item.num="9家"
                 //item.num=item.num+"个";
               }else if(item.name.indexOf('设备')>=0){
                 item.num=item.num+"个";
               }else if(item.name.indexOf('率')>=0){
                 item.num=item.num+"";
               }else{
                 item.num=item.num+"家";
               }
             })
           }
        })
        .catch(function(error) {
          reject(error);
        });
    });

  }
  initData(_day){
    //获取报警数量统计
    let _this = this;
    let parma = {
      maxMenuCode:"0",
      tabCode:"01",
      orgCode:this.$store.state.userInfo.orgCode,
      userId:this.$store.state.userInfo.userId,
      dataType:_day,
      dateType:_day
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
    let p2 = new Promise(function(resolve, reject) {
      industryData
        .industryMiddleTypeData(parma)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error);
        });
    });
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
    
    Promise.all([p1,p2,p3]).then(function (results) {
        if(results[0]['status']==200){
           _this.drawTopChart(results[0]['data'].data);
        }
        if(results[1]['status']==200){
          _this.drawCenterChart(results[1]['data'].data);
        }
        if(results[2]['status']==200){
          _this.drawBottomChart(results[2]['data'].data,results[2]['data'].list);
        }
        console.log("getLifelineMonitorStatistics==>",results)
        // if(resultsObj==null||resultsObj['status']!=200){
        //   console.log("处理异常");
        // }else{
        //   console.log("data==>",resultsObj['data'])
        //   let dataObj=resultsObj['data'].data;
        //   console.log(dataObj)
        //   _this.drawTopList=dataObj.dateAlarm;
        //   _this.drawTopChart();
          
        //   _this.drawCenterChart();
        //   _this.drawBottomChart();
        // }
      }).catch(function (status) {
        
         
      });

  }
  
  //获取列表数据
  private tabledata() {
    let that = this;
    let parma = {
      maxMenuCode: '0',
      TabCode: '02',
      enterpId: ''
    };
    return new Promise(function(resolve, reject) {
      industryData
        .industrytable(parma)
        .then(function(response) {
          if (response.data.data) {
            that.tableArr = response.data.data;
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
  private drawTopChart(_data) {
    let _this=this;
    let myChart = this.ec.init(document.getElementById('chartBox_top'));
    console.log("top chart data",_this.drawTopList)
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
  private drawCenterChart(_data) {
    let myChart = this.ec.init(document.getElementById('chartBox_center'));
    let xAxisArr=[];
    let seriesArr=[];
    let maxNum=0;
    console.log("drawCenterChart==>",_data)
    if(_data&&_data.length>0){
      xAxisArr=_data[0].Xdata;
      seriesArr=_data[0].Ydata;
      maxNum=seriesArr.length;
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
      // grid: {
      //   top: '30%',
      //   bottom: '15%'
      // },
      title: {
        left: 'center',
        text: maxNum,
        subtext: '报警企业（家）',
        top: '5%',
        textStyle: {
          color: '#ff686c'
        },
        subtextStyle: {
          color: '#333'
        }
      },
      xAxis: {
        data: xAxisArr,
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
      grid: {  
      left: '10%',  
      bottom:'40%'  
      }, 
      yAxis: {
        name: '(次)'
      },
      series: [
        {
          data: seriesArr,
          type: 'bar',
          barMaxWidth: 12,
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
  private drawBottomChart(_data,_list) {
    let myChart = this.ec.init(document.getElementById('chartBox_bottom'));
    let seriesArr=[];
    let maxNum=0;
    console.log("drawBottomChart==>",_data)
    if(_data&&_data.length>0){
      seriesArr=_data;
    }
    this.typeWarnList=_list;
    // this.typeWarnList.forEach((item,index)=>{
    //   console.log(item.value)
    //   if(item.value){
    //     this.countAll+=parseInt(item.value);
    //   }
    // })
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
          name: '报警类型',
          type: 'pie',
          radius: ['70%', '90%'],
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
}
</script>


<style lang="scss" scoped>
#collieryIndustry {
  height: calc( 100% - 40px - #{$headerHeight} );
  overflow: auto;
  background: #fff;
  .statistics_top{
    background: #f7fff4;
    font-size: 3.73333vw;
    -webkit-box-shadow: 0 0.8vw 0 #ecf3e9;
    box-shadow: 0 0.8vw 0 #ecf3e9;
    li{
      float: left;
      width: 50%;
      height: 25px;
      line-height: 25px;
      border-top: 1px solid #dcdddc;
      //padding-left: 10px;
      div:nth-of-type(1){
        float: left;
        width: 50%;
        text-align: left;
        padding-left: 10%;
       
      }
      div:nth-of-type(2){
        width: 50%;
        float: left;
        text-align: right;
        padding-right: 10%;
        border-right: 1px solid #dcdddc;
      }
    }
  }
  .collieryIndustry_topList {
    float: left;
    width: 100%;
    background: #f7fff4;
    font-size: 14px;
    box-shadow: 0 3px 0 #ecf3e9;
    li {
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
    li:nth-child(odd) {
      border-right: 1px solid #dcdddc;
    }
  }
  .collieryIndustry_chartBox {
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
        display: flex;
        justify-content: center;
        border: 1px solid #cfcfcf;
        border-left: none;
        height: 32px;
        li {
          height: 30px;
          width: 33.33%;
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
      }
    }
    .chartBox_secondChart {
      padding: 0 15px;
      box-shadow: 0 4px 0 #ecf3e9;
      .chartBox_center {
        width: 100%;
        height: 255px;
      }
    }
    .chartBox_thirdChart {
      padding: 0 15px;
      .chartBox_bottom {
        padding: 0 15px;
        width: 100%;
        height: 150px;
      }
    }
  }
  .collieryIndustry_bottomList {
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
