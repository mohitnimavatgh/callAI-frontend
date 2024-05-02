<template>
    <div class="flex h-full flex-col">
      <div class="h-fit">
        <AuthHeader />
      </div>
      <div class="container h-full mx-auto px-8 lg:px-60 py-8">
        <h2 class="text-2xl font-semibold text-gray-600 mb-4">Licensing</h2>
        <p class="text-gray-500">Our Bot Creation Platform is licensed under the MIT License, which grants users the freedom to use, modify, and distribute the software for any purpose, subject to the following conditions:</p>
        <ul class="list-disc pl-6 mt-3 text-gray-500">
          <li>You must include the original copyright notice in all copies or substantial portions of the software.</li>
          <li>The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.</li>
        </ul>
        <p class="text-gray-500 mt-4">For more details, please refer to the full text of the MIT License.</p>
      </div>
      <div class="h-fit">
        <AppFooter/>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import AuthHeader from '@/layouts/AuthHeader'
  import AppFooter from '@/layouts/AppFooter'
  definePageMeta({
      layout: 'loginLayout',
  });
  </script>