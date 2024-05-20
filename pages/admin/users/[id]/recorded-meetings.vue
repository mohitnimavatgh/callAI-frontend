
<script setup lang="ts">
import { useMeetings } from "@/stores/admin/meetings";
import { useFolders } from "@/stores/admin/folders";

const meetings = useMeetings()
const folders = useFolders()
const recordedData = ref([])
const route = useRoute();
const actionName = ref('Action')

const tabItems = ref([
  { value: 'all', label: "All Calls", icon: "fas fa-people-group" },
  { value: 'your', label: "Your Calls", icon: "fas fa-user" },
  { value: 'teams', label: "Teams Call", icon: "fas fa-user-plus" }
]);

const tableHeadings = ref([
  { title: "Name", value: "name" },
  { title: "Type", value: "access_type" },
  { title: "Record", value: "record" },
  { title: "Calendar Platform", value: "is_type" },
  { title: "Date", value: "date" },
  { title: "Time", value: "time" },
  { title: "Meeting Platform", value: "platform" },
  { title: "Folder", value: "folder" },
]);

const recordedParams = ref({
  page: 1,
  meeting: 'recorded',
  search: null,
  type: 'all',
  action: null,
  user_id: route.params.id
})

const getRecorded = () => {
  meetings.recordedMeeting(recordedParams.value)
}

onMounted(async () => {
  await nextTick();
  await getRecorded();
  await folders.list({ user_id:19, search: '' })
})

const handleTabClick = (item: any) => {
  recordedParams.value.type = item.value
  getRecorded()
};

const recordedSearch = (search: any) => {
  recordedParams.value.search = search
  getRecorded()
};

const recordedPageChange = (page: any) => {
  recordedParams.value.page = page
  getRecorded()
};

const onSelect = (item: any) => {
  if(item == null){
    actionName.value = 'Action'
    recordedParams.value.action  = null
  }else{
    actionName.value = item.name
    recordedParams.value.action = item.id
  }
  getRecorded()
};

const recordedMeeting = computed(() => {
  let recordedAll = meetings.recorded
  recordedData.value = recordedAll?.data
  return recordedAll
});
</script>

<template>
  <div class="">   
    <div class="p-3 sm:p-5 mt-5 bg-white dark:bg-gray-800 rounded-[20px]">
      <Table :headings="tableHeadings" :data="recordedMeeting?.data" :isSearchable="true" :isActionable="true"
        :actions="folders?.folders" title="Recorded Meetings" @search="recordedSearch" :filterTab="tabItems"
        @tab-click="handleTabClick" @select="onSelect" :actionName="actionName"></Table>
      <Pagination
        v-if="recordedMeeting && recordedMeeting.total && recordedMeeting.per_page && recordedMeeting.total > recordedMeeting.per_page"
        class="mt-4 flex justify-end" :totalRecords="recordedMeeting.total" :currentPage="recordedParams.page"
        :recordsPerPage="recordedMeeting.per_page" @pageChange="recordedPageChange" />
    </div>    
  </div>
</template>
