import { defineStore } from 'pinia'
import { apiCreateChatToCall, apiGetChatToCall } from '@/API/utils'

export const useChatToCall = defineStore('chatToCall', {
  state: () => ({
    getChatList: [],
    chatId: null
  }),
  actions: {
    async create(chatMessage: any) {
      try {
        const response = await apiCreateChatToCall(chatMessage)
        const responseData = response.data;
        if(this.chatId == null){
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
        this.getChatList = responseData;  
        if(this.chatId == null){
            if(this.getChatList.length > 0){
                this.chatId = this.getChatList[0]?.chat_to_call_id;
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
