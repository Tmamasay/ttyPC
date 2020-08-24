import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'
import componentsRouter from './modules/components'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/home/index'),
        name: 'Home',
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/pages/order/index'),
        name: 'Order',
        meta: { title: '订单' }
      }
    ]
  },
  {
    path: '/price',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/pages/price/index'),
        name: 'Price',
        meta: { title: '价格' }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/pages/news/index'),
        name: 'News',
        meta: { title: '行业资讯' }
      },
      {
        path: 'detail',
        component: () => import('@/pages/news/detail'),
        name: 'Detail',
        meta: { title: '资讯详情' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'login',
        component: () => import('@/pages/user/login'),
        name: 'Login',
        meta: { title: '用户登录' }
      },
      {
        path: 'register',
        component: () => import('@/pages/user/register'),
        name: 'Register',
        meta: { title: '用户注册' }
      },
      {
        path: 'auth',
        component: () => import('@/pages/user/auth'),
        name: 'Auth',
        meta: { title: '企业认证' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'create',
        component: () => import('@/pages/test/index'),
        name: 'CreateTest',
        meta: { title: '添加地址' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/pages/test/index'),
        name: 'EditTest',
        meta: { title: '修改地址', keepAlive: true }
      }
    ]
  },
  componentsRouter
]

const createRouter = () => new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
