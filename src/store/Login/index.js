import { reqUserLogin, reqUserInfo, reqUserLogout } from "@/API";

<<<<<<< HEAD
const actions = {
    // Login request
    async userLogin(context, data) {
        console.log(data);
        let res = await reqUserLogin(data)
        console.log(res);
        if (res.data.code == 200) {
            context.commit('USERLOGIN', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('Incorrect username or password'))
        }
    },
    // User information returned from login
    async getUserInfo({commit}) {
        let res = await reqUserInfo()
        if (res.data.code == 200) {
            commit('GETUSERINFO', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('Failed to return user information'))
        }
    },
    // Logout request, notify mutations to delete user login data
    async logout({commit}) {
        let res = await reqUserLogout()
        if (res.data.code == 200) {
            commit('LOGOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error('Logout failed'))
        }
=======
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
>>>>>>> 4a8e739ecb6df0468ce0be4c19758d94ca740163
    }
}

const mutations = {
    USERLOGIN(state, value) {
        state.data = value.data
        // After logging in, it will jump to the main page, before jumping, store the user token in vuex in local storage
        localStorage.setItem('userToken', state.data.token)
    },
    GETUSERINFO(state, value) {
        state.userInfo = value.data
    },
    LOGOUT(state) {
        state.data = {}
        state.userInfo = {}
        localStorage.removeItem('userToken')
    }
}

const state = {
    data: {},
    userInfo: {},
    token: localStorage.getItem('userToken') || ''
}

const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters
}
