<template>
  <div id="shopcar">
    <div id="content">
      <div class="header">
        <img
          @click="$router.push('/home')"
          src="./../../common/img/logo-round.png"
          class="header_logo"
        />
        <span>My Order</span>
      </div>
      <div class="cont_title">
        <span>All orders</span>
        <!-- <span>待付款</span> -->
        <!-- <span>待收货</span> -->
      </div>
      <div class="pro_box" v-if="Object.keys(indents).length">
        <div v-for="(goods, index) of indents" :key="+new Date(index)">
          <div style="padding: 10px 0">Order placement time:{{ dayjs(index).format('YYYY-MM-DD hh:mm') }}</div>

          <div class="goods">
            <div class="cont_op">
              <div>Order Details</div>
              <div>quantity</div>
              <div>consignee</div>
              <div>unit-price</div>
              <div>amount of money</div>
              <div style="width: 60px">operate</div>
            </div>

            <div v-for="item in goods" :key="item.goods_id">
              <ul class="item_content">
                <li class="td td-item" @click="$router.push('/goods/' + item.goods_id)">
                  <div class="td-item-pic">
                    <img :src="item.thumb_url" />
                  </div>
                  <div class="td-item-info">{{ item.goods_name }}</div>
                </li>
                <li class="td" style="width: 80px">{{ item.buy_count }}</li>
                <li
                  class="td"
                  style="width: 100px;text-overflow: ellipsis;white-space: nowrap;overflow:hidden"
                >
                  {{ item.user_name }}
                </li>
                <li class="td td-price" style="width: 80px">
                  <strong>{{ (item.price / 100) | moneyFormat }}</strong>
                </li>

                <li class="td td-sum" style="width: 80px">
                  <strong>{{
                    ((item.buy_count * item.price) / 100) | moneyFormat
                  }}</strong>
                </li>
                <li class="td td-op"><a @click="clickTrash(item)">Buy Again</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="pro_box" v-else>There are no orders yet. Go shopping!</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { MessageBox } from "element-ui";
import dayjs from 'dayjs'
import {  addGoodsToCart } from "./../../api/index";
export default {
  data() {
    return {
      shopsNum: [],
      isSelectedAll: false,
      totalPrice: 0, // 商品总价
      currentDelGoods: {}, // 当前删除的商品
      totalAmount: 0,
      dayjs
    };
  },
  computed: {
    ...mapState(["userInfo", "indents"])
  },
  mounted() {
    let user_id = this.userInfo.id;
    // 请求商品数据
    if (user_id) this.$store.dispatch("reqIndentGoods", { user_id });
  },
  methods: {
    async clickTrash(goods ) {
      if (this.userInfo.user_name) {
        let result = await addGoodsToCart(
          this.userInfo.id,
          goods.goods_id,
          goods.short_name,
          goods.thumb_url,
          goods.price,
          this.shopNum,
          goods.counts,
          goods.category
        );
        if (result.success_code === 200) {
          let user_id = this.userInfo.id;
          // 请求商品数据
          this.$store.dispatch("reqCartsGoods", { user_id });
          this.shopNum = 1;
          this.$router.push('/shopcar')
        }
      }
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
.cont_op {
  width: 952px;
  margin: 0 auto;
  height: 40px;
  display: flex;
  justify-content: space-around;
}
.cont_op > div {
  line-height: 40px;
}
.cont_op > div:nth-child(1) {
  width: 180px;
  text-align: center;
}
.cont_op > div:nth-child(2) {
  width: 80px;
}
.cont_op > div:nth-child(3) {
  width: 100px;
}
.cont_op > div:nth-child(4) {
  width: 80px;
}
.cont_op > div:nth-child(5) {
  width: 80px;
}
.cont_op > div:nth-child(5) {
  width: 80px;
}
#content > .pro_box {
  margin: 0 auto;
  width: 80%;
}
.pro_box  .goods {
  background: #fcfcfc;
  width: 100%;
  border: 1px solid #cccccc;
}
.cont_op ~ div > .item_content {
  padding: 15px 0;
  list-style: none;

  display: flex;
  justify-content: space-around;
}
.item_content > .td-item {
  width: 180px;
  position: relative;
  cursor: pointer;
}
.td-item:hover .td-item-info {
  color: #f22d00;
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
  width: 80px;
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
