<template>
  <div>
    <article class="weui-article">
      <h3>安全无孔锁门忘带安装器怎么办？</h3>
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
      <section>
        <h3>1.2 节标题</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
      <div class="weui-btn-area">
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

<style>
.weui-article{
  background-color: #fff;
  padding: 0.4rem
}
</style>
