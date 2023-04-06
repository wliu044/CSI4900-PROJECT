<template>
  <div class="header_nav">
    <div>
      <div>
        <p>Hi~ Welcome to the VV Mall</p>
      </div>
      <ul>
        <li v-if="!userInfo.id">
          <a @click="$router.push('/login')">Hello, please log in</a>
          <a @click="$router.push('/login')">Sign up for free</a>
        </li>
        <li v-else>
          <a v-if="userInfo.user_nickname">Hello,{{ userInfo.user_nickname }}</a>
          <a v-else>Hello,{{ userInfo.user_name | nameFormat }}</a>
          <a @click="headerLogout">logout</a>
        </li>
        <li v-if="this.$route.path.indexOf('/home') === -1">
          <a @click="$router.push('/home')">Return to the home page</a>
        </li>
        <li><a @click.prevent="goMe">Personal Center</a></li>
        <li><a @click.prevent="goShopCar">My Cart</a></li>
        <li><a @click.prevent="goIndent">My Orders</a></li>
        <li><a @click.prevent="goAdmin">Administrator channel</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { MessageBox } from "element-ui";
// 引入三级联动的城市数据

export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["logOut"]),

    handleAreaChange(value) {
      //console.log(this.selectedOptions);
    },
    headerLogout() {
      this.$confirm("Are you sure you sign out?", "prompt", {
        confirmButtonText: "Are you sure",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "Exit successful!"
          });
          let result = this.logOut({});
          window.sessionStorage.removeItem("userInfo");
          this.$router.push('/home')
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Canceled exit"
          });
        });
    },
    goMe() {
      if (this.userInfo.id) {
        this.$router.push("/me");
      } else {
        MessageBox({
          type: "info",
          message: "Please log in first!",
          showClose: true
        });
      }
    },
    goAdmin() {
      let result = window.sessionStorage.getItem("adminInfo");
      if (result) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/adminlogin");
      }
    },
    goShopCar() {
      if (this.userInfo.id) {
        this.$router.push("/shopcar");
      } else {
        MessageBox({
          type: "info",
          message: "Please log in first!",
          showClose: true
        });
      }
    },
    goIndent() {
      if (this.userInfo.id) {
        this.$router.push("/indent");
      } else {
        MessageBox({
          type: "info",
          message: "Please log in first!",
          showClose: true
        });
      }
    }
  }
};
</script>

<style scoped>
/*头部导航*/
.header_nav {
  width: 100%;
  height: 30px;
  background: #f2f2f2;
  font-family: "Microsoft YaHei";
}
.header_nav > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1190px;
  margin: 0 auto;
}
.header_nav > div > div {
  display: flex;
  align-items: center;
}
.header_nav > div > div p {
  margin: 0 30px 0 20px;
  color: #999;
  font-size: 15px;
}
.locationWrapper {
  position: relative;
  max-width: 100px;

  display: flex;
  align-items: center;
}
.locationWrapper .el-cascader {
  position: absolute;
  opacity: 0;
}
.locationWrapper .address {
  max-width: 58px;
  font-size: 12px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.locationWrapper .icon {
  margin: 0 3px;
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
.locationWrapper .icon path {
  fill: #dd6161;
}
.header_nav > div > ul {
  margin: 0 50px;
  list-style: none;

  display: flex;
  align-items: center;
}
.header_nav > div > ul > li:first-child {
  font-size: 14px;
  color: red;
  line-height: 20px;
  cursor: pointer;
}
.header_nav > div > ul > li > a {
  display: inline-block;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 20px;
  color: #999;
  text-decoration: none;
  cursor: pointer;
}
.header_nav > div > ul > li > a:hover {
  color: red;
}
.header_nav > div > ul > li:first-child > a:nth-child(2) {
  padding-left: 0;
  color: red;
}
</style>
