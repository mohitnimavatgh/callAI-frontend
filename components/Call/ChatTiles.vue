
import type UserLogo from '../UserLogo.vue';
<template>
    <div :class="{'flex gap-2.5 mt-5': true, 'justify-end' : chat.type == 'sender', 'items-start' : chat.type == 'receiver'}" v-for="(chat, key) in lists">
        <UserLogo v-if="chat.type == 'receiver'"/>
        <div class="flex max-w-80 px-4  border border-gray-100 rounded-xl dark:bg-gray-700" :class="{'bg-primary-50' : chat.type == 'sender', 'bg-gray-50' : chat.type == 'receiver'}">
            <p class="text-sm font-normal py-2.5 text-gray-600 dark:text-white leading-6">{{ chat.message }}</p>
        </div>
        <UserLogo v-if="chat.type == 'sender'"/>
    </div>
</template>

<script>
export default {
    props: {    
        lists: {
            type: Array,
            default: () => []
        },
    }
}
</script>