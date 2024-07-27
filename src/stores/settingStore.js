import { defineStore } from 'pinia'
export const useWebSettingStore = defineStore('webSettings', () => {
  const webSetList = ref('')
  const userGroups = ref('')
  const getWebSettings = async () => {
    const { data } = await getWebSettingsApi()
    webSetList.value = data?.data
  }

  const getGroups = async () => {
    const { data } = await getGroupsApi()
    userGroups.value = data
  }

  return {
    webSetList,
    userGroups,
    getWebSettings,
    getGroups
  }
})
