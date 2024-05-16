<script setup lang="ts">
import { usersStore } from '@/stores/admin/users'


const route = useRoute();
const users = usersStore() 
definePageMeta({
    layout: 'admin',
    middleware: 'is-admin-authenticate',
})

onMounted(() => {

})

const getUserData = () => {

}

</script>

<template>
    <div class="w-full h-full dark:text-gray-300">
        <div class="text-gray-700 text-3xl">
            User Detail
        </div>
        <div class="mt-10">
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