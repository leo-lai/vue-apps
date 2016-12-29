<template>
  <div>
    <div class="l-appointment-item">
      <p>预约单号：<span v-text="info.billCode"></span></p>
      <p>预约进度：<span style="color:#4083c7;" v-text="getStatus(info.state)"></span></p>
      <p>预约时间：<span v-text="info.appointDate"></span></p>
      <p v-if="info.designer">专属客服：<span v-text="info.designer"></span><span>(<a href="tel:{{info.designerPhone}}" v-text="info.designerPhone"></a>)</span></p>
      <p v-else>专属客服：<span>正在安排</span></p>
      <p>姓<ins></ins>名：<span v-text="info.name"></span></p>
      <p>手机号码：<span v-text="info.mobilePhone"></span></p>
      <p>楼盘地址：<span v-text="info.province+info.city+info.area+(info.address||'')"></span></p>
    </div>
    <divider>大样图</divider>
    <div style="background-color:#fff;margin: 0.133333rem 0 0.533333rem;">
      <swiper :aspect-ratio="300/800" v-if="designImgs.length > 0">
        <swiper-item v-for="(index, item) in designImgs"  @click="$refs.previewer.show(index)">
          <img class="previewer-img" width="100%" :src="item.src">
        </swiper-item>
      </swiper>
      <div v-else class="vux-center" style="height: 8rem;color:#999; font-size:14px;">
        大样图正在设计中
      </div>
    </div>
    
    <divider>产品信息</divider>
    <div class="l-appointment-item">
      <table class="l-fsize-sm">
        <thead>
          <tr class="l-text-wrap">
            <th>产品名称</th>
            <th>数量(套)</th>
            <th>面积(m²)</th>
            <th>单价(元)</th>
            <th>小计(元)</th>
          </tr>
        </thead>
        <tr class="l-table-line"><td colspan="5"></td></tr>
        <tbody v-for="item in products">
          <tr class="l-table-th">
            <td colspan="4" v-text="item.typeName"></td>
            <td v-text="item.orderAmount | currency '' 2"></td>
          </tr>
          <tr v-for="product in item.list">
            <td v-text="product.productName"></td>
            <td v-text="product.pruductNum"></td>
            <td v-text="product.areas"></td>
            <td v-text="product.showUnitPrice"></td>
            <td v-text="product.showAmount | currency '' 2"></td>
          </tr>
        </tbody>
        <tfoot>
          <td colspan="5" class="l-tr">
            <div style="color:#333;">合计：{{amount | currency '' 2}}</div>
            <div v-if="info._state === 8" style="color:#4083c7;text-decoration: underline;" v-link="'/user/coupon/select'">
              优惠券：-{{ ( couponValue || 0) | currency '' 2 }}
            </div>
            <div v-if="info._state === 10">优惠券：-{{amountCoupon | currency '' 2}}</div>
            <div style="color:#000;">实付金额：{{ (amount - couponValue - amountCoupon) | currency '' 2}}</div>
            <!-- <div style="color:red;">预收定金：{{amount/2 | currency ''}}</div> -->
          </td>
        </tfoot>
      </table>
    </div>
    <div class="l-btn-area" v-if="info.state !== 10">
      <x-button type="primary" @click="confirmInfo">确定报价信息</x-button>
      <!-- <x-button @click="resetDesign">不满意，重新报价</x-button> -->
    </div>

    <dialog :show.sync="dialog.show" :scroll="dialog.scroll" @click="dialog.show=false">
      <div class="l-dissatisfied-reason" @click.stop>
        <x-textarea :max="500" placeholder="请详细描述您不满意的原因" :value.sync="formData.remark"></x-textarea>
        <x-button class="l-btn-square" @click="submit(false)">提交</x-button>
      </div>
    </dialog>
    <previewer :list="designImgs" v-ref:previewer :options="options"></previewer>
  </div>
</template>
<script>
import { Divider, Swiper, SwiperItem, Previewer, XTextarea, XButton, Dialog, Group, PopupPicker } from 'vux-components'
import { store, getters, actions } from '../vuex'
import server from '../server'
export default {
  components: {
    Divider, Swiper, SwiperItem, Previewer, XTextarea, XButton, Dialog, Group
  },
  route: {
    data({ to }) {
      const self = this
      server.appointment.getInfo(to.query.id).then( info => {
        info._state = info.state > 20 ? Number(String(info.state).substr(0,1)) : info.state
        self.info = info
        self.$vux.loading.hide()
      })
      self.$vux.loading.show()
    }
  },
  store,
  vuex: {
    getters, actions
  },
  data() {
    return {
      info: {},
      formData: {
        appointId: '',
        isSatisfy: false,
        remark: ''
      },
      dialog: {
        show: false,
        scroll: false
      },
      amountCoupon: 0,
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
      if(this.info && this.info.designVoList){
        for (let i = 0, item = null; i < this.info.designVoList.length; i++) {
          item = this.info.designVoList[i]
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

      return ret
    },
    products() {
      let ret = []
      let cateObj = {}
      let product = {}
      let amount = 0
      let amountCoupon = 0

      let typeName = ['安全门', '安全窗', '贵族阳光房']
      let categoryName = ['钢结构', '主立柱', '靠墙立柱', '次立柱', '三角面积', '屋顶', '水槽', '水槽堵塞网', '清风双悬推拉门', '95手摇开窗-固定部分', '95手摇开窗-扇部分']
      if(this.info && this.info.designVoList){
        for (let i = 0, item = null, orderAmount = 0; i < this.info.designVoList.length; i++) {
          item = this.info.designVoList[i]
          orderAmount = this.info.byAgentUserId ? item.salesAmount : item.orderAmount
          amount += orderAmount
          amountCoupon += item.couponValue
          if(item.quotationVo){
            cateObj = {
              designType: item.designType,
              typeName: typeName[item.designType-1],
              orderAmount: orderAmount,
              list: []
            }

            if(item.quotationVo.designType === 3){
              item.quotationVo.detailSRVoList && (cateObj.list = item.quotationVo.detailSRVoList)
            }else{
              item.quotationVo.detailDWVoList && (cateObj.list = item.quotationVo.detailDWVoList)
            }
            
            cateObj.list.forEach((item)=>{
              if(cateObj.designType === 3){
                item.productName = categoryName[item.structure - 1]
              }
              item.showAmount = this.info.byAgentUserId ? item.salesUnitAmount : item.amount
              item.showUnitPrice = this.info.byAgentUserId ? item.salesUnitPrice : item.unitPrice
            })

            ret.push(cateObj)
          }
        }
      }

      this.amount = amount
      this.amountCoupon = amountCoupon
      return ret
    },
    couponValue() {
      return this.coupon.couponValue || 0
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
          return '客户确认中'
        case 9:
          return '已确认报价'
        case 91:
          return '待重新报价'
        case 10:
          return '已生成订单'
      }
    },
    resetDesign() {
      const self = this
      if(self.info._state < 8 || self.info._state == 91){
        self.$vux.toast.show({
          text: '无法操作，大样图和报价未确定。',
          type: 'warn',
          width: '65%'
        })
        return
      }
      self.dialog.show = true
    },
    confirmInfo() {
      const self = this
      if(self.info._state < 8 || self.info._state == 9){
        self.$vux.toast.show({
          text: '无法操作，大样图和报价未确定。',
          type: 'warn',
          width: '65%'
        })
        return
      }
      self.$vux.confirm.show({
        title: '是否确定报价信息？',
        onConfirm() {
          self.submit(true)
        }
      })
    },
    submit(sure) {
      const self = this
      self.formData.appointId = self.info.id
      self.formData.isSatisfy = !!sure

      if(!sure){
        if(!self.formData.remark){
          self.$vux.toptips.show('请详细描述您不满意的原因')
          return  
        }else{
          self.dialog.show = false  
        }
      }

      if(sure && self.coupon.couponFkid){
        self.formData.couponId = self.coupon.couponFkid
        self.formData.couponUserId = self.coupon.id
      }

      self.$vux.loading.show('提交中')
      self.$http.post('owner/visitor/confirmAllQuotation', self.formData)
        .then(({ body }) => {
          self.$vux.loading.hide()
          if(body.success){
            self.acSelectCoupon()
            if(!sure){
              self.$vux.toast.show({
                text: '感谢您的反馈，我们工作人员将尽快与你联系沟通。',
                width: '65%',
                onHide(){
                  self.$router.go('/user/appointment')
                }
              })
            }else{
              self.$vux.toast.show({
                text: '确认成功，请等待工作人员联系',
                width: '65%',
                onHide(){
                  self.$router.replace('/user/order')
                }
              })
            }
            
          }else{
            self.$vux.toptips.show(body.message || '提交失败')
          }
        }, (error) => {
          self.$vux.loading.hide()
          self.$vux.toptips.show('服务器繁忙，请稍后重试！')
        })
    }
  }
}
</script>
<style scoped lang="less">
.l-appointment-item{
  padding: 0.75rem;
  background-color: #fff;
  margin: 0 0 0.75rem 0;
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