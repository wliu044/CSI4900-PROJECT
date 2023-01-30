
    import { reqUserLogin,reqUserInfo,reqUserLogout } from "@/API";
const actions={
    //登入请求
   async userLogin(context,data){
    console.log(data);
      let res = await reqUserLogin(data)
      console.log(res);
      if(res.data.code == 200){
        context.commit('USERLOGIN',res.data)
        return 'ok'
      }else{
        return Promise.reject(new Error('The account password is wrong'))
      }
    },
    //登入返回的用户信息
   async getUserInfo({commit}){
       let res = await reqUserInfo()
       if(res.data.code==200){
        commit('GETUSERINFO',res.data)
        return 'ok'
       }else{
        return Promise.reject(new Error('Failed to return user information'))
       }

    },
    // 退出登入的请求，通知mutations删除用户登入数据
   async logout({commit}){
      let res = await reqUserLogout()
      if(res.data.code == 200){
        commit('LOGOUT')
        return 'ok'
      }else{
        return Promise.reject(new Error('Logout failed'))
      }
    }
    
}
const mutations = {
    USERLOGIN(state,value){
        state.data = value.data
         // 登入完毕后会跳转到主页面，跳转之前把vuex中的用户token存在本地存储中
      
         localStorage.setItem('userToken',state.data.token)
  
    },
    GETUSERINFO(state,value){
        state.userInfo = value.data
    },
    LOGOUT(state){
        state.data = {}
        state.userInfo = {}
        localStorage.removeItem('userToken')
    }
}
const state = {
    data:{},
    userInfo:{},
    token:localStorage.getItem('userToken') || ''
}
const getters = {
 
}
export default{
    actions,
    mutations,
    state,
    getters
}
