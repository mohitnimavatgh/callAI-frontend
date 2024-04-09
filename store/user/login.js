import { defineStore } from 'pinia'
// import { axios } from '@/plugins/axios';

export const useLoginStore = defineStore('login', {
    state: () => ({
        count: 0,
    }),
    actions: {
        async increment() {
            const todo = await $fetch('/api/todos', {
                method: 'POST',
              })
              console.log('todo', todo)
            // try {
            //     const response = await axios.get('/api/some-endpoint');
            //     console.log(response.data); // Assuming response contains JSON data
            //     this.count++
            // } catch (error) {
            //     console.error('Error occurred:', error);
            // }
        },
        decrement() {
            this.count--
        },
    },
})
