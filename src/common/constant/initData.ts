/**
 * 初始化用户信息
 */
var isAndroid_ios = () => {
  //android is true else is false
  var u = navigator.userAgent,
    app = navigator.appVersion;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isAndroid == true ? true : false;
}
//"IP": "http://192.168.228.190:8086/",
let resultStr = {
  "IP": "http://220.179.173.29:8000/",
  //"IP": "http://192.168.228.190:8086/",
  "govern": true,
  "loginSystemInfo": {
      "gauthMenuArr": [
          {
              "children": [
                  {
                      "code": "event_manager_instructions",
                      "name": "领导批示"
                  },
                  {
                      "code": "event_management_report",
                      "name": "信息上报"
                  }
              ],
              "code": "event_management",
              "name": "事件管理"
          },
          {
              "children": [
                  {
                      "children": [
                          {
                              "code": "gas_risk",
                              "name": "燃气风险"
                          },
                          {
                              "code": "drainage_risk",
                              "name": "排水风险"
                          }
                      ],
                      "code": "lifeline_risk",
                      "name": "生命线风险"
                  },
                  {
                      "code": "safety_risk",
                      "name": "安监风险"
                  }
              ],
              "code": "risk_management",
              "name": "风险管理"
          },
          {
              "children": [
                  {
                      "code": "lifeline_alarm",
                      "name": "生命线报警"
                  },
                  {
                      "code": "safety_alarm",
                      "name": "安监报警"
                  }
              ],
              "code": "alarm_monitor",
              "name": "报警监测"
          },
          {
              "children": [
                  {
                      "code": "enterprise_data",
                      "name": "企业数据"
                  },
                  {
                      "code": "industry_data",
                      "name": "行业数据"
                  }
              ],
              "code": "data_analysis",
              "name": "数据分析"
          },
          {
              "code": "enterprise_information",
              "name": "企业信息"
          },
          {
              "code": "knowledge",
              "name": "知识库"
          },
          {
              "code": "emergency_resources",
              "name": "应急资源"
          },
          {
              "code": "monitor",
              "name": "监控视频"
          }
      ],
      "gauthRoleArr": [
          {
              "code": "003",
              "description": "区县应急局/园区管委会",
              "id": "ad75bf8c-3807-47eb-af7a-fb5ff7f7f941",
              "name": "区县应急局/园区管委会"
          }
      ],
      "gauthToken": "bd1c4e54-76e9-42f2-8931-b5404e0fac1a",
      "role": {
          "email": "",
          "imToken": "01bedb7b17d0f8184cf2d3a7b10ab1f8",
          "isYjb": false,
          "loginName": "gwh_zby",
          "name": "园区管委会值班员",
          "orgCode": "LSJG001",
          "orgName": "临时机构",
          "telephone": "",
          "userId": "2c9481917179364a017196e99b040003"
      },
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnd2hfemJ5IiwiZXhwIjoxNTk5NDg4NjgwLCJpYXQiOjE1OTk0NjM1OTh9.G-ZHp9GmfU7FTwvZa17PM2kp9wSCnR20X4rS9ygZrrI"
  }
};
export const initData = (callback) => {
  console.log("init data user==================================")
  console.log("isandroid==>"+isAndroid_ios())
//   if(isAndroid_ios()){
//     window['gsmdp'].getStorage({
//         key: 'store',
//         success(res) {
//           console.log('store==android====>');
//           console.log(JSON.stringify(res.data));
//           if(res.data){
//             let resultObj=JSON.parse(res.data);
//             //window['gsmdp'].showToast(res.data);
//             callback(resultObj)
//           }else{
//             window['gsmdp'].showToast({title: '用户信息已过期请重新登录！'})
//             window['app'].exit();
//           }
//         }
//       });
//   }else{
//     console.log(" console.log('store==ios====>');")
//     callback(resultStr);
//     //return resultStr
//     // callback=()=>{
//     //     console.log("1111111111111111122222222222222")
//     //   return resultStr;
//     // }
//   }
    console.log(" console.log('store==ios====>');")
    callback(resultStr);
};

