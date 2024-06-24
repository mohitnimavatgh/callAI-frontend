<template>
  <div class="xl:mt-16 sm:mt-16 md:mt-16 p-5 sm:ml-64 relative">
    <Breadcrumb />
    <Toast message="item added succefully" status="success" />
    <Tabs class="mt-3" :menuItems="menuItems" @change="handleMenuChange" />
    <FormInput id="First Name" class="mt-3" label="First Name" v-model="username" name="first-name" type="text"
      icon="fas fa-user" rules="required:First Name Is Required|email:Email Should Be unique" />

    <div class="mt-8 box bg-white dark:bg-gray-800 ">
      <Table isActionable :isSearchable="true" :headings="tableHeadings" :data="tableData" :actions="actionList"
        @search="handleSearch" />
      <Pagination class="mt-4 flex justify-end" :totalPage="10" :currentPage="3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import '@fortawesome/fontawesome-free/css/all.css';
import { ref } from 'vue';

const username = ref('');
const tableHeadings = ['Name', 'Position', 'Status', 'Action'];
const tableData = [
  { name: 'Neil Sims', position: 'React Developer', status: 'Online' },
  { name: 'Bonnie Green', position: 'Designer', status: 'Online' },
  { name: 'Jese Leos', position: 'Vue JS Developer', status: 'Online' },
  { name: 'Thomas Lean', position: 'UI/UX Engineer', status: 'Online' },
  { name: 'Leslie Livingston', position: 'SEO Specialist', status: 'Offline' }
];
const actionList = ['Reward', 'Promote', 'Activate account', 'Delete User'];
const menuItems = ref([
  { label: 'Profile', icon: 'fas fa-home', active: false },
  { label: 'Dashboard', icon: 'fas fa-home', active: true },
  { label: 'Settings', icon: 'fas fa-home', active: false },
  { label: 'Contacts', icon: 'fas fa-home', active: false },
  { label: 'Disabled', icon: 'fas fa-home', active: false, disabled: true }
]);
const person = ref({
  first_name: "",
});

function handleMenuChange(menuItem: { label: string, icon: string, active: boolean, disabled?: boolean }) {
  menuItems.value.forEach(item => {
    item.active = false;
  });
  menuItem.active = true;
}

function handleSearch(value: string) {
  console.log('Search value:', value);
  // Handle search logic here
}
</script>

<style>

</style>