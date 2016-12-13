<template>
  <div>
    <group class="l-store-info">
      <div class="l-flex-h l-thumb">
        <img :src="$image.thumb(info.thumbnail, 80, 80)">
        <div class="l-rest">
          <span class="l-fr l-fgray"><i class="iconfont">&#xe634;</i>2km</span>
          <h3 v-text="info.storeName"></h3>
        </div>
      </div>
      <cell :title="'营业时间 ' + info.openTime">
        <i class="iconfont" slot="icon">&#xe61f;</i>
      </cell>
      <cell :title="'订货电话 ' + info.workPhone">
        <i class="iconfont" slot="icon">&#xe612;</i>
      </cell>
      <cell :title="'门店地址 ' + info.address">
        <i class="iconfont" slot="icon">&#xe600;</i>
      </cell>
    </group>

    <div v-if="info.introduce || storeImgList.length > 0" class="l-margin-tb l-store-details">
      <div v-html="info.introduce"></div>
      <div v-for="(index,item) in storeImgList" @click="$refs.previewer.show(index)">
        <img class="previewer-img" :src="item.src"/>  
      </div>
    </div>
    <previewer :list="storeImgList" v-ref:previewer :options="options"></previewer>
  </div>
</template>
<script>
import config from '../config'
import { Group, Cell, Previewer, Dialog } from 'vux-components'

export default {
  components: {
    Group, Cell, Previewer, Dialog
  },
  route: {
    data(transition) {
      const self = this
      self.$http.get('owner/visitor/getStoreDetail', {
        params: {
          storeId: transition.to.query.id
        }
      }).then((response)=>{
        if(response.body.success){
          self.info = response.body.data
          if(self.info.storeImgList){
            self.storeImgList = self.info.storeImgList.map((item) => {
              return {
                w: 640,
                h: 400,
                src: self.$image.thumb(item, 640, 400)
              }
            })
          }
        }
      })
    }
  },
  data() {
    return {
      info: {},
      storeImgList: [],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  }
}
</script>
<style type="text/css">
.l-store-info .weui_cells{
  margin-top: 0;
}
</style>
<style scoped lang="less">
.l-store-info {
  [slot=icon]{
    color: #4083c7;
    display: block;
    width: 30px;
    margin-top: -2px;
  }
  .l-thumb{
    padding: 0.4rem;
    h3{
      font-weight: 400;
    }
    img{
      width: 2.133333rem;
      height: 2.133333rem;
      margin-right: 0.266667rem;
    }
  }
}

.l-store-details{
  background-color: #fff;
  padding: 0.4rem;
  img{
    display: block;
    margin: 0.266667rem auto;
  }
}
</style>
