import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {API_ADD_checktoken} from '@/api/api'

Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Index',
      name: 'index',
      component: () => import('../views/index.vue'),
      children: [
        {
          // 默认首页
          path: '/Index/homePage',
          name: 'index/homePage',
          meta: {name:"super,normal"},
          component: () =>
            import('../views/homePage.vue'),
        },
        // 新增商品
        {
          path: '/Index/goods_add',
          meta: {name:"super,normal"},
          component: () =>
            import('../views/goods_add.vue'),
        },
        // 订单管理
        {
          path: '/Index/management',
          meta: {name:"super,normal"},
          component: () =>
            import('../views/management.vue'),
        },
        // 商品列表
        {
          path: '/Index/Productlist',
          meta: {name:"super,normal"},
          component: () =>
            import('../views/Productlist.vue'),
        },
        // 商品分类
        {
          path: '/Index/Categories',
          meta: {name:"super,normal"},
          component: () =>
            import('../views/Categories.vue'),
        },
        // 添加账号
        {
          path: '/Index/tianjiazh',
          meta: {name:"super"},
          name: 'tianjiazh',
          component: () => import('../views/tianjiazh.vue')
        },
        // 修改密码
        {
          path: '/Index/xg',
          meta: {name:"super"},
          name: 'xg',
          component: () => import('../views/xg.vue')
        },
        // 账号列表
        {
          path: '/Index/lb',
          meta: {name:"super,normal"},
          name: 'lb',
          component: () => import('../views/lb.vue')
        },
        // 个人中心
        {
          path: '/Index/MY',
          meta: {name:"super,normal"},
          name: 'MY',
          component: () => import('../views/MY.vue')
        },
        // 店铺管理
        {
          path: '/Index/dianpu',
          meta: {name:"super,normal"},
          name: 'dianpu',
          component: () => import('../views/dianpu.vue')
        },
         // 订单统计
        {
          path: '/Index/dindan',
          meta: {name:"super,normal"},
          name: 'dindan',
          component: () => import('../views/dindan.vue')
        },
      ]
    }
  ]
})

// 添加路由前置守卫
router.beforeEach((to, from, next) => {
  //to: 即将要进入的目标 路由对象
  // from:当前导航正要离开的路由
  if (to.path != '/') {
      // 非登陆页面的请求   验证登陆
      API_ADD_checktoken(localStorage.token).then((res) => {
          console.log(res);
          if (res.data.code == 0) {
              next() //放行
              // 功能2：权限拦截
          } else {
              next('/')
          }
      })
  } else {
      next()
  }
})
export default router
