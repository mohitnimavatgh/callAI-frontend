<template>
    <div class=""> 
        <div class="p-5 bg-white dark:bg-gray-800 rounded-[20px]">
            <Table  title="Upcoming Meetings " :isSearchable="true" :headings="tableHeadings" :data="upcomingMeeting?.data" :actions="actionList" @search="upcomingSearch" >
              <template v-slot:action="{ item, value }">
                  <div class="">
                        <i class="fas fa-pencil text-primary-400"></i>
                    </div>
                </template>
            </Table>
            <Pagination v-if="upcomingMeeting && upcomingMeeting.total && upcomingMeeting.per_page && upcomingMeeting.total > upcomingMeeting.per_page" class="mt-4 flex justify-end" :totalRecords="upcomingMeeting.total" :currentPage="upcomingParams.page" :recordsPerPage="upcomingMeeting.per_page" @pageChange="upcomingPageChange"/>
        </div>  
        <div class="p-5 mt-5 bg-white dark:bg-gray-800 rounded-[20px]">
            <Table
                :headings="tableHeadings"
                :data="recordedMeeting?.data"
                :isSearchable="true"
                :isActionable="true"
                :actions="folders?.folders"
                title="Recorded Meetings"
                @search="recordedSearch"
                :filterTab="tabItems"
                @tab-click="handleTabClick"
                @select="onSelect"
            >
                <template v-slot:action="{ item, value }">
                  <div class="flex justify-around">                        
                    <i @click="shareCall(item)" class="fas fa-share-nodes text-primary-400"></i>
                    <i @click="viewCall(item)" class="fas fa-eye text-blue-400"></i>
                    <i @click="deleteMeet(item)" class="fas fa-trash text-red-400"></i>
                    </div>
                </template>
            </Table>
            <Pagination v-if="recordedMeeting && recordedMeeting.total && recordedMeeting.per_page && recordedMeeting.total > recordedMeeting.per_page" class="mt-4 flex justify-end" :totalRecords="recordedMeeting.total" :currentPage="recordedParams.page" :recordsPerPage="recordedMeeting.per_page" @pageChange="recordedPageChange"/>
        </div>
        <Modal :title="'Share Meeting'" :subTitle="'Share call with your team member'" :show="shareModal" @close="shareModal = false">
            <div class="modal-content  p-4 md:p-5">
                <div class="col-span-2">
                    <FormSelect label="Folder" id="Folder" name="folder" v-model="v$.folder.folder_id.$model" :errors="v$.folder.folder_id.$errors"  :options="folders?.folders" rules="required" />
                </div>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button class="mr-2" :text="'Share Meeintg'" frontIcon="fas fa-share-nodes" @click="shareFolder()"/>
                <Button :text="'Cancel'" @click="shareModal = false" outline/>
            </div>
        </Modal>
    </div>
</template>
<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
import { useFolders } from "@/stores/user/folders";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
const meetings = useMeetings()
const folders = useFolders()
const router = useRouter()
const shareModal = ref(false)
const tabItems = ref([
  { value: 'all', label: "All Calls", icon: "fas fa-people-group" },
  { value: 'your', label: "Your Calls", icon: "fas fa-user" },
  { value: 'teams', label: "Teams Call", icon: "fas fa-user-plus" }
]);

const tableHeadings = ref([
  { title: "ID", value: "id" },
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
const upcomingParams = {
  page: 1,
  meeting: 'upcoming',
  search: null
}
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

const v$ = useVuelidate(rules, {folder})

const actionList = ref(["Reward", "Promote", "Activate account", "Delete User"]);

const getUpcoming = () => {
  meetings.upcomingMeeting(upcomingParams)
}
const getRecorded = () => {
  meetings.recordedMeeting(recordedParams)
}

onMounted(async () => {
  await nextTick();
  await getUpcoming();
  await getRecorded()
})

const handleTabClick = (item: any) => {
  recordedParams.type = item.value
  console.log('recordedParams', recordedParams)
  getRecorded()
};
const upcomingSearch = (search: any) => {
  upcomingParams.search = search
  getUpcoming()
};
const recordedSearch = (search: any) => {
  recordedParams.search = search
  getRecorded()
};
const upcomingPageChange = (page: any) => {
  upcomingParams.page = page
  getUpcoming()
};
const recordedPageChange = (page: any) => {
  recordedParams.page = page
  getRecorded()
};
const onSelect = (item: any) => {
  recordedParams.action = item.id
  getRecorded()
};

const shareFolder = async () => {
    const result = await v$.value.$validate();
    if (result) {
        console.log("folder.value",folder.value)
        meetings.shareMeeting(folder.value).then((resp:any) => {
              if(resp.success) {               
                shareModal.value = false;
              }
        })
    }
}

const shareCall = (item) => {    
    folder.value.meeting_id = item.id
    shareModal.value = true
}

const viewCall = (item) => {
    router.push(`call-ai/call/${item.id}`);
}

const deleteMeet = (item) => {
  // meetings.delete(item.id).then((resp:any) => {
  //   if(resp.success) {               
  //    getRecorded();
  //   }
  // })
}

const upcomingMeeting = computed(() => meetings.upcoming);
const recordedMeeting = computed(() => meetings.recorded);
</script>
