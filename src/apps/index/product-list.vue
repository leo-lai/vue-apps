<template>
  <div>
    <tab :line-width="2" :index.sync="tabIndex">
      <tab-item :selected="tabIndex === 0" @click="tabIndex = 0">安全门</tab-item>
      <tab-item :selected="tabIndex === 1" @click="tabIndex = 1">安全窗</tab-item>
      <tab-item :selected="tabIndex === 2" @click="tabIndex = 2">贵族阳光房</tab-item>
    </tab>
    <panel class="l-product-list" :list="list" :type="type"></panel>
  </div>
</template>
<script>
import { Panel, Group, Tab, TabItem } from 'vux'
let tempImg = require('assets/imgs/temp-005.jpg')
export default {
  components: {
    Panel, Group, Tab, TabItem
  },
  data() {
    return {
      tabIndex: 0,
      type: '1',
      list: [{
        src: tempImg,
        title: '无锁孔门',
        desc: '适用于：入户门',
        url: '/product/details'
      }, {
        src: tempImg,
        title: '澳式清风推拉门',
        desc: '适用于：阳台、客厅',
        url: '/product/details'
      }, {
        src: tempImg,
        title: '经典推拉门A型',
        desc: '适用于：阳台、客厅',
        url: '/product/details'
      }, {
        src: tempImg,
        title: '豪华堆叠门',
        desc: '适用于：阳台、客厅',
        url: '/product/details'
      }, {
        src: tempImg,
        title: '豪华开平门',
        desc: '适用于：阳台、客厅',
        url: '/product/details'
      }]
    }
  }
}
</script>
<style>
.l-product-list .weui_media_appmsg_thumb{
  vertical-align: middle !important;
}
</style>
