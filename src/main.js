import { createApp } from 'vue'

import router from './router'
import pinia from './stores/index'
import VueSweetAlert from 'vue-sweetalert2'
import 'primeicons/primeicons.css'
import primeZHTw from '@/utils/primevue/zh-TW.js'
import PrimeVue from 'primevue/config'
import '@/scss/all.scss'

import {
  Field, Form, ErrorMessage, defineRule, configure
} from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import App from './App.vue'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})

setLocale('zh_TW')

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(VueSweetAlert)
app.use(PrimeVue, {
  locale: primeZHTw['zh-TW']
})
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
