<script setup lang="ts">
import { useRoute } from 'vue-router';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

const route = useRoute();


</script>

<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 flex">
        <div v-if="route.name != 'admin-login'" class="h-fit sm:h-full sm:w-[250px] text-white">
            <AppSidebar />
        </div>
        <div class="h-full flex flex-col w-full dark:bg-gray-800">
            <div v-if="route.name != 'admin-login'" class="h-fit w-full">
                <AppTopbar />
            </div>
            <div :class="route.name != 'admin-login' ? '' : 'bg-gray-300 dark:bg-primary-800'" class="h-full py-16 px-24 w-full">
                <slot ></slot>
            </div>
        </div>
    </div>
</template>