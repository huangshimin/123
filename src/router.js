// 导入vue
import Vue from 'vue'
// 导入VueRouter
import VueRouter from 'vue-router'
// use一下
Vue.use(VueRouter)

// 导入组件
import login from './components/login.vue'
import index from './components/index.vue'
// 嵌套路由的组件
import users from './components/users.vue'
import roles from './components/roles.vue'
import rights from './components/rights.vue'
import goods from './components/goods.vue'
import params from './components/params.vue'
import categories from './components/categories.vue'

// 路由规则
const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: index,
    children: [
      {
        path: 'users', // 匹配的规则是 /users
        component: users
      },
      {
        path: 'roles', // 匹配的规则是 /roles
        component: roles
      },
      {
        path: 'rights', // 匹配的规则是 /rights
        component: rights
      },
      {
        path: 'goods', // 匹配的规则是 /goods
        component: goods
      },
      {
        path: 'params', // 匹配的规则是 /params
        component: params
      },
      {
        path: 'categories', // 匹配的规则是 /categories
        component: categories
      },
    ]
  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})

// 暴露出去
export default router
