<template>
    <nav class="bg-white dark:bg-gray-900  border-b border-gray-200 h-16">
      <div class="flex items-center justify-between mx-auto container h-full">
        <div class="flex items-center">
          <AppLogo />
        </div>
        
        <div class="flex items-center">
            <Button :text="'Help'" outline/>
            <Button :text="'Sign In '" class="ml-2"/>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  </script>
  