import store from '@/store/store.js'
import router from '@/router'
import { MAX_TAB_NUM, DEFAULT_ROUTER_ITEM, DEFAULT_RECENT_ROUTERS } from '@/utils/const.js'

// 动态增加标签栏标签并且做页面跳转
export function addRouters (routeItem) {
  addWithoutPush(routeItem)
  router.push(routeItem)
}

export function addWithoutPush (routeItem) {
  let maxTabNum = MAX_TAB_NUM - DEFAULT_RECENT_ROUTERS.length
  maxTabNum = maxTabNum > 0 ? maxTabNum : 1
  let recentRouters = store.state.recentRouters
  if (recentRouters.filter(item => item.path === routeItem.path).length <= 0) {
    recentRouters.push(routeItem)
  }
  // 先排除默认标签页
  recentRouters = recentRouters.splice(DEFAULT_RECENT_ROUTERS.length)
  // 截取最后n个
  recentRouters = recentRouters.splice(-maxTabNum, maxTabNum)
  recentRouters = DEFAULT_RECENT_ROUTERS.concat(recentRouters)

  store.commit('curRouter', routeItem.path)
  store.commit('recentRouters', recentRouters)
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
    curRouter = recentRouters[recentRouters.length - 1]
  } else {
    curRouter = DEFAULT_ROUTER_ITEM
    recentRouters = [curRouter]
  }
  store.commit('curRouter', curRouter.path)
  store.commit('recentRouters', recentRouters)
  router.push(curRouter)
}

// 把整个菜单列表加入路由
export function addMenuList () {
  const menuList = store.state.permissionList
  const recentRouters = store.state.recentRouters
  let result = []
  result = result.concat(getLeafData(recentRouters))
  result = result.concat(getLeafData(menuList))
  const data = [{
    path: '/Layout',
    component: resolve => require(['@/layout/Layout'], resolve),
    children: result
  }]
  router.$addRoutes(data)
}
// 获取欢迎词
export function getHelloText () {
  const date = new Date()
  const hour = date.getHours()
  if (hour >= 0 && hour <= 10) {
    return '早上好'
  } else if (hour > 10 && hour <= 13) {
    return '中午好'
  } else if (hour > 13 && hour <= 18) {
    return '下午好'
  } else if (hour > 18 && hour <= 24) {
    return '晚上好'
  } else {
    return '你好'
  }
}
/** ===============内部私有函数================== **/
// 取得叶子节点
function getLeafData (data) {
  let result = []
  for (let item of data) {
    if (item.children && item.children.length > 0) {
      result = result.concat(getLeafData(item.children))
    } else {
      const path = item.path.startsWith('/') ? item.path : '/' + item.path
      const pathArr = path.split('/')
      const name = pathArr[pathArr.length - 1]
      const data = {
        path: path,
        name: name,
        meta: {
          label: item.label,
          breadcrumb: item.paths || item.label
        },
        component: resolve => require(['@/views' + path], resolve)
      }
      result.push(data)
    }
  }
  return result
}
