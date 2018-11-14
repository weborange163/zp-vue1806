const menus = [
  {id: '0', label: '首页', name:'home', icon: 'iconfont icon-index'},
  {
    id: 'a',
    icon: 'iconfont icon-menu',
    label: '内容管理',
    submenu: [
      {id: 'a1', name: 'news', label: '新闻资讯管理'},
      {id: 'a2', name: 'market', label: '行业信息管理'},
      {id: 'a3', name: 'audit-news', label: '新闻审核'},
      {id: 'a4', name: 'audit-market', label: '行情审核'}
    ]
  },
  {
    id: 'b',
    icon: 'iconfont icon-yunying',
    label: '运营管理',
    submenu: [
      {id: 'b1', name: 'banner', label: 'banner管理'},
      {id: 'b2', name: 'subject', label: '专题管理'},
      {id: 'b3', name: 'comments', label: '评论管理'},
      {id: 'b4', name: 'broadcast', label: '广播管理'}
    ]
  },
  {
    id: 'c',
    icon: 'iconfont icon-diamond',
    label: '会员中心',
    submenu: [
      {id: 'c1', name: 'member', label: '会员管理'},
      {id: 'c2', name: 'feedback', label: '用户反馈'}
    ]
  },
  {
    id: 'd',
    icon: 'iconfont icon-setting',
    label: '系统管理',
    submenu: [
      {id: 'd1', name: 'rules1', label: '行业信息分类设置'},
      {id: 'd2', name: 'rules2', label: '转载来源设置'},
      {id: 'd3', name: 'rules3', label: '区域管理'},
      {id: 'd4', name: 'travel-coin', label: '交通币规则'},
      {id: 'd5', name: 'version', label: '版本管理'},
      {id: 'd6', name: 'permissions', label: '角色与权限'},
      {id: 'd7', name: 'accounts', label: '后台用户管理'}
    ]
  },
  {
    id: 'e',
    icon: 'iconfont icon-coins',
    label: '交通币',
    submenu: [
      {id: 'e1', name: 'coin-account', label: '会员账户'},
      {id: 'e2', name: 'coin-withdraw', label: '提现管理'}
    ]
  },
  {
    id: 'f',
    icon: 'iconfont icon-chart',
    label: '数据统计',
    submenu: [
      {id: 'f1', name: 'content-data', label: '内容数据'},
      {id: 'f2', name: 'third-party', label: '平台用户数据'}
    ]
  }
  /*{
    id: 'components',
    icon: 'fa fa-microchip',
    label: '组件',
    submenu: [
      {
        id: 'test',
        label: '二级测试',
        icon: 'fa fa-hand-o-up',
        submenu: [
          {
            id: 'test',
            label: '二级测试',
            icon: 'fa fa-hand-o-up'
          }
        ]
      },
      ['Form 表单', [
        {id: 'f1', name: 'c-button', label: 'Button 按钮', icon: 'fa fa-hand-o-up'},
        {id: 'f2', name: 'c-switch', label: 'Switch 开关', icon: 'fa fa-square-o'},
        {id: 'f3', name: 'c-checkbox', label: 'Checkbox 多选框', icon: 'fa fa-check-square'},
        // {id: 'f4', label: 'Radio 单选框', icon: 'fa fa-dot-circle-o'},
        {id: 'f5', name: 'c-input', label: 'Input 输入框', icon: 'fa fa-pencil'},
        {id: 'f6', name: 'c-keyboard', label: '虚拟键盘', icon: 'fa fa-keyboard-o'}
      ]],
      ['Notice', [
        {id: 'n1', name: 'c-alert', label: 'Alert 警告', icon: 'fa fa-info'},
        {id: 'n2', name: 'c-loading', label: 'Loading 加载', icon: 'fa fa-circle-o-notch'}
      ]],
      ['Other', [
        {id: 'c-dropdown', name: 'c-dropdown', label: 'Dropdown'},
        {id: 'c-navbar', name: 'c-navbar', label: 'Navbar'},
        {id: 'c-container', name: 'c-container', label: '栅格布局'}
      ]]
    ]
  },
  {
    id: 'pages',
    icon: 'fa fa-circle-o',
    label: 'Pages 页面',
    submenu: [
      {id: 'p-data-table', name: 'p-data-table', label: 'Table 表格数据'},
      {id: 'cnode', name: 'cnode', label: 'Cnode社区'},
      {id: 'p1', name: 'login', label: 'Login 登录'},
      {id: 'p2', name: 'p-login', label: 'Login 登录2'},
      {id: 'p3', name: 'p-register', label: 'Register 注册'},
      {id: '400', path: '/404', label: '404'},
      {id: '500', path: '/500', label: '500'}
    ]
  },
  {
    id: 'examples',
    icon: 'fa fa-paper-plane',
    label: 'Examples',
    submenu: [
      {id: 'e1', path: '/500', label: 'Vuex 例子'}
    ]
  },
  {
    id: 'version',
    icon: 'fa fa-meetup',
    label: '应用'
  }*/
]
export default menus
