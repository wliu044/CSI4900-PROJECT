<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >Order submitted successfully, please pay in time so that we can ship your order as soon as possible~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >Please complete payment<em class="orange time">within 4 hours</em
            >of submitting your order, orders will be automatically cancelled after that time. Order number：<em>{{
              data.orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">Amount Payable：</em
            ><em class="orange money">CAD{{ data.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>Important Notes：</h4>
        <ol>
          <li>
            The merchant payment platform currently supports<span class="zfb">Paypal</span>Payment Method.
          </li>
          <li>Other payment channels are being debugged, so stay tuned.</li>
          <li>To ensure that the payment process for your purchase is completed smoothly, please save the following Paypal information.</li>
        </ol>
        <h4>
          Paypal account information:（Very important，<span class="save">Please save!!!</span>）
        </h4>
        <ul>
          <li>Payment account number: 11111111</li>
          <li>Password：111111</li>
          <li>Payment Password：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>Payment Platforms</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>Payment Internet Banking</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <el-button type="text" class="btn" @click="open">Pay Now</el-button>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>Other payment methods</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">WeChat Payment</a></span>
            <span>UnionPay</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      // 存储请求成功后返回来的数据
      data: {},
      // 用于存储支付时的定时器
      timer: "",
      // 用于存储支付成功服务器返回来的值
      code: "",
    };
  },
  mounted() {
    // 挂载完毕向服务器发请求获取支付信息
    if (!this.data.orderId) {
      this.getPayInfo();
    }
  },
  methods: {
    // 获取支付信息的接口
    async getPayInfo() {
      let res = await this.$API.reqPayInfo(this.$route.query.orderId);
      if (res.data.code == 200) {
        this.data = res.data.data;
      } else {
        alert("No duplicate orders can be submitted");
      }
    },
    // 饿了么ui
    async open() {
      // 生成二维码
      let url = await QRCode.toDataURL(this.data.codeUrl);
      this.$alert(`<img src=${url} />`, "WeChat Payment", {
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        center: true,
        roundButton: true,
        showClose: false,
        cancelButtonText: "Payment encounters problems",
        confirmButtonText: "Already paid",
        beforeClose: (type, instance, done) => {
          // 如果用户点击取消支付就清除定时器,并关闭
          if (type == "cancel") {
            clearInterval(this.timer);
            done();
          } else {
            // 如果已经支付了就清除定时器后跳转路由,为了不花钱这里就不需要判断了
            // if(this.code==200){
            clearInterval(this.timer);
            this.$router.push("/PaySuccess");
            done();
            // }
          }
        },
      });

      if (!this.timer) {
        this.timer = setInterval(async () => {
          let res = await this.$API.reqPayResult(this.data.orderId);
          // 如果支付成功就清除定时器进行理由的跳转，并且存储成功的值
          if (res.data.code == 200) {
            clearInterval(this.timer);
            this.code = res.data.code;
            done();
            this.$router.push("/PaySuccess");
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
