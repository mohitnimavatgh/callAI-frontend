import { defineStore } from 'pinia'

export const useBots = defineStore('bots', {
  state: () => ({
  }),
  actions: {
    async create(data: any) {
      try {
        const response = await useAPI('/settings', {
          method: 'post',
          body: data,
        });
        const responseData = response.data.value;
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
