// 实现对 axios 的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const timeout = 3600
function IsCheckTimeout() {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > timeout
}
// 通过 axios 创建实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 判断是否有 token 如果有就在请求发出之前在 headers 中注入 token
  if (store.getters.token) {
    if (IsCheckTimeout()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 1. 考虑把哪些数据抛出去
  // 2. 接口成功 并且 业务成功 才返回数据
  // 3. 没有成功 Promise.reject() 抛出错误
  const { data, message, success } = response.data
  if (success) {
    return data
  }
  // 业务逻辑没成功
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token超时') // 提示错误信息
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})
export default service
