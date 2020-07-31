import store from '@/store/store.js'
import router from '@/router'
import { MAX_TAB_NUM, DEFAULT_ROUTER_ITEM, DEFAULT_RECENT_ROUTERS } from '@/utils/const.js'
import { Message } from 'element-ui'

// 动态增加标签栏标签并且做页面跳转
export function addRouters (routeItem) {
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

  addAndRout(routeItem)
  store.commit('curRouter', routeItem.path)
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
    curRouter = recentRouters[recentRouters.length - 1]
  } else {
    curRouter = DEFAULT_ROUTER_ITEM
    recentRouters = [curRouter]
  }
  addAndRout(curRouter)
  store.commit('recentRouters', recentRouters)
  store.commit('curRouter', curRouter.path)
  router.push(curRouter)
}
// 动态添加子路由
function addAndRout (routeItem, callback) {
  const path = routeItem.path.startsWith('/') ? routeItem.path : '/' + routeItem.path
  const pathArr = path.split('/')
  const name = pathArr[pathArr.length - 1]
  const data = [{
    path: '/Layout',
    component: resolve => require(['@/layout/Layout'], resolve),
    children: [
      {
        path: path,
        name: name,
        component: resolve => require(['@/views' + path], resolve, () => {
          Message.error({
            showClose: true,
            message: '加载出错,页面不存在',
            type: 'error'
          })
        })
      }
    ]
  }]
  router.$addRoutes(data)
}
// 获取欢迎词
export function getHelloText () {
  const date = new Date()
  const hour = date.getHours()
  if (hour >= 0 && hour <= 11) {
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
