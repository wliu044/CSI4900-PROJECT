<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="sui-icon icon-pc-right"></i>The product has been successfully added to the shopping cart!</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img v-lazy="cartInfoList[0].imgUrl" />
          </div>
          <div class="right-info">
            <p class="title">{{ cartInfoList[0].skuName }}</p>
            <p class="attr">
              {{ cartInfoList[0].skuName }} Quantity：{{ cartInfoList[0].skuNum }}
            </p>
          </div>
        </div>
        <div class="right-gocart">
          <router-link
            class="sui-btn btn-xlarge"
            :to="`/detail/${cartInfoList[0].skuId}`"
            >View product details
          </router-link>
          <router-link to="/ShopCart">Go to Cart Checkout > </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AddCartSuccess",
  mounted() {
    // 给服务器发请求获取购物车列表
    this.$store.dispatch("getShopCartList");
  },
  computed: {
    // 计算购物车列表
    ...mapGetters(["cartInfoList"]),
  },
};
</script>

<style lang="less" scoped>
.cart-complete-wrap {
  background-color: #f4f4f4;

  .cart-complete {
    width: 1200px;
    margin: 0 auto;

    h3 {
      font-weight: 400;
      font-size: 16px;
      color: #6aaf04;
      padding-top: 15px;
      padding-bottom: 15px;
      margin: 0;

      .icon-pc-right {
        background-color: #fff;
        border: 2px solid #6aaf04;
        padding: 3px;
        margin-right: 8px;
        border-radius: 15px;
      }
    }

    .goods {
      overflow: hidden;
      padding: 10px 0;

      .left-good {
        float: left;

        .left-pic {
          border: 1px solid #dfdfdf;
          width: 60px;
          float: left;
          img {
            width: 60px;
            height: 60px;
          }
        }

        .right-info {
          color: #444;
          float: left;
          margin-left: 10px;

          .title {
            width: 100%;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
          }

          .attr {
            color: #aaa;
          }
        }
      }

      .right-gocart {
        float: right;

        a {
          padding: 7px 36px;
          font-size: 15px;
          line-height: 22px;
          color: #333;
          background-color: #eee;
          text-decoration: none;
          box-sizing: border-box;
          border: 1px solid #e1e1e1;
        }

        a:hover {
          background-color: #f7f7f7;
          border: 1px solid #eaeaea;
        }

        a:active {
          background-color: #e1e1e1;
          border: 1px solid #d5d5d5;
        }

        .btn-danger {
          background-color: #e1251b;
          color: #fff;
        }

        .btn-danger:hover {
          background-color: #e1251b;
        }
      }
    }
  }
}
</style>
