import { defineStore } from 'pinia'
import { apiAdminLogin } from '@/API/utils'

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
      localStorage.setItem("admin_access_token", this.adminInfo.access_token);
      //@ts-ignore
      localStorage.setItem("admin_isAuthenticated", true);
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
