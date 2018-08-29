<template>
<m-navbar :theme="theme.theme.headerTheme">
  <m-navbar-brand>
    <i class="side-switch"
      :class="{
        'el-icon-more': !mini,
        'el-icon-more-outline': mini
      }"
      @click="handleSwitchSide"
      ></i>
  </m-navbar-brand>
  <m-nav>
    <h2 style="font-size:18px;">后台管理系统1.0</h2>
  </m-nav>
  <m-nav align="right">
    <m-nav-item padding="0 20px 0 0">
      <i class="iconfont icon-personal" style="font-size: 20px;vertical-align: middle;"></i>&nbsp;<span v-if="nickname">{{nickname}}</span>
    </m-nav-item>
    <!-- <m-nav-item padding="0 20px 0 0">
      <i class="iconfont icon-lock1" style="font-size: 20px;vertical-align: middle;"></i>&nbsp;<span>修改密码</span>
    </m-nav-item> -->
     <m-nav-item padding="0">
      <div @click="logout()"><i class="iconfont icon-logout" style="font-size: 18px;vertical-align: middle;"></i>&nbsp;<span>退出</span></div>
    </m-nav-item>
    <!-- <m-nav-item padding="0">
      <m-dropdown align="right" v-if="user" padding="0 10px">
        <a href="#" style="display: inline-block; padding: 0px; color: inherit">
          <img src="../assets/user.jpg" alt="" style="border-radius: 3px;vertical-align: middle;">
          <span>{{user.username}}</span> 
          <span class="caret"></span>
        </a>
        <m-dropdown-panel>
          <m-dropdown-item>用户信息</m-dropdown-item>
          <m-dropdown-item >修改密码</m-dropdown-item>
           <m-dropdown-item disabled>注销</m-dropdown-item> 
           <div class="test-line"></div> 
          <m-dropdown-item name="login">退出账号</m-dropdown-item>
        </m-dropdown-panel>
      </m-dropdown>
    </m-nav-item> -->
   <!-- <m-nav-item padding="0 5px">
      <a href="#" @click.stop.prevent="handleSwitchScreen">
        <i 
          class="fa" 
          :class="isFullScreen ? 'fa-compress' : 'fa-expand'"
          ></i>
      </a>
    </m-nav-item>-->

    <!-- <m-nav-item padding="0">
      <m-dropdown align="right" padding="0 10px">
        <a href="#"  style="padding:0 0px; color: inherit">
          <i class="fa fa-gears"></i>
        </a>
        <m-dropdown-panel style="width: 200px; min-height: 100px;">
          <el-form>
            <el-form-item label="侧边栏">
              <el-switch v-model="showAside" @change="handleSwitchHideSide" />
            </el-form-item>
            <el-form-item label="主题">
              <el-select v-model="themeType" style="width: 100px">
                <el-option
                  v-for="theme in themes"
                  :key="theme.label"
                  :label="theme.label"
                  :value="theme.name"
                  ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </m-dropdown-panel>
      </m-dropdown>
    </m-nav-item> -->
  </m-nav>
</m-navbar>
</template>
<script type="text/javascript">
import {mapActions, mapState} from 'vuex'
import {
  requestFullScreen,
  exitFullscreen
} from '@/utils'
import themes from './theme'
export default {
  name: 'app-header',
  data () {
    return {
      nickname:this.$store.state.user.nickname,
      mini: false,
      isFullScreen: false,
      themes,
      themeType: '',
      showAside: true,
      theme: {theme: {headerTheme: 'info'}}
    }
  },
  computed: {
    // user(){this.$store.state.user.user}
    /* ...mapState({
      user: ({
        
      }) => user.name
    }) */
  },
  watch: {
    themeType (val) {
      this.theme = this.themes.find(e => e.name === val) || {}
      this.$emit('set-theme', this.theme)
      sessionStorage.setItem('theme', val)
    }
  },
  methods: {
    ...mapActions(['getLoginUser', 'logout']),
    logout(){
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          localStorage.setItem('active_index', 1)
          sessionStorage.removeItem('tokenId');
          this.$router.replace('/login')
          this.$message({
            type: 'success',
            message: '已登出!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消登出'
          });
        });
    },
    handleSwitchSide () {
      this.mini = !this.mini
      this.$emit('switch', this.mini)
    },
    handleSwitchScreen () {
      if (this.isFullScreen) {
        exitFullscreen()
        this.isFullScreen = false
      } else {
        requestFullScreen()
        this.isFullScreen = true
      }
    },
    handleSwitchHideSide () {
      console.log('change')
      this.$emit('hide-side')
    }
  },
  created () {
    this.getLoginUser()
    var theme = sessionStorage.getItem('theme') || 'zhongping'
    this.themeType = theme
  }
}
</script>
<style type="text/css">
  .side-switch{
    display: inline-block;
    font-size: 32px;
    cursor: pointer;
    color: inherit;
    margin-top: 10px;
  }
  .side-switch:hover{
    color: #24335A;
  }
  
</style>
