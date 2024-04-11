import { defineStore } from 'pinia'

export const useMeetings = defineStore('meetings', {
  state: () => ({
    upcoming: null,
  }),
  actions: {
    async create(bot) {
      try {
        const response = await useAPI('/meeting', {
          method: 'post',
          body: bot,
        });
        const responseData = response.data.value;
        await this.upcomingMeeting(); // Corrected to await the function call
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async upcomingMeeting() {
      try {
        const response = await useAPI('/meeting', {
          method: 'get'
        });
        const responseData = response.data.value;
        this.upcoming = responseData.data;
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
