<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/logo-round.png" alt="" width="150">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current: loginMode}" @click="dealLoginMode(true)">Verification code login</a>
          <a href="javascript:;" :class="{current: !loginMode}" @click="dealLoginMode(false)">Password Login</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current: loginMode}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="phone" v-model="phone">
              <button
                v-if="!countDown"
                class="get-verification"
                :class="{phone_right: phoneRight}"
                @click.prevent="getVerifyCode()"
              >
              Obtain verification code
              </button>
              <button
                v-else
                disabled="disabled"
                class="get-verification">
                sent({{countDown}}s)
              </button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="Captcha" v-model="code">
            </section>
            <section class="login-hint">
              Warm reminder: The phone number of an unregistered account will be automatically registered upon login, and the representative has agreed
              <a href="javascript:;">Service Agreement and Privacy Policy</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="Account" v-model="user_name">
              </section>
              <section class="login-verification">
                <input type="password" maxlength="18" placeholder="password" v-if="pwdMode" v-model="pwd">
                <input type="text" maxlength="18" placeholder="password" v-else v-model="pwd">
                <div class="switch-show">
                  <img @click.prevent="dealPwdMode(false)" :class="{on: pwdMode}" src="./images/hide_pwd.png" alt=""
                       width="20">
                  <img @click.prevent="dealPwdMode(true)" :class="{on: !pwdMode}" src="./images/show_pwd.png" alt=""
                       width="20">
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="Captcha" v-model="captcha">
                <img
                  ref="captcha"
                  class="get-verification"
                  src="http://localhost:3000/api/captcha"
                  alt="captcha"
                  @click.prevent="getCaptcha()"
                >
              </section>
              <section class="login-hint">
                Warm reminder: The phone number of an unregistered account will be automatically registered upon login, and the representative has agreed
              <a href="javascript:;">Service Agreement and Privacy Policy</a>
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login()">login</button>
        </form>
        <button class="login-back" @click="$router.go(-1)">return</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getPhoneCode, phoneCodeLogin, pwdLogin} from './../../api/index';
  import { MessageBox } from 'element-ui';
  import {mapActions} from 'vuex'

  export default {
    name: "Login",
    data() {
      return {
        loginMode: true, // 登录方式, true 验证码登录 false 账号登录
        phone: '', // 手机号码
        countDown: 0, // 倒计时
        pwdMode: true, // 密码的显示方式 true 密文 false 明文
        pwd: '', // 密码
        code: '', // 验证码
        userInfo: {}, // 用户的信息
        user_name: '', // 用户名
        captcha: '',  // 图形验证码
      }
    },
    computed: {
      // 验证手机号是否合理
      phoneRight() {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
      }
    },
    methods: {
      ...mapActions(['syncUserInfo']),
      // 1. 登录的模式
      dealLoginMode(flag) {
        this.loginMode = flag;
      },
      // 2. 获取短信验证码
      async getVerifyCode() {
        // 2.1 开启倒计时
        if (this.phoneRight) {
          this.countDown = 60;
          this.intervalId = setInterval(() => {
            this.countDown--;
            // 判断
            if (this.countDown === 0) {
              clearInterval(this.intervalId);
            }
          }, 1000);
        }

        // 2.2 获取短信验证码
        let result = await getPhoneCode(this.phone);
        console.log(result);

        // 2.3 获取验证码失败
        if (result.err_code === 0) {
          // prompt信息
		      MessageBox({
              type: 'info',
              message: result.message,
			        showClose: true,
          });

          // 其他处理
          /*
          clearInterval(this.intervalId);
          this.countDown = 0;
          */
        }else if(result.success_code === 200){
			    MessageBox({
              type: 'info',
              message: `The verification code is: ${result. message}, and the SMS function has not been activated yet. We apologize for the inconvenience caused to you`,
			        showClose: true,
          });
		    }
      },
      // 3. 密码的显示方式
      dealPwdMode(flag) {
        this.pwdMode = flag;
      },
      // 4. 获取图形验证码
      getCaptcha() {
        this.$refs.captcha.src = 'http://localhost:3000/api/captcha?time=' + new Date();
      },
      // 5. 登录
      async login() {
        // 5.1 登录模式
        if (this.loginMode) { // 验证码登录
          // 5.2 前台校验
          if (!this.phone) {
		        MessageBox({
              type: 'info',
              message: "Please enter your phone number!",
			        showClose: true,
            });
            return;
          } else if (!this.phoneRight) {
		        MessageBox({
              type: 'info',
              message: "Please enter the correct phone number!",
			        showClose: true,
            });
            return;
          }

          if (!this.code) {
		      	MessageBox({
              type: 'info',
              message: "Please enter a verification code!",
			        showClose: true,
            });
            return;
          } else if (!(/^\d{6}$/gi.test(this.code))) {
		         MessageBox({
              type: 'info',
              message: "Please enter the correct verification code!",
			        showClose: true,
            });
            return;
          }
          // 5.3 手机验证码登录
          const result = await phoneCodeLogin(this.phone, this.code);
          if (result.success_code === 200) {
            this.userInfo = result.message;
			      this.phone = ''; // 手机号码
            this.countDown = 0; // 倒计时
			      clearInterval(this.intervalId);
            this.code = ''; // 验证码
			      this.pwd = ''; // 密码
            this.user_name = ''; // 用户名
            this.captcha = '';  // 图形验证码
          } else {
            this.userInfo = {
              message: 'Login failed. The phone number or verification code is incorrect!'
            };
          }
        } else { // 账号和密码登录
          // 5.4 前端校验
          if (!this.user_name) {
		        MessageBox({
              type: 'info',
              message: "请输入账号!",
			        showClose: true,
            });
            return;
          } else if (!this.pwd) {
		        MessageBox({
              type: 'info',
              message: "请输入密码!",
			        showClose: true,
            });
            return;
          }else if (!this.captcha) {
		        MessageBox({
              type: 'info',
              message: "请输入验证码!",
			        showClose: true,
            });
            return;
          }
          // 5.5 用户名和密码的登录
          const result = await pwdLogin(this.user_name, this.pwd, this.captcha);
          if (result.success_code === 200) {
            this.userInfo = result.message;
			      this.phone = ''; // 手机号码
            this.countDown = 0; // 倒计时
			      clearInterval(this.intervalId);
            this.code = ''; // 验证码
			      this.pwd = ''; // 密码
            this.user_name = ''; // 账号
            this.captcha = '';  // 图形验证码
          } else {
            MessageBox({
              type: 'info',
              message: 'Login failed. The phone number or verification code is incorrect!',
			        showClose: true,
            });
            return
          }
        }

        // 6. 后续处理
        if (!this.userInfo.id) { // 失败
		        MessageBox({
              type: 'info',
              message: this.userInfo.message,
			        showClose: true,
            });
        } else { // 成功
          // 6.1 同步用户数据
          this.syncUserInfo(this.userInfo);
          // 6.2 回到主界面
          MessageBox({
            type: 'success',
            message: 'Login succeeded!',
			      showClose: true,
          });
          this.$router.back();
          window.sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
          // window.sessionStorage.removeItem("adminInfo");
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .login-container
    width 100%
    height 100%
    background #fff
    .login-inner
      padding-top 60px
      width 25%
      margin 0 auto
      .login-header
        .login-logo
          font-size 20px
          font-weight bold
          color mediumpurple
          text-align center
        .login-header-title
          padding-top 40px
          padding-bottom 10px
          text-align center
          > a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.current
              color mediumpurple
              font-weight 700
              border-bottom 2px solid mediumpurple
      .login-content
        > form
          > div
            display none
            &.current
              display block
            input
              width 100%
              height 100%
              padding-left 8px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid mediumpurple
            .login-message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get-verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.phone_right
                  color purple
            .login-verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch-show
                position absolute
                right 10px
                top 12px
                img
                  display none
                img.on
                  display block
            .login-hint
              margin-top 12px
              color #999
              font-size 12px
              line-height 20px
              > a
                color mediumpurple
          .login-submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background mediumpurple
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .login-back
          display block
          width 100%
          height 42px
          margin-top 15px
          border-radius 4px
          background transparent
          border: 1px solid mediumpurple
          color mediumpurple
          text-align center
          font-size 16px
          line-height 42px
</style>
