'use strict'
var version = require('./version')
module.exports = {
  // BASE_API: '"http://192.168.1.91:8080"',
  BASE_API: '"http://47.95.212.86:8080"',
  // BASE_API: '"http://manager.jt11.com.cn"',
  NODE_ENV: '"production"',
  // API_HOST:'"http://192.168.1.91:8080"',
  // API_HOST:'"http://manager.jt11.com.cn"',
  API_HOST: '"http://47.95.212.86:8080"',
  APP_INFO: JSON.stringify(version)
}
