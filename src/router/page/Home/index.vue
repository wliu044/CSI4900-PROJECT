<template>
<div>
  <TypeNav/>
  <List/>
  <Today/>
  <Rank/>
</div>
</template>

<script>
import TypeNav from '@/components/Type-nav/TypeNav.vue'
import List from "@/components/List/List.vue";
import Today from "@/components/Today-recommend/Tody.vue";
import Rank from "@/components/Rank/Rank.vue";
import { mapState } from 'vuex';

export default {
  name: "Home",
 
  components: {
    TypeNav,
    List,
    Today,
    Rank,
  },
  
  mounted() {
    
    this.$store.dispatch('getFloorList')
    //登入完后挂载发送获取用户西信息请求
   
    
  },
  computed:{
    ...mapState({
      floorList:(state)=>state.Home.floorList
    }),
   
   
  },
 
}
</script>
