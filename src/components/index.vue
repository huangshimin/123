<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <!-- 栅格 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class='logo' src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light title">IG后台管理系统</div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="index-aside">Aside</el-aside>
      <el-main class="index-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang='scss'>
.index-container {
  height: 100%;
  .index-header {
    background-color: #b3c0d1;
    line-height: 60px;
    .logo{
      height: 60px;
    }
    .title{
      color:white;
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
