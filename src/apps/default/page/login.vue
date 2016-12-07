<template>
  <div>
    <div class="vux-center l-fsize-l" style="height: 1.6rem;">
      使用账号和密码登录
    </div>
    <group class="weui_cells_form">
      <x-input title="账号" placeholder="手机号码" keyboard="number" is-type="china-mobile" :value.sync="fromData.accountName" ></x-input>
      <x-input type="password" title="密码" placeholder="请填写密码" :value.sync="fromData.pwd"  :required="true"></x-input>
    </group>
    <div class="l-btn-area">
      <x-button type="primary" @click="submit">登录</x-button> 
      <x-button @click="wxlogin"><i class="iconfont" style="vertical-align:0; color:#04be02; margin-right:5px;">&#xe60a;</i>微信授权登录</x-button>
      <!-- <x-button v-link="'/register'">快速注册</x-button> -->
    </div>
  </div>
</template>
<script>
import { utils, storage } from 'assets/lib'
import { Group, XInput, XButton } from 'vux-components'
import { store, actions } from '../vuex'
import config from '../config'
// 上一页
let prevPath = storage.session.get('_history').prevPath
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
        accountName: '',
        pwd: ''
      }
    }
  },
  methods: {
    submit() {
      let self = this
      if(!self.fromData.accountName){
        self.acToptips('账号不能为空')
        return  
      }
      if(!self.fromData.pwd){
        self.acToptips('密码不能为空')
        return  
      }

      self.acLoading(true, '登录中')
      self.$http.post('owner/visitor/login', self.fromData)
        .then((response) => {
          self.acLoading(false)
          if(response.body.success){
            self.$router.replace( prevPath ||  '/')  
          }else{
            self.acToptips(response.body.message || '登录失败')
          }
        }, (error) => {
          self.acLoading(false)
          self.acToptips('服务器繁忙，请稍后重试！')
        })
    },
    wxlogin() {
      let url = utils.getGrantUrl(utils.url.join(config.getHost(), config.getPath(), '/register'))
      console.log(url)
      // utils.url.replace(url)
    }
  }
}
</script>
