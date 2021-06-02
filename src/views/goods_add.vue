<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="category" placeholder="请选择商品分类">
          <el-option v-for="(item,index) in shopcate" :key="index"  :value="item.cateName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number v-model="price" :min="1" :max="10" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          action="http://localhost:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="goodsDesc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="button" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { API_ADD_goodsAdd, API_ADD_categories } from "@/api/api";
export default {
  data() {
    return {
      name: "",
      category: "",
      price: "",
      goodsDesc: "",
      imgUrl: "", //图片名  //商品图片地址
      // 图片
      dialogImageUrl: "",
      dialogVisible: false,
       shopcate: [], //商品分类数组
       value: true, // 是否启用
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传成功
    handleAvatarSuccess(file) {
      console.log(file.imgUrl);
      this.imgUrl = file.imgUrl;
    },
    // 添加商品
    onSubmit() {
      API_ADD_goodsAdd(
        this.name,
        this.category,
        this.price,
        this.imgUrl,
        this.goodsDesc
      ).then(res => {
        console.log(res);
      });
    }
  },
  created() {
    // 查询所有分类名称
    API_ADD_categories().then((res)=>{
      // console.log(res.data.categories);
      var arr=res.data.categories;
       arr.map((item,index)=>{
        return  item.cateName[index]
      })
      console.log(arr);
      
      this.shopcate=arr
      
      
    })
  }
};
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
  border-color: #409eff;
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