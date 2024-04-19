<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
const meetings = useMeetings()
const selectedTab = ref('Calls')
const tabItems = ref([
    { label: 'Calls', icon: 'fas fa-phone' },
    { label: 'Chat To Call', icon: 'fas fa-comment' },
    { label: 'History', icon: 'fas fa-clock-rotate-left' }
]);

const tabChanged = (item) => {
    selectedTab.value = item.label
}

onMounted(async () => {
  await nextTick()
  await getMeetingDetail()
});

const getMeetingDetail = () => {
  meetings.meetingDetail({meeting_id:5})
}

const fqMeeting = computed(() => {
    if(meetings.meetingDetail[0]?.faqs){
        return JSON.parse(meetings.meetingDetail[0]?.faqs)
    }
});

const meetingDetail = computed(() => meetings.meetingDetail);

</script>
<template>
    <div>
        <tab-button-group :items="tabItems" @tab-click="tabChanged" :selectedTab="selectedTab"/>
        <CallDetail v-if="selectedTab == 'Calls'"  :meetingDetail="meetingDetail"  />
        <CallChat v-if="selectedTab == 'Chat To Call'"  />
        <CallHistory v-if="selectedTab == 'History'" />
    </div>
</template>
