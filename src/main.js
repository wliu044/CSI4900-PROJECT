import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import router from "./router";
// import { productList } from "./API";
// 测试服务器请求
// productList();
// 引入vuex插件
import store from './store'
// 引入mock模拟数据js，让它执行一次
import '@/mock/mockServe'
// 多个地方用到轮播图，在路口文件引入swiper样式
import {Carousel,CarouselItem,Button,MessageBox,Form,FormItem,Input,CheckboxGroup,Checkbox} from 'element-ui';
Vue.component('el-carousel',Carousel)
Vue.component('el-carousel-item',CarouselItem)
Vue.component('el-button',Button)
Vue.component('el-form',Form)
Vue.component('el-form-item',FormItem)
Vue.component('el-input',Input)
Vue.component('el-checkbox-group',CheckboxGroup)
Vue.component('el-checkbox',Checkbox)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入分页器组件
import Pagination from '@/components/pagination'
// 注册分页器全局组件
Vue.component("Pagination",Pagination)
import 'swiper/css/swiper.min.css'
// 引入所有请求头
import * as API from '@/API'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入用于懒加载的图片
import lazyLoadImg from '@/assets/1.gif' 
Vue.use(VueLazyload,{
  // 是用懒加载配置项，用来显示懒加载图片
  loading:lazyLoadImg
})
const vm = new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate(){
  // 添加全局事件总线
    Vue.prototype.$bus = this
    // 添加全局API
    Vue.prototype.$API = API
  },
}).$mount("#app");

