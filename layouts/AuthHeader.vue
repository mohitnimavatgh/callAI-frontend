<template>
  <nav class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-500 h-16">
    <div class="flex items-center px-4 justify-between mx-auto container h-full">
      <div class="flex items-center">
        <AppLogo />
      </div>
      
      <div class="flex items-center">
        <Button :text="'Help'" outline/>
        <template v-if="currentPage == 'login'">
          <NuxtLink to="register" class="ml-2">
            <Button :text="'Register'" />
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="login" class="ml-2">
            <Button :text="'Sign In '" />
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const currentPage = router.currentRoute.value.name;
</script>
