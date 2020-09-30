<template>
    <div class="search-container">
        <!-- 搜索栏 -->
        <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
        <form action="/">
            <van-search
               v-model="searchText"
               placeholder="请输入搜索关键词"
               show-action
               shape="round"
               background="#5babfb"
               @search="onSearch(searchText)"
               @cancel="$router.back()"
               @focus="isResultShow = false"
            />
        </form>
         <!-- 搜索结果 -->
        <SearchResult
           v-if="isResultShow"
           :searchText="searchText"
        />
        <!-- 联想建议 -->
        <SearchSuggestion
           v-else-if="searchText"
           :searchText="searchText"
           @search="onSearch"
        />
        <!-- 历史记录 -->
        <SearchHistory
           v-else
           :searchHistory="searchHistory"
        />
    </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistory } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'searchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: []
    }
  },
  created () {
    this.loadSearchHistory()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      const index = this.searchHistory.indexOf(searchText)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(searchText)
      /* 数据持久化 登录的用户的搜索记录服务器会自动存储
       * 未登录的存储到本地
       */
      setItem('search-history', this.searchHistory)
      this.isResultShow = true
    },
    async loadSearchHistory () {
      const localHistory = getItem('search-history') || []
      if (this.user) {
        const { data } = await getSearchHistory()
        const { keywords } = data.data
        this.searchHistory = [...new Set(keywords.concat(localHistory))]
      } else {
        this.searchHistory = localHistory
      }
    }
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  }
}
</script>

<style lang="less" scoped>
.search-container {
    .van-search__action {
        color: #ffffff;
    }
    /deep/ .van-icon {
        margin-right: 10px;
    }
}
</style>
