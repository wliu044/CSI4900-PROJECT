<template>
  <!--首页右侧微型购物车区域-->
  <div id="meg">
    <div class="meg_nav" @click="drawer = true">
      <div class="meg_shoppingbag">
        <img src="../../img/meg_showcar.png" />
        <p>Shopping Cart</p>
        <div>
          <span>{{ userInfo.id ? isNewCartgoods.length : 0 }}</span>
        </div>
      </div>
      <a class="meg_top" @click.stop="scrollToTop">
        <img src="../../img/meg_top.png" />
      </a>
    </div>
    <el-drawer
      :modal-append-to-body="false"
      title="Shopping Cart"
      :visible.sync="drawer"
      :direction="direction"
    >
      <div class="meg_show">
        <div class="toolbar_header">
          <div class="pro_Chk" @click="selectedAll(isSelectedAll)">
            <input id="pro_ChkAll" type="checkbox" :checked="isSelectedAll" />
            <label for="pro_ChkAll">Select All</label>
          </div>
          <a @click.prevent="goToShop">Full screen view</a>
        </div>
        <div class="meg_content" v-if="userInfo.id">
          <DrawerItem
            v-for="goods in isNewCartgoods"
            :key="goods.goods_id"
            :goods="goods"
            @computeShopCar="selectedAll(isSelectedAll)"
          />
        </div>
        <div class="meg_noLogin" v-else>Please log in first~</div>
        <div class="toolbar_footer">
          <div class="pro_total">
            <h3>
              <span>Selected</span>
              <strong class="total_count">{{ totalAmount }}</strong>
              <span>piece</span>
            </h3>
            <span>
              <strong class="total_price">{{ totalPrice }}</strong>
            </span>
          </div>
          <div class="pro_cashier">
            <el-button
              type="danger"
              @click="postIndent"
              :disabled="!totalAmount"
              >settle accounts</el-button
            >
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// 引入处理返回顶部的函数
import { animate } from "@/config/utils";
import { addGoodsToIndent } from "../../../../api";
import DrawerItem from "./children/DrawerItem";
import { mapState } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      totalPrice: 0,
      totalAmount: 0,
      currentDelGoods: [],
      isSelectedAll: false
    };
  },
  computed: {
    ...mapState(["userInfo", "cartgoods"]),
    isNewCartgoods() {
      return this.cartgoods.filter(item => item.is_pay !== "1");
    }
  },
  mounted() {},
  methods: {
    scrollToTop() {
      // 做缓动动画返回顶部
      let docB = document.documentElement || document.body;
      animate(docB, { scrollTop: "0" }, 400, "ease-out");
    },
    async postIndent() {
      try {
        let user_name = this.userInfo.user_name;
        let user_id = this.userInfo.id;
        this.currentDelGoods = this.isNewCartgoods.filter(item => item.checked);
        await addGoodsToIndent(this.currentDelGoods, user_name, user_id);
        await this.$store.dispatch("reqCartsGoods", { user_id });
        // this.$store.dispatch("delPatchGoods", {
        //   goods: this.currentDelGoods,
        //   user_id
        // });
        this.getAllGoodsPrice();
        this.hasSelectedAll();
        MessageBox({
          type: "success",
          message: "Product settlement succeeded, you can jump to the order page to view",
          showClose: true
        });
        // setTimeout(() => {
        //   this.$router.push("/indent");
        // }, 3000);
      } catch (error) {}
    },
    goToShop() {
      this.$emit("goShopCar");
    },
    // 1.更新单个商品数量
    updateGoodsCount(goods, count) {
      let user_id = this.userInfo.id;
      this.$store.dispatch("updateGoodsCount", { goods, count, user_id });
      this.getAllGoodsPrice();
    },
    // 2.是否选中所有商品
    selectedAll(isSelectedAll) {
      this.isSelectedAll = !isSelectedAll;
      this.$store.dispatch("selectedAll", { isSelectedAll });
      this.hasSelectedAll();
      this.getAllGoodsPrice();
    },
    // 3.计算商品总价
    getAllGoodsPrice() {
      let totalPrice = 0;
      this.isNewCartgoods.forEach((goods, index) => {
        if (goods.checked) {
          totalPrice += (goods.price / 100) * goods.buy_count;
        }
      });
      this.totalPrice = totalPrice;
    },
    // 4.单个商品的选中与否
    singleSelected(goods) {
      this.$store.dispatch("singleSelected", { goods });
      this.hasSelectedAll();
      this.getAllGoodsPrice();
    },
    // 5.判断是否全选
    hasSelectedAll() {
      let flag = true;
      let totalNum = 0;
      this.isNewCartgoods.forEach((goods, index) => {
        if (!goods.checked) {
          flag = false;
        } else {
          totalNum += 1;
        }
      });
      this.totalAmount = totalNum;
      this.isSelectedAll = flag;
    },
    // 6.删除单个商品
    clickTrash(goods) {
      this.$confirm("Are you sure to delete this product?", "prompt", {
        confirmButtonText: "Are you sure?",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          let user_id = this.userInfo.id;
          this.currentDelGoods = goods;
          this.$store.dispatch("delSingleGoods", { goods, user_id });
          this.getAllGoodsPrice();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Deleted"
          });
        });
    },
    // 7.删除所有商品
    emptyCart() {
      this.$confirm("Are you sure you want to delete all products?", "prompt", {
        confirmButtonText:  "Are you sure?",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          let user_id = this.userInfo.id;
          this.$store.dispatch("delAllGoods", { user_id });
          this.getAllGoodsPrice();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Deleted"
          });
        });
    }
  },
  components: {
    DrawerItem
  }
};
</script>

<style scoped>
/*首页的右侧固定栏，查看购物车详情*/
#meg {
  position: fixed;
  right: 0px;
  top: 0;
  height: 100%;
  width: 35px;
  cursor: pointer;
}
#meg > .meg_nav {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000000;
}
.meg_nav > .meg_shoppingbag {
  margin-top: 100px;
  width: 100%;
  height: 135px;
}
.meg_shoppingbag > img {
  width: 35px;
  height: 35px;
}
.meg_shoppingbag > p {
  margin: 5px auto;
  width: 16px;
  height: 48px;
  line-height: 16px;
  text-align: center;
  color: white;
}
.meg_shoppingbag > div {
  margin: 10px auto;
  width: 18px;
  height: 18px;
}
.meg_shoppingbag > div > span {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 50%;
  background: #ff0018;
  color: white;
  text-align: center;
  font-size: 14px;
}
.meg_nav > .meg_top {
  display: block;
  position: absolute;
  bottom: 50px;
  width: 100%;
  height: 30px;
  cursor: pointer;
}
.meg_show > .toolbar_header {
  margin-bottom: 10px;
  width: 100%;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.meg_show .toolbar_header .pro_Chk {
  padding-left: 10px;
  width: 60px;

  display: flex;
  align-items: center;
}
.pro_Chk #pro_ChkAll {
  width: 12px;
  height: 12px;
}
.pro_Chk label {
  margin-left: 5px;
  margin-bottom: 0;
  font-size: 12px;
  color: gray;
  cursor: pointer;
}
.meg_show .toolbar_header a {
  width: 60px;
  font-size: 12px;
  color: gray;
  cursor: pointer;
}
.toolbar_footer {
  position: absolute;
  bottom: 0;
  padding: 0 16px;
  width: 100%;
  background: #eaeaea;
  z-index: 99999;
}
.toolbar_footer > .pro_total {
  width: 100%;
  height: 30px;
  background: #eceaea;
  color: #333;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pro_total > h3 {
  margin-bottom: 0;
  color: #000;
  font-weight: 400;
  font-size: 12px;
}
.pro_total > span > .total_price {
  font-weight: 600;
  color: #ff0036;
  font-size: 12px;
}
.pro_cashier {
  padding: 0 0 10px;
  width: 100%;
  text-align: center;
}
.pro_cashier button {
  width: 160px;
}
.meg_content {
  padding-bottom: 80px;
  width: 100%;
  overflow: auto;
}
.meg_noLogin {
  height: 100%;
  text-align: center;
  vertical-align: middle;
  color: #666;
}
</style>
