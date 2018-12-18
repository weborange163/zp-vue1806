// import Vue from 'vue'
import { getToken, getNickname } from '@/utils/auth'
import { stat } from 'fs';
const state = {
  nickname: getNickname(),
  options: [],
  activeIndex: '/',
  isLogin: false,
  tokenId:getToken()
}

const actions = {
  add_tabs(context,res){
    context.commit("add_tabs",res);
  },
  set_active_index(context,res){
    context.commit("set_active_index",res);
  },
  delete_tabs(context,res){
    context.commit("delete_tabs",res);
  },
  saveUserInfo(context,res){
    context.commit("SAVEUSERINFO",res);
  },
   login ({commit}, user,tokenId) {
    // console.log(111)
    commit('SET_DOING_LOGIN', true)
    // 模拟登陆
    /* var res = await new Promise((resolve, reject) => {
      user.id = 1
      user.nickName = '管理员'
      sessionStorage.setItem('user', JSON.stringify(user))
      setTimeout(() => {
        resolve({bool: true, user})
      }, 2000)
    }) */
    commit('SET_LOGIN_USER', user)
   // commit('SET_LOGIN_TOKEN', '4eea90fd-2752-481d-ae67-c75f8641a94a')
   commit('SET_LOGIN_TOKEN', tokenId)
    return res
  },

  async getLoginUser ({commit}) {
    // 模拟请求用户信息
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var user = sessionStorage.getItem('user')
        // console.log(JSON.parse(user))
        commit('SET_LOGIN_USER', JSON.parse(user))
        resolve({bool: true, user})
      }, 1000)
    })
  },
  async logout ({commit}) {
    // 模拟退出
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        commit('SET_LOGIN_USER', null)
        resolve({bool: true})
      }, 2000)
    })
  }
}

const mutations = {
  // 添加tabs
  add_tabs(state, data) {
    state.options.push(data);
    // console.log(state.options)
},
// 删除tabs
delete_tabs(state, route) {
    let index = 0;
    for (let option of state.options) {
        if (option.route === route) {
            break;
        }
        index++;
    }
    state.options.splice(index, 1);
},
// 设置当前激活的tab
set_active_index(state, index) {
  state.activeIndex = index;
},
  SAVEUSERINFO(state,res){
    // state.token
    //console.log('SAVEUSERINFO',res.tokenId)
    state.tokenId = res.tokenId
    state.nickname = res.name
  },
  SET_DOING_LOGIN (state, isLogin) {
    state.isLogin = isLogin
  },
  SET_LOGIN_USER (state, user) {
    state.user = user
  },
  SET_LOGIN_TOKEN (state, tokenId) {
    state.tokenId = tokenId
  }
}

export default {
  state,
  actions,
  mutations
}
