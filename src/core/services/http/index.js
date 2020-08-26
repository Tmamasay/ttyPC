import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { Toast } from 'vant'
import { getToken, getRefreshToken } from '../cache'
import RESTFUL_ERROR_CODE_MAP from '@/constants/restful_error_code'

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
    Toast.loading({
      duration: 0,
      message: '加载中...',
      forbidClick: true
    })

    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
      config.headers['refresh_token'] = getRefreshToken()
    }

    return config
  },
  (error) => {
    Toast.clear()
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    Toast.clear()
    responseLog(response)
    const code = +response.data.statusCode
    const msg = RESTFUL_ERROR_CODE_MAP[code]
    debugger
    if (msg) {
      // Toast(response.data.message || msg)
      if (code === 401) {
        Message({
          message: '登录时间失效，请重新登录',
          type: 'error',
          duration: 5 * 1000
        })
        setTimeout(() => {
          store.dispatch('user/resetToken').then(() => {
            this.$router.push({ name: 'Home' }) 
            location.reload()
          })
        }, 2000)
      } else {
        Message({
          message: response.data.message,
          type: 'warning',
          duration: 5 * 1000
        })
      }

      return Promise.reject(response.data.message || msg)
    } else if (response.data.data.code && +response.data.data.code === 403) {
      Message({
        message: response.data.data.error_description,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(response.data.data.error_description || msg)
    } else {
      return response
    }
  },
  (thrown) => {
    Toast(thrown.message || 'Error')
    setTimeout(() => {
      Toast.clear()
    }, 500)
    return Promise.reject(thrown)
  }
)

export default async function(options) {
  const { url } = options
  const requestOptions = Object.assign({}, options)

  try {
    const { data, data: { errno, errmsg }} = await instance.request(requestOptions)
    if (errno) {
      errorReport(url, errmsg, requestOptions, data)
      throw new Error(errmsg)
    }
    return data
  } catch (err) {
    errorReport(url, err, requestOptions)
    throw err
  }
}
