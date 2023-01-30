<template>
  <div class="cart">
    <h4>All Products</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">All</div>
        <div class="cart-th2">Commodities</div>
        <div class="cart-th3">Unit price</div>
        <div class="cart-th4">Quantity</div>
        <div class="cart-th5">Subtotal</div>
        <div class="cart-th6">Operation</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @change="changeChecked(cartInfo, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handle('minus', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handle('change', $event.target.value, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handle('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cartInfo)"
              >Delete</a
            >
            <br />
            <a href="#none">Move to Favorites</a>
          </li>
        </ul>
        <h2 v-if="!cartInfoList.length" style="margin-left: 450px;">It's empty! Add what you want to your cart now!</h2>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length != 0"
          @change="changeAllChecked($event.target.checked)"
        />
        <span>Select All</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">Delete selected items</a>
        <a href="#none">Move to my followers</a>
        <a href="#none">Clear off-counter items</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          Selected <span>{{ selected }}</span
          >Products
        </div>
        <div class="sumprice">
          <em>Total price (including shipping) ：</em>
          <i class="summoney">{{ checkedSumMoney }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="getAddress">Settlement</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入lodash节流函数
import throttle from "lodash/throttle";

import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("getShopCartList");
    this.$bus.$on("deletePayedShop", (userShopInfo) => {
      if (userShopInfo) {
        this.deleteAllChecked();
      }
    });
  },
  methods: {
    // type是区分点击的是加还是减还是直接修改里面的值,使用lodash节流
    handle: throttle(async function (type, changeValue, cartInfo) {
      switch (type) {
        case "add":
          changeValue = 1;
          break;
        case "minus":
          changeValue = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(changeValue * 1) || changeValue <= 1) {
            changeValue = 0;
          } else {
            changeValue = parseInt(changeValue) - cartInfo.skuNum;
          }
          break;
      }
      let params = { goodsId: cartInfo.skuId, goodsNum: changeValue };
      try {
        await this.$store.dispatch("addSendShoppingCart", params);

        this.$store.dispatch("getShopCartList");
      } catch (error) {
        alert("Failure to modify data");
      }
    }, 1000),
    // 删除购物车某一个物品的操作
    async deleteCartById(cartInfo) {
      console.log(cartInfo);
      try {
        // 如果成功就发送删除请求，然后重新发送购物车数据请求
        await this.$store.dispatch("deleteCartById", cartInfo.skuId);
        this.$store.dispatch("getShopCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改购物车勾选操作
    async changeChecked(cartInfo, checked) {
      let isChecked = 1;
      const skuId = cartInfo.skuId;
      // 如果checked是真就把isChecked赋值为1，否则赋值为0给服务器带过去
      if (checked) {
        isChecked = 1;
      } else {
        isChecked = 0;
      }

      try {
        await this.$store.dispatch("updateCartCheckedById", {
          skuId,
          isChecked,
        });
        this.$store.dispatch("getShopCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改全选的操作
    async changeAllChecked(checked) {
      try {
        if (checked) {
          checked = 1;
        } else {
          checked = 0;
        }
        await this.$store.dispatch("changeAllChecked", checked);
        this.$store.dispatch("getShopCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除所选的所有商品
    async deleteAllChecked() {
      try {
        await this.$store.dispatch("deleteAllChecked");
        this.$store.dispatch("getShopCartList");
      } catch (error) {}
    },
    // 点击向服务器发送请求获取地址
    async getAddress() {
      try {
        let res = await this.$store.dispatch("getUserAddress");
        this.$router.push("/trade");
      } catch (error) {
        alert(error.message);
      }
    },
  },

  computed: {
    ...mapGetters(["cartInfoList"]),
    //计算购物车中已选的商品总价格
    checkedSumMoney() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    },
    // 计算购物车中已选几件商品
    selected() {
      let num = 0;
      this.$store.getters.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          num++;
        }
      });
      return num;
    },
    // 总价格
    sumMoney() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //  全选复选框
    isAllChecked() {
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .item-txt {
          text-align: center;
        }
      }

      .cart-list-con4 {
        width: 10%;
      }

      .cart-list-con5 {
        width: 17%;

        .mins {
          border: 1px solid #ddd;
          border-right: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }

        input {
          border: 1px solid #ddd;
          width: 40px;
          height: 33px;
          float: left;
          text-align: center;
          font-size: 14px;
        }

        .plus {
          border: 1px solid #ddd;
          border-left: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }
      }

      .cart-list-con6 {
        width: 10%;

        .sum {
          font-size: 16px;
        }
      }

      .cart-list-con7 {
        width: 13%;

        a {
          color: #666;
        }
      }
    }
  }
}

.cart-tool {
  overflow: hidden;
  border: 1px solid #ddd;

  .select-all {
    padding: 10px;
    overflow: hidden;
    float: left;

    span {
      vertical-align: middle;
    }

    input {
      vertical-align: middle;
    }
  }

  .option {
    padding: 10px;
    overflow: hidden;
    float: left;

    a {
      float: left;
      padding: 0 10px;
      color: #666;
    }
  }

  .money-box {
    float: right;

    .chosed {
      line-height: 26px;
      float: left;
      padding: 0 10px;
    }

    .sumprice {
      width: 200px;
      line-height: 22px;
      float: left;
      padding: 0 10px;

      .summoney {
        color: #c81623;
        font-size: 16px;
      }
    }

    .sumbtn {
      float: right;

      a {
        display: block;
        position: relative;
        width: 96px;
        height: 52px;
        line-height: 52px;
        color: #fff;
        text-align: center;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        background: #e1251b;
        overflow: hidden;
      }
    }
  }
}
</style>
