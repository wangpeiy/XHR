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

/*
* 获取员工的综合列表数据
* ***/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** *
 *  批量导入员工
 * ***/

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetailAPI(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

export function savePersonalDetailAPI(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetailAPI(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJobAPI(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
