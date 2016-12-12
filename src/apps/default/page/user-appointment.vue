<template>
  <div>
    <div class="l-flex-hc l-appointment-item" v-for="item in list" @click="view(item.id)">
      <div class="l-rest">
        <p><i class="iconfont">&#xe6d0;</i>&nbsp;&nbsp;<strong>{{item.name}}</strong>&nbsp;&nbsp;&nbsp;&nbsp;{{item.mobilePhone}}</p>
        <p>{{item.appointDate}}&nbsp;&nbsp;&nbsp;&nbsp;<b>{{getStatus(item.state)}}</b></p>
        <p>{{item.province+item.city+item.area+(item.address||'')}}</p>
      </div>
      <div>
        <i class="iconfont icon-arrow">&#xe601;</i>
      </div>
    </div>
  </div>
</template>
<script>
import { store, getters, actions } from '../vuex'
import { Search, Sticky } from 'vux-components'
export default {
  components: {
    Search, Sticky
  },
  route: {
    data(transition) {
      const self = this
      const promise = self.$http.get('owner/visitor/getAppointList', {
        params: {
          // mobilePhone: transition.to.query.phone || self.userinfo.mobilePhone
          mobilePhone: ''
        }
      })
      promise.then((response)=>{
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
        case 9:
        case 91:
          return '客户确认中'
      }
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
  padding: 0.4rem;
  margin:0.4rem 0;
  background-color: #fff;
  font-size: 14px;
  strong {
    font-size: 16px;
    color: #333;
  }
  b{
    font-weight: 400;
    color: #007aff;
  }
}
.l-appointment-item .icon-arrow{
  margin-right: -0.266667rem
}
</style>