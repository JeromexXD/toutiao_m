import request from '@/utils/request'

/* 获取全部频道列表 */
export const getAllChannels = _ => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
/* 将筛选的频道存储到服务器 */
export const AddUserChannel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
/* 删除指定频道 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
