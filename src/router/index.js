import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
    },
    {
      path: '/Layout',
      component: resolve => require(['@/layout/Layout'], resolve),
      children: [
        {
          path: '/',
          redirect: '/Home'
        },
        {
          path: '/Home',
          name: 'Home',
          component: resolve => require(['@/views/Home'], resolve)
        }
      ]
    },
    {
      path: '*',
      redirect: '/Home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userInfo = sessionStorage.getItem('userInfo')
  NProgress.start()

  if (userInfo || to.path === '/Login') {
    next()
  } else {
    next({path: '/Login'})
  }
})
router.afterEach(() => {
  NProgress.done()
})

router.$addRoutes = (params) => {
  router.matcher = new Router({mode: 'history'}).matcher
  router.addRoutes(params)
}

export default router

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
