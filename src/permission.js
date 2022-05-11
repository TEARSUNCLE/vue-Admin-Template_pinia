import router from '@/router'
import store from '@/store'
import { getToken } from './utils/auth'
import { Message } from 'element-ui'

// 导航守卫
router.beforeEach(async(to, from, next) => {
  const token = getToken()
  const url = to.path
  const whiteList = ['/login', '/404']

  // 登录了去其他页面
  if (!whiteList.includes(url) && token) {
    // 没有用户信息
    // if (!store.state.user.userInfo.id) {
    //   await store.dispatch('user/getUserInfo', store.state.user.userId)
    // }
    next()
  } else if // 没登录 去的不是白名单
  (!token && !whiteList.includes(url)) {
    Message.error('请先登录')
    next('/login')
  } else if// 登陆了去登录页
  (token && url === '/login') {
    next('/')
  } else {
    next()
  }
})