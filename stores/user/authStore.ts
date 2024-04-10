import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userInfo: null,
    authenticated: false,
    role: ''
  }),
  actions: {
    async login(login : any) {
      try {
        const self = this
        await useAPI('/login', {
          method: 'post',
          body: login,
          onResponse({ response }) {
            if (response._data?.success) {
              self.userInfo = response._data.data
              self.authenticated = true
              self.role = self.userInfo?.role
              localStorage.setItem("access_token", this.userInfo.access_token);
            }
            return response._data
          },
        })
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
