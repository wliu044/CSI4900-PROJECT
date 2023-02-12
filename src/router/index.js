import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";

// import Search from "./page/Search";
// import Home from "./page/Home";
// import Login from "./page/Login";
// import Register from "./page/Register";
// import Detail from "./page/Detail";
// import AddCartSuccess from "./page/AddCartSuccess";
// import ShopCart from "./page/ShopCart";
// import Trade from "./page/Trade";
// import Pay from "./page/Pay";
// import PaySuccess from "./page/PaySuccess";
// import Center from "./page/Center";
// import MyOrder from "./page/Center/MyOrder";
// import GroupOrder from "./page/Center/GroupOrder";
// 实现路由懒加载
const Search = ()=>import("./page/Search")
const Home = ()=>import("./page/Home")
const Login = ()=>import("./page/Login")
const Register = ()=>import("./page/Register")
const Detail = ()=>import("./page/Detail")
const AddCartSuccess = ()=>import("./page/AddCartSuccess")
const ShopCart = ()=>import("./page/ShopCart")
const Trade = ()=>import("./page/Trade")
const Pay = ()=>import("./page/Pay")
const PaySuccess = ()=>import("./page/PaySuccess")
const Center = ()=>import("./page/Center")
const MyOrder = ()=>import("./page/Center/MyOrder")
const GroupOrder = ()=>import("./page/Center/GroupOrder")

Vue.use(VueRouter);
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push和replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const router = new VueRouter({
  routes: [
    {
      path: "/center",
      component: Center,
      meta: { show: true },
      children: [
        {
          path: "myOrder",
          component: MyOrder,
        },
        {
          path: "groupOrder",
          component: GroupOrder,
        },
        {
          path: "/center",
          redirect: "/center/myOrder",
        },
      ],
      beforeEnter: (to, from, next) => {
        // 如果用户未登入就不能到个人中心,就跳转到登入页面
        if (!localStorage.getItem("userToken")) {
          alert("亲！请先登入哦！");
          //    如果你没登入就把要去的地方的路径存在路由中
          next("/login?redirect=" + to.path);
        } else {
          next();
        }
      },
    },
    {
      name: "PaySuccess",
      path: "/PaySuccess",
      component: PaySuccess,
      meta: { show: true },

      beforeEnter: (to, from, next) => {
        if (from.path == "/pay") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      name: "pay",
      path: "/pay",
      component: Pay,
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == "/trade") {
           
          next();
        } else {
            
          next(false);
        }
      },
    },
    {
      name: "trade",
      path: "/trade",
      component: Trade,
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == "/ShopCart" && localStorage.getItem('userToken')) {
          next();
        } else {
            alert('请先登入')
        //   next(false);
        }
      },
    },
    {
      name: "ShopCart",
      path: "/ShopCart",
      component: ShopCart,
      meta: { show: true },
    },
    {
      name: "addCartSuccess",
      path: "/addCartSuccess",
      component: AddCartSuccess,
      meta: { show: true },
    },
    {
      name: "detail",
      path: "/detail/:detailId?",
      component: Detail,
      meta: { show: true },
    },
    {
      name: "home",
      path: "/home",
      component: Home,
      meta: { show: true },
    },
    {
      name: "login",
      path: "/login",
      component: Login,
      meta: { show: false },
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false },
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: Search,
      meta: { show: true },
    },
    // 重定向
    {
      path: "*",
      redirect: "/home",
    },
  ],
  // 路由跳转后滚轮定位在最顶端
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
});
// 路由前置全局守卫
router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem("userToken")) {
    // 如果本地存储有token你要去登入页面，就会弹出你已经登入了
    if (to.path == "/login") {
      next("/home");
    } else {
      next();

      // 如果仓库中的token是丢失了就会重新发送getUserInfo请求
      if (!store.state.Login.userInfo.token) {
        try {
          await store.dispatch("getUserInfo");
        } catch (error) {
          // token失效了
          // 发请求删仓库里的数据和本地存储
          await store.dispatch("logout");
        }
      }
    }
  } else {
    next();
  }
});
export default router;
