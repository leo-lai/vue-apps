import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用状态
const state = {
  isLoading: false,
  direction: ''  // in or out
}

// 变更函数
const mutations = {
  UPDATE_LOADING (state, status) {
    state.isLoading = status
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  }
}

// Store实例
export default new Vuex.Store({
  state,
  mutations
})
