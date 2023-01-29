<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <router-link to="/login" target="_blank">登陆</router-link>
        </span>
      </h3>
      <!-- <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" :value="code" />
        <button
          style="height: 38px; width: 80px; margin-left: 5px"
          @click="getCode(phone)"
        >
          获取验证码
        </button>
        <span class="error-msg">错误提示信息</span>
      </div> -->
      <!-- <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password1" />
        <span class="error-msg">错误提示信息</span>
      </div> -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="text" v-model="code" autocomplete="off" style="width:270px"></el-input>
          <button style="height: 38px; width: 80px; margin-left: 5px" @click="getCode" :disabled="inhibit" ref="btn">
            获取验证码
          </button>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width:270px"></el-input>
        </el-form-item>


        <el-form-item label="确认密码" prop="password1">
          <el-input type="password" v-model="ruleForm.password1" autocomplete="off" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item prop="isAgree">
          <el-checkbox-group v-model="ruleForm.isAgree">
            <el-checkbox label="同意协议并注册《用户协议》" style="color:orangered"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>


      <div class="controls">
        <!-- <input
          name="m1"
          type="checkbox"
          :checked="isAgree"
          @click="isChecked"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="btn">
        <el-button type="primary" @click="userRegister('ruleForm')">完成注册</el-button>
        <!-- <button @click="userRegister">完成注册</button> -->
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Register",
  data() {
    // 表单验证电话号码区
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));

      }
      setTimeout(() => {
        if (!Number.isInteger(value * 1)) {
          callback(new Error('请输入数字值'));
        } else {

          if (value.split('').length == 11) {
            callback();
            this.rules.isPhone = true
          } else {
            callback(new Error('错误的电话号码'));

          }
        }
      }, 1000);
    };
    // 密码表单验证
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (value.split('').length <= 18 && value.split('').length >= 6) {
          this.$refs.ruleForm.validateField('checkPass');
          callback();
        } else {
          callback(new Error('请输入一个6~18位的数字或字母或特殊符号'))
        }

      }
    };
    // 确认表单验证
    var validatePassword1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    // 勾选同意用户协议表单验证
    var validateIsAgree = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请务必勾选同意用户协议'))
      }
    }

    return {
      inhibit: false,
      ruleForm: {
        // 存储用户输入的手机号用于带给服务器发送短信
        phone: '',
        password: '',
        password1: '',
        // 是否同意用户协议
        isAgree: false,
        // 验证电话号码是否正确标记
        isPhone: false
      },
      // 验证规则
      rules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        password1: [
          { validator: validatePassword1, trigger: 'blur' }
        ],
        isAgree: [
          { validator: validateIsAgree, trigger: 'change' }
        ],

      }
    }

  },

  methods: {
    // 发送验证码
    async getCode() {
      console.log(this.validatePhone);
      if (this.rules.isPhone) {
        let time = 60
        let btn = this.$refs.btn
        try {
          let res = await this.$store.dispatch("getCode", this.ruleForm.phone);
          var timer = setInterval(() => {
            this.inhibit = true
            time--
            btn.innerHTML = '请等待' + time + 's'
            if (time == 0) {
              this.inhibit = false
              clearInterval(timer)
              btn.innerHTML = '获取验证码'
            }
          }, 1000)
        } catch (error) {
          alert(error.message);
        }
      }

    },
    // 用户完成注册
    userRegister(formName) {
      const { phone, password, password1, isAgree } = this.ruleForm;
      const { code } = this
      const data = { phone, code, password };
      this.$refs[formName].validate(async (allValidate) => {
        if (allValidate && code) {
          try {
            await this.$store.dispatch("userRegister", data);
            alert('注册成功快去登入吧！！！')
            // 请求发成功后跳转路由到登入界面
            this.$router.push({
              path: '/login',
              query: {
                phone
              }
            })
          } catch (error) {
            alert(error.message)
          }

        } else {
          alert('你输入有误，请检查你的输入！')
        }
      })
    },
  },

  computed: {
    // 计算捞出仓库中的code，验证码框要用
    ...mapState({ code: (state) => state.Register.code }),
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}

.demo-ruleForm {
  margin: 20px 0 0 391px;
  width: 500px;

}

.register-container .register div[data-v-ef635e4e]:nth-of-type(1) {
  margin-top: 0 !important;
}
</style>