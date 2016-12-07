<template>
  <div>
    <group title="请填写以下信息" class="weui_cells_form">
      <x-input placeholder="请输入手机号码" :value.sync="phone" class="weui_vcode" keyboard="number" is-type="china-mobile">
        <button slot="right" class="weui-vcode-btn">发送验证码</button>
      </x-input>
      <x-input placeholder="请输入手机验证码" :value.sync="authCode" :max="6" keyboard="number"></x-input>
      <x-input placeholder="请输入新密码" type="password" :value.sync="password" :required="true"></x-input>
      <x-input placeholder="请再次输入新密码" type="password" :equal-with="password"></x-input>
    </group>
    <div class="l-btn-area">
      <x-button type="primary">保存</x-button>  
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton } from 'vux-components'


export default {
  components: {
    Group, XInput, XButton 
  },
  route: {
    activate: function(transition) {
      console.info('hook-example activated!')
      transition.next()
    }
  },
  data() {
    return {
      phone: '',
      authCode: '',
      password: ''
    }
  },
  methods: {
    change() {

    }
  }
}
</script>
