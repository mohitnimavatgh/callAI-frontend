import { defineStore } from 'pinia'

export const useQuickQuestions = defineStore('quickQuestions', {
  state: () => ({
    quickQuestions: null,
    allQuickQuestions:null
  }),
  actions: {
    async create(quickQuestion: any) {
      try {        
        const response = await useAPI('/quick-question', {
          method: 'post',
          body: quickQuestion,
        });
        const responseData = response.data.value;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async list(quickQuestion) {
      try {      
        const response = await useAPI('/quick-question', {
            method: 'get',
            params : quickQuestion
        });
        const responseData = response.data.value; 
        if(quickQuestion?.page){
          this.quickQuestions = responseData.data
        }else{
          this.allQuickQuestions = responseData.data
        }                  
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async update(quickQuestion: any) {
      try {      
        const response = await useAPI(`/quick-question/update/?id=${quickQuestion.id}`, {
          method: 'PATCH',
          body: quickQuestion,
        });
        const responseData = response.data.value;
        return responseData;
      } catch (error) {
        throw error;
      }
    },

    async delete(quickQuestion_id: any) {
      try {      
        const response = await useAPI(`/quick-question/${quickQuestion_id}`, {
          method: 'DELETE'    
        });
        const responseData = response.data.value
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
