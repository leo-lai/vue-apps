<template>
  <div>
    dddddddddddddddddddd
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
      // console.info('hook-example activated!')
      transition.next()
    }
  },
  data() {
    return {
      isSubRouter: true,
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


<style scoped>
.l-coupon-item{
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin:0.266667rem;
  box-shadow: 1px 1px 1px #999;
  font-size: 12px;
}
.l-coupon-item .icon-arrow{
  display: inline-block;
  width: 0.8rem;
  text-align: center;
  color: #c8c8cd;
}
.l-coupon-item-val{
  width: 35%; 
  max-width: 5.333333rem;
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