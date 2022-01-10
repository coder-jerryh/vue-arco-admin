import ArcoVue from '@arco-design/web-vue' // arcoUI
import '@arco-design/web-vue/dist/arco.css' // arco样式
import ArcoVueIcon from '@arco-design/web-vue/es/icon' // arco图标库

const globalThis: any = window
export const setupArcoUI = {
  // 初始化
  install(app: any) {
    const prototype = app.config.globalProperties
    app.use(ArcoVue)
    app.use(ArcoVueIcon)
    this.initModal(prototype)
  },
  // 加载全局弹窗
  initModal(prototype: any) {
    // Toast
    globalThis.Toast = (type: string, content: string) => {
      prototype.$message[type]({
        id: 'globalToast',
        content,
        duration: 2000
      })
    }
    // Confirm
    globalThis.Confirm = (title = '提示', content: string, onOk: Function, onCancel: Function, type = 'warning') => {
      prototype.$modal[type]({
        title,
        content,
        okText: '我知道了',
        cancelText: '取消',
        onOk,
        onCancel,
        hideCancel: false,
        closable: false,
        maskClosable: false
      })
    }
    // Alert
    globalThis.Alert = (type = 'warning', content: string, onOk: Function) => {
      prototype.$modal[type]({
        title: '提示',
        content,
        okText: '我知道了',
        onOk,
        hideCancel: true,
        closable: false,
        maskClosable: false
      })
    }
  }
}
