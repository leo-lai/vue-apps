<template>
  <div>
    <sticky>
      <tab :line-width="2" :index.sync="tabIndex">
        <tab-item :selected="tabIndex === 0" @click="tabClick(0)">未使用</tab-item>
        <tab-item :selected="tabIndex === 1" @click="tabClick(1)">已使用</tab-item>
        <tab-item :selected="tabIndex === 2" @click="tabClick(2)">已过期</tab-item>
      </tab>
    </sticky>
    <div class="l-coupon-list" v-show="tabIndex === 0" :transition="tabDirection">
      <div class="l-flex-h l-coupon-item-{{item}}" v-for="item in 4">
        <div class="l-rest par">
          <p>折扣券</p>
          <sub class="sign">￥</sub><span>50.00</span>
          <p>订单满100.00元</p>
        </div>
        <div class="copy l-flex-vhc">
          <p>有效日期</p>
          <div class="time">
            2015-08-13<br>2016-08-13
          </div>
          <x-button mini>立即使用</x-button>
        </div>
        <i></i>
      </div>
    </div>
    <div class="l-coupon-list" v-show="tabIndex === 1" :transition="tabDirection">
      <div class="l-flex-h l-coupon-item-used" v-for="item in 2">
        <div class="l-rest par">
          <p>折扣券</p>
          <sub class="sign">￥</sub><span>50.00</span>
          <p>订单满100.00元</p>
        </div>
        <div class="copy l-flex-vhc">
          <p>有效日期</p>
          <div class="time">
            2015-08-13<br>2016-08-13
          </div>
          <x-button mini>立即使用</x-button>
        </div>
        <i></i>
      </div>
    </div>
    <div class="l-coupon-list" v-show="tabIndex === 2" :transition="tabDirection">
      <div class="l-flex-h l-coupon-item-used" v-for="item in 1">
        <div class="l-rest par">
          <p>折扣券</p>
          <sub class="sign">￥</sub><span>50.00</span>
          <p>订单满100.00元</p>
        </div>
        <div class="copy l-flex-vhc">
          <p>有效日期</p>
          <div class="time">
            2015-08-13<br>2016-08-13
          </div>
          <x-button mini>立即使用</x-button>
        </div>
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
import {Tab, TabItem, Divider, XButton, Sticky } from 'vux-components'

export default {
  components: {Tab, TabItem, Divider, Sticky, XButton },
  data() {
    return {
      tabDirection: 'vux-pop-in',
      tabIndex: 0,
      notUsedList: [],
      usedList: [],
      expiredList: []
    }
  },
  methods: {
    tabClick(index) {
      if (index < this.tabIndex) {
        this.tabDirection = 'vux-pop-out';
      } else {
        this.tabDirection = 'vux-pop-in';
      }
      this.tabIndex = index;
    }
  }
}
</script>
<style scoped lang="less">
.l-coupon-list{
  box-sizing: border-box;
  padding: 0 0.4rem;
}

[class*=l-coupon-item] button{
  border-radius: 2px;
}
[class*=l-coupon-item] button:after{
  display: none;
}

[class*=l-coupon-item] {
  background: #F39B00;
  margin: 0.4rem 0;
  box-sizing: border-box;
  width: 100%;
  min-height: 3.413333rem;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
  i {
    position: absolute;
    left: -20%;
    top: 20%;
    height: 100%;
    width: 200%;
    background-color: rgba(255, 255, 255, .15);
    transform: rotate(-30deg);
    z-index: 1;
  }
  .par {
    padding: 10px;
    border-right: 2px dashed rgba(255, 255, 255, .3);
    text-align: left;
    p {
      color: #fff;
      font-size: 16px;
      line-height: 21px;
    }
    span {
      font-size: 30px;
      color: #fff;
      margin-right: 5px;
      line-height: 1.6rem;
    }
    .sign {
    }
    sub {
      position: relative;
      top: -5px;
      color: rgba(255, 255, 255, .8);
    }
  }
  .copy {
    width: 35%;
    max-width: 4.0rem;
    color: rgb(255, 255, 255);
    .time{
      line-height: 1.6;
      text-align: center;
      font-size: 12px;
      margin: 10px;
    }
  }
}

[class*=l-coupon-item]:before, [class*=l-coupon-item]:after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  background:radial-gradient(rgb(235, 235, 235) 0, rgb(235, 235, 235) 5px, transparent 5px) repeat-y;
  background-size: 16px 16px;
}
[class*=l-coupon-item]:before{
  left: 0;
  background-position: -8px top;
  // display: none;
}
[class*=l-coupon-item]:after{
  right: 0;
  background-position: -2px top;
}

.l-coupon-item-used{
  background-color: #999;
}
.l-coupon-item-used button{
  display: none;
}
.l-coupon-item-0{
  background-color: #F39B00;
}
.l-coupon-item-1{
  background-color: #D24161;
}
.l-coupon-item-2{
  background-color: #7EAB1E;
}
.l-coupon-item-3{
  background-color: #50ADD3;
}
</style>
