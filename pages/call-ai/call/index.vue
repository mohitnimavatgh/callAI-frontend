<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
import { useFolders } from "@/stores/user/folders";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
definePageMeta({
  middleware: "is-authenticate",
})
const meetings = useMeetings()
const router = useRouter()
const folders = useFolders()
const shareModal = ref(false)
const confirmationPopUP = ref(false)
const call_meeting_id = ref(null);
const recordedData = ref([]);
const actionName = ref('Action')
const tabItems = ref([
  { value: 'all', label: "All Calls", icon: "fas fa-people-group" },
  { value: 'your', label: "Your Calls", icon: "fas fa-user" },
  { value: 'teams', label: "Teams Call", icon: "fas fa-user-plus" },
  { value: 'failed', label: 'Failed Call', icon: 'fas fa-circle-exclamation' },
  { value: 'clear', label: "Clear Filter", icon: "fas fa-filter-circle-xmark" }
]);

const tableHeadings = ref([
  { title: "Name", value: "name" },
  { title: "Type", value: "access_type" },
  { title: "Record", value: "record" },
  { title: "Calendar Platform", value: "is_type" },
  { title: "Date", value: "date" },
  { title: "Time", value: "time" },
  { title: "Meeting Platform", value: "platform" },
  { title: "Folder", value: "folder" },
  { title: "Action", value: "action" }
]);

const recordedParams = {
  page: 1,
  meeting: 'recorded',
  search: null,
  type: 'all',
  action: null
}

const folder = ref({
  folder_id: null,
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

const shareCall = (index) => {
  folder.value.meeting_id = recordedData.value[index]?.id
  shareModal.value = true
}

const shareFolder = async () => {
  const result = await v$.value.$validate();
  if (result) {
    console.log("folder.value", folder.value)
    meetings.shareMeeting(folder.value).then((resp: any) => {
        resetFolderData()
        shareModal.value = false;
    })
  }
}

const resetFolderData = () => {
  folder.value = {
    folder_id: null,
    meeting_id: null,
  }
  v$.value.$reset()
}

const viewCall = (index: any) => {
  router.push(`call/${recordedData.value[index]?.id}`);
}

const deleteMeet = (index: any) => {
  confirmationPopUP.value = true
  call_meeting_id.value = recordedData.value[index]?.id
  return;
}

const confirmation = (data: Boolean) => {
  confirmationPopUP.value = false
  if (data) {
    meetings.delete(call_meeting_id.value).then((resp: any) => {
        getRecorded();
    })
  }
}

const getRecorded = () => {
  meetings.recordedMeeting(recordedParams)
}

onMounted(async () => {
  await nextTick();
  await getRecorded()
})

const handleTabClick = (item: any) => {
  if(item.value == 'clear'){
    recordedParams.page = 1
    recordedParams.meeting = 'recorded'
    recordedParams.search = null
    recordedParams.type ='all'
    recordedParams.action = null
    actionName.value = 'Action'
  }else{
    recordedParams.type = item.value
  }
  getRecorded()
};

const recordedSearch = (search: any) => {
  recordedParams.search = search
  getRecorded()
};

const recordedPageChange = (page: any) => {
  recordedParams.page = page
  getRecorded()
};
const onSelect = (item: any) => {
  recordedParams.action = item.id
  actionName.value = item.name
  getRecorded()
};
const recordedMeeting = computed(() => {
  let recordedAll = meetings.recorded
  recordedData.value = recordedAll?.data
  return recordedAll
});
</script>

<template>
    <div class="box mt-5 bg-white dark:bg-gray-800">
        <Table
            :headings="tableHeadings"
            :data="recordedMeeting?.data"
            :isSearchable="true"
            :isActionable="true"
            :actions="folders?.folders"
            title="Calls"
            @search="recordedSearch"
            :filterTab="tabItems"
            :actionName="actionName"
            @tab-click="handleTabClick"
            @select="onSelect"
        >
            <template v-slot:action="{ item, value, index }">
            <div class="flex space-x-2 justify-around">
                    <i @click="shareCall(index)" class="fas fa-share-nodes cursor-pointer text-primary-400"></i>
                    <i @click="viewCall(index)" class="fas fa-eye text-blue-400 cursor-pointer"></i>
                    <i @click="deleteMeet(index)" class="fas fa-trash text-red-400 cursor-pointer"></i>
                </div>
            </template>
        </Table>
        <Pagination v-if="recordedMeeting && recordedMeeting.total && recordedMeeting.per_page && recordedMeeting.total > recordedMeeting.per_page" class="mt-4 flex justify-end" :totalRecords="recordedMeeting.total" :currentPage="recordedParams.page" :recordsPerPage="recordedMeeting.per_page" @pageChange="recordedPageChange"/>
        <Modal :title="'Share Meeting'" :subTitle="'Share call with your team member'" :show="shareModal" @close="shareModal = false">
            <div class="modal-content  p-4 md:p-5">
                <div class="col-span-2">
                  <FormSelect label="Folder" placeholder="Select Folder" id="Folder" name="folder" v-model="v$.folder.folder_id.$model"
                    :errors="v$.folder.folder_id.$errors" :options="folders?.folders" />
                </div>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button class="mr-2" :text="'Share Meeintg'" frontIcon="fas fa-share-nodes" @click="shareFolder()"/>
                <Button :text="'Cancel'" @click="shareModal = false" outline/>
            </div>
        </Modal>
     <NuxtPage />
     <confirmation-popup v-if="confirmationPopUP" @confirmation="confirmation"/> 
       </div>
</template>

