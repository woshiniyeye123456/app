import axios from 'axios';

//const baseurl2 = "http://220.179.173.29:30002"
//const baseurl2 = "http://220.179.173.29:8000/hbjc"
const baseurl2 = "http://192.168.228.190:8086"
// let baseurl = "";
// let token = ""
// setTimeout(()=>{
//     baseurl = window['vm'].$myConfig.ip;
//     token = window['vm'].$store.state.userInfo.token;
// },100)
    //视频监列表


//视频监列表
const industrytable = (data) => {
    return axios({
        method: 'get',
        // url: window['g'].IP  + '/hbjc/mobile/getStatiscalInfo.mvc' + jsonjoin(data),
        // 中卫演示数据
        url: 'http://localhost:8080/json/dataAnalysis/industrydata.json',
    })
}
//报警数量统计
const industryWarnNum = (data) => {
    return axios({
        method: 'get',
        url: window['g'].IP + '/api/gsafety/huaibei/app/monitor/getAlarmNumByForwardNday'+jsonjoin(data),
    })
}

//生命线 头部总体统计
const industryLifeData = (data) => {
    return axios({
        method: 'get',
        url: 'http://220.179.173.29:8087/api/gsafety/huaibei/app/monitor/getLifelineMonitorStatistics'+jsonjoin(data),
    })
}
//生命线 报警数量统计
const industryLifeWarnNum = (data) => {
    return axios({
        method: 'get',
        url: window['g'].IP  + '/api/gsafety/huaibei/app/monitor/getAlarmNumByForwardNday'+jsonjoin(data),
    })
}
//生命线 报警企业统计
const industryLifecompanyData = (data) => {
    return axios({
        method: 'get',
        url: window['g'].IP  + '/api/gsafety/huaibei/app/monitor/getCompanyAlarmNumByForwardNday'+jsonjoin(data),
    })
}
//生命线 报警类型统计
const industryLifeWarnTypeData = (data) => {
    return axios({
        method: 'get',
        url: window['g'].IP  + '/api/gsafety/huaibei/app/monitor/getTypeAlarmNumByForwardNday'+jsonjoin(data),
    })
}
//行业数据报警数量统计 
const industryTopTypeData = (data) => {
    return axios({
        method: 'get',
        // url: window['g'].IP  + 'hbjc/mobile/getEnterpriseAlarmNumStatistics.mvc'+jsonjoin(data),
        url: 'http://localhost:8080/json/dataAnalysis/industrydata.json',
    })
}
//行业数据企业报警统计
const industryMiddleTypeData = (data) => {
    return axios({
        method: 'get',
        // url: window['g'].IP  + 'hbjc/mobile/getEnterprisePoliceStatistcs.mvc'+jsonjoin(data),
        url: 'http://localhost:8080/json/dataAnalysis/industrydata.json',
    })
}
//行业数据企业类型报警统计
const industrybottomTypeData = (data) => {
    return axios({
        method: 'get',
        // url: window['g'].IP  + 'hbjc/mobile/getEnterpriseAlarmTypeStatistics.mvc'+jsonjoin(data),
        url: 'http://localhost:8080/json/dataAnalysis/industrydata.json',
    })
}
//企业数据 统计头
const enterpriseTopTypeData = (data) => {
    return axios({
        method: 'get',
        // url: window['g'].IP  + 'hbjc/mobile/getStatiscalInfo.mvc'+jsonjoin(data),
        // 中卫演示数据
        url: 'http://localhost:8080/json/dataAnalysis/industrydata.json',
    })
}
//企业数据 级联企业字典表
const enterpriseTypeList = (data) => {
    return axios({
        method: 'get',
        // url: window['g'].IP  + 'hbjc/mobile/enterprise/getIndustry.mvc',
        url: 'http://localhost:8080/json/enterprise/enterpriseList.json',
    })
}

function jsonjoin(data) {
    let str = "?"
    for (let key in data) {
        str += "&" + key + "=" + data[key]
    }
    if(str.indexOf("?&")>=0){
        str="?"+str.split("?&")[1];
    }
    return str;
}
const industryData = {
    industrytable,
    industryWarnNum,
    industryLifeData,
    industryLifeWarnNum,
    industryLifecompanyData,
    industryLifeWarnTypeData,
    industryTopTypeData,
    industryMiddleTypeData,
    industrybottomTypeData,
    enterpriseTopTypeData,
    enterpriseTypeList
}
export default industryData;