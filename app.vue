<template>
  <div class="bg-app main-body bg-primary-50">
      <NuxtLayout>
          <NuxtPage />
      </NuxtLayout>
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.1rem);
}
</style>