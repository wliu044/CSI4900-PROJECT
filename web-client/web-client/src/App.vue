<template>
  <div id="app">
    <HeaderTop v-show="$route.meta.showHeaderTop" />
    <div style="height:150px" v-show="visible"></div>
    <HeaderSearch v-show="$route.meta.showHeaderSearch" :visible.sync="visible" />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Footer from "./components/Footer";
import HeaderTop from "./components/HeaderTop/HeaderTop";
import HeaderSearch from "./components/HeaderSearch/HeaderSearch";
import { mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    if (userInfo) {
      this.syncUserInfo(userInfo);
    }
  },
  methods: {
    ...mapActions(["syncUserInfo"])
  },
  components: {
    Footer,
    HeaderTop,
    HeaderSearch
  }
};
</script>

<style scoped>
#app {
  min-width: 1190px;
  width: 100%;
  height: 100%;
  position: relative;
  list-style: none;
}
</style>
