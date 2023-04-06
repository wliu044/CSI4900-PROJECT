<template>
  <div id="edit-pwd">
    <el-input placeholder="Please enter the original password" v-model="oriPwd" show-password clearable></el-input>
    <el-input placeholder="Please enter a new password" v-model="newPwd" show-password clearable></el-input>
    <el-input placeholder="Please enter the new password again" v-model="newPwd2" show-password clearable></el-input>
    <p>If you do not set an initial password, you do not have to enter the original password</p>
    <div class="btn-section">
       <el-button type="primary" @click="goTo('/me/profile')">return</el-button>
       <el-button type="danger" @click="submitEdit">edit</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {changeUserPwd} from './../../../api/index'

  export default {
    data(){
      return{
        oriPwd: '',
        newPwd: '',
        newPwd2: ''
      }
    },
    computed: {
      ...mapState(["userInfo"])
    },
    methods: {
      goTo(path){
        this.$router.push(path);
      },
      async submitEdit(){
        if(!this.newPwd || !this.newPwd2){
          this.$message('The content of the input box cannot be empty!');
          return;
        }
        if(this.newPwd != this.newPwd2){
          this.$message('The new passwords entered twice do not match!');
          return;
        }

        let result = await changeUserPwd(this.userInfo.id, this.oriPwd, this.newPwd);
        if(result.success_code === 200){
          this.$message({
            message: result.message,
            type: 'success'
          });
          this.$router.push('/me/profile');
        }else{
          this.$message.error(result.message);
        }
      }
    }
  }
</script>

<style scoped>
  #edit-pwd{
    padding-top: 10%;
    width: 100%;
    height: 100%;
  }
  .el-input{
    display: block;
    margin: 0 auto 20px;
    width: 30%;
  }
  p{
    margin-top: 40px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
  .btn-section{
    margin: 50px auto;
    width: 25%;

    display: flex;
    justify-content: space-between;
  }
  .btn-section .el-button{
    width: 100px;
    outline: none;
  }
</style>
