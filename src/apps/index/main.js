import { Vue, Router, LUtils } from 'assets/lib'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'

import App from './app'

Vue.use(Router)
Vue.config.devtools = true

const router = new Router({
	// history: true,
  transitionOnLoad: false
})

// keep vue-router and vuex store in sync
// store.state.route.path 
// store.state.route.params 
// store.state.route.query
sync(store, router)

// 设置路由
router.map({
	'/home': {
    title: '首页',
    mainPage: true,
    component: (resolve) => require(['./home'], resolve)
	},
  '/booking': {
    title: '在线预约',
    component: (resolve) => require(['./booking'], resolve)
  },
  '/activity': {
    title: '活动中心',
    mainPage: true,
    component: (resolve) => require(['./activity'], resolve)
  },
  '/activity/info': {
    title: '活动详情',
    component: (resolve) => require(['./activity-info'], resolve)
  },
  '/product': {
    title: '产品中心',
    mainPage: true,
    component: (resolve) => require(['./product'], resolve)
  },
  '/product/list': {
    title: '产品列表',
    component: (resolve) => require(['./product-list'], resolve)
  },
  '/product/details': {
    title: '产品详情',
    component: (resolve) => require(['./product-details'], resolve)
  },
  '/user': {
    title: '个人中心',
    mainPage: true,
    component: (resolve) => require(['./user'], resolve)
  },
  '/user/info': {
    title: '个人信息',
    component: (resolve) => require(['./user-info'], resolve)
  },
  '/user/appointment': {
    title: '我的预约',
    component: (resolve) => require(['./user-appointment'], resolve)
  },
  '/user/order': {
    title: '我的订单',
    component: (resolve) => require(['./user-order'], resolve)
  },
  '/user/coupon/': {
    title: '我的优惠券',
    component: (resolve) => require(['./user-coupon'], resolve)
  },
  '/user/coupon/info': {
    title: '优惠券详情',
    component: (resolve) => require(['./user-coupon-info'], resolve)
  },
  '/user/pwd': {
    title: '重置密码',
    component: (resolve) => require(['./user-pwd'], resolve)
  },
  '/user/faq': {
    title: '意见反馈',
    component: (resolve) => require(['./user-faq'], resolve)
  },
  '/user/faq/add': {
    title: '意见反馈',
    component: (resolve) => require(['./user-faq-add'], resolve)
  },
  '/user/faq/info': {
    title: '意见反馈',
    component: (resolve) => require(['./user-faq-info'], resolve)
  }
})

// 设置路径别名
// router.alias({
//  '/': '/home'
// })

// 默认跳转Home页面，且没有历史记录
router.redirect({
  '/': '/home'
})

// sessionStorage record router history 
// 记录页面浏览顺序，用来判断动画方向
let routerHistory = {  count: 0 }

router.beforeEach(({ to, from, next }) => {
  let toIndex = routerHistory[to.path]
  let fromIndex = routerHistory[from.path]
  // 判断是否返回上一页 /user/info -> /user
  // from.path.startsWith(to.path) 安卓微信报错
  let isBack = from.path && from.path.indexOf(to.path) === 0

  if(!toIndex && (isBack || (!from.mainPage && to.mainPage))){
    toIndex = fromIndex
    fromIndex = ++routerHistory.count
    routerHistory[to.path] = toIndex
    routerHistory[from.path] = fromIndex
  }
  
  if(!toIndex){
    store.dispatch('UPDATE_LOADING', true)
    routerHistory[to.path] = ++routerHistory.count
    if(!to.mainPage && fromIndex){
      // 如果不是主界面并且不是首次进入
      store.dispatch('UPDATE_DIRECTION', 'in')
    }else{
      store.dispatch('UPDATE_DIRECTION', '')
    }
  }else if(!to.mainPage || !from.mainPage){
    if(fromIndex > toIndex){
      store.dispatch('UPDATE_DIRECTION', 'out')
    }else{
      store.dispatch('UPDATE_DIRECTION', 'in')
    }  
  }else{
    store.dispatch('UPDATE_DIRECTION', '')
  }
  setTimeout(next, 50)
})
router.afterEach(({ to }) => {
  LUtils.setTitle(to.title)
  store.dispatch('UPDATE_LOADING', false)
  sessionStorage.setItem('routerHistory', routerHistory)
})



// save position for demo page
// let demoScrollTop = 0
// function saveDemoScrollTop () {
//   demoScrollTop = window.scrollY
// }

// router.beforeEach(function (transition) {
//   if (transition.to.fullPath !== '/demo') {
//     window.removeEventListener('scroll', saveDemoScrollTop, false)
//   }
//   if (/\/http/.test(transition.to.path)) {
//     let url = transition.to.path.split('http')[1]
//     window.location.href = `http${url}`
//   } else {
//     if (/\/demo\/component\/\w+/.test(transition.to.path)) {
//       router.go({
//         replace: true,
//         path: transition.to.path.replace('/demo', ''),
//         append: false
//       })
//     } else {
//       transition.next()
//     }
//   }
// })

// router.afterEach(function (transition) {
//   if (transition.to.path !== '/demo') {
//     window.scrollTo(0, 0)
//   } else {
//     window.removeEventListener('scroll', saveDemoScrollTop, false)
//     // if from component page
//     if (demoScrollTop && /component/.test(transition.from.path)) {
//       setTimeout(function () {
//         window.scrollTo(0, demoScrollTop)
//       }, 100)
//     }
//     setTimeout(function () {
//       window.addEventListener('scroll', saveDemoScrollTop, false)
//     }, 1000)
//   }
// })

router.start(App, '#app')