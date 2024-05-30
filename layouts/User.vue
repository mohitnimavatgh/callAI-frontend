<script setup lang="ts">
import AppTopbar from "./AppTopbar.vue";
import { useMeetings } from "@/stores/user/meetings";
import { useFolders } from "@/stores/user/folders";
import { useVuelidate } from "@vuelidate/core";
import { required, url, helpers } from "@vuelidate/validators";
const meetings = useMeetings()
const folders = useFolders()
const { $toast } = useNuxtApp()
const bot = ref({
    name: '',
    folder_id: '',
    meeting_link: ''
})
const rules = {
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
const v$ = useVuelidate(rules, { bot })

const joinModal = ref(false);
const menuItems = ref([
    { label: 'Home', icon: 'fas fa-home', active: false, url: '/home' },
    { label: 'Calls', icon: 'fas fa-phone', active: false, url: '/calls' },
    { label: 'Settings', icon: 'fas fa-gear', active: false, url: '/settings' }
]);
const upcomingParams = {
    page: 1,
    meeting: 'upcoming',
    search: null
}

const router = useRouter();

onMounted(async () => {
    await nextTick();
    await folders.list({ search: '' })
})

const closeModal = () => {
    bot.value.name = ''
    bot.value.folder_id = ''
    bot.value.meeting_link = ''
    v$.value.$reset();
    joinModal.value = false
}

const setActiveMenuItem = () => {
    const currentPath = router.currentRoute.value.path;
    menuItems.value.forEach(item => {
        if (item.url === '/home') {
            item.active = currentPath === '/home';
        } else {
            item.active = currentPath.startsWith(item.url);
        }
    });
};

watch(router.currentRoute, setActiveMenuItem);

const handleMenuChange = (menuItem: any) => {
    menuItems.value.forEach(item => {
        item.active = false;
    });
    menuItem.active = true;
    router.push(menuItem.url);
};

const handleSearch = (value: any) => {
    console.log('Search value:', value);
};
const createBot = async () => {
    const v$ = useVuelidate(rules, { bot })
    const result = await v$.value.$validate()
    if (result) {
        meetings.create(bot.value).then((resp: any) => {
            resetBotData()
            $toast.success('Create Bot Successfully', { duration: 10000 })
            meetings.upcomingMeeting(upcomingParams)
            joinModal.value = false
        }).catch((err) => {
            catchResponse(err)
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

const resetBotData = () => {
    v$.value.$reset()
    bot.value = {
        name: '',
        folder_id: '',
        meeting_link: ''
    }
}

</script>

<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 overflow-y-auto">
        <div>
            <AppTopbar />
        </div>
        <div class="px-4 sm:px-12 xl:px-28 mt-16">
            <div class="">
                <div class="flex flex-wrap justify-between align-items-center">
                    <div class="pr-6">
                        <h4 class="text-2xl font-bold text-gray-700 dark:text-gray-300">Confra</h4>
                        <p class="mb-3 sm:mb-6 text-sm text-nowrap font-normal text-gray-500 mt-1 dark:text-gray-400">
                            AI-Powered Meeting
                            Recording Simplified</p>
                    </div>
                    <Button :text="'Meeting Bot'" frontIcon="fas fa-video" @click="joinModal = !joinModal" class="h-full" />
                    <Modal :title="'Meeting Bot'" :subTitle="'Confra will join and record the meeting'" :show="joinModal"
                        @close="closeModal()">
                        <div class="modal-content  p-4 md:p-5">
                            <div class="col-span-2 mb-3">
                                <FormInput id="Name" label="Meeting Name" name="Name" type="text" placeholder="Name"
                                    v-model="v$.bot.name.$model" :errors="v$.bot.name.$errors" />
                            </div>
                            <div class="col-span-2 mb-3">
                                <FormSelect label="Folder" placeholder="Select Folder" id="Folder" name="folder"
                                    v-model="v$.bot.folder_id.$model" :errors="v$.bot.folder_id.$errors"
                                    :options="folders.folders" />
                            </div>
                            <div class="col-span-2">
                                <FormInput id="Meeting URL" label="Meeting URL" name="Meeting URL" type="text"
                                    placeholder="Meeting URL" v-model="v$.bot.meeting_link.$model"
                                    :errors="v$.bot.meeting_link.$errors" />
                            </div>
                        </div>
                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <Button class="mr-2" :text="'Add Meeting'" frontIcon="fas fa-plus" @click="createBot" />
                            <Button :text="'Cancel'" @click="closeModal()" outline />
                        </div>
                    </Modal>
                </div>
                <Loader />
            </div>
            <div>
                <NuxtPage />
            </div>
        </div>
    </div>
</template>