import { getToken, setToken, setUserInfo, removeUserInfo, removeToken, setRefreshToken, removeRefreshToken } from '@/core/services/cache'
import TestHttpInteractor from '@/core/interactors/common-interactor'
import { ttyMD5 } from '@/utils/index'

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
    const { username, password, company } = info
    return new Promise((resolve, reject) => {
      // 个人登录
      if (!company) {
        const data = {
          param: {
            username: username.trim(),
            password: ttyMD5(password),
            sysName: 'tyteen',
            loginType: 'tyteen',
            clientPassword: 'nfjkMaHiO4Wz42Fb1jNVWlilUzBXxwqD'
          }
        }
        TestHttpInteractor.userLogin(data).then(res => {
          if (res.access_token) {
            // setToken(res.access_token)
            setToken(`Bearer ${res.access_token}`)
            setRefreshToken(res.refresh_token)
            commit('SET_TOKEN', `Bearer ${res.access_token}`)
            console.log(res.access_token)
            TestHttpInteractor.getCompanyOne().then(info => {
              setUserInfo(info)
              resolve(info)
            }).catch(error => {
              reject(error)
            })
          }
        })
      } else {
        const data = {
          content: {
            account: username.trim(),
            password: ttyMD5(password),
            clientId: 1,
            companyId: company,
            clientSecret: 'C4CA4238A0B923820DCC509A6F75849B'
          }
        }
        TestHttpInteractor.oauthLogin(data).then(res => {
          if (res) {
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
  getInfo({ commit, state }) {

  },

  logout({ commit, state, dispatch }) {
    commit('SET_TOKEN', '')
    removeToken()
    removeUserInfo()
    removeRefreshToken()
    // return new Promise(resolve => {
    //   commit('SET_TOKEN', '')
    //   removeToken()
    //   removeUserInfo()
    //   removeRefreshToken()
    //   const data = {
    //     param: {
    //       clientCode: 'tyteen',
    //       token: state.token.split(' ')[1],
    //       sysName: 'tyteen'

    //     }
    //   }
    //   TestHttpInteractor.loginOut(data).then(res => {
    //     if (res) {
    //       // commit('SET_TOKEN', '')
    //       // removeToken()
    //       // removeUserInfo()
    //       // removeRefreshToken()
    //       // resolve(res)
    //     }
    //   })
    // })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      removeUserInfo()
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
