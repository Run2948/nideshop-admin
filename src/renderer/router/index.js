import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由重复点击出错
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return RouterPush.call(this, to).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: require('@/components/LoginPage').default
  },
  {
    path: '/dashboard',
    // name: 'home',
    component: require('@/components/DashboardPage').default,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'welcome',
        component: require('@/components/WelcomePage').default
      },
      {
        path: 'goods',
        name: 'goods',
        component: require('@/components/Goods/GoodsPage').default
      },
      {
        path: 'goods/add',
        name: 'goods_add',
        component: require('@/components/Goods/GoodsAddPage').default
      },
      {
        path: 'category',
        name: 'category',
        component: require('@/components/Category/CategoryPage').default
      },
      {
        path: 'category/add',
        name: 'category_add',
        component: require('@/components/Category/CategoryAddPage').default
      },
      {
        path: 'brand',
        name: 'brand',
        component: require('@/components/Brand/BrandPage').default
      },
      {
        path: 'brand/add',
        name: 'brand_add',
        component: require('@/components/Brand/BrandAddPage').default
      },
      {
        path: 'order',
        name: 'order',
        component: require('@/components/Order/OrderPage').default
      },
      {
        path: 'order/detail',
        name: 'order_detail',
        component: require('@/components/Order/OrderDetailPage').default
      },
      {
        path: 'operate/topic',
        name: 'topic',
        component: require('@/components/Topic/TopicPage').default
      },
      {
        path: 'operate/topic/add',
        name: 'topic_add',
        component: require('@/components/Topic/TopicAddPage').default
      },
      {
        path: 'user',
        name: 'user',
        component: require('@/components/User/UserPage').default
      },
      {
        path: 'user/add',
        name: 'user_add',
        component: require('@/components/User/UserAddPage').default
      }
    ]
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token') || ''
  if (!token && to.name !== 'login') {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  next()
})

export default router
