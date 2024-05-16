import { defineStore } from 'pinia'
import { apiGetDashboardData } from '@/API/utils'

export const useDashboard = defineStore('dashboard', {
  state: () => ({
    dashboard:null
  }),
  actions: {
    async list() {
      try {
        const response = await apiGetDashboardData()
        const responseData = response.data;
        if(response.success){
          this.dashboard = responseData
        }
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
