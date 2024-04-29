import { defineStore } from 'pinia'

export const useCalendar = defineStore('calendar', {
  state: () => ({
  }),
  actions: {
    async create(data: any) {
      try {
        // const response = await useAPI('/settings', {
        //   method: 'post',
        //   body: data,
        // });
        const data = {
          success:true
        }
        // const responseData = response.data.value;
        const responseData = data;
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
