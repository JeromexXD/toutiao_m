<template>
    <div class="login-container">
      <van-nav-bar
        class="app-navbar"
        title="登录"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 输入框 -->
      <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="loginFrom"
      @submit="onLogin"
      @failed="onFiled">
        <van-field
          name="phone"
          v-model="user.mobile"
          label="手机号"
          icon-prefix="iconfont"
          left-icon="icon-mobile"
          placeholder="请输入手机号"
          :rules="this.fromRules.mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          label="验证码"
          icon-prefix="iconfont"
          left-icon="icon-lock"
          placeholder="请输入验证码"
          :rules="this.fromRules.code"
        >
          <template #button>
            <van-count-down v-if='isShow' :time="1000 * 60" format="ss s" @finish="isShow=!isShow" />
            <van-button v-else class="send-btn" size="small" round type="default"
            @click.prevent="onSendSms"
            :loading = "isLoading"
            >发送验证码</van-button>
          </template>
        </van-field>
              <!-- 登录 -->
          <div class="login-btn-wrap">
            <van-button class="login-btn" type="info" block>登 录</van-button>
          </div>
      </van-form>
      <!-- 友情提示 -->
      <van-notice-bar
        left-icon="volume-o"
        text="获取不到验证码时，可以使用246810"
      />
    </div>
</template>

<script>
import { login, sms } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      fromRules: {
        mobile: [
          {
            required: true, message: '请输入手机号'
          },
          {
            pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true, message: '请输入验证码'
          },
          {
            pattern: /^\d{6}$/, message: '验证码错误'
          }
        ]
      },
      isShow: false,
      isLoading: false
    }
  },
  methods: {
    async onLogin () {
      // eslint-disable-next-line no-undef
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        Toast.success('登陆成功')
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (err) {
        console.log(err)
        Toast.fail('登陆失败手机号或验证码错误')
      }
    },
    onFiled (error) {
      // console.log(error)
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: top
        })
      }
    },
    async onSendSms () {
      // 校验手机号
      try {
        await this.$refs.loginFrom.validate('phone')
        // 防止网络慢 用户频繁触发请求
        this.isLoading = true
        const { status } = await sms(this.user.mobile)
        console.log(status)
        if (status === 200) this.isShow = true
      } catch (err) {
        // console.log(err)
        Toast({
          message: err.message,
          position: top
        })
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send-btn {
    width: 80px;
    height: 23px;
    background-color: #ededed;
    .van-button__text{
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 50px 30px;
    .login-btn {
      border: none;
      background-color: #6495ED;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
}
</style>
