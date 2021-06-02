<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change='taad'
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="账号" width="120"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
      <el-table-column label="创建时间" width="120">
        <template slot-scope="scope">{{ scope.row.ctime | dateFormat}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection1()">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { API_ADD_list,API_ADD_usersDel,API_ADD_batchdel} from "@/api/api";
export default {
  data() {
    return {
      tableData: [],//用户列表
      currentPage:1, //当前页数
      pageSize:3, //每页显示条数
      total:0,// 总条数
      pageSizes:[3, 6, 9, 12]

    };
  },
  created() {
    this.APIADDlist(this.currentPage);
    // this.toggleSelection1();
    
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 批量删除
    toggleSelection1() {
      if (!this.ids  ||  this.ids.length == 0) {
        this.$message('请先选中数据');
        return;
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      API_ADD_batchdel(JSON.stringify(this.ids)).then((res)=>{ 
        if(res.data.code==0){
           this.$message({
              type: "success",
              message: "删除成功!"
            });
            // 刷新页面
      this.APIADDlist(this.currentPage);
        }     
      })
        })

    },
    taad(selection){
    this.ids=selection.map((item)=>{
        return item.id
      })
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除
    handleDelete(index,row) {
      console.log(index,row.id);
      API_ADD_usersDel(row.id).then((res)=>{
        console.log(res);
      })
       this.APIADDlist(this.currentPage);
    },
    // 请求
    APIADDlist(page) {
      API_ADD_list(page, this.pageSize).then(res => {
        console.log(res.data);
        this.total=res.data.total
        var tan = res.data.data;
        this.tableData = tan;
      });
    },
    // 分页
      handleSizeChange(val) {
        this.pageSize=val
        console.log(`每页 ${val} 条`);
        this.APIADDlist(this.currentPage);

      },
      handleCurrentChange(page) {
        console.log(`当前页: ${page}`);
        this.APIADDlist(page);
        
      }
  }
};
</script>

<style lang="less" scoped>
</style>