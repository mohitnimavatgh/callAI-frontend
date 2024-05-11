<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const sideBarLinks = ref<string[]>(['users'])

</script>

<template>
    <div class="w-full h-full overflow-y-auto">
        <div class="py-5 mx-auto w-fit">
            <AppLogo />
        </div>
        <div class="w-full border-t pt-8 border-primary-600">
            <div class="text-gray-600 font-bold font-sans capitalize px-4 text-lg">
                <div v-for="(item, index) in sideBarLinks" :key="index">
                    <div :class="route.name.toLocaleLowerCase() == `admin-${item}` ? 'bg-primary-300 dark:bg-primary-500 text-gray-800 dark:text-white' : ''" class="py-1 my-1 w-full transition-all duration-300 px-4 rounded-md hover:bg-primary-300">
                        <nuxt-link :to="`/admin/${item}`">{{item}}</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>