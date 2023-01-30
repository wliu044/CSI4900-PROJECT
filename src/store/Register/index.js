import { reqGetCode,reqRegister } from "@/API";
const actions={
    // 验证码请求
   async getCode(context,phone){
       let res = await reqGetCode(phone)
     if(res.data.code === 200){
        context.commit('GETCODE',res.data)
        return 'ok'
     }else{
        return Promise.reject(new Error('faile'))
     }
    },
    // 注册的接口
    async userRegister({commit},data){
        let res = await reqRegister(data)
        if(res.data.code == 200){
            return 'ok'
          
        }else{
            return Promise.reject(new Error('The account has already been registered, get another one!'))
        }
    }
}
const mutations = {
    GETCODE(state,value){
        state.code = value.data

    }
}
const state = {
    code:'',
}
const getters = {

}
export default {
    actions,
    mutations,
    state,
    getters
}
