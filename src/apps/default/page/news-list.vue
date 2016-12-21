<template>
  <div>
    <div class="l-news-list l-margin-b">
      <div class="l-flex-hc l-news-item l-border-t" v-for="item in news.data" v-link="{path:'/news/list/info?id=' + item.id}">
        <div class="l-thumb">
          <img :src="$image.thumb(item.thumb, 60, 60)">
        </div>
        <div class="l-rest">
          <h4 class="l-text-wrap" v-text="item.title"></h4>
          <p class="l-text-clamp2" v-text="item.summary"></p>
        </div>
        <div>
          <i class="iconfont icon-arrow">&#xe601;</i>
        </div>
      </div>
      <div v-if="news.loading" class="l-loading"></div>
    </div>
  </div>
</template>
<script>
import server from '../server'

export default {
  created() {
    const self = this
    let promise = server.news.getList().then(({ body })=>{
      if(body.success){
        self.news.data = body.data.rowsObject
      }
    })

    self.news.loading = true
    Promise.all([promise]).finally(()=>{
      self.news.loading = false
    })
  },
  data() {
    return {
      news: {
        loading: true,
        data: []
      }
    }
  }
}
</script>
<style scoped lang="less">
.l-news-item{
  background-color: #fff;
  padding: 0.266667rem;
  .l-thumb{
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.266667rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .l-rest{
    h4{
      font-size: 17px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    p{
      color: #999;
      font-size: 12px;
    }
  }
}
.l-news-item:active{
  background-color: #ebebeb;
}
</style>
