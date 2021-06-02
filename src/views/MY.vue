<template>
    <div>
        个人中心
        <p>管理员id: <span>{{id}}</span></p>
        <p>账号 <span>{{account}}</span></p>
        <p>用户组 <span>{{userGroup}}</span></p>
        <p>创建时间<span>{{ctime|dateFormat}}</span></p>
        <div>头像
            <div class="demo-basic--circle">
        <div class="block"><el-avatar shape="square" :size="50" :src="imgUrl"></el-avatar></div>
      </div>
        </div>
        <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="data"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import {API_ADD_accountinfo} from '@/api/api'
    export default {
data(){
        return{
            id:'',
            ctime:'',
            account:'',
            userGroup:'',
            imgUrl:'',
            imageUrl: '',
            // 没有传递用户id!!!!!!!!!!图片上传异常
            data: {id: localStorage.id}
        }
            },
created(){
            API_ADD_accountinfo(localStorage.id).then((res)=>{
                console.log(res.data.accountInfo.id); 
                this.id= res.data.accountInfo.id      
                this.ctime= res.data.accountInfo.ctime      
                this.account= res.data.accountInfo.account      
                this.userGroup= res.data.accountInfo.userGroup      
                this.imgUrl= res.data.accountInfo.imgUrl      
                        })  
            },
methods: {
      handleAvatarSuccess(res, file) {
          window.location.reload()
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
    }
</script>

<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>