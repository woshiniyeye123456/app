import axios from 'axios';
import qs from 'qs'
// 请求常用分组
// const baseurl = 'http://10.3.10.116:3000/gemp-app';
//获取服务器日期
const currenttime = () => {
        return axios({
            method: 'get',
            url: window['g'].IP + 'gemp-duty/api/duty/date/getcurrenttime/v1',
        })
    }
    //每天的份值班表
const dutydaylist = (data) => {
    let token = localStorage.getItem("token");
        return axios({
            method: 'post',
            url: window['g'].IP + 'gemp-duty/api/gemp/duty/plan/govern/intraday/v1',
            headers:{'token':token},
            data: data
        })
    }
    //月分值班表
const dutymounthlist = (data) => {
    let token = localStorage.getItem("token");
        return axios({
            method: 'post',
            url: window['g'].IP + 'gemp-duty/api/gemp/duty/plan/govern/day/search/v1',
            headers:{'token':token},
            data: data
        })
    }
    //值班类型
const duty_type = () => {
        return axios({
            method: 'get',
            url: window['g'].IP + 'gemp-duty/api/duty/dutyplan/grouplist/v1',
        })
    }
    //值班人
const duty_person = (data) => {
        return axios({
            method: 'post',
            url: window['g'].IP + 'gemp-duty/api/duty/dutyplan/group/people/list/v1',
            data: data
        })
    }
    //保存
const duty_save = (data) => {
        return axios({
            method: 'post',
            url: window['g'].IP + 'gemp-duty/api/duty/dutyplan/save/v1',
            data: data
        })
    }
    //导出
const onduty = {
    currenttime,
    dutymounthlist,
    dutydaylist,
    duty_type,
    duty_person,
    duty_save
}
export default onduty;