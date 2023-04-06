<template>
  <div id="edit-phone">
    <section class="edit-message">
      <input
        type="tel"
        maxlength="11"
        placeholder="Mobile phone number"
        v-model="phone"
      />
      <button
        v-if="!countDown"
        class="get-verification"
        :class="{ phone_right: phoneRight }"
        @click.prevent="getVerifyCode()"
      >
        Get a verification code
      </button>
      <button v-else disabled="disabled" class="get-verification">
        sent({{ countDown }}s)
      </button>
    </section>
    <section class="edit-verification">
      <input type="tel" maxlength="8" placeholder="Captcha" v-model="code" />
    </section>
    <div class="btn-section">
      <el-button type="primary" @click="goTo('/me/profile')">return</el-button>
      <el-button type="danger" @click="submitEdit">edit</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { MessageBox } from "element-ui";
import { getPhoneCode, changeUserPhone } from "./../../../api/index";

export default {
  data() {
    return {
      phone: "",
      countDown: 0, // 倒计时
      code: "" // 验证码
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    // 验证手机号是否合理
    phoneRight() {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone);
    }
  },
  methods: {
    // 获取短信验证码
    async getVerifyCode() {
      // 1 开启倒计时
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

      // 2 获取短信验证码
      let result = await getPhoneCode(this.phone);
      console.log(result);

      // 3 获取验证码失败
      if (result.err_code === 0) {
        // prompt信息
        MessageBox({
          type: "info",
          message: result.message,
          showClose: true
        });

        // 其他处理
        clearInterval(this.intervalId);
        this.countDown = 0;
      } else if (result.success_code === 200) {
        MessageBox({
          type: "info",
          message: `The verification code is:${result.message}, The SMS function has not been activated yet. We apologize for the inconvenience caused to you`,
          showClose: true
        });
      }
    },
    goTo(path) {
      this.$router.push(path);
    },
    async submitEdit() {
      if (!this.phone) {
        this.$message("Mobile phone number cannot be empty!");
        return;
      }
      if (!this.code) {
        this.$message("The verification code cannot be empty!");
        return;
      }
      let result = await changeUserPhone(
        this.userInfo.id,
        this.phone,
        this.code
      );
      if (result.success_code === 200) {
        this.$message({
          message: result.message,
          type: "success"
        });
        this.$store.dispatch("getUserInfo", { user_id: this.userInfo.id });
        this.$router.push("/me/profile");
      } else {
        this.$message.error(result.message);
      }
    }
  }
};
</script>

<style scoped>
#edit-phone {
  padding-top: 10%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#edit-phone input {
  width: 100%;
  height: 100%;
  padding-left: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}
#edit-phone input:focus {
  border: 1px solid #409eff;
}
.edit-message {
  position: relative;
  width: 300px;
  height: 40px;
  font-size: 14px;
}
.get-verification {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}
.phone_right {
  color: rgb(64, 131, 255);
}
.edit-verification {
  position: relative;
  margin-top: 24px;
  width: 300px;
  height: 40px;
  font-size: 14px;
}
.btn-section {
  margin: 50px auto;
  width: 25%;

  display: flex;
  justify-content: space-between;
}
.btn-section .el-button {
  width: 100px;
  outline: none;
}
</style>
