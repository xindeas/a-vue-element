<template>
<!--  <transition name="el-fade-in-linear">-->
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      :collapse-transition="false"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      unique-opened>
      <div class="sys-logo" @click="openDefaultTab">
        <img src="@/assets/img/logo.png"/>
        <span v-if="!isCollapse">{{sysName}}</span>
      </div>
      <template v-for="(item,index) in menuList">
        <SideBarItem :key="index" :form-item="item"></SideBarItem>
      </template>
    </el-menu>
<!--  </transition>-->
</template>

<script>
import {
  Menu
} from 'element-ui'
import SideBarItem from './SideBarItem'
import { SYS_NAME, DEFAULT_ROUTER_ITEM } from '@/utils/const.js'
import { addRouters, getCurRouteId } from '@/utils/util.js'
export default {
  name: 'SideBar',
  components: {
    'el-menu': Menu,
    SideBarItem
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      sysName: SYS_NAME
    }
  },
  computed: {
    menuList: function () {
      return this.$store.state.permissionList
    },
    curRouter: function () {
      return this.$store.state.curRouter
    },
    defaultActive: function () {
      return getCurRouteId(this.curRouter, this.menuList)
    }
  },
  methods: {
    openDefaultTab: function () {
      addRouters(DEFAULT_ROUTER_ITEM)
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo {
    height: 100%;
  }
  .sys-logo {
    height: 4em;
    text-align: center;
    cursor: pointer;
    color: white;
  }
  .sys-logo:after {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .sys-logo img {
    width: 2em;
    height: 2em;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
  }
  .sys-logo span {
    display: inline-block;
    vertical-align: middle;
    font-weight: bold;
    font-size: 1.5em;
    font-family: Font001;
  }
  .el-menu {
    position: static;
  }
</style>
