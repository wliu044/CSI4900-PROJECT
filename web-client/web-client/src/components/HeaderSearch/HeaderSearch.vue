<template>
  <div class="header_container" ref="search">
    <section>
      <div @click="$router.push('/home')" class="header_img">
        <img src="../../common/img/logo-round.png" />
      </div>
      <div class="header_search">
        <div>
          <input type="text" placeholder="Search for Product Name" v-model="keywords" />
          <el-button
            type="danger"
            icon="el-icon-search"
            @click="postSearch"
          ></el-button>
        </div>
        <p>
          <a>The self-operated day is reduced</a>
          <a>VV women's clothing</a>
          <a>laptop</a>
          <a>E-books</a>
          <a>Limited-time flash deals</a>
        </p>
      </div>
      <div class="shopping_bag">
        <a @click.prevent="goShopCar"
          ><i class="el-icon-shopping-cart-2"></i>&nbsp;&nbsp;My Cart</a
        >
      </div>
    </section>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  props: ["visible"],
  data() {
    return {
      keywords: ""
    };
  },
  mounted() {
    console.log(this.visible);
    window.onscroll = e => {
      if (document.documentElement.scrollTop > 200) {
        this.$refs.search.classList.add("fixed");
        this.$emit("update:visible", true);
      } else {
        this.$refs.search.classList.remove("fixed");
        this.$emit("update:visible", false);
      }
    };
  },
  beforeDestroy() {
    window.onwheel = null;
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    goShopCar() {
      this.$router.push("/shopcar");
    },
    async postSearch() {
      if (this.keywords) {
        let keywords = this.keywords;
        this.$store.dispatch("reqSearch", { keywords });
        this.$router.push("/searchdetail");
      }
    }
  }
};
</script>

<style scoped>
@keyframes searchTop {
  0% {
    top: -50px;
  }
  100% {
    top: 0;
  }
}
/*头部Search区*/
.header_container {
  background: #fff;
  border-bottom: 1px solid #ddd;
}
.header_container.fixed {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  border-bottom: 2px solid #f10214;
  background-color: #fff;
  box-shadow: 2px 2px 2px rgb(0 0 0 / 20%);
  animation: searchTop 0.5s ease-in-out;
}
.header_container.fixed > section {
  height: 50px;
}
.header_container.fixed > section > .header_search > p {
  display: none;
}
.header_container.fixed > section > .header_search {
  margin-top: 0;
}
.header_container.fixed > section > .header_img {
  height: 50px;
  width: 50px;
}
.header_container > section {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  height: 140px;
  width: 1190px;
  margin: 10px auto;
}
/*商城标识图片区域*/
.header_container > section > .header_img {
  width: 100px;
  height: 100px;
  border: 1px solid darkgray;
  box-shadow: 2px 4px 15px rgba(45, 45, 45, 0.15);
  border-radius: 50%;
}
.header_img > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/*鼠标移入图片实现3d动画*/
.header_img:hover {
  transform-style: preserve-3d;
  transform: rotateY(360deg);
  transition: all 1500ms;
  -moz-transform-style: preserve-3d;
  -moz-transform: rotateY(45deg);
  -moz-transition: all 1500ms;
}
.header_search {
  margin-top: 45px;
}
.header_search div {
  display: flex;
  align-items: center;
}
.header_search input {
  padding-left: 10px;
  width: 490px;
  height: 35px;
  font-size: 14px;
  line-height: 35px;
  border: 2px solid #ff0236;
  border-right: none;
  outline: none;
}
.header_search button.el-button.el-button--danger {
  padding: 0;
  width: 60px;
  height: 35px;
  font-size: 18px;
  border-radius: 0;
  outline: none;
  background: #e1251b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header_search > p > a {
  display: inline-block;
  padding: 5px 10px;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.header_search > p > a:hover {
  color: red;
}
/*头部的购物车标记区域*/
.header_container > section > .shopping_bag {
  color: red;
  cursor: pointer;
  font-size: 14px;
  width: 130px;
  height: 34px;
  background-color: #fff;
  text-align: center;
  line-height: 34px;
  border-color: #eee;
  border: 1px solid #e3e4e5;
}
.shopping_bag > img {
  display: inline-block;
  margin-left: 5px;
  margin-top: 5px;
  width: 17px;
  height: 17px;
}
.shopping_bag > a {
  color: red;
}
</style>
