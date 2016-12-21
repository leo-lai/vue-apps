<template>
  <div>
    <l-article v-if="info" :title="info.title" :time="info.createTime">
      <div v-html="info.content"></div>
    </l-article>
  </div>
</template>

<script>
import server from '../server'
import LArticle from 'components/l-article'

export default {
  components: {
    LArticle
  },
  route: {
    data({ to }) {
      const self = this
      let id = to.query.id
      let promise = server.news.getInfo(id).then(({ body })=>{
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
  data() {
    return {
      info: null
    }
  }
}
</script>

