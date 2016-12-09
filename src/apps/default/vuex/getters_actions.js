// import { INCREMENT, DECREMENT } from './mutation-types'
import { utils, storage } from 'assets/utils'
// getters与actions命名不能相同
const getters = {
	route: (state) => state.route,
	userinfo: (state) => {
		if(state.app_userinfo && state.app_userinfo.mobilePhone){
			return state.app_userinfo
		}else{
			return storage.local.get('userinfo') || {}
		}
	},
  direction: (state) => state.app_direction
}

const actions = {
	acUpdateUserInfo: ({ dispatch }) => {
		dispatch('APP_USERINFO', storage.local.get('userinfo') || {})
	},
	acClearUserInfo({ dispatch }) {
		storage.local.set('userinfo', null, 0)
		dispatch('APP_USERINFO', {})
	}
}
module.exports = { getters, actions }

// export default {
// 	getters, actions
// }
