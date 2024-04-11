import { defineStore } from 'pinia'

export const useFolders = defineStore('folders', {
  state: () => ({
    folders: null,
  }),
  actions: {
    async create(bot: any) {
      try {
        const response = await useAPI('/folders', {
          method: 'post',
          body: bot,
        });
        const responseData = response.data.value;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async list() {
      try {
        const response = await useAPI('/folders', {
            method: 'get'
        });
        const responseData = response.data.value;
        this.folders = responseData.data
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
