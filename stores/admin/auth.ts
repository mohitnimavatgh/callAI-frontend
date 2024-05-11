import { defineStore } from 'pinia'

export const adminAuth = defineStore('adminAuth', {
  state: () => ({
    adminInfo: null as any,
    authenticated: false as boolean,
    role: '' as string,
  }),
  actions: {
    async login(login: any) {
      try {
        const response = await useAPI('../login', {
          method: 'post',
          body: login,
        });
        const responseData = response.data.value as any;
        if(responseData.success) {
          this.adminInfoAction(responseData.data);
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
