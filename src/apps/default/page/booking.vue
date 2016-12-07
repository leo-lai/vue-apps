<template>
  <div>
    <img src="~assets/imgs/temp-006.jpg">
    <img src="~assets/imgs/temp-007.jpg">
    <div style="background-color:#fff;padding:0.8rem 0;">
      <img src="~assets/imgs/temp-008.jpg">
    </div>
    <div class="l-margin-tb" style="background-color:#fff;padding:0.8rem 0;">
      <img class="l-center" style="width:80%;" src="~assets/imgs/temp-009.jpg">
      <group class="l-booking-form">
        <x-input name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
        <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        <address title="" :value.sync="address.value" raw-value :list="address.data" placeholder="请选择地区"></address>
      </group>
    </div>
    <div class="l-btn-area">
      <x-button type="primary">马上预约</x-button>
    </div>
  </div>
</template>
<script>
import { XButton, Group, XInput, Cell, Address, AddressChinaData } from 'vux-components'
let images = {
  tempImg: require('assets/imgs/temp-006.jpg')
}
export default {
  components: {
    XButton, Group, XInput, Cell, Address, AddressChinaData
  },
  route: {
    activate: function(transition) {
      console.info('hook-example activated!')
      transition.next()
    }
  },
  data() {
    return {
      images: images,
      address: {
        data: AddressChinaData,
        title: '所在地区',
        value: []
      }
    }
  }
}
</script>
<style lang="less">
.l-booking-form{
  margin-left: 0.533333rem;
  margin-right: 0.533333rem;
  .weui_cells:after, .weui_cells:before{
    display: none;
  }
  .vux-popup-picker-value{
    float: left;
  }
  .vux-popup-picker-value+span{
    float: left;
    color: #a9a9a9;
  }
}
</style>
