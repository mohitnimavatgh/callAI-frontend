import { defineStore } from 'pinia'
import { apiAdminLogin,apiAdminLogout } from '@/API/utils'

export const adminAuth = defineStore('adminAuth', {
  state: () => ({
    adminInfo: null as any,
    authenticated: false as boolean,
    role: '' as string,
  }),
  actions: {
    async login(login: any) {
      try {
        const response = await apiAdminLogin(login)
        const responseData = response.data as any;
        if(response.success) {
          this.adminInfoAction(responseData);
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async adminInfoAction(response: any) {
      this.adminInfo = response;
      this.authenticated = true;
      this.role = this.adminInfo.role_name;
      localStorage.setItem("access_token", this.adminInfo.access_token);
      //@ts-ignore
      localStorage.setItem("admin_isAuthenticated", true);
    },
    async logout() {
      try {
        const response = await apiAdminLogout();
        const responseData = response.data as any;
        if(response.success) {
          this.adminInfo = null;
          this.authenticated = false;
          this.role = '';      
          localStorage.setItem("access_token", null);
          //@ts-ignore
          localStorage.setItem("isAuthenticated", false);
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
