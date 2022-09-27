import { loginAPI, getUserInfoAPI, getUserDetailByIdAPI } from '@/api'
const state = {
  token: null,
  userInfo: {},
  hrsaasTime: 0
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
  },
  // 清空token
  REMOVE_TOKEN(state) {
    state.token = null
  },
  // 设置获取到token的时间
  SET_HRSAAS_TIME(state, hrsaasTime) {
    state.hrsaasTime = hrsaasTime // 属于时间1 获取到token的时间
  }
}
const actions = {
  // 登录请求API
  async loginAction({ commit }, loginForm) {
    // 接口
    const data = await loginAPI(loginForm)
    // 调用 SET_TOKEN 函数 设置 token
    commit('SET_TOKEN', data)
    commit('SET_HRSAAS_TIME', new Date().getTime())
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
  },

  logout({ commit }) {
    commit('REMOVE_USER_INFO')
    commit('REMOVE_TOKEN')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
