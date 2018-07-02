'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
BASE_API: '"http://192.168.1.91:8080"',
//  BASE_API: '"http://192.168.1.154:8089"',
//  BASE_API: '"http://192.168.1.143:8089"',
//  BASE_API: '"http://192.168.1.126:8089"',
//BASE_API: '"http://118.26.10.18:78"',
  NODE_ENV: '"development"',
  API_ROOT:'"http://localhost:8080"',
  API_HOST:'"http://localhost:8080"'
})