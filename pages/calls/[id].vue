<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
definePageMeta({
    layout: 'user',
    middleware: "is-authenticate",
})
const meetings = useMeetings()
import { useRoute } from 'vue-router';
const route = useRoute();
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
    if(route.query.history){
        selectedTab.value = 'Chat To Call'
    }
    await getMeetingDetail(route.params.id)
});

const getMeetingDetail = async (id) => {
    await meetings.meetingDetail({ meeting_id: id })
}

const handleTabChange = () => {
    selectedTab.value = 'Chat To Call'
}

const meetingDetail = computed(() => meetings.getMeetingDetail);

</script>
<template>
    <div class="my-5">
        <tab-button-group :items="tabItems" @tab-click="tabChanged" :selectedTab="selectedTab" />
        <CallDetail v-if="selectedTab == 'Calls'" :meetingDetail="meetingDetail" />
        <CallChat v-if="selectedTab == 'Chat To Call'" :meetingDetail="meetingDetail" />
        <CallHistory v-if="selectedTab == 'History'" @changeTab="handleTabChange" />
    </div>
</template>
