<script setup lang="ts">
import { useRoute } from 'vue-router';

definePageMeta({
    layout: 'admin',
    middleware: 'is-admin-authenticate',
})

const route = useRoute();

</script>

<template>
    <div class="w-full h-full dark:text-gray-300">
        <div class="text-gray-700 text-3xl">
            {{ route.params.id ? 'Edit' : 'Add'}} User
        </div>
        <div class="mt-10">
            
        </div>
    </div>
</template>

<style>
</style>