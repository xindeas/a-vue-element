import store from '@/store/store.js'
import router from '@/router'
import { MAX_TAB_NUM, DEFAULT_ROUTER_ITEM, DEFAULT_RECENT_ROUTERS } from '@/utils/const.js'

// 动态增加标签栏标签并且做页面跳转
export function addRouters (routeItem) {
  let maxTabNum = MAX_TAB_NUM - DEFAULT_RECENT_ROUTERS.length
  maxTabNum = maxTabNum > 0 ? maxTabNum : 1
  store.commit('curRouter', routeItem.path)
  let recentRouters = store.state.recentRouters
  if (recentRouters.filter(item => item.path === routeItem.path).length <= 0) {
    recentRouters.push(routeItem)
  }
  // 先排除默认标签页
  recentRouters = recentRouters.splice(DEFAULT_RECENT_ROUTERS.length)
  // 截取最后n个
  recentRouters = recentRouters.splice(-maxTabNum, maxTabNum)
  recentRouters = DEFAULT_RECENT_ROUTERS.concat(recentRouters)
  store.commit('recentRouters', recentRouters)
  router.push(routeItem)
}

// 动态删除标签栏标签并且做页面跳转
export function delRouters (routeItem) {
  let maxTabNum = MAX_TAB_NUM - DEFAULT_RECENT_ROUTERS.length
  maxTabNum = maxTabNum > 0 ? maxTabNum : 1
  let recentRouters = store.state.recentRouters
  recentRouters = recentRouters.filter(item => item.path !== routeItem.path)
  // 先排除默认标签页
  recentRouters = recentRouters.splice(DEFAULT_RECENT_ROUTERS.length)
  // 截取最后n个
  recentRouters = recentRouters.splice(-maxTabNum, maxTabNum)
  recentRouters = DEFAULT_RECENT_ROUTERS.concat(recentRouters)
  let curRouter = {}
  if (recentRouters.length > 0) {
    store.commit('recentRouters', recentRouters)
    curRouter = recentRouters[recentRouters.length - 1]
    store.commit('curRouter', curRouter.path)
  } else {
    curRouter = DEFAULT_ROUTER_ITEM
    store.commit('recentRouters', [curRouter])
    store.commit('curRouter', curRouter.path)
  }
  router.push(curRouter)
}
export function getHelloText () {
  const date = new Date()
  const hour = date.getHours()
  if (hour >= 0 && hour <= 6) {
    return '凌晨好'
  } else if (hour > 6 && hour <= 11) {
    return '早上好'
  } else if (hour > 11 && hour <= 13) {
    return '中午好'
  } else if (hour > 13 && hour <= 18) {
    return '下午好'
  } else if (hour > 18 && hour <= 24) {
    return '晚上好'
  } else {
    return '你好'
  }
}
