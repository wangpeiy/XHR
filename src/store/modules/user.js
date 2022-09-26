import { loginAPI, getUserInfoAPI, getUserDetailByIdAPI } from '@/api'
const state = {
  token: null,
  userInfo: {}
}
const mutations = {
  // 设置token
  SET_TOKEN(state, token) {
    state.token = token
  },
  // 设置用户信息
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清空用户信息
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 登录请求API
  async loginAction({ commit }, loginForm) {
    // 接口
    const data = await loginAPI(loginForm)
    // 调用 SET_TOKEN 函数 设置 token
    commit('SET_TOKEN', data)
  },

  // 获取用户信息API
  async getUserInfo({ commit }) {
    // 获取用户基本信息
    const data1 = await getUserInfoAPI()
    // 通过ID获取用户详细信息
    const data2 = await getUserDetailByIdAPI(data1.userId)
    // 合并信息
    const result = { ...data1, ...data2 }
    commit('SET_USER_INFO', result)
    return JSON.parse(JSON.stringify(result))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
