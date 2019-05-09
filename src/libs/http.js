// 导入axios
import axios from 'axios'
// 导入Vue $message Vue的原型上 实例化一个Vue
import Vue from 'vue'

// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// axios的 拦截器
// 请求拦截器 请求发送之前 执行
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // console.log('发请求啦！！')
    // console.log(config)
    // 设置token即可
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器 响应回来之后 执行
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    // console.log('响应回来啦啦！！')
    console.log(response)
    if (response.data.meta.status == 200) {
      // this.$message.success(response.data.meta.msg)
      // 原型使用
      Vue.prototype.$message.success(response.data.meta.msg)
      // 实例化Vue
      // new Vue().$message.success(response.data.meta.msg)
    }
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

// 抽取网络请求的对象
const request = {
  // 请求的地址 封装一层 自暴露参数
  // 方便后期维护
  login(params) {
    return axios.post('login', params)
  },
  // 获取用户列表
  getUsers(params) {
    return axios.get('users', {
      // get的数据需要这样写
      params // params:params
      // 用headers 带token
      // headers:{
      // Authorization:window.sessionStorage.getItem('token')
      // }
    })
  },
  // 修改状态
  // 传递 id type
  updateUserStatus(params) {
    return axios.put(`users/${params.id}/state/${params.type}`)
  },
  // 删除用户
  // 传递 id type
  deleteUserById(id) {
    return axios.delete(`users/${id}`)
  },
  // 添加用户
  addUser(params) {
    return axios.post('users', params)
  },
  // 根据id获取用户信息
  getUserById(id) {
    return axios.get(`users/${id}`)
  },
  // 用户修改
  updateUser(params) {
    return axios.put(`users/${params.id}`, {
      email: params.email,
      mobile: params.mobile
    })
  },
  // 获取角色列表
  getRoles(){
    return axios.get('roles')
  },
  // 分配用户角色
  updateUserRole(params){
    return axios.put(`users/${params.id}/role`,{
      rid:params.rid
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
