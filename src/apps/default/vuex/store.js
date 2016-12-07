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
  app_toptips: {
    show: false,
    msg: '',
    type: 'error'
  },
  app_loading: {
    show: false,
    text: '加载中'
  },
  app_direction: ''  // in or out
}

// 变更函数
const mutations = {
  APP_DIRECTION (state, inOrout) {
    state.app_direction = inOrout
  },
  APP_LOADING (state, config) {
    Object.assign(state.app_loading, config)
  },
  APP_CONFIRM (state, config) {
    Object.assign(state.app_confirm, config)
  },
  APP_TOPTIPS (state, config) {
    Object.assign(state.app_toptips, config)
  }
}

// Store实例
export default new Vuex.Store({
  state,
  mutations
})
