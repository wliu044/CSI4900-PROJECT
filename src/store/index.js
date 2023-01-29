// 引入核心库
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入小仓库（模块化vuex）
import Home from './Home'
import Search from './Search'
import Detail from './Detail'
import ShopCart from './ShopCart'
import Register from './Register'
import Login from './Login'
import Trade from './Trade'
// 在vue上使用vuex
Vue.use(Vuex)
export default new Vuex.Store({
   modules:{
    Home,
    Search,
    Detail,
    ShopCart,
    Register,
    Login,
    Trade
   }
})
