<template>
    <div class="home-container">
       <van-nav-bar class="app-navbar">
         <van-button
         class="search-btn"
         icon="search"
         type="info"
         round slot="title"
         to="/search"
         >搜索</van-button>
       </van-nav-bar>
       <!-- 标签栏 -->
       <van-tabs class="channel-tabs" v-model="active">
        <van-tab  v-for="item in channelList" :key="item.id" :title="item.name">
          <ArticleList :channel='item'></ArticleList>
        </van-tab>
        <!-- 编辑按钮 -->
        <div class="edit" slot="nav-right" @click="channelEditShow=true">
          <van-icon class="edit-btn" name="wap-nav" />
        </div>
        <div class="zhanwei" slot="nav-right"></div>
      </van-tabs>
      <!-- 编辑 -->
      <van-popup
        v-model="channelEditShow"
        closeable
        get-container="body"
        position="bottom"
        :style="{ height: '100%' }"
      >
      <!-- 在模板中 $event 代表事件参数 -->
      <ChannelEdit
      @updataTab="active = $event"
      @close="channelEditShow = false"
      :userChannels="channelList"
      :active ="active"
      ></ChannelEdit>
      </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channelList: [],
      channelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      let channels = []
      if (this.user) {
        // 登录获取用户线上的数据
        const { data } = await getUserChannels()
        // console.log(data)
        channels = data.data.channels
      } else {
        // 没登录看看是否有本地存储数据没有请求推荐数据
        const localChannels = getItem('user-channels')
        if (localChannels) {
          channels = localChannels
        } else {
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channelList = channels
    }
    /* ,
    onUpdataTab (index) {
      this.active = index
    } */
  },
  components: {
    ArticleList,
    ChannelEdit
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
    /deep/ .edit {
      position: fixed;
      right: 0;
      width: 33px;
      height: 44px;
      line-height: 44px;
      background-color: #fff;
      opacity: .9;
      text-align: center;
      font-size: 20px;
    }
    .zhanwei {
      flex-shrink: 0;
      width: 33px;
    }
  }
}

</style>
