import Vue from 'vue'
import App from './App.vue'

// 饿了吗ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入路由
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂在到vue实例上
  router
}).$mount('#app')
