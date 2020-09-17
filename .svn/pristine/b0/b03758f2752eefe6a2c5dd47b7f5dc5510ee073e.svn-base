import axios from 'axios';
import qs from 'qs'
// 请求常用分组
// const baseurl = 'http://10.3.10.116:3000/gemp-app';
// let baseurl = "";
// let token = ""
// setTimeout(()=>{
//     baseurl = window['vm'].$myConfig.ip;
//     token = window['vm'].$store.state.userInfo.token;
// },100)
const getGroup = (data) => {
        return axios({
            method: 'post',
            url: window['g'].IP + 'gemp-user/api/maillist/group/list/v1',
            data: data
        })
    }
    // 根据分组查询联系人
const getPeople = (data) => {
    let token = localStorage.getItem("token");
        return axios({
            method: 'post',
            url: window['g'].IP + 'gemp-user/api/gemp/user/maillist/mail/gorup/person/list/v1',
            headers:{'token':token},
            data: qs.stringify(data)
        })
    }
    
const getUserGroup = (data) => {
    let token = localStorage.getItem("token");
    return axios({
        method: 'post',
        url: window['g'].IP + 'gemp-user/api/gemp/user/maillist/mail/gorup/list/v1',
        headers:{'token':token},
        data: data
    })
}
const deletePersons = (data) => {
    let token = localStorage.getItem("token");
    return axios({
        method: 'post',
        url: window['g'].IP + 'gemp-user/api/gemp/user/maillist/mail/gorup/person/delete/v1',
        headers:{'token':token},
        data: data
    })
}
const AddPersons = (data) => {
    let token = localStorage.getItem("token");
    return axios({
        method: 'post',
        url: window['g'].IP + 'gemp-user/api/gemp/user/maillist/mail/gorup/person/add/v1',
        headers:{'token':token},
        data: data
    })
}
const editGroupName = (data) => {
    let token = localStorage.getItem("token");
    return axios({
        method: 'post',
        url: window['g'].IP + 'gemp-user/api/gemp/user/maillist/mail/gorup/edit/v1',
        headers:{'token':token},
        data: data
    })
}
const deleteGroup = (data) => {
    let token = localStorage.getItem("token");
    return axios({
        method: 'post',
        url: window['g'].IP + 'gemp-user/api/gemp/user/maillist/mail/gorup/delete/v1',
        headers:{'token':token},
        data:qs.stringify(data)
    })
}

    //导出
const useGroup = {
    getGroup,
    getPeople,
    getUserGroup,
    deletePersons,
    AddPersons,
    editGroupName,
    deleteGroup

}

export default useGroup;