import { reqShopCart, reqDeleteCart, reqUpdateChecked } from "@/API";
const actions = {
  // 购物车请求
  async getShopCartList({ commit }) {
    let res = await reqShopCart();
    if (res.data.code == 200) {
      commit("GETSHOPCARTLIST", res.data);
    }
  },
  //   删除购物车请求
  async deleteCartById({ commit }, skuId) {
    let res = await reqDeleteCart(skuId);
    if (res.data.code == 200) {
      return "ok";
    } else {
      return "fail";
    }
  },
  //   修改购物车当中某个产品的勾选状态
  async updateCartCheckedById({ commit }, { skuId, isChecked }) {
    console.log(skuId, isChecked);
    let res = await reqUpdateChecked(skuId, isChecked);
    if (res.data.code == 200) {
      return "ok";
    } else {
      return "fail";
    }
  },
  //全选框的请求
  changeAllChecked(context,checked){
    console.log(checked);
    let PromiseAll = []
    context.getters.cartInfoList.forEach(item=>{
      let Promise = context.dispatch('updateCartCheckedById',{skuId:item.skuId,isChecked:checked}) 
     PromiseAll.push(Promise)
    })
    return Promise.all(PromiseAll)

  },
  // 删除所选的所有商品请求
  deleteAllChecked(context) {
    let PromiseAll = []
    context.getters.cartInfoList.forEach(item => {
      //如果cartInfoList遍历出来的item中isChecked为1就派发请求，不为1就不拍法删除请求
     let Promise = item.isChecked == 1 ? context.dispatch('deleteCartById',item.skuId) : ''
    //  将每次返回的Promise添加到数组中
     PromiseAll.push(Promise)
    });
    return Promise.all(PromiseAll)
  },
};
const mutations = {
  GETSHOPCARTLIST(state, value) {
    state.shopCartList = value.data;
  },
};
const state = {
  shopCartList: [],
};
const getters = {
  cartInfoList(state) {
   if(state.shopCartList[0] != undefined){
    return state.shopCartList[0].cartInfoList
   }else{
    return []
   }
  },
};
export default {
  actions,
  mutations,
  state,
  getters,
};
