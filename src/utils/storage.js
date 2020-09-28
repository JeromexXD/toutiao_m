/*
 * 本地存储
 */

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    //  如果是 JSON 格式的字符串 就返回处理后的
    return JSON.parse(data)
  } catch (err) {
    //  如果不是是 JSON 格式的字符串 就返回原数据
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
