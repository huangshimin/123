<template>
  <div class="login">
    <div class="center-box">
      <h2 class="my-h3">用户登录</h2>
      <el-form label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  // 生命周期 钩子
  created() {
    this.$request.sayHi()
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  .login {
    height: 100%;
    background-color: #324152;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.center-box {
  width: 580px;
  height: 440px;
  background: white;
  border-radius: 10px;
  padding: 50px 35px;
  box-sizing: border-box;
  .my-btn {
    width: 100%;
  }
  .my-h3 {
    margin: 0;
    padding: 0;
    text-align: center;
  }
}
</style>
