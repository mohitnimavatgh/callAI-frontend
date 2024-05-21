<script setup lang="ts">
    const router = useRouter()
    const shareModal = ref(false)
    const folder = ref('')
    const tableHeadings = ref([
        { title: 'Name', value: 'name' },
        { title: 'Type', value: 'type' },
        { title: 'Record', value: 'record' },
        { title: 'Calander Plateform', value: 'calendar_plateform' },
        { title: 'Date', value: 'date' },
        { title: 'Time', value: 'time' },            
        { title: 'Meeting Platefrom', value:  'meeting_platefrom' },
        { title: 'Folder', value: 'folder' }
    ])
    const tableData = ref([
        { name: 'Neil Sims', type: 'React Developer', date: '2024-04-01', time: '09:00 AM', calendar_plateform: 'Google Calendar', 'meeting_platefrom': 'Zoom', folder: 'Project X', record: 'Yes' },
        { name: 'Bonnie Green', type: 'Designer', date: '2024-04-02', time: '10:30 AM', calendar_plateform: 'Outlook', 'meeting_platefrom': 'Teams', folder: 'Project Y', record: 'No' },
        { name: 'Jese Leos', type: 'Vue JS Developer', date: '2024-04-03', time: '11:45 AM', calendar_plateform: 'Apple Calendar', 'meeting_platefrom': 'Skype', folder: 'Project Z', record: 'Yes' },
        { name: 'Thomas Lean', type: 'UI/UX Engineer', date: '2024-04-04', time: '01:00 PM', calendar_plateform: 'Yahoo Calendar', 'meeting_platefrom': 'WebEx', folder: 'Project A', record: 'No' },
        { name: 'Leslie Livingston', type: 'SEO Specialist', date: '2024-04-05', time: '02:15 PM', calendar_plateform: 'Microsoft Calendar', 'meeting_platefrom': 'Google Meet', folder: 'Project B', record: 'Yes' }
    ]);
    
    const ShareCall = (item) => {
        shareModal.value = true
    }
    const viewCall = (item) => {
        router.push(`calls/${'456'}`);
    }
</script>

<template>
    <div class="box mt-5 bg-white">
           <Table
               :headings="tableHeadings"
               :data="tableData"
               :isSearchable="true"
               title="History"
               @search="handleSearch"
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
                   <Button :text="'Share Meeintg'" frontIcon="fas fa-share-nodes" @click="shareModal = false"/>
                   <Button :text="'Cancel'" @click="shareModal = false" outline/>
               </div>
           </Modal>
     <NuxtPage />

       </div>
</template>