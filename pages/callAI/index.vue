<template>
    <div> 
        <div class="box">
            <Table  title="Upcoming Meetings " :isSearchable="true" :headings="tableHeadings" :data="upcomingMeeting?.data" :actions="actionList" @search="handleSearch" >
              <template v-slot:action="{ item, value }">
                  <div class="">
                        <i class="fas fa-pencil text-primary-400"></i>
                    </div>
                </template>
            </Table>
            <Pagination class="mt-4 flex justify-end" :totalPage="10" :currentPage="3"/>
        </div>  
        <div class="box mt-5">
          
            <Table
                :headings="tableHeadings"
                :data="tableData"
                :isSearchable="true"
                :isActionable="true"
                :actions="actionList"
                title="Recorded Meetings"
                @search="handleSearch"
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
            <Pagination class="mt-4 flex justify-end" :totalPage="10" :currentPage="3"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
const meetings = useMeetings()
const tabItems = ref([
  { label: "All Calls", icon: "fas fa-people-group" },
  { label: "Your Calls", icon: "fas fa-user" },
  { label: "Teams Call", icon: "fas fa-user-plus" }
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

const tableData = ref([
  {
    name: "Neil Sims",
    type: "React Developer",
    date: "2024-04-01",
    time: "09:00 AM",
    calendar_platform: "Google Calendar",
    meeting_platform: "Zoom",
    folder: "Project X",
    record: "Yes",
    action: "Edit"
  },
]);

const actionList = ref(["Reward", "Promote", "Activate account", "Delete User"]);
// console.log('upcomingMeeting', upcomingMeeting)

const getUpcoming = () => {
  meetings.upcomingMeeting()
}

onMounted(async () => {
  await nextTick();
  await getUpcoming()
})

const handleTabClick = (item: any) => {
  console.log(item);
};

const onSelect = (item: any) => {
  console.log(item);
};
const upcomingMeeting = computed(() => meetings.upcoming);
</script>
