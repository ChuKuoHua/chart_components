import { defineStore } from 'pinia'
import { getKanBanEngDataApi, getKanBanQueryDueWoApi } from '@/api/kanban/project_kanban.js'

export const kanbanManageStore = defineStore('kanbanManageStore', () => {
  const kanBanEngData = ref([])
  const OverdueWorkOrdersData = ref([])
  const getKanBanEngData = async ({
    woSn,
    matCodename,
    beginMonth,
    endMonth
  }) => {
    const { data } = await getKanBanEngDataApi({
      woSn,
      matCodename,
      beginMonth,
      endMonth
    })
    kanBanEngData.value = data?.data
  }
  const getKanBanQueryDueWo = async ({ dueDate }) => {
    const { data } = await getKanBanQueryDueWoApi({ dueDate })
    OverdueWorkOrdersData.value = data?.data
  }

  return {
    kanBanEngData,
    OverdueWorkOrdersData,
    getKanBanEngData,
    getKanBanQueryDueWo
  }
})
