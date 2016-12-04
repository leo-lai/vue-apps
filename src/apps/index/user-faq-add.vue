<template>
  <div>
    <group title="请填写您的反馈信息">
      <x-input placeholder="简单写个标题"></x-input>
      <x-textarea :max="200" name="description" placeholder="请详细描述您的问题，客服妹子会尽快回复您的~"></x-textarea>
    </group>
    <div class="l-btn-area">
      <x-button type="primary" @click="submit">提交</x-button>  
    </div>
    <toast :show.sync="showTip" @on-hide="onHide">提交成功</toast>
  </div>
</template>

<script>
import { Group, Cell, XButton, XTextarea, XInput, Toast } from 'vux'

export default {
  components: {
    Group, Cell, XButton, XTextarea, XInput, Toast
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

</style>
