import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: 'dataAnalysis',
        name: 'dataAnalysis',
        component: ()=> import('../views/dataAnalysis/DataAnalysis.vue')
      },
      {
        path: 'memberManage',
        name: 'memberManage',
        component: () => import('../views/memberManage/MemberManage.vue')
      },
      {
        path: 'goodsManage',
        name: 'goodsManage',
        component: () => import('../views/goodsManage/GoodsManage.vue')
      },
      {
        path: 'evaluateManage',
        name: 'evaluateManage',
        component: () => import('../views/evaluateManage/EvaluateManage.vue')
      },
      {
        path: 'orderListManage',
        name: 'orderListManage',
        component: () => import('../views/orderListManage/OrderListManage.vue')
      },
      {
        path: 'sendGoodsManage',
        name: 'sendGoodsManage',
        component: () => import('../views/sendGoodsManage/SendGoodsManage.vue')
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/coupon/Coupon.vue')
      },
      {
        path: 'seckill',
        name: 'seckill',
        component: () => import('../views/seckill/Seckill.vue')
      },
      {
        path: 'groupWork',
        name: 'groupWork',
        component: () => import('../views/groupWork/GroupWork.vue')
      },
      {
        path: 'advertiseManage',
        name: 'advertiseManage',
        component: () => import('../views/advertiseManage/AdvertiseManage.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/settings/Settings.vue')
      },
      {
        path: '',
        redirect: 'dataAnalysis'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
