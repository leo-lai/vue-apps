// 应用配置
const _HOST = window.location.origin
const _PATH = '/'
const avatar = require('assets/imgs/avatar.png')
const avatarBg = require('assets/imgs/avatar-bg.jpg')
export default {
  getHost: () => _HOST,
  getPath: () => _PATH,
  defaultVal: {
    avatarBg, 
    avatar
  },
  // 组件生命周期 http://vuejs.org.cn/guide/instance.html#生命周期图示
  vueHook: {
  	'hook:created': function() { 
      console.log('%s components created!', this.$route.path)
    },
    'hook:ready': function() {
      console.log('%s components ready!(loadingRouteData:%s)' , this.$route.path, this.$loadingRouteData)
    }
  },
  // 路由生命周期 https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/pipeline/hooks.md
  routeHook: { 
    // waitForData: true,
    data(transition) {
      // 每次路由变动时都会被调用
      // 在此异步获取数据，此时界面已可见
      console.log('%s data ready!(loadingRouteData:%s)' , transition.to.path, this.$loadingRouteData)
    },
    canActivate(transition) {
      // 在此验证页面授权
      console.log('%s canActivate!' , transition.to.path)
      transition.next()
    },
    activate(transition) { 
      // 当组件被创建而且将要切换进入的时候被调用，(组件可重用时不调用)
      // 在此异步获取数据，此时界面不可见
      console.log('%s activate!' , transition.to.path)
      transition.next()
    },
    canDeactivate(transition){
      console.log('%s canDeactivate!' , transition.to.path)
      transition.next()
    },
    deactivate(transition) { 
      // 当一个组件将要被禁用和移除之时被调用
      console.log('%s deactivate!' , transition.to.path)
      transition.next()
    }
  },
  routerMap: {
  	'/login': {
      title: '登录',
      component: (resolve) => require(['./page/login'], resolve)
    },
    '/register': {
      title: '注册',
      component: (resolve) => require(['./page/register'], resolve)
    },
    '/news/list': {
      title: '艾臣资讯',
      component: (resolve) => require(['./page/news-list'], resolve)
    },
    '/news/list/info': {
      title: '艾臣资讯详情',
      component: (resolve) => require(['./page/news-info'], resolve)
    },
    '/home': {
      title: '首页',
      mainPage: true,
      component: (resolve) => require(['./page/home'], resolve)
    },
    '/welfare': {
      title: '新人福利',
      component: (resolve) => require(['./page/welfare'], resolve)
    },
    '/australia': {
      title: '澳式风情',
      component: (resolve) => require(['./page/australia'], resolve)
    },
    '/company': {
      title: '企业简介',
      component: (resolve) => require(['./page/company'], resolve)
    },
    '/store/list': {
      title: '门店展示',
      component: (resolve) => require(['./page/store-list'], resolve)
    },
    '/store/list/info': {
      title: '门店详情',
      component: (resolve) => require(['./page/store-info'], resolve)
    },
    '/booking': {
      title: '在线预约',
      component: (resolve) => require(['./page/booking'], resolve)
    },
    '/activity': {
      title: '活动中心',
      mainPage: true,
      component: (resolve) => require(['./page/activity'], resolve)
    },
    '/activity/info': {
      title: '活动详情',
      component: (resolve) => require(['./page/activity-info'], resolve)
    },
    '/product': {
      title: '产品中心',
      mainPage: true,
      component: (resolve) => require(['./page/product'], resolve)
    },
    '/product/list': {
      title: '产品列表',
      component: (resolve) => require(['./page/product-list'], resolve)
    },
    '/product/list/info': {
      title: '产品详情',
      component: (resolve) => require(['./page/product-info'], resolve)
    },
    '/user': {
      title: '个人中心',
      mainPage: true,
      component: (resolve) => require(['./page/user'], resolve)
    },
    '/user/info': {
      title: '个人信息',
      auth: true,
      component: (resolve) => require(['./page/user-info'], resolve)
    },
    '/user/appointment': {
      title: '我的预约',
      auth: true,
      component: (resolve) => require(['./page/user-appointment'], resolve)
    },
    '/user/appointment/info': {
      title: '预约详情',
      auth: true,
      component: (resolve) => require(['./page/user-appointment-info'], resolve)
    },
    '/user/order': {
      title: '我的订单',
      auth: true,
      component: (resolve) => require(['./page/user-order'], resolve)
    },
    '/user/order/info': {
      title: '订单详情',
      auth: true,
      component: (resolve) => require(['./page/user-order-info'], resolve)
    },
    '/user/coupon/': {
      title: '我的优惠券',
      auth: true,
      component: (resolve) => require(['./page/user-coupon'], resolve)
    },
    '/user/coupon/info': {
      title: '优惠券详情',
      auth: true,
      component: (resolve) => require(['./page/user-coupon-info'], resolve)
    },
    '/user/pwd': {
      title: '重置密码',
      auth: true,
      component: (resolve) => require(['./page/user-pwd'], resolve)
    },
    '/user/faq': {
      title: '常见问题',
      auth: true,
      component: (resolve) => require(['./page/user-faq'], resolve)
    },
    '/user/faq/info': {
      title: '常见问题',
      auth: true,
      component: (resolve) => require(['./page/user-faq-info'], resolve)
    },
    '/user/faq/add': {
      title: '我要反馈',
      auth: true,
      component: (resolve) => require(['./page/user-faq-add'], resolve)
    },
    '/user/faq/feedback': {
      title: '反馈详情',
      auth: true,
      component: (resolve) => require(['./page/user-faq-feedback'], resolve)
    }
  }
}

