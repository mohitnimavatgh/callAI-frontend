import { defineStore } from 'pinia'

export const useCalendar = defineStore('calendar', {
  state: () => ({
    calendarSettingData : null
  }),
  actions: {
    async create(data: any) {
      try {
        console.log("data--",data)
        // const response = await useAPI('/settings', {
        //   method: 'post',
        //   body: data,
        // });
        const data_ = {
          success:true
        }
        // const responseData = response.data.value;
        const responseData = data_;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async calendarSetting() {
      console.log('getCalendarSetting')
      try {
        const response = await useAPI('/calendar-setting', {
          method: 'get',
        });     
        const responseData = response.data.value;    
        this.calendarSettingData = responseData.data
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async update(data: any) {
      try {
        const response = await useAPI('/calendar-setting/update', {
          method: 'PATCH',
          body: data,
        });     
        const responseData = response.data.value;
        this.calendarSettingData = responseData.data
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
