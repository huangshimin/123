<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      element-loading-background="rgba(255, 105, 180,0.5)"
      border
    >
      <!-- 索引 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="niubi">
          <!-- 
              template中必须设置 slot-scope="scope"
          scope.$index 索引  scope.row 这一行的数据-->
          {{niubi.row.level==0?'一级':''}}
          {{niubi.row.level==1?'二级':''}}
          {{niubi.row.level==2?'三级':''}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rights",
  // 数据
  data() {
    return {
      // 表格依赖于数据没有数据  会一行都没有
      tableData: [
        {
          date: "2016-05-02",
          name: "王小黑",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小白",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小绿",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小花",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      loading: true
    };
  },
  created() {
    // 开启loading
    this.loading = true;
    this.$request.getListRights().then(res => {
      // console.log(res);
      this.tableData = res.data.data;
      // 关闭loading
      setTimeout(() => {
        // 延迟一会
        this.loading = false;
      }, 1000);
    });
  }
};
</script>

<style  lang='scss'>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
</style>
