<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        Register New User
        <span class="go">I have an account,  <router-link to="/login" target="_blank">go log in</router-link>
        </span>
      </h3>
      <!-- <div class="content">
        <label>Cell phone number:</label>
        <input type="text" placeholder="Please enter your cell phone number" v-model="phone" />
        <span class="error-msg">Error message</span>
      </div>
      <div class="content">
        <label>Verification Code:</label>
        <input type="text" placeholder="Please enter the verification code" :value="code" />
        <button
          style="height: 38px; width: 80px; margin-left: 5px"
          @click="getCode(phone)"
        >
          Get verification code
        </button>
        <span class="error-msg">Error message</span>
      </div> -->
      <!-- <div class="content">
        <label>Login Password:</label>
        <input
          type="password"
          placeholder="Please enter your login password"
          v-model="password"
        />
        <span class="error-msg">Error message</span>
      </div>
      <div class="content">
        <label>Confirm Password:</label>
        <input type="password" placeholder="Please enter the confirmation password" v-model="password1" />
        <span class="error-msg">Error message</span>
      </div> -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="Cell phone number" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="Verification Code" prop="code">
          <el-input type="text" v-model="code" autocomplete="off" style="width:270px"></el-input>
          <button style="height: 38px; width: 80px; margin-left: 5px" @click="getCode" :disabled="inhibit" ref="btn">
            Get verification code
          </button>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width:270px"></el-input>
        </el-form-item>


        <el-form-item label="Confirm Password" prop="password1">
          <el-input type="password" v-model="ruleForm.password1" autocomplete="off" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item prop="isAgree">
          <el-checkbox-group v-model="ruleForm.isAgree">
            <el-checkbox label="Agree to the agreement and register for the User Agreement" style="color:orangered"></el-checkbox>
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
        <span>Agree to the agreement and register for the User Agreement</span>
        <span class="error-msg">Error message</span> -->
      </div>
      <div class="btn">
        <el-button type="primary" @click="userRegister('ruleForm')">Complete registration</el-button>
        <!-- <button @click="userRegister">Complete registration</button> -->
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Contact Customer Service</li>
        <li>Merchant Onboarding</li>
        <li>Marketing Center</li>
        <li>Mobile尚品汇</li>
        <li>Sales Affiliates</li>
        <li>尚品汇Community</li>
      </ul>
      <div class="address">Address: 6th Floor, Ottawa Technology Park Complex</div>
      <div class="beian">ICP19006430</div>
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
        return callback(new Error('Cell phone number cannot be empty'));

      }
      setTimeout(() => {
        if (!Number.isInteger(value * 1)) {
          callback(new Error('Please enter a numeric value'));
        } else {

          if (value.split('').length == 11) {
            callback();
            this.rules.isPhone = true
          } else {
            callback(new Error('Wrong phone number'));

          }
        }
      }, 1000);
    };
    // 密码表单验证
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'));
      } else {
        if (value.split('').length <= 18 && value.split('').length >= 6) {
          this.$refs.ruleForm.validateField('checkPass');
          callback();
        } else {
          callback(new Error('Please enter a 6~18 digit number or letter or special symbol'))
        }

      }
    };
    // 确认表单验证
    var validatePassword1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('The two input passwords do not match!'));
      } else {
        callback();
      }
    };
    // 勾选同意用户协议表单验证
    var validateIsAgree = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('Please be sure to check the box to agree to the user agreement'))
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
            btn.innerHTML = 'Please wait' + time + 's'
            if (time == 0) {
              this.inhibit = false
              clearInterval(timer)
              btn.innerHTML = 'Get verification code'
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
            alert('Register successfully and go login now!')
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
          alert('You made a mistake, please check your input!')
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
