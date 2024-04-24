import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    userInfo: null,
    authenticated: false,
    role: ''
  }),
  actions: {
    async login(login) {
      try {
        const response = await useAPI('../login', {
          method: 'post',
          body: login,
        });
        const responseData = response.data.value;
    
        if(responseData.success) {
          console.log('response.data', responseData.data);
          this.userInfo = responseData.data;
          this.authenticated = true;
          this.role = this.userInfo?.role;
          localStorage.setItem("access_token", this.userInfo.access_token);
          localStorage.setItem("isAuthenticated", true);
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async signup(data: any) {
      try {
        const response = await useAPI('/signup', {
          method: 'post',
          body: data,
        });
        const responseData = response.data.value;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async resetPassword(data: any) {
      try {
        const response = await useAPI('/reset-link-email', {
          method: 'get',
          params: data,
        });
        const responseData = response.data.value; 
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
