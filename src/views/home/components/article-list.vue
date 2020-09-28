<template>
    <div class="article-list">
        <van-pull-refresh
        v-model="refreshing"
        :success-text="Snotice"
        success-duration=1000
        @refresh="onRefresh"
        >
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的"
        @load="onLoad"
        >
        <ArticleItem v-for="item in articles"
        :key="item.art_id" :article="item"></ArticleItem>
        </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null, // 获取下一页数据的时间戳
      refreshing: false,
      Snotice: ''
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  created () {
  },
  methods: {
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      //   console.log(data)
      const { results } = data.data
      this.articles.push(...results)
      // 判断是否加载下一次
      this.loading = false
      // 数据全部加载完
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 刷新最新数据 往数据列表最前面加
      this.articles.unshift(...data.data.results)
      //  关闭loading的状态
      this.refreshing = false
      this.Snotice = `更新了${data.data.results.length}条数据`
    }
  }
}
</script>

<style lang="less" scoped>
.article-list{
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
}
</style>
