<script setup lang="ts">
import { useDashboard } from "@/stores/user/dashboard";
import { useLoader } from "@/stores/loader";
import { useMeetings } from "@/stores/user/meetings";
import { useFolders } from "@/stores/user/folders";
import { useVuelidate } from "@vuelidate/core";
import { useAuth } from "@/stores/auth";
import { required, url, helpers } from "@vuelidate/validators";

definePageMeta({
    layout: 'user',
    middleware: "is-authenticate",
})

const dashboardStore = useDashboard()
const loader = useLoader();

const getDashboard = () => {
    loader.loading = true
    dashboardStore.list().then((res) => {
        loader.loading = false
    }).catch((err: any) => {
        loader.loading = false
    })
}

const dashboard = <any>computed(() => dashboardStore.dashboard);

const meetings = useMeetings()
const folders = useFolders()
const router = useRouter()
const { $toast } = useNuxtApp()
const shareModal = ref(false)
const showCalendar = ref<boolean>(false)
const confirmationPopUP = ref(false)
const call_meeting_id = ref(null)
const userState = useAuth();
const recordedData = ref([])
const upcomingData = ref([])
const deleteAction = ref('')
const is_calendar_meeting = ref(false)
const joinModal = ref(false);
const actionName = ref('Action')
const UpcomingTabItems = ref([
    { value: 'all', label: "All Calls", icon: "fa-regular fa-clock" },
    { value: 'calendar', label: "Calendar Calls", icon: "fas fa-calendar" },
    { value: 'manual', label: "Manual Call", icon: "fas fa-pen-fancy" },
]);
const tabItems = ref([
    { value: 'all', label: "All Calls", icon: "fas fa-people-group" },
    { value: 'your', label: "Your Calls", icon: "fas fa-user" },
    { value: 'teams', label: "Teams Call", icon: "fas fa-user-plus" },
    { value: 'failed', label: 'Failed Call', icon: 'fas fa-circle-exclamation' }
]);

const tableHeadings = ref([
    { title: "Name", value: "name" },
    { title: "Type", value: "access_type" },
    // { title: "Record", value: "record" },
    { title: "Calendar Platform", value: "is_type" },
    { title: "Date", value: "date" },
    { title: "Time", value: "time" },
    { title: "Meeting Platform", value: "platform" },
    { title: "Folder", value: "folder" },
    { title: "Action", value: "action" }
]);

const recordedTableHeadings = ref([
    { title: "Name", value: "name" },
    { title: "Type", value: "access_type" },
    // { title: "Record", value: "record" },
    { title: "Calendar Platform", value: "is_type" },
    { title: "Status", value: "status" },
    { title: "Date", value: "date" },
    { title: "Time", value: "time" },
    { title: "Meeting Platform", value: "platform" },
    { title: "Folder", value: "folder" },
    { title: "Action", value: "action" }
]);

const bot = ref({
    name: '',
    folder_id: '',
    meeting_link: ''
})
const botRules = {
    bot: {
        name: {
            required: helpers.withMessage("The Name field is required", required),
        },
        folder_id: {
            required: helpers.withMessage("The Folder field is required", required),
        },
        meeting_link: {
            required: helpers.withMessage("The Meeting field is required", required),
            url: helpers.withMessage("Please Enter a valid Meeting URL", url),
        }
    }
}
const vv$ = useVuelidate(botRules, { bot })

const edit = (index: any) => {
    let data = upcomingData.value[index]
    console.log("datr", data)
    bot.value.id = data.id
    bot.value.name = data.name
    bot.value.folder_id = data.folder_id
    bot.value.meeting_link = data.meeting_link
    if (data.is_type == "calendar") {
        is_calendar_meeting.value = true
    }
    joinModal.value = true
}

const updateBot = async () => {
    const result = await vv$.value.$validate()
    if (result) {
        meetings.update(bot.value).then((resp: any) => {
            joinModal.value = false
            is_calendar_meeting.value = false;
            getUpcoming()
        }).catch((error) => {
            catchResponse(error)
            joinModal.value = false
        })
    }
}

const catchResponse = (err: any) => {
    if (err?.response?.status == 422) {
        let data = err?.response?.data?.data
        if (data) {
            let keys = Object.keys(data)[0];
            let firstValue = data[keys];
            $toast.error(firstValue[0], { duration: 5000 })
        } else {
            if (!err?.response?.data?.success) {
                $toast.error(err?.response?.data?.message, { duration: 5000 })
            } else {
                $toast.error('something went wrong...!', { duration: 5000 })
            }
        }
    } else {
        if (!err?.response?.data?.success) {
            $toast.error(err?.response?.data?.message, { duration: 5000 })
        } else {
            $toast.error('something went wrong...!', { duration: 5000 })
        }
    }
}

const upcomingParams = ref({
    page: 1,
    meeting: 'upcoming',
    type: 'all',
    search: null
});

const recordedParams = ref({
    page: 1,
    meeting: 'recorded',
    search: null,
    type: 'all',
    action: null
});

const folder = ref({
    folder_id: '',
    meeting_id: null,
})

const rules = {
    folder: {
        folder_id: {
            required: helpers.withMessage("The Folder field is required", required),
        },
    }
}

const v$ = useVuelidate(rules, { folder })

const actionList = ref(["Reward", "Promote", "Activate account", "Delete User"]);

const getUpcoming = () => {
    loader.loading = true
    meetings.upcomingMeeting(upcomingParams.value).then((res) => {
        loader.loading = false
    }).catch((err) => {
        loader.loading = false
        catchResponse(err)
    })
}

const getRecorded = () => {
    loader.loading = true
    meetings.recordedMeeting(recordedParams.value).then((res) => {
        loader.loading = false
    }).catch((err) => {
        loader.loading = false
        catchResponse(err)
    })
}

onMounted(async () => {
    await nextTick();
    await getDashboard();
    await getUpcoming();
    await getRecorded();
})

const handleTabClick = (item: any) => {
    recordedParams.value.type = item.value
    getRecorded()
};

const upcomingHndleTabClick = (item: any) => {
    upcomingParams.value.type = item.value
    getUpcoming()
};

const upcomingSearch = (search: any) => {
    upcomingParams.value.search = search
    getUpcoming()
};
const recordedSearch = (search: any) => {
    recordedParams.value.search = search
    getRecorded()
};
const upcomingPageChange = (page: any) => {
    upcomingParams.value.page = page
    getUpcoming()
};
const recordedPageChange = (page: any) => {
    recordedParams.value.page = page
    getRecorded()
};
const onSelect = (item: any) => {
    if (item == null) {
        recordedParams.value.action = null;
        actionName.value = 'Action';
    } else {
        recordedParams.value.action = item.id
        actionName.value = item.name
    }
    getRecorded()
};

const shareFolder = async () => {
    const result = await v$.value.$validate();
    if (result) {
        loader.loading = true
        meetings.shareMeeting(folder.value).then((resp: any) => {
            resetFolderData()
            getRecorded()
            loader.loading = false
            shareModal.value = false;
        }).catch((error) => {
            loader.loading = false
            shareModal.value = false
            catchResponse(error)
        })
    }
}

const closeModal = () => {
    folder.value = {
        folder_id: '',
        meeting_id: null,
    }
    v$.value.$reset()
    shareModal.value = false;
}

const resetFolderData = () => {
    folder.value = {
        folder_id: '',
        meeting_id: null,
    }
    v$.value.$reset()
}

const shareCall = (index: any) => {
    folder.value.meeting_id = recordedData.value[index]?.id
    folder.value.folder_id = recordedData.value[index]?.folder_id
    shareModal.value = true
}

const viewCall = (index: any) => {
    if (recordedData.value[index]?.status == 'completed') {
        router.push(`/calls/${recordedData.value[index]?.id}`);
    } else {
        router.push('/');
    }
}

const is_show = (index: any) => {
  if(recordedData.value[index]?.user_id == userState?.userInfo.id){
    return true;
  }else{
    return false;
  }
}

const deleteMeet = (index: any) => {
    confirmationPopUP.value = true
    deleteAction.value = 'recorded'
    call_meeting_id.value = recordedData.value[index]?.id
    return;
}

const deleteUpcomingMeet = (index: any) => {
    confirmationPopUP.value = true
    deleteAction.value = 'upcoming'
    call_meeting_id.value = upcomingData.value[index]?.id
    return;
}

const confirmation = (data: Boolean) => {
    confirmationPopUP.value = false
    if (data) {
        loader.loading = true
        meetings.delete(call_meeting_id.value).then((resp: any) => {
            if (deleteAction.value = 'upcoming') {
                getUpcoming();
            } else {
                getRecorded();
            }
        })
    }
}

const upcomingMeeting = computed(() => {
    let upcomingAll = meetings.upcoming
    upcomingData.value = upcomingAll?.data
    return upcomingAll;
});
const recordedMeeting = computed(() => {
    let recordedAll = meetings.recorded
    recordedData.value = recordedAll?.data
    return recordedAll
});

</script>
<template>
    <div>
        <div class="flex overflow-x-auto space-x-5 dark:px-4 mt-4">
            <nuxt-link to="/settings/folders">
                <div
                    class="max-w-sm w-60 p-3 cursor-pointer bg-white text-gray-700 dark:text-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500">
                    <div class="flex mb-2 space-x-3 items-center">
                        <i class="fas fa-folder-open"></i>
                        <h5 class="text-2xl font-semibold tracking-tight">Folders</h5>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>Count : <span>{{ dashboard?.folders }}</span></div>
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="/settings/quick-questions">
                <div
                    class="max-w-sm w-60 p-3 bg-white text-gray-700 dark:text-gray-300 cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500">
                    <div class="flex mb-2 space-x-3 items-center">
                        <i class="fas fa-question"></i>
                        <h5 class="text-2xl font-semibold tracking-tight">Quick Question
                        </h5>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>Count : <span>{{ dashboard?.quick_question }}</span></div>
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="/calls">
                <div
                    class="max-w-sm w-60 p-3 bg-white text-gray-700 dark:text-gray-300 cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500">
                    <div class="flex mb-2 items-center space-x-3">
                        <i class="fas fa-people-group"></i>
                        <h5 class="text-2xl font-semibold tracking-tight">All Calls</h5>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>Count : <span>{{ dashboard?.all_meetings }}</span></div>
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="/calls">
                <div
                    class="max-w-sm w-60 p-3 bg-white text-gray-700 dark:text-gray-300 cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500">
                    <div class="flex mb-2 items-center space-x-3">
                        <i class="fas fa-user"></i>
                        <h5 class="text-2xl font-semibold tracking-tight">Your Calls</h5>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>Count : <span>{{ dashboard?.your_meetings }}</span></div>
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="/calls">
                <div
                    class="max-w-sm w-60 p-3 bg-white text-gray-700 dark:text-gray-300 cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500">
                    <div class="flex mb-2 items-center space-x-3">
                        <i class="fas fa-user-plus"></i>
                        <h5 class="text-2xl font-semibold tracking-tight">Teams Call</h5>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>Count : <span>{{ dashboard?.teams_meetings }}</span></div>
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="/calls">
                <div
                    class="max-w-sm w-60 p-3 bg-white text-gray-700 dark:text-gray-300 cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500">
                    <div class="flex mb-2 items-center space-x-3">
                        <i class="fas fa-circle-exclamation"></i>
                        <h5 class="text-2xl font-semibold tracking-tight">Failed Call
                        </h5>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>Count : <span>{{ dashboard?.failed_meeting }}</span></div>
                    </div>
                </div>
            </nuxt-link>
        </div>
        <div class="w-full my-12 h-full">
            <div class="p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-[20px]">
                <div class="flex items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300">
                        Upcoming Meetings
                    </div>
                    <div>
                        <Button :frontIcon="!showCalendar ? 'fa-regular fa-calendar' : 'fa-solid fa-bars'"
                            @click="showCalendar = !showCalendar" />
                    </div>
                </div>
                <div v-if="!showCalendar">
                    <Table :isSearchable="true" :filterTab="UpcomingTabItems" :headings="tableHeadings"
                        :data="upcomingMeeting?.data" :actions="actionList" @search="upcomingSearch"
                        @tab-click="upcomingHndleTabClick">
                        <template v-slot:action="{ item, value, index }">
                            <div class="flex justify-start space-x-4">
                                <i class="fas fa-pencil text-primary-400 cursor-pointer" @click="edit(index)"></i>
                                <i @click="deleteUpcomingMeet(index)" v-if="item.is_type != 'calendar'"
                                    class="fas fa-trash text-red-400 cursor-pointer"></i>
                            </div>
                        </template>
                    </Table>
                    <Pagination
                        v-if="upcomingMeeting && upcomingMeeting.total && upcomingMeeting.per_page && upcomingMeeting.total > upcomingMeeting.per_page"
                        class="mt-4 flex justify-end" :totalRecords="upcomingMeeting.total"
                        :currentPage="upcomingParams.page" :recordsPerPage="upcomingMeeting.per_page"
                        @pageChange="upcomingPageChange" />
                </div>
                <div v-else class="mt-6">
                    <ScheduleCelender :event="upcomingData"/>
                </div>
            </div>
            <div class="p-3 sm:p-5 mt-5 bg-white dark:bg-gray-800 rounded-[20px]">
                <Table :headings="recordedTableHeadings" :data="recordedMeeting?.data" :isSearchable="true" :isActionable="true"
                    :actions="folders?.folders" title="Recorded Meetings" @search="recordedSearch" :filterTab="tabItems"
                    @tab-click="handleTabClick" @select="onSelect" :actionName="actionName">
                    <template v-slot:action="{ item, value, index }">
                        <div class="flex justify-start space-x-4">
                            <i @click="shareCall(index)" v-if="is_show(index)" class="fas fa-share-nodes cursor-pointer text-primary-400"></i>
                            <i @click="viewCall(index)" :class="recordedMeeting?.data[index].status != 'in_progress' ? 'cursor-pointer' : 'opacity-80'" class="fas fa-eye text-blue-400"></i>
                            <i @click="deleteMeet(index)" v-if="is_show(index)" class="fas fa-trash text-red-400 cursor-pointer"></i>
                        </div>
                    </template>
                </Table>
                <Pagination
                    v-if="recordedMeeting && recordedMeeting.total && recordedMeeting.per_page && recordedMeeting.total > recordedMeeting.per_page"
                    class="mt-4 flex justify-end" :totalRecords="recordedMeeting.total" :currentPage="recordedParams.page"
                    :recordsPerPage="recordedMeeting.per_page" @pageChange="recordedPageChange" />
            </div>
            <Modal :title="'Share Meeting'" :subTitle="'Share call with your team member'" :show="shareModal"
                @close="closeModal">
                <div class="modal-content  p-4 md:p-5">
                    <div class="col-span-2">
                        <FormSelect label="Select Folder" placeholder="Select Folder" id="Folder" name="folder"
                            v-model="v$.folder.folder_id.$model" :errors="v$.folder.folder_id.$errors"
                            :options="folders?.folders" />
                    </div>
                </div>
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Button class="mr-2" :text="'Share Meeting'" frontIcon="fas fa-share-nodes" @click="shareFolder" />
                    <Button :text="'Cancel'" @click="closeModal" outline />
                </div>
            </Modal>
            <Modal :title="'Meeting Bot'" :subTitle="'Confra will join and record the meeting'" :show="joinModal"
                @close="joinModal = false">
                <div class="modal-content  p-4 md:p-5">
                    <div class="col-span-2 mb-3">
                        <FormInput id="Name" label="Meeting Name" name="Name" type="text" placeholder="Name"
                            v-model="vv$.bot.name.$model" :errors="vv$.bot.name.$errors"
                            :disabled="is_calendar_meeting ?? true" />
                    </div>
                    <div class="col-span-2 mb-3">
                        <FormSelect label="Folder" placeholder="Select Folder" id="Folder" name="folder"
                            v-model="vv$.bot.folder_id.$model" :errors="vv$.bot.folder_id.$errors"
                            :options="folders.folders" />
                    </div>
                    <div class="col-span-2">
                        <FormInput id="Meeting URL" label="Meeting URL" name="Meeting URL" type="text"
                            placeholder="Meeting URL" v-model="vv$.bot.meeting_link.$model"
                            :errors="vv$.bot.meeting_link.$errors" :disabled="true" />
                    </div>
                </div>
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Button class="mr-2" :text="'Update Meeting'" frontIcon="fas fa-plus" @click="updateBot" />
                    <Button :text="'Cancel'" @click="joinModal = false" outline />
                </div>
            </Modal>
            <confirmation-popup v-if="confirmationPopUP" @confirmation="confirmation" />
        </div>
    </div>
</template>