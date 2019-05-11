<template>
  <img src="../assets/error.jpg" alt="">
</template>

<script>
export default {
  // 友情提示
  created() {
    this.$message.warning('哥们，你访问的页面不存在哦')
  },
}
</script>

<style>

</style>
