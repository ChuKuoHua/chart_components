import { defineStore } from 'pinia'
export const useUiStore = defineStore('ui', {
  state: () => ({
    isOpenOffCanvas: false
  }),

  getters: {
    isOpenOffCanvasGetter: ({ isOpenOffCanvas }) => {
      return isOpenOffCanvas
    }
  },
  actions: {
    setOpenOffCanvas (status) {
      this.isOpenOffCanvas = status
    }
  }
})
