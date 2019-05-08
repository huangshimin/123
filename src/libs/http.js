// 导入axios
import axios from 'axios'

// 设置基地址
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'

// 抽取网络请求的对象
const request = {
  // 请求的地址 封装一层 自暴露参数
  // 方便后期维护
  login(params){
    return axios.post('login',params)
  },
  // 获取用户列表
  getUsers(params){
    return axios.get('users',{
      // get的数据需要这样写
      params,
      // 用headers 带token
      headers:{
        Authorization:window.sessionStorage.getItem('token')
      }
    })
  }
}

// 暴露出去 包含install方法的对象
export default {
  install(Vue) {
    // 添加到Vue的原型上
    Vue.prototype.$request = request
  }
}
