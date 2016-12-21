import { Vue, utils, storage } from 'assets/lib'
import config from './config'

Vue.http.options.root = config.getServerPath()

const PROMISE = new Promise((resolve, reject) => {
  resolve()
})
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
  // 获取当前地理位置(经纬度)
  getPosition(success = utils.noop, error = utils.noop) {
    let lng = storage.local.get('lng')
    let lat = storage.local.get('lat')
    let position = {
      coords: {
        longitude: lng,
        latitude: lat
      }
    }
    let promise = PROMISE

    if(lng && lat){
      success(position)
      return promise
    }

    if(navigator && navigator.geolocation){
      promise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition( position => {
          lng = position.coords.longitude
          lat = position.coords.latitude
          storage.local.set('lng', lng, 1000 * 1800)
          storage.local.set('lat', lat, 1000 * 1800)
          success(position)
          resolve(position)
        }, err => {
          let errHtml = ''
          switch(error.code){ 
            case error.PERMISSION_DENIED: 
              errHtml = "用户拒绝对获取地理位置的请求。" 
              break
            case error.POSITION_UNAVAILABLE: 
              errHtml = "位置信息是不可用的。" 
              break
            case error.TIMEOUT: 
              errHtml = "请求用户地理位置超时。" 
              break
            case error.UNKNOWN_ERROR: 
              errHtml = "未知错误。" 
              break
          } 
          console.log('获取当前地理位置失败:'+ errHtml)
          error(err, errHtml)
          resolve(err, errHtml)
        }) 
      })
    }
    return promise
  },
  // 获取当前地理位置(地址)
  getAddress(success = utils.noop, error = utils.noop) {
    // 使用腾讯地图WebService API
    this.getPosition( position => {
      let address = storage.local.get('address')
      if(address){
        success(address)
        return
      }
      Vue.http.jsonp('http://apis.map.qq.com/ws/geocoder/v1/', {
        params: {
          location: position.coords.latitude + ',' + position.coords.longitude,
          key: 'GPIBZ-V7YH3-CD735-3HDQM-CNM3F-4PFQP',
          output: 'jsonp'
        }
      }).then(({ body })=>{
        if(body.status == 0){
          storage.local.set('address', body.result, 1000 * 1800);
          success(body.result)
        }
      })
    }, error)
  },
  // 获取两个经纬度的距离
  getDistance({ lng1 = 0, lat1 = 0 }, { lng2 = 0, lat2 = 0 }) {

    var EARTH_RADIUS = 6378137.0    //单位M
    var PI = Math.PI
    var getRad = function(d){
      return d*PI/180.0
    }

    var f = getRad((lat1 + lat2)/2)
    var g = getRad((lat1 - lat2)/2)
    var l = getRad((lng1 - lng2)/2)
    
    var sg = Math.sin(g)
    var sl = Math.sin(l)
    var sf = Math.sin(f)
    
    var s,c,w,r,d,h1,h2
    var a = EARTH_RADIUS
    var fl = 1/298.257
    
    sg = sg*sg
    sl = sl*sl
    sf = sf*sf
    
    s = sg*(1-sl) + (1-sf)*sl
    c = (1-sg)*(1-sl) + sf*sl
    
    w = Math.atan(Math.sqrt(s/c))
    r = Math.sqrt(s*c)/w
    d = 2*w*a
    h1 = (3*r -1)/2/c
    h2 = (3*r +1)/2/s
    
    var m = d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg))

    if(Number.isNaN(m)){
      return 0
    }

    return (m/1000).toFixed(2)
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
