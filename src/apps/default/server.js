import { Vue, utils, storage } from 'assets/lib'

const WXAPPID = 'wxc8123454324da8b0'
export default {
  // 获取微信授权路径 url为绝对路径
  getGrantUrl(url, params) {
    if(!url) return false

    url = utils.url.setArgs(url, params)
    utils.device.isWechat && (url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WXAPPID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
    return url
  },
  // 获取微信信息
  getWxByCode(code) {
    if(!code) return null

    let promise = Vue.http.get('owner/getByCode', {
      params: { code }
    })
    promise.then((response)=>{
      if(!response.body.success){
        utils.alert(response.body.message)
      }
    }, (error)=>{
      utils.alert('服务器繁忙，请稍后重试！')
    })
    return promise
  },
  // 发送手机验证码
  sendMobiCode(phone, btn) {
    if(utils.regexp.mobile.test(phone)){
      
      btn.setAttribute('disabled', true)
      let time = 30
      let oldtext = btn.textContent
      let timeid = setInterval(()=>{
        if(--time >= 0){
          btn.textContent = `${time}s`
        }else{
          clearInterval(timeid)
          btn.removeAttribute('disabled')
          btn.textContent = oldtext
        }
      }, 1000)
      // common/beforeSendValidCode
      Vue.http.get('common/getPhoneVerifyCode', {
          params: {
            phone: phone 
          }
        }).then((response) => {
          if(!response.body.success){
            clearInterval(timeid)
            btn.removeAttribute('disabled')
            btn.textContent = oldtext
            utils.alert(response.body.message)
          }else{
            utils.alert('手机验证码已发送成功')
          }
        }, (error) => {
          clearInterval(timeid)
          btn.removeAttribute('disabled')
          btn.textContent = oldtext
          utils.alert('服务器繁忙，请稍后重试！')
        })
    }else{
      utils.alert('请输入正确手机号码')
    }
  },
  // 新人福利
  welfare: {
    // 获取新人福利分享信息
    getShareList(wxOpenId) {
      if(!wxOpenId) return null

      let promise = Vue.http.get('owner/visitor/getShareList', {
        params: { 
          channel: 'NewWelfare',
          inviterWxOpenId: wxOpenId
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    },
    // 获取活动礼品列表
    getGiftList() {
      let promise = Vue.http.get('owner/visitor/getGiftList', {
        params: { 
          matchActivityCode: 'NewWelfare'
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    },
    // 获取获奖名单列表
    getWinner() {
      let promise = Vue.http.get('owner/visitor/getWinningGiftList', {
        params: { 
          channel: 'NewWelfare'
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    }
  },
  // 艾臣资讯
  news: {
    getList() {
      let promise = Vue.http.get('owner/visitor/getPublishList')
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    },
    getInfo(id) {
      if(!id)  return null
      let promise = Vue.http.get('owner/visitor/getPublishDetail', {
        params: {
          publishId: id
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    }
  },
  // 优惠券
  coupon: {
    getList(phoneNum, type) {
      if(!phoneNum) return null
      switch(type){
        case 1:
          type = 1
          break
        case 2:
          type = -1
          break
        default:
          type = 0
      }

      let promise = Vue.http.get('owner/visitor/getCouponUserRelations', {
        params: {
          phoneNum,
          isUsed: type
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    },
    getInfo(id) {
      if(!id)  return null
      let promise = Vue.http.get('owner/visitor/getCouponDetail', {
        params: {
          id
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    }
  },
  // 优惠活动
  activity: {
    getList(id) {
      id = id || ''
      let promise = Vue.http.get('owner/visitor/getCouponActivity', {
        params: {
          id
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    },
    getInfo(id) {
      if(!id)  return null
      return this.getList(id)
    },
    receive(phoneNum, activityFkid, couponFkid) {
      if(!phoneNum)  return null
      let promise = Vue.http.post('owner/visitor/addCouponUserRelations', {
        phoneNum,  activityFkid, couponFkid
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    }
  },
  // 我的订单
  order: {
    getList(phoneOrNo) {
      if(!phoneOrNo) return null

      let promise = Vue.http.get('owner/visitor/getOrderList', {
        params: {
          phoneOrNo
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    },
    getInfo(id) {
      if(!id)  return null
      let promise = Vue.http.get('owner/visitor/getOrderDetail', {
        params: {
          orderId: id
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    }
  },
  // 产品展示
  product: {
    getCategory() {
      let promise = Vue.http.get('owner/visitor/getProductCategory')
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    },
    getList(type) {
      if(!type) return null

      let promise = Vue.http.get('owner/visitor/getProductList', {
        params: {
          category: type
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })

      return promise
    },
    getInfo(id) {
      if(!id)  return null
      let promise = Vue.http.get('owner/visitor/getProductDetail', {
        params: {
          productId: id
        }
      })
      promise.then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
      }, (error)=>{
        utils.alert('服务器繁忙，请稍后重试！')
      })
      return promise
    }
  }
}
