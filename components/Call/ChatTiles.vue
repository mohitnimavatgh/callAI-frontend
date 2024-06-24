
<template>
    <div id="chat_id">
        <div v-for="(chat, index) in props.lists">
            <div class="flex gap-2.5 mt-2 justify-end" v-if="chat?.question">
                <div class="flex max-w-80 px-4 border border-gray-100 dark:border-gray-500 rounded-xl dark:bg-gray-700 bg-primary-50">
                    <p class="text-sm font-normal py-2.5 text-gray-600 dark:text-gray-300 leading-6">{{ chat?.question }}</p>
                </div>
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gray-600 dark:bg-gray-900 text-gray-300">
                    {{initials}}
                </div>
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

const props = defineProps(['lists','typing'])

const iconName = JSON.parse(localStorage.getItem('auth'))

function getInitials(name: string) {
  // Split the string into an array of words
  const words = name.split(' ');

  // Get the first letter of each word and combine them
  const initials = words.map(word => word.charAt(0).toUpperCase()).join('');

  return initials;
}

const initials = getInitials(iconName.userInfo.name);

</script>