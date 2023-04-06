<template>
  <div class="pro" @click="goDetail(pro.goods_id)">
    <img v-lazy="pro.thumb_url" class="pro_img" />
    <div class="pro_text">
      <p>
        <em>{{ (pro.price / 100) | moneyFormat }}</em>
      </p>
      <p :title="pro.short_name">{{ pro.short_name }}</p>
      <p>VV Mall self-operated store</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    pro: {
      type: Object,
      required: true
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push("/goods/" + id);
    }
  }
};
</script>

<style scoped>
.pro {
  float: left;
  position: relative;
  margin-right: 20px;
  width: 300px;
  height: 100%;
  background: white;
  cursor: pointer;
  display: flex;
  transition: all 0.5s;
}
.pro:hover {
  transform: scale(1.1);
}
.pro > .pro_img {
  margin: 20px;
  width: 120px;
  height: 120px;
}
.pro > .pro_text {
  margin-top: 30px;
  height: 130px;
  width: 140px;
  line-height: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.pro_text > p {
  margin-bottom: 10px;
}
.pro_text > p:first-child {
  color: red;
  font-weight: 900;
}
.pro_text > p:nth-child(2) {
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pro_text > p:nth-child(3) {
  font-size: 12px;
  color: #999;
}
.pro > .add_btn {
  position: absolute;
  bottom: 15px;
  right: 20px;
}
.add_btn > a button {
  padding: 0;
  width: 90px;
  height: 30px;
  outline: none;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
