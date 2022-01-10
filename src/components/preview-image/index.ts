import { createApp } from 'vue'
import preview from './index.vue'
import ArcoVue from '@arco-design/web-vue'
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import mModal from '../display-components/m-modal.vue'
import '@arco-design/web-vue/dist/arco.css'

export default function previewImage(list = [], current = 1) {
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  const app = createApp(preview, {
    close: () => {
      const timer = setTimeout(() => {
        app.unmount()
        document.body.removeChild(dom)
        clearTimeout(timer)
      }, 300)
    },
    list,
    current
  })
  app.component('MModal', mModal).use(ArcoVue).use(ArcoVueIcon).mount(dom)
}
