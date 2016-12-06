import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用状态
const state = {
  app_confirm: {
    show: false,
    title: '确认提示框',
    desc: '提示内容',
    onConfirm(){},
    onCancel(){}
  },
  app_loading: false,
  app_direction: ''  // in or out
}

// 变更函数
const mutations = {
  APP_LOADING (state, status) {
    state.app_loading = status
  },
  APP_DIRECTION (state, inOrout) {
    state.app_direction = inOrout
  },
  APP_CONFIRM (state, config) {
    Object.assign(state.app_confirm, config)
  }
}

// Store实例
export default new Vuex.Store({
  state,
  mutations
})
