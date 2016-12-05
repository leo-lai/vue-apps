<template>
  <div>
    <group class="l-group l-user-info">
      <cell title="头像" :is-link="true">
        <img class="avatar" slot="value" width="50" height="50" :src="images.avatar">
      </cell>
      <cell title="手机号码" value="18602029524" :is-link="true"></cell>
      <cell title="真实姓名" value="赖国聪" :is-link="true"></cell>
      <cell title="电子邮箱" value="657448678@qq.com" :is-link="true"></cell>
      <cell title="QQ号码" value="657448678" :is-link="true"></cell>
    </group>
    <group class="l-group l-user-info">
      <cell title="单位名称" value="艾臣科技有限公司" :is-link="true"></cell>
      <address :title="address.title" :value.sync="address.value" raw-value :list="address.data" placeholder="请选择地址"></address>
      <cell title="详细地址" value="科韵路方圆E时光2703" :is-link="true"></cell>
      <!-- <x-textarea placeholder="详细地址" value="天河区科韵路方圆E时光2703"></x-textarea> -->
    </group>
  </div>
</template>
<script>
import { Group, Cell, Address, AddressChinaData, XButton} from 'vux-components'

let images = {
  'avatar': require('assets/imgs/kenan2.jpg')
}
export default {
  components: {
    Group, Cell, Address, AddressChinaData, XButton
  },
  route: {
    activate: function(transition) {
      console.info('hook-example activated!')
      transition.next()
    }
  },
  data() {
    return {
      images: images,
      address: {
        data: AddressChinaData,
        title: '所在地区',
        value: ['广东省', '广州市', '天河区']
      }
    }
  },
  methods: {

  }
}
</script>
<style>
.l-user-info .weui_cell{
  padding-top:11px;
  padding-bottom:11px;
 }
.l-user-info .avatar{
  vertical-align: middle;
  border-radius: 2px;
  border:1px solid #ebebeb;
}

</style>
