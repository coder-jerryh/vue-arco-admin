import request from '../utils/request'
// 登录
export const loginApi = (data) => {
  return request('post', '/function/user/manageLogin', data, true)
}
