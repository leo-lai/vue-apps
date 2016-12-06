// import 'vux/dist/vux.css'
import 'vux/src/styles/index.less'
import 'assets/global.less'
import FastClick from 'fastclick'
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

FastClick.attach(document.body)

// 检测设备
const ua = navigator.userAgent
const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isWechat = /micromessenger/i.test(ua)

// 判断设备
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

let session = window.sessionStorage
let utils = {
	setTitle(title) {
		document.title = title
    // 判断是否为ios设备的微信浏览器，加载iframe来刷新title
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
	},
  session: {
    set(name, value) {
      session.setItem(name, JSON.stringify(value || {}))
    },
    get(name) {
      return JSON.parse(session.getItem(name))
    } 
  }
}

module.exports = { Vue, Router, Resource, utils }

