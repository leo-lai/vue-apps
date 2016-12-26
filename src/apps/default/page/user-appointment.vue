<template>
  <div>
    <div class="l-flex-hc l-appointment-item l-border-b" v-for="item in list" @click="view(item.id)">
      <div class="l-rest">
        <p>
          <span class="l-fr">{{getDate(item.appointDate)}}</span>
          <i class="iconfont">&#xe6d0;</i>&nbsp;
          <strong>{{item.billCode}}</strong>
        </p>
        <p>
          <b class="l-fr">{{getStatus(item.state)}}</b>
          <span>{{item.name}}</span>&nbsp;&nbsp;&nbsp;
          <span>{{item.mobilePhone}}</span>
        </p>
        <p><span>{{item.province+item.city+item.area+(item.address||'')}}</span></p>
      </div>
      <div>
        <i class="iconfont icon-arrow">&#xe601;</i>
      </div>
    </div>
    <div class="l-center l-margin l-padding" v-if="!loading && list.length === 0">
      <img class="l-center" style="width:3.75rem;" src="~assets/imgs/none.jpg">
      <p class="l-fgray l-fsize-s l-margin-t">暂无内容</p>
    </div>
    <div v-if="loading" class="l-loading"><br><br><br><br><br></div>
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
    data({ to }) {
      const self = this
      server.appointment.getList(to.query.phone || self.userinfo.mobilePhone)
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
  },
  methods: {
    getStatus(code) { 
      switch(code){
        case 1:
        case 2:
          return '正在安排设计师'
        case 3:
        case 4:
        case 41:
        case 5:
        case 51:
          return '正在设计大样图'
        case 6:
        case 61:
        case 7:
        case 71:
          return '正在报价中'
        case 8:
          return '客户确认中'
        case 9:
          return '已确认报价'
        case 91:
          return '待重新报价'
        case 10:
          return '已生成订单'
      }
    },
    getDate(datetime) {
      if(!datetime) return ''
      return datetime.split(' ')[0]
    },
    view(id) {
      this.$router.go(`/user/appointment/info?id=${id}`)
    }
  }
}
</script>


<style scoped lang="less">
.l-appointment-item{
  color: #999;
  padding: 0.266667rem 0.4rem;
  background-color: #fff;
  font-size: 14px;
  .iconfont{
    font-size: 18px;
  }
  p{
    margin: 5px 0;
  }
  strong {
    font-weight: 400;
    color: #333;
  }
  b{
    font-weight: 400;
    color: #4083c7;
  }
}
.l-appointment-item .icon-arrow{
  margin-right: -0.266667rem
}
</style>