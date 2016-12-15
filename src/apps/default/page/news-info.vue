<template>
  <div>
    <l-article :title="info.title" :time="info.createTime">
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
      server.news.getInfo(id).then((response)=>{
        if(response.body.success){
          self.info = response.body.data
        }
      })
    }
  },
  data() {
    return {
      info: {}
    }
  }
}
</script>

