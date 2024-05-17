import { defineStore } from 'pinia'
import { 
  apiUserLogin, 
  apiUserSignUp,
  apiUserResetSendLink,
  apiUserForgetPassword,
  apiUserLogout } from '@/API/utils'

export const useAuth = defineStore('auth', {
  state: () => ({
    userInfo: null as any,
    authenticated: false as boolean,
    role: '' as string,
  }),
  actions: {
    async login(login : any) {
      try {
        const response = await apiUserLogin(login)
        const responseData = response.data as any;
        if(response.success) {
          this.userInfoAction(responseData);
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async userInfoAction(response: any) {
      this.userInfo = response;
      this.authenticated = true;
      this.role = this.userInfo?.role_name;      
      localStorage.setItem("access_token", this.userInfo.access_token);
      //@ts-ignore
      localStorage.setItem("isAuthenticated", true);
    },
    async signup(data: any) {
      try {
        const response = await apiUserSignUp(data)
        const responseData = response.data as any;
        if(response.success) {
          if(responseData.social_type){
            this.userInfoAction(responseData);
          }
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async resetSendLink(data: any) {
      try {
        const response = await apiUserResetSendLink(data);
        const responseData = response.data; 
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async forgotPassword(data: any) {
      try {
        const response = await apiUserForgetPassword(data);
        const responseData = response.data; 
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      try {
        const response = await apiUserLogout();
        const responseData = response.data as any;
        if(response.success) {
          this.userInfo = null;
          this.authenticated = false;
          this.role = '';      
          localStorage.clear();
        }
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
