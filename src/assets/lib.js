// import 'vux/dist/vux.css'
import 'vux/src/styles/index.less'
import 'assets/global.less'
import Vue from 'vue'
import Resource from 'vue-resource'
import { utils, storage } from 'assets/utils'

// mixin 合并策略
const strategies = Vue.config.optionMergeStrategies
strategies.route = strategies.methods

// 配置是否允许 vue-devtools 检查代码
// Vue.config.devtools = true
Vue.mixin({ // 设备检测
  created: function () {
    this.$device = utils.device
    this.$regexp = utils.regexp
    this.$image = {
	    thumb(src, width, height) {
	      width = width || 320

	      if(!src){ 
	      	return ''
	      	// return `http://placeholder.qiniudn.com/${width}/3cc51f/ffffff` 
	      }
	      
	      // return src += '?imageMogr2/gravity/Center/crop/'+width+'x'+height;
	      src += `?imageMogr2/format/jpg/interlace/1/quality/60/gravity/Center/thumbnail/${width}x`
	      if(height){
	        src += `/crop/x${height}`
	      }

	      return src
	    }
    }
  }
})

// https://github.com/pagekit/vue-resource/blob/master/docs/http.md
Vue.use(Resource)
Vue.http.options.emulateJSON = true
// Vue.http.options.xhr = { withCredentials: true }
// Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'
// Vue.http.options.emulateHTTP = true

module.exports = { Vue, utils, storage }

