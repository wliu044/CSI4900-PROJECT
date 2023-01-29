<template>
 <div class="outer">
   <Header/>

   <router-view></router-view>

    
   <Footer v-show="$route.meta.show"/>
 </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
  Header,
  Footer,

  },
  mounted() {
     // 当App挂载完毕后通知小仓库发请求，把请求放在app组件中，让他只执行一次，可以少发请求优化性能
   this.$store.dispatch('categoryList')
   
    
  },
  
}
</script>

<style>

</style>
