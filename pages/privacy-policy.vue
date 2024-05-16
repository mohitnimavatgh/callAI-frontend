<template>
  <div class="h-full flex flex-col">
    <div class="h-fit">
      <AuthHeader />
    </div>
    <div class="container h-full mx-auto px-8 md:px-60 py-8 ">
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">Privacy Policy</h2>
      <p class="text-gray-500">At Botify, we are committed to protecting your privacy and ensuring the security of your
        personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you
        use our Bot Creation Platform.</p>
      <h3 class="text-lg font-semibold text-gray-600 mt-6 mb-3">Information We Collect</h3>
      <p class="text-gray-500">We may collect various types of information from users, including:</p>
      <ul class="list-disc pl-6 mt-3 text-gray-500">
        <li>Personal Information: Name, email address, contact details, etc.</li>
        <li>Usage Data: Browsing history, device information, IP address, etc.</li>
        <li>Cookies and Tracking Technologies: Data collected through cookies and similar technologies.</li>
      </ul>
      <!-- Add more sections as needed -->
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
  middleware: 'is-authenticate'
});
</script>