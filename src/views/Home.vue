<template>
  <div class="DL">
    <div class="jz">
      <el-form ref="form" label-width="80px" class="form1">
        <el-input placeholder="登录" v-model="name">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

        <el-input placeholder="请输入密码" v-model="pwd" show-password>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

        <el-button type="button" class="dl" @click="dl">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {API_LOGIN} from '@/api/api'
export default {
  data() {
    return {
      name: "",
      pwd: "",
      isreq: true,
    };
  },
  created(){

  },
  methods:{
    dl(){
      if (this.isreq == false) return;  
      this.isreq=false;
      API_LOGIN(this.name,this.pwd).then((res)=>{
        console.log(res);
        if(res.data.code==0){
          // alert('登录成功')
                   this.$message({
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
          localStorage.name=this.name;
          localStorage.token=res.data.token;
          localStorage.id=res.data.id;
          localStorage.role=res.data.role

        setTimeout(() => {
          console.log(111);
           this.$router.push("/Index/homePage"); //找到main.js中router对象实例， 调用push()函数改变hash地址
          }, 1000);
        }else{
          alert('登录失败')
        }
      }),
      setTimeout(()=>{
        this.isreq= true
      },3000)
    }
  }
};
</script>

<style lang="less">
.DL {
  display: flex;
  justify-content: center;
  align-items: center;
  background: aqua;

  .jz {
    width: 400px;
  }

  .el-input {
    width: 400px;
    margin-top: 12px;
  }

  .dl {
    width: 400px;
    background: rgb(0, 255, 34);
    border: 0;
    margin-top: 12px;
  }
}
</style>
