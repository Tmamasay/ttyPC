import { getToken, setToken, removeToken, setRefreshToken, removeRefreshToken } from '@/core/services/cache'
import TestHttpInteractor from '@/core/interactors/common-interactor'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  userLogin({ commit, state }, info) {
    const { username, password } = info
    const data = {
      param: {
        username: username.trim(),
        password: password,
        sysName: 'tyteen',
        loginType: 'tyteen',
        clientPassword: 'nfjkMaHiO4Wz42Fb1jNVWlilUzBXxwqD'
      }
    }
    TestHttpInteractor.userLogin(data).then(res => {
      if (res) {
        // setToken(res.access_token)
        setToken(`Bearer ${res.access_token}`)
        setRefreshToken(res.refresh_token)
        commit('SET_TOKEN', res.access_token)
        console.log(res.access_token)
        TestHttpInteractor.getCompanyOne().then(res => {
        })
      }
    })
  },
  getInfo({ commit, state }) {

  },

  logout({ commit, state, dispatch }) {
    commit('SET_TOKEN', '')
    removeToken()
    removeRefreshToken()
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      removeRefreshToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
