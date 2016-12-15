<template>
  <article class="l-article">
    <div class="l-article-hd l-border-b">
      <h1 v-if="title" v-text="title"></h1>
      <p v-text="time"></p>  
    </div>
    <div class="l-article-bd">
      <slot></slot>
    </div>
    <div class="l-article-ft">
      <slot name="footer"></slot>
    </div>
  </article>
</template>

<script>
// import { XButton, Divider } from 'vux-components'

export default {
  props: {
    title: String,
    time: String
  },
  components: {
    // XButton, Divider
  }
}
</script>

<style scoped lang="less">
.l-article {
  background-color: #fff;
  padding: 0.4rem;
  font-size: 15px;
  .l-article-hd {
    margin-bottom: 0.4rem;
    overflow: hidden;
    h1 {
      font-size: 18px;
      font-weight: 400;
    }
    p {
      font-size: 12px;
      color: #999;
    }
  }
  * {
    max-width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
  }
  section {
    margin-bottom: 1.5em;
  }
  img {
    max-width: 100%; 
  }
  h2 {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: .34em;
  }
  h3 {
    font-weight: 400;
    font-size: 15px;
    margin-bottom: .34em;
  }
  p {
    margin: 0 0 .6em;
  }
}
</style>
