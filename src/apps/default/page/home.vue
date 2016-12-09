<template>
  <div>
    <swiper :list="swiperList" loop auto></swiper>
    <div class="l-margin-tb l-flex-hc" style="background-color:#fff;padding:0.4rem;">
      <div class="l-rest">
        <masker class="l-masker-item" :opacity="0.5" v-link="{path:'/booking'}">
          <div class="l-img" :style="{backgroundImage: 'url(' + images.tempImg + ')'}"></div>
          <div class="l-title" slot="content">在线预约</div>
        </masker>  
      </div>
      <div class="l-rest" style="margin-left:0.4rem;">
        <masker class="l-masker-item" :opacity="0.5" v-link="{path:'/booking'}">
          <div class="l-img" :style="{backgroundImage: 'url(' + images.tempImg + ')'}"></div>
          <div class="l-title" slot="content">领福利</div>
        </masker>
      </div>
    </div>
    <div class="l-flex-wrap l-grid">
      <div class="l-flex-vhc l-grid-item">
        <img src="~assets/imgs/icon-tabbar.png">
        <p>企业简介</p>
      </div>
      <div class="l-flex-vhc l-grid-item">
        <img src="~assets/imgs/icon-tabbar.png">
        <p>企业荣誉</p>
      </div>
      <div class="l-flex-vhc l-grid-item">
        <img src="~assets/imgs/icon-tabbar.png">
        <p>门店展示</p>
      </div>
      <div class="l-flex-vhc l-grid-item">
        <img src="~assets/imgs/icon-tabbar.png">
        <p>案列分享</p>
      </div>
      <div class="l-flex-vhc l-grid-item">
        <img src="~assets/imgs/icon-tabbar.png">
        <p>产品展示</p>
      </div>
      <div class="l-flex-vhc l-grid-item">
        <img src="~assets/imgs/icon-tabbar.png">
        <p>智慧生活</p>
      </div>
      <div class="l-flex-vhc l-grid-item">
        <img src="~assets/imgs/icon-tabbar.png">
        <p>澳式风情</p>
      </div>
      <div class="l-flex-vhc l-grid-item">
        <img src="~assets/imgs/icon-tabbar.png">
        <p>720展厅</p>
      </div>
    </div>
    <panel class="l-margin-tb" header="<h3 style='color:#333;'>艾臣资讯</h3>" :footer="news.footer" :list="news.data" type="1"></panel>
  </div>
</template>
<script>
import config from '../config'
import { Swiper, Masker, Flexbox, FlexboxItem, Divider, Panel } from 'vux-components'
let images = {
  tempImg: require('assets/imgs/temp-002.jpg')
}

export default {
  components: {
    Swiper, Masker, Flexbox, FlexboxItem, Divider, Panel
  },
  route: config.routeHook,
  events: config.vueHook,
  data() {
    return {
      images: images,
      swiperList: [{
        url: 'javascript:;',
        img: require('assets/imgs/temp-001.jpg'),
        title: ''
      }, {
        url: 'javascript:;',
        img: require('assets/imgs/temp-001.jpg'),
        title: ''
      }, {
        url: 'javascript:;',
        img: require('assets/imgs/temp-001.jpg'),
        title: ''
      }],
      news: {
        data: [{
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: ''
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: ''
        }],
        footer: {
          title: '查看更多',
          url: ''
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.l-grid{
  margin:0.4rem 0;
  background-color: #fff;
  font-size: 12px;
}
.l-grid-item{
  box-sizing: border-box;
  width: 25%;
  padding: 0.266667rem;
  img{
    width: 80%;
  }
  p{
    margin-top: 5px;
  }
}
.l-masker-item{
  border-radius: 5px;
  .l-img{
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }
  .l-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0,0,0,.5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
