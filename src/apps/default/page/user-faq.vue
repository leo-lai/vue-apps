<template>
  <div>
    <group title="常见问题">
      <cell v-for="item in faqList" :title="item.question" :link="{path: '/user/faq/info?id='+item.id }">
        <span slot="icon">{{$index+1}}、</span>
      </cell>
    </group>
    <div v-if="loading1" class="l-loading"><br><br><br></div>
    <group title="我的反馈">
      <cell v-for="item in feedbackList" :title="item.title" :link="{path: '/user/faq/feedback?id='+item.id }">
        <span slot="icon">{{$index+1}}、</span>
        <span slot="after-title"></span>
      </cell>
    </group>
    <div v-if="loading2" class="l-loading"><br><br><br></div>
    <div class="l-btn-area">
      <x-button type="primary" v-link="{path:'/user/faq/add'}">我要反馈</x-button>  
    </div>
  </div>
</template>

<script>
import { store, getters, actions } from '../vuex'
import { Group, Cell, XButton } from 'vux-components'

export default {
  components: {
    Group, Cell, XButton
  },
  route: {
    data(transition) {
      const self = this

      let promise1 = self.$http.get('owner/visitor/getHelpList')
      promise1.then(({ body })=>{
        self.loading1 = false
        if(body.success){
          self.faqList = body.data.rowsObject
        }
      })

      let promise2 = self.$http.get('owner/getMyFeedBackList', {
        params: {
          clientId: self.userinfo.id
        }
      }).then(({ body })=>{
        self.loading2 = false
        if(body.success){
          self.feedbackList = body.data.rowsObject
        }
      })
    }
  },
  store,
  vuex: {
    getters
  },
  data () {
    return {
      loading1: true,
      loading2: true,
      faqList: [],
      feedbackList: []
    }
  }
}
</script>

<style>

</style>
