<template>
  <div class="l-select-none">
    <blur class="l-user-avatar l-flex-vhc" :blur-amount="15" :height="150" :url="images.avatar">
      <div v-link="'/user/info'" class="avatar" :style="{'background-image': 'url('+images.avatar+')'}"></div>
    </blur>
    <group class="l-group">
      <!-- <cell title="个人信息" link="/user/info">
        <i slot="icon" class="iconfont" style="background-color:#1ab9cf;">&#xe6b7;</i>
      </cell> -->
      <cell title="我的预约" link="/user/appointment">
        <i slot="icon" class="iconfont" style="background-color:#2ea748;">&#xe6d0;</i>
      </cell>
      <cell title="我的订单" link="/user/order">
        <i slot="icon" class="iconfont" style="background-color:#535fe0;">&#xe653;</i>
      </cell>
      <cell title="我的优惠劵" link="/user/coupon">
        <i slot="icon" class="iconfont" style="background-color:#f19824;">&#xe625;</i>
      </cell>
      <cell title="重置密码" link="/user/pwd">
        <i slot="icon" class="iconfont" style="background-color:#f96827;">&#xe613;</i>
      </cell>
      <cell title="意见反馈" link="/user/faq">
        <i slot="icon" class="iconfont" style="background-color:#41af58;">&#xe64d;</i>
      </cell>
      <cell title="400-816-2882" value="09:00-24:00" :is-link="true" @click="callPhone('400-816-2882')">
        <i slot="icon" class="iconfont" style="background-color:#fe486e;">&#xe652;</i>
      </cell>
      <cell title="退出登录" :is-link="true" @click="logout">
        <i slot="icon" class="iconfont" style="background-color:#999999;">&#xe7c7;</i>
      </cell>
    </group>
  </div>
</template>
<script>
import { Blur, Group, Cell } from 'vux-components'
import { store, actions } from '../vuex'

let images = {
  'avatar': require('assets/imgs/kenan2.jpg')
}
export default {
  components: {
    Blur, Group, Cell
  },
  store,
  vuex: {
    actions
  },
  data() {
    return {
      images: images
    }
  },
  methods: {
    callPhone(phone) {
      window.location.href = 'tel://' + phone;
    },
    logout() {
      let self = this
      self.acConfirm({
        title: '确定退出登录？',
        onConfirm() {
          self.$router.replace('/login')
          // self.$router.replace('/login?redirect=' + self.$route.path)
          // self.$router.go({
          //   path: 'login?redirect=' + self.$route.path,
          //   replace: true
          // })
        }
      })
    }
  }
}
</script>
<style>
.l-user-avatar {
  z-index: 0;
  background-color: #35495e;
}

.l-user-avatar .avatar {
  width: 2.133333rem;
  height: 2.133333rem;
  border-radius: 50%;
  border: 2px solid #ececec;
  background: no-repeat 50% 50%;
  background-size: cover;
}
</style>
