import { defineStore } from 'pinia'

export const useFolders = defineStore('folders', {
  state: () => ({
    folders: null,
    folderPagination :null
  }),
  actions: {
    async create(bot: any) {
      try {
        const response = await useAPI('/folders', {
          method: 'post',
          body: bot,
        });
        const responseData = response.data.value;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async list(folder) {
      try {      
        const response = await useAPI('/folders', {
            method: 'get',
            params : folder
        });
        const responseData = response.data.value;
        if(folder?.page){
          this.folderPagination = responseData.data
        }else{
          this.folders = responseData
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
