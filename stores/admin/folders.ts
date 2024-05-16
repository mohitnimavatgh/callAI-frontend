import { defineStore } from 'pinia'
import {  apiAdminGetFolders } from '@/API/utils'

export const useFolders = defineStore('folders', {
  state: () => ({
    folderPagination :null
  }),
  actions: {
    async list(folder: any) {
      try {      
        const response = await apiAdminGetFolders(folder)
        const responseData = response.data;
        if(response.success) {          
            this.folderPagination = responseData
        }
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
