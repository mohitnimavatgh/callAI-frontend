import { defineStore } from 'pinia'
import { 
  apiGetCalanderStatus,
  apiGoogleCalanderConnection,
  apiMicrosoftTeamsConnection,
  apiGetCalanderSetting,
  apiUpdateCalanderSetting,
  apiDisconnectCalendar
 } from '@/API/utils'

export const useCalendar = defineStore('calendar', {
  state: () => ({
    calendarSettingData : null,
    google_calendar_connection: false,
    microsoft_calendar_connection: false
  }),
  actions: {
    async calendarStatus() {
      try {
        const response = await apiGetCalanderStatus(); 
        const responseData = response.data;
        if(response.success){
          this.google_calendar_connection = responseData?.google_calendar == "connecting"? true : false;
          this.microsoft_calendar_connection = responseData?.microsoft_outlook == "connecting"? true : false;
        }        
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async google(data: any) {
      try {
        const response = await apiGoogleCalanderConnection(data)     
        return response;
      } catch (error) {
        throw error;
      }
    },
    async microsoftTeams(data: any) {
      try {
        const response = await apiMicrosoftTeamsConnection(data)      
        return response;
      } catch (error) {
        throw error;
      }
    },
    async disconnectCalendar(data: any) {
      try {
        const response = await apiDisconnectCalendar(data)
        return response;
      } catch (error) {
        throw error;
      }
    },
    async calendarSetting() {
      try {
        const response = await apiGetCalanderSetting()     
        const responseData = response.data; 
        if(response.success){   
          this.calendarSettingData = responseData
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async update(data: any) {
      try {
        const response = await apiUpdateCalanderSetting(data)     
        const responseData = response.data;
        if(response.success){  
          this.calendarSettingData = responseData
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
