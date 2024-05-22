import { defineStore } from 'pinia'
export const useLoader = defineStore('loader', {
    state: () => ({
        loading: false,
    }),
    actions: {
        async loader(status : any) {
        try {
            this.loading = status
        } catch (error) {
            throw error;
        }
        },
    }
});