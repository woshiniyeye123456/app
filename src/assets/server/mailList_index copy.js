import axios from 'axios';
import qs from 'qs'
// const baseurl = 'http://10.3.10.116:3000';
//const baseurl ="http://220.179.173.29:8000"
// const baseurl = 'http://220.179.173.29:8000/gemp-user';
// const token = window['vm'].$store.state.userInfo.token;
let baseurl = "";
let token = ""
setTimeout(()=>{
    baseurl = window['vm'].$myConfig.ip;
    token = window['vm'].$store.state.userInfo.token;
},100)
//联系人列表
const linkmanList = (data) => {
        return axios({
            method: 'post',
            url: baseurl + "/gemp-app/api/maillist/getallmaillist/v1",
            data: data
        })
    }
//联系人列表(新接口，上面接口作废)
const GetLinkmanList = (data) => {
    return axios({
        method: 'post',
        url: baseurl + "gemp-user/api/gemp/user/maillist/person/list/v1",
        headers:{'token':token},
        data: data
    })
}
    // 添加通讯录人员
const addlinkman = (data) => {
        return axios({
            method: 'post',
            // url: baseurl + "/gemp-app/api/maillist/add/v1",
            url: baseurl + "gemp-user/api/gemp/user/maillist/person/add/v1",
            headers:{'token':token},
            data: data
        })
    }
    // 联系人信息更改保存
const editSave = (data) => {
        return axios({
            method: 'post',
            // url: baseurl + "/gemp-app/api/maillist/modify/v1",
            url: baseurl + "gemp-user/api/gemp/user/maillist/person/modify/v1",
            headers:{'token':token},
            data: data
        })
    }
    // 联系人信息更改保存
const getGroup = (data) => {
        return axios({
            method: 'post',
            url: baseurl + "/gemp-app/api/maillist/getallorgslist/v1",
            data: data
        })
    }
     // 获取所有的组织机构
const getAllGroup = (data) => {
    return axios({
        method: 'post',
        url: baseurl + 'gemp-user/api/gemp/user/org/list/v1',
        headers:{'token':token},
        data: qs.stringify(data)
    })
}
    //导出
const linkmail = {
    linkmanList,
    GetLinkmanList,
    addlinkman,
    editSave,
    getGroup,
    getAllGroup

}
export default linkmail;