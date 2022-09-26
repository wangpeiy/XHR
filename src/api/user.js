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
