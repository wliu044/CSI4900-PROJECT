import {reqAddressInfo,reqShopInfo,reqUserAddress} from '@/API'
const actions = {
    //获取地址
   async getUserAddress({commit}){
       let res = await reqAddressInfo()
       if(res.data.code == 200){
        commit('GETUSERADDRESS',res.data)
        return 'ok'
       }else{
        return Promise.reject(new Error('Request address failure'))
       }
    },
    //虚拟地址请求
   async getMockAddress({commit}){
       let res = await reqUserAddress()
       if(res.data.code == 200){
        commit('GETMOCKADDRESS',res.data)
       }
    },
    //获取购买的商品信息
    async getShopInfo({commit}){
        let res = await reqShopInfo()
        if(res.data.code == 200){
            commit('GETSHOPINFO',res.data)
            return 'ok'
           }else{
            return Promise.reject(new Error('Request address failure'))
           }
        },
    
};
const mutations = {
    GETUSERADDRESS(state,value){
        state.userAddress = value.data
    },
    GETSHOPINFO(state,value){
        state.submitOrder = value.data
    },
    GETMOCKADDRESS(state,value){
        state.userAddress = value.data
    }
};
const state = {
    userAddress:[],
    submitOrder:{}
};
const getters = {
    userShopInfo(state){
        return state.submitOrder.detailArrayList ? state.submitOrder.detailArrayList : []
    }
};
export default {
  actions,
  mutations,
  state,
  getters,
};
