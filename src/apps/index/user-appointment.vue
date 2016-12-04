<template>
  <div>
    <sticky>
      <search :auto-fixed="false"></search>
    </sticky>
    <div class="l-flex-hc l-appointment-item" v-for="item in 10">
      <div class="l-rest">
        <p><i class="iconfont">&#xe6d0;</i>&nbsp;&nbsp;<strong>赖国聪</strong>&nbsp;&nbsp;&nbsp;&nbsp;15013256333</p>
        <p>2016-11-11&nbsp;&nbsp;&nbsp;&nbsp;<b>正在进行中</b></p>
        <p>广州市天河区科韵路12-1号方圆E时光</p>
      </div>
      <div>
        <i class="iconfont icon-arrow">&#xe601;</i>
      </div>
    </div>
  </div>
</template>
<script>
import { Search, Sticky } from 'vux'

export default {
  components: {
    Search, Sticky
  },
  data() {
    return {
      list: [
        
      ]
    }
  },
  methods: {
  }
}
</script>


<style scoped lang="less">
.l-appointment-item{
  color: #999;
  padding: 0.4rem;
  margin:0.4rem 0;
  background-color: #fff;
  font-size: 14px;
  strong {
    font-size: 16px;
    color: #333;
  }
  b{
    font-size: 16px;
    color: #0BB20C;
  }
}
.l-appointment-item .icon-arrow{
  margin-right: -0.266667rem
}
</style>