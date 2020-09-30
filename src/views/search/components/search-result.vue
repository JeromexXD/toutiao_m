<template>
    <div class="search-result">
        <van-list
           v-model="loading"
           :finished="finished"
           finished-text="我是有底线的"
           @load="onLoad"
        >
        <van-cell
        v-for="item in result"
        :key="item.aut_id"
        :title="item.title" />
        </van-list>
    </div>
</template>

<script>
import { getResults } from '@/api/search'
export default {
  data () {
    return {
      result: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getResults({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
      // console.log(data)
      const { results } = data.data
      this.result.push(...results)
      // 关闭本次的 loading
      this.loading = false
      // 判断是否还有数据
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result{
    .van-list {
        position: fixed;
        top: 54px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
    }
}

</style>
