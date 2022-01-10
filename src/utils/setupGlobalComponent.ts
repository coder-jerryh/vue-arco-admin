import mPage from '../components/display-components/m-page.vue'
import mToolbar from '../components/display-components/m-toolbar.vue'
import mModal from '../components/display-components/m-modal.vue'
import mSearcher from '../components/form-components/m-searcher.vue'
import mSelecter from '../components/form-components/m-selecter.vue'
import mDateSelecter from '../components/form-components/m-date-selecter.vue'
import mRadio from '../components/form-components/m-radio.vue'
import aButton from '../components/form-components/a-button.vue'
import vueArcoForm from '../components/vue-arco-form/index.vue'
import previewImage from '../components/preview-image/index'
const globalThis: any = window
export const setupGlobalComponent = {
  install(app: any) {
    app.component('MPage', mPage)
    app.component('MToolbar', mToolbar)
    app.component('MSearcher', mSearcher)
    app.component('MSelecter', mSelecter)
    app.component('MDateSelecter', mDateSelecter)
    app.component('MRadio', mRadio)
    app.component('AButton', aButton)
    app.component('MModal', mModal)
    app.component('VueArcoForm', vueArcoForm)
    globalThis.PreviewImage = previewImage
  }
}
