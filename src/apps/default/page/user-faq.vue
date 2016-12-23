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
        <span v-if="item.state === 2" class="vux-reddot" slot="after-title">&nbsp;</span>
      </cell>
    </group>
    <div v-if="loading2" class="l-loading"><br><br><br></div>
    <div class="l-btn-area">
      <x-button type="primary" v-link="{path:'/user/faq/add'}">我要反馈</x-button>  
    </div>
  </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux-components'
import { store, getters } from '../vuex'
import server from '../server'

export default {
  components: {
    Group, Cell, XButton
  },
  route: {
    data() {
      const self = this
      let promise1 = server.faq.getHelpList().then( list => {
        self.faqList = list
        self.loading1 = false
      })

      let promise2 = server.faq.getFeedBackList(self.userinfo.id).then( list => {
        self.feedbackList = list
        self.loading2 = false
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
