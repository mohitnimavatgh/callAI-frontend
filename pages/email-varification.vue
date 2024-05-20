<template>
    <div class="flex flex-col h-full">
        <div class="h-fit">
            <AppTopbar />
        </div>
        <div class="flex flex-col px-4 items-center justify-center h-full w-full">
            <div class="w-fit bg-white shadow rounded-xl px-10 py-6 text-center h-fit">
                <i class="fa-solid text-5xl text-primary-600 fa-envelope-circle-check"></i>
                <div class="text-primary-500 mt-6 text-center font-wrap text-xl sm:text-2xl">
                    {{ isVerified ? 'Email Verifiede successfully !' : 'Failed to verify Email' }}
                </div>
                <div class="text-primary-500 mt-4 text-center font-wrap text-xl sm:text-2xl">
                    {{ isVerified ? 'Thank you' : 'Please Try again' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppTopbar from '~/layouts/AppTopbar.vue';

definePageMeta({
    layout: 'login-layout'
})

const isVerified = ref<boolean>(false)

</script>