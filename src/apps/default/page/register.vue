<template>
  <div>
    <div class="vux-center l-fsize-l" style="height: 1.6rem;">
      填写注册信息
    </div>
    <group class="weui_cells_form">
      <x-input placeholder="请输入手机号码" :value.sync="formData.mobilePhone" class="weui_vcode" keyboard="number" is-type="china-mobile">
        <button v-el:send-btn slot="right" class="weui-vcode-btn" @click="sendCode">发送验证码</button>
      </x-input>
      <x-input placeholder="请输入手机验证码" :value.sync="formData.validCode" :max="6" keyboard="number"></x-input>
      <x-input placeholder="请输入密码" type="password" :value.sync="formData.pwd" :required="true"></x-input>
      <x-input placeholder="请再次输入密码" type="password" :value.sync="formData.confirmPwd"></x-input>
    </group>
    <div class="l-btn-area">
      <x-button type="primary" @click="submit">快速注册</x-button> 
      <x-button @click="$router.replace('/login?direction=out')">返回登录</x-button>
    </div>
  </div>
</template>
<script>
import { utils } from 'assets/lib'
import { Group, XInput, XButton } from 'vux-components'
import { store, actions } from '../vuex'
import server from '../server'

export default {
  components: {
    Group, XInput, XButton
  },
  store,
  vuex: {
    actions
  },
  route: {
    canActivate(transition){
      const code = transition.to.query.code
      if(code){ // 如果页面已授权
        // 获取微信信息及判断是否已注册
        server.getWxByCode(code).then((response)=>{
          if(response.body.success && response.body.data && response.body.data.mobilePhone){
            transition.redirect('/user')
          }else{
            transition.next()    
          }
        })
      }else{
        transition.next()
      }
    }
  },
  data() {
    return {
      formData: {
        mobilePhone: '',
        validCode: '',
        pwd: '',
        confirmPwd: ''
      }
    }
  },
  methods: {
    sendCode() {
      server.sendMobiCode(this.formData.mobilePhone, this.$els.sendBtn)
    },
    submit() {
      let self = this
      if(!utils.regexp.mobile.test(self.formData.mobilePhone)){
        self.$vux.toptips.show('请输入正确手机号码')
        return  
      }
      if(!self.formData.validCode){
        self.$vux.toptips.show('请输入手机验证码')
        return  
      }
      if(!self.formData.pwd){
        self.$vux.toptips.show('密码不能为空')
        return 
      }
      if(self.formData.pwd !== self.formData.confirmPwd){
        self.$vux.toptips.show('两次密码不一致')
        return
      }

      self.$vux.loading.show('注册中')
      self.$http.post('owner/visitor/register', self.formData)
        .then((response) => {
          self.$vux.loading.hide()
          if(response.body.success){
            self.$router.replace('/user')  
          }else{
            self.$vux.toptips.show(response.body.message || '注册失败')
          }
        }, (error) => {
          self.$vux.loading.hide()
          self.$vux.toptips.show('服务器繁忙，请稍后重试！')
        })
    }
  }
}
</script>
<style>


</style>
