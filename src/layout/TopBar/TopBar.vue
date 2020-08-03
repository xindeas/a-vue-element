<template>
  <div class="top-bar">
<!--    <el-button :class="btnClass" @click="clp"></el-button>-->
    <div class="top-bar-left">
      <i :class="btnClass" @click="clp"></i>
      <el-breadcrumb separator="/">
        <template v-for="(item, index) in breadcrumb">
          <el-breadcrumb-item :key="index" v-if="item">{{item}}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="top-bar-right">
      <div class="hello-text">{{helloText}},{{userInfo.name}}</div>
      <el-dropdown @command="command">
      <span class="el-dropdown-link">
        <el-avatar :size="40" :src="userInfo.userPic" @error="errorHandler" fit="cover">
          <!--        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>-->
          <img src="@/assets/img/pic.png"/>
        </el-avatar>
      </span>
        <el-dropdown-menu slot="dropdown">
          <template v-for="(item, index) in dropList">
            <el-dropdown-item :key="index" :command="item.command" :divided="item.divided" :style="item.style" :disabled="item.disabled">{{item.label}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'
import { USER_INFO_DROPDOWN } from '@/utils/const.js'
import { getHelloText } from '@/utils/util.js'
export default {
  name: 'TopBar',
  components: {
    'el-button': Button,
    'el-avatar': Avatar,
    'el-dropdown': Dropdown,
    'el-dropdown-item': DropdownItem,
    'el-dropdown-menu': DropdownMenu,
    'el-breadcrumb': Breadcrumb,
    'el-breadcrumb-item': BreadcrumbItem
  },
  data: function () {
    return {
      dropList: USER_INFO_DROPDOWN
    }
  },
  computed: {
    isCollapse: function () {
      return this.$store.state.menuCollapse
    },
    breadcrumb: function () {
      return this.$store.state.breadcrumb
    },
    btnClass: function () {
      return {
        'clp-btn': true,
        'el-icon-s-fold': !this.isCollapse,
        'el-icon-s-unfold': this.isCollapse
      }
    },
    userInfo: function () {
      return JSON.parse(sessionStorage.getItem('userInfo'))
    },
    helloText: function () {
      return getHelloText()
    }
  },
  methods: {
    clp: function () {
      this.$store.commit('menuCollapse', !this.isCollapse)
    },
    errorHandler: function () {
      return true
    },
    command: function (command) {
      switch (command) {
        case 'logout':
          sessionStorage.setItem('userInfo', '')
          this.$store.commit('permissionList', [])
          this.$router.push('/Login')
          break
        case 'mypage':
          console.log(command)
          break
        case 'myxxx':
          console.log(command)
          break
        default:
          console.log('出错')
      }
    }
  }
}
</script>

<style scoped>
  .clp-btn {
    cursor: pointer;
    font-size: 1.5em;
    vertical-align: middle;
    display: inline-block;
  }
  .top-bar-left {
    display: inline-block;
    vertical-align: middle;
  }
  .top-bar-left i {
    display: inline-block;
  }
  .top-bar-left .el-breadcrumb {
    margin-left: 1em;
    display: inline-block;
  }
  .top-bar-right {
    position: absolute;
    right: 1em;
    top: 0;
    height: 100%;
  }
  .top-bar-right:after {
    content: '';
    height: 100%;
    vertical-align: middle;
    display: inline-block;
  }
  .top-bar-right .el-avatar {
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;
  }
  .top-bar-right .hello-text {
    display: inline-block;
    margin-right: 1em;
  }
</style>
