<script setup lang="ts">
import { useDashboard } from "@/stores/user/dashboard";
import { useLoader } from "@/stores/loader";

definePageMeta({
    layout: 'app-layout',
    middleware: "is-authenticate",
})

const dashboardStore = useDashboard()
const loader = useLoader();

const getDashboard = () => {
    loader.loading = true
    dashboardStore.list().then((res) => {
        loader.loading = false
    }).catch((err) => {
        loader.loading = false
    })
}

onMounted(async () => {
    await nextTick();
    await getDashboard();
})

const dashboard = <any>computed(() => dashboardStore.dashboard);

</script>
<template>
  <div class="flex">
    <Loader />
    <div class="max-w-sm w-60 p-3 ml-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       <i class="fas fa-folder-open"></i>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Folders</h5>
        <div class="flex items-center justify-between">
            <div>Count : <span>{{ dashboard?.folders }}</span></div>
            <i class="fas fa-arrow-right cursor-pointer"></i>
        </div>
    </div>
    <div class="max-w-sm w-60 p-3 ml-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       <i class="fas fa-question"></i>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Quick Question</h5>
        <div class="flex items-center justify-between">
            <div>Count : <span>{{ dashboard?.quick_question }}</span></div>
            <i class="fas fa-arrow-right cursor-pointer"></i>
        </div>
    </div>
    <div class="max-w-sm w-60 p-3 ml-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       <i class="fas fa-people-group"></i>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">All Calls</h5>
        <div class="flex items-center justify-between">
            <div>Count : <span>{{ dashboard?.all_meetings }}</span></div>
            <i class="fas fa-arrow-right cursor-pointer"></i>
        </div>
    </div>
    <div class="max-w-sm w-60 p-3 ml-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       <i class="fas fa-user"></i>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Your Calls</h5>
        <div class="flex items-center justify-between">
            <div>Count : <span>{{ dashboard?.your_meetings }}</span></div>
            <i class="fas fa-arrow-right cursor-pointer"></i>
        </div>
    </div>
    <div class="max-w-sm w-60 p-3 ml-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       <i class="fas fa-user-plus"></i>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Teams Call</h5>
        <div class="flex items-center justify-between">
            <div>Count : <span>{{ dashboard?.teams_meetings  }}</span></div>
            <i class="fas fa-arrow-right cursor-pointer"></i>
        </div>
    </div>
    <div class="max-w-sm w-60 p-3 ml-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       <i class="fas fa-circle-exclamation"></i>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Failed Call</h5>
        <div class="flex items-center justify-between">
            <div>Count : <span>{{ dashboard?.failed_meeting  }}</span></div>
            <i class="fas fa-arrow-right cursor-pointer"></i>
        </div>
    </div>
  </div>
</template>