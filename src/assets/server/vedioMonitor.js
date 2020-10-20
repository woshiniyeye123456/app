import axios from 'axios';
import qs from 'qs'
// const baseurl = 'http://172.17.122.103:8082/hbjc/mobile/enterprise/getVideoMonitorList.mvc';
// const baseurl2 = "http://172.17.122.58:8085/hbjc/mobile/getVideoMonitorById.mvc"
// const baseurl = 'http://3e021h7648.wicp.vip/hbjc/mobile/enterprise/getVideoMonitorList.mvc';
// const baseurl2 = "http://3e021h7648.wicp.vip/hbjc/mobile/getVideoMonitorById.mvc"
// const baseurl = 'http://220.179.173.29:8000/';
//const baseurl2 = "http://220.179.173.29:8000/hbjc/mobile/getVideoMonitorById.mvc"
// let baseurl = "";
// let token = ""
// setTimeout(()=>{
//     baseurl = window['vm'].$myConfig.ip;
//     token = window['vm'].$store.state.userInfo.token;
// },100)
    //视频监列表
const videoMonitorList = (data) => {
    // let requestUrl=window['g'].IP+"hbjc/mobile/enterprise/getVideoMonitorList.mvc"
    let requestUrl= '/json/videoList/videoMonitor.json';
    return axios({
        method: 'get',
        url: requestUrl + jsonjoin(data),
    })
}

//视频监列表
const videoDetails = (data) => {
    // let requestUrl=window['g'].IP+"hbjc/mobile/getVideoMonitorById.mvc"
    let requestUrl = '/json/videoList/videoMonitor.json';
    return axios({
        method: 'get',
        url: requestUrl + jsonjoin(data),
    })
}
const showVideo = (data) => {
    let requestUrl=window['g'].IP+"hbjc/hikvision/doFindUrl.mvc"
    //let requestUrl="http://192.168.228.150:8081/hbjc/hikvision/doFindUrl.mvc"
    return axios({
        method: 'POST',
        url: requestUrl + jsonjoin(data),
    })
}



function jsonjoin(data) {
    let str = "?"
    for (let key in data) {
        str += "&" + key + "=" + data[key]
    }
    return str;
}
const videoMonitor = {
    videoMonitorList,
    videoDetails,
    showVideo

}
export default videoMonitor;