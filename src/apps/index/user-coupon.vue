<template>
  <div>
    <sticky>
      <tab :line-width="2" :index.sync="tabIndex">
        <tab-item :selected="tabIndex === 0" @click="tabClick(0)">未使用</tab-item>
        <tab-item :selected="tabIndex === 1" @click="tabClick(1)">已使用</tab-item>
        <tab-item :selected="tabIndex === 2" @click="tabClick(2)">已过期</tab-item>
      </tab>
    </sticky>
    <div class="l-coupon-list" v-if="tabIndex === 0" :transition="tabDirection">
      <div class="l-coupon-item l-hflex" v-for="item in notUsedList">
        <div class="l-coupon-item-val vux-center">
          <h4>¥{{item.value}}</h4>
        </div>
        <div class="l-flex1 l-coupon-item-desc">
          <h4>{{item.name}}</h4>
          <p>卷号：{{item.code}}</p>
          <p>有效期：{{item.startDate}}至{{item.endDate}}</p>
        </div>
        <!-- <div class="l-vflex l-hc">
          <i class="iconfont icon-arrow">&#xe601;</i>
        </div> -->
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
    <div class="l-coupon-list" v-if="tabIndex === 1" :transition="tabDirection">
      <div class="l-coupon-item l-hflex" v-for="item in usedList">
        <div class="l-coupon-item-val vux-center">
          <h4>¥{{item.value}}</h4>
        </div>
        <div class="l-flex1 l-coupon-item-desc">
          <h4>{{item.name}}</h4>
          <p>卷号：{{item.code}}</p>
          <p>有效期：{{item.startDate}}至{{item.endDate}}</p>
        </div>
      </div>
    </div>
    <div class="l-coupon-list" v-if="tabIndex === 2" :transition="tabDirection">
      <div class="l-coupon-item l-hflex" v-for="item in expiredList">
        <div class="l-coupon-item-val vux-center">
          <h4>¥{{item.value}}</h4>
        </div>
        <div class="l-flex1 l-coupon-item-desc">
          <h4>{{item.name}}</h4>
          <p>卷号：{{item.code}}</p>
          <p>有效期：{{item.startDate}}至{{item.endDate}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, Divider, Sticky } from 'vux'

export default {
  components: {
    Tab, TabItem, Divider, Sticky
  },
  route: {
    activate: function(transition) {
      console.info('hook-example activated!')
      transition.next()
    }
  },
  data() {
    return {
      tabDirection: 'vux-pop-in',
      tabIndex: 0,
      notUsedList: [
        {
          value: 1000,
          name: '【产品抵用券】满10000元减1000元',
          code: '1928928339030303',
          startDate: '2016-11-22',
          endDate: '2016-12-22'
        },
        {
          value: 1000,
          name: '【产品抵用券】满10000元减1000元',
          code: '1928928339030303',
          startDate: '2016-11-22',
          endDate: '2016-12-22'
        },
        {
          value: 1000,
          name: '【产品抵用券】满10000元减1000元',
          code: '1928928339030303',
          startDate: '2016-11-22',
          endDate: '2016-12-22'
        },
        {
          value: 1000,
          name: '【产品抵用券】满10000元减1000元',
          code: '1928928339030303',
          startDate: '2016-11-22',
          endDate: '2016-12-22'
        },
        {
          value: 1000,
          name: '【产品抵用券】满10000元减1000元',
          code: '1928928339030303',
          startDate: '2016-11-22',
          endDate: '2016-12-22'
        }
      ],
      usedList: [
        {
          value: 1000,
          name: '【产品抵用券】满10000元减1000元',
          code: '1928928339030303',
          startDate: '2016-11-22',
          endDate: '2016-12-22'
        },
        {
          value: 1000,
          name: '【产品抵用券】满10000元减1000元',
          code: '1928928339030303',
          startDate: '2016-11-22',
          endDate: '2016-12-22'
        }
      ],
      expiredList: [
        {
          value: 1000,
          name: '【产品抵用券】满10000元减1000元',
          code: '1928928339030303',
          startDate: '2016-11-22',
          endDate: '2016-12-22'
        }
      ]
    }
  },
  methods: {
    tabClick(index) {
      if(index < this.tabIndex){
        this.tabDirection = 'vux-pop-out';
      }else{
        this.tabDirection = 'vux-pop-in';
      }
      this.tabIndex = index;
    }
  }
}
</script>


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