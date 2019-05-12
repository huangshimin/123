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
      <!-- 设置展开 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 最顶级的row -->
          <el-row v-for="(level1,index) in props.row._children" :key="index">
            <el-col :span="6">
              <!-- 第一级tag -->
              <el-tag
                type="primary"
                :key="level1.id"
                @close="delRight(props.row,level1.id)"
                closable
              >{{level1.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="18">
              <el-row v-for="(level2,i) in level1.children" :key="i">
                <el-col :span="6">
                  <!-- 第二级tag -->
                  <el-tag
                    type="success"
                    :key="level2.id"
                    @close="delRight(props.row,level2.id)"
                    closable
                  >{{level2.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <!-- 第三级tag -->
                  <el-tag
                    v-for="(level3,j) in level2.children"
                    :key="level3.id"
                    @close="delRight(props.row,level3.id)"
                    type="warning"
                    closable
                    class="my-tag"
                  >{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
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
          <!-- 权限分配 -->
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
    <!-- 编辑角色框 -->
    <el-dialog title="编辑角色" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="addRules" ref="editForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 树形权限框框 -->
    <el-dialog title="分配权限" :visible.sync="rightsVisible">
      <!-- 树形菜单 -->
      <el-tree
        :data="rightsData"
        :props="rightsProps"
        :default-checked-keys="defaultCheckedKeys"
        node-key="id"
        show-checkbox
        default-expand-all
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rightsVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRights">确 定</el-button>
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
      },
      // 是否显示编辑框
      editVisible: false,
      // 编辑的数据
      editForm: {
        roleName: "",
        roleDesc: ""
      },
      // 是否显示权限框
      rightsVisible: false,
      // 权限的数据
      rightsForm: {},
      // 所有的权限
      rightsData: [],
      // 属性的对应关系
      rightsProps: {
        children: "children",
        label: "authName"
      },
      // 默认的选中权限
      defaultCheckedKeys: []
    };
  },
  // 生命周期钩子
  created() {
    this.getRoles();
  },
  // 方法
  methods: {
    // 进入编辑状态
    handleEdit(index, row) {
      this.$request.getRolesById(row.id).then(res => {
        // console.log(res);
        // 保存起来
        this.editForm = res.data.data;
        // 弹框
        this.editVisible = true;
      });
    },
    // 删除的点击事件
    handleDelete(index, row) {
      this.$confirm(
        "此操作将永远删除这个角色，是否确定，友情提示别删主管！！！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // 调用接口即可
          this.$request.deleteRoles(row.id).then(res => {
            // console.log(res);
            if (res.data.meta.status == 200) {
              this.getRoles();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 弹出权限框
    handleRole(row) {
      // 显示对话框
      this.rightsVisible = true;
      // 保存角色数据方便后续使用
      this.rightsForm = row;
      // 接口调用
      this.$request.getRightsTree().then(res => {
        // console.log(res);
        // 保存数据
        this.rightsData = res.data.data;
        // 设置选中的值
        let checkedIds = [];
        // 一级
        // row._children.forEach(v1 => {
        //   checkedIds.push(v1.id);
        //   // 二级
        //   v1.children.forEach(v2 => {
        //     checkedIds.push(v2.id);
        //     // 三级
        //     v2.children.forEach(v3 => {
        //       checkedIds.push(v3.id);
        //     });
        //   });
        // });
        function getCheckedKeys(item) {
          // 查找后代的children 如果有 就遍历 并且 添加到数组中
          item._children.forEach(v => {
            checkedIds.push(v.id);
            // 如果有后代就去找后代
            if (v.children) {
              // 为了保证代码的一致 重新赋值 _children属性
              v._children = v.children;
              getCheckedKeys(v);
            }
          });
        }
        getCheckedKeys(row);
        console.log(checkedIds);

        // 设置到data中
        this.defaultCheckedKeys = checkedIds;
      });
    },
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
          if (formName == "editForm") {
            // 提交数据
            this.editForm.id = this.editForm.roleId;
            this.$request.updateRoles(this.editForm).then(res => {
              console.log(res);
              // 关闭弹框
              this.editVisible = false;
              // 重新获取数据
              this.getRoles();
              // 重置表单即可
              this.$refs[formName].resetFields();
            });
          } else {
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
          }
        } else {
          // 数据有问题
          this.$message.error("哥们，数据格式不对哦，你是机器人吗？");
          return false;
        }
      });
    },
    // 删除指定权限
    delRight(row, rightId) {
      this.$request
        .deleteRight({
          roleId: row.id,
          rightId
        })
        .then(res => {
          // console.log(res);
          // 把新的权限数据 保存起来即可
          // 复杂数据的传递 传递的是 地址（引用）
          // table中的某个数据也改变
          row._children = res.data.data;
        });
    },
    // 为角色授权
    setRoleRights() {
      // 获取选中的值
      // console.log(this.$refs.tree.getCheckedKeys())
      // 生成id，id
      // join方法 把数组 按照传入的值 拼接起来
      const rids = this.$refs.tree.getCheckedKeys().join(",");
      console.log(rids);

      // 接口调用
      this.$request
        .setRoleRights({
          // 直接获取之前弹出权限框保存的数据
          roleId: this.rightsForm.id,
          rids
        })
        .then(res => {
          // console.log(res);
          if (res.data.meta.status == 200) {
            this.rightsVisible = false;
            // 重新获取数据
            this.getRoles();
          }
           this.$request.getMenus().then(res => {
      // console.log(res);
      // this.menuList = res.data.data;
      this.$store.commit("changeMenuList",res.data.data)
    });
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
.my-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
