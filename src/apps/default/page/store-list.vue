<template>
  <div>
    <div class="l-flex-hc l-store-item" v-for="item in list | orderBy 'distance'" v-link="{path: '/store/list/info?id=' + item.id}">
      <div class="l-thumb"><img :src="$image.thumb(item.thumbnail, 80, 80)"></div>
      <div class="l-rest">
        <h3 v-text="item.storeName"></h3>
        <p v-text="item.address"></p>
        <div class="l-bottom">
          <a class="l-fr" @click.stop href="tel:{{item.workPhone}}"><i class="iconfont">&#xe612;</i> 电话</a>
          <a class="l-fr" @click.stop="openMap(item)"><i class="iconfont">&#xe600;</i> 导航</a>
          <a class="l-fgray"><i class="iconfont">&#xe634;</i>{{item.distance}}km</a>
        </div>
      </div>
      <div>
        <i class="iconfont icon-arrow">&#xe601;</i>
      </div>
    </div>
    <div v-if="loading" class="l-loading"><br><br><br><br><br></div>
  </div>
</template>
<script>
import { utils, storage } from 'assets/lib'
import config from '../config'
import server from '../server'
import wx from 'weixin-js-sdk'

export default {
  route: {
    data() {
      const self = this
      let storeList = []
      let promise1 = self.$http.get('owner/visitor/getStoreList').then(({ body })=>{
        if(body.success && body.data){
          // 计算距离
          storeList = body.data.rowsObject
        }
      })
      let promise2 = server.getPosition()

      // jssdk授权
      let promise3 = server.getWxConfig(window.location.href, ( config )=>{
        wx.config(config)
        wx.ready(()=>{
          self.wxReay = true
        })
        wx.error((res)=>{
          self.wxReay = false
        })
      })

      self.loading = true
      Promise.all([promise1, promise2, promise3]).finally(()=>{
        let lng = storage.local.get('lng')
        let lat = storage.local.get('lat')
        self.list = storeList.map( item => {
          item.distance = server.getDistance({
            lng1: lng, 
            lat1: lat
          }, {
            lng2: item.longitude,
            lat2: item.latitude
          })
          return item
        })
        self.loading = false
      })
    }
  },
  data() {
    return {
      wxReay: false,
      loading: true,
      list: []
    }
  },
  methods: {
    openMap(storeEntity) {
      wx.openLocation({
        latitude: storeEntity.latitude,  
        longitude: storeEntity.longitude, 
        name: storeEntity.storeName,
        address: storeEntity.address, 
        scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      })
    }
  }
}
</script>
<style scoped lang="less">
.l-store-item{
  background-color: #fff;
  padding: 0.266667rem;
  font-size: 14px;
  margin-bottom: 0.4rem;
  h3{margin-bottom: 0.133333rem}
  p{color: #999; font-size: 12px;}
  .l-thumb {
    margin-right: 0.266667rem;
    width: 2.133333rem;
    height: 2.133333rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .iconfont{
    font-size: 16px;
  }
  .l-bottom{
    margin-top: 0.266667rem;
    a{
      margin: 0 0.266667rem 0 0;
    }
    a.l-fr{
      margin: 0 0 0 0.266667rem;
    }
  }
}
</style>
