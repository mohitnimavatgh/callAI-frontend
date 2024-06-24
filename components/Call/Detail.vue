<script setup lang="ts">
import { useMeetings } from "@/stores/user/meetings";
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
const meetings = useMeetings()
const { $toast } = useNuxtApp()
const props = defineProps({
    meetingDetail: null,
});
const router = useRouter()
const detail = ref(null)
const notes = ref(null);
const openTranscript = ref<boolean>(false)
const meetingDetail = computed(() => meetings.getMeetingDetail);

const rules = {
    notes: {
        required: helpers.withMessage("The Notes field is required", required),
    }
};

const v$ = useVuelidate(rules, { notes });

const faqsList = computed(() => {
    detail.value = props.meetingDetail       
    notes.value = detail.value?.notes
    return props.meetingDetail?.faqs;
});

const nextActionsList = computed(() => {   
    if(props.meetingDetail?.actions){
        meetings.nextActions = JSON.parse(props.meetingDetail?.actions);
        return JSON.parse(props.meetingDetail?.actions);
    }else{
        return [];
    }
});

const meetingDateTime = (type: any) => {
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

onMounted(async () => {
    router.replace({query: {}})
})

const getStatusColor = (status: string,text:any) =>{
    if(status == 'pending'){
        if(text){ return 'text-orange-500 dark:text-orange-800'
        }else{ return 'bg-orange-200 text-orange-500 border-orange-600 dark:border-orange-600 dark:bg-orange-300' }
    }else if(status == 'in_progress'){
        if(text){ return 'text-yellow-500 dark:text-yellow-800'
        }else{ return 'bg-yellow-200 text-yellow-500 border-yellow-600 dark:border-yellow-600 dark:bg-yellow-300' }       
    }else if(status == 'processing'){
        if(text){ return 'text-blue-500 dark:text-blue-800'
        }else{ return 'bg-blue-200 text-blue-500 border-blue-600 dark:border-blue-600 dark:bg-blue-300' } 
    }else if(status == 'completed'){
        if(text){ return 'text-green-500 dark:text-green-800'
        }else{ return 'bg-green-200 text-green-500 border-green-600 dark:border-green-600 dark:bg-green-100' }
    }else if(status == 'failed'){
        if(text){ return 'text-red-500 dark:text-red-800'
        }else{ return 'bg-red-200 text-red-500 border-red-600 dark:border-red-600 dark:bg-red-300' }       
    }else{
        if(text){ return 'text-orange-500 dark:text-orange-500'
        }else{ return 'bg-orange-200 text-orange-500 border-orange-600 dark:border-orange-600 dark:bg-orange-300' }
    }
}

const saveNote = async () =>{
    const result = await v$.value.$validate()
    if(result){
        let data = {
            id:  detail.value.details_id,
            note: notes.value
        }
        console.log("data: ",data)
        meetings.notes(data).then((resp:any) => {
            detail.value.notes = notes.value   
            $toast.success('Note Save Successfully', { duration: 10000 })
        }).catch((error) => {
            catchResponse(error)
        })
    }
}

const formatTimestamp = (timestamp: any) =>{
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
    const hours = Math.floor(durationMs / 3600000);  
    const minutes = Math.floor((durationMs % 3600000) / 60000);  
    const seconds = Math.floor((durationMs % 60000) / 1000); 

    if(hours > 0){
        return minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`
    }else if(minutes > 0){
        return `${minutes} minutes`
    }else{
        return `${seconds} seconds`
    }
}

const catchResponse = (err : any) => {
  if(err?.response?.status == 422){
    let data = err?.response?.data?.data
    if(data){
        let keys = Object.keys(data)[0];
        let firstValue = data[keys];
        $toast.error(firstValue[0], { duration: 5000 })
    }else{
        if(!err?.response?.data?.success){
            $toast.error(err?.response?.data?.message, { duration: 5000 })
        }else{
            $toast.error('something went wrong...!', { duration: 5000 })
        }
    }
  }else{
    if(!err?.response?.data?.success){
        $toast.error(err?.response?.data?.message, { duration: 5000 })
    }else{
        $toast.error('something went wrong...!', { duration: 5000 })
    }
  }  
}
</script>
<template>
    <div class="mt-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="col-span-2 ">
            <div class="bg-white rounded rounded-lg">
                <VideoPlayer :videoUrl="detail?.video_url" />
            </div>
            <div class="mt-5">
                <div class="flex items-center justify-between">
                    <label class="block text-sm font-medium text-gray-500 dark:text-gray-300">Meeintg Summary</label>
                    <Button text="View Transcript" @click="openTranscript = !openTranscript" />
                </div>
                <DownloadModal title="Transcript" :data="detail?.transcribe" :show="openTranscript" @close="openTranscript = !openTranscript"/>
                <div class="bg-white mt-4 rounded-lg p-5 text-gray-600 text-sm leading-7 dark:bg-gray-700 dark:text-gray-300">
                    {{ detail?.summary }}
                </div>
            </div>
            <div class="mt-5">
                <FormTextArea
                    label="Notes"
                    id="meeting notes"
                    v-model="v$.notes.$model"
                    :error-messages="v$.notes.$errors"
                    :rows="4"
                    placeholder="Write your thoughts here..."
                    />
                    <p class="text-red-600" v-if="v$.notes?.$errors">{{ v$.notes?.$errors?.[0]?.$message }}</p>
                    <div class="mt-3 flex justify-end text-end"><Button :text="'Save'" @click="saveNote()" /></div>  
            </div>
        </div>
        <div>
            <div class="rounded px-5 py-4 bg-white dark:bg-gray-700 border border-1 border-gray-200 dark:border-gray-500 shadow-md">
                <label class="block mb-2 font-semibold text-gray-600 dark:text-gray-300">Meeintg Detail</label>
                <!-- <hr class="bg-primary-500"/> -->
                <div class="border-t border-primary-500 dark:border-gray-500 w-full"></div>
                <div class="text-sm dark:text-white mt-5">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Name :</span>
                    <span class="font-medium text-gray-600 dark:text-gray-200 ml-2">{{ detail?.name }}</span>
                </div>
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Duration :</span>
                    <span class="font-medium text-gray-600 dark:text-gray-200 ml-2">{{ getDuration() }}</span>
                </div>
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Date :</span>
                    <span class="font-medium text-gray-600 dark:text-gray-200 ml-2">{{ meetingDateTime('date') }}</span>
                </div>
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Time :</span>
                    <span class="font-medium text-gray-600 dark:text-gray-200 ml-2">{{ meetingDateTime('time') }}</span>
                </div>                
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Folder :</span>
                    <span class="font-medium text-gray-600 dark:text-gray-200 ml-2">{{ detail?.folders_name }}</span>
                </div>                                
                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Type :</span>
                    <span class="font-medium text-gray-600 dark:text-gray-200 ml-2">{{ detail?.is_type }}</span>
                </div>

                <div class="text-sm dark:text-white mt-3.5">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Status :</span>
                    <span :class="`ml-2 ${getStatusColor(detail?.status)} text-xs font-medium px-2.5 py-0.5 capitalize rounded ${getStatusColor(detail?.status,true)}`">{{ detail?.status }}</span>
                    <div class="mt-5 ml-5">
                        <ol class="relative border-s border-gray-200 dark:border-gray-500">                  
                            <li class="ms-4" v-for="getStatus in detail?.meeting_status">
                                <div :class="`absolute w-3 h-3 ${getStatusColor(getStatus?.status)} rounded-full mt-1.5 -start-1.5`"></div>                               
                                <time class="mb-1 text-xs font-normal leading-none text-gray-600 dark:text-gray-300">{{ formatTimestamp(getStatus?.created_at) }}</time>
                                <p class="pb-8 mt-2 dark:text-white" :class="`${getStatusColor(getStatus?.status,true)}`">
                                    <span class="text-xs capitalize font-medium px-2.5 py-0.5 rounded" :class="`${getStatusColor(getStatus?.status)}`">{{ getStatus?.status.replace(/_/g, ' ') }}</span></p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-500 rounded shadow-md my-5">
                <NextAction :data="nextActionsList" />
            </div>
            <div class="bg-white dark:bg-gray-700 mt-5"><Accordion  :title="`Meeting FAQ's`" :icon="'fas fa-circle-question'" :accordions="faqsList" /></div>
        </div>
      </div>
    </div>
</template>
