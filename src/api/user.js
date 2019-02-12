
import {request} from '@/utils/request'

// 登陆
export function login(data) {
  return request({
    url:  '/login',
    method: 'post',
    data
  })
}

// 登出
export function logout(data) {
  return request({
    url:  '/logout',
    method: 'post',
    data
  })
}

// 获取用户登录状态
export function getUserStatus(data) {
  return request({
    url:  '/getUserStatus',
    method: 'post',
    data
  })
}

// 动态获取导航栏
export function getNavgator(data) {
  return request({
    url:  '/getNavgator',
    method: 'post',
    data
  })
}
