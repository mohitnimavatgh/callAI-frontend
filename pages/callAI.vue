<template>
  <div>
    <div class="flex justify-between align-items-center">
      <div>
        <h4 class="text-2xl font-bold text-gray-700">Meet AI</h4>
        <p class="mb-6 text-sm font-normal text-gray-500 mt-1">AI-Powered Meeting Recording Simplified</p>
      </div>
      <Button :text="'Meeting Bot'" frontIcon="fas fa-video" @click="joinModal = !joinModal" class="h-full"/>
      <Modal :title="'Meeting Bot'" :subTitle="'Meet AI will join and record the meeting'" :show="joinModal" @close="joinModal = false">
        <div class="modal-content  p-4 md:p-5">
          <div class="col-span-2 mb-3">
            <FormInput 
                v-model="meeting.name"
                id="Name"
                label="Meeting Name"
                name="Name"
                type="text"
                placeholder="Name"
            />
          </div>
          <div class="col-span-2 mb-3">
            <FormSelect label="Folder" id="Folder" name="folder" v-model="meeting.folder" :options="countryOptions" :rules="[requiredRule]" />
          </div>
          <div class="col-span-2">
            <FormInput 
                v-model="meeting.url"
                id="Meeting URL"
                label="Meeting URL"
                name="Meeting URL"
                type="text"
                placeholder="Meeting URL"
            />
          </div>
        </div>
        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <Button class="mr-2" :text="'Add Meeting'" frontIcon="fas fa-plus"/>
          <Button :text="'Cancel'" @click="joinModal = false" outline/>
        </div>
      </Modal>
    </div>  
    <Tabs class="mt-3" :menuItems="menuItems" @change="handleMenuChange" />
    <div class="mt-5">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  // middleware: ["auth"]
})
const meeting = ref({
  name: '',
  folder: '',
  url: '',
});

const joinModal = ref(false);

const countryOptions = ref([
  { value: 'Marketing', label: 'Marketing'},
  { value: 'Sales', label: 'Sales'},
  { value: 'IT Department', label: 'IT Department'},
  { value: 'Software', label: 'Software'},
]);

const menuItems = ref([
  { label: 'Home', icon: 'fas fa-home', active: false, url: '/callAI' },
  { label: 'Calls', icon: 'fas fa-phone', active: false, url: '/callAI/call' },
  { label: 'Settings', icon: 'fas fa-gear', active: false, url: '/callAI/settings' }
]);

const router = useRouter();

const setActiveMenuItem = () => {
  const currentPath = router.currentRoute.value.path;
  menuItems.value.forEach(item => {
    if (item.url === '/callAI') {
      item.active = currentPath === '/callAI';
    } else {
      item.active = currentPath.startsWith(item.url);
    }
  });
};

watch(router.currentRoute, setActiveMenuItem);

const handleMenuChange = (menuItem) => {
  menuItems.value.forEach(item => {
    item.active = false;
  });
  menuItem.active = true;
  router.push(menuItem.url);
};

const handleSearch = (value) => {
  console.log('Search value:', value);
};
</script>

<style>
</style>
