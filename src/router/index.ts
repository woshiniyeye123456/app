
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//淮北安监开始=============================================
import app from '../views/app.vue';
import EnterpriseList from '../views/EnterpriseList/EnterpriseList.vue'; // 企业列表
import EnterpriseDetails from '../views/EnterpriseList/EnterpriseDetails.vue' // 企业详情
import EnterpriseVideo from '../views/EnterpriseList/EnterpriseVideo.vue' // 企业视频
import EnterpriseSearch from '../views/EnterpriseList/EnterpriseSearch.vue' // 企业视频
import VedioSearch from '../views/EnterpriseList/VedioSearch.vue' // 企业视频搜索
import EnterpriseData from '../views/dataAnalysis/enterpriseData.vue' // 企业数据
import IndustryData from '../views/dataAnalysis/industryData.vue' //行业数据
//导入页面二级路由
import NonCoalMine from '../views/dataAnalysis/industryData/nonCoalMine.vue' // 非煤矿山
import lifeLine from '../views/dataAnalysis/industryData/lifeLine.vue' // 非煤矿山
import DangerData from '../views/dataAnalysis/industryData/dangerData.vue' // 危化行业
import CollieryIndustry from '../views/dataAnalysis/industryData/collieryIndustry.vue' // 煤矿行业
import PersonalInformation from '../views/my/PersonalInformation.vue' //我的-个人信息
import PersonalInformationHandle from '../views/my/PersonalInformationHandle.vue' //我的个人信息
import videoListTitle from '@/views/videoList/videoListTitle.vue' //监控视频列表
import videoDetails from '../views/videoList/videoDetails.vue' // 监控企业视频详情
import vSearch from '../views/videoList/vSearch.vue' // 监控企业视频详情
import linkmanList from '@/views/address/addressBook/linkmanList.vue' //通讯录-联系人列表
import addSearch from '@/views/address/addressHead/addSearch.vue' //通讯录-头部
import addressAdd from '@/views/address/addressHead/addressAdd.vue' //通讯录-头部添加页面
import addressEdit from '@/views/address/addressHead/addressEdit.vue' //通讯录-头部编辑页面
import chooseorg from '@/views/address/addressHead/chooseorg.vue' //知识库--案例
import organization from '@/views/address/addressHead/organization.vue' //通讯录-组织机构页面
import useGroup from '@/views/address/addressHead/useGroup.vue' //通讯录-常用群组页面
import addGroup from '@/views/address/addressHead/addGroup.vue' //通讯录-常用群组页面
import editGroup from '@/views/address/addressHead/editGroup.vue' //通讯录-常用群组页面
import changeInformation from '@/views/my/changeInformation.vue' //通讯录-信息修改页面
import linkmanDetail from '@/views/address/addressBook/linkmanDetail.vue' //通讯录-联系人详情页面

import knowledgeList from '@/views/knowledgeBase/knowledgeList.vue' //知识库--列表
import ContingencyPlan from '@/views/knowledgeBase/reserveplan/ContingencyPlan.vue' //知识库--预案管理
import Cpsearch from '@/views/knowledgeBase/reserveplan/Cpsearch.vue' //知识库--预案管理
import plandetail from '@/views/knowledgeBase/reserveplan/plandetail.vue' //知识库--预案管理
import KnowledgeListDetail from '@/views/knowledgeBase/knowledge/KnowledgeList.vue' //知识库--知识
import KlSearch from '@/views/knowledgeBase/knowledge/KlSearch.vue' //知识库--知识
import knowledgeDetail from '@/views/knowledgeBase/knowledge/knowledgeDetail.vue' //知识库--知识详情页
import Lawlist from '@/views/knowledgeBase/law/Lawlist.vue' //知识库--法律法规列表
import Lasearch from '@/views/knowledgeBase/law/Lasearch.vue' //知识库--法律法规搜索
import Lawdetail from '@/views/knowledgeBase/law/Lawdetail.vue' //知识库--法律法规详情
import Caselist from '@/views/knowledgeBase/case/CaseList.vue' //知识库-案例列表
import Casesearch from '@/views/knowledgeBase/case/CaseSearch.vue' //知识库--案例搜索
import Casedetail from '@/views/knowledgeBase/case/CaseDetail.vue' //知识库--案例详情
import dynamic from '@/views/Scheduling/dynamic.vue' // 值班动态
import newwork from '@/views/Scheduling/newwork.vue' // 新增值班
export const constantRouterMap = [
  //主页导航
  {
    path: '/',
    component: app,
    name: app
  },
  //张天
  {
    // 企业列表
    path: '/enterpriseList',
    name: 'EnterpriseList',
    component: EnterpriseList,
  },
  {
    // 企业详情
    path: '/enterpriseDetails',
    name: 'enterpriseDetails',
    component: EnterpriseDetails,
  },
  {
    // 企业视频
    path: '/enterpriseVideo',
    name: 'enterpriseVideo',
    component: EnterpriseVideo,
  },
  {
    // 企业列表搜索
    path: '/enterpriseSearch',
    name: 'enterpriseSearch',
    component: EnterpriseSearch,
  },
  {
    // 企业视频搜索
    path: '/VedioSearch',
    name: 'VedioSearch',
    component: VedioSearch,
  },
  //王亚坤
  {
    // 行业数据
    path: '/industryData',
    component: IndustryData,
    children: [
      // 煤矿行业
      {
        path: "/",
        redirect: "collieryIndustry",
      },
      {
        path: "collieryIndustry",
        name: 'collieryIndustry',
        component: CollieryIndustry
      },
      // 危化行业
      {
        path: "dangerData",
        name: 'dangerData',
        component: DangerData
      },
      // 非煤矿山
      {
        path: "nonCoalMine",
        name: 'nonCoalMine',
        component: NonCoalMine
      },
       // 生命线
       {
        path: "lifeLine",
        name: 'lifeLine',
        component: lifeLine
      },
    ]
  },
  {
    // 企业数据
    path: '/enterpriseData',
    name: 'enterpriseData',
    component: EnterpriseData,
  },
  //我的-个人信息父级
  {
    path: '/PersonalInformationHandle',
    component: PersonalInformationHandle
  },
  //我的-个人信息
  {
    path: '/personalInformation',
    component: PersonalInformation
  },
  //我的-修改个人信息
  {
    name: 'changeInformation',
    path: '/changeInformation',
    component: changeInformation
  },
  //视频列表头
  {
    path: '/videoListTitle',
    name: 'videoListTitle',
    component: videoListTitle,
  },
  //视频详情
  {
    path: '/videoDetails',
    name: 'videoDetails',
    component: videoDetails,
  },
  {
    path: '/vSearch',
    name: 'vSearch',
    component: vSearch,
  },
  //联系人头部
  {
    path: '/addSearch',
    name: 'addSearch',
    component: addSearch,
    redirect: '/addSearch/linkmanList',
    children: [
      //联系人列表
      {
        path: 'linkmanList',
        name: 'linkmanList',
        component: linkmanList,
      },
      // 组织机构
      {
        path: 'organization',
        name: 'organization',
        component: organization,
      },
      // 常用群组
      {
        path: 'useGroup',
        name: 'useGroup',
        component: useGroup,
      },
    ]
  },
  //添加联系人
  {
    path: '/addressAdd',
    name: 'addressAdd',
    component: addressAdd,
  },
  //编辑联系人
  {
    path: '/addressEdit',
    name: 'addressEdit',
    component: addressEdit,
  },
  //选择联系人机构
  {
    path: '/chooseorg',
    name: 'chooseorg',
    component: chooseorg,
  },
  //联系人详情
  {
    path: '/linkmanDetail',
    name: 'linkmanDetail',
    component: linkmanDetail,
  },
  // 添加群组
  {
    path: '/addGroup',
    name: 'addGroup',
    component: addGroup,
  },
  //编辑群组
  {
    path: '/editGroup',
    name: 'editGroup',
    component: editGroup,
  },
  // 知识库列表
  {
    path: '/knowledgeList',
    name: 'knowledgeList',
    component: knowledgeList,
  },
  //预案管理
  {
    path: '/ContingencyPlan',
    name: 'ContingencyPlan',
    component: ContingencyPlan,
  },
  //预案搜索
  {
    path: '/Cpsearch',
    name: 'Cpsearch',
    component: Cpsearch,
  },
  //预案详情
  {
    path: '/plandetail',
    name: 'plandetail',
    component: plandetail,
  },
  //知识列表
  {
    path: '/KnowledgeListDetail',
    name: 'KnowledgeListDetail',
    component: KnowledgeListDetail,
  },
  //知识搜索
  {
    path: '/KlSearch',
    name: 'KlSearch',
    component: KlSearch,
  },
  // 知识详情
  {
    path: '/knowledgeDetail',
    name: 'knowledgeDetail',
    component: knowledgeDetail,
  },
  //法律法规
  {
    path: '/Lawlist',
    name: 'Lawlist',
    component: Lawlist,
  },
  {
    path: '/Lawdetail',
    name: 'Lawdetail',
    component: Lawdetail,
  },
  {
    path: '/Lasearch',
    name: 'Lasearch',
    component: Lasearch,
  },
  //案例
  {
    path: '/Caselist',
    name: 'Caselist',
    component: Caselist,
  },
  {
    path: '/Casesearch',
    name: 'Casesearch',
    component: Casesearch,
  },
  {
    path: '/Casedetail',
    name: 'Casedetail',
    component: Casedetail,
  },
  //值班动态
  {
    path: '/dynamic',
    name: 'dynamic',
    component: dynamic,
  }, 
  {
    path: '/newwork',
    name: 'newwork',
    component: newwork,
  },
];

export default new Router({
  // linkActiveClass: 'dataSecond_activity',
  // mode: 'history',
  // base: process.env.BASE_URL,
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap as any
});
