import { defineStore } from 'pinia'
import { apiAdminGetUpcomingMeeting, apiAdminGetRecordedMeeting } from '@/API/utils'

export const useMeetings = defineStore('meetings', {
  state: () => ({
    upcoming: null,
    recorded: null,
    getMeetingDetail: null,
  }),
  actions: {
    async upcomingMeeting(search: any) {
      try {
        const response = await apiAdminGetUpcomingMeeting(search);
        const responseData = response.data;
        if (response.success) {
          this.upcoming = responseData;
          return responseData;
        }
      } catch (error) {
        throw error;
      }
    },
    async recordedMeeting(search: any) {
      try {
        const response = await apiAdminGetRecordedMeeting(search)
        const responseData = response.data;
        if(response.success){
          this.recorded = responseData;
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
