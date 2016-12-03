// import 'vux/src/styles/index.less'
// import 'vux/src/styles/weui/base/reset.less'
import 'vux/dist/vux.css'
import 'assets/global.less'
import config from 'assets/config'
import FastClick from 'fastclick'
import Vue from 'vue'
import Router from 'vue-router'
import $ from 'sprint-js'

FastClick.attach(document.body)

// 检测设备
const ua = navigator.userAgent
const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isWechat = /micromessenger/i.test(ua)

Vue.mixin({
  created: function () {
    this.$device = {
      isAndroid,
      isIpad,
      isIpod,
      isIphone,
      isWechat
    }
  }
})

let LUtils = {
	setTitle(title) {
		document.title = title
    // 判断是否为ios设备，ios设备需要通过加载iframe来刷新title
    if (isWechat && isIphone) {
    	let iframe = document.createElement('iframe')
		  iframe.setAttribute('src', '/favicon.ico')
		  iframe.addEventListener('load', function() {
		    setTimeout(() => {
	      	iframe.removeEventListener('load')
	        document.body.removeChild(iframe)
	      }, 50)
		  })
		  document.body.appendChild(iframe)
    }
	}
}

let Exports = { config, Vue, Router, LUtils, $}
module.exports = Exports

