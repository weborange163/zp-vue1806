import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
       meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        keepAlive: true
      }, 
      component: AppView,
      children: [
        {path: '/', name: '首页', component: Home,meta:{requireAuth:true, keepAlive: true}},
        {path:'/news',name:'新闻资讯管理',component: page('news'),meta:{keepAlive:true}},
        {path:'/news/add',name:'news-add',component: page('news-add')},
        {path:'/news/second/id=:id',name:'news-second',component: page('news-second')},
        {path:'/news/lookes/id=:id',name:'news-lookes',component: page('news-lookes')},
        {path:'/news/edit/id=:id',name:'news-edit',component: page('news-edit')},
        {path:'/member',name:'会员管理',component: page('member'),meta:{keepAlive:true}},
        {path:'/member/info/id=:id',name:'member-info',component: page('member-info')},
        {path:'/market',name:'行业信息管理',component: page('market'),meta:{keepAlive:true}},
        {path:'/market/add',name:'market-add',component: page('market-add')},
        {path:'/market/edit/id=:id',name:'market-edit',component: page('market-edit')},
        {path:'/market/lookes/id=:id',name:'market-lookes',component: page('market-lookes')},
        {path:'/market/lookes2',name:'market-lookes2',component: page('market-lookes2')},
        
        {path:'/audit-news',name:'新闻审核',component: page('audit-news'),meta:{keepAlive:true}},
        {path:'/audit-market',name:'行情审核',component: page('audit-market'),meta:{keepAlive:true}},
        {path:'/market/second/id=:id',name:'market-second',component: page('market-second')},
        {path:'/banner',name:'banner管理',component: page('banner'),meta:{keepAlive:true}},
        {path:'/subject',name:'专题管理',component: page('subject'),meta:{keepAlive:true}},
        {path:'/subject/add',name:'subject-add',component: page('subject-add')},
        {path:'/subject/edit/id=:id',name:'subject-edit',component: page('subject-edit')},
        {path:'/subject/lookes',name:'subject-lookes',component: page('subject-lookes')},
        {path:'/comments',name:'评论管理',component: page('comments'),meta:{keepAlive:true}},
        {path:'/comments/lookes/id=:id',name:'comments-lookes',component: page('comments-lookes')},
        {path:'/broadcast',name:'广播管理',component: page('broadcast')},
        {path:'/feedback',name:'用户反馈',component: page('feedback')},
        {path:'/rules-list',name:'规则管理',component: page('rules-list')},
        {path:'/rules1',name:'rules1',component: page('rules1')},
        {path:'/rules2',name:'rules2',component: page('rules2')},
        {path:'/rules3',name:'rules3',component: page('rules3')},
        {path:'/travel-coin',name:'交通币规则',component: page('travel-coin')},
        {path:'/version',name:'版本管理',component: page('version')},
        {path:'/version/list/id=:id',name:'version-list',component: page('version-list')},
        {path:'/version/detail/id=:id',name:'version-detail',component: page('version-details')},
        {path:'/permissions',name:'角色与权限',component: page('permissions')},
        {path:'/accounts',name:'后台用户管理',component: page('accounts')},
        {path:'/content-data',name:'内容数据',component: page('content-data')},
        {path:'/third-party',name:'平台用户数据',component: page('third-party')},
        {path:'/coin-withdraw',name:'提现管理',component: page('coin-withdraw')},
        {path:'/coin-account',name:'会员账户',component: page('coin-account')},
        {path:'/coin-detail1/id=:id',name:'coin-detail1',component: page('coin-detail1')},
        {path:'/coin-detail2/id=:id',name:'coin-detail2',component: page('coin-detail2')},
        {path:'/coin-detail3/id=:id',name:'coin-detail3',component: page('coin-detail3')},
        // {path:'/editor',name:'editor',component: page('ueditor_demo')},



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
