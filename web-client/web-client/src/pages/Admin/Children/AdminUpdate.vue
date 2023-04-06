<template>
  <div class="goods-detail">
    <div class="goods-detail-top">Product Information</div>
    <div class="goods-detail-group">
      <div class="goods-icon">
        <span>picture</span>
        <img :src="goodsInfo.thumb_url" alt="">
      </div>
      <div class="goods-item">
        <span>ID</span>
        <span>{{ goodsInfo.goods_id }}</span>
      </div>
      <div class="goods-item">
        <span>name</span>
        <el-input
          type="text"
          placeholder="Please enter content"
          v-model="goodsInfo.short_name"
          clearable
          style="width:350px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>classify</span>
        <el-select v-model="goodsInfo.category" placeholder="Please select">
          <el-option
           v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="goods-item">
        <span>price</span>
        <el-input
          type="number"
          placeholder="Please enter a price"
          v-model="goodsInfo.price"
          clearable
          style="width:100px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>stock</span>
        <el-input
          type="number"
          placeholder="Please enter inventory"
          v-model="goodsInfo.counts"
          clearable
          style="width:100px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>describe</span>
        <el-input
          type="text"
          placeholder="Please enter content"
          v-model="goodsInfo.goods_name"
          clearable
          style="width:450px"
        >
        </el-input>
      </div>
      <el-button @click="$router.push('/admin/admingoods')">return</el-button>
      <el-button @click="saveGoodsInfo()">Save product information</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {changeGoodsInfo,getAllgoods} from './../../../api/index';

  export default {
    data() {
      return {
        goodsInfo: {},
        options: [{
          value: 1,
          label: 'Books, audio and video'
        }, {
          value: 2,
          label: 'Home life'
        },{
          value: 3,
          label: 'Clothing, luggage'
        },{
          value: 4,
          label: 'electronic product'
        },{
          value: 5,
          label: 'Food Treasure'
        }],
      }
    },
     mounted(){
        this.goodsInfo = JSON.parse(window.sessionStorage.getItem('goodsInfo'));
    },
    methods:{
      // 修改商品信息
      async saveGoodsInfo(){
        this.goodsInfo.price = Number(this.goodsInfo.price);
        this.goodsInfo.counts = Number(this.goodsInfo.counts);
        let result = await changeGoodsInfo(this.goodsInfo);
        if(result.success_code === 200){
          this.$message({
              type: 'success',
              message: 'Modified successfully'
            });
          this.$router.push('/admin');
          getAllgoods();
        }
      }
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .goods-detail
    width 70%
    height 100%
    margin 20px auto
    .goods-detail-top
      width 100%
      height 60px
      line-height 60px
      padding-left 10px
      font-weight bold
    .goods-detail-group
      .goods-icon
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          border-radius 50%
      .goods-item
        height 50px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border 1px solid #ccc
          outline none
          text-align right
          width 200px
      button
          margin-top: 20px
      //   width 20%
      //   height 40px
      //   line-height 40px
      //   background-color #e9232c
      //   text-align center
      //   margin 60px 0
      //   border none
      //   font-size 16px
      //   color #fff
      //   border-radius 10px
    .right-title-color
      color #999
      font-size 14px
</style>

