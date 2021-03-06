import Vue from 'vue'
import vuex from 'vuex'
import { DEFAULT_ROUTER, DEFAULT_RECENT_ROUTERS, DEFAULT_COMP_SIZE } from '@/utils/const.js'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    // 组件大小
    size: DEFAULT_COMP_SIZE,
    // 最侧菜单展开状态
    menuCollapse: true,
    // 当前路由
    curRouter: DEFAULT_ROUTER,
    // 近期路由，深度复制，否则常量内容会被改变
    recentRouters: JSON.parse(JSON.stringify(DEFAULT_RECENT_ROUTERS)),
    // 菜单权限列表
    permissionList: [],
    // 不展示在菜单中但是又希望通过路由访问的页面
    otherRouterList: [],
    // 面包屑
    breadcrumb: []
  },
  mutations: {
    size (state, val) {
      state.size = val
    },
    menuCollapse (state, val) {
      state.menuCollapse = val
    },
    curRouter (state, val) {
      state.curRouter = val
    },
    recentRouters (state, val) {
      state.recentRouters = val
    },
    permissionList (state, val) {
      state.permissionList = val
    },
    otherRouterList (state, val) {
      state.otherRouterList = val
    },
    breadcrumb (state, val) {
      state.breadcrumb = val
    }
  },
  actions: {}
})
