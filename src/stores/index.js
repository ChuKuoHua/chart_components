import { createPinia } from 'pinia'
import router from '@/router'

const pinia = createPinia()
// pinia 可以使用 router as plugin
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

export default pinia
