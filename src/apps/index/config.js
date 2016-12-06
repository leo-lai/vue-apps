// 全局配置
var Exports = {
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
  routerHook: { 
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
      component: (resolve) => require(['./login'], resolve)
    },
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
  }
}

module.exports = Exports
