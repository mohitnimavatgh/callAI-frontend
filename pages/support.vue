<template>
  <div class="flex h-full flex-col">
    <div class="h-fit">
      <AuthHeader />
    </div>
    <div class="container text-gray-500 h-full mx-auto px-8 lg:px-60 py-8">
      <h2 class="text-3xl font-semibold text-gray-600">Support</h2>
      <p>For support please contact <a class="text-blue-500 underline" href="mailto:hirparapallavi36@gmail.com">hirparapallavi36@gmail.com</a></p>
      <p class="mt-4">
        <div class="text-3xl font-bold text-gray-600 mb-1">Hours of operation</div>
        Scheduled maintenance will be communicated to the Customer at least 2 days in advance. During such
        maintenance, services may be temporarily unavailable. <br />
        Cuota Infotech will provide support during business hours (9am-6pm GMT). Response times for support will aim to be resolved within  3 hours during business hours.
      </p>
    </div>
    <div class="h-fit">
      <AppFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
import AuthHeader from '@/layouts/AuthHeader'
import AppFooter from '@/layouts/AppFooter'
definePageMeta({
  layout: 'login-layout',
});
</script>