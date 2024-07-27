<script setup>
import 'vue-loading-overlay/dist/css/index.css'
import { ref } from 'vue'
import VLoading from 'vue-loading-overlay'
import { useLoadingStore } from '@/stores/base/loadingStore.js'
import { useUserStore } from './stores/userStore'
import { useWebSettingStore } from './stores/settingStore'
import dayjs from 'dayjs'

const now = dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss')).unix()
const router = useRouter()
const loadingStore = useLoadingStore()
const userStore = useUserStore()
const useWebSetting = useWebSettingStore()
const status = computed(() => loadingStore.isLoadingGetter)
const webHeadSetList = computed(() => useWebSetting.webSetList)
const setTitle = ref('')
const fullPage = ref(true)

watch(webHeadSetList, () => {
  document.title = useWebSetting.webSetList?.find(item => item.remark === '網站標題')?.value || '華億_MES'
  setTitle.value = useWebSetting.webSetList?.find(item => item.remark === '系統登入表單標題')?.value || '華億_MES'
})
onMounted(() => {
  const data = JSON.parse(localStorage.getItem('hyUser') || '{}')
  if (data.id === undefined || now > data.expired) {
    localStorage.removeItem('hyUser')
    router.push('/login')
  }
  const { apiToken, expired, id, name } = data

  userStore.setToken(apiToken)
  userStore.setExpires(expired)
  userStore.setId(id)
  userStore.setName(name)
  useWebSetting.getWebSettings()
})
</script>

<template>
  <VLoading
    v-model:active="status"
    :is-full-page="fullPage"
  />
  <main
    class="main"
  >
    <RouterView
      :set-title="setTitle"
    />
  </main>
</template>

<style lang="scss" scoped>
.main {
  transition: padding-left .3s;
}
</style>
