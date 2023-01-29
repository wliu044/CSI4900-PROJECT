<template>
  <div>
    <div class="type-nav">
      <div class="container" @mouseleave="leaveNotShowClassification">
        <div
          @mouseleave="classifyIndex = -1"
          @mouseenter="enterIsShowClassification"
        >
          <h2 class="all">全部商品分类</h2>
          <transition name="transitionSort">
            <div class="sort" v-show="isShow">
              <div class="all-sort-list2" @click="goSearch">
                <div
                  class="item"
                  v-for="(c1, index) in categoryList.data"
                  :key="c1.categoryId"
                  @mouseenter="addBackgroundColor(index)"
                  :class="{ backgroundColor: classifyIndex == index }"
                >
                  <h3>
                    <a
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <!-- 商品二级分类 -->
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: classifyIndex == index ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >>{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="(c3, index) in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入节流函数
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  components: {},
  data() {
    return {
      // 存储一级分类索引值,默认值-1就不展示背景颜色
      classifyIndex: -1,
      // 主页一上来就是展示商品分类菜单
      isShow: true,
    };
  },

  methods: {
    // 给商品一级分类添加背景颜色的函数,节流避免卡顿
    addBackgroundColor: throttle(function (index) {
      this.classifyIndex = index;
    }, 50),
    // 点击菜单里面的a标签会跳转到search路由函数
    goSearch(e) {
      // 获取点击目标的标签
      let targetEvent = e.target;
      // 获取自定义属性的数据返回的是一个数组,
      // console.log("%%", targetEvent.dataset);
      let { categoryname, category1id, category2id, category3id } = targetEvent.dataset;
      if (categoryname) {
        // 声明参数
        let location = { name: "search" };
        // 不管去哪级分类,都带有categoryName名字
        let query = { categoryName: categoryname };
        // 判断是一级分类还是二级分类还是三级分类
        if (category1id) {
          // 如果点击的是一级路由,那么就在query中添加一个参数category1Id
          query.category1id = category1id;
        } else if (category2id) {
          // 如果点击的是二级路由,那么就在query中添加一个参数category2Id
          query.category2id = category2id;
        } else {
          // 如果点击的是三级路由,那么就在query中添加一个参数category3Id
          query.category3id = category3id;
        }
        // 得到的location和query是两个对象,要合并两个对象,往location中添加一个query对象
        // console.log(location,query);
       
        // 如果route身上有params参数就把params参数合并到location中
        if(this.$route.params){
          location.params = this.$route.params
         location.query = query;
        

        }
        // 得到一个完整的路由配置对象location
        // 最后实现路由跳转
         this.$router.push(location);

        //console.log(this.$route);

      }
    },
    //  如果是search路由组件展示，鼠标进入展示
    enterIsShowClassification() {
      if (this.$route.name == "search" || this.$route.name == 'detail'){

        this.isShow = true;
      }
    },
    // 如果是search路由组件展示，鼠标离开时隐藏
    leaveNotShowClassification() {
      if (this.$route.name == "search" || this.$route.name == 'detail') {
        this.isShow = false;
      }
    },
  },
  computed: {
    ...mapState({
      categoryList: (n) => n.Home.categoryList,
    }),
  },
    mounted() {
     
    // 如果当前组件的路由路径是'/search'那就隐藏商品分类菜单
    if (this.$route.name != "home") {
      this.isShow = false;
    }
  },

};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solId #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        width: 100%;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    
    }
  // js新增类名
      .backgroundColor {
        background-color: skyblue;
      }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 510px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
     
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hIdden;
            padding: 0 20px;
            margin: 0;

            a {
              display: block;
              height: 100%;
              width: 100%;
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solId #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solId #eee;
                padding: 6px 0;
                overflow: hIdden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hIdden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solId #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    // 鼠标进入离开过渡
    .transitionSort-enter,.transitionSort-leave-to {
      opacity: 0;
    }
    .transitionSort-enter-to,.transitionSort-leave{
    opacity: 1;
    }
    .transitionSort-enter-active,.transitionSort-leave-active{
      transition: all 0.5s;
    }
  }
}
</style>