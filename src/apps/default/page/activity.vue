<template>
  <div>
    <div class="l-card-item vux-tap-active" v-for="item in list" v-link="{path: '/activity/info?id=' + item.id}">
      <div class="l-card-item-hd">
        <h1 v-text="item.title"></h1>
        <p>{{item.startTime.split(' ')[0]}} - {{item.endTime.split(' ')[0]}}</p>
      </div>
      <div class="l-card-item-bd">
        <img :src="$image.thumb(item.url, 640, 400)">
        <p v-text="item.summary"></p>
      </div>
      <div class="l-card-item-ft l-border-t">
        <i class="iconfont icon-arrow l-fr">&#xe601;</i>
        <span>查看详情</span>
      </div>
    </div>
  </div>
</template>
<script>
import server from '../server'
export default {
  route: {
    data(transition) {
      const self = this
      server.activity.getList().then((response)=>{
        if(response.body.success){
          self.list = response.body.data.rowsObject
        }
      })
    }
  },
  data() {
    return {
      list: []
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
  }
}
</script>
<style scoped lang="less">
.l-card-item {
  margin:0.4rem;
  padding: 0.266667rem;
  background-color: #fff;
  border-radius: 5px;
  border:1px solid #ccc;
}
.l-card-item-hd{
  h1 {
    font-size: 16px;  
  }
  p {
    font-size: 12px;
    color: #999;
  }
}
.l-card-item-bd{
  padding: 0.266667rem 0;
  img{
    min-height: 2.666667rem;
    background-color: #ebebeb;
  }
  p {
    font-size: 12px;
    color: #999;
    line-height: 1.4;
    margin-top: 0.266667rem;
  }
}
.l-card-item-ft{
  padding-top: 0.266667rem;
  font-size: 14px;
  .icon-arrow{
    font-size: inherit;
    margin-top: 4px;
  }
}
</style>
