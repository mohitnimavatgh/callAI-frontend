import { defineStore } from 'pinia'

export const useChatToCall = defineStore('chatToCall', {
  state: () => ({
    getChatList: null,
    chatId: null
  }),
  actions: {
    async create(chatMessage: any) {
      try {
        const response = await useAPI('/chat-call', {
          method: 'post',
          body: chatMessage,
        });
        const responseData = response.data.value;
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
        const response = await useAPI('/chat-call', {
            method: 'get',
            params : meetingId
        });
        const responseData = response.data.value;
        this.getChatList = responseData.data;  
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
