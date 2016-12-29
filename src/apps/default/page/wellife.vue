<template>
  <div class="l-wellife" >
    <div class="swiper-container swiper-container-v">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="~assets/imgs/temp-091.png">
          <img style="margin-top: -6.5rem;" src="~assets/imgs/temp-090.png">
          <div class="l-abs l-center" style="top:2.75rem;">
            <img style="width: 3.75rem;" src="~assets/imgs/temp-083.png">
            <p style="color:#fff;margin-top: 0.75rem;">艾臣云家——智慧生活</p>
          </div>
          <div class="l-abs" style="top: 10.5rem; left: 0.75rem;">
            <img style="width:6.5rem;" src="~assets/imgs/temp-084.png">
          </div>
          <div class="l-abs" style="top: 15.0rem; width: 10.0rem; left: 8.0rem;">
            <p>作为一款智能家居APP软件，艾臣云家APP是一个全方位关注安全、健康、舒适和便捷的智能系统，帮助人们拥有更好的生活方式。</p>
          </div>
        </div>
        <div class="swiper-slide">
          <div  style="margin: 0 0.75rem;">
            <div class="swiper-container swiper-container-h">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img src="~assets/imgs/temp-105.jpg">
                </div>
                <div class="swiper-slide">
                  <img src="~assets/imgs/temp-106.jpg">
                </div>
                <div class="swiper-slide">
                  <img src="~assets/imgs/temp-107.jpg">
                </div>
                <div class="swiper-slide">
                  <img src="~assets/imgs/temp-108.jpg">
                </div>
                <div class="swiper-slide">
                  <img src="~assets/imgs/temp-109.jpg">
                </div>
                <div class="swiper-slide">
                  <img src="~assets/imgs/temp-110.jpg">
                </div>
                <div class="swiper-slide">
                  <img src="~assets/imgs/temp-111.jpg">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'animate.css'
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper'
import swiperAnimate from 'assets/swiper.animate'

export default {
  route: {
    data() {
      this.$nextTick(()=>{
        let swiperV = new Swiper('.swiper-container-v', {
          direction: 'vertical',
          slidesPerView: 'auto',
          spaceBetween: 0,
          autoHeight: true,
          freeMode: true
        })

        let swiperH = new Swiper('.swiper-container-h', {
          slidesPerView: 'auto',
          spaceBetween: 10        
        })

      })
    }
  }
}
</script>
<style scoped lang="less">
.l-wellife{
  height: 100%;
}
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide{
  color: #4083c7;
  background-color: #fff;
  position: relative;
  .l-abs{
    position: absolute;
    left:0;right:0;
  }
}

.swiper-container-h{
  .swiper-slide{
    height: 13.5rem;
    width: 7.5rem;
  }
  img {
    max-width: 100%;
    height: 100%;
  }
}


</style>
