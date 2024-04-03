import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++
        },
        decrement() {
            this.count--
        },
    },
})