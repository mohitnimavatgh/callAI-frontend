import { defineStore } from 'pinia'
import {  apiAdminGetFolders } from '@/API/utils'

export const useFolders = defineStore('folders', {
  state: () => ({
    folders: null,
    folderPagination :null
  }),
  actions: {
    async list(folder: any) {
      try {      
        const response = await apiAdminGetFolders(folder)
        const responseData = response.data;
        if(response.success) {
          if(folder?.page){
            this.folderPagination = responseData
          }else{
            this.folders = responseData
          }       
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
