let config = {
  agency: "https://bird.ioliu.cn/v2?url="
  , ip: window['g'].IP
  , baseIp: window['g'].BASEIP
}
console.log("..................myplugin load")
var getuuid = (len, radix) => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
var phoneHandle = (value) => {
  if (value != '') {
    console.log("call===>" + value)
    window['android'].callAndsendMsgSelectPanel(value);
  } else {
    console.log("phone number is empty!")
  }
}
var commonAjax = () => {
  
  
  console.log(window['vm']);

  
}
var changeVal = (val) => {
  //每一次处理对比上一次修改时间是否大于100毫秒
  //let nowDate=new Date();
  //let currTime=nowDate.getTime();
  //console.log("输入正常")
  //禁止输入emjio表情
  var reg2 = /([&\|\\\*^%$#@\-'"\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF])|(\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6])|(\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])/g;
  var handleVal = val.replace(reg2, '');
  //eval('this.'+val) =handleVal;
  //eval('this.'+val)=handleVal;
  return handleVal;
  // }else{
  // 	console.log("输入速度过快！")
  // }

}
var GetDateDifference = (_date,datenew)=>{
  var datenew;    //结束时间
  if(datenew){
    datenew=new Date(datenew);
  }else{
    datenew=new Date()
  }
  var date3 = datenew.getTime() - new Date(_date).getTime();   //时间差的毫秒数    
//计算出相差天数
  var days=Math.floor(date3/(24*3600*1000))

  //计算出小时数
  var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
  var hours=Math.floor(leave1/(3600*1000))
  //计算相差分钟数
  var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
  var minutes=Math.floor(leave2/(60*1000))
  //计算相差秒数
  var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
  var seconds=Math.round(leave3/1000)
  let resultStr="";
  if(days>0){
    resultStr+=days+"天 ";
  }
  if(hours>0||days>0){
    resultStr+=hours+"小时 ";
  }
  if(hours>0||days>0||minutes>0){
    resultStr+=minutes+"分钟 ";
  }
  if(hours>0||days>0||minutes>0||seconds>0){
    resultStr+=seconds+"秒";
  }
  
  return resultStr;
  //alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
}
var formatTimeStr = (_date, _flag) => {
  let date;
  if (_date) {
    date = new Date(_date);
  } else {
    date = new Date();
  }
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = (date.getDate()).toString();
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  let dateTime = year + "-" + month + "-" + day;
  if (_flag) {
    //dateTime;//+=" 00:00:00";
  } else {
    dateTime += " " + hour + ":" + minutes + ":" + second;
  }
  return dateTime;
}
var formatTimeToZero = (_date, _flag) => {
  //0为加01为去零
  let dataTimeStr = "";
  let d = _date.split(" ")[0];
  let t = _date.split(" ")[1];
  let darr = d.split("-");
  let tarr = [];
  if (typeof (t) != 'undefined' && t.length > 0) {
    tarr = t.split(":");
  }
  // if (_flag == 0) {
  //   let dstr = darr[0] + "-" + darr[1].length == 1  ? "0" + darr[1] : darr[1] + "-" + darr[2].length == 1 ? "0" + darr[2] : darr[2];
  //   let tstr = tarr[0].length == 1 ? "0" + tarr[0] : tarr[0] + ":" + tarr[1].length == 1 ? "0" + tarr[1] : tarr[1] + ":" + tarr[2].length == 1 ? "0" + tarr[2] : "0" + parseInt(tarr[2]);
  //   if (typeof (t) != 'undefined' && t.length > 0) {
  //     dataTimeStr = dstr + " " + tstr;
  //   } else {
  //     dataTimeStr = dstr;
  //   }
  // } else {
  //   let date = new Date(_date);
  //   let year = date.getFullYear();
  //   let month = (date.getMonth() + 1).toString();
  //   let day = (date.getDate()).toString();
  //   let hour = date.getHours();
  //   let minutes = date.getMinutes();
  //   let second = date.getSeconds();
  //   if (typeof (t) != 'undefined' && t.length <= 0) {
  //     dataTimeStr = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
  //   } else {
  //     dataTimeStr = year + "-" + month + "-" + day;
  //   }
  // }
  return dataTimeStr;
}
var verification = (val, type, title) => {//type0为非空  1为电话 9为选择
  console.log(val + "===>" + type)
  var message = '';
  switch (type) {
    case 0:
      console.log("execute==> is not null")
      console.log(val + '------')
      if (val == undefined || val == null) {
        message = title + '不能为空！';
      } else {
        val = val + "";
        if (val.trim() == '') {
          message = title + '不能为空！';
        }
      }
      break;
    case 1:
      if (val == undefined || val == null || val == '') {
        console.log("jump don't not null!")
      } else {
        console.log("execute==> isn't phone num")
        var myregphone = /^[1][3,4,5,7,8][0-9]{9}$/;
        var myregtel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        if (!myregphone.test(val) && !myregtel.test(val)) {
          message = '请填写正确的' + title;
        }
      }

      break;
    case 2:
      console.log("execute==> isn't number")
      var Number = /^[0-9]*$/;
      if (!Number.test(val)) {
        message = title + '不能为非数字！';
      }
      break;
    case 3:
      console.log("execute==> isn't list is null")
      if (val.length <= 0 || val[0] == "1") {
        message = title + '不能为空！';
      }
      break;
    //  身份证验证，包括15位一代和18位二代简单规则
    case 4:
      console.log("personID==> isn't list is null")
      if (val.length <= 0 || val[0] == "1") {
        message = title + '不能为空！';
      } else {
        let pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!pattern.test(val)) {
          message = title + '不正确！';
        }
      }
      break;
    case 9:
      console.log("execute==> select is not null",val)
      if (val == undefined || val == null || val == '' || val == '请选择') {
        message = '请选择' + title;
      }
      break;
    case 10: // 只能包含字母+汉字，针对姓名
      var regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
      var re = new RegExp(regu);
      if (val.search(re) == -1) {
        message = title + '填写有误';
      }
      break;
    case 11: // 针对身份证/护照/其他类型证件号，长度6-18位，字母或数字
      let pattern = /^[\dA-Za-z][\dA-Za-z]{5,17}$/;
      if (!pattern.test(val)) {
        message = title + '填写有误';
      }
      break;
    case 12: // 针对手机号
      if (val == undefined || val == null || val == '') {
        console.log("jump don't not null!")
      } else {
        console.log("execute==> isn't phone num")
        var myregphone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myregphone.test(val)) {
          message = '请填写正确的' + title;
        }
      }

      break;
    default:

  }
  if (message != '') {
    window['vm'].$vux.toast.text(message, 'bottom')
  } else {
    return true;
  }

}
var showBottomToast = (val,_type) => {
  // 显示
  if(_type){
    window['vm'].$vux.toast.show({
      text: val,
      type:_type
    })
  }else{
    window['vm'].$vux.toast.text(val, 'bottom')
  }
}
var closeStates = ()=>{
  //关闭所有状态
  console.log("close loading States")
  window['vm'].$vux.loading.hide();
}
var isAndroid_ios = () => {
  //android is true else is false
  var u = navigator.userAgent,
    app = navigator.appVersion;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isAndroid == true ? true : false;
}
var enJsBack = (useHtml:boolean,_this:any) => {//调用安卓方法（手机back键返回问题）
  if(isAndroid_ios()){
    window['dsBridge'].register('whetherHtml', function (ret) {
      return useHtml;
    })
  }else{
  }
}
var findPermission = (menuName, privName) => {
  let resultFlag = false;
  Array.from(window['vm'].$store.state.menus, (item, index) => {
    if (item['menuname'] == menuName && item['operation'].indexOf(privName) >= 0) {
      console.log(item, index)
      resultFlag = true;
    }
  })
  return resultFlag;
}
var GetDateArr = (day1, day2) => {
  var getDate = function (str) {
    var tempDate = new Date();
    var list = str.split("-");
    tempDate.setFullYear(list[0]);
    tempDate.setMonth(list[1] - 1);
    tempDate.setDate(list[2]);
    return tempDate;
  }
  var date1 = getDate(day1);
  var date2 = getDate(day2);
  if (date1 > date2) {
    var tempDate = date1;
    date1 = date2;
    date2 = tempDate;
  }
  date1.setDate(date1.getDate() + 1);
  var dateArr = [];
  var i = 0;
  while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())) {
    var dayStr = date1.getDate().toString();
    var monthStr = (date1.getMonth() + 1).toString();
    if (dayStr.length == 1) {
      dayStr = "0" + dayStr;
    }
    if (monthStr.length == 1) {
      monthStr = "0" + monthStr;
    }
    dateArr[i] = date1.getFullYear() + "-" + monthStr + "-" + dayStr;
    i++;
    /*
     * document.write("<div style='display:block'>" + date1.getFullYear() +
     * "-" + (date1.getMonth() + 1) + "-" + date1.getDate() + "</div>");
     */
    // document.write(dateArr[i] + "<br>");
    date1.setDate(date1.getDate() + 1);
  }
  dateArr.splice(0, 0, day1)
  dateArr.push(day2);
  return dateArr;




}
// rgb转int
var converRgbToArgb = (r,g,b) => {
  var color = ((0xFF << 24)|(r << 16)|(g << 8)|b);
  return color;
}
var GetMenusByKey =(listArr,key)=>{
  let list=[];
  listArr.forEach((item,index) => {
    if(item.code+""==key){
      list=item.children;
    }
  });
  return list;
}
/**
 * 
 * @param {*} val input框的值
 * @param {*} type 0 姓名, 1 手机号, 2 身份证, 3 座机, 4 邮箱号, 5 其他待定
 */
var formVerification = (val, type) => {
  var reg;
  switch (type) {
    case 0: // 姓名: 非空, 20位, 只能输入汉字和字母
      reg = /^[a-zA-Z\u4e00-\u9fa5]{0,20}$/;
      break;
    case 1: // 手机号，长度11位
      reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      break;
    case 2: // 身份证
      reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/;
      break;
  }
  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
}
export default {
  install: function (Vue) {
    Vue.prototype.$myConfig = config;
    Vue.prototype.$uuid = getuuid;
    Vue.prototype.$commonAjax = commonAjax;
    Vue.prototype.$showBottomToast = showBottomToast;
    Vue.prototype.$closeStates=closeStates;
    Vue.prototype.$verification = verification;
    Vue.prototype.$phoneHandle = phoneHandle;
    Vue.prototype.$isAndroid = isAndroid_ios;
    Vue.prototype.$formatTimeStr = formatTimeStr;
    Vue.prototype.$formatTimeToZero = formatTimeToZero;
    Vue.prototype.$findPermission = findPermission;
    Vue.prototype.$GetDateArr = GetDateArr;
    Vue.prototype.$changeVal = changeVal;
    Vue.prototype.$formVerification = formVerification;
    Vue.prototype.$GetDateDifference=GetDateDifference;
    Vue.prototype.$enJsBack=enJsBack;
    Vue.prototype.$converRgbToArgb=converRgbToArgb;
    Vue.prototype.$GetMenusByKey=GetMenusByKey;
  }
}
