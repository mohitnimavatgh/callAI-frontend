import { defineStore } from 'pinia'
import { 
  apiUserLogin, 
  apiUserSignUp,
  apiUserResetSendLink,
  apiUserForgetPassword,
  apiChangePassword,
  apiUserUpdateProfile,
  apiEmailVarification,
  apiUserLogout } from '@/API/utils'

export const useAuth = defineStore('auth', {
  state: () => ({
    userInfo: null as any,
    authenticated: false as boolean,
    role: '' as string,
    topBarActiveVal: '' as string
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
        return response;
      } catch (error) {
        throw error;
      }
    },
    async forgotPassword(data: any) {
      try {
        const response = await apiUserForgetPassword(data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async changePassword(payload: any){
      const response = await apiChangePassword(payload)
      return response;
    },
    async updateProfile(payload: any){
      try {
        const response = await apiUserUpdateProfile(payload)
        const responseData = response.data as any;
        if(response.success) {
          console.log("reponse--",responseData)
          this.userInfo = responseData;
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async emailVarification(payload: any) {
      try {
        const response = await apiEmailVarification(payload);
        return response;
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
    handleChangeActiveValue(item: string){
      this.topBarActiveVal = item
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
});