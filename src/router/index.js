import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/store.js'
import { addWithoutPush, addMenuList } from '@/utils/util.js'
import { MENU_LIST, OTHER_ROUTER_LIST } from '@/utils/const.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['@/layout/Login'], resolve)
    }
    // {
    //   path: '/Layout',
    //   component: resolve => require(['@/layout/Layout'], resolve),
    //   children: [
    //     {
    //       path: '/',
    //       redirect: '/Home'
    //     },
    //     {
    //       path: '/Home',
    //       name: 'Home',
    //       meta: {
    //         label: '主页'
    //       },
    //       component: resolve => require(['@/views/Home'], resolve)
    //     }
    //   ]
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const userInfo = sessionStorage.getItem('userInfo')
  NProgress.start()

  const permissionList = store.state.permissionList
  // 判断是否已登录，并且菜单权限列表为空
  if ((!permissionList || permissionList.length <= 0) && userInfo) {
    // 此处访问后台获取权限，返回值存放至store.permissionList
    store.commit('permissionList', MENU_LIST)
    // 根据需求决定是写死还是从后台取数据，通常情况写死
    store.commit('otherRouterList', OTHER_ROUTER_LIST)
    addMenuList()
    // next(to)会递归调用自身，利用这点实现刷新页面后加载最后打开的标签并展示在标签栏上
    next(to)
  } else {
    if (userInfo || to.path === '/Login') {
      if (to.meta.label) {
        const item = {
          label: to.meta.label,
          path: to.path
        }
        addWithoutPush(item)
      }
      // 此处不能使用next(to)否则递归调用自身会陷入死循环
      next()
    } else {
      next({ path: '/Login' })
    }
  }
})
router.afterEach((to, from, next) => {
  NProgress.done()
  if (to.meta.breadcrumb) {
    store.commit('breadcrumb', to.meta.breadcrumb.split(/[,，]/g))
  }
})

router.$addRoutes = (params) => {
  router.addRoutes(params)
}

export default router

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
