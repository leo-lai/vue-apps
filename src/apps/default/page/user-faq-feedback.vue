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
import LArticle from 'components/l-article'
import { store, getters, actions } from '../vuex'
import config from '../config'


export default {
  components: {
    LArticle, XButton
  },
  route: {
    data(transition) {
      const self = this
      let promise = self.$http.get('owner/getMyFeedBackDetail', {
        params: {
          feedBackId: transition.to.query.id
        }
      }).then(({ body })=>{
        if(body.success){
          self.info = body.data
          self.feedBackReplyList = body.data.feedBackReplyPage.rowsObject
        }
      })

      self.loading = true
      Promise.all([promise]).finally(()=>{
        self.loading = false
      })
    }
  },
  store,
  vuex: {
    getters
  },
  data() {
    return {
      loading: true,
      meAvatar: this.userinfo.photo || this.userinfo.wxHeadPhoto || config.defaultVal.avatar,
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
