<template>
  <div>
    <button :disabled="pageNo == 1" @click="$emit('getPage',pageNo-1)">Previous page</button>
    <button v-if="isShowBefore" @click="$emit('getPage',1)">1</button>
    <button v-if="pageNo > Math.ceil(continues/2)+1">...</button>
    <!-- 中间部分遍历计算的end数字,不想要的用v-show隐藏的掉，只留page大于计算出来的开始值 -->
    <button 
    v-for="(page, index) in startNumEndNum.end" 
    :key="index" 
    v-show="page >= startNumEndNum.start"
    @click="$emit('getPage',page)"
    :class="{active:pageNo == page} "
    >{{page}}</button>
   
    <button v-if="startNumEndNum.end < pageCount-1">...</button>
    <button v-if="startNumEndNum.end < pageCount" @click="$emit('getPage',pageCount)">{{ pageCount }}</button>
    <button :disabled="pageNo == pageCount" @click="$emit('getPage',pageNo+1)">Next page</button>
    <span>A total of  <strong style="color:orangered">{{ total }}</strong> related information</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // continues是连续页码数，pageNo是当前所在页码数，pageSize是每页最多显示个数，total是总个数
  props: ["continues", "pageNo", "pageSize", "total"],
  computed: {
    // 计算总页数
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 简化显示隐藏分页器相关计算
    isShowBefore(){
        return this.pageNo > Math.ceil(this.continues/2)
    },
    // 计算开始的页码和结束的页码
    startNumEndNum() {
      const { continues, pageNo, pageCount } = this;



      // 声明初始化开始值
      let start = 0;
      let end = 0;
      // 正常情况，连续页码数小于总页数，
      if (pageCount > continues) {
        // 如果当前所在页数小于连续页数一半向上取整开始值就为1，结束之的页数就是连续的页数，即是5
        if (pageNo <= Math.ceil(continues / 2)) {
          start = 1;
          end = continues;
        } else if (pageNo >= pageCount - Math.floor(continues / 2)) {
          // 否则如果当前所在页数大于等于总页数-连续页数处于2向下取整，开始值就为总页数减去连续页数加1
          // 结束值就等于总页数
          start = pageCount - continues + 1;
          end = pageCount;
        } else {
          // 否则就开始值为当前所在也-连续页数处于二向下取整，结束为加
          start = pageNo - Math.floor(continues / 2);
          end = pageNo + Math.floor(continues / 2);
        }
      } else {
        // 不正常情况，连续页码大于总页数,那么开始的页数为1，结束的页数为pageCount（也就是总页数）
        start = 1;
        end = pageCount;
      }
      return { start, end };
    },
    
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-around;
}
button {
    border: 0;
  text-align: center;
  width: 40px;
  height: 20px;
}
.active{
    background: skyblue;
   
}
</style>
