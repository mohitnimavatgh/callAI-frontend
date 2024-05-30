import { defineStore } from 'pinia'
import { apiCreateChatToCall, apiGetChatToCall, apiGetChatToCallHistory, apiUpdateChatTitle, apiSendChatEmail } from '@/API/utils'

export const useChatToCall = defineStore('chatToCall', {
  state: () => ({
    getChatList: [],
    chatId: null,
    getChatHistory: [],
  }),
  actions: {
    async create(chatMessage: any) {
      try {
        const response = await apiCreateChatToCall(chatMessage)
        const responseData = response.data;
        if (this.chatId == null) {
          this.chatId = responseData.data.chat_to_call_id
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async list(meetingId: any) {
      try {
        const response = await apiGetChatToCall(meetingId)
        const responseData = response.data;
        if (response.success) {
          this.getChatList = responseData;
          if (this.chatId == null) {
            if (this.getChatList.length > 0) {
              this.chatId = this.getChatList[0]?.chat_to_call_id;
            }
          }
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async getHistory(meetingId: any) {
      try {
        const response = await apiGetChatToCallHistory(meetingId)
        const responseData = response.data;
        if (response.success) {
          this.getChatHistory = responseData;
        }
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async updateChatName(id: Number){
      try {
        const response = await apiUpdateChatTitle(id)
        const responseData = response.data;
        return responseData;
      } catch (error) {
        throw error;
      }
    },
    async sendChatEmail(data: any){
      try {
        const response = await apiSendChatEmail(data)
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
