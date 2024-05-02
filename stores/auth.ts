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
          this.userInfoAction(responseData.data);
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async userInfoAction(response: any) {
      this.userInfo = response;
      this.authenticated = true;
      this.role = this.userInfo?.role;      
      localStorage.setItem("access_token", this.userInfo.access_token);
      localStorage.setItem("isAuthenticated", true);
    },
    async signup(data: any) {
      try {
        const response = await useAPI('/signup', {
          method: 'post',
          body: data,
        });
        const responseData = response.data.value;
        if(responseData.success) {
          if(responseData.data.social_type){
            console.log("responseData.data-",responseData.data)
            this.userInfoAction(responseData.data);
          }
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async resetSendLink(data: any) {
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
    async forgotPassword(data: any) {
      try {
        const response = await useAPI('/forgot-password', {
          method: 'post',
          body: data,
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
