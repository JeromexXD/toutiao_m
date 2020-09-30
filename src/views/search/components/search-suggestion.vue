<template>
    <div class="search-suggestion">
        <van-cell
           v-for="(item,index) in suggestions"
           :key="index"
           icon="search"
           @click="$emit('search',item)"
        >
        <div slot="title" v-html="highLight(item)"></div>
        </van-cell>
    </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    /* searchText () {

    } */
    // 完整的写法可以配置 immediate
    searchText: {
      // 函数防抖
      handler: debounce(async function () {
        const { data } = await getSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 500),
      immediate: true // 可以在侦听开始之后立即被调用
    }
  },
  methods: {
    highLight (str) {
      return str.replace(new RegExp(this.searchText, 'gi'),
      `<span style="color:#5BABFB">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
