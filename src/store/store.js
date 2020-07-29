import Vue from 'vue'
import vuex from 'vuex'
import { DEFAULT_ROUTER, DEFAULT_RECENT_ROUTERS, DEFAULT_COMP_SIZE } from '@/utils/const.js'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    size: DEFAULT_COMP_SIZE,
    menuCollapse: true,
    curRouter: DEFAULT_ROUTER,
    // 深度复制，否则常量内容会被改变
    recentRouters: JSON.parse(JSON.stringify(DEFAULT_RECENT_ROUTERS))
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
    }
  },
  actions: {}
})
