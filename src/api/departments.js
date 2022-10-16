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

/**
 * 编辑部门
 *
 * ***/
export function updateDepartmentsAPI(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  根据id根据部门  接口是根据restful的规则设计的   删除 delete  新增 post  修改put 获取 get
 * **/
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}