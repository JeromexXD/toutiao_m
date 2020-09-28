<template>
    <div class="my-container">
      <!-- 已登录显示的 -->
      <van-cell-group v-if="user" class="my-info">
        <van-cell :border="false" class="base-info" title="name" value="btn" center>
          <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
          />
          <span class="name" slot="title">{{ currentUser.name }}</span>
          <van-button class="update-btn"  round size="small">
            编辑资料
          </van-button>
        </van-cell>
        <van-grid class="data-info" :border="false">
          <van-grid-item text="头条">
            <span class="num" slot="icon">{{currentUser.art_count}}</span>
          </van-grid-item>
          <van-grid-item text="关注">
            <span class="num" slot="icon">{{currentUser.follow_count}}</span>
          </van-grid-item>
          <van-grid-item text="粉丝">
            <span class="num" slot="icon">{{currentUser.fans_count}}</span>
          </van-grid-item>
          <van-grid-item text="获赞">
            <span class="num" slot="icon">{{currentUser.like_count}}</span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <!-- 未登录显示的 -->
      <div v-else class="not-login">
        <div class="head" @click="$router.push('/login')">
          <img class="mobile" src="./head.png">
        </div>
        <span class="text">登录/注册</span>
      </div>
      <!-- 收藏&历史 -->
      <van-grid class="nav-grid" clickable :column-num="2">
        <van-grid-item class="nav-item" icon="star-o" text="收藏" to="/"/>
        <van-grid-item class="nav-item" icon="underway-o" text="历史" url="/"/>
      </van-grid>

      <div class="url-cell">
        <van-cell title="消息通知" is-link url="/" />
        <van-cell title="小锐同学" is-link to="/" />
      </div>
      <van-cell v-if="user" class="exit" title="退出登录"
      @click="onlogout"
      />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { currentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {}
    }
  },
  created () {
    this.getCurrentUser()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onlogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？退出后将无法收到推送！'
      }).then(() => {
        // 确认
        this.$store.commit('setUser', null)
      })
        .catch(() => {
        // 取消
        })
    },
    async getCurrentUser () {
      const { data } = await currentUser()
      // console.log(data)
      this.currentUser = data.data
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .not-login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 180px;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      color: #ffffff;
      font-size: 14px;
    }
  }
  .my-info{
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      background: unset;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 10px;
      .avatar {
        box-sizing: border-box;
        margin-right: 11px;
        width: 66px;
        height: 66px;
        border: 1px solid #ffffff;
      }
      .name {
        font-size: 15px;
        color: #ffffff;
      }
      .update-btn {
        height: 25px;
        line-height: 20px;
        font-size: 10px;
        color: #666 ;
      }
    }
    /deep/ .van-grid-item__content {
        background: unset;
      }
  }
  .data-info {
    .van-grid-item{
      box-sizing: border-box;
      height: 65px;
      color: #ffffff;
      .num {
        font-size: 18px;
      }
      /deep/ .van-grid-item__text {
        color: #ffffff;
        font-size: 12px;
      }
    }
  }
  /deep/ .nav-grid {
    margin-bottom: 5px;
    .nav-item {
      height: 70px;
      .van-icon-star-o {
        color: #eb5253;
      }
      .van-icon-underway-o {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .url-cell {
    margin-bottom: 5px;
  }
  .exit {
    color: #d86262;
    text-align: center;
  }
}
</style>
