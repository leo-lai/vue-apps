// import { INCREMENT, DECREMENT } from './mutation-types'
// getters与actions命名不能相同
const getters = {
	route: (state) => state.route,
  confirm: (state) => state.app_confirm,
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
	}
}
module.exports = { getters, actions }

// export default {
// 	getters, actions
// }
