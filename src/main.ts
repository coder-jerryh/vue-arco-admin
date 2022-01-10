import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router, { setupRoute, routerBefore } from './router/index'
import { setupArcoUI } from './utils/setupArcoUI'
import { setupGlobalComponent } from './utils/setupGlobalComponent'
const app: any = createApp(App)
// 路由拦截
routerBefore()
// 挂载路由
setupRoute()
app.use(store, key)
app.use(setupArcoUI)
app.use(setupGlobalComponent)
app.use(router)
// 路由准备就绪后挂载APP实例
router.isReady().then(() => {
  app.mount('#app')
})
