import { defineStore } from 'pinia'
import { apiCreateFolder, apiGetFolders, apiUpdateFolder } from '@/API/utils'

export const useFolders = defineStore('folders', {
  state: () => ({
    folders: null,
    folderPagination :null
  }),
  actions: {
    async create(bot: any) {
      try {
        const response = await apiCreateFolder(bot)
        const responseData = response.data;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async list(folder: any) {
      try {      
        const response = await apiGetFolders(folder)
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
    },
    async update(data:any) {
      try {      
        const response = await apiUpdateFolder(data.id, data);
        const responseData = response.data;
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
