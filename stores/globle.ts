import { defineStore } from 'pinia'
export const useGloble = defineStore('globle', {
    state: () => ({
        mode: 'light',
    }),
    actions: {
        async theme(status: any) {
            try {
                this.mode = status
            } catch (error) {
                throw error;
            }
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
});