<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footerList">
        <div class="footerItem">
          <h4>Shopping Guide</h4>
          <ul class="footerItemCon">
            <li>Shopping Process</li>
            <li>Member Introduction</li>
            <li>Life Travel/Group Purchase</li>
            <li>Common Questions</li>
            <li>Shopping Guide</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>Delivery Method</h4>
          <ul class="footerItemCon">
            <li>Pick Up</li>
            <li>211 Limited Delivery</li>
            <li>Delivery Service Inquiry</li>
            <li>Delivery Fee Standard</li>
            <li>Overseas Delivery</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>Payment Method</h4>
          <ul class="footerItemCon">
            <li>Cash on Delivery</li>
            <li>Online Payment</li>
            <li>Installment Payment</li>
            <li>Post Office Remittance</li>
            <li>Company Transfer</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>After-sale Service</h4>
          <ul class="footerItemCon">
            <li>After-sale Policy</li>
            <li>Price Protection</li>
            <li>Refund Explanation</li>
            <li>Repair/Return</li>
            <li>Cancel Order</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>Special Service</h4>
          <ul class="footerItemCon">
            <li>Treasure Island</li>
            <li>DIY Installation</li>
            <li>Extended Warranty Service</li>
            <li>E-card of Fine Goods Collection</li>
            <li>Fine Goods Collection Communication</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>Help Center</h4>
        </div>
      </div>
      <div class="copyright">
        <ul class="helpLink">
          <li>About Us
            <span class="space"></span>
          </li>
          <li>Contact Us
            <span class="space"></span>
          </li>
          <li>About Us
            <span class="space"></span>
          </li>
          <li>Merchant Entry
            <span class="space"></span>
          </li>
          <li>Marketing Center
            <span class="space"></span>
          </li>
          <li>Friendly Link
            <span class="space"></span>
          </li>
          <li>About Us
            <span class="space"></span>
          </li>
          <li>Marketing Center
            <span class="space"></span>
                        </li>
          <li>Friendly Link
            <span class="space"></span>
          </li>
          <li>About Us</li>
        </ul>
        <p>Address: 888 RIDEAU</p>
        <p>ICP License No. 666666</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Footer',

}
</script>

<style lang="less">
   .footer {
        background-color: #eaeaea;

        .footer-container {
            width: 1190px;
            margin: 0 auto;
            padding: 0 15px;

            .footerList {
                padding: 20px;
                border-bottom: 1px solid #e4e1e1;
                border-top: 1px solid #e4e1e1;
                overflow: hidden;
                padding-left: 40px;

                .footerItem {
                    width: 16.6666667%;
                    float: left;

                    h4 {
                        font-size: 14px;
                    }

                    .footerItemCon {
                        li {
                            line-height: 18px;
                        }
                    }

                    &:last-child img {
                        width: 121px;
                    }
                }
            }

            .copyright {
                padding: 20px;

                .helpLink {
                    text-align: center;

                    li {
                        display: inline;

                        .space {
                            border-left: 1px solid #666;
                            width: 1px;
                            height: 13px;
                            background: #666;
                            margin: 8px 10px;
                        }
                    }
                }

                p {
                    margin: 10px 0;
                    text-align: center;
                }
            }
        }
    }
</style>