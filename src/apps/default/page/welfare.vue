<template>
  <div class="l-welfare">
    <img class="l-block" src="~assets/imgs/temp-038.jpg">
    <img class="l-block" style="margin-top:-20px; max-width:90%;" src="~assets/imgs/temp-039.png">

    <div class="l-welfare-1">
      <img style="width: 3.866667rem; position: absolute; top: -1.6rem; left: 0; z-index: -1;" src="~assets/imgs/temp-040.png">
      <img style=" width: 1.333333rem;" class="l-block" src="~assets/imgs/temp-042.png">
      <p class="l-box-1" v-if="shareList.length === 0">规则：查看物品，点击“领取礼品”呼唤伙伴获得助力，好友越多得到奖品越多，让我们一起来享受礼品界的饕餮盛宴吧！</p>
      <div class="l-box-1" v-else>
        <p>人品大爆发！已经有{{shareList.length}}位小伙伴使出了洪荒之力为您助力。</p>
        <p>再加把劲，一人富不如众人富！让更多的小伙伴加入进来，把所有礼品装回家！</p>
        <ul class="l-winner-list">
          <li v-for="item in shareList" :style="{backgroundImage: 'url('+item.wxHeadPhoto+')'}"></li>
        </ul>
      </div>
    </div>
    <img class="l-block" style="max-width:85%;" src="~assets/imgs/temp-043.jpg">
    <div class="l-welfare-2">
      <div class="l-step-1">
        <img class="l-prize" src="~assets/imgs/temp-051.png">
        <img src="~assets/imgs/temp-045.jpg">
      </div>
      <div class="l-step-2" :class="{'l-not-get': shareList.length < giftList[0].integral}">
        <img class="l-prize" :src="giftList[0].imgUrl" @click="showGift(0)">
        <img src="~assets/imgs/temp-046.jpg">
      </div>
      <div class="l-step-1" :class="{'l-not-get': shareList.length < giftList[0].integral}">
        <img style="left:-0.4rem;" class="l-prize" :src="giftList[1].imgUrl" @click="showGift(1)">
        <img src="~assets/imgs/temp-047.jpg">
      </div>
      <div class="l-step-2" :class="{'l-not-get': shareList.length < giftList[0].integral}">
        <img style="right:-0.666667rem;top:-2.0rem;" class="l-prize" :src="giftList[2].imgUrl" @click="showGift(2)">
        <img src="~assets/imgs/temp-048.jpg">
      </div>
      <div class="l-step-1" :class="{'l-not-get': shareList.length < giftList[0].integral}">
        <img style="left:-0.933333rem;" class="l-prize" :src="giftList[3].imgUrl" @click="showGift(3)">
        <img src="~assets/imgs/temp-049.jpg">
      </div>
      <img class="l-block" style="width: 80%; margin-top: -0.96rem; z-index: 1; position: relative;" src="~assets/imgs/temp-050.png">
    </div>

    <div class="l-welfare-3" v-if="winnerList.length > 0">
      <img class="l-block" style="max-width:85%;" src="~assets/imgs/temp-056.jpg">
      <div class="l-name-list">
        <table>
          <tbody>
            <tr v-for="item in winnerList">
              <td>古天乐</td>
              <td>1889815****</td>
              <td>空气净化器</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
    </div>

    <div class="l-welfare-4">
      <img class="l-block" src="~assets/imgs/temp-057.jpg">
      <br>
      <img class="l-block" style="max-width:85%;" src="~assets/imgs/temp-058.jpg">
      <p class="l-box-1">邀请小伙伴助力，小伙伴越多得到的礼品也越多。最终全部通关的用户，可领取全部礼品！就是这么壕！</p>
      <img style=" width: 1.333333rem;" class="l-block" src="~assets/imgs/temp-042.png">
      <img class="l-block" style="max-width:90%;" src="~assets/imgs/temp-059.jpg">
      <img style=" width: 1.333333rem;" class="l-block" src="~assets/imgs/temp-042.png">
      <div class="l-box-1">
        <ol style="margin-left:0.533333rem;">
          <li>活动时间：2016-12-01 00:00:00至2016-12-12 23:59:59；</li>
          <li>同一用户可领取多个礼品，同一用户指：同一手机号、身份证号、收货地址等；</li>
          <li>领取奖品的用户点击“领取礼品”填写个人信息，即可等待回访电话获得奖品。</li>
        </ol>
      </div>
      <br>
      <img class="l-block" style="width:5.333333rem" src="~assets/imgs/temp-060.jpg">
      <br>
    </div>

    <dialog :show.sync="dialog.show" :scroll="dialog.scroll" @click="dialog.show=false">
      <div style="padding:0.266667rem; background-color:#fff;">
        <img height="200" :src="$image.thumb(dialog.itemInfo.imgUrl, 640, 400)">
        <div style="text-align:left;margin-top:0.266667rem;">
          <p>礼品名称：{{dialog.itemInfo.giftName}}</p>
          <p>领取条件：需要{{dialog.itemInfo.integral}}好友助力完成</p>    
        </div>
      </div>
    </dialog>
  </div>
</template>
<script>
import { utils, storage } from 'assets/lib'
import { store, actions, getters } from '../vuex'
import { Dialog } from 'vux-components'
import config from '../config'
import server from '../server'

export default {
  components: {
    Dialog
  },
  events: {
    'hook:created': function() { 
      console.log('%s components created!', this.$route.path)
    },
    'hook:ready': function() {
      console.log('%s components ready!(loadingRouteData:%s)' , this.$route.path, this.$loadingRouteData)
    }
  },
  route: {
    data() {
      const self = this
      // 获取奖品列表
      server.welfare.getGiftList().then((response)=>{
        if(response.body.success && response.body.data){
          self.giftList = response.body.data
        }
      })
      // 获取中奖名单
      server.welfare.getWinner().then((response)=>{
        if(response.body.success && response.body.data){
          self.winnerList = response.body.data.rowsObject
        }
      })      
    },
    canActivate(transition){
      const self = this
      const userinfo = storage.local.get('userinfo') || {}
      const code = transition.to.query.code
      console.log(userinfo)
      let promise = null
      if(!userinfo.wxOpenId){
        if(!code){ // 跳转授权
          let absUrl = utils.url.join(config.getHost(), config.getPath(), '/welfare')
          absUrl = server.getGrantUrl(absUrl)
          if(!/\d+.\d+.\d.\d+/.test(window.location.hostname) && utils.device.isWechat){
            utils.url.replace(absUrl)
          }else{
            transition.next()
          }
        }else{ // 获取微信信息openId
          server.getWxByCode(code).then((response)=>{
            if(response.body.success && response.body.data && response.body.data.wxOpenId){
              promise = server.welfare.getShareList(response.body.data.wxOpenId)
            }else{
              transition.next()    
            }
          }) 
        }
      }else{
        promise = server.welfare.getShareList(userinfo.wxOpenId)
      }
      if(promise){
        promise.then((response)=>{
          console.log(response)
          if(response.body.success && response.body.data){
            self.shareList = response.body.data
          }
        })
      }
    }
  },
  store,
  vuex: {
    getters
  },
  data() {
    return {
      dialog: {
        itemInfo: {},
        show: false,
        scroll: false
      },
      shareList: [],
      giftList: [{},{},{},{},{}],
      winnerList: []
    }
  },
  methods: {
    showGift(index) {
      this.dialog.show = true
      this.dialog.itemInfo = this.giftList[index]
    }
  }
}
</script>
<style scoped lang="less">
.l-winner-list{
  overflow:hidden;
  margin-left: -0.133333rem;
}
.l-winner-list li{
  list-style: none;
  float: left;
  width: 1.04rem;
  height: 1.04rem;
  margin: 0.133333rem;
  background: #ebebeb url('~assets/imgs/avatar.png') no-repeat 50% 50%;
  background-size: contain;
}

.l-welfare{
  min-height: 100%;
  background-color: #fdd400;
  overflow: hidden;
  img.l-block{
    display: block;
    margin: auto;
  }
}

.l-box-1, .l-name-list{
  margin: auto 0.533333rem;
  text-align: left;
  color: #5a4c05;
  padding: 0.533333rem;
  border:2px solid #000;
  border-radius: 3px;
  background-color: #fff;
}
.l-welfare-1{
  position: relative;
  text-align: center;
  z-index: 0;
}

.l-welfare-2{
  margin: 0.4rem 0;
  padding: 2rem 0.8rem;
  background: #fdd400 url('~assets/imgs/temp-044.jpg') no-repeat center top;
  background-size: 100% 100%;
  >[class^=l-step-]{
    position: relative;
    margin: 0.266667rem 0;
  }
  .l-prize{
    position: absolute;
    top: -1.466667rem;
    width: 3.333333rem;
  }
  .l-step-1{
    .l-prize {
      left: 0.266667rem;  
    }
  }
  .l-step-2{
    .l-prize {
      right: 0.266667rem;
    }
  }
}

.l-name-list{
  max-height: 4.0rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  table, td{
    padding: 0 0.133333rem;
    border:none;
  }
}

.l-welfare-4{
  background-color: #4083c7;
}

.l-not-get{
  opacity: 0.5;
}
</style>
