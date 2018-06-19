
import request from '@/utils/request'

export function post(url,data) {
  return request({
    url:  url,
    method: 'post',
    //withCredentials: true,
    data
  })
}

export function get(url, params) {
  return request({
//  url: process.env.API_HOST + '/admin/adviceBack/list',
//  url: process.env.BASE_API + '/admin/adviceBack/list',
    url: url,
    method: 'get',
    //withCredentials: true,
    params
  })
}