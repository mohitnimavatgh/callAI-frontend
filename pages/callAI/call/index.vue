<template>
    <div class="box mt-5 bg-white dark:bg-gray-800">
           <Table
               :headings="tableHeadings"
               :data="tableData"
               :isSearchable="true"
               :isActionable="true"
               :actions="actionList"
               title="Calls"
               @search="handleSearch"
               :filterTab="tabItems"
               @tab-click="handleTabClick"
               @select="onSelect"
           >
               <template v-slot:action="{ item, value }">
                   <div class="flex justify-around">
                       <i @click="ShareCall(item)" class="fas fa-share-nodes text-primary-400"></i>
                       <i @click="viewCall(item)" class="fas fa-eye text-blue-400"></i>
                       <i class="fas fa-trash text-red-400"></i>
                   </div>
                   
               </template>
           </Table>
           <Pagination class="mt-4 flex justify-end" :totalPage="10" :currentPage="3"/>
           <Modal :title="'Share Meeting'" :subTitle="'Share call with your team member'" :show="shareModal" @close="shareModal = false">
               <div class="modal-content  p-4 md:p-5">
                   <div class="col-span-2">
                       <FormSelect label="Folder" id="Folder" name="folder" v-model="folder" :options="folderList" rules="required" />
                   </div>
               </div>
               <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                   <Button class="mr-2" :text="'Share Meeintg'" frontIcon="fas fa-share-nodes" @click="shareModal = false"/>
                   <Button :text="'Cancel'" @click="shareModal = false" outline/>
               </div>
           </Modal>
     <NuxtPage />

       </div>
</template>
<script>
export default {
 data() {
   return {
       shareModal: false,
       folder: '',
       tabItems: [
           { label: 'All Calls', icon: 'fas fa-people-group' },
           { label: 'Your Calls', icon: 'fas fa-user' },
           { label: 'Teams Call', icon: 'fas fa-user-plus' },
           { label: 'Failed Call', icon: 'fas fa-circle-exclamation' }
       ],
     tableHeadings:[
           { title: 'Name', value: 'name' },
           { title: 'Type', value: 'type' },
           { title: 'Record', value: 'record' },
           { title: 'Calander Plateform', value: 'calender_plateform' },
           { title: 'Date', value: 'date' },
           { title: 'Time', value: 'time' },            
           { title: 'Meeting Platefrom', value:  'meeting_platefrom' },
           { title: 'Folder', value: 'folder' },
           { title: 'Action', value: 'action' },
       ],
     tableData:[
           { name: 'Neil Sims', type: 'React Developer', date: '2024-04-01', time: '09:00 AM', calender_plateform: 'Google Calendar', 'meeting_platefrom': 'Zoom', folder: 'Project X', record: 'Yes', action: 'Edit' },
           { name: 'Bonnie Green', type: 'Designer', date: '2024-04-02', time: '10:30 AM', calender_plateform: 'Outlook', 'meeting_platefrom': 'Teams', folder: 'Project Y', record: 'No', action: 'Edit' },
           { name: 'Jese Leos', type: 'Vue JS Developer', date: '2024-04-03', time: '11:45 AM', calender_plateform: 'Apple Calendar', 'meeting_platefrom': 'Skype', folder: 'Project Z', record: 'Yes', action: 'Edit' },
           { name: 'Thomas Lean', type: 'UI/UX Engineer', date: '2024-04-04', time: '01:00 PM', calender_plateform: 'Yahoo Calendar', 'meeting_platefrom': 'WebEx', folder: 'Project A', record: 'No', action: 'Edit' },
           { name: 'Leslie Livingston', type: 'SEO Specialist', date: '2024-04-05', time: '02:15 PM', calender_plateform: 'Microsoft Calendar', 'meeting_platefrom': 'Google Meet', folder: 'Project B', record: 'Yes', action: 'Edit' }
       ],
     actionList: ['Reward', 'Promote', 'Activate account', 'Delete User'],
     folderList: [
       { value: 'Marketing', label: 'Marketing'},
       { value: 'Sales', label: 'Sales'},
       { value: 'IT Deparatment', label: 'IT Deparatment'},
       { value: 'Software', label: 'Software'},
     ],
   };
 },
 methods : {
   handleTabClick (item) {
       console.log(item)
   },
   onSelect (item) {
       console.log(item)
   },
   ShareCall(item) {
       this.shareModal = true
   },
   viewCall(item) {
    this.$router.push(`call/${'456'}`);
   }
 }
}
</script>
