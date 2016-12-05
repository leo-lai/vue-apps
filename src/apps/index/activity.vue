<template>
  <div>
    <div class="l-card-item vux-tap-active" v-link="{'path': '/activity/info'}" v-for="item in 5">
      <div class="l-card-item-hd">
        <h1>标题标题标题标题标</h1>
        <p>11月28日</p>
      </div>
      <div class="l-card-item-bd">
        <img src="~assets/imgs/temp-001.jpg">
        <p>内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介</p>
      </div>
      <div class="vux-1px-t l-card-item-ft">
        <i class="iconfont icon-arrow l-fr">&#xe601;</i>
        <span>查看详情</span>
      </div>
    </div>
  </div>
</template>
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
<script>
import { Card } from 'vux-components'
let tempImg = require('assets/imgs/temp-001.jpg');
export default {
  components: {
    Card
  },
  data() {
    return {
      
    }
  }
}
</script>

