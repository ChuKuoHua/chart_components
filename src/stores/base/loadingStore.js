import { defineStore } from 'pinia'
export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false
  }),
  getters: {
    getIsLoading: ({ isLoading }) => {
      return isLoading
    }
  },
  actions: {
    setLoading (status) {
      this.isLoading = status
    }
  }
})
