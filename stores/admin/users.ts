import { defineStore } from 'pinia'
import { apiAdminGetUsers, apiAdminDeleteUsers, apiAdminUpdateUser, apiAdminCreateUser } from '@/API/utils'

export const usersStore = defineStore('usersStore', {
  state: () => ({

  }),
  actions: {
    async getUserList(payload: any) {
      try {
        const response = await apiAdminGetUsers(payload)
        const responseData = response.data as any;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async create(payload: any) {
      try {
        const response = await apiAdminCreateUser(payload);
        if (response.success) {
          const responseData = response.data;
          return responseData;
        }
      } catch (error) {
        throw error;
      }
    },
    async update(payload: any) {
      try {
        console.log(payload.name);
        
        const response = await apiAdminUpdateUser(payload);
        if (response.success) {
          const responseData = response.data;
          return responseData;
        }
      } catch (error) {
        throw error;
      }
    },
    async delete(id: any) {
      try {
        const response = await apiAdminDeleteUsers(id);
        if (response.success) {
          const responseData = response.data;
          return responseData;
        }
      } catch (error) {
        throw error;
      }
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
