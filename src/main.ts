import Vue from 'vue';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from '@/store';
import '@/assets/fonts/iconfont';
//import config from './utils/appconfig';
import { initLog, gblog } from './common/logger/logger';
import i18n from '@/lang';
import apiServer from './api/base-service';
import MuseUI from 'muse-ui'; //引入museUi
import 'muse-ui/dist/muse-ui.css';
import Cube from 'cube-ui' //引入Cube-UI
import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
import '@/assets/styles/reset.css';
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import echarts from 'echarts'; // 引入echarts
import ElementUI from 'element-ui'; //ElementUI
import 'element-ui/lib/theme-chalk/index.css';
//引入公共的ts
import MyPluginAddConfig from './common/utils/myPlugin';
import { initData }  from '../src/common/constant/initData';
Vue.use(MyPluginAddConfig);
//Vue.use(VueI18n.plugin, store)
Vue.use(Cube)
Vue.use(MuseUI);

Vue.use(Mint)
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);

Vue.use(ElementUI);
Vue.prototype.eventBus = new Vue()
// 初始化日志
initLog();
gblog.info('init main log 1'); // TODO  delete in project
// // 加载用户主题
// if (localStorage.getItem('themeValue')) {
//   Skin.changeTheme(localStorage.getItem('themeValue'));
// } else {
//   Skin.changeTheme('white');
// }

//config(store).then(() => {
// Vue.config.productionTip = false;
// const whiteList = ['/login'];
// router.beforeEach(async (to: any, from: any, next: any) => {
//   //拦截器
//   // debugger
//   if (store.getters.token) {
//     if (to.path === '/login') {
//       next({ path: '/' });
//     } else {
//         next();
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       next('/login');
//     }
//   }
// });
//
let atoken = "";
// try {
//   atoken = window['android'].getToken()
//   if (!axios.defaults.headers.common['token'] || axios.defaults.headers.common['token'] != atoken) {
//     console.log("获取成功android token==>" + atoken)
//     axios.defaults.headers.common['token'] = atoken;
//   }
// } catch (error) {
//   if (!axios.defaults.headers.common['token']) {
//     console.log("调用android方法失败请求token")
//     tokenobj.then(function (value) {
//       if (value.data) {
//         axios.defaults.headers.common['token'] = value.data.userObj.token;
//         console.log("token3==>" + axios.defaults.headers.common['token'])
//       }
//     })
//   }
// }
axios.interceptors.response.use(function (response) {
  // console.log(response.data)
  // ①10010 token过期（30天） ②10011 token无效 
  if (response.data.code === 10010 || response.data.code === 10011) {
    // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）     
    //跳转到登录页重新登录
  }
  else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token     
    axios.defaults.headers.common['token'] = response.data.token;// 覆盖原来的token(默认一天刷新一次) 
  }
  return response
},
  function (error) {
    return Promise.reject(error)
  })
declare module 'vue/types/vue' {
  interface Vue {
    $isAndroid: any;
    $commonAjax:any;
    $formatTimeStr:any;
    $enJsBack:any;
    $GetMenusByKey:any;
  }
}
let vm;
initData((resultObj)=>{
  console.log("res=aaaaaaaaaa=>",resultObj)
  if(resultObj.IP){
    window['g'].IP=resultObj.IP;
    console.log("IP setObj==>"+window['g'].IP)
  }
  //window['g'].IP="http://192.168.228.190:8086/";
  let loginObj=resultObj.loginSystemInfo;
  store.commit('SET_USER_INFO', loginObj);
  vm = new Vue({
    router,
    i18n,
    store,
    render: (h: any) => h(App)
  }).$mount('#app');
  window['vm']=vm;
});
// let initData=initData()
export default vm;

//});
