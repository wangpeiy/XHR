import request from '@/utils/request'

/**
 * @ 获取员工简单列表
 * @returns Promise
 */
export function getEmployeeSimpleAPI() {
  return request({
    url: `/sys/user/simple`
  })
}

/**
 * @ 新增部门接口
 *
 * ****/
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
