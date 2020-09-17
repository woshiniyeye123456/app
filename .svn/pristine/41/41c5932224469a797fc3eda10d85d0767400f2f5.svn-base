import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import app from './modules/app';
import user from '@/store/modules/user';
import getters from '@/store/getters';
import cubedemo from './modules/cubedemo';

Vue.use(Vuex);

const isDev = process.env.NODE_ENV === 'development';
const store = new Vuex.Store({
  state: {
    dataFirstPage: 1,
    organizationTitle: [],
    useGroupTitle: {},
    addGroupTitle: [],
    addList: [],
    userInfo: {
      name: '',
      avatar: '',
      roles: [],
      role:{}
    },
    gauthMenuArr:[]
  },
  modules: {
    app,
    user,
    cubedemo
  },
  mutations: {
    SET_USER_INFO: (state: any, userInfo: any) => {
      state.userInfo = userInfo.role;
      state.gauthMenuArr=userInfo.gauthMenuArr;
      localStorage.setItem("token",userInfo.token);
    }
  },
  getters,
  plugins: isDev ? [createLogger({})] : []
});

export default store;
