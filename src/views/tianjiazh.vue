<template>
  <div>
    <el-form ref="from" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="userGroup" placeholder="请选择活动区域">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="button" @click="tj">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { API_ADD_ACCOUNT } from "@/api/api";
export default {
  data() {
    return {
      account: "",
      password: "",
      userGroup: "",
      tianjian:true
    };
  },
  methods: {
    tj() {
      if(this.tianjian==false){return}
      this.tianjian=false
      API_ADD_ACCOUNT(this.account, this.password, this.userGroup).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你，这是一条成功消息",
            type: "success"
          });
        }
      });
      setTimeout(()=>{
        this.tianjian=true
      },3000)
    }
  }
};
</script>

<style lang="less" scoped>
</style>