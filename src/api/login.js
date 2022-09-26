import request from '@/utils/request'

/**
 * @ 登录接口
 * @param {Object} data
 * @returns Promise
 */
export const loginAPI = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
