<template>
  <div id="admin-users">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="User ID">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="Account">
      </el-table-column>
      <el-table-column
        prop="user_phone"
        label="Phone">
      </el-table-column>
      <el-table-column
        prop="user_nickname"
        label="Nickname">
      </el-table-column>
      <el-table-column
        prop="user_address"
        label="Address">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getAllUsers} from '../../../api/index'
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted(){
      this.getUsers();
    },
    methods: {
      async getUsers(){
        const results = await getAllUsers();
        if(results.success_code === 200){
          this.tableData = results.message;
        }
      }
    }
  }
</script>

<style scoped>

</style>
