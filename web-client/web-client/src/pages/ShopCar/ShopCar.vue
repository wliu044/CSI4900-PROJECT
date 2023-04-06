<template>
  <div id="shopcar">
    <div id="content">
      <div class="header">
        <img
          @click="$router.push('/home')"
          src="./../../common/img/logo-round.png"
          class="header_logo"
        />
        <span>Shopping Cart</span>
      </div>
      <div class="cont_title">
        <span>All items</span>
      </div>
      <div class="cont_op">
        <div class="con_selet" @click="selectedAll(isSelectedAll)">
          <input
            type="checkbox"
            class="con_selectAll"
            :checked="isSelectedAll"
          />
          <label for="con_selectAll">Select All</label>
        </div>
        <div>Product Information</div>
        <div>Unit-price</div>
        <div>Quantity</div>
        <div>Amount of money</div>
        <div>Operate</div>
      </div>
      <div class="pro_box" v-if="isNewCartgoods.length">
        <div class="goods" v-for="(goods, index) in isNewCartgoods" :key="index">
          <ul class="item_content">
            <li class="td td-chk">
              <div>
                <input
                  type="checkbox"
                  class="checkBox"
                  :checked="goods.checked"
                  @click="singleSelected(goods)"
                />
              </div>
            </li>
            <li class="td td-item">
              <div class="td-item-pic">
                <img :src="goods.thumb_url" />
              </div>
              <div class="td-item-info">{{ goods.goods_name }}</div>
            </li>
            <li class="td td-price">
              <strong>{{ (goods.price / 100) | moneyFormat }}</strong>
            </li>
            <li class="td td-amount">
              <div class="item-amout">
                <el-input-number
                  v-model="goods.buy_count"
                  :min="1"
                  :max="goods.counts"
                  @change="updateGoodsCount(goods, goods.buy_count)"
                ></el-input-number>
              </div>
            </li>
            <li class="td td-sum">
              <strong>{{
                ((goods.buy_count * goods.price) / 100) | moneyFormat
              }}</strong>
            </li>
            <li class="td td-op"><a @click="clickTrash(goods)">delete</a></li>
          </ul>
        </div>
      </div>
      <div class="pro_box" v-else>The shopping cart is empty</div>
    </div>
    <div id="footer">
      <div class="foot_select">
        <input
          type="checkbox"
          class="foot_selectAll"
          name="foot_selectAll"
          :checked="isSelectedAll"
          @click.stop="selectedAll(isSelectedAll)"
        />
        <label for="foot_selectAll">Select All</label>
      </div>
      <div class="foot_op">
        <a class="foot_remove" @click.prevent="emptyCart">Clear shopping car</a>
      </div>
      <div class="foot_total">
        <div class="amout-sum">
          <span class="txt">Selected item</span>
          <strong id="selected_amout">{{ totalAmount }}</strong>
          <span class="txt">piece</span>
        </div>
        <div class="price-sum">
          <span class="txt">Total (excluding shipping):</span>
          <strong class="selected_price">{{
            totalPrice | moneyFormat(totalPrice)
          }}</strong>
        </div>
        <div class="btn-area">
          <a
            class="btn-sumbit"
            @click="postIndent"
            :class="{ 'btn-allow': totalAmount }"
            >Settlement</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { MessageBox } from "element-ui";
import { addGoodsToIndent } from "../../api";

export default {
  data() {
    return {
      shopsNum: [],
      isSelectedAll: false,
      totalPrice: 0, // 商品总价
      currentDelGoods: {}, // 当前删除的商品
      totalAmount: 0
    };
  },
  computed: {
    ...mapState(["userInfo", "cartgoods"]),
    isNewCartgoods() {
      return this.cartgoods.filter(item => item.is_pay !== '1')
    }
  },
  mounted() {
    let user_id = this.userInfo.id;
    // 请求商品数据
    if (user_id) this.$store.dispatch("reqCartsGoods", { user_id });
  },
  methods: {
    async postIndent() {
      if (this.totalAmount) return 
      try {
        let user_name = this.userInfo.user_name;
        let user_id = this.userInfo.id;
        this.currentDelGoods = this.isNewCartgoods.filter(item => item.checked)
        await addGoodsToIndent(this.currentDelGoods, user_name, user_id);
        await  this.$store.dispatch("reqCartsGoods", { user_id });
        // this.$store.dispatch("delPatchGoods", {
        //   goods: this.currentDelGoods,
        //   user_id
        // });
        this.getAllGoodsPrice();
        this.hasSelectedAll()
        MessageBox({
          type: "success",
          message: "If the product settlement is successful, you can jump to the order page to view",
          showClose: true
        });
        // setTimeout(() => {
        //   this.$router.push("/indent");
        // }, 3000);
      } catch (error) {}
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
      this.$confirm("Are you sure you want to delete the item?", "prompt", {
        confirmButtonText: "Are you sure ",
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
            message: "The deletion has been canceled"
          });
        });
    },
    // 7.删除所有商品
    emptyCart() {
      this.$confirm("Are you sure to delete all products?", "prompt", {
        confirmButtonText: "Are you sure ",
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
            message: "The deletion has been canceled"
          });
        });
    }
  }
};
</script>

<style scoped>
#shopcar {
  width: 1190px;
  margin: 30px auto;
}
#content > .header {
  width: 100%;
  height: 90px;
  margin-top: 10px;
  position: relative;
}
.header > img {
  width: 80px;
  height: 80px;
  border: 1px solid gray;
  border-radius: 50%;
  cursor: pointer;
}
.header > span {
  display: inline-block;
  font-size: 25px;
  height: 35px;
  font-weight: 700;
  position: absolute;
  top: 30%;
  margin-left: 20px;
  cursor: pointer;
}
#content > .cont_title {
  margin: 10px auto;
  width: 80%;
  height: 35px;
  border-bottom: 2px solid #e6e6e6;
}
.cont_title > span {
  display: inline-block;
  font-weight: 700;
  font-size: 17px;
  height: 100%;
  width: 100px;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  color: #f40;
  border-bottom: 2px solid #f40;
}
#content > .cont_op {
  width: 80%;
  margin: 0 auto;
  height: 40px;
  display: flex;
  justify-content: space-around;
}
.cont_op > div {
  line-height: 40px;
}
.cont_op > div:nth-child(2) {
  width: 120px;
}
#content > .pro_box {
  margin: 0 auto;
  width: 80%;
}
.pro_box > .goods {
  background: #fcfcfc;
  width: 100%;
  height: 130px;
  border: 1px solid #cccccc;
}
.goods > .item_content {
  padding: 15px;
  list-style: none;

  display: flex;
  justify-content: space-around;
}
.item_content > .td-item {
  width: 180px;
  position: relative;
}
.td-item > div {
  display: inline-block;
}
.td-item > .td-item-pic > img {
  width: 80px;
  height: 80px;
}
.td-item > .td-item-info {
  position: absolute;
  width: 80px;
  line-height: 15px;
  font-size: 12px;
  top: 0;
  margin-left: 20px;
}
.item_content > .td-sum {
  color: #f40;
}
.td-amount > .item-amout {
  height: 25px;
}
.item-amout a {
  display: inline-block;
  height: 23px;
  width: 17px;
  border: 1px solid #e5e5e5;
  background: #f0f0f0;
  text-align: center;
  line-height: 23px;
  color: #444;
  cursor: pointer;
}
.item-amout a:hover {
  color: #f50;
  border-color: #f60;
}
.item-amout > .text_amount {
  width: 40px;
  height: 20px;
  text-align: center;
  display: inline-block;
}
.td-op a {
  color: black;
}
.td-op a:hover {
  cursor: pointer;
  color: #f40;
}
#footer {
  width: 1190px;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #e5e5e5;
  z-index: 9999;
}
#footer div {
  display: inline-block;
}
#footer > .foot_select {
  width: 50px;
  height: 50px;
  line-height: 50px;
  padding-left: 5px;
  cursor: pointer;
  font-size: 14px;
}
.foot_select input,
.foot_select label {
  cursor: pointer;
}
.foot_op {
  line-height: 50px;
  height: 50px;
}
.foot_op > .foot_remove {
  margin-left: 25px;
  font-size: 14px;
  cursor: pointer;
}
.foot_remove:hover {
  color: #f40;
}
.foot_total {
  float: right;
}
.foot_total > .amout-sum {
  cursor: pointer;
  height: 50px;
  color: #3c3c3c;
}
.foot_total .txt {
  line-height: 50px;
  font-size: 14px;
}
.amout-sum > #selected_amout {
  padding: 0 5px;
  color: #f40;
  font-weight: 700;
  font-size: 18px;
}
.price-sum {
  margin-left: 50px;
}
.price-sum > .selected_price {
  color: #f40;
  font-weight: 700;
  font-size: 20px;
  line-height: 50px;
}
.btn-area > .btn-sumbit {
  display: inline-block;
  background: #b0b0b0;
  color: #fff;
  border-left: 1px solid #e7e7e7;
  width: 119px;
  height: 50px;
  cursor: not-allowed;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
}
.btn-area > .btn-sumbit.btn-allow {
  background: #f22d00;
  cursor: pointer;
}
</style>
