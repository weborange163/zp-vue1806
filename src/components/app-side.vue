<template>

<v-menu class="side-menu"
  :collapse="collapse"
  :default-active="defaultActive"
  :menus="menus"
  router
  :background-color="theme.backgroundColor"
  :text-color="theme.textColor"
  :active-text-color="theme.activeTextColor"
  ></v-menu>


</template>
<script type="text/javascript">
import VMenu from './vmenu'
//import MyMenu from './mymenu'  // 木有用
import menus from './menus'
export default {
  props: {
    collapse: Boolean,
    theme: Object
  },
  components: {
    VMenu
  },
  data () {
    return {
      menus:menus,
      // menus:JSON.parse(sessionStorage.getItem('menus')),  // 隐藏import menus from './menus'  和上一行,打开此行
      defaultActive: 'home',
      test: 'asdfasdf'
    }
  },
  created(){
    var menus = sessionStorage.getItem('menus');
    this.menus = JSON.parse(menus);
    console.log(this.menus);
  },
  watch: {
    $route () {
      this.setCurrentRoute()
    }
  },
  
  methods: {
    setCurrentRoute () {
      // console.log(this.$route)
      this.defaultActive = this.$route.name
    }
  },
  created () {
    this.setCurrentRoute()
  }
}
</script>
<style type="text/css">
  .el-menu.side-menu{
    border-right: none;
  }
  .el-submenu__title,
  .el-menu-item{
    font-size: 16px;
  }
  .el-submenu .el-menu-item{
    font-size: 14px;
  }
  .el-menu .iconfont{
    /* font-size: 18px; */
    color:#8BAEF1;
    margin-right: 7px;
    display: inline-block;
    width: 22px;
    text-align: center;
  }
  .el-menu.side-menu .el-menu-item.is-active {
    color: #409EFF;
    border-right: solid 2px #36c1fa;
    background: #eef3f5;
  }
  
  .el-menu .icon-index:before,
  .el-menu .icon-chart::before{
    font-size: 16px;
  }
  .el-menu .icon-yunying:before{
    font-size: 14px;
  }
  .el-menu .icon-diamond:before{
    font-size: 19px;
  }
</style>
