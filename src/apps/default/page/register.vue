<template>
  <div>
    <div class="vux-center l-fsize-l" style="height: 1.6rem;">
      填写注册信息
    </div>
    <group class="weui_cells_form">
      <x-input placeholder="请输入手机号码" :value.sync="fromData.mobilePhone" class="weui_vcode" keyboard="number" is-type="china-mobile">
        <button v-el:send-btn slot="right" class="weui-vcode-btn" @click="sendCode">发送验证码</button>
      </x-input>
      <x-input placeholder="请输入手机验证码" :value.sync="fromData.validCode" :max="6" keyboard="number"></x-input>
      <x-input placeholder="请输入密码" type="password" :value.sync="fromData.pwd" :required="true"></x-input>
      <x-input placeholder="请再次输入密码" type="password" :equal-with="fromData.confirmPwd"></x-input>
    </group>
    <div class="l-btn-area">
      <x-button type="primary" @click="submit">快速注册</x-button> 
      <!-- <x-button><i class="iconfont" style="vertical-align:0; color:#04be02; margin-right:5px;">&#xe60a;</i>微信授权登录</x-button> -->
    </div>
  </div>
</template>
<script>
import { utils } from 'assets/lib'
import { Group, XInput, XButton } from 'vux-components'
import { store, actions } from '../vuex'

export default {
  components: {
    Group, XInput, XButton
  },
  store,
  vuex: {
    actions
  },
  data() {
    return {
      fromData: {
        mobilePhone: '',
        validCode: '',
        pwd: '',
        confirmPwd: ''
      }
    }
  },
  methods: {
    sendCode(){
      utils.sendMobiCode(this.fromData.mobilePhone, this.$els.sendBtn)
    },
    submit() {
      let self = this
      if(!utils.regexp.mobile.test(self.fromData.mobilePhone)){
        self.acToptips('请输入正确手机号码')
        return  
      }
      if(!self.fromData.validCode){
        self.acToptips('请输入手机验证码')
        return  
      }
      if(!self.fromData.pwd){
        self.acToptips('密码不能为空')
        return  
      }
      if(self.fromData.pwd !== self.fromData.confirmPwd){
        self.acToptips('两次密码不一致')
        return  
      }

      self.acLoading(true, '注册中')
      self.$http.post('owner/visitor/register', self.fromData)
        .then((response) => {
          self.acLoading(false)
          if(response.body.success){
            self.$router.replace('/user')  
          }else{
            self.acToptips(response.body.message || '注册失败')
          }
        }, (error) => {
          self.acLoading(false)
          self.acToptips('服务器繁忙，请稍后重试！')
        })
    }
  }
}
</script>
<style>


</style>
