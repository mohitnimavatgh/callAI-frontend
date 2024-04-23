<template>
    <div class=""> 
        <div class="box mt-5 bg-white dark:bg-gray-800">
            <Table
                :headings="tableHeadings"
                :data="recordedMeeting?.data"
                :isSearchable="true"
                :isActionable="true"
                :actions="folders?.folders"
                title="Recorded Meetings"
                @search="recordedSearch"
                :filterTab="tabItems"
                @tab-click="handleTabClick"
                @select="onSelect"
            >
                <template v-slot:action="{ item, value }">
                  <div class="flex justify-around">
                        <i class="fas fa-share-nodes text-primary-400"></i>
                        <i class="fas fa-eye text-blue-400"></i>
                        <i class="fas fa-trash text-red-400"></i>
                    </div>
                </template>
            </Table>
            <Pagination v-if="recordedMeeting && recordedMeeting.total && recordedMeeting.per_page && recordedMeeting.total > recordedMeeting.per_page" class="mt-4 flex justify-end" :totalRecords="recordedMeeting.total" :currentPage="recordedParams.page" :recordsPerPage="recordedMeeting.per_page" @pageChange="recordedPageChange"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
import { useFolders } from "@/stores/user/folders";
const meetings = useMeetings()
const folders = useFolders()
const tabItems = ref([
  { value: 'all', label: "All Calls", icon: "fas fa-people-group" },
  { value: 'your', label: "Your Calls", icon: "fas fa-user" },
  { value: 'teams', label: "Teams Call", icon: "fas fa-user-plus" }
]);

const tableHeadings = ref([
  { title: "Name", value: "name" },
  { title: "Type", value: "type" },
  { title: "Record", value: "record" },
  { title: "Calendar Platform", value: "platform" },
  { title: "Date", value: "date" },
  { title: "Time", value: "time" },
  { title: "Meeting Platform", value: "meeting_platform" },
  { title: "Folder", value: "folder" },
  { title: "Action", value: "action" }
]);
const recordedParams = {
  page: 1,
  meeting: 'recorded',
  search: null,
  type: 'all',
  action: null
}

const getRecorded = () => {
  meetings.recordedMeeting(recordedParams)
}

onMounted(async () => {
  await nextTick();
  await getRecorded()
})

const handleTabClick = (item: any) => {
  recordedParams.type = item.value
  console.log('recordedParams', recordedParams)
  getRecorded()
};
const recordedSearch = (search: any) => {
  recordedParams.search = search
  getRecorded()
};
const recordedPageChange = (page: any) => {
  recordedParams.page = page
  getRecorded()
};
const onSelect = (item: any) => {
  recordedParams.action = item.id
  getRecorded()
};
const recordedMeeting = computed(() => meetings.recorded);
</script>
<<<<<<< Updated upstream
=======

<template>
    <div class="rounded-[20px] p-5 mt-5 bg-white dark:bg-gray-800">
        <Table
            :headings="tableHeadings"
            :data="recordedMeeting?.data"
            :isSearchable="true"
            :isActionable="true"
            :actions="folders?.folders"
            title="Calls"
            @search="recordedSearch"
            :filterTab="tabItems"
            @tab-click="handleTabClick"
            @select="onSelect"
        >
            <template v-slot:action="{ item, value }">
            <div class="flex justify-around">
                    <i @click="ShareCall(item)" class="fas fa-share-nodes text-primary-400"></i>
                    <i @click="viewCall(item)" class="fas fa-eye text-blue-400"></i>
                    <i @click="deleteMeet(item)" class="fas fa-trash text-red-400"></i>
                </div>
            </template>
        </Table>
        <Pagination v-if="recordedMeeting && recordedMeeting.total && recordedMeeting.per_page && recordedMeeting.total > recordedMeeting.per_page" class="mt-4 flex justify-end" :totalRecords="recordedMeeting.total" :currentPage="recordedParams.page" :recordsPerPage="recordedMeeting.per_page" @pageChange="recordedPageChange"/>
        <Modal :title="'Share Meeting'" :subTitle="'Share call with your team member'" :show="shareModal" @close="shareModal = false">
            <div class="modal-content  p-4 md:p-5">
                <div class="col-span-2">
                    <FormSelect label="Folder" id="Folder" name="folder" v-model="v$.folder.folder_id.$model" :errors="v$.folder.folder_id.$errors"  :options="folders?.folders" rules="required" />
                </div>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button class="mr-2" :text="'Share Meeintg'" frontIcon="fas fa-share-nodes" @click="shareFoler()"/>
                <Button :text="'Cancel'" @click="shareModal = false" outline/>
            </div>
        </Modal>
     <NuxtPage />

       </div>
</template>

>>>>>>> Stashed changes
