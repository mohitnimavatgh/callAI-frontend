<template>
    <div class=""> 
        <div class="p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-[20px]">
            <Table  title="Upcoming Meetings " :isSearchable="true" :headings="tableHeadings" :data="upcomingMeeting?.data" :actions="actionList" @search="upcomingSearch" >
              <template v-slot:action="{ item, value, index }">
                  <div class="flex space-x-2">
                        <i class="fas fa-pencil text-primary-400" @click="edit(index)"></i>
                        <i @click="deleteUpcomingMeet(index)" class="fas fa-trash text-red-400 cursor-pointer"></i>
                    </div>
                </template>
            </Table>
            <Pagination v-if="upcomingMeeting && upcomingMeeting.total && upcomingMeeting.per_page && upcomingMeeting.total > upcomingMeeting.per_page" class="mt-4 flex justify-end" :totalRecords="upcomingMeeting.total" :currentPage="upcomingParams.page" :recordsPerPage="upcomingMeeting.per_page" @pageChange="upcomingPageChange"/>
        </div>  
        <div class="p-3 sm:p-5 mt-5 bg-white dark:bg-gray-800 rounded-[20px]">
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
                <template v-slot:action="{ item, value, index }">
                  <div class="flex justify-around space-x-2">                        
                    <i @click="shareCall(index)" class="fas fa-share-nodes cursor-pointer text-primary-400"></i>
                    <i @click="viewCall(index)" class="fas fa-eye text-blue-400 cursor-pointer"></i>
                    <i @click="deleteMeet(index)" class="fas fa-trash text-red-400 cursor-pointer"></i>
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
        <Modal :title="'Meeting Bot'" :subTitle="'Confra will join and record the meeting'" :show="joinModal" @close="joinModal = false">
          <div class="modal-content  p-4 md:p-5">
            <div class="col-span-2 mb-3">
              <FormInput 
                  id="Name"
                  label="Meeting Name"
                  name="Name"
                  type="text"
                  placeholder="Name"
                  v-model="vv$.bot.name.$model"
                  :errors="vv$.bot.name.$errors"
              />
            </div>
            <div class="col-span-2 mb-3">
              <FormSelect label="Folder" placeholder="Folders" id="Folder" name="folder" v-model="vv$.bot.folder_id.$model" :errors="vv$.bot.folder_id.$errors" :options="folders.folders" />
            </div>
            <div class="col-span-2">
              <FormInput 
                  id="Meeting URL"
                  label="Meeting URL"
                  name="Meeting URL"
                  type="text"
                  placeholder="Meeting URL"
                  v-model="vv$.bot.meeting_link.$model"
                  :errors="vv$.bot.meeting_link.$errors"
              />
            </div>
          </div>
          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <Button class="mr-2" :text="'Update Meeting'" frontIcon="fas fa-plus" @click="updateBot"/>
            <Button :text="'Cancel'" @click="joinModal = false" outline/>
          </div>
        </Modal>
        <confirmation-popup v-if="confirmationPopUP" @confirmation="confirmation"/>
    </div>
</template>
<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
import { useFolders } from "@/stores/user/folders";
import { useVuelidate } from "@vuelidate/core";
import { required,url,helpers } from "@vuelidate/validators";
const meetings = useMeetings()
const folders = useFolders()
const router = useRouter()
const shareModal = ref(false)
const confirmationPopUP = ref(false)
const call_meeting_id = ref(null)
const recordedData = ref([])
const upcomingData = ref([])
const deleteAction = ref('')
const joinModal = ref(false);
const tabItems = ref([
  { value: 'all', label: "All Calls", icon: "fas fa-people-group" },
  { value: 'your', label: "Your Calls", icon: "fas fa-user" },
  { value: 'teams', label: "Teams Call", icon: "fas fa-user-plus" }
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
const vv$ = useVuelidate(botRules, {bot})

const edit = (index:any) => {
    let data = upcomingData.value[index]
    console.log("datr",data)
    bot.value.id = data.id
    bot.value.name = data.name
    bot.value.folder_id = data.folder_id
    bot.value.meeting_link = data.meeting_link
    joinModal.value = true
}

const updateBot = async () => {
  const result = await vv$.value.$validate()
    if (result) {
      meetings.update(bot.value).then((resp:any) => {
          if(resp.success) {
            getUpcoming()
            joinModal.value = false
          }
      })
    }
}

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

const shareCall = (index:any) => {    
    folder.value.meeting_id = recordedData.value[index]?.id
    shareModal.value = true
}

const viewCall = (index:any) => {
    // console.log("recordedData--",recordedData.value[index])
    router.push(`call-ai/call/${recordedData.value[index]?.id}`);
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
  if(data){
    meetings.delete(call_meeting_id.value).then((resp:any) => {
      if(resp.success) {  
        if(deleteAction.value = 'upcoming'){
          getUpcoming();             
        }else{
          getRecorded();
        }
      }
    })
  }
}

const upcomingMeeting = computed(() =>{
 let upcomingAll = meetings.upcoming
 upcomingData.value = upcomingAll?.data
 return upcomingAll
});
const recordedMeeting = computed(() => {
  let recordedAll = meetings.recorded
  recordedData.value = recordedAll?.data
  return recordedAll
});
</script>
