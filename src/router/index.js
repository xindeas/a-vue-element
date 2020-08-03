import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/store.js'
import { addMenuList } from '@/utils/util.js'
import { MENU_LIST } from '@/utils/const.js'

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
    },
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
    //       component: resolve => require(['@/views/Home'], resolve)
    //     }
    //   ]
    // },
    {
      path: '*',
      redirect: '/Login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userInfo = sessionStorage.getItem('userInfo')
  NProgress.start()

  const permissionList = store.state.permissionList
  if ((!permissionList || permissionList.length <= 0) && userInfo) {
    store.commit('permissionList', MENU_LIST)
    addMenuList()
    next()
  } else {
    if (userInfo || to.path === '/Login') {
      next()
    } else {
      next({path: '/Login'})
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

router.$addRoutes = (params) => {
  router.addRoutes(params)
}

export default router

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
