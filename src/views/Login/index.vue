<template>
  <div class="login-container">
      <van-nav-bar
  title="登录"
/>

<van-form @submit="onSubmit" ref="form">
  <van-field
    v-model="user.mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="rules.mobile"
    required
  >
  <template #left-icon>
    <ToutiaoIcon icon="shouji"></ToutiaoIcon>
  </template>
  </van-field>

  <van-field
    v-model="user.code"
    name="code"
    placeholder="请输入验证码"
    :rules="rules.code"
    required
    type="number"
    :maxlength="6"
  > <template #left-icon>
    <ToutiaoIcon icon="yanzhengma"></ToutiaoIcon>
  </template>

  <template #button>
    <van-count-down :time="5000" format=" ss s" v-if="isShowCountDown" @finish="isShowCountDown = false"/>
    <van-button size="small" type="primary" native-type="button" class="send-sms-btn" @click="sendSmCode" v-else :loading="isDisabled">发送验证码</van-button>
  </template>
</van-field>
  <div style="margin: 16px;">
    <van-button  block type="info" native-type="submit">登录</van-button>

  </div>
</van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      username: '',
      password: '',
      user: {
        mobile: '13208022970',
        code: '246810'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '手机号格式不对'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码不正确'
          }
        ]
      },
      isShowCountDown: false,
      isDisabled: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 调用登录接口
      try {
        const res = await login(this.user)
        console.log(res)
        Toast.success('登录成功')
      } catch (error) {
        console.log(error)
        Toast.fail(error?.response?.data?.message || '服务器端错误')
      }
    },
    async sendSmCode () {
      try {
        await this.$refs.form.validate('mobile')
      } catch (error) {
        console.log(error)
        return
      }

      try {
        this.isDisabled = true
        // TODO:发送验证码请求
        await getSmsCode(this.user.mobile)
        this.isShowCountDown = true
        Toast.success('发送验证码成功')
      } catch (error) {
        console.log(error)
        Toast.fail(error?.response?.data?.message || '出错了')
        this.isShowCountDown = false
      } finally {
        // 不管最后成功和失败都会执行
        this.isDisabled = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container{
  .toutiao{
    font-size:37px
  }
}

.login-container {
  /deep/.toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}

</style>
