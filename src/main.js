// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import Axios from '@/utils/http'
import { post, get } from '@/api/index' //引入封装的ajax请求
import NProgress from 'nprogress'
import VueQuillEditor from 'vue-quill-editor'
import MQuillEditor from 'vue-m-quill-editor'


import axios from 'axios'
//import VueAxios from 'vue-axios'

import App from './App'
import store from './store'
import router from './router'
import 'element-ui/lib/element-#3658A7/index.css'
import '@/assets/font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/main.css'
import '@/assets/css/scrollbar.css'
import '@/assets/css/reset.css'
import 'nprogress/nprogress.css'
import 'animate.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import DropdownPlugin from './m/dropdown'
import NavbarPlugin from './m/navbar'
import ContextMenuPlugin from './m/context-menu'
import MButton from '@/m/button'
import MSwitch from '@/m/switch'
import MAlert from '@/m/alert'
import MCheckbox from '@/m/checkbox'
import MInput from '@/m/input'
import MLoading from '@/m/loading'
import Mkeyboard from '@/m/keyboard'
import MNumberkeyboard from '@/m/number-keyboard'
import MBox from '@/m/box'
import MBackTop from '@/m/back-top'
import MLoader from '@/m/loader'
import MContainer from '@/m/container'

// Vue.use(VueAxios, axios)
// Axios.defaults.baseURL = process.env.API_ROOT  需要结合webpack.dev.conf.js去配置
console.log(process.env)

Vue.use(ElementUI)
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(MQuillEditor)
Vue.use(DropdownPlugin)
Vue.use(NavbarPlugin)
Vue.use(ContextMenuPlugin)
Vue.use(MButton)
Vue.use(MSwitch)
Vue.use(MAlert)
Vue.use(MCheckbox)
Vue.use(MInput)
Vue.use(MLoading)
Vue.use(Mkeyboard)
Vue.use(MNumberkeyboard)
Vue.use(MBox)
Vue.use(MBackTop)
Vue.use(MLoader)
Vue.use(MContainer)
var whiteList=['login'];
router.beforeEach((to, from, next) => {
  NProgress.start()
  var token = sessionStorage.getItem('tokenId')
  //console.log(token)
  if (!token && whiteList.indexOf(to.name) === -1) {
   // console.log(ElementUI);
    if(sessionStorage.getItem('isFirst')=='undefined'){
      ElementUI && ElementUI.Message.warning('未授权，请登陆授权后继续')
    }
    NProgress.done()
    return next({name: 'login'})
  }
  return next()
})

router.afterEach(transition => {
  setTimeout(() => {
    NProgress.done()
  })
})
window.APP_INFO = process.env.APP_INFO

Vue.config.productionTip = false
Vue.prototype.$get = get  //全局生成$get
Vue.prototype.$post = post
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

window.app = app

