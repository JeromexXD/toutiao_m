<template>
    <div class="home-container">
       <van-nav-bar class="app-navbar">
         <van-button class="search-btn" icon="search" type="info" round slot="title">搜索</van-button>
       </van-nav-bar>
       <!-- 标签栏 -->
       <van-tabs class="channel-tabs" v-model="active">
        <van-tab  v-for="item in channelList" :key="item.id" :title="item.name">
          <ArticleList :channel='item'></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channelList: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      // console.log(data)
      this.channelList = data.data.channels
    }
  },
  components: {
    ArticleList
  }
}
</script>

<style lang="less" scoped>
.home-container{
  /deep/ .van-nav-bar__title{
    max-width: 100%;
      .search-btn {
        width: 250px;
        height: 32px;
        border: none;
        background-color: #5babfb;
      }
  }
  /deep/ .channel-tabs{
    .van-tabs__line {
      background-color:#5babfb;
    }
  }
}

</style>
