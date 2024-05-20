<script setup lang="ts">

definePageMeta({
  layout : 'admin',
  middleware : 'is-admin-authenticate'
})

</script>

<template>
    <div class="w-full h-full">
      <NuxtPage />
    </div>
</template>