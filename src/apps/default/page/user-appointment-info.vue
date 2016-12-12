<template>
  <div>
    <div class="l-appointment-item">
      <p>预约单号：<span v-text="info.billCode"></span></p>
      <p>预约进度：<span style="color:#007aff;" v-text="getStatus(info.state)"></span></p>
      <p>预约时间：<span v-text="info.appointDate"></span></p>
      <p>专属客服：<span v-text="info.designer"></span><span>(<a href="tel:{{info.designerPhone}}" v-text="info.designerPhone"></a>)</span></p>
      <p>姓<ins></ins>名：<span v-text="info.name"></span></p>
      <p>手机号码：<span v-text="info.mobilePhone"></span></p>
      <p>楼盘地址：<span v-text="info.province+info.city+info.area+info.address"></span></p>
    </div>
    <divider>大样图</divider>
    <div style="background-color:#fff;margin: 0.133333rem 0 0.533333rem;">
      <swiper :aspect-ratio="300/800">
        <swiper-item v-for="(index, item) in designImgs"  @click="$refs.previewer.show(index)">
          <img class="previewer-img" width="100%" :src="item.src">
        </swiper-item>
      </swiper>
    </div>
    
    <divider>产品信息</divider>
    <div class="l-appointment-item">
      <table class="l-fsize-s">
        <thead>
          <tr>
            <th>产品名称</th>
            <th>数量(套)</th>
            <th>面积(m²)</th>
            <th>单价(元)</th>
            <th>小计(元)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products">
            <td v-text="item.productName"></td>
            <td v-text="item.pruductNum"></td>
            <td v-text="item.areas"></td>
            <td v-text="item.unitPrice"></td>
            <td v-text="item.amount"></td>
          </tr>
        </tbody>
        <tfoot>
          <td colspan="5" class="l-tr">
            <div style="color:#333;">合计：{{amount | currency ''}}</div>
            <div style="color:#999;">优惠券：0.00</div>
            <div style="color:#000;">实付金额：{{amount | currency ''}}</div>
            <div style="color:red;">预收定金：{{amount/2 | currency ''}}</div>
          </td>
        </tfoot>
      </table>
    </div>
    <div class="l-btn-area">
      <x-button type="primary" @click="submit">确认报价信息，去下单</x-button>
      <x-button @click="dialog.show=true">不满意，重新设计报价</x-button>
    </div>

    <dialog :show.sync="dialog.show" :scroll="dialog.scroll" @click="dialog.show=false">
      <div class="l-dissatisfied-reason" @click.stop>
        <x-textarea :max="500" placeholder="请详细描述您不满意的原因"></x-textarea>
        <x-button class="l-btn-square">提交</x-button>
      </div>
    </dialog>
    <previewer :list="designImgs" v-ref:previewer :options="options"></previewer>
  </div>
</template>
<script>
import { store, getters, actions } from '../vuex'
import { Search, Sticky, Divider, Swiper, SwiperItem, Previewer, XTextarea, XButton, Dialog, Group } from 'vux-components'
export default {
  components: {
    Search, Sticky, Divider, Swiper, SwiperItem, Previewer, XTextarea, XButton, Dialog, Group
  },
  route: {
    data(transition) {
      const self = this
      const promise = self.$http.get('owner/visitor/getAppointDetail', {
        params: {
          appointId: transition.to.query.id
        }
      })
      promise.then((response)=>{
        if(response.body.success){
          self.info = response.body.data
        }
      })
    }
  },
  store,
  vuex: {
    getters
  },
  data() {
    return {
      info: {},
      dialog: {
        show: false,
        scroll: false
      },
      amount: 0,
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  computed: {
    designImgs() {
      let ret = []
      let amount = 0
      if(this.info && this.info.designVoList){
        for (let i = 0, item = null; i < this.info.designVoList.length; i++) {
          item = this.info.designVoList[i]
          item.orderAmount && (amount += item.orderAmount)
          if(item.drawUrl){
            ret.push({
              url: 'javascript:;',
              src: this.$image.thumb(item.drawUrl, 600, 400),
              w: 600,
              h: 400,
              title: item.remark
            })
          }
        }
      }
      this.amount = amount
      return ret
    },
    products() {
      let ret = []
      let amount = 0
      if(this.info && this.info.designVoList){
        for (let i = 0, item = null; i < this.info.designVoList.length; i++) {
          item = this.info.designVoList[i]
          if(item.quotationVo){
            if(item.quotationVo.designType === 3){
              item.quotationVo.detailSRVoList && ret.push.apply(ret, item.quotationVo.detailSRVoList)
            }else{
              item.quotationVo.detailDWVoList && ret.push.apply(ret, item.quotationVo.detailDWVoList)
            }
          }
        }
        console.log(ret)
      }
      return ret
    }
  },
  methods: {
    getStatus(code) { 
      switch(code){
        case 1:
        case 2:
          return '正在安排设计师'
        case 3:
        case 4:
        case 41:
        case 5:
        case 51:
          return '正在设计大样图'
        case 6:
        case 61:
        case 7:
        case 71:
          return '正在报价中'
        case 8:
        case 9:
        case 91:
          return '客户确认中'
      }
    },
    submit() {
      const self = this
      self.$vux.confirm.show({
        title: '确定下单？',
        content: '<p>下单预收50%的定金，交货日期将是收款后30个工作日，请及时付款。</p>',
        onConfirm() {

        },
        onCancel() {

        }
      })
    }
  }
}
</script>


<style scoped lang="less">
.l-appointment-item{
  padding: 0.4rem;
  background-color: #fff;
  margin: 0 0 0.533333rem 0;
  font-size: 14px;
  p{
    margin:5px 0;
  }
  span{
    color: #999;
  }
}
.l-btn-square:before{
  content: " ";
  width: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
}

.l-dissatisfied-reason{
  background-color: #fff;
  position: relative;
  .iconfont{
    position: absolute;
    top:0;
    right:0;
  }
}

</style>