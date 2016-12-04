<template>
  <div>
    <article class="weui-article">
      <h1>安全无孔锁门忘带安装器怎么办？</h1>
      <hr class="vux-1px-b" />
      <section>
        <h3>1.1 节标题</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </section>
      <br>
      <section>
        <h3>1.2 节标题</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
      <div class="l-btn-area">
        <x-button mini>已解决</x-button>
        &nbsp;&nbsp;
        <x-button mini>未解决</x-button>  
      </div>
    </article>
  </div>
</template>

<script>
import { Group, Cell, XButton, Divider } from 'vux'

export default {
  components: {
    Group, Cell, XButton, Divider
  },
  data () {
    return {
      showTip: false
    }
  },
  methods: {
    submit() {
      this.showTip = true;
    },
    onHide() {
      window.history.back();
    }
  }
}
</script>

<style lang="less">
.weui-article {
  background-color: #fff;
  padding: 20px 15px;
  font-size: 15px;
  section {
    margin-bottom: 1.5em;
  }
  h1 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: .9em;
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
  * {
    max-width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
  }
  p {
    margin: 0 0 .8em;
  }
}
</style>
