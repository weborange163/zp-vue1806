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
    <el-main class="app-body">
      <el-container style="min-height: 700px;background:#fff;" id="appBody">
        <el-main class="app-page-body" style="width:100%;">
          <!-- <el-tabs v-model="activeIndex" type="card" @tab-click="tabClick" v-if="options.length" @tab-remove="tabRemove">
            <el-tab-pane               
              :key="item.path"
              v-for="(item) in options"
              v-if="item.name!='首页'"
              :p_id="item.num"
              :label="item.name"                
              :name="item.route"
              closable>
            </el-tab-pane>
            <el-tab-pane       
              v-else
              :key="item.name"
              :label="item.name"
              :name="item.route"
              :closable="false"
            >
            </el-tab-pane>
          </el-tabs> -->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
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
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
    }
  },
  components: {
    AppHeader,
    AppFooter,
    AppSide
  },
  methods: {
    tabClick(tab) {
        let path = this.activeIndex;
        // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
        if (this.activeIndex === '/userInfo') {
          //  path = this.activeIndex + '/' + this.$store.state.userInfo.name;
        }
        this.$router.push({ path: path });//路由跳转
    },
    tabRemove(targetName) {
        // 首页不可删除
        if (targetName == '/') {
            return;
        }
        //将改tab从options里移除
        this.$store.commit('delete_tabs', targetName);
        //还同时需要处理一种情况当需要移除的页面为当前激活的页面时，将上一个tab页作为激活tab
        if (this.activeIndex === targetName) {
            // 设置当前激活的路由
            if (this.options && this.options.length >= 1) {
                this.$store.commit('set_active_index', this.options[this.options.length - 1].route);
                this.$router.push({ path: this.activeIndex });
            } else {
                this.$router.push({ path: '/' });
            }
        }
    },
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
  },
  computed: {
    options () {
      return this.$store.state.user.options;
    },
    activeIndex: {
      get () {
        return this.$store.state.user.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  /* watch: {
    '$route'(to) {
      let flag = false;
      // console.log(this.options);
      console.log(to.path);
      for (let option of this.options ) {
        console.log(option.path)
        if (option.path === to.path) {
          flag = true;
          // this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
          this.$store.commit('set_active_index', '/' + to.path.substr(1));
          break
        }
      }
      if (!flag) {
        //  console.log(to);
        this.$store.commit('add_tabs', {route: '/' + to.path.substr(1), name: to.name,num: to.query.num,path:to.path});
        this.$store.commit('set_active_index', '/' + to.path.substr(1));
      }
    }
  } */
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
