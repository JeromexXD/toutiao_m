import request from '@/utils/request'
/* 获取搜索联想建议 */
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
/* 获取搜索结果 */
export const getResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
/* 获取搜索历史记录 */
export const getSearchHistory = _ => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
