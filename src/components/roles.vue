<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <el-breadcrumb class="my-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 栅格 输入框 和按钮 -->
    <el-row>
      <el-col :span="24">
        <!-- 按钮 -->
        <el-button type="danger" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="niubi">
          <!-- 
              template中必须设置 slot-scope="scope"
          scope.$index 索引  scope.row 这一行的数据-->
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(niubi.$index, niubi.row)"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(niubi.$index, niubi.row)"
            plain
            size="mini"
          ></el-button>
          <!-- 角色 -->
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
            @click="handleRole(niubi.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "roles",
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
      ]
    };
  },
  // 生命周期钩子
  created() {
    this.$request.getRoles().then(res => {
      // 需要稍微处理一下数据
      let data = res.data.data;
      // 遍历把children属性移除
      data.forEach(v => {
        v._children = v.children;
        // 删除children属性
        delete v.children;
      });
      // console.log(data)
      this.tableData = data;
    });
  },
  // 方法
  methods: {
    handleEdit(index,row){},
    handleDelete(index,row){},
    handleRole(row){}
  },
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
