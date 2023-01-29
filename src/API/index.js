import newAxios from "./axios";
// 引入mockAxios
import mockAxios from "./mockAxios";

// 三级联动接口
///product/getBaseCategoryList
// 对外暴露一个函数
// requests就是axios，只是简单封装一下
// export const productList = async () => {
//   try {
//     const res = await newAxios.get("/api/product/getBaseCategoryList");
//   } catch (err) {
//     console.log(err);
//   }
// };
export const productList = () => {
  return newAxios({ url: "/product/getBaseCategoryList", method: "GET" });
};
// 轮播图模拟请求
export const bannerList = () => {
  return mockAxios({ url: "/banner", method: "GET" });
};
//虚拟用户地址请求
export const reqUserAddress = () => {
  return mockAxios({ url: "/userAddress", method: "GET" });
};
// floor数据模拟请求
export const floorList = () => mockAxios.get("/floor");
// 搜索模块数据请求
export const searchList = (params) => {
  return newAxios({
    url: "/list",
    method: "post",
    data: params,
  });
};
// 商品信息请求模块
export const reqGoodsInfo = (skuId) => {
  return newAxios({ url: `/item/${skuId}`, method: "GET" });
};
// 购物车请求
export const reqAddSendShoppingCart = (skuId, skuNum) => {
  return newAxios({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};
//获取用户购物车的接口
export const reqShopCart = () =>
  newAxios({ url: "/cart/cartList", method: "get" });
// 删除购物车物品接口
export const reqDeleteCart = (skuId) =>
  newAxios({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

//修改某一个商品的勾选的状态

export const reqUpdateChecked = (skuId, isChecked) =>
  newAxios({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

  //获取验证码接口
export const reqGetCode = (phone)=>newAxios({url:`/user/passport/sendCode/${phone}`,method:'get'});
// 注册的接口
export const reqRegister = (data)=>newAxios({url:`/user/passport/register`,method:'post',data});
// 登入的接口
export const reqUserLogin = (data)=>{
 return newAxios({url:`/user/passport/login`,method:'post',data})};

//获取用户登录成功以后用户信息的接口
export const reqUserInfo = ()=>newAxios({url:`/user/passport/auth/getUserInfo`,method:'get'});
//退出登录业务
export const reqUserLogout = ()=>newAxios({url:`/user/passport/logout`,method:'get'});


//获取用户地址信息
export const reqAddressInfo = ()=>newAxios({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});


//获取商品清单数据
export const reqShopInfo = ()=>newAxios({url:`/order/auth/trade`,method:'get'});
//提交订单接口
export const reqSubmitOrder = (tradeNo,data)=>newAxios({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});

//获取支付信息接口
export const reqPayInfo = (orderId)=>newAxios({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//查询支付结果
export const reqPayResult = (orderId)=>newAxios({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取我的订单
export const reqMyOrderList = (page,limit)=>newAxios({url:`/order/auth/${page}/${limit}`,method:'get'});

