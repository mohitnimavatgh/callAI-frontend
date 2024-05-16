<template>
    <div class="w-full h-full dark:text-gray-300">
        <div class="text-gray-700 text-3xl">
            User Detail
        </div>
        <div class="mt-10">
            <tab-button-group :items="tabItems" @tab-click="tabChanged" :selectedTab="selectedTab" />
            <NuxtPage />
        </div>
    </div>
</template>
  
<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: 'is-admin-authenticate',
})
const route = useRoute();
const router = useRouter();
const selectedTab = ref('');
const user_id = ref(route.params.id);
const tabItems = ref([
  { label: 'Meeting', icon: 'fas fa-video', url: `/admin/users/${user_id.value}/meetings`},
  { label: 'Upcoming Meeting', icon: 'fas fa-calendar', url: `/admin/users/${user_id.value}/upcoming-meetings`},
  { label: 'Recorded Meeting', icon: 'fas fa-file', url: `/admin/users/${user_id.value}/recorded-meetings`},
  { label: 'Folders', icon: 'fas fa-folder-open', url: `/admin/users/${user_id.value}/folders`}
]);



onMounted(() => {
  selectedTab.value = 'Meeting';
  router.push(`/admin/users/${user_id.value}/meetings`);
});

const tabChanged = (item: any) => {
  selectedTab.value = item.label;
  router.push(item.url);
};
</script>
  