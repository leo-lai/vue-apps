// import { INCREMENT, DECREMENT } from './mutation-types'
// getters与actions命名不能相同
const getters = {
	route: (state) => state.route,
  confirm: (state) => state.app_confirm,
  toptips: (state) => state.app_toptips,
  loading: (state) => state.app_loading,
  direction: (state) => state.app_direction
}

const actions = {
	acConfirm: ({ dispatch }, config) => {
		let defaultConfig = Object.assign({
			show: true,
			title: '',
			desc: '',
			onConfirm() {},
			onCancel() {}
		}, config)

		dispatch('APP_CONFIRM', defaultConfig)
	},
	acToptips: ({ dispatch }, msg, type) => {
		let defaultConfig = Object.assign({
			show: true,
	    msg: '',
	    type: 'error'
		}, { msg, type })

		dispatch('APP_TOPTIPS', defaultConfig)

		clearTimeout(actions.acToptips.timeid)
		actions.acToptips.timeid = setTimeout(()=>{
			defaultConfig.show = false
			dispatch('APP_TOPTIPS', defaultConfig)
		}, 3000)
	},
	acLoading: ({ dispatch }, show, text) => {

		let defaultConfig = Object.assign({
			show: true,
	    text: '加载中'
		}, { show, text })

		dispatch('APP_LOADING', defaultConfig)
	}
}
module.exports = { getters, actions }

// export default {
// 	getters, actions
// }
