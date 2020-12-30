/*
 * @Author: 徐hao
 * @Date: 2020-12-17 13:44:22
 * @LastEditTime: 2020-12-18 10:59:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \background\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/*
  name: 必须设置，左侧菜单栏和tabs栏会用到
  menuShow: 控制是否在左侧菜单栏展示
  icon: 字体图标
*/

let routes = [
  {
    title: '首页',
    path: '/',
    name: 'home',
    redirect: '/home',
  },
  {
    title: '首页',
    path: '/home',
    name: 'home',
    component: resolve => require(['@/pages/home/home'], resolve),
    menuShow: true,
    icon: 'el-icon-s-home'
  },
  {
    title: '表单构建',
    path: '/formBuild',
    name: 'formBuild',
    component: resolve => require(['@/pages/formBuild/build'], resolve),
    menuShow: true,
    icon: 'iconfont icon-biaodangoujian'
  },
  {
    title: '语音合成',
    path: '/speechSynthesis',
    name: 'speechSynthesis',
    component: resolve => require(['@/pages/speechSynthesis'], resolve),
    menuShow: true,
    icon: 'iconfont icon-yuyinhecheng'
  },
  {
    title: '图片管理',
    path: '/imgManage',
    name: 'imgManage',
    component: resolve => require(['@/pages/imgManage'], resolve),
    menuShow: true,
    icon: 'iconfont icon-yuyinhecheng'
  },
  {
    title: '视频管理',
    path: '/videoManage',
    name: 'videoManage',
    component: resolve => require(['@/pages/videoManage'], resolve),
    menuShow: true,
    icon: 'iconfont icon-yuyinhecheng'
  },
]

Vue.prototype.$routesArr = routes

export default new Router({ routes })
