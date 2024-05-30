<template>
    <!-- <Tabs class="mt-3" :menuItems="menuItems" @change="handleMenuChange" /> -->
    <div class="mt-5 mb-5">
      <NuxtPage />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout : 'user'
})

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2500s !important;
}
.page-enter-from,
.page-leave-to {
  opacity: 0 !important;
  filter: blur(0.1rem) !important;
}

</style>
