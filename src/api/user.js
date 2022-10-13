import request from '@/utils/request'

export function login(data) {

}

/**
 * @ 获取用户信息API
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export const getUserDetailByIdAPI = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

/**
 * @ 保存用户信息
 * @
 * @ param {Object} data
 * @ returns Promise
 */
export const saveUserDetailByIdAPI = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
