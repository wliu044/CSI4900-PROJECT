// search模块小仓库
import { searchList } from "@/API/index";
const actions = {
  async getSearchList(context, params) {
    console.log(params);
    let res = await searchList(params);
   
    if (res.data.code === 200) {
      context.commit("GETSEARCHLIST", res.data);
    }
  },
};
const mutations = {
  GETSEARCHLIST(state, value) {
    state.searchList = value.data;
   
  },
};
const state = {
  searchList: {},
};
// getters是为了我简化数据而而生，方便再组件中捞数据
const getters = {
    // 这里的形参state是当前小仓库的state
    goodsList(state){
        // 如果不写 || [] 假如没有网络就会返回一个undefined,undefined不能遍历，所以要写一个undefined
        return state.searchList.goodsList ? state.searchList.goodsList : []
    },
    attrsList(state){
        return state.searchList.attrsList ? state.searchList.attrsList : []
    },
    trademarkList(state){
        return state.searchList.trademarkList ? state.searchList.trademarkList : []
    }
};

export default {
  actions,
  mutations,
  state,
  getters,
};
