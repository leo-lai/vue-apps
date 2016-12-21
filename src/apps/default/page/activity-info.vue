<template>
  <div>
    <l-article :title="info.title" time="">
      <div class="l-border-b" style="padding-bottom:0.4rem;margin-bottom:0.4rem;color:#666;">
        <p>活动时间：{{startDate}} - {{endDate}}</p>
        <p>活动地点：{{info.location}}</p>
      </div>
      <div v-html="info.content"></div>
    </l-article>
    <div class="l-btn-area">
      <x-button type="primary" @click="receiveCoupon">我要领券</x-button>
    </div>
  </div>
</template>

<script>
import LArticle from 'components/l-article'
import { XButton } from 'vux-components'
import { store, getters } from '../vuex'
import server from '../server'

export default {
  components: {
    LArticle, XButton
  },
  route: {
  	data({ to }) {
  		const self = this
  		let id = to.query.id
      let promise = server.activity.getList(id).then(({ body })=>{
        if(body.success){
          self.info = body.data.rowsObject[0]
        }
      })

      self.$vux.loading.show()
      Promise.all([promise]).finally(()=>{
        self.$vux.loading.hide()
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
  computed:{
    startDate() {
      if(!this.info.startTime) return ''
      return this.info.startTime.split(' ')[0]
    },
    endDate() {
      if(!this.info.endTime) return ''
      return this.info.endTime.split(' ')[0]
    }
  },  
  methods: {
    receiveCoupon() {
      const self = this
      if( !(self.userinfo && self.userinfo.mobilePhone) ){
        self.$vux.toast.show({
          text: '请先登录',
          type: 'cancel',
          onHide() {
            self.$router.go('/login')    
          }
        })
      }else{
        self.$vux.loading.show('领取中')
        server.activity.receive(self.userinfo.mobilePhone, self.info.id, self.info.couponFkid)
        .then(({ body })=>{
          self.$vux.loading.hide()
          if(response.body.success){
            self.$vux.toast.show({
              text: body.message || '领取成功',
              onHide() {
                self.$router.go('/user/coupon?direction=in')
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
