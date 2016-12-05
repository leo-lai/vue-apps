<template>
  <div>
    <group title="常见问题">
      <cell v-for="item in faqList" :title="item.title" link="/user/faq/info">
        <span slot="icon">{{$index+1}}、</span>
      </cell>
    </group>
    <group title="我的反馈">
      <cell v-for="item in feedbackList" :title="item.title" :is-link="true">
        <span slot="icon">{{$index+1}}、</span>
        <span slot="after-title" class="reddot-demo vux-reddot"></span>
      </cell>
    </group>
    <div class="l-btn-area">
      <x-button type="primary" v-link="{path:'/user/faq/add'}">我要反馈</x-button>  
    </div>
  </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux-components'

export default {
  components: {
    Group, Cell, XButton
  },
  data () {
    return {
      faqList: [
        {
          title: '安全无孔锁门忘带安装器怎么办？',
          desc: ''
        },
        {
          title: '安全无孔锁门忘带安装器怎么办？',
          desc: ''
        },
        {
          title: '安全无孔锁门忘带安装器怎么办？',
          desc: ''
        },
        {
          title: '安全无孔锁门忘带安装器怎么办？',
          desc: ''
        }
      ],
      feedbackList: [
        {
          title: '安全无孔锁门忘带安装器怎么办？',
          desc: ''
        },
        {
          title: '安全无孔锁门忘带安装器怎么办？',
          desc: ''
        }
      ]
    }
  }
}
</script>

<style>

</style>
