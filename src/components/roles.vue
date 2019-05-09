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
        <el-button type="danger" @click="addVisible=true" plain>添加角色</el-button>
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
    <!-- 新增角色框 -->
    <el-dialog title="添加角色" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
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
      ],
      // 是否显示新增框
      addVisible: false,
      // 新增的数据
      addForm: {
        roleName: "",
        roleDesc: ""
      },
      // 新增表单的验证规则
      addRules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  // 生命周期钩子
  created() {
    this.getRoles()
  },
  // 方法
  methods: {
    handleEdit(index, row) {},
    handleDelete(index, row) {},
    handleRole(row) {},
    // 获取角色的方法
    getRoles() {
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
    // 提交表单
    submitForm(formName) {
      // 通过ref属性 获取表单 并且调用验证的方法
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 数据格式没问题
          // 提交数据

          this.$request.addRoles(this.addForm).then(res => {
            console.log(res);
            // 关闭弹框
            this.addVisible = false;
            // 重新获取数据
            this.getRoles();
            // 重置表单即可
            this.$refs[formName].resetFields();
          });
        } else {
          // 数据有问题
          this.$message.error("哥们，数据格式不对哦，你是机器人吗？");
          return false;
        }
      });
    }
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
