<template>
  <div>
    <div class="l-flex-hc l-store-item" v-for="item in list" v-link="{path: '/store/list/info?id=' + item.id}">
      <div class="l-thumb"><img :src="$image.thumb(item.thumbnail, 80, 80)"></div>
      <div class="l-rest">
        <h3 v-text="item.storeName"></h3>
        <p v-text="item.address"></p>
        <div class="l-bottom">
          <a href="tel:{{item.workPhone}}" class="l-fr"><i class="iconfont">&#xe612;</i> 电话</a>
          <a class="l-fr"><i class="iconfont">&#xe600;</i> 导航</a>
          <a><i class="iconfont">&#xe634;</i>2km</a>
        </div>
      </div>
      <div>
        <i class="iconfont icon-arrow">&#xe601;</i>
      </div>
    </div>
  </div>
</template>
<script>
import config from '../config'
import { Swiper, Masker, Flexbox, FlexboxItem, Divider, Panel } from 'vux-components'

export default {
  components: {
    Swiper, Masker, Flexbox, FlexboxItem, Divider, Panel
  },
  route: {
    data() {
      const self = this
      self.$http.get('owner/visitor/getStoreList')
        .then((response)=>{
          if(response.body.success){
            self.list = response.body.data.rowsObject
          }
        })
    }
  },
  data() {
    return {
      list: []
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
