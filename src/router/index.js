import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
       meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }, 
      component: AppView,
      children: [
        {path: '/', name: 'home', component: Home,meta:{requireAuth:true}},
        {path:'/news',name:'news',component: page('news')},
        {path:'/news/add',name:'news-add',component: page('news-add')},
        {path:'/news/second',name:'news-second',component: page('news-second')},
        {path:'/news/lookes',name:'news-lookes',component: page('news-lookes')},
        {path:'/news/edit',name:'news-edit',component: page('news-edit')},
        {path:'/member',name:'member',component: page('member')},
        {path:'/member/info',name:'member-info',component: page('member-info')},
        {path:'/market',name:'market',component: page('market')},
        {path:'/market/add',name:'market-add',component: page('market-add')},
        {path:'/market/edit',name:'market-edit',component: page('market-edit')},
        {path:'/market/lookes',name:'market-lookes',component: page('market-lookes')},
         {path:'/market/lookes2',name:'market-lookes2',component: page('market-lookes2')},
        
        {path:'/audit-news',name:'audit-news',component: page('audit-news')},
        {path:'/audit-market',name:'audit-market',component: page('audit-market')},
        {path:'/market/second',name:'second-market',component: page('second-market')},
        {path:'/banner',name:'banner',component: page('banner')},
        {path:'/subject',name:'subject',component: page('subject')},
        {path:'/subject/add',name:'subject-add',component: page('subject-add')},
        {path:'/subject/edit',name:'subject-edit',component: page('subject-edit')},
        {path:'/subject/lookes',name:'subject-lookes',component: page('subject-lookes')},
        {path:'/comments',name:'comments',component: page('comments')},
        {path:'/comments/lookes',name:'comments-lookes',component: page('comments-lookes')},
        {path:'/broadcast',name:'broadcast',component: page('broadcast')},
        {path:'/feedback',name:'feedback',component: page('feedback')},
        {path:'/rules',name:'rules',component: page('rules')},
        {path:'/version',name:'version',component: page('version')},
        {path:'/version/list',name:'version-list',component: page('version-list')},
         {path:'/version/details',name:'version-details',component: page('version-details')},
        {path:'/permissions',name:'permissions',component: page('permissions')},
        {path:'/accounts',name:'accounts',component: page('accounts')},
        {path:'/content-data',name:'content-data',component: page('content-data')},
        {path:'/third-party',name:'third-party',component: page('third-party')},
        {path:'/editor',name:'editor',component: page('ueditor_demo')},



        {path: '/button', name: 'c-button', component: page('c-button')},
        {path: '/switch', name: 'c-switch', component: page('c-switch')},
        {path: '/checkbox', name: 'c-checkbox', component: page('c-checkbox')},
        {path: '/alert', name: 'c-alert', component: page('c-alert')},
        {path: '/input', name: 'c-input', component: page('c-input')},
        {path: '/keyboard', name: 'c-keyboard', component: page('c-keyboard')},
        {path: '/loading', name: 'c-loading', component: page('c-loading')},
        {path: '/data-table', name: 'p-data-table', component: page('table')},
        {path: '/dropdown', name: 'c-dropdown', component: page('c-dropdown')},
        {path: '/navbar', name: 'c-navbar', component: page('c-navbar')},
        {path: '/container', name: 'c-container', component: page('c-container')},
        {path: '/demo', name: 'demo', component: page('demo')},
        {path: '/404', name: '404', component: page('404')},
        {path: '/500', name: '500', component: page('500')}
      ]
    },
    {path: '/login', name: 'login', component: page('login')},
    {path: '/cnode', name: 'cnode', component: page('cnode')},
    // pages
    {path: '/home-login', name: 'p-login', component: page('home-login')},
    {path: '/register', name: 'p-register', component: page('register')},
    {path: '/keyboard', name: 'p-keyboard', component: page('c-keyboard')},
    {path: '*', redirect: {name: '404'}}
  ]
})
