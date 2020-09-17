import axios from 'axios';
import qs from 'qs'
// const baseurl = 'http://10.3.10.116:3000';
//const baseurl ="http://220.179.173.29:8000"
//const baseurl = 'http://220.179.173.29:8000';
// let baseurl = "";
// let token = ""
// setTimeout(()=>{
//     baseurl = window['vm'].$myConfig.ip;
//     token = window['vm'].$store.state.userInfo.token;
// },100)
//获取我的信息
const getMineInfo = (data) => {
    let token = localStorage.getItem("token");
    console.log("请求接口中的的token是：",window.localStorage.getItem('token'));
    return axios({
        method: 'post',
        // url: window['g'].IP + 'gemp-user/api/gemp/user/baseuser/id/v1',
        // 中卫演示数据
        url: 'http://localhost:8080/json/information/editMineInfo.json',
        headers:{'token':token},
        data: data
    })
}
//修改用户的信息
const editMineInfo = (data) => {
    let token = localStorage.getItem("token");
    return axios({
        method: 'post',
        // url: window['g'].IP  + 'gemp-user/api/user/manage/modify/v1',
        // 中卫演示数据
        url: 'http://localhost:8080/json/information/editMineInfo.json',
        headers:{'token':token},
        data:data
    })
}
//修改用户的信息
const editHeaderInfo = (data) => {
    let token = localStorage.getItem("token");
    return axios({
        method: 'post',
        url: window['g'].IP  + 'api/gemp/app/duty/info/user/userheadiconinfo/modify/v1',
        headers:{'token':token},
        data:data
    })
}
const enterprise = {
    editMineInfo,
    getMineInfo,
    editHeaderInfo
}
export default enterprise;