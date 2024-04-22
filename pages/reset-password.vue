<template>
    <div class="flex justify-center min-h-screen pt-20 flowbit-lg:pt-0">
      <section class="dark:bg-gray-900 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8">
        <AppLogo class="justify-center mb-6"/>
        <h3 class="text-md font-semibold text-gray-600 mb-4 mt-6 text-center">Reset your Password</h3>
        <span class="text-sm text-gray-500 mt-3 px-4 md:px-4 flex justify-center text-center">No worries, we will mail you a 6-digit code to your recovery email address to reset your password.</span>
        <div class="mt-6">
          <FormInput id="Email" label="Email" name="Email" type="text" placeholder="Recovery email ID" />
          <Button :text="'Send Code'" class="mt-3" />
          <span class="text-xs text-gray-500 mt-5 flex">Did not receive code? <a href="#" class="underline decoration-gray-400">Send again</a></span>
        </div>
      </section>
      <AppFooter />
    </div>
  </template>
  
  <script setup lang="ts">
  import AppFooter from '@/layouts/AppFooter'
  definePageMeta({
    layout: 'loginLayout',
  });
  </script>
  