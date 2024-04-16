import { defineStore } from 'pinia'

export const useMeetings = defineStore('meetings', {
  state: () => ({
    upcoming: null,
    recorded: null,
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
    async upcomingMeeting(search) {
      try {
        console.log(search)
        const response = await useAPI('/meeting', {
          method: 'get',
          params : search
        });
        const responseData = response.data.value;
        this.upcoming = responseData.data;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async recordedMeeting(search) {
      try {
        console.log(search)
        const response = await useAPI('/meeting', {
          method: 'get',
          params : search
        });
        const responseData = response.data.value;
        this.recorded = responseData.data;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
