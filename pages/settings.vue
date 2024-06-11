<template>
  <div class="my-5 dark:px-4">
    <tab-button-group :items="tabItems" @tab-click="tabChanged" :selectedTab="selectedTab" />
    <NuxtPage />
  </div>
</template>
  
<script setup lang="ts">

definePageMeta({
  layout: 'user'
})

const selectedTab = ref('');
const tabItems = ref([
  { label: 'Bot', icon: 'fas fa-robot', url: 'settings' },
  { label: 'Calander', icon: 'fas fa-calendar', url: 'settings-calendar' },
  { label: 'Folders', icon: 'fas fa-folder-open', url: 'settings-folders' },
  { label: 'Quick Questions', icon: 'fas fa-question', url: 'settings-quick-questions' }
]);

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const matchedTab = tabItems.value.find(item => item.url === route.name);
  selectedTab.value = matchedTab ? matchedTab.label : 'Bot';
});

const tabChanged = (item: any) => {
  selectedTab.value = item.label;
  router.push({ name: item.url });
};
</script>
  