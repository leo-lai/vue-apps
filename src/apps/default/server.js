import { Vue, utils, storage } from 'assets/lib'
import config from './config'

Vue.http.options.root = config.getServerPath()

const PROMISE = { then() { console.log('参数不正确') } }
const ERROR_MSG = {
  api: '服务器繁忙，请稍后重试！'
}
export default {
  // 获取微信授权路径 url为绝对路径
  getGrantUrl(url, params) {
    if(!url) return false

    let appid = config.getAppid()
    url = utils.url.setArgs(url, params)
    utils.device.isWechat && (url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
    return url
  },
  // 获取微信信息
  getWxByCode(code, callback) {
    if(!code) return PROMISE
    callback = utils.isFunction(callback) ? callback : utils.noop

    let promise = Vue.http.get('owner/getByCode', {
      params: { code }
    }).then((response)=>{
      if(!response.body.success){
        utils.alert(response.body.message)
      }else{
        callback.call(promise, response.body)
      }
      return response
    }, (error)=>{
      utils.alert(ERROR_MSG.api)
      return error
    })
    return promise
  },
  // 获取jssdk授权配置
  getWxConfig(url, callback) {
    if(!utils.isString(url)) return PROMISE
    url = url.split('#')[0]
    callback = utils.isFunction(callback) ? callback : utils.noop

    let promise = Vue.http.get('wx/frame/getWxSignature', {
      params: { url }
    }).then((response)=>{
      if(!response.body.success){
        utils.alert(response.body.message)
      }else{
        let config = {
          debug: false,
          appId: response.body.data.appId,
          timestamp: response.body.data.timestamp,
          nonceStr: response.body.data.noncestr,
          signature: response.body.data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu'
          ]
        }
        callback.call(promise, config)
      }
      return response
    }, (error)=>{
      utils.alert(ERROR_MSG.api)
      return error
    })

    return promise
  },
  // 获取临时二维码
  getWxTempQrCode(inviterWxOpenId, inviterWxUnionId, channel = 'NewWelfare') {
    let promise = Vue.http.get('wx/frame/getActivityQrCodeUrl', {
      params: { inviterWxOpenId, inviterWxUnionId, channel }
    }).then((response)=>{
      if(!response.body.success){
        utils.alert(response.body.message)
      }
      return response
    }, (error)=>{
      utils.alert(ERROR_MSG.api)
      return error
    })
    return promise
  },
  // 发送手机验证码
  sendMobiCode(phone, btn) {
    if(!utils.regexp.mobile.test(phone)){
      utils.alert('请输入正确手机号码')
      return PROMISE
    }
      
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
    let promise = Vue.http.get('common/getPhoneVerifyCode', {
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
      return response
    }, (error) => {
      clearInterval(timeid)
      btn.removeAttribute('disabled')
      btn.textContent = oldtext
      utils.alert(ERROR_MSG.api)
      return error
    })
    return promise
  },
  // 新人福利
  welfare: {
    // 登记参加人信息
    addShare(wxOpenId, wxUnionId, wxHeadPhoto, wxNickName) {
      let promise = Vue.http.post('owner/visitor/addShare', {
        channel: 'NewWelfare',
        wxOpenId,
        wxUnionId,
        wxHeadPhoto,
        wxNickName
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    },
    // 获取新人福利分享信息
    getShareList(wxOpenId) {
      if(!wxOpenId) return PROMISE

      let promise = Vue.http.get('owner/visitor/getShareList', {
        params: { 
          channel: 'NewWelfare',
          inviterWxOpenId: wxOpenId,
          rows: 100
        }
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    },
    // 获取活动礼品列表
    getGiftList(wxOpenId = 'opILHvwh76lIxO5xo3S6CoO-jNy0') {
      if(!wxOpenId) return PROMISE

      let promise = Vue.http.get('owner/visitor/getGiftList', {
        params: { 
          matchActivityCode: 'NewWelfare',
          wxOpenId
        }
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    },
    // 获取获奖名单列表
    getWinner() {
      let promise = Vue.http.get('owner/visitor/getWinningGiftList', {
        params: { 
          channel: 'NewWelfare'
        }
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
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
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    },
    getInfo(id) {
      if(!id)  return PROMISE
      let promise = Vue.http.get('owner/visitor/getPublishDetail', {
        params: {
          publishId: id
        }
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    }
  },
  // 优惠券
  coupon: {
    getList(phoneNum, type = 0) {
      if(!phoneNum) return PROMISE
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
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    },
    getInfo(id) {
      if(!id)  return PROMISE
      let promise = Vue.http.get('owner/visitor/getCouponDetail', {
        params: {
          id
        }
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
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
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    },
    getInfo(id) {
      if(!id)  return PROMISE
      return this.getList(id)
    },
    receive(phoneNum, activityFkid, couponFkid) {
      if(!phoneNum)  return PROMISE
      let promise = Vue.http.post('owner/visitor/addCouponUserRelations', {
        phoneNum,  activityFkid, couponFkid
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    }
  },
  // 我的订单
  order: {
    getList(phoneOrNo) {
      if(!phoneOrNo) return PROMISE

      let promise = Vue.http.get('owner/visitor/getOrderList', {
        params: {
          phoneOrNo
        }
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    },
    getInfo(id) {
      if(!id)  return PROMISE
      let promise = Vue.http.get('owner/visitor/getOrderDetail', {
        params: {
          orderId: id
        }
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
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
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    },
    getList(type) {
      if(!type) return PROMISE

      let promise = Vue.http.get('owner/visitor/getProductList', {
        params: {
          category: type
        }
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })

      return promise
    },
    getInfo(id) {
      if(!id)  return PROMISE
      let promise = Vue.http.get('owner/visitor/getProductDetail', {
        params: {
          productId: id
        }
      }).then((response)=>{
        if(!response.body.success){
          utils.alert(response.body.message)
        }
        return response
      }, (error)=>{
        utils.alert(ERROR_MSG.api)
        return error
      })
      return promise
    }
  }
}
