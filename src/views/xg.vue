<template>
  <div>
    <el-form status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input v-model="oldPwd" @blur="ypwd"></el-input>
        <p v-show="ypwd1">原密码不正确</p>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="newPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="button" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { API_ADD_checkoldpwd,API_ADD_editpwd } from "@/api/api";
export default {
  data() {
    return {
      newPwd: "",
      checkPass: "",
      oldPwd: "",
      ypwd1: false,
      flag: true
    };
  },
  created() {},
  methods: {
    submitForm() {
        // 修改密码
        if(this.flag==true){
        API_ADD_editpwd(this.newPwd,localStorage.id).then((res)=>{
            console.log(res);
            
        })
        }
    },
    // 验证旧密码
    ypwd() {
        API_ADD_checkoldpwd(this.oldPwd, localStorage.id).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你，密码正确",
            type: "success"
          });
          this.ypwd1 = false;
          this.flag=true
        } else {
               this.$message({
            showClose: true,
            message: "旧密码错误，请重新验证!",
            type: "success"
          });
          this.ypwd1 = true;
          this.flag=false
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
</style>