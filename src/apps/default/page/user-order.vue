<template>
  <div>
    <order-list :list="list"></order-list>
    <div class="l-center l-margin l-padding" v-if="!loading && list.length === 0">
      <img class="l-center" style="width:3.75rem;" src="~assets/imgs/none.jpg">
      <p class="l-fgray l-fsize-s l-margin-t">暂无内容</p>
    </div>
    <div v-if="loading" class="l-loading"><br><br><br><br><br></div>
  </div>
</template>
<script>
import OrderList from '../components/order-list'
import { store, getters, actions } from '../vuex'
import server from '../server'
export default {
  components: {
    OrderList
  },
  route: {
    data() {
      const self = this
      server.order.getList(self.userinfo.mobilePhone)
      .then( list => {
        self.list = list
        self.loading = false
      })
    }
  },
  store,
  vuex: {
    getters
  },
  data() {
    return {
      loading: true,
      list: []
    }
  }
}
</script>
