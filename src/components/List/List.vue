<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <!-- <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(banner,index) in bannerList" :key="banner.id">
              <img :src="banner.imgUrl" />
              
            </div>
          
          </div> -->
        <!-- 如果需要分页器 -->
        <!-- <div class="swiper-pagination"></div> -->

        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div> -->
        <el-carousel :interval="5000" arrow="alway" height="100%" trigger="click">
          <el-carousel-item
          
            v-for="(banner, index) in bannerList"
            :key="banner.id"
          >
            <img :src="banner.imgUrl" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇Quick News</em>
            <span class="fr tip">More ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[Special Offer]</span>Get ready for the school season with half-price digital products</li>
            <li><span class="bold">[Announcement]</span>Get ready for the school season with half-price digital products</li>
            <li><span class="bold">[Special Offer]</span>Get ready for the school season with half-price digital products</li>
            <li><span class="bold">[Announcement]</span>Get ready for the school season with half-price digital products</li>
            <li><span class="bold">[Special Offer]</span>Get ready for the school season with half-price digital products</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Phone bill</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Air Tickets</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Movie Tickets</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Games</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Lottery</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Gas Station</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Hotels</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Train Tickets</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Crowdfunding</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Financial Management</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">Gift Cards</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">White Stripes</span>
          </li>
        </ul>
        <div class="ads">
          <!-- <img src="./images/ad1.png" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "List",
  mounted() {
    this.$store.dispatch("getBannerList");
  },

  computed: {
    ...mapState({
      bannerList: (state) => {
        return state.Home.bannerList;
      },
    }),
  },
};
</script>

<style lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      width: 740px;
      height: 100%;

      float: left;
      .el-carousel--horizontal {
        width: 740px;
        height: 100%;
    
    .el-carousel__container{
          // height: 100% !important; 
     img {
          width: 740px;
          height: 100%;
        }
        
        }
        .el-carousel__arrow{
          background: rgba(31,45,61,0.22) !important;
        }
      
      }
 
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
