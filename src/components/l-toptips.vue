<template>
  <div>
    <div v-if="show" transition="l-show" class="l-toptips l-{{type}}">
      {{msg}}
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    show: Boolean,
    type: {
      type: String,
      default: 'error' // warn error
    }
  }
}
</script>

<style scoped lang="less">
.l-toptips {
  position: fixed;
  top: 0;
  font-size: 14px;
  text-align: center;
  color: #fff;
  z-index: 1000;
  background-color: #e64340;
  padding: 10px;
  right: 0;
  left:0;
}
.l-error{
  background-color: #e64340;
}
.l-warn{
  background-color: #e96900; 
}

/* 必需 */
.l-show-transition {
  transition: all 0.3s ease;
  transform: translateY(0);
  // opacity: 1;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.l-show-enter, .l-show-leave {
  transform: translateY(-100%);
  // opacity: 0;
}
</style>
