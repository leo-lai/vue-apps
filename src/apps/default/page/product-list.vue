<template>
  <div class="l-flex-v" style="height:100%;">
    <tab :line-width="2" :index.sync="tab.index">
      <tab-item 
        v-for="item in tab.data | limitBy 5" 
        :selected="tab.index === $index" 
        @click="tabClick($index)">{{item.dicName}}</tab-item>
    </tab>
    <scroller class="l-rest" v-ref:scroller height="100%"
      lock-x scrollbar-y use-pullup :use-pulldown="false"
      :pullup-config="scroller.config" @pullup:loading="scrollerLoad">
      <div class="l-scroller-body">
        <div class="l-product-list"
          v-for="(index, category) in tab.data | limitBy 5"
          v-show="tab.index === index"
          :transition="tab.direction">
          <div class="l-flex-hc l-product-item vux-1px-t" v-for="item in tab.list[index]">
            <div class="l-thumb">
              <img :src="$image.thumb(item.thumbnail, 60, 60)">
            </div>
            <div class="l-rest l-content">
              <h4 class="l-text-truncate" v-text="item.productName"></h4>
              <p class="l-line-clamp2" v-text="item.videoDesc"></p>
            </div>
            <div>
              <i class="iconfont icon-arrow">&#xe601;</i>
            </div>  
          </div>
        </div>  
      </div>
    </scroller>
    
  </div>
</template>
<script>
import { Panel, Group, Tab, TabItem, Sticky, Scroller } from 'vux-components'
export default {
  components: {
    Panel, Group, Tab, TabItem, Sticky, Scroller
  },
  route: {
    data(transition) {
      const self = this
      self.$http.get('owner/visitor/getProductCategory')
        .then((response)=>{
          if(response.body.success){
            self.tab.data = response.body.data
            self.tabClick(0)
          }
        })
    }
  },
  data() {
    return {
      tab: {
        direction: 'vux-pop-in',
        index: 0,
        data: [],
        list: [[],[],[],[],[]]
      },
      scroller: {
        config: {
          content: '',
          downContent: '松开进行加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中...'
        }
      }
    }
  },
  methods: {
    tabClick(index) {
      const self = this
      if (index < self.tab.index) {
        self.tab.direction = 'vux-pop-out';
      } else {
        self.tab.direction = 'vux-pop-in';
      }

      self.$http.get('owner/visitor/getProductList', {
        params: {
          category: self.tab.data[index].id
        }
      }).then((response)=>{
          if(response.body.success){
            self.tab.index = index
            self.tab.list.$set(index, response.body.data.rowsObject)
            self.$nextTick(() => {
              setTimeout(self.$refs.scroller.reset, 500)
            })
          }
        })
    },
    scrollerLoad(uuid) {
      const self = this
      this.$broadcast('pullup:done', uuid)
      // this.$broadcast('pullup:reset', uuid)
    }
  }
}
</script>
<style scoped lang="less">
.l-product-list{
  // padding: 0.4rem 0;
}
.l-product-item{
  background-color: #fff;
  padding: 0.266667rem;
  .l-thumb{
    margin-right: 0.266667rem;
    width: 1.6rem;
    height: 1.6rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .l-content{
    h4{
      font-weight: 400;
      font-size: 17px;
    }
    p{
      color: #999;
      font-size: 13px;
    }
  }
  .icon-arrow{
    margin-right: -0.133333rem;
  }
}
.l-product-item:active{
  background-color: #ebebeb;
}

</style>
