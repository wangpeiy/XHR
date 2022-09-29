import request from '@/utils/request'

/**
 * @ 读取角色列表数据API
 * @param {Object} params
 * @returns Promise
 */
export const getRoleListAPI = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * @ 添加角色API
 * @param {Object} data
 * @returns Promise
 */
export const addRoleAPI = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
/**
 * @ 编辑角色
 * @param {*} data
 * @returns Promise
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

/** **
 *  @删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * @获取公司信息
 * **/
export function getCompanyInfoAPI(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

