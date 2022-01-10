import { FQ } from './index'
import config from '../config'
import router from '../router/index'
import { store } from '../store/index' // 引入状态机
import axios from 'axios'

const globalThis: any = window

// 超时时间
const timeout = 60000

// 错误提示
const errorMsg = {
  404: '找不到路由',
  503: '服务未启动'
}

// 登录超时
const loginOutTime = () => {
  globalThis.Alert('warning', '登录已过期，请重新登录~', () => {
    sessionStorage.clear()
    router.replace('/login')
  })
}

// 刷新token
const refreshToken = (headers: any) => {
  // 有fresh_token则刷新token
  if (headers && headers.fresh_token) {
    sessionStorage.userToken = headers.fresh_token
  }
}

export default (method: string, url: string, data = {}, formData = false) => {
  const headers: any = {
    token: sessionStorage.userToken || '',
    'Content-Type': 'application/json'
  }
  if (formData) {
    data = FQ(data)
    headers.Accept = 'application/json, application/javascript'
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return new Promise((resolve, reject) => {
    // axios实例
    const httpRequest: any = axios.create({
      headers,
      timeout
    })
    // 添加响应拦截器
    httpRequest.interceptors.request.use((config) => {
      config.cancelToken = new axios.CancelToken((cancel) => {
        store.commit('pushToken', {
          cancelToken: cancel
        })
      })
      return config
    })
    // 添加响应拦截器
    httpRequest.interceptors.response.use(
      ({ data, headers }) => {
        refreshToken(headers)
        switch (data.code) {
          case 200:
            resolve(data)
            return
          case 401:
            loginOutTime()
            break
          case 402:
            loginOutTime()
            break
          default:
            globalThis.Alert('warning', data.msg)
        }
        reject(data.msg)
      },
      ({ response }) => {
        reject(new Error())
        if (response && response.data) {
          const { status, path } = response.data
          // 没有status表示当前接口被取消请求，不弹窗
          if (!JSON.stringify(response).includes('status')) {
            const headers = response.headers
            refreshToken(headers)
          } else {
            // 错误响应数据
            globalThis.Alert(`${status}提示`, `${path}<br/>${errorMsg[status]}`)
          }
        }
      }
    )
    // 发起请求
    httpRequest({ method, url: config.hostname + url, data })
  })
}
