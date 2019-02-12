<template>

<el-container class="app-container"
  :class="{
    'mini-side': isCollapse,
    'hide-side': hideSide
  }"
  >
  <el-aside class="app-side" :width="hideSide ? '0' : sideWidth + 'px'"
    :style="{background: theme.theme.backgroundColor}"
    >
    <div class="app-header-logo-box"
      :style="{height: headerHeight + 'px', color: theme.theme.activeTextColor}"
      >
      <img src="../assets/img/logo.png" alt="" class="header-logo" v-if="!isCollapse">
    </div>
    <app-side :collapse="isCollapse" :theme="theme.theme"></app-side>
  </el-aside>
  <el-container style="overflow-x: auto">
    <el-header class="app-header" height="50px">
      <app-header @switch="handleSideSwitch" @set-theme="handleSetTheme" @hide-side="handleSwitchHideSide"></app-header>
    </el-header>
    <el-main class="app-body loadingArea">
      <el-container style="min-height: 700px;background:#fff;" id="appBody">
        <el-main class="app-page-body" style="width:100%;">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
              
            </router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive">
            
            
          </router-view>
          <!-- <router-view></router-view> -->
        </el-main>
        <!-- <el-footer class="app-footer" :height="footerHeight + 'px'">
           <app-footer></app-footer> 
        </el-footer> -->
      </el-container>
    </el-main>
  </el-container>
  <m-back-top body-id="appBody"></m-back-top>
</el-container>


</template>
<script type="text/javascript">
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppSide from '@/components/app-side'
export default {
  name: 'app-view',
  data () {
    return {
      isCollapse: false,
      hideSide: false,
      sideWidth: 200,
      footerHeight: 50,
      headerHeight: 98,
      theme: {theme: {}},
      
    }
  },
  components: {
    AppHeader,
    AppFooter,
    AppSide
  },
  /* mounted() {   // 这个不起作用呢
     window.onresize = function windowResize () {
                // 通过捕获系统的onresize事件触发我们需要执行的事件
                // this.myWidth = (window.innerWidth - 500) + 'px';
                if(window.innerWidth<1000){
                // console.log(window.innerWidth)
                  this.hideSide = true;
                  this.isCollapse=true;
                  this.sideWidth =60;
                  console.log(this.isCollapse,this.sideWidth)
                }
            }
  }, */
  methods: {
    handleSideSwitch (val) {
      this.isCollapse = val
      this.sideWidth = val ? 60 : 200
    },
    handleSwitchHideSide () {
      this.hideSide = !this.hideSide
    },
    handleSetTheme (theme) {
      this.theme = theme
    }
  }
}
</script>
<style type="text/css">
  .app-container{
    margin: 0 auto;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .app-container .app-header{
    padding: 0;
    background: #16AAD8;
    overflow: visible;
    z-index: 100;
  }
  .app-container .app-side{
    width: 200px;
    transition: all 0.5s ease;
  }
  .app-container .app-body{
    background: #ECF0F4;
    /* padding: 15px; */
    
  }
  .app-container .app-footer{
    background: #fff;
    border-top: solid 1px rgba(48, 54, 62, 0.14);
  }
  .app-container .app-page-body{
    overflow: visible;
    padding: 0px;
    /* background: #fff; */
  }
  .app-header-logo-box{
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .app-header-logo-box .header-logo{
    height: 98px;
    vertical-align: middle;
  }
  .app-header-logo-box .header-logo-text{
    font-size: 20px;
    font-weight: bold;
    opacity: 1;
  }

  /*mini-side*/
  .app-container.mini-side .app-side{
    overflow: visible;
  }
  .app-container.mini-side .app-side .el-menu--collapse{
    width: 60px;
  }
  .app-container.mini-side .header-logo{
    margin-left: -10px;
  }
  .app-container.mini-side .header-logo-text{
    opacity: 0;
  }
  /*hide-side*/
  .app-container.hide-side .app-side{
    display: none;
  }
</style>
