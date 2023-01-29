<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-show="AllParams.categoryName">
              {{ AllParams.categoryName }}
              <i @click="removeCategoryName">X</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-show="AllParams.keyword">
              {{ AllParams.keyword }}
              <i @click="removeKeyword">X</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-show="AllParams.trademark">
              {{ AllParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">X</i>
            </li>
            <!-- 属性值面包屑 -->
            <li
              class="with-x"
              v-for="(prop, index) in AllParams.props"
              :key="index"
            >
              {{ `${prop}`.split(":")[1] }}
              <i @click="removeProp(index)">X</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @goSearchBrand="goSearchBrand" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a href="#">综合
                    <img :src="isUrl" v-show="isOne">
                    
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a href="#">价格
                    <img :src="isUrl"  v-show="isTwo">
                    
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img" @click="carryGoodsId(goods.id)">
                    <a target="_blank"
                      ><img v-lazy="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <Pagination 
            :pageNo="AllParams.pageNo" 
            :pageSize="AllParams.pageSize" 
            :total="total" 
            :continues="AllParams.continues"
            @getPage="getPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import TypeNav from "@/components/Type-nav/TypeNav";
import { mapGetters,mapState} from "vuex";
export default {
  name: "Search",

  components: {
    SearchSelector,
    TypeNav,
  },
  data() {
    return {
      // 带给服务器的参数
      AllParams: {
        // 分页器初始值
        pageNo: 1,
        // 每一页展示数据的数量
        pageSize: 5,
        // 存储品牌名称和id
        trademark: "",
        // 存储商品属性的数组
        props: [],
       
       
        // 连续多少条有...,这里一般是基数，因为计数对称，好看
        continues: 5,  
        order:'1:desc',
        category1id: "",
        category2id: "",
        category3id: "",
        categoryName: "",
        // 关键字
        keyword: "",
      },
      // 控制箭头排序箭头方向
    url:["/images/箭头_向上.png","/images/箭头_向下.png"]
     
    };
  },
  beforeMount() {
    // ES6新增语法，将后面的对象有的属性替换掉前面this.params对象有的属性
    Object.assign(this.AllParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getSearchList();
  },
  computed: {
    ...mapGetters(["goodsList", "attrsList", "trademarkList"]),
    // 简化AllParams.order中是否含有1
    isOne(){
      return this.AllParams.order.includes(1)
    },
    isTwo(){
      return this.AllParams.order.includes(2)
    },
    // 简化计算展示箭头图片路径
    isUrl(){
      return this.AllParams.order.includes('asc') ? this.url[0] : this.url[1]
    },
    ...mapState({
       // 总共有多少条数据
      total:state=>state.Search.searchList.total
    })
 
  },
  methods: {
    // 封装一个发送active函数，哪里用直接调用就可以了
    getSearchList() {
      this.$store.dispatch("getSearchList", this.AllParams);
    },
    // 当点击面包屑上的叉是移除categoryN和置空所有的caregoryid，并重新发送网络请求显示更新后的数据列表
    removeCategoryName() {
      this.AllParams.categoryName = "";
      this.AllParams.category1id = "";
      this.AllParams.category2id = "";
      this.AllParams.category3id = "";
      // 如果路由中有参数params跳转到自己路由的时候带着params参数
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
      this.getSearchList();
    },
    // 当点击面包屑上的叉是移除keyword,并重新发送网络请求显示更新后的数据列表
    removeKeyword() {
      this.AllParams.keyword = "";
      // 利用全局事件总线通知Header组件清除关键字
      this.$bus.$emit("clearHeaderKeyword");
      // 如果路由中有参数query跳转到自己路由的时候带着query参数

      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
      this.getSearchList();
    },
    // 当点击面包屑上的叉是移除trademark,并重新发送网络请求显示更新后的数据列表

    removeTrademark() {
      this.AllParams.trademark = "";
      this.getSearchList();
    },
    // 获取品牌搜索 数据库需要品牌样式 "ID:name"
    goSearchBrand(trademark) {
      this.AllParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getSearchList();
    },
    // 获取属性值，将属性值一("属性id:属性名:属性值")的方式向服务器发请求
    attrInfo(attrs, attr) {
      // 点击同属性多次时会将相同的属性展示再面包屑上，所以要进行数组去重
      if (this.AllParams.props.includes(`${attrs.attrId}:${attr}:${attrs.attrName}`) == false) {
        this.AllParams.props.push(`${attrs.attrId}:${attr}:${attrs.attrName}`);
      }
      this.getSearchList();
    },
    // 移除属性面包屑，再发送请求
    removeProp(index) {
      // 删除数组中的元素
      this.AllParams.props.splice(index, 1);
      this.getSearchList();
    },
    // 改变价格排序以"1:desc"形式。desc是降序。asc是升序
    changeOrder(flag){
    
    let originFlag = this.AllParams.order.split(':')[0]
    let originOrder = this.AllParams.order.split(':')[1]
    let newOrder = ''
    if(flag == originFlag){
      newOrder = `${originFlag}:${originOrder == "desc" ? "asc" : "desc"}`
    }else{
      newOrder = `${flag}:${originOrder == "desc"}`
    }
      this.AllParams.order = newOrder
      this.getSearchList();
    },
    // 点击分页器向服务器发送请求pageNo是当前点击的页数
    getPage(pageNo){
      this.AllParams.pageNo = pageNo
      this.getSearchList();
    },
    // 给商品详情也路由传参
    carryGoodsId(id){
      this.$router.push({
        name:'detail',
        params:{
          detailId:id
        }
      })
    }
  },
  watch: {
    // 监听路由信息发生变化，如果变化就再一次发送服务器请求
    $route(newValue, oldValue) {
      // 当再点击三级分类为菜单下,把前面的所带的category1id,category2id,category3id置空
      // 不置空点击会携带原来的catergoryid
      this.AllParams.category1id = "";
      this.AllParams.category2id = "";
      this.AllParams.category3id = "";
      // 当路由身上数据发生变化时，重新合并带给服务器的参数
      Object.assign(this.AllParams, this.$route.query, this.$route.params);
      this.getSearchList(this.AllParams);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                img{
                  width: 14px;
                  height: 14px;
                  
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>