import Vue from 'vue';
import axios from 'axios';
import qs from 'qs'
import vm from '../../main';
const urlData = require('../../../public/json/enterprise/enterpriseList.json');
//import { GetRequestUrl } from './requestData'
//const baseurl =  window['g'].IP;

//const baseurl = "http://3e021h7648.wicp.vip/hbjc";
//行政区域
const districts = (data) => {
        return axios({
            method: "get",
            // url: window['g'].IP + "hbjc/mobile/enterprise/getDistricts.mvc",
            // 中卫演示数据
            url: './json/enterprise/enterpriseList.json',
            data: qs.stringify(data),
            // params: qs.stringify(data)
        })
    }
    //行业
const industry = (data) => {
        return axios({
            method: "get",
            // url: window['g'].IP + "hbjc/mobile/enterprise/getIndustry.mvc",
            // 中卫演示数据
            url: './json/enterprise/enterpriseList.json',
            data: qs.stringify(data),
            // params: qs.stringify(data)
        })
    }
    //企业状态
const enterpriseStatus = (data) => {
        return axios({
            method: "get",
            // url: window['g'].IP + "hbjc/mobile/enterprise/getEnterpriseStatus.mvc",
            // 中卫演示数据
            url: './json/enterprise/enterpriseList.json',
            data: qs.stringify(data),
            // params: qs.stringify(data)
        })
    }
    //企业列表
const enterpriseList = (data,_this) => {
        return axios({
            method: "get",
            // url: window['g'].IP + "hbjc/mobile/enterprise/getEnterpriseList.mvc" + jsonjoin(data),
            // 中卫演示数据
            url: './json/enterprise/enterpriseList.json',
        })
    }
    //企业列表详情页
const enterpriseDetails = (data) => {
    return axios({
        method: "get",
        url: window['g'].IP + "hbjc/mobile/enterprise/getEnterpriseById.mvc" + jsonjoin(data),
    })
}
const enterpriseNameList = (data) => {
    return axios({
        method: "get",
        // url: window['g'].IP + "hbjc/mobile/enterprise/getEnterpriseNameList.mvc" + jsonjoin(data),
        url: './json/enterprise/enterpriseList.json',
    })
}
const enterprise = {
    districts,
    industry,
    enterpriseStatus,
    enterpriseList,
    enterpriseDetails,
    enterpriseNameList,
}
export default enterprise;

function jsonjoin(data) {
    let str = "?"
    for (let key in data) {
        str += "&" + key + "=" + data[key]
    }
    return str;
}