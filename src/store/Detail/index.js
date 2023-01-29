import { reqAddSendShoppingCart, reqGoodsInfo } from "@/API"
import { getUUID } from "@/utils/uuid_token";
const actions={
    // 商品详情请求行为
  async getGoodsInfo(context,goodsId){
       let res = await reqGoodsInfo(goodsId)
       
       context.commit('GETGOODSINFO',res.data)
    },
    // 派发加入购物车数据给服务器
   async addSendShoppingCart({commit},{goodsId,goodsNum}){
      
        let res = await reqAddSendShoppingCart(goodsId,goodsNum)
   

   }
}
const mutations = {
    GETGOODSINFO(state,goodsData){
        state.goodsData = goodsData
    }
}
const state = {
    goodsData:{},
    uuid_token:getUUID()
}
const getters = {
    data(state){
        return state.goodsData.data ? state.goodsData.data : {}
    },
    // 简化商品信息
    skuInfo(state){
       if(state.goodsData.data){
        return state.goodsData.data.skuInfo 
       }else{
        return {}
       }
    },
 
    // 简化选择商品信息
    spuSaleAttrList(state){
        if(state.goodsData.data){
            return state.goodsData.data.spuSaleAttrList 

        }else{
            return []
        }
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}