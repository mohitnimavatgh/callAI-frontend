
<template>
    <div id="chat_id">
        <div v-for="(chat, index) in lists">
            <div class="flex gap-2.5 mt-2 justify-end" v-if="chat?.question">
                <div class="flex max-w-80 px-4 border border-gray-100 dark:border-gray-500 rounded-xl dark:bg-gray-700 bg-primary-50">
                    <p class="text-sm font-normal py-2.5 text-gray-600 dark:text-gray-300 leading-6">{{ chat?.question }}</p>
                </div>
                <img class="w-8 h-8 rounded-full" src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=" alt="Profile image">
            </div>
            <div class="flex gap-2.5 mt-2 items-start" v-if="chat?.answer">
                <i class="fas fa-robot text-gray-700 dark:text-gray-300"></i>
                <div class="flex max-w-80 px-4 border border-gray-100 dark:border-gray-500 rounded-xl dark:bg-gray-700 bg-gray-50">
                    <p class="text-sm font-normal py-2.5 text-gray-600 dark:text-gray-300 leading-6">{{ chat?.answer }}</p>
                </div>
            </div>
            <div class="flex gap-2.5 mt-2 items-start" v-if="!chat?.answer && (index == lists.length - 1)">
                <i class="fas fa-robot text-gray-700 dark:text-gray-300"></i>
                <div class="flex w-[90px] px-4 border border-gray-100 dark:border-gray-500 rounded-xl dark:bg-gray-700 bg-gray-50">
                    <p class="text-sm font-normal py-2.5 text-gray-600 dark:text-gray-300 leading-6">Typing{{ typing }}</p>
                </div>
            </div>
        </div>   
    </div>    
</template>

<script setup lang="ts">
const props = defineProps({
    lists: null,
    typing:''
});
</script>