import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置中文语言包
dayjs.locale('zh-cn')
// 配置使用相对时间
dayjs.extend(relativeTime)

// 吧相对时间的代码包装为全局过滤器
Vue.filter('relativeTime', time => {
  // console.log(time)
  return dayjs(time).fromNow()
})
// console.log(dayjs('2020-9-27').from(dayjs()))
