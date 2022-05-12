import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
const Timeout = 3600
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// function checkTimeOut() {
//   const dateNow = Date.now()
//   const authTime = getTimeStamp()
//   // 毫秒除以1000变成秒，要一个小时才生效
//   return (dateNow - authTime) / 1000 > Timeout
// }

// 请求拦截
service.interceptors.request.use(req => {
  // 有token
  if (store.getters.token) {
    // if (checkTimeOut()) {
    //   store.dispatch('user/storeRemoveToken')
    //   router.push('/login')
    //   return Promise.reject(new Error('会话已过期，请重新登录'))
    // }
    // req.headers.Authorization = `Bearer ${store.getters.token}`
    req.headers.Authorization = store.getters.token
  }
  return req
}, error => {
  return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use((res) => {
  if (res.status && (res.status === 200)) {
    // store.commit('user/setLoginTime')
    return res.data
  } else {
    Message.error(res.statusText)
    return Promise.reject(new Error(res.statusText))
  }
}, (err) => {
  console.log(err.response)
  // 后台对于不合法token的处理
  if (err.response && err.response.data && err.response.data.statusCode === 403) {
    store.dispatch('user/userLogout')
    router.push('/login')
    err.message = '违法的验证信息，请重新登录'
  }
  if (err.response && err.response.data && err.response.data.statusCode === 400) {
    err.message = '请求失败'
  }
  // else {
  //   err.message = '业务繁忙，请重试'
  // }
  // Message.error(err.message)
  Message.error(err.message)
  return Promise.reject(err)
})

export default service