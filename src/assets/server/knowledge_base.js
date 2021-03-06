import axios from 'axios';
import qs from 'qs'
let baseurl = "";
// 知识库
// setTimeout(()=>{
//     baseurl = window['vm'].$myConfig.ip;
//     axios.defaults.headers.common['token'] = window['vm'].$store.state.userInfo.token;
// },1000)


// 知识库应急预案
const reserveplan = (data) => {
        let token = localStorage.getItem("token");
        return axios({
            // method: 'post',
            method: 'get',
            // url: window['g'].IP + 'gemp-plan/api/gemp/plan/emergency/list/v1',
            url: './json/contacts/knowledge.json',
            headers: { 'token': token },
            data: data
        })
    }
    //预案详情
const planDetails = (id) => {
        let token = localStorage.getItem("token");
        return axios({
            method: 'get',
            // url: window['g'].IP + 'gemp-plan/api/gemp/plan/emergency/id/v1?id=' + id,
            url: './json/contacts/knowledge.json',
            headers: { 'token': token }
        })
    }
    //预案类型
const planType = () => {
        let token = localStorage.getItem("token");
        return axios({
            method: 'post',
            headers: { 'token': token },
            url: window['g'].IP + 'gemp-duty/api/gemp/duty/info/event/type/list/v1',
        })
    }
    //预案等级
const planLevel = (data) => {
        let token = localStorage.getItem("token");
        return axios({
            method: 'post',
            url: window['g'].IP + "gemp-dic/api/dic/code/v1",
            data: data,
            headers: { 'token': token }
        })
    }
    //预案等级
const eventLevel = (data) => {
        let token = localStorage.getItem("token");
        return axios({
            method: 'post',
            url: window['g'].IP + "gemp-duty/api/gemp/duty/info/event/level/list/v1",
            data: data,
            headers: { 'token': token }
        })
    }
    //知识模块
    // 知识列表  法律列表
const knowlist = (data) => {
        let requesturl = "";
        let token = localStorage.getItem("token");
        if (data.qtype == "0") {
            requesturl = "gemp-extend/api/gemp/knowledge/msds/list/v1"
        } else {
            requesturl = "gemp-extend/api/gemp/knowledge/regprocess/list/v1"
        }
        return axios({
            // method: 'post',
            // url: window['g'].IP + requesturl,
            method: 'get',
            url: './json/contacts/knowledge.json',
            headers: { 'token': token },
            data: data
        })
    }
    //知识事故类型
const knowType = () => {
        let token = localStorage.getItem("token");
        return axios({
            method: 'get',
            url: window['g'].IP + '/api/base/kno/data/type/v1',
            headers: { 'token': token }
        })
    }
    //法律法规列表
const lawlist = (data) => {
        let requesturl = "gemp-extend/api/gemp/knowledge/law/list/app/v1"
        let token = localStorage.getItem("token");
        return axios({
            // method: 'post',
            // url: window['g'].IP + requesturl,
            method: 'get',
            url: './json/contacts/law.json',
            data: data,
            headers: { 'token': token }
        })
    }
    //法律法规详情
const lawDetails = (id) => {
        let token = localStorage.getItem("token");
        return axios({
            // method: 'post',
            // url: window['g'].IP + 'gemp-extend/api/gemp/knowledge/law/id/v1',
            method: 'get',
            url: './json/contacts/law.json',
            data: { lawId: id },
            headers: { 'token': token }
        })
    }
    //法律事故类型
const lawType = () => {
        let token = localStorage.getItem("token");
        return axios({
            method: 'get',
            url: window['g'].IP + 'gemp-extend/api/gemp/knowledge/law/category/tree/v1',
            headers: { 'token': token }
        })
    }
    //案例
    //案例列表
const caselist = (data) => {
        let requesturl = "gemp-extend/api/gemp/knowledge/case/list/v1"
        let token = localStorage.getItem("token");
        return axios({
            // method: 'post',
            // url: window['g'].IP + requesturl,
            method: 'get',
            url: './json/contacts/law.json',
            headers: { 'token': token },
            data: data
        })
    }
    //预案详情
const caseDetails = (id) => {
        let token = localStorage.getItem("token");
        return axios({
            method: 'get',
            url: window['g'].IP + 'gemp-extend/api/gemp/knowledge/case/id/v1?caseId=' + id,
            headers: { 'token': token }
        })
    }
    //导出
const plan = {
    reserveplan,
    planDetails,
    planType,
    planLevel,
    eventLevel,
    knowlist,
    lawlist,
    knowType,
    lawType,
    caselist,
    caseDetails,
    lawDetails
}
export default plan;