<template>
  <div>
    <div class="l-order-item">
      <p>订<ins class="ins4-1"></ins>单<ins class="ins4-1"></ins>号：<span v-text="info.orderNo"></span></p>
      <p v-if="info.designer">专属客服：<span v-text="info.designer"></span><span>(<a href="tel:{{info.designerPhone}}" v-text="info.designerPhone"></a>)</span></p>
      <p>姓<ins></ins>名：<span v-text="info.name"></span></p>
      <p>手机号码：<span v-text="info.mobilePhone"></span></p>
      <p>楼盘地址：<span v-text="info.province+info.city+info.area+(info.address||'')"></span></p>
    </div>
  </div>
</template>
<script>
import { store, getters, actions } from '../vuex'
import { Divider, XButton, Dialog, Group } from 'vux-components'
import server from '../server'
export default {
  components: {
    Divider, XButton, Dialog, Group
  },
  route: {
    data(transition) {
      const self = this
      let id = transition.to.query.id
      server.order.getInfo(id).then((response)=>{
        if(response.body.success && response.body.data){
          self.info = response.body.data
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
      info: {}
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
    }
  }
}
</script>

<style scoped lang="less">
.l-order-item{
  padding: 0.4rem;
  background-color: #fff;
  margin: 0 0 0.533333rem 0;
  font-size: 14px;
  p{
    margin:5px 0;
  }
  span{
    color: #999;
  }
}
</style>