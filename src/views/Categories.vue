<template>
  <div>
    <div class="list">
      <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column property="id" label="序号" width="150"></el-table-column>
        <el-table-column property="cateName" label="分类名称" width="320"></el-table-column>
        <el-table-column property="state" label="是否启用" width="320">
          <el-switch v-model="state" active-color="#13ce66" disabled inactive-color="#ff4949"></el-switch>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true"
            >编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fy">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- <button type="button"></button> -->
    <!-- 编辑对话框 -->
    <div class="bj">
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="bj(),dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { API_ADD_catelist,API_ADD_editcate } from "@/api/api";
export default {
  data() {
    return {
      id: "",
      cateName: "",
       state: true,//添加分类开关
      // id: 47, cateName: "热销榜", state: 1
      tableData: [],
      currentPage: 1,
      pageSizes: [3, 6, 9, 12],
      pagesize: 3,
      total: 0,
      //   编辑
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
        name: "",
        value: "",
        value1: true,//默认的开关值
      value2:"",//开关的model值
    };
  },
  created() {
    this.CurrentChange(this.currentPage);
    
  },
  methods: {
    //   编辑
    handleEdit(index, row) {
      console.log(index, row);
    //   console.log(row.cateName);
      this.id=row.id;
      this.cateName=row.cateName;
      this.value1=row.state;
      this.value=this.value1
      console.log(row.state);
      
      
      
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.CurrentChange(this.currentPage);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.CurrentChange(page);
    },
    // 分页
    CurrentChange(page) {
      API_ADD_catelist(page, this.pagesize).then(res => {
        console.log(res.data);
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    bj(){
        API_ADD_editcate(this.id,this.name,this.state.toString()).then((res)=>{
        console.log(res);
    this.CurrentChange(this.currentPage);

    })
    }
  }
};
</script>

<style lang="less" scoped>
</style>