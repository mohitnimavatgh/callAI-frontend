<template>
  <div class="flex flex-col h-full">
    <div class="h-fit">
      <AuthHeader />
    </div>
    <div class="container h-full mx-auto px-8 lg:px-60 py-8">
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">About Us</h2>
      <p class="text-gray-500">Our Bot Creation Platform is a revolutionary tool that allows users to easily build
        intelligent bots for Microsoft Teams, Google Meet, and Zoom. Whether you're looking to automate tasks, enhance
        collaboration, or improve meeting experiences, our platform provides the flexibility and functionality you need.
      </p>
      <p class="text-gray-500 mt-4">With a user-friendly interface and powerful features, our platform empowers
        individuals and organizations to create bots tailored to their specific requirements. From call recordings and
        transcripts to post-call chat discussions, our platform offers a comprehensive solution for streamlining virtual
        meetings and enhancing productivity.</p>
      <p class="text-gray-500 mt-4">At Botify, we are committed to innovation, quality, and customer satisfaction. Our
        team consists of dedicated professionals who are passionate about developing cutting-edge technologies that
        simplify complex tasks and drive business success.</p>
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