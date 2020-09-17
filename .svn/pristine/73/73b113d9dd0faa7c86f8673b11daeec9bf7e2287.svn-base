# 快速体验种子工程  

## 1. 获取种子工程
``` shell  
git clone http://xiaodiming@bitbucket.gjsy.gsafety.com/scm/gsseed/violet-seed.git  
```  

## 2. 安装依赖环境  
```  
cd violet-seed
npm install  
```    

## 3. 开发环境运行
```
npm run serve
```

## 4. 生产环境build
```
npm run build
```    

## 5. 创建一个新的页面  
### 5.1 创建vue - table.vue   
主要有以下几个部分
* template区块 - html   
注意多语言的绑定写法，下面会介绍词条文件的添加
* script区块 - typescript    
采用es6-class语法
* style区域   
scss语法，如果样式代码比较多，建议在当前目录内新增一个table.scss文件，然后引入进来(参见dashboard组件) 

```  html  
<template>
  <div class="app-example">
   this is example
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Index extends Vue {
}
</script>

<style lang="scss" scoped>
</style>

```   

### 5.2 路由配置  
在`router/index.ts`文件内引入`vue`文件,并配置到路由： 
```  js
import Table from '../views/table/table.vue';   
......  
......      
export const constantRouterMap = [
  ......
  ......
  {
    path: '/cube',
    component: Demo,
    redirect: '/cube/home',
    hidden: 'true',
    children: [
      {
        path: 'home',
        component: CubeHome
      },
      {
        path: 'like',
        component: CubeLike
      },
      {
        path: 'vip',
        component: CubeVip
      },
      {
        path: 'me',
        component: CubeMe
      },
      {
        path: 'table',
        component: Table
      }
    ]
  },
];
export default new Router({
  routes: constantRouterMap
});


```

### cubedemo配置
```javascript
tabs = [
    {
      label: 'table',
      icon: 'cubeic-home'
    }
    ]
```
重新启动客户端即可看到新增的界面。
