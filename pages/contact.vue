<template>
    <AuthHeader />

    <div class="container mx-auto px-8 md:px-60 py-8">
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">Contact Us</h2>
      <p class="text-gray-500">If you have any questions, feedback, or inquiries, please feel free to reach out to us using the contact information below:</p>
      <div class="mt-4">
        <p class="text-gray-500"><span class="font-semibold">Email:</span> info@botify.com</p>
        <p class="text-gray-500"><span class="font-semibold">Phone:</span> +1 (123) 456-7890</p>
        <p class="text-gray-500"><span class="font-semibold">Address:</span> 123 Bot Street, Suite 101, Virtual City, VC 12345</p>
      </div>
    </div>
    <AppFooter/>
  </template>
  <script setup lang="ts">
  import AuthHeader from '@/layouts/AuthHeader'
  import AppFooter from '@/layouts/AppFooter'
  definePageMeta({
      layout: 'loginLayout',
  });
  </script>