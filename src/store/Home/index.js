// Home模块小仓库
// 引入请求服务器方法
import { bannerList, floorList, productList } from "@/API";
const actions = {
  async categoryList(context) {
    // 三级联动向服务器发请求
    let res = await productList();
    if (res.data.code === 200) {
      context.commit("CATEGORYLIST", res.data);
    }
  },
  // 轮播图服务器发请求
  async getBannerList(context) {
    let res = await bannerList();
    if (res.data.code === 200) {
      context.commit("BANNERLIST", res.data);
    }
  },
  // floor向服务器发请求
  async getFloorList(context) {
    let res = await floorList();
    if (res.data.code === 200) {
      context.commit("GETFLOORLIST", res.data);
    }
  },
};
const mutations = {
  // 三级联动数据逻辑
  CATEGORYLIST(state, value) {
    state.categoryList = value;
  },
  // 轮播图数据逻辑
  BANNERLIST(state, value) {
    state.bannerList = value.data;
  },
  // floor数据逻辑
  GETFLOORLIST(state, value) {
    state.floorList = value.data;
  },
};
const state = {
  // 三级联动数据
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // floor数据
  floorList: [],
};
const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
