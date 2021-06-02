<template>
    <div>
        <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品id">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="所属分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="商品价格">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="商品图片">
              <img :src="' http://127.0.0.1:5000/upload/imgs/goods_img/'+props.row.imgUrl"  width="50px" height="50px" alt="">
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.goodsDesc }}</span>
          </el-form-item>
          <el-form-item label="商品评价">
            <span>{{ props.row.rating }}</span>
          </el-form-item>
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="商品时间">
            <span>{{ props.row.ctime |dateFormat}}</span>
          </el-form-item>
          <el-form-item label="商品销量">
            <span>{{ props.row.sellCount }}</span>
          </el-form-item>
        </el-form>
        
      </template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="所属分类"
      prop="category">
    </el-table-column>
    <el-table-column
      label="商品价格"
      prop="price">
    </el-table-column>
    <el-table-column
      label="商品图片">
      <template slot-scope="propse">
        <img :src="'http://localhost:5000/upload/imgs/goods_img/'+propse.row.imgUrl" alt="" width="50px" height="50px">
    </template>
    </el-table-column>
    <el-table-column
      label="商品描述"
      prop="goodsDesc">
    </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pagSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>

<script>
import { API_ADD_goodsList } from "@/api/api";
  export default {
    data() {
      return {
          
        tableData: [],
        // 当前页
         currentPage: 1,
         pageSizes:[3, 6, 9, 12],
         pagSize:3,
         total:0
      }
    },
    created(){
        this.hadexc(this.currentPage)
    },
    methods:{
        hadexc(page){
             API_ADD_goodsList(page,this.pagSize).then((res)=>{
            console.log(res.data);
            this.tableData=res.data.data;
            this.total=res.data.total
        })
        },
         handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
    //   分页
       handleSizeChange(val) {
           this.pagSize=val
        this.hadexc(this.currentPage)
          
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(page) {
          this.hadexc(page)
        console.log(`当前页: ${page}`);

      }
    }
  }
</script>

<style lang="less" scoped>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>