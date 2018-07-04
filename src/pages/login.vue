<template>
<div class="fullscreen">
  <div class="login-box">
    <form action="" class="login-form">
      <p class="log_title">登录 <span>SING IN</span></p>
      <div class="m-list-group">
        <div class="m-list-group-item">
          <i class="iconfont icon-user"></i>
          <!-- <i class="fa fa-user" aria-hidden="true"></i> -->
          <input type="text" placeholder="Username" class="m-input" v-model="username">
        </div>
        <div class="m-list-group-item">
          <i class="iconfont icon-lock"></i>
          <input type="password" placeholder="Password" class="m-input" v-model="password">
        </div>
        <div class="m-list-group-item">
          <i class="iconfont icon-key"></i>
          <input type="text" placeholder="Password" class="m-input" v-model="vercode">
        </div>
      </div>
      
      <button class="m-btn sub select-none" @click.prevent="handleLogin" v-loading="isLoging">登录</button>
    </form>
    <!-- <div style="margin-top: 50px"></div>
    <p class="text-tips">
      <i class="fa fa-meetup" style="color: #29ABE2"></i>&nbsp;
      <span class="footer-text">{{appName}} &nbsp;<el-tag size="mini">{{version}}</el-tag> <br>©make by <a href="#">{{author}}</a>
  </span>
    </p> -->
  </div>
</div>
</template>
<script>
import {mapActions} from 'vuex' // vuex modules
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  name: 'login',
  data () {
    return {
      username: 'zpkj',
      password: '111111',
      vercode:'1234',
      isLoging: false,
      author: window.APP_INFO.author,
      version: window.APP_INFO.version,
      appName: window.APP_INFO.appName
    }
  },
  methods: {
    // ...mapActions(['login']),
    handleLogin () {
      if (!this.username || !this.password) {
        return this.$message.warning('用户名和密码不能为空')
      }
      var params={
        username: this.username,
        password: this.password
      }
      this.$post('loginPT',params).then(res => {
    		if(res.code==0){
          this.isLoging = true;
          setToken(res.data[0].tokenId) //token存入sessionStorage里
          sessionStorage.setItem('nickname',res.data[0].name)
          console.log(res)

          this.$store.dispatch('saveUserInfo', res.data[0]).then(res => {
            this.$message.success('登录成功')
            this.isLoging = false
           this.$router.push({name: 'home'})
          //  this.$router.replace('/')
          }, res => {
            this.$message.success(res.msg)
          }).catch(_ => {
            this.$message.success('登录异常')
          })
        }
    	});
      
      
//    this.login({
//      username: this.username,
//      password: this.password
//    }).then(res => {
//      sessionStorage.setItem('isFirst',1)
//      this.$message.success('登录成功')
//      this.$router.push({name: 'home'})
//      this.isLoging = false
//    })
    }
  }
}
</script>
<style type="text/css">
  .m-list-group{
    border-radius: 3px;
    padding: 0;
    margin: 0 0 20px;
  }
  .m-list-group .m-list-group-item{
    position: relative;
    display: block;
    padding: 6px 10px;
    border-bottom: 1px solid #e7ecee;
  }
  .m-list-group-item input{
    background:#f6f7fb;
    color: #999;
  }
  .m-list-group-item .iconfont{
    color:#3658A7;
  }
  .m-list-group .m-list-group-item:first-child{
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .m-list-group .m-list-group-item:last-child{
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .fullscreen{
    position: absolute;
    width: 100%;
    height: 100%;
    background:url(/static/img/login-bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-box{
    position: relative;
    width: 600px;
    height: 420px;
    margin: 0 auto;
    padding: 40px 0 0 290px;
    background:url(/static/img/log-img.png) no-repeat;
  }
  .login-box .logo{
    /* max-width: 40%; */
    display: block;
    width: 200px;
  }
  .login-form{
    width: 260px;
  }
  .log_title{
    font-size: 20px;
    color: #333;
  }
  .log_title span{
    color: #3658A7;
    font-size: 14px;
  }
  .login-box .text-tips{
    text-align: center;
    color: #909DB7;
  }
  .login-box .m-input{
    width: 90%;
    padding: 10px;
    border: none;
    outline: none;
    box-sizing: border-box;
  }
  .login-box .m-btn{
    font-size: 16px;
    width: 100%;
    color: #fff;
    background-color: #3658A7;
    display: inline-block;
    padding: 10px 12px;
    margin-bottom: 5px;
    line-height: 1.42857143;
    text-align: center;
    cursor: pointer;
    outline: none;
    border-radius: 2px;
    box-sizing: border-box;
    text-decoration: none;
  }
  .login-box .m-btn.m-btn-text{
    background: #fff;
    color: #36C1FA;
  }
  .login-box .m-btn:hover{
    background-color: #3658A7;
  }
  .login-box .m-btn.m-btn-text:hover{
    background-color: #F4F5F5;
  }
  .login-box .m-btn:active{
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    .login-box{
      width: auto;
    }
  }
</style>
