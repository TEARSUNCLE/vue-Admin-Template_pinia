// 用户相关信息的VUEX
import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginApi } from '@/api/user'

const state = {
  token: getToken() || '',
  // userId: localStorage.getItem('userId') || null,
  // userInfo: {}
}
const mutations = {
  storeSetToken: (state, val) => {
    setToken(val)
    state.token = val
  },
  // setUserInfo: (state, val) => {
  //   state.userInfo = val
  //   state.userId = val.id
  //   localStorage.setItem('userId', val.id)
  // },
  storeRemoveToken: (state) => {
    state.token = ''
    removeToken()
  },
  // updateUserInfo: (state, val) => {
  //   state.userInfo = val
  // },
  // removeUserInfo: (state) => {
  //   state.userInfo = {}
  //   state.userId = null
  //   localStorage.removeItem('userId')
  // },
  // setLoginTime: () => {
  //   setTimeStamp()
  // },
  // removeLoginTime: () => {
  //   removeTime()
  // }
}

const actions = {
  userLogin: async(store, val) => {
    const tmp = await loginApi(val)
    // 存token
    store.commit('storeSetToken', tmp.token)
    // 存信息
    // store.commit('setUserInfo', tmp.user)
    // 存时间
    // store.commit('setLoginTime')
  },

  // userLogout: async(store) => {
  //   // 删token
  //   await store.commit('storeRemoveToken')
  //   // 删信息
  //   await store.commit('removeUserInfo')
  //   // 删时间
  //   await store.commit('removeLoginTime')
  // },
  // getUserInfo: async(store, val) => {
  //   const tmp = await getUserById(val)
  //   store.commit('updateUserInfo', tmp)
  // }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}