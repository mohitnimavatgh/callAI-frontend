import { defineStore } from 'pinia'

import { apiCreateBot,apiGetBot } from '@/API/utils'

export const useBots = defineStore('bots', {
  state: () => ({
  }),
  actions: {
    async create(data: any) {
      try {
        const response = await apiCreateBot(data)
        const responseData = response.data;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async botList() {
      try {
        const response = await apiGetBot()
        const responseData = response.data;
        return responseData;
      } catch (error) {
        throw error;
      }
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
