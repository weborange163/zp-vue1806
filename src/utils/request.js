import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
//import store from '@/store'
//读取token
import { getToken } from '@/utils/auth'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // 请求超时时间
  // withCredentials: true
  /* headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  } */
})

// request interceptor 请求拦截
service.interceptors.request.use(config => {
  NProgress.start()
  // POST传参序列化
  if(config.method  === 'post'&& config.data.constructor !== FormData) {
    config.data = qs.stringify(config.data)
  }
  // Do something before request is sent
  if (getToken()) {
    // 让每个请求携带token-- ['tokenKey]为自定义key 请根据实际情况自行修改
    //config.headers['tokenId'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor 响应拦截
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => { // Status Code:200
//     const res = response.data
//     if (res.code !== 200) { // code != 200
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload() // 为了重新实例化vue-router对象 避免bug
//           })
//         })
//       }
//       return Promise.reject(res.msg)
//     } else { // code: 200
NProgress.done()
	console.log(response)
    return response.data
   
//     }
  },
	error => { // Status Code:500 502
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    NProgress.done()
    return Promise.reject(error)
    
})

export default service