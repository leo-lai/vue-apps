import { Vue, utils, storage } from 'assets/lib'
import config from './config'

Vue.http.options.root = config.getServerPath()

const PROMISE = function(response = '接口参数不正确') {
  return new Promise((resolve) => {
    resolve(response)
  })
}
const ERROR_MSG = {
  api: '服务器繁忙，请稍后重试！'
}

// 分页数据类
class List {
  constructor(type){
    this._type = type
    this.isLoading = false
    this.isNull = false             // 表示后台已无数据返回，无需再发送请求
    this.isAjax = false             // 是否已请求数据
    this.alldata = []               // 累计分页已返回数据
    this.data = []                  // 当前分页数据
    this.page = 0                   // 当前页数
    this.gotoPage = 1               // 跳转到第几页
    this.pageList = [1]             // 分页数组
    this.rows = 10                  // 条数
    this.rowsList = [10, 20, 50]    // 每页条数
    this.total = 1                  // 总条数
    this.totalPage = 1              // 总页数 
    this.isPage = true              // 是否分页
    this.params = {}                // 异步发送数据
    this.callback = utils.noop
  }
  init() {
    this.alldata = []
    this.data = []
    this.page = 1
    this.ajax()
  }
  next() {
    if (this.isLoading || this.page >= this.totalPage) { 
      return this
    }
    this.page = Math.min(++this.page, this.totalPage)
    this.ajax()
  }
  prev() {
    if (this.isLoading || this.page <= 1) { 
      return this 
    }
    this.page = Math.min(--this.page, 1)
    this.ajax()
  }
  goto(index = 1) {
    if (!utils.isNumber(index) || this.isLoading || this.page === index) { 
      return this 
    }
    index = Math.min(Math.max(index, 1), this.totalPage)
    this.page = index
    this.ajax()
  }
  ajax() {
    if(this.isLoading){ return this }
    let url = ''
    switch (this._type) {
      case 'news': // 新闻列表
        url = 'owner/visitor/getPublishList'
        break
    }
    this.params.page = this.page
    this.params.rows = this.rows
    this.isLoading = true
    Vue.http.get(url, {
      params: this.params
    }).then(function({ body }){
      this.isAjax = true
      this.isLoading = false
      if(body.success && body.data){
        this.gotoPage = this.page
        this.total = body.data.total
        this.totalPage = body.data.totalPage

        // 分页数组 [1,2,3,'...',10,11,12]
        let pageList = []
        for (let i = Math.max(this.page - 3, 1); i <= Math.min(this.page + 3, this.totalPage); i++) {
          pageList.push(i)
        }

        if(this.totalPage > 10 && (this.totalPage - this.page) > 3){
          pageList.push('...')
          pageList.push(this.totalPage)
        }

        !body.data.rowsObject && (body.data.rowsObject = [])
        this.data = body.data.rowsObject
        this.alldata = this.alldata.concat(this.data)
        if(body.data.page >= body.data.totalPage){
          this.isNull = true
        }
      }else{
        this.isAjax = true
        this.isLoading = false
        this.isNull = true
      }
      this.callback(true, body)
    }.bind(this), function(error){
      this.isAjax = true
      this.isLoading = false
      this.isNull = true
      this.callback(false, error)
    }.bind(this))
  }
}


export default {
  // 获取微信授权路径 url为绝对路径
  getGrantUrl(url, params) {
    if(!url) return ''

    let appid = config.getAppid()
    url = utils.url.setArgs(url, params)
    utils.device.isWechat && (url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
    return url
  },
  // 获取微信信息
  getWxByCode(code, callback) {
    if(!code) return PROMISE()
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
  getWxConfig(url) {
    url = url || storage.session.get('wx_url')
    let self = this
    let config = {
      debug: false,
      appId: '',
      timestamp: '',
      nonceStr: '',
      signature: '',
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu']
    }

    let promise = new Promise((resolve) => {
      if(!window.wx){
        utils.alert('找不到jweixin.js文件')
        resolve({})
      }else{
        window.wx._ready = false
        Vue.http.get('wx/frame/getWxSignature', {
          params: { url, t: new Date().getTime() }
        }).then(({ body })=>{
          if(body.success){
            config.appId = body.data.appId
            config.timestamp = body.data.timestamp
            config.nonceStr = body.data.noncestr
            config.signature = body.data.signature

            window.wx.config(config)

            window.wx.ready(()=>{
              wx.checkJsApi({
                jsApiList: config.jsApiList,
                success(res) {
                  utils.debug(res)
                  config.jsApiList.forEach((item)=>{
                    if(window.wx._try){
                      resolve(window.wx)
                    }

                    if(res.checkResult[item]){
                      window.wx._ready = true
                      window.wx._try = false
                      resolve(window.wx)
                      return true
                    }
                  })
                }
              })
            })

            window.wx.error((error)=>{
              window.wx._ready = false
              utils.debug(error)
              if(!window.wx._try){
                window.wx._try = true
                self.getWxConfig(window.location.href)
              }else{
                resolve(window.wx) 
              }
            })

            if(!utils.device.isWechat){
              resolve(window.wx)
            }
          }else{
            resolve(window.wx)
          }
        }, (error)=>{
          resolve(window.wx)
        })
      }
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
      return PROMISE()
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
  getPosition() {
    // let position = storage.local.get('position') || {}
    let position = {}
    // 方圆E时光
    // position = { 
    //   latitude: 23.1292,
    //   longitude: 113.3671,
    //   speed: -1,
    //   accuracy: 105.7295
    // }
    storage.local.set('position', position, 1000 * 1800)

    let promise = new Promise((resolve)=>{
      if(position.latitude){
        resolve(position)
      }else{
        if(utils.device.isWechat){
          this.getWxConfig().then((wx)=>{
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success(res) {
                position = res
                storage.local.set('position', position, 1000 * 1800)
                resolve(position)
              }
            })
            if(wx._try && !wx._ready){
              resolve(position)
            }
          })
        }else{
          navigator.geolocation.getCurrentPosition( (response) => {
            position.latitude = response.coords.latitude
            position.longitude = response.coords.longitude
            storage.local.set('position', position, 1000 * 1800)
            resolve(position)
          }, error => {
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
            position.error = errHtml
            resolve(position)
          })
        }
      }
    })

    return promise
  },
  // 获取当前地理位置(地址)
  getAddress(callback) {
    callback = utils.isFunction(callback) ? callback : utils.noop
    let address = storage.local.get('address')
    if(address){
      callback(address)
      return PROMISE(address)
    }
    // 使用腾讯地图WebService API
    return this.getPosition().then( (position) => {
      let promise = Vue.http.jsonp('http://apis.map.qq.com/ws/geocoder/v1/', {
        params: {
          location: position.latitude + ',' + position.longitude,
          key: 'GPIBZ-V7YH3-CD735-3HDQM-CNM3F-4PFQP',
          output: 'jsonp'
        }
      }).then(({ body })=>{
        if(body.status == 0){
          storage.local.set('address', body.result, 1000 * 1800);
          callback(body.result)
        }
      })
      return promise
    })
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

    return Number((m/1000).toFixed(2))
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
      if(!wxOpenId) return PROMISE()

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
      if(!wxOpenId) return PROMISE()

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
    getList(callback, rows = 10) {
      callback = utils.isFunction(callback) ? callback : utils.noop
      let list = new List('news')
      list.rows = rows
      list.callback = callback
      list.init()
      return list
    },
    getInfo(publishId) {
      let ret = {}
      let promise = new Promise((resolve, reject)=>{
        if(!publishId){
          resolve(ret)
        }else{
          Vue.http.get('owner/visitor/getPublishDetail', {
            params: {
              publishId
            }
          }).then(({ body })=>{
            if(body.success && body.data){
              resolve(body.data)
            }else{
              resolve(ret)
              utils.alert.call(Vue, body.message)
            }
          }, (error)=>{
            resolve(ret)
            utils.alert.call(Vue, ERROR_MSG.api)
          })
        }
      })
      return promise
    }
  },
  // 优惠券
  coupon: {
    getList(phoneNum, type = 0) {
      if(!phoneNum) return PROMISE()
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
      if(!id)  return PROMISE()
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
      if(!id)  return PROMISE()
      return this.getList(id)
    },
    receive(phoneNum, activityFkid, couponFkid) {
      if(!phoneNum)  return PROMISE()
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
  // 我的预约
  appointment: {
    getList(mobilePhone) {
      let ret = []
      let promise = new Promise((resolve, reject)=>{
        if(!mobilePhone){
          resolve(ret)
        }else{
          Vue.http.get('owner/visitor/getAppointList', {
            params: {
              mobilePhone,
              rows: 50
            }
          }).then(({ body })=>{
            if(body.success && body.data){
              resolve(body.data.rowsObject)
            }else{
              resolve(ret)
              utils.alert.call(Vue, body.message)
            }
          }, (error)=>{
            resolve(ret)
            utils.alert.call(Vue, ERROR_MSG.api)
          })
        }
      })
      return promise
    },
    getInfo(appointId) {
      let ret = {}
      let promise = new Promise((resolve, reject)=>{
        if(!appointId){
          resolve(ret)
        }else{
          Vue.http.get('owner/visitor/getAppointDetail', {
            params: {
              appointId
            }
          }).then(({ body })=>{
            if(body.success && body.data){
              resolve(body.data)
            }else{
              resolve(ret)
              utils.alert.call(Vue, body.message)
            }
          }, (error)=>{
            resolve(ret)
            utils.alert.call(Vue, ERROR_MSG.api)
          })
        }
      })
      return promise
    }
  },
  // 我的订单
  order: {
    getList(phoneOrNo) {
      let ret = []
      let promise = new Promise((resolve, reject)=>{
        if(!phoneOrNo){
          resolve(ret)
        }else{
          Vue.http.get('owner/visitor/getOrderList', {
            params: {
              phoneOrNo
            }
          }).then(({ body })=>{
            if(body.success && body.data){
              resolve(body.data.rowsObject)
            }else{
              resolve(ret)
              utils.alert.call(Vue, body.message)
            }
          }, (error)=>{
            resolve(ret)
            utils.alert.call(Vue, ERROR_MSG.api)
          })
        }
      })
      return promise
    },
    getInfo(orderId) {
      let ret = {}
      let promise = new Promise((resolve, reject)=>{
        if(!orderId){
          resolve(ret)
        }else{
          Vue.http.get('owner/visitor/getOrderDetail', {
            params: {
              orderId
            }
          }).then(({ body })=>{
            if(body.success && body.data){
              resolve(body.data)
            }else{
              resolve(ret)
              utils.alert.call(Vue, body.message)
            }
          }, (error)=>{
            resolve(ret)
            utils.alert.call(Vue, ERROR_MSG.api)
          })
        }
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
      if(!type) return PROMISE()

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
      if(!id)  return PROMISE()
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
  },
  faq: {
    getHelpList() {
      let ret = []
      let promise = new Promise((resolve, reject)=>{
        Vue.http.get('owner/visitor/getHelpList')
        .then(({ body })=>{
          if(body.success && body.data){
            resolve(body.data.rowsObject)
          }else{
            resolve(ret)
            utils.alert.call(Vue, body.message)
          }
        }, (error)=>{
          resolve(ret)
          utils.alert.call(Vue, ERROR_MSG.api)
        })
      })
      return promise
    },
    getHelpDetail(id){
      let ret = {}
      let promise = new Promise((resolve, reject)=>{
        if(!id){
          resolve(ret)
        }else{
          Vue.http.get('owner/visitor/getHelpDetail', {
            params: {
              helpId: id
            }
          }).then(({ body })=>{
            if(body.success && body.data){
              resolve(body.data)
            }else{
              resolve(ret)
              utils.alert.call(Vue, body.message)
            }
          }, (error)=>{
            resolve(ret)
            utils.alert.call(Vue, ERROR_MSG.api)
          })
        }
      })
      return promise
    },
    getFeedBackList(userId) {
      let ret = []
      let promise = new Promise((resolve, reject)=>{
        if(!userId){
          resolve(ret)
        }else{
          Vue.http.get('owner/getMyFeedBackList', {
            params: {
              clientId: userId
            }
          }).then(({ body })=>{
            if(body.success && body.data){
              resolve(body.data.rowsObject)
            }else{
              resolve(ret)
              utils.alert.call(Vue, body.message)
            }
          }, (error)=>{
            resolve(ret)
            utils.alert.call(Vue, ERROR_MSG.api)
          })
        }
      })
      return promise
    },
    getFeedBackDetail(id){
      let ret = {}
      let promise = new Promise((resolve, reject)=>{
        if(!id){
          resolve(ret)
        }else{
          Vue.http.get('owner/getMyFeedBackDetail', {
            params: {
              feedBackId: id
            }
          }).then(({ body })=>{
            if(body.success && body.data){
              resolve(body.data)
            }else{
              resolve(ret)
              utils.alert.call(Vue, body.message)
            }
          }, (error)=>{
            resolve(ret)
            utils.alert.call(Vue, ERROR_MSG.api)
          })
        }
      })
      return promise
    },
    getEditFeedBack(id){
      let ret = {}
      let promise = new Promise((resolve, reject)=>{
        if(!id){
          resolve(ret)
        }else{
          Vue.http.post('owner/editFeedBack', {
            id
          }).then(({ body })=>{
            if(body.success && body.data){
              resolve(body.data)
            }else{
              resolve(ret)
            }
          }, (error)=>{
            resolve(ret)
          })
        }
      })
      return promise
    }
  }
}
