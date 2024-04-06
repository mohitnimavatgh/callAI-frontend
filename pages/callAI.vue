<template>
    
<div>
    <div class="flex justify-between align-items-center">
      <div>
        <h4 class="text-2xl font-bold text-gray-700 ">Meet AI</h4>
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
                rules="required"
            />
          </div>
          <div class="col-span-2 mb-3">
            <FormSelect label="Folder" id="Folder" name="folder" v-model="meeting.folder" :options="countryOptions" rules="required" />
          </div>
          <div class="col-span-2">
            <FormInput 
                v-model="meeting.url"
                id="Meeting URL"
                label="Meeting URL"
                name="Meeting URL"
                type="text"
                placeholder="Meeting URL"
                rules="required"
            />
          </div>
      </div>
       <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button :text="'Add Meeintg'" frontIcon="fas fa-plus"/>
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
<script>
import '@fortawesome/fontawesome-free/css/all.css';
import { Drawer } from 'flowbite';
export default {
  data() {
    return {
      tableHeadings: ['Name', 'Position', 'Status', 'Action'],
      tableData: [
        { name: 'Neil Sims', position: 'React Developer', status: 'Online' },
        { name: 'Bonnie Green', position: 'Designer', status: 'Online' },
        { name: 'Jese Leos', position: 'Vue JS Developer', status: 'Online' },
        { name: 'Thomas Lean', position: 'UI/UX Engineer', status: 'Online' },
        { name: 'Leslie Livingston', position: 'SEO Specialist', status: 'Offline' }
      ],
      actionList: ['Reward', 'Promote', 'Activate account', 'Delete User'],
      menuItems: [
        { label: 'Home', icon: 'fas fa-home', active: false, url: '/callAI' },
        { label: 'Calls', icon: 'fas fa-phone', active: false, url: '/callAI/call' },
        { label: 'Analysis', icon: 'fas fa-magnifying-glass-chart', active: false, url: '/callAI/analysis' },
        { label: 'Settings', icon: 'fas fa-gear', active: false, url: '/callAI/settings' }
      ],
      meeting: {
        name: '',
        folder: '',
        url: '',
      },
      joinModal: false,
      countryOptions: [
        { value: 'Marketing', label: 'Marketing'},
        { value: 'Sales', label: 'Sales'},
        { value: 'IT Deparatment', label: 'IT Deparatment'},
        { value: 'Software', label: 'Software'},
      ],
    };
  },
  mounted() {
    this.setActiveMenuItem();
  },
  watch: {
    $route() {
      this.setActiveMenuItem();
    }
  },
  methods: {
    setActiveMenuItem() {
      const currentPath = this.$route.path;
      this.menuItems.forEach(item => {
        item.active = item.url === currentPath;
      });
    },
    handleMenuChange(menuItem) {
      console.log('menuItem', menuItem)
      this.menuItems.forEach(item => {
        item.active = false;
      });
      menuItem.active = true;
      this.$router.push(menuItem.url)
    },
    handleSearch(value) {
      console.log('Search value:', value);
      // Handle search logic here
    }
  }

}
</script>
<style>

</style>