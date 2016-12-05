<template>
  <div>
    <group title="请填写以下信息" class="weui_cells_form">
      <x-input placeholder="请输入手机号码" @on-change="change" :value.sync="phone" class="weui_vcode" keyboard="number" is-type="china-mobile">
        <button slot="right" class="weui-vcode-btn">发送验证码</button>
      </x-input>
      <x-input placeholder="请输入手机验证码" @on-change="change" :value.sync="authCode" :max="6" keyboard="number"></x-input>
      <x-input placeholder="请输入新密码" @on-change="change" type="password" :value.sync="password" :required="true"></x-input>
      <x-input placeholder="请确认新密码" @on-change="change" type="password" :equal-with="password"></x-input>
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
<style>

.weui-vcode-btn {
  background-color: transparent;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  outline: 0;
}

.weui-vcode-btn {
  display: inline-block;
  height: 44px;
  margin-left: 5px;
  padding: 0 0.6em 0 0.7em;
  border-left: 1px solid #E5E5E5;
  line-height: 44px;
  vertical-align: middle;
  font-size: 17px;
  color: #3CC51F;
}
.weui-vcode-btn:active {
  color: #52a341;
}
</style>