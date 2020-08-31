import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/pages/home/home'], resolve),//首页
    },
    {
      path: '/formBuild',
      name: 'formBuild',
      component: resolve => require(['@/pages/formBuild/build'], resolve),//表单构建
    },
  ]
})
