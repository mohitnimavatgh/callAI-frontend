import { defineStore } from 'pinia'

export const useDashboard = defineStore('dashboard', {
  state: () => ({
    dashboard:null
  }),
  actions: {
    async list() {
      try {
        const response = await useAPI('/dashboard', {
          method: 'get',
        });
        const responseData = response.data.value;
        this.dashboard = responseData.data
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
