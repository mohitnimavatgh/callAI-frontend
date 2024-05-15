import { defineStore } from 'pinia';
import {
  apiCreateQuickQuestion,
  apiGetQuickQuestion,
  apiUpdateQuickQuestion,
  apiDeleteQuickQuestion
} from '@/API/utils'

export const useQuickQuestions = defineStore('quickQuestions', {
  state: () => ({
    quickQuestions: null,
    allQuickQuestions: null
  }),
  actions: {
    async create(quickQuestion: any) {
      try {
        const response = await apiCreateQuickQuestion(quickQuestion);
        const responseData = response.data;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async list(quickQuestion: any) {
      try {
        const response = await apiGetQuickQuestion(quickQuestion)
        const responseData = response.data;
        if (response.success) {
          if (quickQuestion?.page) {
            this.quickQuestions = responseData
          } else {
            this.allQuickQuestions = responseData
          }
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async update(quickQuestion: any) {
      try {
        const response = await apiUpdateQuickQuestion(quickQuestion.id, quickQuestion)
        const responseData = response.data;
        return responseData;
      } catch (error) {
        throw error;
      }
    },

    async delete(quickQuestion_id: any) {
      try {
        const response = await apiDeleteQuickQuestion(quickQuestion_id);
        if (response.success) {
          const responseData = response.data
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
