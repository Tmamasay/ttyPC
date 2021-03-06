import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken, getRefreshToken } from '../cache'
// import RESTFUL_ERROR_CODE_MAP from '@/constants/restful_error_code'

function errorReport(url, error, requestOptions, response) {
  if (window.$sentry) {
    const errorInfo = {
      error: typeof error === 'string' ? new Error(error) : error,
      type: 'request',
      requestUrl: url,
      requestOptions: JSON.stringify(requestOptions)
    }

    if (response) {
      errorInfo.response = JSON.stringify(response)
    }

    window.$sentry.log(errorInfo)
  }
}

const DEFAULT_OPTIONS = {
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  headers: {
    timestamp: new Date().getTime(),
    'Content-Type': 'application/json;chareset=UTF-8'
  }
}

const responseLog = (response) => {
  if (process.env.NODE_ENV === 'development') {
    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)})`
    console.log(
      '%c┍------------------------------------------------------------------┑',
      `color:${randomColor};`
    )
    console.log('| 请求地址：', response.config.url)
    try {
      console.log('| 请求参数：', response.config.data ? JSON.parse(response.config.data) : {})
    } catch (error) {
      console.log(error)
    }
    console.log('| 返回数据：', response.data)
    console.log(
      '%c┕------------------------------------------------------------------┙',
      `color:${randomColor};`
    )
  }
}

const instance = axios.create(DEFAULT_OPTIONS)

instance.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
      config.headers['refresh_token'] = getRefreshToken()
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    responseLog(response)
    const codeTy = response.data.code
    // const codeSX = response.data.status
    const code = response.data.statusCode
    if (code && code !== '00000') {
      if (+code === 401) {
        // Message({
        //   message: '登录时间失效，即将重新登录',
        //   type: 'error',
        //   duration: 3 * 1000
        // })
        store.dispatch('user/logout')
        setTimeout(() => {
          this.$router.push({ name: 'Home' })
          location.reload()
        }, 1000)
      } else {
        Message({
          message: response.data.message,
          type: 'warning',
          duration: 2 * 1000
        })
      }
      // return Promise.reject(response.data.message)
      return response.data
    } else if (response.data.data && +response.data.data.code === 403) {
      Message({
        message: response.data.data.error_description,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(response.data.data.error_description)
    } else if (codeTy && +codeTy !== 10000) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(response.data.msg)
    } else {
      return response
    }
    // const msg = RESTFUL_ERROR_CODE_MAP[code]
    // if (msg) {
    //   // Toast(response.data.message || msg)
    //   if (+code === 401) {
    //     Message({
    //       message: '登录时间失效，请重新登录',
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //     setTimeout(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         this.$router.push({ name: 'Home' })
    //         location.reload()
    //       })
    //     }, 2000)
    //   } else {
    //     Message({
    //       message: response.data.message,
    //       type: 'warning',
    //       duration: 5 * 1000
    //     })
    //   }
    //   return Promise.reject(response.data.message || msg)
    // } else if (response.data.data && +response.data.data.code === 403) {
    //   Message({
    //     message: response.data.data.error_description,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(response.data.data.error_description || msg)
    // } else {
    //   return response
    // }
  },
  (thrown) => {
    // Toast(thrown.message || 'Error')
    // setTimeout(() => {
    //   Toast.clear()
    // }, 500)
    return Promise.reject(thrown)
  }
)

export default async function(options) {
  const { url } = options
  const requestOptions = Object.assign({}, options)

  try {
    // const { data, data: { errno, errmsg }} = await instance.request(requestOptions)
    const { data } = await instance.request(requestOptions)

    return data
  } catch (err) {
    errorReport(url, err, requestOptions)
    throw err
  }
}
