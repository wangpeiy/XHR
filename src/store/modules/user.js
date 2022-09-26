import { loginAPI } from '@/api'
const state = {
  token: null
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}
const actions = {
  async loginAction({ commit }, loginForm) {
    // 接口
    const data = await loginAPI(loginForm)
    // 调用 SET_TOKEN 函数 设置 token
    commit('SET_TOKEN', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
