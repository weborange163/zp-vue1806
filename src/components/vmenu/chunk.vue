<template>
<el-menu-item-group>
<template v-for="item in menus">
  <template v-if="isArr(item)">
  <el-menu-item-group
    :title="typeof item[0] === 'string' ? item[0] : ''"
    >
    <el-menu-item
      v-for="(val, index) in item[1]"
      :key="val.id"
      :index="val.id + ''"
      :route="toRoute(val)"
      >
      <i v-if="val.icon" :class="val.icon"></i>
      <span slot="title">{{val.label}}</span>
    </el-menu-item>
  </el-menu-item-group>
  </template>
  <template v-else>
    <el-submenu
      v-if="item.submenu"
      :key="item.id"
      :index="item.name"
      @click="aa(item)"
      >
      <template slot="title">
        <i v-if="item.icon" :class="item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <menu-list :menus="item.submenu"></menu-list>
    </el-submenu>
    <el-menu-item
      v-else
      :key="item.id"
      :index="item.name"
      :route="toRoute(item)"
      @click="aa(item)"
      >
      <i v-if="item.icon" :class="item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
  </template>
</template>
</el-menu-item-group>
</template>
<script type="text/javascript">
import menuList from './chunk-2'
export default {
  props: {
    menus: Array
  },
  components: {
    menuList
  },
  methods: {
    isArr (v) {
      return Object.prototype.toString.call(v) === '[object Array]'
    },
    toRoute (item) {
      if (item.path) {
        return {path: item.path}
      }else if (item.name) {
        return {name: item.name}
      }
      return {}
    },
    aa(item) {
      console.log(item);
      
    }
  }
}
</script>
