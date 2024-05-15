<template>
  <div class="px-4">
    <div class="flex flex-wrap justify-between align-items-center">
      <div class="pr-6">
        <h4 class="text-2xl font-bold text-gray-700 dark:text-gray-300">Confra</h4>
        <p class="mb-3 sm:mb-6 text-sm text-nowrap font-normal text-gray-500 mt-1 dark:text-gray-400">AI-Powered Meeting
          Recording Simplified</p>
      </div>
      <Button :text="'Meeting Bot'" frontIcon="fas fa-video" @click="joinModal = !joinModal" class="h-full"/>
      <Modal :title="'Meeting Bot'" :subTitle="'Confra will join and record the meeting'" :show="joinModal" @close="closeModal()">
        <div class="modal-content  p-4 md:p-5">
          <div class="col-span-2 mb-3">
            <FormInput id="Name" label="Meeting Name" name="Name" type="text" placeholder="Name"
              v-model="v$.bot.name.$model" :errors="v$.bot.name.$errors" />
          </div>
          <div class="col-span-2 mb-3">
            <FormSelect label="Folder" placeholder="Folders" id="Folder" name="folder" v-model="v$.bot.folder_id.$model"
              :errors="v$.bot.folder_id.$errors" :options="folders.folders" />
          </div>
          <div class="col-span-2">
            <FormInput id="Meeting URL" label="Meeting URL" name="Meeting URL" type="text" placeholder="Meeting URL"
              v-model="v$.bot.meeting_link.$model" :errors="v$.bot.meeting_link.$errors" />
          </div>
        </div>
        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <Button class="mr-2" :text="'Add Meeting'" frontIcon="fas fa-plus" @click="createBot"/>
          <Button :text="'Cancel'" @click="closeModal()" outline/>
        </div>
      </Modal>
    </div>
    <!-- <Tabs class="mt-3" :menuItems="menuItems" @change="handleMenuChange" /> -->
    <div class="mt-5 mb-5">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
import { useFolders } from "@/stores/user/folders";
import { useVuelidate } from "@vuelidate/core";
import { required, url, helpers } from "@vuelidate/validators";
definePageMeta({
  // middleware: ["is-authenticate"]
})
const meetings = useMeetings()
const folders = useFolders()
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
  { label: 'Home', icon: 'fas fa-home', active: false, url: '/call-ai' },
  { label: 'Calls', icon: 'fas fa-phone', active: false, url: '/call-ai/call' },
  { label: 'Settings', icon: 'fas fa-gear', active: false, url: '/call-ai/settings' }
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
  v$.value.$reset();
  joinModal.value = false
}

const setActiveMenuItem = () => {
  const currentPath = router.currentRoute.value.path;
  menuItems.value.forEach(item => {
    if (item.url === '/call-ai') {
      item.active = currentPath === '/call-ai';
    } else {
      item.active = currentPath.startsWith(item.url);
    }
  });
};

watch(router.currentRoute, setActiveMenuItem);

const handleMenuChange = (menuItem) => {
  menuItems.value.forEach(item => {
    item.active = false;
  });
  menuItem.active = true;
  router.push(menuItem.url);
};

const handleSearch = (value) => {
  console.log('Search value:', value);
};
const createBot = async () => {
  const v$ = useVuelidate(rules, { bot })
  const result = await v$.value.$validate()
  if (result) {
    meetings.create(bot.value).then((resp: any) => {
      resetBotData()
      meetings.upcomingMeeting(upcomingParams)
      joinModal.value = false
    })
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

<style></style>
