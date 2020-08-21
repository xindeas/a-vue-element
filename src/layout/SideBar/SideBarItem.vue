<template>
  <el-submenu :index="formItem.id" v-if="formItem.children && formItem.children.length > 0" :popper-append-to-body="appendToBody">
    <template slot="title">
      <i v-if="formItem.icon" :class="formItem.icon"></i>
      <span slot="title">{{formItem.label}}</span>
    </template>
    <template v-for="(item, index) in formItem.children">
      <SideBarItem :key="index" :form-item="item"></SideBarItem>
    </template>
  </el-submenu>
  <el-menu-item :index="formItem.id" @click="openTab" v-else>
    <i v-if="formItem.icon" :class="formItem.icon"></i>
    <span slot="title">{{formItem.label}}</span>
  </el-menu-item>
</template>

<script>
import {
  Menu,
  MenuItem,
  Submenu
} from 'element-ui'
import { addRouters } from '@/utils/util.js'
export default {
  name: 'SideBarItem',
  components: {
    'el-menu': Menu,
    'el-menu-item': MenuItem,
    'el-submenu': Submenu
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {
          id: '', // 唯一键
          label: '', // 菜单名称
          path: '', // 路径
          icon: '', // class图标
          children: [] // 子节点
        }
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openTab: function () {
      addRouters(this.formItem)
    }
  }
}
</script>

<style scoped>
  .el-submenu {
    position: static;
  }
</style>
