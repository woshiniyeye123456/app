//import * as httpClient from '@gsafety/vue-httpclient/dist/httpclient';
import axios from 'axios';
import { debug } from 'util';

const baseServe = 'http://106.37.227.29:53000/gemp-app';
axios.defaults.headers.common['token'] = "11111";
const api = {   
    async commonRequest(url,data,requestType) {
        let requestUrl= baseServe + url;
        let res;
        try {
            //debugger
            console.log("token2==>"+axios.defaults.headers.common['token'])
            if(data){
            	if(requestType == 'GET'){
            		res= await axios.get(requestUrl, data).then(api.getResponseData);
            	}else{
            		res= await axios.post(requestUrl, data).then(api.getResponseData);
            	}
                
            }else{
            	if(requestType == 'GET'){
                	res= await axios.get(requestUrl).then(api.getResponseData);
                }else{
                	res= await axios.post(requestUrl).then(api.getResponseData);
                }
            }
            //console.log("param===> come in res")
            //console.log(res);
            //console.log("param===> come in res stringify")
            //console.log(JSON.stringify(res))
            //console.log("param===> come in res stringify success")
            return res;
          
        } catch (error) {
           console.log("param===> come in res error")
           console.log(error)
            return null;
        }
    },
    async baseRequest(url,data){
        let requestUrl= baseServe + url;
        let res;
        try {
            console.log("token==>"+axios.defaults.headers.common['token'])
           let flag=api.setToken();
            console.log("token2==>"+axios.defaults.headers.common['token'])
            
            if(data){
                res= await axios.post(requestUrl, data).then(api.getResponseData);
            }else{
                res= await axios.post(requestUrl).then(api.getResponseData);
            }
            //console.log("param===> come in res")
            //console.log(res);
            //console.log("param===> come in res stringify")
            //console.log(JSON.stringify(res))
            //console.log("param===> come in res stringify success")
            return res;
          
        } catch (error) {
           console.log("param===> come in res error")
           console.log(error)
            return null;
        }
    },
    setToken(){
        
         //axios.defaults.headers.common['token']=atoken;
          let atoken="";
            try {
                atoken=window['android'].getToken()
                if(!axios.defaults.headers.common['token']||axios.defaults.headers.common['token']!=atoken){
                     console.log("获取成功android token==>"+atoken)
                     axios.defaults.headers.common['token']=atoken;
                }
            } catch (error) {
                if(!axios.defaults.headers.common['token']){
                    console.log("调用android方法失败请求token")
                    let tokenobj=api.tokenRequest();
                    tokenobj.then(function(value){
                        if(value.data){
                            axios.defaults.headers.common['token']=value.data.userObj.token;
                            console.log("token3==>"+axios.defaults.headers.common['token'])
                        }
                    })
                }
            }
    },
    getResponseData(response) {
      return response.data;
    },
    async tokenRequest() {
        let requestUrl= "http://106.37.227.29:53000/gemp-app/api/user/login/v1";
        let res;
        try {
            console.log("认证过期 重新请求")
            res= await axios.post(requestUrl, {"loginName": "wangminkang","passWord": "123456a"}).then(api.getResponseData);
            
            return res;
        } catch (error) {
            return null;
        }
    },

};

export default api;
