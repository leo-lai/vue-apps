<template>
  <div>
    <l-article v-if="info" :title="info.question" time="2016-12-12">
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
    data({ to }) {
      const self = this
      let promise = self.$http.get('owner/visitor/getHelpDetail', {
        params: {
          helpId: to.query.id
        }
      }).then(({ body })=>{
        if(body.success){
          self.info = body.data
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
  methods: {

  }
}
</script>
<style scoped lang="less">

</style>
