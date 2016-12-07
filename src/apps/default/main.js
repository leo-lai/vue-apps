import { Vue, Router, utils, storage } from 'assets/lib'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import config from './config'
import App from './app'

// https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn
Vue.use(Router)
const router = new Router({
	history: true,
  root: config.getPath(),
  saveScrollPosition: true,
  transitionOnLoad: false
})

// 设置路由
router.map(config.routerMap)
// 默认跳转home页面
router.redirect({
  '/': '/home'
})
// 设置路径别名
// router.alias({
//  '/': '/home'
// })

// keep vue-router and vuex store in sync
// store.state.route.path 
// store.state.route.params 
// store.state.route.query
sync(store, router)

// sessionStorage record router history 
// 记录页面浏览顺序，用来判断动画方向
let _history = {  count: 0 , prevPath: '/', currPath: '' }

// 调用发生在整个切换流水线之前。如果此钩子函数拒绝了切换，整个切换流水线根本就不会启动
router.beforeEach(({ to, from, next }) => {
  console.log('%s router beforeEach!', to.path)

  // 记录当前地址和上一页地址
  _history.prevPath = from.path
  _history.currPath = to.path
  storage.session.set('_history', _history)

  let toIndex = _history[to.path]
  let fromIndex = _history[from.path]
  // 判断是否返回上一页 /user/info -> /user
  // from.path.startsWith(to.path) 安卓微信报错
  let isBack = from.path && from.path.indexOf(to.path) === 0

  if(!toIndex && (isBack || (!from.mainPage && to.mainPage))){
    toIndex = fromIndex
    fromIndex = ++_history.count
    _history[to.path] = toIndex
    _history[from.path] = fromIndex
  }
  
  if(!toIndex){
    store.dispatch('APP_LOADING', true)
    _history[to.path] = ++_history.count
    if(!to.mainPage && fromIndex){
      store.dispatch('APP_DIRECTION', 'in')
    }else{
      store.dispatch('APP_DIRECTION', '')
    }
  }else if(!to.mainPage || !from.mainPage){
    if(fromIndex < toIndex){
      store.dispatch('APP_DIRECTION', 'in')
    }else{
      store.dispatch('APP_DIRECTION', 'out')
    }  
  }else{
    store.dispatch('APP_DIRECTION', '')
  }
  setTimeout(next, 50)
})
// 此钩子函数一个类型为切换对象的参数，但是你只能访问此参数的 to 和 from 属性, 这两个属性都是路由对象。在这个后置钩子函数里不能调用任何切换函数。
router.afterEach(({ to , from }) => {  
  console.log('%s router afterEach!', to.path)
  store.dispatch('APP_LOADING', false)
  utils.setTitle(to.title)
  storage.session.set('_history', _history)
})

router.start(App, '#app')