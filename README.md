https://github.com/bluefox1688/vue-cli-multi-page

# 安装
npm install

# 调试环境 serve with hot reload at http://localhost:8083
npm run dev

# 生产环境 build for production with minification
npm run build

#目录结构
webpack
  |---build/            自动化构建脚本
  |---dist/             默认发布根目录 
    index.html          访问地址http://localhost
    |---static/         资源目录
      |---common.js
      |---common.css
      |---index.js
      |---index.css
      |---other.js
      |---other.css
    |---other/          访问地址http://localhost/other
      |---index.html
  |---src/              应用源码
    |---assets/         资源目录
      |---imgs/         公共图片
      |---font/         字体图标
      |---config.js     公共配置(name , logo...)
      |---global.less   公共样式(reset...)
      |---lib.js        各种框架(vue, vue-router, vux, jquery, fastclick...)
    |---components      公共组件
      |---index-other.vue         
    |---apps            单页面应用目录
      |---index
        |---main.js     应用入口
        |---app.vue     当前应用组件
        |---imgs/
        |---vuex/       应用状态管理
          |---store.js
          |---mutation-type.js
          |---mutations.js
          |---actions.js
          |---getters.js
      |---other
        |---同index
    |---template.html   生成html模板
      
