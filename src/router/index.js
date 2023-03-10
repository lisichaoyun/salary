import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../page/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: '主页' },
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: '关于' },
    component: () => import( '../page/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('../page/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: '注册' },
    component: () => import('../page/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  //beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {
      //判断是否有标题
      document.title = to.meta.title
  }
  if (localStorage.getItem('token') != null||localStorage.getItem('expired')>Date.now()) {
      next()
  } else {
      if (to.path === '/login' || to.path === '/register') {
          next()
      } else {
        next('/login')
      }
  }
})

export default router
