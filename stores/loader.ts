import { defineStore } from 'pinia'
export const useLoader = defineStore('loader', {
    state: () => ({
        loading: false,
        topBarActiveVal: '' as string
    }),
    actions: {
        async loader(status : any) {
        try {
            this.loading = status
        } catch (error) {
            throw error;
        }
        },
        handleChangeActiveValue(item: string){
            this.topBarActiveVal = item
          }
    }
});