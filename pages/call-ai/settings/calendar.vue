<script setup lang="ts">
import { useCalendar } from "@/stores/user/calendar";
import { useFolders } from "@/stores/user/folders";
import { useVuelidate } from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
const route = useRoute();
const router = useRouter()
const calendar = useCalendar()
const folders = useFolders()
const google_client_id = import.meta.env.VITE_GOOGLE_CALENDAR_CLIENT_ID;
const joinModal = ref(false);
const calendarSettings = ref({
    is_saved: false,
    record_all:false,
    record_confirmed:false,
    record_external:false,
    record_im_host:false,
    record_im_not_host:false,
    record_internal:false,
    record_recurring:false
})

const folder = ref({
    folder_id: '',
})
const rules = {
    folder: {       
        folder_id: {
          required: helpers.withMessage("The Folder field is required", required),
        }
    }
}
const v$ = useVuelidate(rules, {folder})

const getCalendarSetting = () => {
    if(calendar.calendarSettingData == null) {
        calendar.calendarSetting().then((resp:any) => {
            if(resp.success){
                setCalendarOption();    
            }  
        })
    }else{
        setCalendarOption();
    }
}

const setCalendarOption = () => {
    let data = calendar.calendarSettingData;
    calendarSettings.value.is_saved = data.is_saved ? true : false
    calendarSettings.value.record_all = data.record_all ? true : false
    calendarSettings.value.record_confirmed = data.record_confirmed ? true : false
    calendarSettings.value.record_external = data.record_external ? true : false
    calendarSettings.value.record_im_host = data.record_im_host ? true : false
    calendarSettings.value.record_im_not_host = data.record_im_not_host ? true : false
    calendarSettings.value.record_internal = data.record_internal ? true : false
    calendarSettings.value.record_recurring = data.record_recurring ? true : false
}

const googleCalendar = async () =>{
    const result = await v$.value.$validate()
    if (result) {
        const params = {
            client_id: google_client_id,
            redirect_uri: 'http://localhost:3000/call-ai/settings/calendar',
            response_type: "code",
            scope: [
                "https://www.googleapis.com/auth/calendar.events.readonly",
                "https://www.googleapis.com/auth/userinfo.email",
                ].join(" "),
            access_type: "offline",
            prompt: "consent",
            state: "user-Id1",
        };
        const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        url.search = new URLSearchParams(params).toString();   
        let redirectUrl = url.toString();    
        window.location.href = redirectUrl;
    }
}

const refreshToken = () => {
    folder.value.code = route.query.code;
    calendar.create(folder.value).then((resp:any) => {
        if(resp?.success) {   
            router.push('/call-ai/settings/calendar'); 
        }
    }).catch((error) => {
        console.log("Error:", error);                  
    })
}

const saveCalendarSetting = () => {
   console.log("Calendar",calendarSettings.value);
    calendar.update(calendarSettings.value).then((resp:any) => {
        if(resp?.success) {   
            setCalendarOption(); 
        }
    }).catch((error) => {
        console.log("Error:", error);                  
    })
}

onMounted(async () => {
    await nextTick();
    await getCalendarSetting();
    await folders.list()
    if(route.query.code){
        refreshToken();
    }
})


</script>
<template>
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Configure Your Calendar</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">Get started by connecting your calendar account </p>
        </div>
        <div class="flex flex-col lg:flex-row bg-white mt-3 box bg-white dark:bg-gray-800">
            <div class="flex-1 p-5 flex flex-col justify-center items-center">
                <div class="flex items-center mb-3">
                    <img class="w-6 mr-2" src="@/assets/image/google-calendar.png" alt="Google Calendar"/>
                    <span class="font-medium text-gray-500 text-sm">Google Calendar</span>
                </div>
                <Button :text="'Connect'" outline class="mt-2" @click="joinModal = !joinModal" />
            </div>
            <div class="lg:border-l border-gray-300 lg:flex-1 p-5 flex flex-col justify-center items-center">
                <div class="flex items-center mb-3">
                    <img class="w-6 mr-2" src="@/assets/image/teams-calendar.png" alt="Microsoft Teams Calendar"/>
                    <span class="font-medium text-gray-500 text-sm">Microsoft Teams Calendar</span>
                </div>
                <Button :text="'Disconnect'" class="mt-2" />
            </div>
        </div>
        <div>
            <p class="text-sm font-normal text-gray-500 mt-3">Change Your Calendar Meeting Settings</p>
        </div>        
        <Modal :title="'Select Folder'" :show="joinModal" @close="joinModal = false">
            <div class="modal-content  p-4 md:p-5">           
                <div class="col-span-2 mb-3">
                    <FormSelect label="Folder" placeholder="Folders" id="Folder" v-model="v$.folder.folder_id.$model" :errors="v$.folder.folder_id.$errors" name="folder" :options="folders.folders" />
                </div>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button class="mr-2" :text="'Select Folder'" frontIcon="fas fa-plus" @click="googleCalendar()" />
                <Button :text="'Cancel'" @click="joinModal = false" outline/>
            </div>
        </Modal>
        <div class="box w-full mt-2 bg-white dark:bg-gray-800">
            <div class="flex justify-between p-3 bg-primary-50 mt-2 rounded-t-lg">
                <span class="font-medium text-gray-500 text-sm">Record All Meetings</span>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="calendarSettings.record_all" class="sr-only peer">
                    <div class="relative w-8 h-4 bg-gray-200 dark:peer-focus:ring-primary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:end-[-2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
            </div>
            <div class="flex justify-between p-3">
                <span class="font-medium text-gray-500 text-sm">Record meetings where I am the host</span>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="calendarSettings.record_im_host" class="sr-only peer">
                    <div class="relative w-8 h-4 bg-gray-200 dark:peer-focus:ring-primary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:end-[-2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
            </div>
            <div class="flex justify-between p-3">
                <span class="font-medium text-gray-500 text-sm">Record meetings where I am not the host</span>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="calendarSettings.record_im_not_host" class="sr-only peer">
                    <div class="relative w-8 h-4 bg-gray-200 dark:peer-focus:ring-primary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:end-[-2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
            </div>
            <div class="flex justify-between p-3">
                <span class="font-medium text-gray-500 text-sm">Record external meetings</span>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="calendarSettings.record_external" class="sr-only peer">
                    <div class="relative w-8 h-4 bg-gray-200 dark:peer-focus:ring-primary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:end-[-2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
            </div>
            <div class="flex justify-between p-3">
                <span class="font-medium text-gray-500 text-sm">Record internal meetings</span>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="calendarSettings.record_internal" class="sr-only peer">
                    <div class="relative w-8 h-4 bg-gray-200 dark:peer-focus:ring-primary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:end-[-2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
            </div>
            <div class="flex justify-between p-3">
                <span class="font-medium text-gray-500 text-sm">Record confirmed-only meetings</span>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="calendarSettings.record_confirmed" class="sr-only peer">
                    <div class="relative w-8 h-4 bg-gray-200 dark:peer-focus:ring-primary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:end-[-2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </label>
            </div>
            <div class="flex justify-end  mt-4">
                <Button :text="'Save'" class="flex text-center mr-2" @click="saveCalendarSetting()" outline/>
            </div>
        </div>
    </div>
</template>