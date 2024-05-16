<template>
  <div>
    <tab-button-group :items="tabItems" @tab-click="tabChanged" :selectedTab="selectedTab" />
    <NuxtPage />
  </div>
</template>
  
<script setup lang="ts">

const selectedTab = ref('');
const tabItems = ref([
  { label: 'Bot', icon: 'fas fa-robot', url: 'call-ai-settings' },
  { label: 'Calander', icon: 'fas fa-calendar', url: 'call-ai-settings-calendar' },
  { label: 'Folders', icon: 'fas fa-folder-open', url: 'call-ai-settings-folders' },
  { label: 'Quick Questions', icon: 'fas fa-question', url: 'call-ai-settings-quick-questions' }
]);

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const matchedTab = tabItems.value.find(item => item.url === route.value.name);
  selectedTab.value = matchedTab ? matchedTab.label : 'Bot';
});

const tabChanged = (item: any) => {
  selectedTab.value = item.label;
  router.push({ name: item.url });
};
</script>
  