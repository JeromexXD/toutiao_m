import request from '@/utils/request'
// import store from '@/store/'
/* 登录/注册 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
/* 获取验证码 */
export const sms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
/* 获取登录用户信息 */
export const currentUser = _ => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    /* headers: {
      Authorization: `Bearer ${store.state.user.token}`
    } */
  })
}
/* 获取登录用户频道列表 */
export const getUserChannels = _ => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
