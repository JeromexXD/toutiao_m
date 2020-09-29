<template>
    <div class="channel-edit">
        <van-cell center>
            <div slot="title" class="channel-title">我的频道</div>
            <van-button plain type="danger" size="mini" round
            @click="isEdit = !isEdit"
            >
                {{isEdit? '完成' :'编辑'}}
                </van-button>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item
            :class="active===index? 'active':''"
            :icon="(isEdit && index!==0)?'close':''"
            v-for="(value,index) in userChannels"
            :key="value.id" :text="value.name"
            @click="onUserChannelClick(value, index)" />
        </van-grid>

        <van-cell center>
            <div slot="title" class="channel-title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item v-for="item in recommendChannels" :key="item.id" :text="item.name"
            @click="onAdd(item)" />
        </van-grid>
    </div>
</template>

<script>
import { getAllChannels, AddUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(item => {
        return !this.userChannels.find(item1 => {
          return item1.id === item.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      const { channels } = data.data
      this.allChannels = channels
    },
    async onAdd (channel) {
      this.userChannels.push(channel)
      // 数据持久化
      if (this.user) {
        // 登录的数据存储到服务器端
        await AddUserChannel({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ]
        })
      } else {
        // 没登录的数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态下是移除
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态下是跳转
        this.switchChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      if (index <= this.active) {
        this.$emit('updataTab', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel (index) {
      // 关闭编辑页面
      this.$emit('close')
      // 激活选中tab
      this.$emit('updataTab', index)
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
    padding-top: 55px;
    .channel-title {
        font-size: 16px;
        color: #333 ;
    }
    .van-grid-item {
        width: 80px;
        height: 43px;
        /deep/ .van-grid-item__content{
            background-color: #f4f5f6;
            .van-grid-item__text {
                margin-top: 0;
                font-size: 12px;
                color: #222;
            }
            .van-icon-close {
                position: absolute;
                top: -8px;
                right: -8px;
                font-size: 16px;
            }
        }
    }
    .van-button--plain {
        width: 55px;
        height: 20px;
    }
    .active {
       /deep/ .van-grid-item__text{
            color:tomato !important;
        }
    }
}
</style>
