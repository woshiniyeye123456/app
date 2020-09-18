import axios from 'axios';
import qs from 'qs'
// 请求组织机构与人员信息
// const baseurl = 'http://10.3.10.107:8085/hg/mobile';
// const baseurl = 'http://220.179.173.29:8000/gemp-user';
// const token = window['vm'].$store.state.userInfo.token;
// let baseurl = "";
// let token = ""
// setTimeout(()=>{
//     baseurl = window['vm'].$myConfig.ip;
//     token = window['vm'].$store.state.userInfo.token;
// },200)
const getGroup = (data) => {
    return axios({
        method: 'get',
        url: window['g'].IP + 'gemp-user/getOrgandPersonInfo.mvc?userid=' + data.userid + '&orgcode=' + data.orgcode + '&parentid=' + data.parentid,
    })
}
const getAllGroup = (data) => {
    let token = localStorage.getItem("token");
    return axios({
        // method: 'post',
        // url: window['g'].IP + 'gemp-user/api/gemp/user/org/findEmsOrgListByOrgCode/v1',
        method: 'get',
        url: './json/contacts/contacts.json',
        headers: { 'token': token },
        data: qs.stringify(data)
    })
}
const organization = {
    getGroup,
    getAllGroup
}
export default organization;