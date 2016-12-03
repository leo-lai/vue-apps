<template>
  <div>
    <card class="card" v-for="item in list">
      <img slot="header" :src="item.img" style="width:100%;display:block;">
      <div slot="content" class="card-padding">
        <p style="color:#999;font-size:12px;">Posted on January 21, 2015</p>
        <p style="font-size:14px;" v-text="item.title"></p>
      </div>
    </card>
  </div>
</template>
<script>
import { Card } from 'vux'
let tempImg = require('assets/imgs/temp-001.jpg');
export default {
  components: {
    Card
  },
  data() {
    return {
      list: [{
        title: '11.11艾臣门窗爱家大行动全面开启',
        img: tempImg
      }, {
        title: '11.11艾臣门窗爱家大行动全面开启',
        img: tempImg
      }, {
        title: '11.11艾臣门窗爱家大行动全面开启',
        img: tempImg
      }]
    }
  }
}
</script>
<style scoped>
.card{margin: 0.4rem 0;}
.card-padding {
  padding: 0.266667rem;
}
</style>
