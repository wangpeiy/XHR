import request from '@/utils/request'

/**
 * @ 获取组织架构数据
 * @returns Promise
 */
export function getDepartmentsAPI() {
  return request({
    url: '/company/department'
  })
}
