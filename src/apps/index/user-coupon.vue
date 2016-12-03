<template>
  <div>
    <tab :line-width="2" :index.sync="tabIndex">
      <tab-item :selected="tabIndex === 0" @click="tabIndex = 0">未使用</tab-item>
      <tab-item :selected="tabIndex === 1" @click="tabIndex = 1">已使用</tab-item>
      <tab-item :selected="tabIndex === 2" @click="tabIndex = 2">已过期</tab-item>
    </tab>
    <div class="l-coupon-list">
      <div class="l-coupon-item l-hflex">
        <div class="l-coupon-item-val vux-center">
          <h4>¥1000</h4>
        </div>
        <div class="l-flex1 l-coupon-item-desc">
          <h4>【产品抵用券】满10000元减1000元</h4>
          <p>卷号：123456789</p>
          <p>有效期：2016-11-10至2016-11-25</p>
        </div>
        <!-- <div class="l-vflex l-hc">
          <i class="iconfont icon-arrow">&#xe601;</i>
        </div> -->
      </div>
      <div class="l-coupon-item l-hflex">
        <div class="l-coupon-item-val vux-center">
          <h4>¥1000</h4>
        </div>
        <div class="l-flex1 l-coupon-item-desc">
          <h4>【产品抵用券】满10000元减1000元</h4>
          <p>卷号：123456789</p>
          <p>有效期：2016-11-10至2016-11-25</p>
        </div>
      </div>
      <div class="l-coupon-item l-hflex">
        <div class="l-coupon-item-val vux-center">
          <h4>¥1000</h4>
        </div>
        <div class="l-flex1 l-coupon-item-desc">
          <h4>【产品抵用券】满10000元减1000元</h4>
          <p>卷号：123456789</p>
          <p>有效期：2016-11-10至2016-11-25</p>
        </div>
      </div>
      <divider>即将过期</divider>
      <div class="l-coupon-item l-hflex">
        <div class="l-coupon-item-val vux-center">
          <h4>¥1000</h4>
        </div>
        <div class="l-flex1 l-coupon-item-desc">
          <h4>【产品抵用券】满10000元减1000元</h4>
          <p>卷号：123456789</p>
          <p style="color:red;">有效期：2016-11-10至2016-11-25</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.l-coupon-item{
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin:0.266667rem;
  box-shadow: 1px 1px 1px #999;
}
.l-coupon-item .icon-arrow{
  display: inline-block;
  width: 0.8rem;
  text-align: center;
  color: #c8c8cd;
}
.l-coupon-item-val{
  width: 2.666667rem; 
  min-height: 2.666667rem;
  color: #fff;
  text-align: center;
  background: #b9965e url('~assets/imgs/wave.jpg') repeat-y top right;
}
.l-coupon-item-val h4{
  font-size: 20px;
  font-weight: 400;
}
.l-coupon-item-desc{
  padding: 0.266667rem;
}
.l-coupon-item-desc h4{
  font-size: 14px;
  color: #b9965e;
  margin-bottom: 0.266667rem;
}
.l-coupon-item-desc p{
  color: #666;
}

</style>

<script>
import { Tab, TabItem, Divider } from 'vux'


export default {
  components: {
    Tab, TabItem, Divider
  },
  route: {
    activate: function(transition) {
      console.info('hook-example activated!')
      transition.next()
    }
  },
  data() {
    return {
      tabIndex: 0
    }
  }
}
</script>
