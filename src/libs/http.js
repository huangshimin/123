// 导入axios
import axios from 'axios'
// 导入Vue $message Vue的原型上 实例化一个Vue
import Vue from 'vue'
// 导入路由对象
import router from '../router'

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
    // console.log(response)
    if (response.data.meta.status == 200) {
      // this.$message.success(response.data.meta.msg)
      // 原型使用
      Vue.prototype.$message.success(response.data.meta.msg)
      // 实例化Vue
      // new Vue().$message.success(response.data.meta.msg)
    } else if (
      response.data.meta.status == 400 &&
      response.data.meta.msg == '无效token'
    ) {
      new Vue().$message.warning('token好像是你伪造的哟，小子阔以的！')
      // 编程式导航
      router.push('login')
      // 删除token
      window.sessionStorage.clear('token')
      // 如果token无效 data.data是null 后续代码会提示错误
      response.data.data = []
    }
    console.log(response)
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
  getRoles() {
    return axios.get('roles')
  },
  // 分配用户角色
  updateUserRole(params) {
    return axios.put(`users/${params.id}/role`, {
      rid: params.rid
    })
  },
  // 新增角色
  addRoles(params) {
    return axios.post(`roles`, params)
  },
  // 删除角色
  deleteRoles(id) {
    return axios.delete(`roles/${id}`)
  },
  // 获取角色信息
  getRolesById(id) {
    return axios.get(`roles/${id}`)
  },
  // 修改角色
  updateRoles(params) {
    return axios.put(`roles/${params.id}`, {
      roleName: params.roleName,
      roleDesc: params.roleDesc
    })
  },
  // 权限列表
  getListRights() {
    return axios.get(`rights/list`)
  },
  // 获取展示的数据
  getReports() {
    return axios.get('reports/type/1')
  },
  // 获取订单列表
  getOrderList(params){
    return axios.get('orders',{
      // params:params
      // key axios中规定的值
      params
    })
  },
  // 删除角色指定权限
  deleteRight(params){
    return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`)
  },
  // 获取树形权限数据
  getRightsTree(){
    return axios.get('rights/tree')
  },
  // 为角色授权
  // roleId角色id
  // rids  id,id,id,权限id列表
  setRoleRights(params){
    return axios.post(`roles/${params.roleId}/rights`,{
      rids:params.rids
    })
  },
  // 获取菜单
  getMenus(){
    return axios.get('menus')
  }
}

// 暴露出去 包含install方法的对象
export default {
  install(Vue) {
    // 添加到Vue的原型上
    Vue.prototype.$request = request
  }
}
