
<script setup lang="ts">
import { useMeetings } from "@/stores/admin/meetings";
const meetings = useMeetings()
const upcomingData = ref([])
const route = useRoute();

const UpcomingTabItems = ref([
  { value: 'all', label: "All Calls", icon: "fa-regular fa-clock" },
  { value: 'calendar', label: "Calendar Calls", icon: "fas fa-calendar" },
  { value: 'manual', label: "Manual Call", icon: "fas fa-pen-fancy" }
]);

const tableHeadings = ref([
  { title: "Name", value: "name" },
  { title: "Type", value: "access_type" },
  { title: "Record", value: "record" },
  { title: "Calendar Platform", value: "is_type" },
  { title: "Date", value: "date" },
  { title: "Time", value: "time" },
  { title: "Meeting Platform", value: "platform" },
  { title: "Folder", value: "folder" }
]);

const upcomingParams = ref({
  page: 1,
  meeting: 'upcoming',
  type: 'all',
  search: null,
  user_id: route.params.id
});

const actionList = ref(["Reward", "Promote", "Activate account", "Delete User"]);

const getUpcoming = () => {
  meetings.upcomingMeeting(upcomingParams.value)
}

onMounted(async () => {
  await nextTick();
  await getUpcoming();
})

const upcomingHndleTabClick = (item: any) => {
  upcomingParams.value.type = item.value
  getUpcoming()
};

const upcomingSearch = (search: any) => {
  upcomingParams.value.search = search
  getUpcoming()
};

const upcomingPageChange = (page: any) => {
  upcomingParams.value.page = page
  getUpcoming()
};

const upcomingMeeting = computed(() => {
  let upcomingAll = meetings.upcoming
  upcomingData.value = upcomingAll?.data
  return upcomingAll;
});

</script>

<template>
  <div class="">
    <div class="p-3 sm:p-5 mt-5 bg-white dark:bg-gray-800 rounded-[20px]">
      <Table title="Upcoming Meetings " :isSearchable="true" :filterTab="UpcomingTabItems" :headings="tableHeadings"
        :data="upcomingMeeting?.data" :actions="actionList" @search="upcomingSearch" @tab-click="upcomingHndleTabClick"></Table>
      <Pagination
        v-if="upcomingMeeting && upcomingMeeting.total && upcomingMeeting.per_page && upcomingMeeting.total > upcomingMeeting.per_page"
        class="mt-4 flex justify-end" :totalRecords="upcomingMeeting.total" :currentPage="upcomingParams.page"
        :recordsPerPage="upcomingMeeting.per_page" @pageChange="upcomingPageChange" />
    </div>
  </div>
</template>
