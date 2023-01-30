<template>
  <header class="header">
    <!-- First line of the header -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>Welcome!</p>
          <p v-if="!userInfo.loginName">
            <router-link to="/login">Please login</router-link>
            <span>|</span>
            <router-link to="/register" class="register">Free Registration</router-link>
          </p>
          <p v-else>
            <a >Dear user{{ userInfo.loginName }}</a>
             <span>|</span>
            <a  @click="logout">Logout</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">My Order</router-link>
          <!-- <router-link to="/ShopCart">My Shopping Cart</router-link> -->
          <a href="###">My Shopping Cart</a>
          <a href="###">My 尚品汇</a>
          <a href="###">My Membership</a>
          <a href="###">Corporate Sourcing</a>
          <a href="###">Follow尚品汇</a>
          <a href="###">Cooperation Investment</a>
          <a href="###">Merchant Back Office</a>
        </div>
      </div>
    </div>
    <!--Second row of the header Search area-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button class="sui-btn btn-xlarge btn-danger" @click="goSearch">
            Search
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      // 给路由器传参数，参数值为keyword
        const location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
      // 如果路由里面有params参数就把参数合并到location中
      if (this.$route.query) {
        location.query = this.$route.query;
      }
      console.log(location);
      this.$router.push(location) ;
    },
    // 退出登入的操作
   async logout(){
    try {
    await this.$store.dispatch('logout')
      this.$router.push('/home')
    } catch (error) {
      alert(error.message)
    }
    }

  },
  mounted() {
    // 全局事件总线清除关键字
    this.$bus.$on("clearHeaderKeyword", () => {
      this.keyword = "";
    });
  },
  computed: {
    ...mapState({ userInfo: (state) => state.Login.userInfo }),
    // 计算仓库中有没有token属性
        ...mapState({
      token: (state) => state.Login.data.token
    }),
  },
  watch: {
    // 监视仓库中token属性的变化，监视第一次登入获取用户信息，退出登入是将搜搜框关键字清空
    token(newVal, oldVal) {
      this.keyword = ''
     if(newVal){
       this.$store.dispatch('getUserInfo')
     }
    }
  }
};
</script>

<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;
          span{
            margin-left: 5px;
          }
          a:last-child{
            margin-left:5px;
          }
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
