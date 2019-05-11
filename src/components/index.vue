<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <!-- 栅格 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="logo" src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light title">IG后台管理系统</div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button type="danger" icon="el-icon-delete" circle @click="logout"></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="index-aside">
        <!-- 导航菜单 -->
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <!-- 用户 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>用户列表
            </el-menu-item>
          </el-submenu>
          <!-- 权限 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>角色列表
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>权限列表
            </el-menu-item>
          </el-submenu>
          <!-- 商品 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="goods">
              <i class="el-icon-menu"></i>商品列表
            </el-menu-item>
            <el-menu-item index="params">
              <i class="el-icon-menu"></i>分类参数
            </el-menu-item>
            <el-menu-item index="categories">
              <i class="el-icon-menu"></i>商品分类
            </el-menu-item>
          </el-submenu>
          <!-- 订单 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="orders">
              <i class="el-icon-menu"></i>订单列表
            </el-menu-item>
          </el-submenu>
          <!-- 数据 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="reports">
              <i class="el-icon-menu"></i>数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">
        <!-- 增加router-view -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    if (!window.sessionStorage.getItem("token")) {
      // 没有登录 打会登录页
      this.$message.warning("哥们，先登录");
      // 编程式导航
      this.$router.push("login");
    }
  },
  // 方法
  methods: {
    logout() {
      // 删除token    .clear(清空)
      window.sessionStorage.removeItem("token");
      // 编程式导航
      this.$router.push("login");
    }
  }
};
</script>

<style lang='scss'>
.index-container {
  height: 100%;
  .index-header {
    background-color: #b3c0d1;
    line-height: 60px;
    .logo {
      height: 60px;
    }
    .title {
      color: white;
      text-align: center;
      font-size: 30px;
      font-weight: 900;
    }
  }
  .index-aside {
    background-color: skyblue;
  }
  .index-main {
    background-color: #e9eef3;
  }
}
</style>
