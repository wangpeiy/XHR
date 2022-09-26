// 实现对 axios 的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
// 通过 axios 创建实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
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
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
