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
  getWxByCode(code, callback) {
    if(!code) return

    callback = utils.isFunction(callback) ? callback : utils.noop
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
  }
}
