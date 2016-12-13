<template>
  <div class="l-body">
    <div class="l-swiper">
      <div class="l-swiper-item l-flex-vhc">
        <div class="l-swiper-content">
          <div class="l-center">
            <h2>艾臣</h2>
            <p>Aylson</p>  
          </div>
          <div class="l-fsize-s">
            <p>Aylson——“艾臣”，是Elairsar(Australia)PTY LTD公司旗下一个专注于安全门窗系统的品牌。Elairsar(Australia)PTY LTD公司坐落在全球最宜居城市——澳大利亚维多利亚洲墨尔本市，是全球最大的安全门窗系统供应商及制造商之一。专业研发、设计、生产安全门窗系统、高档贵族阳光房、建筑幕墙、无锁孔安全门、安全静音木门等高技术产品，籍此提高人们的生活品质，是所有高档住宅，大中型别墅、商业办公楼安全门窗的首选配套产品。</p>
            <p>目前，艾臣在全球共设立两个研发中心，销售中心和两个大型生产基地，分别位于澳大利亚墨尔本市和中国广东佛山市。共有专业设计人员六十多名。分别有阳光房、门窗系统、传动机构、电子研发、手机终端应用五大研发部门。集研发、生产、销售、安装调试以及售后服务于一体，是一个高起点、研发能力强的专业化门窗生产制造企业、公司设计内容已荣获过百项国家授权专利。艾臣生产基地，经过不断升级改造，生产线全面向自动化方向发展，目前已具备了年生产安全门窗九万平方米的生产能力。</p>
            <p>我们公司的使命就是要让每一个家庭更安全、更健康、更舒适。一个专为豪宅而生的安全系列产品。强大的研发能力，拥有创新思维的实力团队，推出的产品都是从客户角度出发的创新性产品。</p> 
          </div>
        </div>
      </div>
      <div class="l-swiper-item l-flex-vhc">
        <div class="l-center">
          <h2>公司愿景</h2>
          <p>Company Vision</p>
          <br>
          <p>技术创新  筑生态家居</p>
          <p>卓越品质  创行业标杆</p>
        </div>
        <img style="margin-top: -31%;z-index: -1;" src="~assets/imgs/temp-019.jpg">
      </div>
      <div class="l-swiper-item l-flex-vhc">
        <div class="l-center">
          <h2>公司使命</h2>
          <p>Mission Statement</p>
          <br>
          <p>引领人居健康生活模式</p>
        </div>
        <img style="margin-top: -31%;z-index: -1;" src="~assets/imgs/temp-020.jpg">
      </div>
      <div class="l-swiper-item l-flex-vhc">
        <div class="l-center">
          <h2>核心价值观</h2>
          <p>Core Values</p>
          <br>
          <p>以人为本  通力合作  个人价值最大化</p>
        </div>
        <img style="margin-top: -45%;z-index: -1;" src="~assets/imgs/temp-021.jpg">
      </div>
      <div class="l-swiper-item l-flex-vhc">
        <div class="l-center">
          <h2>公司经营理念</h2>
          <p>Operation Philosophy</p>
          <br>
          <p>服务客户  不断创新  合作共赢</p>
        </div>
        <img style="margin-top: -7%;z-index: -1;" src="~assets/imgs/temp-022.jpg">
      </div>
      <div class="l-swiper-item l-flex-vhc">
        <div class="l-center">
          <h2>品牌定位</h2>
          <p>Brand Positioning</p>
          <br>
          <p>安全  健康  便捷</p>
        </div>
        <img style="margin-top: -41%;z-index: -1;" src="~assets/imgs/temp-023.jpg">
      </div>
      <div class="l-swiper-item l-flex-vhc">
        <div class="l-center">
          <h2>企业荣誉</h2>
          <p>Enterprise Honor</p>
          <br>
          <p>认可  赞许  荣耀</p>
        </div>
        <img style="margin-top: -43%;z-index: -1;" src="~assets/imgs/temp-024.jpg">
      </div>
      <div class="l-swiper-item l-flex-vhc">
        <div class="l-center">
          <h2>品牌优势</h2>
          <p>Brand Advantage</p>
          <br>
          <p>全新消费观  专业设计人才</p>
          <p>先进管理模式  优秀团队</p>
        </div>
        <img style="margin-top: -60%;z-index: -1;" src="~assets/imgs/temp-025.jpg">
      </div>
      <div class="l-swiper-item l-flex-vhc">
        <div class="l-center">
          <h2>艾臣云家APP</h2>
          <p>Aylson Cloud Home APP</p>
          <br>
          <p>作为一款智能家居APP软件，艾臣云家APP是<br>一个全方位关注安全、健康、舒适和便捷的<br>智能系统，帮助人们拥有更好的生活方式。</p>
        </div>
        <img style="margin-top: -55%;z-index: -1;" src="~assets/imgs/temp-026.jpg">
      </div>
    </div>
  </div>
</template>
<script>
import config from '../config'
import Swiper from 'iswiper'

export default {
  components: {
    
  },
  events: {
    'hook:ready': () => {
      let swiper = new Swiper({
        container: '.l-swiper',
        item: '.l-swiper-item',
        direction: 'vertical',
        activeClass: 'l-swiper-active'
      })
    }
  },
  data() {
    return {
      
    }
  }
}
</script>
<style scoped lang="less">
.l-center{
  text-align: center;
}
.l-body{
  height: 100%;
  background-color: #336699;
  overflow: hidden;
}
.l-swiper{
  background-color: #336699;
  height: 100%;
  overflow: hidden;
}
.l-swiper-item{
  position: relative;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.l-swiper-item:after{
  color: #fff;
  font: normal 22px/1 'iconfont';
  content: '\e66c';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.l-swiper-item:last-child:after{
  visibility: hidden;
}
.l-swiper-content{
  padding: 0 0.506667rem;
}

.l-swiper-item:nth-child(1){
  p{
    margin-bottom: 0.4rem;
    line-height: 1.4;
  }
  .l-fsize-s p{
    text-indent: 2em;
  }
}
.l-swiper-item:nth-child(2){
}
.l-swiper-item:nth-child(3){
}

</style>
