<script setup lang="ts">
import { usersStore } from '@/stores/admin/users'

const route = useRoute();
const router = useRouter();
const users = usersStore() 
definePageMeta({
    layout: 'admin',
    middleware: 'is-admin-authenticate',
})

onMounted(() => {
    getUserData();
})

const getFolderParams = ref<any>({
    page: 1,
    search: '',
    user_id: route.params.id
})
const selectedTab = ref('');
const tabItems = ref([
  { label: 'Meeting', icon: 'fas fa-video' },
  { label: 'Upcoming Meeting', icon: 'fas fa-calendar'},
  { label: 'Recorded Meeting', icon: 'fas fa-file'},
  { label: 'Folders', icon: 'fas fa-folder-open'},
]);

const tabChanged = (item: any) => {
  selectedTab.value = item.label;
  router.push({ name: item.url });
};

const getUserData = () => {
    
}

</script>

<template>
    <div class="w-full h-full dark:text-gray-300">
        <div class="text-gray-700 text-3xl">
            User Detail
        </div>
        <div class="mt-10">
            <tab-button-group :items="tabItems" @tab-click="tabChanged" :selectedTab="selectedTab" />
            <!-- <Table  title="Upcoming Meetings " :isSearchable="true" :headings="tableHeadings" :data="upcomingMeeting?.data" :actions="actionList" @search="upcomingSearch" >
              <template v-slot:action="{ item, value, index }">
                  <div class="flex space-x-2">
                        <i class="fas fa-pencil text-primary-400" @click="edit(index)"></i>
                        <i @click="deleteUpcomingMeet(index)" class="fas fa-trash text-red-400 cursor-pointer"></i>
                    </div>
                </template>
            </Table>
            <Pagination v-if="upcomingMeeting && upcomingMeeting.total && upcomingMeeting.per_page && upcomingMeeting.total > upcomingMeeting.per_page" class="mt-4 flex justify-end" :totalRecords="upcomingMeeting.total" :currentPage="upcomingParams.page" :recordsPerPage="upcomingMeeting.per_page" @pageChange="upcomingPageChange"/> -->
        </div>
    </div>
</template>

<style>
</style>