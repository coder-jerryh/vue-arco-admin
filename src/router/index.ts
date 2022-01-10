import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 默认路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  // {
  //   path: '/compositionApi',
  //   name: 'compositionApi',
  //   component: () => import('../views/compositionApi.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
  // {
  //   path: '/:catchAll(.*)',
  //   name: '/404',
  //   component: () => import('../views/errorView/index.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 路由拦截
// store: any
export const routerBefore = () => {
  // 使用钩子函数对路由进行权限跳转
  // router.beforeEach((to: any, from, next) => {
  //   store.commit('clearToken')
  //   // 存学校树信息
  //   store.commit('saveSchoolInfo', store.state.fullSchoolInfo[to.meta.treeType] || {})
  //   const userToken = sessionStorage.userToken
  //   if (!userToken && to.path !== '/login') {
  //     next('/login')
  //   } else {
  //     next()
  //   }
  // })
}
// 设置路由
export const setupRoute = (menuRouteList: object[] = []) => {
  const children: any[] = []
  const addPath = (item: any, fullName: string) => {
    if (item.children && item.children.length) {
      item.children.forEach((child: any) => {
        const newItem = {
          path: child.path,
          component: () => import(`../views${child.path === '/homePage' ? '/homePage/index' : child.path}.vue`),
          meta: {
            title: child.menuName,
            fullName: fullName + child.menuName
          }
        }
        if (child.path) {
          children.push(newItem)
        }
        addPath(child, newItem.meta.fullName + ',')
      })
    }
  }
  addPath(
    {
      children: menuRouteList.length ? menuRouteList : JSON.parse(sessionStorage.menuRouteList || '[]')
    },
    ''
  )
  router.addRoute({
    path: '/',
    redirect: '/homePage',
    component: () => import('../views/layout/index.vue'),
    children
  })
}
export default router
