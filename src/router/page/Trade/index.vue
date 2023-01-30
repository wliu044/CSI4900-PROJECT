<template>
  <div class="trade-container">
    <h3 class="title">Fill in and check the order information</h3>
    <div class="content">
      <h5 class="receive">Recipient Information</h5>

      <div
        class="address clearFix"
        v-for="(info, index) in userAddress"
        :key="info.id"
        @click="changDefaultAddress(info, userAddress)"
      >
        <span class="username" :class="{ selected: info.isDefault == 1 }">{{
          info.consignee
        }}</span>
        <p>
          <span class="s1">{{ info.userAddress }}</span>
          <span class="s2">{{ info.phoneNum }}</span>
          <span class="s3" v-show="info.isDefault == 1">Default Address</span>
        </p>
      </div>

      <div class="line"></div>
      <h5 class="pay">Payment Method</h5>
      <div class="address clearFix">
        <span class="username selected">Online Payment</span>
        <span class="username" style="margin-left: 5px">Payment on delivery</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">Delivery list</h5>
      <div class="way">
        <h5>Delivery method</h5>
        <div class="info clearFix">
          <span class="s1">Daily Express</span>
          <p>Delivery time: expected to be delivered on August 10 (Wednesday) 09:00-15:00</p>
        </div>
      </div>
      <div class="detail">
        <h5>Product List</h5>
        <ul
          class="list clearFix"
          v-for="(shopInfo, index) in userShopInfo"
          :key="shopInfo.id"
        >
          <li>
            <img :src="shopInfo.imgUrl" alt="" />
          </li>
          <li>
            <p>
              {{ shopInfo.skuName }}
            </p>
            <h4>7 days no reason to return the goods</h4>
          </li>
          <li>
            <h3>CAD{{ shopInfo.orderPrice }}.00</h3>
          </li>
          <li>X{{ shopInfo.skuNum }}</li>
          <li>Available</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>Buyer Message：</h5>
        <textarea
          placeholder="It is recommended to communicate with the merchant to confirm before leaving a message"
          class="remarks-cont"
          v-model="value"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>Invoice Information：</h5>
        <div>General Invoice (Electronic) Personal Details</div>
        <h5>Use of offers/credits</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{userShopInfo.length}}</i>product, total product amount</b>
          <span>CAD{{payMoney}}.00</span>
        </li>
        <li>
          <b>Cashback：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>Shipping Fee：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">Amount Payable:　<span>CAD{{payMoney}}.00</span></div>
      <div class="receiveInfo">
        Send to :
        <span>{{ userSendInfo.userAddress }}</span>
        Consignee：<span>{{ userSendInfo.consignee }}</span>
        <span>{{ userSendInfo.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submit">Submit order</a>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      // 收集买家留言
      value:''
    }
  },
  mounted() {
    
    this.$store.dispatch("getShopInfo");
    // 如果仓库中没有用户地址那就执行模拟地址请求
    if(this.$store.state.Trade.userAddress){
      this.$store.dispatch('getMockAddress')
    }
  },

  computed: {
    ...mapState({
      userAddress: (state) => state.Trade.userAddress,
      submitOrder:(state) =>state.Trade.submitOrder
    }),
    ...mapGetters(['userShopInfo']),
    // 计算点击的默认信息在寄送至哪显示
    userSendInfo() {
      return this.userAddress.find((item) => item.isDefault == 1)
        ? this.userAddress.find((item) => item.isDefault == 1)
        : {};
    },
    // 计算要支付多少价格
    payMoney(){
      let sum = 0
      this.userShopInfo.forEach(item=>{
       sum += item.orderPrice*item.skuNum
      })
      return sum
    }
  },
  methods: {
    // 修改默认地址
    changDefaultAddress(info, userAddress) {
      // 排他思想
      userAddress.forEach((item) => {
        item.isDefault = 0;
      });
      info.isDefault = 1;
    },
    // 提交订单
   async submit(){
      
     let {tradeNo} = this.submitOrder
     let data = {
      consignee:this.userSendInfo.consignee,
      consigneeTel:this.userSendInfo.phoneNum,
      deliveryAddress:this.userSendInfo.userAddress,
      payMentWay:'ONLINE',
      orderComment:this.value,
      orderDetailList:this.userShopInfo
     }
   let res = await this.$API.reqSubmitOrder(tradeNo,data)
  
   if(res.data.code == 200){
    let orderId = res.data.data 
     this.$router.push('/pay?orderId='+orderId)
   }
  
    
    }
  },

};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;
          img {
            width: 82px;
            height: 82px;
          }
          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>
