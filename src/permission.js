import router from './router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const whitelist = ['/404', '/login']
router.beforeEach(async(to, from, next) => {
  // 1. 判断是否存在token
  // 1.1 存在 处于登录状态 是否去往登录页 处于 则去首页 否则放行
  // 1.2 不存在 不处于登录状态 判断去往页面是否处于白名单 处于 则放行 否则去往登录页
  nprogress.start()
  if (store.getters.token) {
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whitelist.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()
})

router.afterEach(() => {
  nprogress.done()
})
