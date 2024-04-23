
<template>
    <div>
        <div v-for="chat in lists">
            <div class="flex gap-2.5 mt-2 justify-end" v-if="chat?.question || chat?.quick_question_id">
                <div class="flex max-w-80 px-4 border border-gray-100 rounded-xl dark:bg-gray-700 bg-primary-50">
                    <p class="text-sm font-normal py-2.5 text-gray-600 dark:text-white leading-6">{{ chat?.quick_question_id ? chat?.quick_questions : chat?.question }}</p>
                </div>
                <img class="w-8 h-8 rounded-full" src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=" alt="Profile image">
            </div>
            <div class="flex gap-2.5 mt-2 items-start" v-if="chat?.answer">
                <i class="fas fa-robot text-gray-700"></i>
                <div class="flex max-w-80 px-4 border border-gray-100 rounded-xl dark:bg-gray-700 bg-gray-50">
                    <p class="text-sm font-normal py-2.5 text-gray-600 dark:text-white leading-6">{{ chat?.answer }}</p>
                </div>
            </div>
        </div>   
    </div>    
</template>

<script setup lang="ts">
const props = defineProps({
    lists: null,
});
</script>