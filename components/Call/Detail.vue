<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
const meetings = useMeetings()
const props = defineProps({
    meetingDetail: null,
});

const detail = ref(null)
const notes = ref('')

const faqsList = computed(() => {
    detail.value = props.meetingDetail       
    notes.value = detail.value?.notes
    if(props.meetingDetail?.faqs){
        return JSON.parse(JSON.parse(props.meetingDetail?.faqs))
    }
    return  [];
});

const meetingDateTime = (type) => {
    const specificDate = new Date(detail.value?.meeting_date);
    if(type == 'date'){
        const date = specificDate.getDate();
        const month = specificDate.getMonth() + 1;
        const year = specificDate.getFullYear();
        return date +'-'+ month +'-'+ year;
    }else{
        const hours = specificDate.getHours();
        const minutes = specificDate.getMinutes();
        const seconds = specificDate.getSeconds();
        return  hours ? `${hours}:${minutes}:${seconds}`: `${minutes}:${seconds}`;
    }       
}

const getStatusColor = (status) =>{
    if(status == 'pending'){
        return 'orange'
    }else if(status == 'in progress'){
        return 'yellow'
    }else if(status == 'complete'){
        return 'green'
    }else if(status == 'failed'){
        return 'red'
    }else{
        return 'orange'
    }
}

const saveNote = () =>{
    let data = {
        id:  detail.value.details_id,
        note: notes.value
    }
    console.log("data: ",data)
    meetings.notes(data).then((resp:any) => {
        if(resp.success) {               
            detail.value.notes = notes.value   
        }
    })
}

const formatTimestamp = (timestamp) =>{
    const date = new Date(timestamp);
    const formatted = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(date);
    
    return formatted;
}

const getDuration = () =>{
    const date1 = new Date(detail.value?.start_time);
    const date2 = new Date(detail.value?.end_time);
    const durationMs = date2 - date1;

    const hours = Math.floor(durationMs / 3600000);  // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((durationMs % 3600000) / 60000);  // 1 minute = 60000 milliseconds
    const seconds = Math.floor((durationMs % 60000) / 1000);  // 1 second = 1000 milliseconds

    if(hours > 0){
        return minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`
    }else if(minutes > 0){
        return `${minutes} minutes`
    }else{
        return `${seconds} seconds`
    }
}
</script>
<template>
    <div class="mt-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="col-span-2 ">
            <div class="bg-white rounded rounded-lg">
                <VideoPlayer />
            </div>
            <div class="mt-5">
                <label class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Meeintg Summary</label>
                <div class="bg-white rounded-lg p-5 text-gray-600 text-sm leading-7">
                    {{ detail?.summary }}
                </div>
            </div>
            <div class="mt-5">
                <FormTextArea
                    label="Notes"
                    id="meeting notes"
                    v-model="notes"
                    :rows="4"
                    placeholder="Write your thoughts here..."
                    />
                    <div class="mt-3 flex justify-end text-end"><Button :text="'Save'" @click="saveNote()" /></div>
                        
            </div>
        </div>
        <div>
            <div class="rounded px-5 py-4 bg-white border border-1 border-gray-200 shadow-md">
                <label class="block mb-2 text-md font-medium text-gray-800 dark:text-white">Meeintg Detail</label>
                <hr class="bg-primary-500"/>
                <div class="text-sm dark:text-white mt-5">
                    <span class="font-bold text-gray-700">Name :</span>
                    <span class="font-medium text-gray-600 ml-2">{{ detail?.name }}</span>
                </div>
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700">Duration :</span>
                    <span class="font-medium text-gray-600 ml-2">{{ getDuration() }}</span>
                </div>
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700">Date :</span>
                    <span class="font-medium text-gray-600 ml-2">{{ meetingDateTime('date') }}</span>
                </div>
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700">Time :</span>
                    <span class="font-medium text-gray-600 ml-2">{{ meetingDateTime('time') }}</span>
                </div>                
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700">Folder :</span>
                    <span class="font-medium text-gray-600 ml-2">{{ detail?.folders_name }}</span>
                </div>                                
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700">Type :</span>
                    <span class="font-medium text-gray-600 ml-2">{{ detail?.is_type }}</span>
                </div>
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700 ">Status :</span>
                    <span class="ml-2 bg-green-100 text-green-500 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ detail?.status }}</span>
                    <div class="mt-5 ml-5">
                        <ol class="relative border-s border-gray-200 dark:border-gray-700">                  
                            <li class="ms-4" v-for="getStatus in detail?.meeting_status">
                                <div :class="`absolute w-3 h-3 bg-${getStatusColor(getStatus?.status)}-400 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700`"></div>
                                <time class="mb-1 text-xs font-normal leading-none text-gray-600 dark:text-gray-500">{{ formatTimestamp(getStatus?.created_at) }}</time>
                                <p class="pb-8 mt-2 dark:text-white" :class="`text-${getStatusColor(getStatus?.status)}-500`"><span  class="text-xs font-medium px-2.5 py-0.5 rounded" :class="`text-${getStatusColor(getStatus?.status)}-500 bg-${getStatusColor(getStatus?.status)}-100 dark:bg-${getStatusColor(getStatus?.status)}-900 dark:text-${getStatusColor(getStatus?.status)}-300`">{{ getStatus?.status }}</span></p>
                            </li>
                        </ol>
                    </div>
                    
                </div>
            </div>
            <div class="bg-white rounded mt-5"><Accordion  :title="`Meeting FAQ's`" :icon="'fas fa-circle-question'" :accordions="faqsList" /></div>
        </div>
      </div>
    </div>
</template>
