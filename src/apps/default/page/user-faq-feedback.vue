<template>
  <div class="l-flex-v" style="height:100%;">
    <div class="l-rest l-chat-list l-scrolling">
      <div v-if="loading" class="l-loading"></div>
      <div class="l-flex-h" 
        :class="{'l-chat-item-me': item.replyType == 1, 'l-chat-item-other': item.replyType == 2}" 
        v-for="item in feedBackReplyList">
        <div class="l-thumb">
          <img :src="item.replyType == 2 ? kefuAvatar : meAvatar">
        </div>
        <div class="l-rest">
          <div class="l-chat-msg" v-html="item.replyCont"></div>
        </div>
      </div>
    </div>
    <div class="l-chat-send l-flex-hc">
      <div class="l-rest">
        <input type="text" value="" placeholder="您想说点什么" v-model="formData.replyCont">
      </div>
      <div class="l-btn">
        <x-button mini @click="send">发送</x-button>  
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux-components'
import { store, getters, actions } from '../vuex'
import config from '../config'
import server from '../server'

export default {
  components: {
    XButton
  },
  route: {
    data({ to }) {
      const self = this
      server.faq.getFeedBackDetail(to.query.id).then( info => {
        self.info = info
        self.feedBackReplyList = info.feedBackReplyPage.rowsObject
        self.loading = false
      })
      // 设置已读
      server.faq.getEditFeedBack(to.query.id)
    }
  },
  store,
  vuex: {
    getters
  },
  data() {
    return {
      loading: true,
      meAvatar: this.userinfo.photo || config.defaultVal.avatar,
      kefuAvatar: require('assets/imgs/kefu.jpg') || config.defaultVal.avatar,
      feedBackReplyList: [],
      info: {},
      formData: {
        replyCont: ''
      }
    }
  },
  methods: {
    send() {
      const self = this
      self.formData.clientId = self.userinfo.id 
      self.formData.feedBackId = self.info.id 
      if(!self.formData.replyCont){
        self.$vux.toptips.show('请输入回复内容')
        return
      }

      self.feedBackReplyList.push({
        replyType: 1,
        replyCont: self.formData.replyCont,
        loading: true
      })

      self.$http.post('owner/replyFeedBack', self.formData)
      .then(({ body })=>{
        if(body.success){
          self.$vux.toast.show({
            text: '回复成功',
            onHide() {
              self.formData.replyCont = ''
              self.done(self.feedBackReplyList.length - 1)
            }
          })
        }else{
          self.$vux.toast.show(body.message || '回复失败')
        }
      })
    },
    done(index) {
      this.feedBackReplyList.loading = false
    }
  }
}
</script>
<style scoped lang="less">

</style>
