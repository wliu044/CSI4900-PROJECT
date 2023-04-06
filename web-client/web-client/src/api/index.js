import ajax from "./ajax";

// 1. 基础路径
const BASE_URL = "/api"; // 防跨域
// const BASE_URL = 'http://localhost:3000';  // 服务器真实地址

// 2. 请求方法

// 请求首页的轮播图
export const getHomeCasual = () => ajax("/api/homecasual");

// 请求首页的分类数
export const getCategory = () => ajax("/api/category");

// 请求首页的商品数据
export const getHomeShopList = () => ajax("/api/homeshoplist");

// 请求推荐的商品数据
export const getRecommendShopList = params =>
  ajax("/api/recommendshoplist", params);

// 请求所有商品
export const getAllgoods = params => ajax("/api/allgoods", params, "POST");

// 查询所有结算商品
export const getAllIndentGoods = params =>
  ajax("/api/indent_all_goods", params, "POST");

// 请求商品详细数据
export const getGoodsDetail = params => ajax("/api/goodsdetail", params);

// 请求商品评价
export const getGoodsComment = params => ajax("/api/goodscomment", params);

// 发布评论
export const postComment = (
  goods_id,
  comment_detail,
  comment_rating,
  user_id
) =>
  ajax(
    "/api/postcomment",
    { goods_id, comment_detail, comment_rating, user_id },
    "POST"
  );

// 请求短信验证码
export const getPhoneCode = phone => ajax("/api/send_code", { phone });

// 手机验证码登录
export const phoneCodeLogin = (phone, code) =>
  ajax("/api/login_code", { phone, code }, "POST");

// 用户名和密码登录
export const pwdLogin = (name, pwd, captcha) =>
  ajax("/api/login_pwd", { name, pwd, captcha }, "POST");

// 获取登录的用户信息
export const getUserInfo = params => ajax("/api/user_info", params);

// 退出登录
export const getLogout = () => ajax("/api/logout");

// 修改用户信息
export const changeUserInfo = params =>
  ajax("/api/change_user_msg", params, "POST");

// 修改用户密码
export const changeUserPwd = (id, oriPwd, newPwd) =>
  ajax("/api/change_user_pwd", { id, oriPwd, newPwd }, "POST");

// 修改用户手机
export const changeUserPhone = (id, phone, code) =>
  ajax("/api/change_user_phone", { id, phone, code }, "POST");

// 加入购物车
export const addGoodsToCart = (
  user_id,
  goods_id,
  goods_name,
  thumb_url,
  price,
  buy_count,
  counts,
  category
) =>
  ajax(
    "/api/add_shop_cart",
    {
      user_id,
      goods_id,
      goods_name,
      thumb_url,
      price,
      buy_count,
      counts,
      category
    },
    "POST"
  );

// 结算
export const addGoodsToIndent = (indents, userName, user_id) =>
  ajax("/api/add_indent", { indents, userName, user_id }, "POST");

// 待发货
export const getWaitGoods = (user_id, is_send, params) =>
  ajax(`/api/wait?is_send=${is_send}&user_id=${user_id}`, params, "POST");
// 已收货
export const getReceivedGoods = (user_id, is_send, is_receive, params) =>
  ajax(
    `/api/receive?is_send=${is_send}&user_id=${user_id}&is_receive=${is_receive}`,
    params,
    "POST"
  );

// 催货
export const urgentGoods = params => ajax(`/api/urgent`, params);

// 发货
export const sendGoods = params => ajax("/api/send_goods", params);
// Confirm receipt
export const confirmReceive = params => ajax(`/api/confirm`, params);

// 单个商品数量的改变
export const changeGoodsCount = (goods_id, count, user_id) =>
  ajax("/api/change_goods_count", { goods_id, count, user_id }, "POST");

// 删除单个商品
export const deleteGoods = (goods_id, user_id) =>
  ajax("/api/delete_goods", { goods_id, user_id }, "POST");

// 批量删除
export const deletePatchGoods = (goods_id, user_id) =>
  ajax("/api/delete_patch_goods", { goods_id, user_id }, "POST");

// 删除所有商品
export const deleteAllGoods = user_id =>
  ajax("/api/delete_all_goods", { user_id }, "POST");

// 添加商品到数据库
export const addGoodsToRecom = params =>
  ajax("/api/add_shop_recom", params, "POST");

// 删除recommend单个商品
export const deleteRecomGoods = goods_id =>
  ajax("/api/delete_recom_goods", { goods_id }, "POST");

// 修改recommend单个商品
export const changeGoodsInfo = params =>
  ajax("/api/update_recom_goods", params, "POST");

// 请求购物车的数据
export const getCartsGoods = params => ajax("/api/cart_goods", params);
// 请求结算的数据
export const getIndentGoods = params => ajax("/api/indent_goods", params);

// 关键词Search
export const searchKeywords = keywords =>
  ajax("/api/searchgoods", { keywords }, "POST");

// 管理员登录
export const adminLogin = (account, pwd) =>
  ajax("/api/admin_login", { account, pwd }, "POST");

// 管理员退出登录
export const adminLogout = () => ajax("/api/admin_logout");

// 请求所有用户
export const getAllUsers = () => ajax("/api/admin_allusers");
