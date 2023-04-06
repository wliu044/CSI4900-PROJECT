<template>
  <div class="user-detail">
    <div class="user-detail-top">Basic information</div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>avatar</span>
        <img :src="userInfo.user_avatar" alt="">
      </div>
      <div class="user-item">
        <span>cell phone</span>
        <span>{{ userInfo.user_phone || 'none' }}</span>
      </div>
      <div class="user-item">
        <span>Account</span>
        <span>{{ userInfo.user_name || 'none' }}</span>
      </div>
      <div class="user-item">
        <span>nickname</span>
        <span>{{ userInfo.user_nickname || 'none' }}</span>
      </div>
      <div class="user-item">
        <span>gender</span>
        <span>{{ userInfo.user_sex || 'none' }}</span>
      </div>
      <div class="user-item">
        <span>Place of habitual residence</span>
        <span>{{ userInfo.user_address || 'none' }}</span>
      </div>
      <div class="user-item">
        <span>birthday</span>
        <span>{{ userInfo.user_birthday || 'none' }}</span>
      </div>
      <div class="user-item">
        <span>Personalized signature</span>
        <span>{{ userInfo.user_sign || 'none' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
      }
    },
    computed: {
        ...mapState(["userInfo"])
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .user-detail
    width 70%
    height 100%
    margin 20px auto
    .user-detail-top
      width 100%
      height 60px
      line-height 60px
      padding-left 10px
      font-weight bold
    .user-detail-group
      .user-icon
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          height 50px
          border-radius 50%
      .user-item
        height 50px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
    .right-title-color
      color #999
      font-size 14px
</style>

