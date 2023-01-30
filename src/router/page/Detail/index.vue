<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span v-show="data.categoryView.category1Name">{{
          data.categoryView.category1Name
        }}</span>
        <span v-show="data.categoryView.category2Name">{{
          data.categoryView.category2Name
        }}</span>
        <span v-show="data.categoryView.category3Name">{{
          data.categoryView.category3Name
        }}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuImageList="skuInfo.skuImageList" />
          <!-- 小图列表 -->
          <ImageList :skuImageList="skuInfo.skuImageList" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{ skuInfo.skuName }}</h3>
            <p class="news">
              Recommended to choose the following [mobile discount purchase], cell phone package all done, no need to change the number, and monthly spending back
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  Pri&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ce
                </div>
                <div class="price">
                  <i>CAD</i>
                  <em>{{ data.price }}</em>
                  <span>Price reduction notice</span>
                </div>
                <div class="remark">
                  <i>Cumulative Evaluation</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>Prom&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;otion</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">buy at an increased price</i>
                  <em class="t-gray"
                    >Add $20.00 for 999.00, or $30.00 for 1999.00, or $40.00 for 2999.00 to redeem hot items in the shopping cart</em
                  >
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  Sup&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port
                </div>
                <div class="fixWidth">
                  Trade in your old phone for a new one, recycle your unused phone, grab a 4G package at a great value, and buy a gift
                </div>
              </div>
              <div class="supportArea">
                <div class="title">Delivery to</div>
                <div class="fixWidth">Ottawa</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl
                v-for="(spuSaleAttr, index) in spuSaleAttrList"
                :key="spuSaleAttr.id"
              >
                <dt class="title">{{ spuSaleAttr.saleAttrName }}</dt>
                <dd
                  changepirce="0"
                  :class="{ active: spuSaleAttrValue.isChecked == 1 }"
                  v-for="(
                    spuSaleAttrValue, index
                  ) in spuSaleAttr.spuSaleAttrValueList"
                  :key="spuSaleAttrValue.id"
                  @click="
                    changeActive(
                      spuSaleAttrValue,
                      spuSaleAttr.spuSaleAttrValueList
                    )
                  "
                >
                  {{ spuSaleAttrValue.saleAttrValueName }}
                </dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input
                  autocomplete="off"
                  class="itxt"
                  v-model="value"
                  @change="changeValue"
                />
                <a href="javascript:" class="plus" @click="value++">+</a>
                <a
                  href="javascript:"
                  class="mins"
                  @click="value <= 1 ? (value = 1) : value--"
                  >-</a
                >
              </div>
              <div class="add">
                <a href="javascript:" @click="addShoppingCart(skuInfo)">Add to Cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容详情页 -->
    <section class="product-detail">
      <aside class="aside">
        <div class="tabWraped">
          <h4 class="active">Related Categories</h4>
          <h4>Recommended Brands</h4>
        </div>
        <div class="tabContent">
          <div class="tab-pane active">
            <ul class="partList">
              <li>Cell phone</li>
              <li>Phone Cases</li>
              <li>Memory Card</li>
              <li>Iphone Accessories</li>
              <li>Cell phone film</li>
              <li>Cell phone headset</li>
              <li>Mobile Power</li>
              <li>Tablet</li>
            </ul>
            <ul class="goodsList">
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part01.png" />
                  </div>
                  <div class="attr">Apple iPhone 6s (A1699)</div>
                  <div class="price">
                    <em>CAD</em>
                    <i>6088.00</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">Add to Cart</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>CAD</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">Add to Cart</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>CAD</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">Add to Cart</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>CAD</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">Add to Cart</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>CAD</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">Add to Cart</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-pane">
            <p>Recommended Brands</p>
          </div>
        </div>
      </aside>
      <div class="detail">
        <div class="fitting">
          <h4 class="kt">Choose a match</h4>
          <div class="good-suits">
            <div class="master">
              <img src="./images/l-m01.png" />
              <p>CAD5299</p>
              <i>+</i>
            </div>
            <ul class="suits">
              <li class="suitsItem">
                <img src="./images/dp01.png" />
                <p>Feless VR</p>
                <label>
                  <input type="checkbox" value="39" />
                  <span>39</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp02.png" />
                <p>Feless VR</p>
                <label>
                  <input type="checkbox" value="50" />
                  <span>50</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp03.png" />
                <p>Feless VR</p>
                <label>
                  <input type="checkbox" value="59" />
                  <span>59</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp04.png" />
                <p>Feless VR</p>
                <label>
                  <input type="checkbox" value="99" />
                  <span>99</span>
                </label>
              </li>
            </ul>
            <div class="result">
              <div class="num">0 items already purchased</div>
              <div class="price-tit">Package Price</div>
              <div class="price">5299</div>
              <button class="addshopcar">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="intro">
          <ul class="tab-wraped">
            <li class="active">
              <a href="###"> Product introduction </a>
            </li>
            <li>
              <a href="###"> Specifications and packaging </a>
            </li>
            <li>
              <a href="###"> After-Sales Guarantee </a>
            </li>
            <li>
              <a href="###"> Product Reviews </a>
            </li>
            <li>
              <a href="###"> Mobile Community </a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <ul class="goods-intro">
                <li>Resolution：1920*1080(FHD)</li>
                <li>Rear camera: 12 megapixels</li>
                <li>Front camera: 5 megapixel</li>
                <li>Nucleus: Other</li>
                <li>Frequency: subject to the information on the official website</li>
                <li>Brand: Apple</li>
                <li>Trade name: APPLE iPhone 6s Plus</li>
                <li>Item No.: 1861098</li>
                <li>Gross weight of goods: 0.51kg</li>
                <li>Origin of goods: Mainland China</li>
                <li>Hotspots: fingerprint recognition, Apple Pay, metal body, photo magic</li>
                <li>System: Apple (IOS)）</li>
                <li>Pixels: 10-16 million</li>
                <li>Body memory: 64GB</li>
              </ul>
              <div class="intro-detail">
                <img src="./images/intro01.png" />
                <img src="./images/intro02.png" />
                <img src="./images/intro03.png" />
              </div>
            </div>
            <div id="two" class="tab-pane">
              <p>Specifications and packaging</p>
            </div>
            <div id="three" class="tab-pane">
              <p>After-Sales Guarantee</p>
            </div>
            <div id="four" class="tab-pane">
              <p>Product Reviews</p>
            </div>
            <div id="five" class="tab-pane">
              <p>Mobile Community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TypeNav from "@/components/Type-nav/TypeNav.vue";
import { mapGetters} from "vuex";
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";

export default {
  name: "Detail",
  components: {
    ImageList,
    Zoom,
    TypeNav,
  },
  data() {
    return {
      // 加入购物车数量
      value: 1,
  
    };
  },
  mounted() {
    // 挂载完毕之后向仓库派发actions，把点击商品对应的id带过去
    this.$store.dispatch("getGoodsInfo", this.$route.params.detailId);
   
  },
  computed: {
  
    ...mapGetters(["skuInfo", "spuSaleAttrList","data"]),
       
  },
  methods: {
    // 改变类名选择商品配置的类名
    changeActive(spuSaleAttrValue, arr) {
      arr.forEach((item) => {
        item.isChecked = 0;
      });
      spuSaleAttrValue.isChecked = 1;

     
  
    },
    // 加入购物车数量
    changeValue() {
      let value = this.value;
      //  如果用户输入的值为非法的乘以1会得到一个NaN，或者用户输入的是一个小于1的数就赋值为1
      if (isNaN(value * 1) || value < 1) {
        this.value = 1;
      } else {
        // 如果用户输入的是小数就把值取整
        this.value = parseInt(value);
      }
    },
    // 点击加入购物车
    async addShoppingCart(skuInfo,spuSaleAttrValue) {
      // 把商品的id和购买的数量带给actions
      try {
     await this.$store.dispatch("addSendShoppingCart", {
          goodsId: this.$route.params.detailId,
          goodsNum: this.value,
        });
        this.$router.push({
          name:'addCartSuccess',
          params:{
            skuInfo: skuInfo,
          goodsNum: this.value,
          // goodsColor:spuSaleAttrValue.saleAttrValueName,
          }
        })

      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: green;
                  border: 1px solid green;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .product-detail {
    width: 1200px;
    margin: 30px auto 0;
    overflow: hidden;

    .aside {
      width: 210px;
      float: left;
      border: 1px solid #ccc;

      .tabWraped {
        height: 40px;

        h4 {
          border-top: 3px solid #fff;
          float: left;
          line-height: 37px;
          width: 105px;
          text-align: center;
          border-bottom: 1px solid #ccc;

          &.active {
            border-top: 3px solid #e1251b;
            border-bottom: 0;
            font-weight: normal;
          }
        }
      }

      .tabContent {
        padding: 10px;

        .tab-pane {
          display: none;

          &.active {
            display: block;
          }

          &:nth-child(1) {
            .partList {
              overflow: hidden;

              li {
                width: 50%;
                float: left;
                border-bottom: 1px dashed #ededed;
                line-height: 28px;
              }
            }

            .goodsList {
              & > li {
                margin: 5px 0 15px;
                border-bottom: 1px solid #ededed;
                padding-bottom: 5px;

                .list-wrap {
                  .p-img {
                    text-align: center;

                    img {
                      width: 152px;
                    }
                  }

                  .price {
                    font-size: 16px;
                    color: #c81623;
                  }

                  .operate {
                    text-align: center;
                    margin: 5px 0;

                    a {
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;
                      display: inline-block;
                      padding: 2px 14px;
                      line-height: 18px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail {
      width: 980px;
      float: right;

      .fitting {
        border: 1px solid #ddd;
        margin-bottom: 15px;

        .kt {
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          padding: 5px 0 5px 15px;
        }

        .good-suits {
          height: 170px;
          padding-top: 10px;

          .master {
            width: 127px;
            height: 165px;
            text-align: center;
            position: relative;
            float: left;

            img {
              width: 87px;
            }

            p {
              color: #c81623;
              font-size: 16px;
              font-weight: 700;
            }

            i {
              position: absolute;
              top: 48px;
              right: -25px;
              font-size: 16px;
            }
          }

          .suits {
            width: 668px;
            height: 165px;
            float: left;

            .suitsItem {
              float: left;
              width: 127px;
              padding: 0 20px;
              text-align: center;

              img {
                width: 120px;
                height: 130px;
              }

              p {
                font-size: 12px;
              }

              label {
                display: block;
                position: relative;

                input {
                  vertical-align: middle;
                }

                span {
                  vertical-align: middle;
                }
              }
            }
          }

          .result {
            border-left: 1px solid #ddd;
            width: 153px;
            height: 165px;
            padding-left: 20px;
            float: left;

            .num {
              font-size: 14px;
              margin-bottom: 10px;
              margin-top: 10px;
            }

            .price-tit {
              font-weight: bold;
              margin-bottom: 10px;
            }

            .price {
              color: #b1191a;
              font-size: 16px;
              margin-bottom: 10px;
            }

            .addshopcar {
              background-color: #e1251b;
              border: 1px solid #e1251b;
              padding: 10px 25px;
              font-size: 16px;
              color: #fff;
              display: inline-block;
              box-sizing: border-box;
            }
          }
        }
      }

      .intro {
        .tab-wraped {
          background: #ededed;
          // border: 1px solid #ddd;
          overflow: hidden;

          li {
            float: left;

            & + li > a {
              border-left: 1px solid #ddd;
            }

            &.active {
              a {
                // border: 0;
                background: #e1251b;
                color: #fff;
              }
            }

            a {
              display: block;
              height: 40px;
              line-height: 40px;
              padding: 0 11px;
              text-align: center;
              color: #666;
              background: #fcfcfc;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
            }
          }
        }

        .tab-content {
          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .goods-intro {
                padding-left: 10px;

                li {
                  margin: 10px 0;
                }
              }

              .intro-detail {
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
