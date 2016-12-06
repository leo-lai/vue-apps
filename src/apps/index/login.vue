<template>
  <div>
    <div class="vux-center l-fsize-l" style="height: 1.6rem;">
      使用账号和密码登录
    </div>
    <group class="weui_cells_form" style="background-color:transparent;">
      <x-input title="账号" placeholder="手机号码" keyboard="number" is-type="china-mobile" :value.sync="fromData.accountName" ></x-input>
      <x-input type="password" title="密码" placeholder="请填写密码" :value.sync="fromData.pwd"  :required="true"></x-input>
    </group>
    <div class="l-btn-area">
      <x-button type="primary" @click="submit">登录</x-button> 
      <x-button><i class="iconfont" style="vertical-align:0; color:#04be02; margin-right:5px;">&#xe60a;</i>微信授权登录</x-button>
    </div>
  </div>
</template>
<script>
import { utils } from 'assets/lib'
import { Group, XInput, XButton } from 'vux-components'

export default {
  components: {
    Group, XInput, XButton 
  },
  data() {
    return {
      fromData: {
        accountName: '',
        pwd: ''
      }
    }
  },
  methods: {
    submit() {
      this.$router.replace( utils.session.get('_history').prevPath ||  '/')
    }
  }
}
</script>
