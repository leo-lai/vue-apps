<template>
  <div>
    <l-article :title="info.question" time="2016-12-12">
      <div v-html="info.answer"></div>
      <!-- <div slot="footer" class="l-btn-area">
        <x-button mini>已解决</x-button>
        &nbsp;&nbsp;
        <x-button mini>未解决</x-button>  
      </div> -->
    </l-article>
  </div>
</template>

<script>
import { store, getters, actions } from '../vuex'
import LArticle from 'components/l-article'

export default {
  components: {
    LArticle
  },
  route: {
    data(transition) {
      const self = this
      const promise = self.$http.get('owner/getMyFeedBackDetail', {
        params: {
          feedBackId: transition.to.query.id
        }
      })
      promise.then((response)=>{
        if(response.body.success){
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

  }
}
</script>
<style scoped lang="less">

</style>
