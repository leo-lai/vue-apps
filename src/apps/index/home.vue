<template>
  <div>
    <swiper :list="swiperList" loop auto></swiper>
    <group>
      <cell v-for="(key, val) in $device" :title="key">{{val}}</cell>
    </group>
  </div>
</template>

<script>
import { Swiper, Group, Cell } from 'vux'

export default {
  components: {
    Swiper, Group, Cell
  },
  route: {
    activate: function (transition) {
      console.info('hook-example activated!')
      transition.next()
    }
  },
  data () {
    return {
      swiperList: [{
        url: 'javascript:;',
        img: require('assets/imgs/temp-002.jpg'),
        title: ''
      },{
        url: 'javascript:;',
        img: require('assets/imgs/temp-003.jpg'),
        title: ''
      },{
        url: 'javascript:;',
        img: require('assets/imgs/temp-004.jpg'),
        title: ''
      }]
    }
  }
}
</script>

<style>

</style>
