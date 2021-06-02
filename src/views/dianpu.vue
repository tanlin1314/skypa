<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="店铺名字">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" v-model="form.bulletin"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar
              shape="square"
              :size="50"
              :src="' http://127.0.0.1:5000/upload/shop/'+form.avatar"
            ></el-avatar>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="起送价格">
        <el-input v-model="form.minPrice" class="input_xk"></el-input>
      </el-form-item>
      <el-form-item label="送达时间">
        <el-input v-model="form.deliveryTime" class="input_xk"></el-input>
      </el-form-item>
      <el-form-item label="店铺描述">
        <el-input v-model="form.description" class="input_xk"></el-input>
      </el-form-item>
      <el-form-item label="店铺好评率">
        <el-input v-model="form.score" class="input_xk"></el-input>
      </el-form-item>
      <el-form-item label="店铺销量">
        <el-input v-model="form.sellCount" class="input_xk"></el-input>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input v-model="form.deliveryPrice" class="input_xk"></el-input>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          is-range
          v-model="form.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.supports">
          <el-checkbox v-for="item in organList" :key="item" :label="item" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="店铺图片">
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="sc"
          :file-list="FileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="button" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { API_ADD_info, API_ADD_edit } from "@/api/api";
export default {
  data() {
    return {
      form: {
        id: "", //
        name: "", //店铺名称
        bulletin: "", //公告
        avatar: "", //店铺头像
        deliveryPrice: "", //配送费
        deliveryTime: "", //送达时间
        description: "", //描述
        score: "", //评分
        sellCount: "", //销量
        supports: [], //活动
        pics: "", //店铺图片
        date: "", //营业时间
        minPrice: "" //起送价格
      },
      FileList: [], //上传店铺图片动态显示
      organList: [
        "在线支付满28减5",
        "VC无限橙果汁全场8折",
        "单人精彩套餐",
        "特价饮品8折抢购",
        "单人特色套餐"
      ],
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    //   保存
    onSubmit() {
      let newobj = { ...this.form };
      newobj.supports = JSON.stringify(this.form.supports); //活动
      newobj.date = JSON.stringify(this.form.date); //营业时间
      newobj.pics = JSON.stringify(this.form.pics); //店铺图片
      API_ADD_edit(newobj).then(res => {
        console.log(res);
        //    console.log(res);
        console.log(newobj);
      });
    },
    // 删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let a = file.url;
      console.log(a);
      let b = this.form.pics.indexOf(a)
       this.form.pics.splice(b,1)
        // this.dialogImageUrl.splice(b,1)
       console.log(b)
       console.log(this.form.pics)
    },
    sc(response) {
      // 图片上传成功后push添加图片
      console.log(response);
      this.form.pics.push(response.imgUrl);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created() {
    API_ADD_info().then(res => {
      console.log(res.data.data.pics);
      this.form = res.data.data;
      this.avatar = res.data.data.avatar;
      // 店铺动态上传已有图片
      this.FileList = res.data.data.pics.map(item => {
        return {
          name: "item",
          url: "http://127.0.0.1:5000/upload/shop/" + item
        };
      });
    });
  }
};
</script>

<style lang="less" scoped>
.input_xk {
  width: 200px;
}
</style>