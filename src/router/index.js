import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/store.js'
import { addWithoutPush, addMenuList } from '@/utils/util.js'
import { MENU_LIST } from '@/utils/const.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
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
  if ((!permissionList || permissionList.length <= 0) && userInfo) {
    store.commit('permissionList', MENU_LIST)
    addMenuList()
    next(to)
  } else {
    if (userInfo || to.path === '/Login') {
      if (to.meta.label) {
        let item = {
          label: to.meta.label,
          path: to.path
        }
        addWithoutPush(item)
      }
      next()
    } else {
      next({path: '/Login'})
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
