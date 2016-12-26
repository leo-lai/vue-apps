<template>
  <div style="height:100%;">
    <scroller v-ref:scroller lock-x scrollbar-y use-pullup use-pulldown 
      @pullup:loading="loadMore" @pulldown:loading="refresh" 
      :pulldown-status.sync="scroller.pulldownStatus"
      :pullup-status.sync="scroller.pullupStatus">
      <news-list :list="news.list" :loading="news.loading"></news-list>

      <!--pulldown slot-->
      <div slot="pulldown" class="l-pulldown">
        <span v-show="scroller.pulldownStatus === 'down'">下拉刷新</span>
        <span v-show="scroller.pulldownStatus === 'up'">释放刷新</span>
        <span v-show="scroller.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="l-pullup">
        <span v-show="scroller.pullupStatus === 'down'">释放加载更多</span>
        <span v-show="scroller.pullupStatus === 'up'">{{scroller.pullupText}}</span>
        <span v-show="scroller.pullupStatus === 'loading'"><spinner type="ios-small"></spinner>正在加载</span>
      </div>
    </scroller>
  </div>
</template>
<script>
import { Scroller, Spinner } from 'vux-components'
import NewsList from '../components/news-list'
import server from '../server'

export default {
  components: {
    Scroller, Spinner, NewsList
  },
  route: {
    data() {
      this.newsList = server.news.getList(()=>{
        this.news.loading = !this.newsList.isAjax
        this.news.list = this.newsList.alldata  
      })
    }
  },
  methods: {
    loadMore (uuid) {
      this.newsList.next()
      if(this.newsList.isNull){
        this.scroller.pullupText = '没有更多了'
      }
      this.$nextTick(() => {
        this.$broadcast('pullup:reset', uuid)
      })
    },
    refresh (uuid) {
      this.newsList.init()
      this.$nextTick(() => {
        this.scroller.pullupText = '上拉加载更多'
        this.$broadcast('pulldown:reset', uuid)
      })
    }
  },
  data() {
    return {
      scroller: {
        pulldownStatus: 'default',
        pullupStatus: 'default',
        pullupText: '上拉加载更多'
      },
      news: {
        loading: true,
        list: []
      }
    }
  }
}
</script>

