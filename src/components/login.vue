<template>
  <div class="login">
    <div class="center-box">
      <h2 class="my-h3">用户登录</h2>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button type="danger" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: ""
      },
      // 表单验证规则
      loginRules: {
        username: [
          // 必须            提示内容                    触发方式
          { required: true, message: "请输入用户名", trigger: "blur" },
          // 最短    最长     提示信息                         触发方式
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "change" }
        ],
        password: [
          // 必须            提示内容                    触发方式
          { required: true, message: "请输入密码", trigger: "blur" },
          // 最短    最长     提示信息                         触发方式
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  // 方法
  methods: {
    // 提交表单
    submitForm(formName) {
      // 通过ref属性 获取表单 并且调用验证的方法
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 数据格式没问题
          this.$request.login(this.loginForm).then(res => {
            console.log(res);
            // 错误提示
            if (res.data.meta.status === 400) {
              this.$message.warning(res.data.meta.msg);
            } else if (res.data.meta.status === 200) {
              // 对 去首页
              this.$message.success(res.data.meta.msg);
              // 保存token
              window.sessionStorage.setItem("token", res.data.data.token);
              // 代码方式跳转 window.location.href
              // 编程式导航
              this.$router.push("/");
            }
          });
        } else {
          // 数据有问题
          this.$message.error("哥们，数据格式不对哦，你是机器人吗？");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
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
