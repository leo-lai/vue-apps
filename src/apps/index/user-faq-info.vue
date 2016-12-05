<template>
  <div>
    <l-article title="安全无孔锁门忘带安装器怎么办？" time="2016-12-12">
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
      <div slot="footer" class="l-btn-area">
        <x-button mini>已解决</x-button>
        &nbsp;&nbsp;
        <x-button mini>未解决</x-button>  
      </div>
    </l-article>
  </div>
</template>

<script>
import { XButton } from 'vux-components'
import LArticle from 'src/components/l-article'

export default {
  components: {
    LArticle, XButton
  }
}
</script>

<style scoped lang="less">

</style>
