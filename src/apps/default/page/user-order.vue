<template>
  <div>
    <div class="l-flex-hc l-order-item" v-for="item in list">
      <div class="l-rest">
        <p>订单类型：{{getType(item.designType)}}</p>
        <p>下单日期：{{item.createTime}}</p>
        <p>订单状态：<b>{{getStatus(item.state)}}</b></p>
      </div>
      <!-- <div>
        <i class="iconfont icon-arrow">&#xe601;</i>
      </div> -->
    </div>
  </div>
</template>
<script>
import { Search, Sticky } from 'vux-components'
import { store, getters, actions } from '../vuex'
import server from '../server'
export default {
  components: {
    Search, Sticky
  },
  route: {
    data(transition) {
      const self = this
      server.order.getList(self.userinfo.mobilePhone).then((response)=>{
        if(response.body.success){
          self.list = response.body.data.rowsObject
        }
      })
    }
  },
  store,
  vuex: {
    getters
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    getStatus(code) { 
      switch(code){
        case 1:
          return '确认订单'
        case 2:
          return '生产完成'
        case 3:
          return '产品入库中'
        case 4:
          return '产品出库'
        case 5:
          return '已经发货'
      }
    },
    getType(type) {
      switch(type){
        case 2:
          return '安全窗'
        case 3:
          return '贵族阳光房'
        default:
          return '安全门'
      }
    },
    view(id) {
      this.$router.go(`/user/order/info?id=${id}`)
    }
  }
}
</script>


<style scoped lang="less">
.l-order-item{
  color: #999;
  padding: 0.4rem;
  margin:0 0 0.4rem 0;
  background-color: #fff;
  font-size: 14px;
  strong {
    font-size: 16px;
    color: #333;
  }
  b{
    font-weight: 400;
    color: #4083c7;
  }
}
.l-order-item .icon-arrow{
  margin-right: -0.266667rem
}
</style>