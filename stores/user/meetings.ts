import { defineStore } from 'pinia'

export const useMeetings = defineStore('meetings', {
  state: () => ({
    upcoming: null,
    recorded: null,
    getMeetingDetail: null,
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
    async update(bot) {
      try {
        const response = await useAPI('/meeting/update', {
          method: 'PUT',
          body: bot,
        });
        const responseData = response.data.value;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async upcomingMeeting(search) {
      try {
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
    async meetingDetail(id: any) {
      try {   
        const response = await useAPI('/meeting-detail', {
          method: 'get',
          params : id
        });
        const responseData = response.data.value;
        this.getMeetingDetail = responseData.data;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async delete(meetingId: any) {
      try {
        const response = await useAPI(`/meeting/${meetingId}`, {
          method: 'DELETE'
        });
        const responseData = response.data.value;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async shareMeeting(shareMeetingData: any) {
      try {
        const response = await useAPI('/share-folder', {
          method: 'post',
          body : shareMeetingData
        });
        const responseData = response.data.value;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async notes(notes: any) {
      try {
        const response = await useAPI('/notes', {
          method: 'post',
          body : notes
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
